"use client"

import { motion } from "framer-motion"
import { MoveRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const container = {
	hidden: { opacity: 0, y: 100 },
	show: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			when: "beforeChildren",
			staggerChildren: 0.4,
		},
	},
}

const item = {
	hidden: { opacity: 0, y: 100 },
	show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
}

export default function AboutMe() {
	return (
		<motion.section
			variants={container}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, amount: 0.2 }}
			id="about"
			className="flex items-center justify-around gap-16 max-w-7xl w-full rounded-2xl z-10 max-lg:flex-col max-lg:gap-10 max-lg:px-6 max-lg:text-center"
		>
			<motion.div
				variants={item}
				className="w-1/2 max-lg:w-full max-lg:max-w-lg flex justify-center"
			>
				<Image
					src="/images/illustration.png"
					alt="Illustration"
					width={1920}
					height={1080}
					className="w-full object-contain"
				/>
			</motion.div>

			<div className="w-1/2 max-w-xl flex flex-col gap-4 max-lg:w-full max-lg:max-w-none">
				<motion.h1
					variants={item}
					className="text-4xl font-semibold max-lg:text-3xl max-md:text-2xl"
				>
					{"Mékie, tranquilo?".toUpperCase()}
				</motion.h1>

				<motion.p
					variants={item}
					className="text-justify text-light/80 max-lg:text-sm max-lg:text-center"
				>
					Prazer, Joel Germano. Sou desenvolvedor full stack com 3 anos de
					experiência. Gosto de unir design e código para criar aplicações
					funcionais, bem estruturadas e com interfaces que realmente encantam o
					usuário. Minha meta é simples: entregar projetos que sejam bonitos por
					fora e sólidos por dentro.
				</motion.p>

				<motion.p
					variants={item}
					className="text-justify text-light/80 max-lg:text-sm max-lg:text-center"
				>
					Tenho experiência colaborando com diferentes contextos — de startups a
					equipes mais estruturadas — o que me ajudou a criar uma visão
					equilibrada entre inovação e consistência. O que mais me motiva é
					transformar desafios complexos em soluções digitais elegantes,
					funcionais e centradas no usuário.
				</motion.p>

				<motion.div variants={item} className="mt-2 flex max-lg:justify-center">
					<Link
						href="https://api.whatsapp.com/send?phone=244946506875&text=Olá!%20Quero%20um%20website%20para%20mim!"
						target="_blank"
						className="btn-secondary w-fit flex items-center gap-2"
					>
						CONTACTAR-ME <MoveRight className="w-5 h-5 max-lg:w-4 max-lg:h-4" />
					</Link>
				</motion.div>
			</div>
		</motion.section>
	)
}
