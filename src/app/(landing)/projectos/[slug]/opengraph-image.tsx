/* eslint-disable @next/next/no-img-element -- o Satori (ImageResponse) só aceita <img> */
import { ImageResponse } from "next/og"
import { getPublishedProjectBySlug } from "@/server/projects"
import { OG_SIZE, loadOgFonts, projectImage, publicImage } from "@/lib/og"

export const runtime = "nodejs"
export const alt = "Projecto de Joel Silva"
export const size = OG_SIZE
export const contentType = "image/png"

export default async function ProjectOgImage({ params }: { params: Promise<{ slug: string }> }) {
	const project = await getPublishedProjectBySlug((await params).slug)
	const [fonts, logo] = await Promise.all([loadOgFonts(), publicImage("logo/white.png")])

	// Primeira imagem PNG/JPEG disponível (capa ou galeria).
	let cover: string | null = null
	for (const src of project ? [project.cover, ...project.gallery] : []) {
		cover = await projectImage(src)
		if (cover) break
	}

	const title = project?.title ?? "Projecto"
	const tech = project?.technologies.slice(0, 4) ?? []

	return new ImageResponse(
		(
			<div style={{ display: "flex", width: "100%", height: "100%", background: "#060708", position: "relative", fontFamily: "Inter" }}>
				<div style={{ position: "absolute", right: -160, top: -220, width: 760, height: 760, borderRadius: 9999, background: "radial-gradient(circle, rgba(0,112,182,0.5), rgba(0,112,182,0) 70%)" }} />
				<div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 6, background: "linear-gradient(90deg, #0070b6, #3aa6ea, rgba(58,166,234,0))" }} />

				{/* Capa em moldura, inclinada para a direita */}
				{cover && (
					<div style={{ position: "absolute", right: 56, top: 95, width: 500, height: 440, display: "flex", borderRadius: 28, overflow: "hidden", border: "1px solid rgba(255,255,255,0.14)", boxShadow: "0 40px 80px rgba(0,0,0,0.6)", background: "#12151a" }}>
						<img src={cover} alt="" width={500} height={440} style={{ objectFit: "cover", width: 500, height: 440 }} />
					</div>
				)}

				<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: cover ? 640 : 1100, height: "100%" }}>
					<div style={{ display: "flex", alignItems: "center", gap: 16 }}>
						<img src={logo} alt="" width={48} height={48} />
						<span style={{ fontFamily: "Grotesk", fontSize: 24, color: "#e9e7e5", letterSpacing: 3 }}>JOEL SILVA</span>
						<span style={{ fontSize: 22, color: "#8b8f96" }}>/ Projectos</span>
					</div>

					<div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
						{project && (
							<span style={{ fontSize: 22, color: "#3aa6ea", letterSpacing: 4, textTransform: "uppercase" }}>{project.category}</span>
						)}
						<span style={{ fontFamily: "Grotesk", fontSize: title.length > 26 ? 60 : 76, lineHeight: 1.04, color: "#ffffff", letterSpacing: -1.5 }}>
							{title}
						</span>
						{project?.summary && (
							<span style={{ fontSize: 24, lineHeight: 1.4, color: "#a3a7ad", display: "flex" }}>
								{project.summary.length > 120 ? `${project.summary.slice(0, 117)}…` : project.summary}
							</span>
						)}
					</div>

					<div style={{ display: "flex", gap: 10 }}>
						{tech.map((t) => (
							<span key={t} style={{ padding: "8px 18px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)", color: "#e9e7e5", fontSize: 19 }}>
								{t}
							</span>
						))}
					</div>
				</div>
			</div>
		),
		{ ...size, fonts },
	)
}
