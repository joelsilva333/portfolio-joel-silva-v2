"use client"

import { AnimatePresence, motion } from "framer-motion"
import { MessageSquareText } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

/**
 * Atalho fixo para o formulário, só em mobile: aparece depois de sair do topo
 * e esconde-se enquanto a secção de contacto (ou o rodapé) estiver visível.
 */
export default function MobileContactBar() {
	const pathname = usePathname()
	const [pastTop, setPastTop] = useState(false)
	const [contactVisible, setContactVisible] = useState(false)
	const [nearBottom, setNearBottom] = useState(false)

	useEffect(() => {
		const onScroll = () => {
			setPastTop(window.scrollY > window.innerHeight * 0.6)
			// Junto ao rodapé o botão taparia os links
			setNearBottom(window.scrollY + window.innerHeight > document.documentElement.scrollHeight - 320)
		}
		onScroll()
		window.addEventListener("scroll", onScroll, { passive: true })

		const contact = document.getElementById("contacto")
		const observer = contact
			? new IntersectionObserver(([entry]) => setContactVisible(entry.isIntersecting), {
					rootMargin: "0px 0px -20% 0px",
				})
			: null
		if (contact) observer?.observe(contact)

		return () => {
			window.removeEventListener("scroll", onScroll)
			observer?.disconnect()
		}
	}, [pathname])

	const show = pastTop && !contactVisible && !nearBottom

	return (
		<AnimatePresence>
			{show && (
				<motion.div
					initial={{ y: 80, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 80, opacity: 0 }}
					transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
					className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden"
				>
					<a
						href="#contacto"
						className="btn-primary w-full max-w-sm py-3.5! shadow-2xl shadow-black/60"
					>
						<MessageSquareText className="h-4 w-4" /> Falar comigo
					</a>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
