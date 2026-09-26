import { Code, Database, Fingerprint, GitBranch, Server } from "lucide-react"
import Reveal from "@/components/Reveal"
import SectionHeading from "@/components/SectionHeading"
import SwipeHint from "@/components/SwipeHint"
import { cn } from "@/lib/utils"

const specialties = [
	{
		icon: Fingerprint,
		title: "Design de Interfaces e UX",
		description:
			"Mais de 3 anos no Figma a transformar ideias em interfaces simples, bonitas e agradáveis de usar.",
		tags: ["Figma", "Design Systems", "Prototipagem"],
		span: "lg:col-span-2",
	},
	{
		icon: Code,
		title: "Desenvolvimento Frontend",
		description:
			"React, Next.js e TypeScript para experiências modernas, rápidas e que funcionam em qualquer dispositivo.",
		tags: ["Next.js", "React", "TypeScript"],
		span: "",
	},
	{
		icon: Server,
		title: "Desenvolvimento Backend",
		description:
			"APIs em Node.js e Express seguras, organizadas e prontas para crescer.",
		tags: ["Node.js", "Express", "REST"],
		span: "",
	},
	{
		icon: Database,
		title: "Bases de Dados",
		description:
			"Modelação lógica em PostgreSQL e MySQL, com consultas leves e eficientes.",
		tags: ["PostgreSQL", "MySQL", "TypeORM"],
		span: "",
	},
	{
		icon: GitBranch,
		title: "Versionamento & Colaboração",
		description:
			"Git e GitHub no dia a dia para manter cada passo registado e facilitar o trabalho em equipa.",
		tags: ["Git", "GitHub", "CI"],
		span: "",
	},
]

export default function Specialties() {
	return (
		<section id="specialities" className="container-page section flex flex-col gap-8 sm:gap-14">
			<SectionHeading
				index="02"
				eyebrow="Especialidades"
				title={
					<>
						Tudo o que um produto precisa, <span className="text-muted">num só lugar.</span>
					</>
				}
				description="Da primeira ideia ao produto em produção: design, frontend, backend e dados a trabalhar em conjunto."
			/>

			<Reveal className="mobile-rail md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">
				{specialties.map(({ icon: Icon, title, description, tags, span }, i) => (
					<article
						key={title}
						className={cn(
							"card group relative flex h-full flex-col gap-5 overflow-hidden p-6 transition-colors duration-500 hover:border-white/15 sm:gap-6 sm:p-8",
							span,
							i === 4 && "md:col-span-2 lg:col-span-1",
						)}
					>
						<div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-accent/0 blur-3xl transition-colors duration-700 group-hover:bg-accent/25" />
						<div className="flex items-start justify-between">
							<span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
								<Icon className="h-5 w-5 text-accent-bright" />
							</span>
							<span className="font-display text-sm text-muted">0{i + 1}</span>
						</div>
						<div className="flex flex-col gap-3">
							<h3 className="font-display text-xl font-semibold">{title}</h3>
							<p className="text-sm leading-relaxed text-muted">{description}</p>
						</div>
						<ul className="mt-auto flex flex-wrap gap-2">
							{tags.map((t) => (
								<li key={t} className="chip">
									{t}
								</li>
							))}
						</ul>
					</article>
				))}
			</Reveal>
			<SwipeHint count={specialties.length} label="especialidades" />
		</section>
	)
}
