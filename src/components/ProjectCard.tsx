import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import Media from "./Media"
import type { ProjectDTO } from "@/server/projects"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
	project: ProjectDTO
	index: number
	variant?: "default" | "large"
	priority?: boolean
}

export default function ProjectCard({ project, index, variant = "default", priority }: ProjectCardProps) {
	const large = variant === "large"
	const meta = [project.year, project.client].filter(Boolean).join(" · ")

	return (
		<Link
			href={`/projectos/${project.slug}`}
			className={cn(
				"group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/7 bg-surface transition-all duration-500 hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_30px_80px_-30px_rgba(0,112,182,0.45)]",
				large && "lg:grid lg:grid-cols-[1.35fr_1fr]",
			)}
		>
			<div
				className={cn(
					"relative overflow-hidden bg-surface-2",
					large ? "aspect-16/10 lg:aspect-auto lg:min-h-[460px]" : "aspect-16/10 sm:aspect-4/3",
				)}
			>
				<Media
					src={project.cover}
					alt={`Capa do projecto ${project.title}`}
					priority={priority}
					sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
					className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
				/>
				<div className="absolute inset-0 bg-linear-to-t from-surface via-surface/10 to-transparent opacity-80" />
				<span className="absolute top-5 left-5 rounded-full border border-white/15 bg-primary/60 px-3 py-1 text-xs font-medium backdrop-blur-md">
					{project.category}
				</span>
				<span className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-light text-primary opacity-0 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100 max-lg:opacity-100">
					<ArrowUpRight className="h-5 w-5" />
				</span>
			</div>

			<div className={cn("flex flex-1 flex-col gap-3 p-5 sm:gap-4 sm:p-7", large && "lg:justify-end lg:p-10")}>
				<div className="flex items-center justify-between text-xs text-muted">
					<span className="font-display tracking-[0.2em]">{String(index + 1).padStart(2, "0")}</span>
					{meta && <span>{meta}</span>}
				</div>
				<h3
					className={cn(
						"font-display font-semibold tracking-tight text-balance",
						large ? "text-2xl md:text-3xl lg:text-4xl" : "text-2xl",
					)}
				>
					{project.title}
				</h3>
				{project.summary && (
					<p className={cn("text-sm leading-relaxed text-muted", large ? "max-md:line-clamp-2" : "line-clamp-2")}>
						{project.summary}
					</p>
				)}
				{project.technologies.length > 0 && (
					<ul className="mt-auto flex flex-wrap gap-2 pt-2">
						{project.technologies.slice(0, large ? 6 : 3).map((tech, i) => (
							<li key={tech} className={cn("chip", i >= 3 && "max-md:hidden")}>
								{tech}
							</li>
						))}
					</ul>
				)}
				{large && (
					<span className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-accent-bright max-md:hidden">
						Ver estudo de caso
						<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
					</span>
				)}
			</div>
		</Link>
	)
}
