"use client"

import { motion, type HTMLMotionProps } from "framer-motion"

interface RevealProps extends HTMLMotionProps<"div"> {
	delay?: number
	y?: number
}

// Entrada suave quando o elemento aparece no ecrã.
export default function Reveal({ delay = 0, y = 28, children, ...props }: RevealProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.15 }}
			transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
			{...props}
		>
			{children}
		</motion.div>
	)
}
