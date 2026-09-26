import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Mail, MailOpen, Phone, Reply, Trash2 } from "lucide-react"
import { SubmitButton } from "@/components/admin/ui"
import ConfirmForm from "@/components/admin/ConfirmForm"
import { getMessage } from "@/server/messages"
import { messagesRepo } from "@/server/db/data-source"
import { deleteMessageAction, setMessageReadAction } from "@/server/actions/messages"

export const metadata: Metadata = { title: "Mensagem" }

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export default async function MessagePage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params
	if (!UUID.test(id)) notFound()
	const message = await getMessage(id)
	if (!message) notFound()

	// Abrir a mensagem marca-a como lida.
	if (!message.read) await (await messagesRepo()).update({ id }, { read: true })

	const details = [
		{ label: "Email", value: message.email, href: `mailto:${message.email}` },
		{ label: "Telefone", value: message.phone, href: message.phone ? `tel:${message.phone.replace(/\s/g, "")}` : undefined },
		{ label: "Empresa", value: message.company },
		{ label: "Tipo de projecto", value: message.projectType },
		{ label: "Orçamento", value: message.budget },
		{
			label: "Recebida",
			value: new Intl.DateTimeFormat("pt-PT", { dateStyle: "long", timeStyle: "short" }).format(new Date(message.createdAt)),
		},
	].filter((d) => d.value)

	const replySubject = encodeURIComponent(`Re: ${message.projectType ?? "O seu contacto"} — Joel Silva`)

	return (
		<>
			<Link href="/admin/mensagens" className="mb-4 inline-flex items-center gap-2 text-sm text-muted hover:text-light">
				<ArrowLeft className="h-4 w-4" /> Mensagens
			</Link>

			<div className="mb-8 flex flex-wrap items-end justify-between gap-4">
				<div>
					<h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{message.name}</h1>
					<p className="mt-2 text-muted">{message.projectType ?? "Contacto"}</p>
				</div>
				<div className="flex flex-wrap gap-3">
					<a href={`mailto:${message.email}?subject=${replySubject}`} className="btn-primary">
						<Reply className="h-4 w-4" /> Responder por email
					</a>
					{message.phone && (
						<a href={`tel:${message.phone.replace(/\s/g, "")}`} className="btn-ghost">
							<Phone className="h-4 w-4" /> Ligar
						</a>
					)}
				</div>
			</div>

			<div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
				<section className="card p-6 sm:p-8">
					<h2 className="mb-4 text-xs font-medium tracking-[0.2em] text-muted uppercase">Mensagem</h2>
					<p className="leading-relaxed whitespace-pre-wrap text-light/90">{message.message}</p>
				</section>

				<aside className="flex flex-col gap-6">
					<dl className="card divide-y divide-white/7">
						{details.map((d) => (
							<div key={d.label} className="flex flex-col gap-1 px-5 py-3.5">
								<dt className="text-xs text-muted">{d.label}</dt>
								<dd className="text-sm wrap-break-word">
									{d.href ? (
										<a href={d.href} className="text-accent-bright hover:underline">
											{d.value}
										</a>
									) : (
										d.value
									)}
								</dd>
							</div>
						))}
					</dl>

					<div className="flex flex-col gap-3">
						<form action={setMessageReadAction.bind(null, message.id, false)}>
							<SubmitButton variant="ghost" className="w-full" pendingLabel="A actualizar…">
								<Mail className="h-4 w-4" /> Marcar como não lida
							</SubmitButton>
						</form>
						<ConfirmForm
							action={deleteMessageAction.bind(null, message.id)}
							message={`Eliminar a mensagem de ${message.name}?`}
						>
							<SubmitButton variant="danger" className="w-full" pendingLabel="A eliminar…">
								<Trash2 className="h-4 w-4" /> Eliminar
							</SubmitButton>
						</ConfirmForm>
					</div>
					<p className="flex items-center gap-2 text-xs text-muted">
						<MailOpen className="h-3.5 w-3.5" /> Aberta: marcada como lida automaticamente.
					</p>
				</aside>
			</div>
		</>
	)
}
