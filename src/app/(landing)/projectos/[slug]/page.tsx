import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react"
import Media from "@/components/Media"
import Reveal from "@/components/Reveal"
import { getPublishedProjectBySlug, listPublishedProjects } from "@/server/projects"
import { paragraphs } from "@/lib/utils"
import Contact from "@/components/Contact"
import Gallery from "./Gallery"

export const dynamic = "force-dynamic"

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	const project = await getPublishedProjectBySlug((await params).slug)
	if (!project) return { title: "Projecto não encontrado" }

	const description = project.summary || project.description.slice(0, 160)
	const title = `${project.title} — ${project.category}`
	const url = `/projectos/${project.slug}`
	// A imagem vem de ./opengraph-image.tsx (gerada com título, categoria e capa).
	return {
		title: project.title,
		description,
		alternates: { canonical: url },
		openGraph: {
			title,
			description,
			url,
			type: "article",
			siteName: "Joel Silva — Portfólio",
			locale: "pt_PT",
		},
		twitter: { card: "summary_large_image", title, description },
	}
}

export default async function ProjectPage({ params }: Params) {
	const { slug } = await params
	const project = await getPublishedProjectBySlug(slug)
	if (!project) notFound()

	const all = await listPublishedProjects()
	const position = all.findIndex((p) => p.id === project.id)
	const next = all.length > 1 ? all[(position + 1) % all.length] : null

	const details = [
		{ label: "Categoria", value: project.category },
		{ label: "Cliente", value: project.client },
		{ label: "Função", value: project.role },
		{ label: "Ano", value: project.year },
	].filter((d) => d.value)

	const body = paragraphs(project.description)
	const gallery = project.gallery.filter((src) => src !== project.cover)

	return (
		<article>
			{/* Cabeçalho */}
			<header className="relative isolate overflow-hidden pt-28 pb-8 sm:pt-36 sm:pb-14">
				<div className="bg-grid mask-fade-b absolute inset-0 -z-10 opacity-50" />
				<div className="absolute -top-48 right-0 -z-10 h-[32rem] w-[40rem] rounded-full bg-accent/20 blur-[150px]" />

				<div className="container-page flex flex-col gap-6 sm:gap-10">
					<Reveal>
						<Link
							href="/projectos"
							className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-light"
						>
							<ArrowLeft className="h-4 w-4" /> Todos os projectos
						</Link>
					</Reveal>

					<div className="grid gap-6 sm:gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-end">
						<Reveal delay={0.05} className="flex flex-col gap-4 sm:gap-6">
							<span className="eyebrow">{project.category}</span>
							<h1 className="heading-xl">{project.title}</h1>
							{project.summary && (
								<p className="max-w-2xl text-lg leading-relaxed text-light/70 max-sm:text-base">{project.summary}</p>
							)}
						</Reveal>

						<Reveal delay={0.1} className="flex flex-col gap-3 lg:items-end">
							{project.link ? (
								<a
									href={project.link}
									target="_blank"
									rel="noopener noreferrer"
									className="btn-primary w-fit max-sm:w-full"
								>
									Visitar projecto <ArrowUpRight className="h-4 w-4" />
								</a>
							) : (
								<span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-light/70">
									<Clock className="h-4 w-4 text-accent-bright" />
									{project.statusText || "Disponível em breve"}
								</span>
							)}
						</Reveal>
					</div>
				</div>
			</header>

			{/* Capa */}
			<Reveal className="container-page">
				<div className="relative aspect-video overflow-hidden rounded-2xl border sm:rounded-4xl border-white/7 bg-surface-2 max-sm:aspect-4/3">
					<Media src={project.cover} alt={`Capa do projecto ${project.title}`} priority sizes="(min-width: 1280px) 80rem, 100vw" />
				</div>
			</Reveal>

			{/* Detalhes + descrição */}
			<section className="container-page grid gap-10 py-12 sm:gap-14 sm:py-24 lg:grid-cols-[1fr_2fr]">
				<Reveal className="flex flex-col gap-8 lg:sticky lg:top-32 lg:self-start">
					<dl className="card divide-y divide-white/7">
						{details.map((d) => (
							<div key={d.label} className="flex items-center justify-between gap-6 px-6 py-4">
								<dt className="text-sm text-muted">{d.label}</dt>
								<dd className="text-right text-sm font-medium">{d.value}</dd>
							</div>
						))}
					</dl>

					{project.technologies.length > 0 && (
						<div className="flex flex-col gap-3">
							<h2 className="text-xs font-medium tracking-[0.2em] text-muted uppercase">Tecnologias</h2>
							<ul className="flex flex-wrap gap-2">
								{project.technologies.map((tech) => (
									<li key={tech} className="chip px-4! py-1.5!">
										{tech}
									</li>
								))}
							</ul>
						</div>
					)}
				</Reveal>

				{/* Em mobile a descrição vem antes da ficha técnica */}
				<Reveal delay={0.05} className="flex flex-col gap-4 max-lg:order-first sm:gap-6">
					<span className="eyebrow">Sobre o projecto</span>
					{body.length > 0 ? (
						<div className="flex flex-col gap-4 text-lg leading-relaxed text-light/75 max-sm:text-base sm:gap-5">
							{body.map((p, i) => (
								<p key={i} className={i === 0 ? "font-display text-xl leading-snug text-light sm:text-3xl" : undefined}>
									{p}
								</p>
							))}
						</div>
					) : (
						<p className="text-muted">Descrição em breve.</p>
					)}
				</Reveal>
			</section>

			{/* Galeria */}
			{gallery.length > 0 && (
				<section className="container-page flex flex-col gap-6 pb-12 sm:gap-10 sm:pb-24">
					<Reveal className="flex items-end justify-between gap-6">
						<div className="flex flex-col gap-4">
							<span className="eyebrow">Galeria</span>
							<h2 className="heading-lg">Por dentro do projecto</h2>
						</div>
						<span className="font-display text-sm text-muted">{gallery.length} itens</span>
					</Reveal>
					<Gallery items={gallery} title={project.title} />
				</section>
			)}

			{/* Próximo projecto */}
			{next && (
				<section className="container-page pb-12">
					<Link
						href={`/projectos/${next.slug}`}
						className="group card relative flex items-center justify-between gap-4 overflow-hidden p-6 transition hover:border-white/20 sm:gap-6 sm:p-12"
					>
						<div className="absolute inset-y-0 right-0 w-1/2 opacity-20 transition-opacity duration-700 group-hover:opacity-40 max-sm:hidden mask-[linear-gradient(to_left,black,transparent)]">
							<Media src={next.cover} alt="" sizes="40vw" />
						</div>
						<div className="relative flex flex-col gap-3">
							<span className="text-xs tracking-[0.2em] text-muted uppercase">Próximo projecto</span>
							<span className="font-display text-2xl font-semibold sm:text-5xl">{next.title}</span>
							<span className="text-sm text-muted">{next.category}</span>
						</div>
						<span className="relative flex h-12 w-12 shrink-0 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-light text-primary transition-transform duration-500 group-hover:rotate-45">
							<ArrowUpRight className="h-6 w-6" />
						</span>
					</Link>
				</section>
			)}

			<Contact />
		</article>
	)
}
