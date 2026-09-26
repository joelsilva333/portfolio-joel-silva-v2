const stack = [
	"Next.js",
	"React",
	"TypeScript",
	"Node.js",
	"Express",
	"PostgreSQL",
	"MySQL",
	"TypeORM",
	"Tailwind CSS",
	"Figma",
	"Git & GitHub",
	"Framer Motion",
]

export default function TechMarquee() {
	return (
		<section aria-label="Tecnologias" className="border-y border-white/6 bg-surface/60 py-6">
			<div className="mask-fade-x overflow-hidden">
				{/* Lista duplicada para o loop contínuo; a cópia fica escondida dos leitores de ecrã */}
				<div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
				{[0, 1].map((copy) => (
					<ul
						key={copy}
						aria-hidden={copy === 1}
						className="flex shrink-0 items-center gap-12 pr-12"
					>
						{stack.map((tech) => (
							<li
								key={tech}
								className="flex items-center gap-12 font-display text-xl whitespace-nowrap text-light/40 sm:text-2xl"
							>
								{tech}
								<span className="h-1.5 w-1.5 rounded-full bg-accent-bright/60" />
							</li>
						))}
					</ul>
				))}
				</div>
			</div>
		</section>
	)
}
