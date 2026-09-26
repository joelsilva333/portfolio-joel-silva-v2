import type { Metadata } from "next"
import Link from "next/link"
import ProjectCard from "@/components/ProjectCard"
import Reveal from "@/components/Reveal"
import { listPublishedProjects } from "@/server/projects"
import { cn } from "@/lib/utils"
import Contact from "@/components/Contact"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
	title: "Projectos",
	description: "Projectos e trabalhos desenvolvidos por Joel Silva: websites, plataformas e sistemas feitos de ponta a ponta.",
	alternates: { canonical: "/projectos" },
	openGraph: {
		title: "Projectos | Joel Silva",
		description: "Websites, plataformas e sistemas web feitos de ponta a ponta por Joel Silva.",
		url: "/projectos",
		siteName: "Joel Silva — Portfólio",
		locale: "pt_PT",
		type: "website",
	},
}

export default async function ProjectsPage({
	searchParams,
}: {
	searchParams: Promise<{ categoria?: string }>
}) {
	const { categoria } = await searchParams
	const projects = await listPublishedProjects()
	const categories = [...new Set(projects.map((p) => p.category))]
	const visible = categoria ? projects.filter((p) => p.category === categoria) : projects

	return (
		<>
			<section className="relative isolate overflow-hidden pt-28 pb-8 sm:pt-40 sm:pb-16">
				<div className="bg-grid mask-fade-b absolute inset-0 -z-10 opacity-60" />
				<div className="absolute -top-40 left-1/2 -z-10 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" />
				<Reveal className="container-page flex flex-col gap-4 sm:gap-6">
					<span className="eyebrow">Portfólio</span>
					<h1 className="heading-xl max-w-4xl">
						Projectos <span className="text-muted">&</span> trabalhos
					</h1>
					<p className="max-w-xl text-lg text-muted max-sm:text-[15px]">
						Uma selecção de produtos que desenhei e desenvolvi — do primeiro rascunho ao
						lançamento.
					</p>
				</Reveal>
			</section>

			<section className="container-page flex flex-col gap-6 pb-4 sm:gap-10 sm:pb-16">
				{categories.length > 1 && (
					<nav aria-label="Filtrar por categoria" className="chip-rail -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
						{[{ label: "Todos", value: undefined }, ...categories.map((c) => ({ label: c, value: c }))].map(
							(item) => {
								const active = item.value === categoria
								return (
									<Link
										key={item.label}
										href={item.value ? `/projectos?categoria=${encodeURIComponent(item.value)}` : "/projectos"}
										aria-current={active ? "page" : undefined}
										scroll={false}
										className={cn(
											"shrink-0 rounded-full border px-4 py-2 text-sm whitespace-nowrap transition",
											active
												? "border-accent bg-accent text-white"
												: "border-white/10 text-light/70 hover:border-white/30 hover:text-white",
										)}
									>
										{item.label}
									</Link>
								)
							},
						)}
					</nav>
				)}

				{visible.length === 0 ? (
					<div className="card p-16 text-center text-muted">Nenhum projecto encontrado.</div>
				) : (
					<div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
						{visible.map((project, i) => (
							<Reveal key={project.id} delay={(i % 3) * 0.08}>
								<ProjectCard project={project} index={i} priority={i < 3} />
							</Reveal>
						))}
					</div>
				)}
			</section>

			<Contact />
		</>
	)
}
