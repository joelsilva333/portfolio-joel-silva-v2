"use client"

import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Github, Linkedin, Instagram } from "lucide-react"
import Link from "next/link"

export default function FinalCTA() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 40 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, ease: "easeOut" }}
			className="rounded-2xl h-96 w-full max-lg:mx-5 max-w-7xl px-16 mt-8 py-14 flex flex-col gap-8 justify-center bg-cover bg-center text-light shadow-lg z-20"
			style={{
				backgroundImage: `linear-gradient(to right, #0a0a0acc, #0070b6cc), url('/images/Me.png')`,
			}}
		>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true }}
				className="max-w-lg w-full flex flex-col gap-2"
			>
				<h2 className="text-4xl font-semibold max-lg:text-3xl max-md:text-2xl max-lg:text-center">
					{"Pronto para o próximo projeto?".toUpperCase()}
				</h2>
				<p className="text-light/80 max-lg:text-sm max-lg:text-center">
					Se gostou do meu trabalho e quer transformar ideias em soluções
					digitais, entre em contacto comigo.
				</p>
			</motion.div>

			<div className="max-w-md w-full flex items-center justify-between max-lg:flex-col max-lg:gap-4 max-lg:items-center">
				<Link
					href="https://api.whatsapp.com/send?phone=244946506875&text=Olá!%20Quero%20um%20website%20para%20mim!"
					target="_blank"
					className="btn-primary w-fit max-lg:flex"
				>
					ENVIAR MENSAGEM <ArrowRight size={18} />
				</Link>

				<div className="flex items-center gap-4">
					<Link href="https://github.com/joelsilva333" target="_blank">
						<Github className="w-6 h-6 hover:text-white hover:scale-105 transition-all duration-300" />
					</Link>
					<Link
						href="https://www.linkedin.com/in/joel-g-da-silva"
						target="_blank"
					>
						<Linkedin className="w-6 h-6 hover:text-white hover:scale-105 transition-all duration-300" />
					</Link>
					<Link href="https://instagram.com/joel_germany_" target="_blank">
						<Instagram className="w-6 h-6 hover:text-white hover:scale-105 transition-all duration-300" />
					</Link>
				</div>
			</div>
		</motion.div>
	)
}
