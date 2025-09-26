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
		<motion.div
			variants={container}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, amount: 0.2 }}
			className="flex items-center justify-around gap-16 max-w-7xl w-full rounded-2xl backdrop-blur-lg"
		>
			<motion.div variants={item} className="max-w-1/2">
				<Image
					src={"/images/illustration.png"}
					alt={"Illustration"}
					width={1920}
					height={1080}
					className="w-full "
				/>
			</motion.div>

			<div className="w-1/2 max-w-xl flex flex-col gap-4">
				<motion.h1 variants={item} className="text-4xl">
					{"Mékie, tranquilo?".toUpperCase()}
				</motion.h1>

				<motion.p variants={item} className="text-justify">
					Prazer, Joel Germano. Sou desenvolvedor full stack com 3 anos de
					experiência. Gosto de unir design e código para criar aplicações
					funcionais, bem estruturadas e com interfaces que realmente encantam o
					usuário. Minha meta é simples: entregar projetos que sejam bonitos por
					fora e sólidos por dentro.
				</motion.p>

				<motion.p variants={item} className="text-justify">
					Tenho experiência colaborando com diferentes contextos — de startups a
					equipes mais estruturadas — o que me ajudou a criar uma visão
					equilibrada entre inovação e consistência. O que mais me motiva é
					transformar desafios complexos em soluções digitais elegantes,
					funcionais e centradas no usuário.
				</motion.p>

				<motion.div variants={item}>
					<Link href={"/"} className="btn-secondary w-fit">
						CONTACTAR-ME <MoveRight />
					</Link>
				</motion.div>
			</div>
		</motion.div>
	)
}
