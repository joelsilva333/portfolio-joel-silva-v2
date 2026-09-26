import Link from "next/link"
import { ArrowUpRight, Eye, EyeOff, FolderKanban, Inbox, Plus } from "lucide-react"
import PageHeader from "@/components/admin/PageHeader"
import Thumb from "@/components/admin/Thumb"
import { listAllProjects } from "@/server/projects"
import { getSession } from "@/server/auth"
import { listMessages } from "@/server/messages"
import { cn } from "@/lib/utils"

const dateFormat = new Intl.DateTimeFormat("pt-PT", { dateStyle: "medium", timeStyle: "short" })

export default async function DashboardPage() {
	const [session, projects, messages] = await Promise.all([getSession(), listAllProjects(), listMessages()])
	const unread = messages.filter((m) => !m.read).length
	const firstName = session?.name.split(" ")[0] ?? ""

	const stats = [
		{ label: "Projectos", value: projects.length, icon: FolderKanban },
		{ label: "Publicados", value: projects.filter((p) => p.published).length, icon: Eye },
		{ label: "Rascunhos", value: projects.filter((p) => !p.published).length, icon: EyeOff },
		{ label: "Mensagens por ler", value: unread, icon: Inbox },
	]

	const recent = [...projects]
		.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
		.slice(0, 5)

	return (
		<>
			<PageHeader
				title={`Olá, ${firstName} 👋`}
				description="Um resumo rápido do seu portfólio."
				actions={
					<Link href="/admin/projectos/novo" className="btn-primary">
						<Plus className="h-4 w-4" /> Novo projecto
					</Link>
				}
			/>

			<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				{stats.map(({ label, value, icon: Icon }) => (
					<div key={label} className="card flex items-center justify-between p-6">
						<div>
							<p className="text-sm text-muted">{label}</p>
							<p className="mt-2 font-display text-4xl font-semibold">{value}</p>
						</div>
						<span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15">
							<Icon className="h-5 w-5 text-accent-bright" />
						</span>
					</div>
				))}
			</div>

			<div className="mt-8 grid gap-6 xl:grid-cols-2">
			<section className="card overflow-hidden">
				<header className="flex items-center justify-between border-b border-white/6 px-6 py-5">
					<h2 className="font-display text-lg font-semibold">Actualizados recentemente</h2>
					<Link href="/admin/projectos" className="text-sm text-accent-bright hover:underline">
						Ver todos
					</Link>
				</header>
				{recent.length === 0 ? (
					<div className="flex flex-col items-center gap-4 p-12 text-center">
						<p className="text-muted">Ainda não tem projectos.</p>
						<Link href="/admin/projectos/novo" className="btn-primary">
							<Plus className="h-4 w-4" /> Criar o primeiro
						</Link>
					</div>
				) : (
					<ul className="divide-y divide-white/6">
						{recent.map((p) => (
							<li key={p.id}>
								<Link
									href={`/admin/projectos/${p.id}`}
									className="flex items-center gap-4 px-6 py-4 transition hover:bg-white/2"
								>
									<Thumb src={p.cover} className="h-12 w-16" />
									<div className="min-w-0 flex-1">
										<p className="truncate font-medium">{p.title}</p>
										<p className="truncate text-xs text-muted">{p.category}</p>
									</div>
									<span className="text-xs text-muted max-sm:hidden">
										{dateFormat.format(new Date(p.updatedAt))}
									</span>
									<ArrowUpRight className="h-4 w-4 text-muted" />
								</Link>
							</li>
						))}
					</ul>
				)}
			</section>

			<section className="card overflow-hidden">
				<header className="flex items-center justify-between border-b border-white/6 px-6 py-5">
					<h2 className="font-display text-lg font-semibold">Últimas mensagens</h2>
					<Link href="/admin/mensagens" className="text-sm text-accent-bright hover:underline">
						Ver todas
					</Link>
				</header>
				{messages.length === 0 ? (
					<p className="p-12 text-center text-muted">Ainda não recebeu mensagens.</p>
				) : (
					<ul className="divide-y divide-white/6">
						{messages.slice(0, 5).map((m) => (
							<li key={m.id}>
								<Link href={`/admin/mensagens/${m.id}`} className="flex items-center gap-4 px-6 py-4 transition hover:bg-white/2">
									<span className={cn("h-2 w-2 shrink-0 rounded-full", m.read ? "bg-white/15" : "bg-accent-bright")} />
									<div className="min-w-0 flex-1">
										<p className={cn("truncate", !m.read && "font-semibold")}>{m.name}</p>
										<p className="truncate text-xs text-muted">{m.message}</p>
									</div>
									<span className="text-xs text-muted max-sm:hidden">{dateFormat.format(new Date(m.createdAt))}</span>
								</Link>
							</li>
						))}
					</ul>
				)}
			</section>
			</div>
		</>
	)
}
