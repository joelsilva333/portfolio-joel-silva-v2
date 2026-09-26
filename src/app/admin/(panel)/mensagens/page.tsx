import type { Metadata } from "next"
import Link from "next/link"
import { Inbox } from "lucide-react"
import PageHeader from "@/components/admin/PageHeader"
import { listMessages } from "@/server/messages"
import { cn } from "@/lib/utils"

export const metadata: Metadata = { title: "Mensagens" }

const dateFormat = new Intl.DateTimeFormat("pt-PT", { dateStyle: "short", timeStyle: "short" })

export default async function MessagesPage({
	searchParams,
}: {
	searchParams: Promise<{ filtro?: string }>
}) {
	const filter = (await searchParams).filtro === "nao-lidas" ? "unread" : "all"
	const messages = await listMessages(filter)

	const tabs = [
		{ href: "/admin/mensagens", label: "Todas", active: filter === "all" },
		{ href: "/admin/mensagens?filtro=nao-lidas", label: "Não lidas", active: filter === "unread" },
	]

	return (
		<>
			<PageHeader title="Mensagens" description="Pedidos recebidos pelo formulário de contacto do site." />

			<nav aria-label="Filtro" className="mb-6 flex gap-2">
				{tabs.map((t) => (
					<Link
						key={t.href}
						href={t.href}
						aria-current={t.active ? "page" : undefined}
						className={cn(
							"rounded-full border px-4 py-2 text-sm transition",
							t.active ? "border-accent bg-accent text-white" : "border-white/10 text-light/70 hover:border-white/30",
						)}
					>
						{t.label}
					</Link>
				))}
			</nav>

			{messages.length === 0 ? (
				<div className="card flex flex-col items-center gap-3 p-16 text-center text-muted">
					<Inbox className="h-8 w-8" />
					<p>{filter === "unread" ? "Nenhuma mensagem por ler." : "Ainda não recebeu mensagens."}</p>
				</div>
			) : (
				<ul className="card divide-y divide-white/6 overflow-hidden">
					{messages.map((m) => (
						<li key={m.id}>
							<Link
								href={`/admin/mensagens/${m.id}`}
								className="flex items-start gap-4 px-5 py-4 transition hover:bg-white/2 sm:px-6"
							>
								<span
									aria-label={m.read ? undefined : "Não lida"}
									className={cn("mt-2 h-2 w-2 shrink-0 rounded-full", m.read ? "bg-transparent" : "bg-accent-bright")}
								/>
								<div className="min-w-0 flex-1">
									<div className="flex items-baseline justify-between gap-4">
										<p className={cn("truncate", !m.read && "font-semibold")}>
											{m.name}
											{m.company && <span className="font-normal text-muted"> · {m.company}</span>}
										</p>
										<span className="shrink-0 text-xs text-muted">{dateFormat.format(new Date(m.createdAt))}</span>
									</div>
									<p className="mt-0.5 text-xs text-accent-bright">{m.projectType ?? "Contacto"}</p>
									<p className="mt-1 line-clamp-1 text-sm text-muted">{m.message}</p>
								</div>
							</Link>
						</li>
					))}
				</ul>
			)}
		</>
	)
}
