"use client"

import { MoveRight, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export default function Header() {
	const [open, setOpen] = useState(false)

	const navItems = [
		{ link: "#", title: "Sobre" },
		{ link: "#", title: "Especialidades" },
		{ link: "#", title: "Projectos" },
		{ link: "#", title: "Faq" },
	]

	return (
		<>
			<header className="fixed top-4 left-1/2 -translate-x-1/2 text-light w-full max-w-7xl rounded-full px-6 py-3 flex items-center justify-between z-20 bg-light/10 backdrop-blur-xs">
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
				>
					<Link href="#">
						<Image
							src="/logo/white.png"
							alt="Logotipo Joel Silva"
							width={1920}
							height={1080}
							className="w-10 object-contain"
						/>
					</Link>
				</motion.div>

				<motion.ul
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1, duration: 0.4 }}
					className="flex items-center gap-8 max-lg:hidden"
				>
					{navItems.map((item, index) => (
						<motion.li
							key={index}
							whileHover={{ scale: 1.05 }}
							transition={{ type: "spring", stiffness: 300 }}
							className="font-medium text-sm"
						>
							<Link href={item.link}>{item.title.toUpperCase()}</Link>
						</motion.li>
					))}
				</motion.ul>

				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.4 }}
					className="max-lg:hidden"
				>
					<Link
						href="https://api.whatsapp.com/send?phone=244946506875&text=Olá!%20Quero%20um%20website%20para%20mim!"
						target="_blank"
						className="btn-primary"
					>
						CONTACTAR <MoveRight className="w-6" />
					</Link>
				</motion.div>

				<motion.button
					onClick={() => setOpen(!open)}
					whileTap={{ scale: 0.9 }}
					className="hidden max-lg:flex items-center justify-center w-10 h-10 rounded-full bg-light/10 hover:bg-light/20 transition"
				>
					{open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
				</motion.button>
			</header>

			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.3 }}
						className="fixed z-30 top-17 mt-3 left-0 w-full px-6 py-4 bg-primary/60 backdrop-blur-xs rounded-2xl flex flex-col items-center gap-4 max-lg:flex"
					>
						{navItems.map((item, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								className="hover:scale-105 transition-all duration-300"
								transition={{ delay: 0.05 * index }}
							>
								<Link
									href={item.link}
									onClick={() => setOpen(false)}
									className="text-light font-medium text-sm "
								>
									{item.title.toUpperCase()}
								</Link>
							</motion.div>
						))}

						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.25 }}
							className="w-full"
						>
							<Link
								href="https://api.whatsapp.com/send?phone=244946506875&text=Quero%20um%20website%20para%20mim"
								target="_blank"
								onClick={() => setOpen(false)}
								className="btn-primary flex w-full justify-center"
							>
								CONTACTAR <MoveRight className="w-6" />
							</Link>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
