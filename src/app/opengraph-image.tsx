/* eslint-disable @next/next/no-img-element -- o Satori (ImageResponse) só aceita <img> */
import { ImageResponse } from "next/og"
import { OG_SIZE, loadOgFonts, publicImage } from "@/lib/og"

export const runtime = "nodejs"
export const alt = "Joel Silva — Desenvolvedor Full Stack. Construindo experiências digitais de outro nível."
export const size = OG_SIZE
export const contentType = "image/png"

export default async function OpengraphImage() {
	const [fonts, photo, logo] = await Promise.all([
		loadOgFonts(),
		publicImage("images/Me.png"),
		publicImage("logo/white.png"),
	])

	return new ImageResponse(
		(
			<div style={{ display: "flex", width: "100%", height: "100%", background: "linear-gradient(180deg, #212328, #17191d)", position: "relative", fontFamily: "Inter" }}>
				{/* Fundo com o mesmo tom das bordas da foto, para não haver emenda. Foto: 1920×1080 ajustada à altura, com o Joel no lado direito */}
				<img src={photo} alt="" width={1120} height={630} style={{ position: "absolute", right: -60, top: 0 }} />
				<div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #060708 38%, rgba(6,7,8,0.75) 58%, rgba(6,7,8,0) 80%)" }} />
				<div style={{ position: "absolute", left: -200, top: -260, width: 700, height: 700, borderRadius: 9999, background: "radial-gradient(circle, rgba(0,112,182,0.45), rgba(0,112,182,0) 70%)" }} />
				<div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 6, background: "linear-gradient(90deg, #0070b6, #3aa6ea, rgba(58,166,234,0))" }} />

				<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: 760, height: "100%" }}>
					<div style={{ display: "flex", alignItems: "center", gap: 16 }}>
						<img src={logo} alt="" width={52} height={52} />
						<span style={{ fontFamily: "Grotesk", fontSize: 26, color: "#e9e7e5", letterSpacing: 3 }}>JOEL SILVA</span>
					</div>

					<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
						<div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 18px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)", color: "#c9ccd1", fontSize: 20, alignSelf: "flex-start" }}>
							<div style={{ width: 10, height: 10, borderRadius: 999, background: "#34d399" }} />
							Disponível para novos projectos
						</div>
						<div style={{ display: "flex", flexDirection: "column", fontFamily: "Grotesk", fontSize: 68, lineHeight: 1.05, color: "#ffffff", letterSpacing: -1.5 }}>
							<span>Construindo experiências</span>
							<span>
								digitais de&nbsp;<span style={{ color: "#3aa6ea" }}>outro nível.</span>
							</span>
						</div>
						<span style={{ fontSize: 26, color: "#8b8f96" }}>Desenvolvedor Full Stack · Next.js · UI/UX</span>
					</div>

					<span style={{ fontFamily: "Grotesk", fontSize: 22, color: "#e9e7e5" }}>joelsilva.site</span>
				</div>
			</div>
		),
		{ ...size, fonts },
	)
}
