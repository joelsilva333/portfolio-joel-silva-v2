import { ArrowUpRight, Layers, PenTool, Rocket } from "lucide-react"
import Image from "next/image"
import Reveal from "@/components/Reveal"

const values = [
	{ icon: PenTool, title: "Design com intenção", text: "Interfaces claras, que guiam e encantam." },
	{ icon: Layers, title: "Código sólido", text: "Arquitectura limpa, tipada e escalável." },
	{ icon: Rocket, title: "Entrega ponta a ponta", text: "Do Figma ao deploy, sem intermediários." },
]

export default function AboutMe() {
	return (
		<section id="about" className="container-page section grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
			{/* Ilustração decorativa: só a partir de tablet, para poupar scroll em mobile */}
			<Reveal className="relative mx-auto w-full max-w-lg max-md:hidden">
				<div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-accent/20 blur-3xl" />
				<div className="card relative overflow-hidden p-3">
					<div className="relative aspect-4/5 overflow-hidden rounded-[1.25rem] bg-linear-to-br from-surface-2 to-primary">
						<Image
							src="/images/illustration.png"
							alt="Ilustração de Joel Silva a trabalhar"
							fill
							sizes="(min-width: 1024px) 32rem, 90vw"
							className="object-contain p-6"
						/>
					</div>
				</div>
				<div className="card absolute -right-4 -bottom-6 flex animate-float items-center gap-3 bg-primary/80! px-5 py-4 shadow-2xl sm:-right-8">
					<span className="font-display text-3xl font-semibold text-accent-bright">3+</span>
					<span className="text-xs leading-tight text-muted">
						anos a construir
						<br />
						produtos digitais
					</span>
				</div>
			</Reveal>

			<div className="flex flex-col gap-5 sm:gap-7">
				<Reveal>
					<span className="eyebrow">01 — Sobre mim</span>
				</Reveal>
				<Reveal delay={0.05}>
					<h2 className="heading-lg">
						Mékie, tranquilo? <span className="text-muted">Prazer, Joel Germano.</span>
					</h2>
				</Reveal>
				<Reveal delay={0.1} className="flex flex-col gap-4 leading-relaxed text-light/70 max-sm:text-[15px]">
					<p>
						Sou desenvolvedor full stack com 3 anos de experiência. Gosto de unir design e
						código para criar aplicações funcionais, bem estruturadas e com interfaces que
						realmente encantam quem as usa. A meta é simples: projectos bonitos por fora e
						sólidos por dentro.
					</p>
					<p className="max-sm:hidden">
						Já colaborei com contextos muito diferentes — de startups a equipas mais
						estruturadas — o que me deu uma visão equilibrada entre inovação e consistência.
					</p>
				</Reveal>

				<Reveal delay={0.15}>
					{/* Mobile: lista compacta em linhas; tablet+: três cartões */}
					<ul className="grid gap-2 sm:grid-cols-3 sm:gap-3">
						{values.map(({ icon: Icon, title, text }) => (
							<li
								key={title}
								className="card flex items-center gap-4 rounded-2xl px-4 py-3 sm:flex-col sm:items-start sm:gap-3 sm:rounded-3xl sm:p-5"
							>
								<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 sm:h-auto sm:w-auto sm:bg-transparent">
									<Icon className="h-5 w-5 text-accent-bright" />
								</span>
								<span className="flex flex-col gap-0.5 sm:gap-3">
									<span className="text-sm font-medium">{title}</span>
									<span className="text-xs leading-relaxed text-muted">{text}</span>
								</span>
							</li>
						))}
					</ul>
				</Reveal>

				<Reveal delay={0.2}>
					<a href="#contacto" className="btn-primary max-sm:w-full">
						Falar comigo <ArrowUpRight className="h-4 w-4" />
					</a>
				</Reveal>
			</div>
		</section>
	)
}
