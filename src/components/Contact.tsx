"use client"

import { startTransition, useActionState, useState } from "react"
import { CheckCircle2, ChevronDown, Clock, Github, Instagram, Linkedin, Loader2, MapPin, Send } from "lucide-react"
import Reveal from "./Reveal"
import { WhatsAppIcon } from "./icons"
import { sendMessageAction } from "@/server/actions/messages"
import { CONTACT, cn } from "@/lib/utils"

const projectTypes = ["Website", "Plataforma / Web app", "Loja online", "Design UI/UX", "Outro"]
const budgets = ["Ainda não sei", "Até 500 mil Kz", "500 mil – 1,5 milhões Kz", "Mais de 1,5 milhões Kz"]

const socials = [
	{ href: CONTACT.whatsapp, label: "WhatsApp", icon: WhatsAppIcon },
	{ href: CONTACT.linkedin, label: "LinkedIn", icon: Linkedin },
	{ href: CONTACT.github, label: "GitHub", icon: Github },
	{ href: CONTACT.instagram, label: "Instagram", icon: Instagram },
]

// text-base em mobile: abaixo de 16px o iOS faz zoom ao focar o campo.
const input =
	"w-full rounded-xl border border-white/10 bg-white/4 px-4 py-3.5 text-base text-light placeholder:text-muted/70 transition focus:border-accent-bright focus:bg-white/6 focus:outline-none aria-[invalid=true]:border-danger sm:text-sm"

