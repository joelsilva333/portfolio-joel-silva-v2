"use client"

import { ChevronUp } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const faqs = [
	{
		question: "Quem é o Joel Germano?",
		answer:
			"Sou um desenvolvedor frontend em transição para full stack, apaixonado por criar experiências digitais funcionais e bem desenhadas.",
	},
	{
		question: "Quais tecnologias você domina?",
		answer:
			"Tenho experiência sólida com React, Next.js, TypeScript e UI/UX. Atualmente estou aprofundando conhecimentos em backend com Express, Django e bancos de dados como PostgreSQL e MySQL.",
	},
	{
		question: "Você já trabalhou em empresas?",
		answer:
			"Sim. Trabalhei na Global Services Corporation e na OCASO Group, desenvolvendo soluções digitais como websites corporativos, sistemas de gestão e plataformas de serviços.",
	},
	{
		question: "Está aberto a novas oportunidades?",
		answer:
			"Sempre! Meu objetivo é crescer como full stack developer, contribuir em projetos desafiadores e ao mesmo tempo empreender em soluções digitais próprias.",
	},
]

export default function FAQ() {
	const [openIndex, setOpenIndex] = useState<number | null>(null)

	const toggle = (index: number) => {
		setOpenIndex(openIndex === index ? null : index)
	}

	return (
		<motion.section
			 id="faq"
			className="w-full max-w-7xl flex flex-col gap-8 z-20 max-lg:p-5"
			initial={{ opacity: 0, y: 40 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, ease: "easeOut" }}
		>
			<motion.h2
				className="text-4xl font-semibold max-lg:text-3xl max-md:text-2xl text-center"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2, duration: 0.5 }}
				viewport={{ once: true }}
			>
				{"Perguntas Frequentes".toUpperCase()}
			</motion.h2>

			<div className="flex flex-col gap-6">
				{faqs.map((faq, index) => {
					const isOpen = openIndex === index

					return (
						<motion.div
							key={index}
							className="border-b border-light/20 pb-3"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.15 * index, duration: 0.4 }}
							viewport={{ once: true }}
						>
							<button
								onClick={() => toggle(index)}
								className="w-full flex justify-between items-center text-left cursor-pointer"
							>
								<span
									className={`text-lg max-lg:text-base font-medium transition-colors ${
										isOpen ? "text-accent" : "text-foreground"
									}`}
								>
									{faq.question.toUpperCase()}
								</span>

								<motion.div
									animate={{ rotate: isOpen ? 0 : 180 }}
									transition={{ duration: 0.3 }}
								>
									<ChevronUp className="w-5 h-5" />
								</motion.div>
							</button>

							<AnimatePresence initial={false}>
								{isOpen && (
									<motion.p
										key="content"
										className="text-light/70 overflow-hidden"
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: "auto" }}
										exit={{ opacity: 0, height: 0 }}
										transition={{ duration: 0.4, ease: "easeInOut" }}
									>
										{faq.answer}
									</motion.p>
								)}
							</AnimatePresence>
						</motion.div>
					)
				})}
			</div>
		</motion.section>
	)
}
