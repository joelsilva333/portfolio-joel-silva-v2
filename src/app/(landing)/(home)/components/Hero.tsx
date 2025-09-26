"use client"

import { MoveRight } from "lucide-react"
import { motion, Variants } from "framer-motion"

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
		<motion.div
			className="w-full h-screen flex flex-col items-center justify-center text-light"
			style={{
				backgroundImage: `linear-gradient(to right, #060708CC, #00000000), url('/images/Me.png')`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, amount: 0.3 }}
		>
			<div className="w-full max-w-7xl h-full py-18 flex flex-col justify-center">
				<div className="max-w-lg w-full flex flex-col gap-5">
					<motion.h1
						className="text-7xl font-semibold font-oxygen flex flex-wrap gap-2"
						variants={container}
					>
						{title.split(" ").map((wordText, i) => (
							<motion.span key={i} variants={word}>
								{wordText}
							</motion.span>
						))}
					</motion.h1>

					<motion.p
						className="text-sm font-light text-light/70"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
						viewport={{ once: true }}
					>
						{
							"Participe da jornada e experiências que unem design e código, onde cada detalhe transmite inovação e inspiração."
						}
					</motion.p>

					<motion.button
						className="btn-secondary w-fit flex items-center gap-2"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }}
						viewport={{ once: true }}
					>
						VAMOS CRIAR JUNTOS <MoveRight />
					</motion.button>
				</div>
			</div>
		</motion.div>
	)
}