export default function Contact({ index }: { index?: string }) {
	const [state, action, pending] = useActionState(sendMessageAction, {})
	const [type, setType] = useState(projectTypes[0])
	// Em mobile os campos opcionais ficam recolhidos para o formulário parecer curto.
	const [showOptional, setShowOptional] = useState(false)
	const errors = state.fieldErrors ?? {}

	return (
		<section id="contacto" className="container-page section">
			<div className="relative isolate overflow-hidden rounded-4xl border border-white/10 bg-surface">
				<div className="absolute inset-0 -z-10 bg-linear-to-br from-accent/30 via-transparent to-transparent" />
				<div className="bg-grid absolute inset-0 -z-10 opacity-40 mask-[radial-gradient(ellipse_at_top_left,black,transparent_60%)]" />

				{/* Mobile: introdução → formulário → redes. Desktop: introdução e redes à esquerda, formulário à direita. */}
				<div className="grid grid-cols-1 gap-8 p-5 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-x-16 lg:gap-y-10 lg:p-16">
					<Reveal className="flex flex-col gap-3 sm:gap-5 lg:col-start-1 lg:row-start-1">
						<span className="eyebrow">{index ? `${index} — ` : ""}Contacto</span>
						<h2 className="heading-lg">
							Vamos construir algo <span className="text-gradient">incrível</span> juntos.
						</h2>
						<p className="max-w-md leading-relaxed text-light/70 max-sm:text-[15px]">
							Conte-me sobre a sua ideia ou desafio.
							<span className="max-sm:hidden">
								{" "}
								Leio todas as mensagens e respondo pessoalmente.
							</span>
						</p>
					</Reveal>

					<Reveal delay={0.1} className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
						{state.success ? (
							<div
								role="status"
								className="flex min-h-72 flex-col items-center justify-center gap-5 rounded-3xl border border-white/10 bg-primary/60 p-8 text-center sm:min-h-96 sm:p-10"
							>
								<span className="flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
									<CheckCircle2 className="h-8 w-8 text-success" />
								</span>
								<h3 className="font-display text-2xl font-semibold">Mensagem enviada!</h3>
								<p className="max-w-sm text-muted">{state.success}</p>
							</div>
						) : (
							<form
								onSubmit={(e) => {
									e.preventDefault()
									const data = new FormData(e.currentTarget)
									startTransition(() => action(data))
								}}
								noValidate
								className="relative flex flex-col gap-5 sm:rounded-3xl sm:border sm:border-white/10 sm:bg-primary/60 sm:p-8 sm:backdrop-blur-sm"
							>
								{/* Honeypot anti-spam: escondido de pessoas e de leitores de ecrã */}
								<div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
									<label>
										Website <input name="website" tabIndex={-1} autoComplete="off" />
									</label>
								</div>

								<fieldset className="min-w-0">
									<legend className="mb-3 text-sm font-medium">Que tipo de projecto?</legend>
									<div className="chip-rail -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
										{projectTypes.map((t) => (
											<label
												key={t}
												className={cn(
													"shrink-0 cursor-pointer rounded-full border px-4 py-2 text-sm whitespace-nowrap transition has-focus-visible:outline-2 has-focus-visible:outline-accent-bright",
													type === t
														? "border-accent bg-accent text-white"
														: "border-white/10 text-light/70 hover:border-white/30",
												)}
											>
												<input
													type="radio"
													name="projectType"
													value={t}
													checked={type === t}
													onChange={() => setType(t)}
													className="sr-only"
												/>
												{t}
											</label>
										))}
									</div>
								</fieldset>

								<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
									<Field id="name" label="Nome *" error={errors.name}>
										<input id="name" name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} className={input} placeholder="O seu nome" />
									</Field>
									<Field id="email" label="Email *" error={errors.email}>
										<input id="email" name="email" type="email" inputMode="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} className={input} placeholder="nome@empresa.com" />
									</Field>
								</div>

								<Field id="message" label="Mensagem *" error={errors.message}>
									<textarea
										id="message"
										name="message"
										rows={4}
										required
										maxLength={5000}
										aria-invalid={!!errors.message}
										aria-describedby={errors.message ? "message-error" : undefined}
										className={cn(input, "resize-y")}
										placeholder="Fale-me do projecto, objectivos e prazos…"
									/>
								</Field>

								<button
									type="button"
									onClick={() => setShowOptional((v) => !v)}
									aria-expanded={showOptional}
									aria-controls="contact-optional"
									className="-mt-1 inline-flex w-fit items-center gap-1.5 text-sm text-accent-bright sm:hidden"
								>
									<ChevronDown className={cn("h-4 w-4 transition-transform", showOptional && "rotate-180")} />
									{showOptional ? "Ocultar detalhes opcionais" : "Adicionar telefone, empresa ou orçamento"}
								</button>

								<div
									id="contact-optional"
									className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5", !showOptional && "max-sm:hidden")}
								>
									<Field id="phone" label="Telefone">
										<input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" className={input} placeholder="+244 …" />
									</Field>
									<Field id="company" label="Empresa">
										<input id="company" name="company" autoComplete="organization" className={input} placeholder="Opcional" />
									</Field>
									<Field id="budget" label="Orçamento estimado" className="sm:col-span-2">
										<select id="budget" name="budget" defaultValue={budgets[0]} className={cn(input, "appearance-none")}>
											{budgets.map((b) => (
												<option key={b} value={b} className="bg-surface">
													{b}
												</option>
											))}
										</select>
									</Field>
								</div>

								{state.error && (
									<p role="alert" className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-red-200">
										{state.error}
									</p>
								)}

								<button type="submit" disabled={pending} className="btn-primary w-full py-4!">
									{pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
									{pending ? "A enviar…" : "Enviar mensagem"}
								</button>
							</form>
						)}
					</Reveal>

					<Reveal className="flex flex-col gap-6 border-t border-white/8 pt-6 sm:gap-8 lg:col-start-1 lg:row-start-2 lg:self-end lg:border-0 lg:pt-0">
						<ul className="flex flex-col gap-3 text-sm sm:gap-4">
							<li className="flex items-center gap-3 text-light/80">
								<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 sm:h-10 sm:w-10">
									<Clock className="h-4 w-4 text-accent-bright" />
								</span>
								Resposta em até 24 horas úteis
							</li>
							<li className="flex items-center gap-3 text-light/80">
								<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 sm:h-10 sm:w-10">
									<MapPin className="h-4 w-4 text-accent-bright" />
								</span>
								Luanda, Angola · Remoto para todo o mundo
							</li>
						</ul>

						<div className="flex flex-col gap-3">
							<p className="text-xs tracking-[0.2em] text-muted uppercase">Ou encontre-me em</p>
							<ul className="flex gap-2">
								{socials.map(({ href, label, icon: Icon }) => (
									<li key={label}>
										<a
											href={href}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={label}
											title={label}
											className={cn(
												"flex h-12 w-12 items-center justify-center rounded-full border border-white/15 transition",
												label === "WhatsApp"
													? "hover:border-[#25D366] hover:bg-[#25D366] hover:text-white"
													: "hover:bg-white hover:text-primary",
											)}
										>
											<Icon className="h-5 w-5" />
										</a>
									</li>
								))}
							</ul>
						</div>
					</Reveal>
				</div>
			</div>
		</section>
	)
}

function Field({
	id,
	label,
	error,
	className,
	children,
}: {
	id: string
	label: string
	error?: string
	className?: string
	children: React.ReactNode
}) {
	return (
		<div className={cn("flex flex-col gap-2", className)}>
			<label htmlFor={id} className="text-sm font-medium text-light/90">
				{label}
			</label>
			{children}
			{error && (
				<p id={`${id}-error`} className="text-xs text-danger">
					{error}
				</p>
			)}
		</div>
	)
}
