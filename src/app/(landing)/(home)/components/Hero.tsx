"use client"

import { MoveRight } from "lucide-react"
import { motion, Variants } from "framer-motion"
import Link from "next/link"

const container: Variants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.25,
		},
	},
}

const word: Variants = {
	hidden: { opacity: 0, y: 40 },
	show: {
		opacity: 1,
		y: 0,
		transition: { ease: "easeOut", duration: 0.8 },
	},
}

export default function Hero() {
	const title = "CONSTRUINDO EXPERIÊNCIAS DIGITAIS DE OUTRO NÍVEL"

	return (
		<motion.section
			className="w-full h-screen flex flex-col items-center bg-center max-lg:bg-right justify-center text-light z-10"
			style={{
				backgroundImage: `linear-gradient(to right, #060708CC, #00000000), url('/images/Me.png')`,
				backgroundSize: "cover",
			}}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, amount: 0.3 }}
		>
			<div className="w-full max-w-7xl h-full flex flex-col justify-center px-8 py-20 max-lg:px-6 max-lg:py-16">
				<div className="max-w-2xl w-full flex flex-col gap-6 max-lg:gap-4">
					<motion.h1
						className="text-6xl font-semibold font-oxygen flex flex-wrap gap-3 leading-tight max-lg:text-5xl"
						variants={container}
					>
						{title.split(" ").map((wordText, i) => (
							<motion.span key={i} variants={word}>
								{wordText}
							</motion.span>
						))}
					</motion.h1>

					<motion.p
						className="text-base font-light text-light/70 max-w-md max-lg:text-sm max-lg:max-w-full"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
						viewport={{ once: true }}
					>
						{
							"Participe da jornada e experiências que unem design e código, onde cada detalhe transmite inovação e inspiração."
						}
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }}
						viewport={{ once: true }}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<Link
							href="https://api.whatsapp.com/send?phone=244946506875&text=Olá!%20Quero%20um%20website%20para%20mim!"
							target="_blank"
							className="btn-secondary w-fit flex items-center gap-2 mt-2 max-lg:mt-4"
						>
							VAMOS CRIAR JUNTOS{" "}
							<MoveRight className="w-5 h-5 max-lg:w-4 max-lg:h-4" />
						</Link>
					</motion.div>
				</div>
			</div>
		</motion.section>
	)
}
