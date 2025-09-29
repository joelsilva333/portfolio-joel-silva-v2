"use client"

import Image from "next/image"

export default function Footer() {
	return (
		<footer className="w-full border-t border-gray-800 bg-black text-gray-400">
			<div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-6 gap-4">
				<Image src="/logo/white.png" alt="Logo" width={32} height={32} />

				<p className="text-sm text-light/80">
					© {new Date().getFullYear()} Joel Germano. Todos os direitos
					reservados.
				</p>
			</div>
		</footer>
	)
}
