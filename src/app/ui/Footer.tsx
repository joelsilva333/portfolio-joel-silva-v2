"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function Footer() {
	return (
		<footer className="w-full border-t border-gray-800 bg-black text-gray-400">
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5 }}
				className="max-w-7xl mx-auto flex flex-col max-lg:flex-col md:flex-row items-center justify-between px-6 py-6 gap-4 text-center max-lg:text-center"
			>
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
					viewport={{ once: true }}
					className="flex items-center justify-center max-lg:mb-2"
				>
					<Image
						src="/logo/white.png"
						alt="Logo"
						width={40}
						height={40}
						className="object-contain"
					/>
				</motion.div>

				<motion.p
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.2 }}
					className="text-sm text-light/80 max-lg:text-xs leading-relaxed"
				>
					Todos os direitos reservados à Joel Germano ©{" "}
					{new Date().getFullYear()}{" "}
				</motion.p>
			</motion.div>
		</footer>
	)
}
