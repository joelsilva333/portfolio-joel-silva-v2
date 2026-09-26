import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import ProjectCard from "@/components/ProjectCard"
import Reveal from "@/components/Reveal"
import SectionHeading from "@/components/SectionHeading"
import SwipeHint from "@/components/SwipeHint"
import type { ProjectDTO } from "@/server/projects"
import { cn } from "@/lib/utils"

const HOME_LIMIT = 4

export default function Projects({ projects }: { projects: ProjectDTO[] }) {
	const shown = projects.slice(0, HOME_LIMIT)

	return (
		<section id="projects" className="container-page section flex flex-col gap-8 sm:gap-14">
			<SectionHeading
				index="03"
				eyebrow="Projectos"
				title={
					<>
						Trabalho seleccionado, <span className="text-muted">construído de ponta a ponta.</span>
					</>
				}
				description="Produtos reais para clientes e ideias próprias — cada um com design, código e infraestrutura feitos à medida."
				action={
					projects.length > 0 && (
						<Link href="/projectos" className="btn-ghost shrink-0 max-md:hidden">
							Ver todos <ArrowUpRight className="h-4 w-4" />
						</Link>
					)
				}
			/>

			{shown.length === 0 ? (
				<div className="card flex flex-col items-center gap-2 p-16 text-center text-muted">
					<p className="font-display text-lg text-light">Novos projectos a caminho.</p>
					<p className="text-sm">Volte em breve para ver os trabalhos mais recentes.</p>
				</div>
			) : (
				<>
					{/* Mobile: carrossel de deslizar; tablet+: destaque grande + grelha */}
					<Reveal className="mobile-rail md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-3">
						{shown.map((project, i) => (
							<div
								key={project.id}
								className={cn(
									i === 0 && "md:col-span-2 lg:col-span-3",
									shown.length === 2 && i === 1 && "md:col-span-2 lg:col-span-3",
								)}
							>
								<ProjectCard project={project} index={i} variant={i === 0 ? "large" : "default"} />
							</div>
						))}
					</Reveal>
					{shown.length > 1 && <SwipeHint count={shown.length} label="projectos" />}
					<Link href="/projectos" className="btn-ghost w-full md:hidden">
						Ver todos os projectos <ArrowUpRight className="h-4 w-4" />
					</Link>
				</>
			)}
		</section>
	)
}
