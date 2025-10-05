"use client"

import { useRouter, usePathname } from "next/navigation"
import { MoveRight, Menu, X } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function Header() {
	const [open, setOpen] = useState(false)
	const router = useRouter()
	const pathname = usePathname()

	const navItems = [
		{ link: "/#about", title: "Sobre" },
		{ link: "/#specialities", title: "Especialidades" },
		{ link: "/#projects", title: "Projectos" },
		{ link: "/#faq", title: "Faq" },
	]

	const handleNavigation = (href: string) => {
		const [path, hash] = href.split("#")

		if (pathname === path) {
			const el = document.getElementById(hash)
			if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
		} else {
			router.push(path + "#" + hash)
		}
		setOpen(false)
	}

	useEffect(() => {
		if (typeof window === "undefined") return
		const hash = window.location.hash.replace("#", "")
		if (!hash) return

		const el = document.getElementById(hash)
		if (el) {
			setTimeout(() => {
				el.scrollIntoView({ behavior: "smooth", block: "start" })
			}, 300)
		}
	}, [pathname])

	return (
		<header className="fixed top-4 left-1/2 -translate-x-1/2 text-light w-full max-w-7xl rounded-full px-6 py-3 flex items-center justify-between z-50 bg-light/10 backdrop-blur-xs">
			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
			>
				<Image
					src="/logo/white.png"
					alt="Logotipo Joel Silva"
					width={1920}
					height={1080}
					className="w-10 object-contain cursor-pointer"
					onClick={() => router.push("/")}
				/>
			</motion.div>

			<ul className="flex items-center gap-8 max-lg:hidden">
				{navItems.map((item, index) => (
					<li
						key={index}
						className="font-medium text-sm cursor-pointer"
						onClick={() => handleNavigation(item.link)}
					>
						{item.title.toUpperCase()}
					</li>
				))}
			</ul>

			<motion.div className="max-lg:hidden">
				<a
					href="https://api.whatsapp.com/send?phone=244946506875&text=Olá!%20Quero%20um%20website%20para%20mim!"
					target="_blank"
					className="btn-primary"
				>
					CONTACTAR <MoveRight className="w-6" />
				</a>
			</motion.div>

			<motion.button
				onClick={() => setOpen(!open)}
				whileTap={{ scale: 0.9 }}
				className="hidden max-lg:flex items-center justify-center w-10 h-10 rounded-full bg-light/10 hover:bg-light/20 transition"
			>
				{open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
			</motion.button>

			<AnimatePresence>
				{" "}
				{open && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.3 }}
						className="fixed z-30 top-17 mt-3 left-0 w-full px-6 py-4 bg-primary/60 backdrop-blur-xs rounded-2xl flex flex-col items-center gap-4 max-lg:flex"
					>
						{" "}
						{navItems.map((item, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								className="hover:scale-105 transition-all duration-300"
								transition={{ delay: 0.05 * index }}
							>
								{" "}
								<button
									onClick={() => handleNavigation(item.link)}
									className="text-light font-medium text-sm "
								>
									{" "}
									{item.title.toUpperCase()}{" "}
								</button>{" "}
							</motion.div>
						))}{" "}
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.25 }}
							className="w-full"
						>
							{" "}
							<Link
								href="https://api.whatsapp.com/send?phone=244946506875&text=Quero%20um%20website%20para%20mim"
								target="_blank"
								className="btn-primary flex w-full justify-center"
							>
								{" "}
								CONTACTAR <MoveRight className="w-6" />{" "}
							</Link>{" "}
						</motion.div>{" "}
					</motion.div>
				)}{" "}
			</AnimatePresence>
		</header>
	)
}
