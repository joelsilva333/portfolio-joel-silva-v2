"use client"

import { ArrowDown, ArrowUpRight } from "lucide-react"
import { motion, type Variants } from "framer-motion"
import Image from "next/image"

const ease = [0.22, 1, 0.36, 1] as const

const container: Variants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
}

const word: Variants = {
	hidden: { opacity: 0, y: "0.6em", filter: "blur(8px)" },
	show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease } },
}

const fadeUp = (delay: number) => ({
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.8, delay, ease },
})

export default function Hero({ projectCount }: { projectCount: number }) {
	const lead = ["Construindo", "experiências", "digitais", "de"]
	const highlight = ["outro", "nível."]

	const stats = [
		{ value: "3+", label: "Anos de experiência" },
		{ value: projectCount > 0 ? `${projectCount}` : "—", label: "Projectos publicados" },
		{ value: "Full Stack", label: "Do design ao deploy" },
	]

	return (
		<section className="relative isolate flex min-h-[100svh] items-end overflow-hidden pt-28 pb-10 sm:pb-16 lg:items-center">
			{/* Fundo: foto, grelha e brilho */}
			<div className="absolute inset-0 -z-10">
				<Image
					src="/images/Me.png"
					alt=""
					fill
					priority
					sizes="100vw"
					className="object-cover object-[78%_top] opacity-60 max-lg:opacity-50 lg:object-[70%_center]"
				/>
				<div className="absolute inset-0 bg-linear-to-r from-primary via-primary/85 to-primary/10 max-lg:hidden" />
				<div className="absolute inset-0 bg-linear-to-t from-primary via-primary/85 to-primary/20 lg:via-transparent lg:to-primary/40" />
				<div className="bg-grid mask-fade-b absolute inset-0 opacity-60" />
				<div className="absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-accent/25 blur-[140px]" />
			</div>

			<div className="container-page">
				<div className="flex max-w-4xl flex-col gap-5 sm:gap-8">
					<motion.span
						{...fadeUp(0)}
						className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-light/80 backdrop-blur-md"
					>
						<span className="relative flex h-2 w-2">
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-70" />
							<span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
						</span>
						Disponível para novos projectos
					</motion.span>

					<motion.h1
						variants={container}
						initial="hidden"
						animate="show"
						className="heading-xl flex flex-wrap gap-x-[0.25em]"
					>
						{lead.map((w) => (
							<motion.span key={w} variants={word} className="inline-block">
								{w}
							</motion.span>
						))}
						{highlight.map((w) => (
							<motion.span key={w} variants={word} className="text-gradient inline-block">
								{w}
							</motion.span>
						))}
					</motion.h1>

					<motion.p {...fadeUp(0.7)} className="max-w-xl text-lg leading-relaxed text-light/75 max-sm:text-[15px]">
						Sou o Joel, desenvolvedor Full Stack. Uno design e código para criar
						produtos digitais rápidos, elegantes e centrados em quem os usa.
					</motion.p>

					<motion.div {...fadeUp(0.85)} className="grid grid-cols-2 gap-3 sm:flex">
						<a href="#projects" className="btn-primary max-sm:px-4">
							Ver projectos <ArrowUpRight className="h-4 w-4" />
						</a>
						<a href="#contacto" className="btn-ghost max-sm:px-4">
							<span className="sm:hidden">Falar comigo</span>
							<span className="max-sm:hidden">Vamos criar juntos</span>
						</a>
					</motion.div>

					<motion.dl
						{...fadeUp(1)}
						className="mt-1 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-5 max-sm:gap-3 sm:mt-6 sm:pt-8"
					>
						{stats.map((s) => (
							<div key={s.label} className="flex flex-col gap-1">
								<dt className="order-2 text-xs text-muted max-sm:text-[11px]">{s.label}</dt>
								<dd className="order-1 font-display text-3xl font-semibold max-sm:text-lg">{s.value}</dd>
							</div>
						))}
					</motion.dl>
				</div>
			</div>

			<motion.a
				href="#about"
				{...fadeUp(1.2)}
				aria-label="Descer para a secção Sobre"
				className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted lg:flex"
			>
				<span className="flex h-12 w-7 justify-center rounded-full border border-white/20 pt-2">
					<ArrowDown className="h-4 w-4 animate-bounce" />
				</span>
			</motion.a>
		</section>
	)
}
