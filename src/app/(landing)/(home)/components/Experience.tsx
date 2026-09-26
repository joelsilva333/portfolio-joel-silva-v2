import { MapPin } from "lucide-react"
import Reveal from "@/components/Reveal"
import SectionHeading from "@/components/SectionHeading"

const experience = [
	{
		company: "Evolium — Design & Software",
		role: "Desenvolvedor Front-end",
		period: "Set 2026 — Presente",
		current: true,
		place: "Luanda · Presencial",
		description:
			"Desenvolvimento de interfaces e experiências de utilizador para produtos digitais de clientes.",
		tags: ["Front-end", "UX", "React"],
	},
	{
		company: "Prepa.ao",
		role: "Desenvolvedor Front-end · Freelance",
		period: "Mar 2025 — Out 2025",
		place: "Luanda · Remoto",
		description: "Desenvolvimento de front-end e integração com APIs REST.",
		tags: ["Front-end", "API REST"],
	},
	{
		company: "Yhanko",
		role: "Software Developer · Sócio",
		period: "Out 2024 — Presente",
		current: true,
		place: "Luanda · Híbrido",
		description:
			"Sócio da empresa, com responsabilidades em gestão de projectos e desenvolvimento front-end.",
		tags: ["Gestão de projectos", "Desenvolvimento web"],
	},
	{
		company: "Global Services Corporation",
		role: "Desenvolvedor Full Stack",
		period: "Fev 2024 — Presente",
		current: true,
		place: "Luanda · Presencial",
		description:
			"Desenvolvimento full stack do website da Mesa Redonda com CEOs — o maior evento de CEOs de Angola — com integração de APIs, gateways de pagamento e gestão de convidados, e do website oficial da empresa com pagamentos integrados.",
		tags: ["Full Stack", "Pagamentos", "API REST", "Web Design"],
	},
	{
		company: "OCASO Group, SA",
		role: "Desenvolvedor Front-end · Freelance",
		period: "Fev 2024 — Out 2024",
		place: "Luanda · Remoto",
		description:
			"Desenvolvimento de várias aplicações web, entre elas a Unocura, com interfaces intuitivas, dinâmicas e responsivas.",
		tags: ["React", "TypeScript", "Tailwind CSS"],
	},
]

export default function Experience() {
	return (
		<section id="experiencia" className="container-page section flex flex-col gap-8 sm:gap-14">
			<SectionHeading
				index="04"
				eyebrow="Experiência"
				title={
					<>
						Onde tenho construído <span className="text-muted">produtos reais.</span>
					</>
				}
				description="De startups a eventos corporativos de referência em Angola — em equipa, como sócio e em regime freelance."
			/>

			<div className="flex flex-col border-b border-white/8">
				{experience.map((job, i) => (
					<Reveal key={job.company} delay={i * 0.05}>
						<article className="group grid gap-2 border-t border-white/8 py-5 transition-colors sm:gap-4 sm:py-8 hover:bg-white/2 md:grid-cols-[14rem_1fr_auto] md:gap-10 md:px-4">
							<div className="flex items-center gap-2 md:flex-col md:items-start">
								<span className="font-display text-sm text-light/80 tabular-nums max-md:text-xs max-md:text-muted">{job.period}</span>
								{job.current && (
									<span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-0.5 text-xs text-emerald-300">
										<span className="h-1.5 w-1.5 rounded-full bg-success" /> Actual
									</span>
								)}
							</div>
							<div className="flex flex-col gap-2 sm:gap-3">
								<div>
									<h3 className="font-display text-lg font-semibold sm:text-2xl">{job.company}</h3>
									<p className="text-sm text-accent-bright">{job.role}</p>
								</div>
								<p className="max-w-2xl text-sm leading-relaxed text-muted max-md:line-clamp-3">{job.description}</p>
								<ul className="flex flex-wrap gap-2 max-md:hidden">
									{job.tags.map((t) => (
										<li key={t} className="chip">
											{t}
										</li>
									))}
								</ul>
							</div>
							<span className="inline-flex items-start gap-1.5 text-xs whitespace-nowrap text-muted max-md:hidden">
								<MapPin className="h-3.5 w-3.5" /> {job.place}
							</span>
						</article>
					</Reveal>
				))}
			</div>
		</section>
	)
}
