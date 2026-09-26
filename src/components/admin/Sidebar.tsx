"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { ExternalLink, FolderKanban, Inbox, LayoutDashboard, LogOut, Menu, Plus, Settings, X } from "lucide-react"
import { logoutAction } from "@/server/actions/auth"
import { cn } from "@/lib/utils"

const nav = [
	{ href: "/admin", label: "Visão geral", icon: LayoutDashboard, exact: true },
	{ href: "/admin/projectos", label: "Projectos", icon: FolderKanban },
	{ href: "/admin/mensagens", label: "Mensagens", icon: Inbox },
	{ href: "/admin/definicoes", label: "Definições", icon: Settings },
]

export default function Sidebar({ name, email, unread }: { name: string; email: string; unread: number }) {
	const pathname = usePathname()
	const [open, setOpen] = useState(false)
	useEffect(() => setOpen(false), [pathname])

	const initials = name
		.split(" ")
		.map((p) => p[0])
		.slice(0, 2)
		.join("")
		.toUpperCase()

	return (
		<>
			{/* Barra superior em mobile */}
			<div className="sticky top-0 z-40 flex items-center justify-between border-b border-white/6 bg-primary/80 px-5 py-3 backdrop-blur-xl lg:hidden">
				<Link href="/admin" className="flex items-center gap-2 font-display font-semibold">
					<Image src="/logo/white.png" alt="" width={64} height={64} className="w-8" /> Painel
				</Link>
				<button
					type="button"
					onClick={() => setOpen((v) => !v)}
					aria-expanded={open}
					aria-controls="admin-sidebar"
					aria-label={open ? "Fechar menu" : "Abrir menu"}
					className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10"
				>
					{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
				</button>
			</div>

			<aside
				id="admin-sidebar"
				className={cn(
					"flex w-72 shrink-0 flex-col border-r border-white/6 bg-surface px-4 py-6 lg:sticky lg:top-0 lg:h-screen",
					"max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:z-50 max-lg:transition-transform max-lg:duration-300",
					open ? "max-lg:translate-x-0" : "max-lg:-translate-x-full",
				)}
			>
				<Link href="/admin" className="mb-8 flex items-center gap-3 px-3">
					<Image src="/logo/white.png" alt="" width={64} height={64} className="w-9" />
					<div className="leading-tight">
						<p className="font-display text-sm font-semibold">JOEL SILVA</p>
						<p className="text-xs text-muted">Painel de gestão</p>
					</div>
				</Link>

				<Link href="/admin/projectos/novo" className="btn-primary mb-6 w-full">
					<Plus className="h-4 w-4" /> Novo projecto
				</Link>

				<nav aria-label="Painel" className="flex flex-col gap-1">
					{nav.map(({ href, label, icon: Icon, exact }) => {
						const active = exact ? pathname === href : pathname.startsWith(href)
						return (
							<Link
								key={href}
								href={href}
								aria-current={active ? "page" : undefined}
								className={cn(
									"flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
									active ? "bg-white/7 text-white" : "text-light/60 hover:bg-white/4 hover:text-light",
								)}
							>
								<Icon className={cn("h-4 w-4", active && "text-accent-bright")} />
								{label}
								{href === "/admin/mensagens" && unread > 0 && (
									<span className="ml-auto rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-white tabular-nums">
										{unread}
										<span className="sr-only"> por ler</span>
									</span>
								)}
							</Link>
						)
					})}
					<a
						href="/"
						target="_blank"
						className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-light/60 transition hover:bg-white/4 hover:text-light"
					>
						<ExternalLink className="h-4 w-4" /> Ver site
					</a>
				</nav>

				<div className="mt-auto flex items-center gap-3 rounded-2xl border border-white/6 bg-white/2 p-3">
					<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent font-display text-sm font-semibold">
						{initials || "JS"}
					</span>
					<div className="min-w-0 flex-1">
						<p className="truncate text-sm font-medium">{name}</p>
						<p className="truncate text-xs text-muted">{email}</p>
					</div>
					<form action={logoutAction}>
						<button
							type="submit"
							aria-label="Terminar sessão"
							title="Terminar sessão"
							className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition hover:bg-white/10 hover:text-light"
						>
							<LogOut className="h-4 w-4" />
						</button>
					</form>
				</div>
			</aside>

			{open && (
				<button
					type="button"
					aria-label="Fechar menu"
					onClick={() => setOpen(false)}
					className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
				/>
			)}
		</>
	)
}
