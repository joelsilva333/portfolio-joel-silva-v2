"use client"

import {
	Fingerprint,
	Code,
	Database,
	GitBranch,
	Server,
	MoveRight,
} from "lucide-react"
import Link from "next/link"
import { Autoplay, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { motion } from "framer-motion"

interface Specialty {
	icon: React.ElementType
	title: string
	description: string
}

const specialties: Specialty[] = [
	{
		icon: Fingerprint,
		title: "Design de Interfaces e UX",
		description:
			"Com mais de 3 anos explorando o Figma e outras ferramentas, aprendi a transformar ideias em interfaces simples, bonitas e agradáveis de usar.",
	},
	{
		icon: Code,
		title: "Desenvolvimento Frontend",
		description:
			"Adoro dar vida às telas com React, Next.js e TypeScript, criando experiências modernas, rápidas e que funcionam bem em qualquer dispositivo.",
	},
	{
		icon: Server,
		title: "Desenvolvimento Backend",
		description:
			"Gosto de estruturar APIs em Node.js e Express, garantindo que o que acontece por trás das telas seja seguro, organizado e escalável.",
	},
	{
		icon: Database,
		title: "Bancos de Dados",
		description:
			"Já trabalhei bastante com PostgreSQL e MySQL, modelando dados de forma lógica e deixando as consultas mais leves e eficientes.",
	},
	{
		icon: GitBranch,
		title: "Versionamento & Colaboração",
		description:
			"Uso Git e GitHub no dia a dia para manter os projetos organizados, registrar cada passo e facilitar quando é hora de trabalhar em equipe.",
	},
]

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

export default function Specialties() {
	return (
		<motion.div
			variants={container}
			initial="hidden"
			whileInView="show"
			id="specialities"
			viewport={{ once: true, amount: 0.2 }}
			className="max-w-7xl w-full z-10"
		>
			<motion.div
				variants={item}
				className="w-full flex justify-between max-lg:justify-center items-center"
			>
				<h1 className="text-4xl font-semibold max-lg:text-3xl max-md:text-2xl">
					{"ESPECIALIDADES"}
				</h1>

				<Link
					href="https://api.whatsapp.com/send?phone=244946506875&text=Olá!%20Quero%20um%20website%20para%20mim!"
					target="_blank"
					className="btn-secondary w-fit flex items-center gap-2 max-lg:hidden"
				>
					CONTACTAR-ME <MoveRight className="w-6" />
				</Link>
			</motion.div>

			<motion.ul variants={item} className="w-full flex gap-8">
				<Swiper
					modules={[Pagination, Autoplay]}
					slidesPerView={"auto"}
					spaceBetween={50}
					pagination={{
						clickable: true,
					}}
					autoplay={{
						disableOnInteraction: true,
						delay: 5000,
					}}
					speed={1000}
					breakpoints={{
						0: {
							spaceBetween: 10,
							slidesPerView: 1,
						},
						1024: {
							spaceBetween: 50,
							slidesPerView: 3,
						},
					}}
					className="w-full z-50 pt-8"
				>
					{specialties.map((speciality, index) => (
						<SwiperSlide
							key={index}
							className="py-12 max-lg:px-5 w-full flex justify-center items-center"
						>
							<motion.li
								variants={item}
								className="lg:max-w-sm w-full flex flex-col h-70 items-center gap-5 justify-center px-8 py-5 text-center bg-light/5 hover:scale-105 duration-300 transition-all rounded-2xl backdrop-blur-md"
							>
								<speciality.icon className="text-accent w-12 h-12" />
								<div className="flex flex-col gap-2">
									<h1 className="font-semibold text-lg max-lg:text-base">
										{speciality.title.toUpperCase()}
									</h1>
									<p className="text-sm text-light/70">
										{speciality.description}
									</p>
								</div>
							</motion.li>
						</SwiperSlide>
					))}
				</Swiper>
			</motion.ul>
		</motion.div>
	)
}
