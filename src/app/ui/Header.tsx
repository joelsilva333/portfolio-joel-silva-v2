"use client"

import { ArrowUpRight, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const navItems = [
	{ href: "/#about", title: "Sobre" },
	{ href: "/#specialities", title: "Especialidades" },
	{ href: "/projectos", title: "Projectos" },
	{ href: "/#experiencia", title: "Experiência" },
	{ href: "/#faq", title: "FAQ" },
]

export default function Header() {
	const [open, setOpen] = useState(false)
	const [scrolled, setScrolled] = useState(false)
	const pathname = usePathname()

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24)
		onScroll()
		window.addEventListener("scroll", onScroll, { passive: true })
		return () => window.removeEventListener("scroll", onScroll)
	}, [])

	useEffect(() => setOpen(false), [pathname])

	return (
		<header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
			<nav
				aria-label="Principal"
				className={cn(
					"mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-5",
					scrolled || open
						? "border-white/10 bg-primary/70 shadow-2xl shadow-black/40 backdrop-blur-xl"
						: "border-transparent bg-transparent",
				)}
			>
				<Link href="/" className="flex items-center gap-3" aria-label="Início">
					<Image
						src="/logo/white.png"
						alt=""
						width={80}
						height={80}
						className="w-9 object-contain"
						priority
					/>
					<span className="hidden font-display text-sm font-semibold tracking-wide sm:block">
						JOEL SILVA
					</span>
				</Link>

				<ul className="flex items-center gap-1 max-lg:hidden">
					{navItems.map((item) => {
						const active = item.href === "/projectos" && pathname.startsWith("/projectos")
						return (
							<li key={item.href}>
								<Link
									href={item.href}
									className={cn(
										"rounded-full px-4 py-2 text-sm transition-colors",
										active ? "bg-white/10 text-white" : "text-light/70 hover:text-white",
									)}
								>
									{item.title}
								</Link>
							</li>
						)
					})}
				</ul>

				<div className="flex items-center gap-2">
					<a
						href="#contacto"
						className="btn-light px-5! py-2.5! max-sm:hidden"
					>
						Vamos conversar <ArrowUpRight className="h-4 w-4" />
					</a>
					<button
						type="button"
						onClick={() => setOpen((v) => !v)}
						aria-expanded={open}
						aria-controls="mobile-menu"
						aria-label={open ? "Fechar menu" : "Abrir menu"}
						className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 lg:hidden"
					>
						{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
					</button>
				</div>
			</nav>

			<AnimatePresence>
				{open && (
					<motion.div
						id="mobile-menu"
						initial={{ opacity: 0, y: -12, scale: 0.98 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -12, scale: 0.98 }}
						transition={{ duration: 0.25 }}
						className="mx-auto mt-2 max-w-7xl rounded-3xl border border-white/10 bg-primary/90 p-3 backdrop-blur-xl lg:hidden"
					>
						<ul className="flex flex-col">
							{navItems.map((item, i) => (
								<motion.li
									key={item.href}
									initial={{ opacity: 0, x: -8 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.04 * i }}
								>
									<Link
										href={item.href}
										onClick={() => setOpen(false)}
										className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-lg hover:bg-white/5"
									>
										{item.title}
										<ArrowUpRight className="h-4 w-4 text-muted" />
									</Link>
								</motion.li>
							))}
						</ul>
						<a
							href="#contacto"
							onClick={() => setOpen(false)}
							className="btn-primary mt-2 w-full"
						>
							Vamos conversar <ArrowUpRight className="h-4 w-4" />
						</a>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	)
}
