"use client"

import { Plus } from "lucide-react"
import { useId, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Reveal from "@/components/Reveal"
import { cn } from "@/lib/utils"

const faqs = [
	{
		question: "Quem é o Joel Silva?",
		answer:
			"Sou desenvolvedor full stack em Luanda, com foco forte em front-end e experiência do utilizador. Actualmente sou desenvolvedor front-end na Evolium — Design & Software, desenvolvedor full stack na Global Services Corporation e sócio da Yhanko, onde também faço gestão de projectos.",
	},
	{
		question: "Em que projectos e empresas já trabalhou?",
		answer:
			"Na Global Services Corporation desenvolvi o website da Mesa Redonda com CEOs — o maior evento de CEOs de Angola — com pagamentos e gestão de convidados, além do website oficial da empresa. Como freelancer, construí aplicações web para a OCASO Group (como a Unocura) e o front-end da Prepa.ao, integrado com APIs REST.",
	},
	{
		question: "Que tipo de projectos posso pedir-lhe?",
		answer:
			"Websites institucionais, landing pages para eventos e campanhas, plataformas e sistemas web à medida, painéis de gestão e integrações com APIs e gateways de pagamento. Posso também tratar do design UI/UX no Figma antes de passar ao código.",
	},
	{
		question: "Com que tecnologias trabalha?",
		answer:
			"No front-end: React, Next.js, TypeScript e Tailwind CSS. No back-end: Node.js, Express e APIs REST, com PostgreSQL ou MySQL (via TypeORM). No design: Figma. E Git/GitHub em todos os projectos.",
	},
	{
		question: "Como funciona o processo de trabalho?",
		answer:
			"Começamos com uma conversa para perceber objectivos, público e prazos. Depois envio uma proposta com âmbito e orçamento claros, desenho a interface, desenvolvo com entregas regulares para validação e, por fim, faço o lançamento e acompanho os primeiros passos do produto.",
	},
	{
		question: "Trabalha remotamente ou com clientes fora de Luanda?",
		answer:
			"Sim. Já trabalhei em regime remoto com a OCASO Group e a Prepa.ao, e em formatos presencial e híbrido em Luanda. Comunicação clara e entregas frequentes fazem a distância deixar de ser um problema.",
	},
	{
		question: "Está disponível para novos projectos?",
		answer:
			"Sim, aceito projectos freelance seleccionados e parcerias. Envie-me uma mensagem pelo formulário de contacto com os detalhes da sua ideia e respondo em até 24 horas úteis.",
	},
]

export default function FAQ() {
	const [openIndex, setOpenIndex] = useState<number | null>(0)
	const baseId = useId()

	return (
		<section id="faq" className="container-page section grid grid-cols-1 gap-8 sm:gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
			<Reveal className="flex flex-col gap-3 sm:gap-5 lg:sticky lg:top-32 lg:self-start">
				<span className="eyebrow">05 — FAQ</span>
				<h2 className="heading-lg">
					Perguntas <span className="text-muted">frequentes.</span>
				</h2>
				<p className="max-w-sm text-muted max-md:hidden">
					Não encontrou o que procurava? Envie-me uma mensagem e respondo o mais rápido possível.
				</p>
				<a href="#contacto" className="btn-ghost w-fit max-md:hidden">
					Fazer uma pergunta
				</a>
			</Reveal>

			<div className="flex flex-col gap-2 sm:gap-3">
				{faqs.map((faq, index) => {
					const isOpen = openIndex === index
					const panelId = `${baseId}-panel-${index}`
					return (
						<Reveal key={faq.question} delay={index * 0.06}>
							<div className={cn("card overflow-hidden transition-colors", isOpen && "border-white/15 bg-white/4")}>
								<h3>
									<button
										type="button"
										onClick={() => setOpenIndex(isOpen ? null : index)}
										aria-expanded={isOpen}
										aria-controls={panelId}
										className="flex w-full cursor-pointer items-center gap-4 p-4 text-left sm:gap-5 sm:p-6"
									>
										<span className="font-display text-sm text-muted max-sm:hidden">0{index + 1}</span>
										<span className="flex-1 font-display text-lg font-medium max-sm:text-[15px] max-sm:leading-snug">
											{faq.question}
										</span>
										<span
											className={cn(
												"flex h-8 w-8 shrink-0 items-center justify-center sm:h-9 sm:w-9 rounded-full border transition-all duration-300",
												isOpen ? "rotate-45 border-accent bg-accent text-white" : "border-white/15",
											)}
										>
											<Plus className="h-4 w-4" />
										</span>
									</button>
								</h3>
								<AnimatePresence initial={false}>
									{isOpen && (
										<motion.div
											id={panelId}
											role="region"
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: "auto", opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
											transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
										>
											<p className="px-4 pb-4 text-sm leading-relaxed text-muted sm:px-6 sm:pb-6 sm:pl-17 sm:text-base">
												{faq.answer}
											</p>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</Reveal>
					)
				})}
			</div>
		</section>
	)
}
