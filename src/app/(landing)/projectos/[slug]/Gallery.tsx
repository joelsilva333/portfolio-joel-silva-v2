"use client"

import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import Media from "@/components/Media"
import { cn, isVideo } from "@/lib/utils"

export default function Gallery({ items, title }: { items: string[]; title: string }) {
	const dialogRef = useRef<HTMLDialogElement>(null)
	const [current, setCurrent] = useState(0)
	const touchX = useRef<number | null>(null)

	// showModal() dá foco preso, Esc para fechar e coloca o diálogo na top layer.
	const open = (index: number) => {
		setCurrent(index)
		dialogRef.current?.showModal()
		document.body.style.overflow = "hidden"
	}
	const close = () => dialogRef.current?.close()
	const go = useCallback(
		(delta: number) => setCurrent((i) => (i + delta + items.length) % items.length),
		[items.length],
	)

	useEffect(() => {
		const dialog = dialogRef.current
		if (!dialog) return

		const onKey = (e: KeyboardEvent) => {
			if (e.key === "ArrowRight") go(1)
			if (e.key === "ArrowLeft") go(-1)
		}
		const onClose = () => (document.body.style.overflow = "")

		dialog.addEventListener("keydown", onKey)
		dialog.addEventListener("close", onClose)
		return () => {
			dialog.removeEventListener("keydown", onKey)
			dialog.removeEventListener("close", onClose)
			document.body.style.overflow = ""
		}
	}, [go])

	if (!items.length) return null
	const src = items[current]

	return (
		<>
			<ul className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-3">
				{items.map((item, i) => (
					<li
						key={item + i}
						className={cn(
							// Ritmo editorial: o primeiro e cada quinto item ocupam duas colunas.
							i % 5 === 0 && "col-span-2",
						)}
					>
						<button
							type="button"
							onClick={() => open(i)}
							aria-label={`Ampliar imagem ${i + 1} de ${items.length}`}
							className={cn(
								"group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border sm:rounded-2xl border-white/7 bg-surface-2",
								i % 5 === 0 ? "aspect-video" : "aspect-4/3",
							)}
						>
							<Media
								src={item}
								alt={`${title} — imagem ${i + 1}`}
								sizes={i % 5 === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 50vw"}
								className="transition-transform duration-700 group-hover:scale-[1.04]"
							/>
							<span className="absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary/70 opacity-0 backdrop-blur transition group-hover:opacity-100">
								<Expand className="h-4 w-4" />
							</span>
						</button>
					</li>
				))}
			</ul>

			<dialog
				ref={dialogRef}
				className="lightbox"
				aria-label={`Galeria de ${title}`}
			>
				{/* A lightbox ocupa o ecrã todo: clicar numa área vazia fecha-a. */}
				<div className="flex h-full w-full flex-col" onClick={(e) => e.target === e.currentTarget && close()}>
					<div className="flex items-center justify-between p-4 text-sm text-light/70">
						<span className="font-display tabular-nums">
							{String(current + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
						</span>
						<button
							type="button"
							onClick={close}
							aria-label="Fechar galeria"
							className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
						>
							<X className="h-5 w-5" />
						</button>
					</div>

					<div
						className="relative flex flex-1 items-center justify-center px-2 pb-4 sm:px-20"
						onClick={(e) => e.target === e.currentTarget && close()}
						// Deslizar com o dedo para mudar de imagem (mobile)
						onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
						onTouchEnd={(e) => {
							if (touchX.current === null) return
							const dx = e.changedTouches[0].clientX - touchX.current
							touchX.current = null
							if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
						}}
					>
						{isVideo(src) ? (
							<video
								key={src}
								src={src}
								autoPlay
								loop
								muted
								playsInline
								controls
								className="max-h-full max-w-full rounded-xl"
							/>
						) : (
							<div className="relative h-full w-full">
								<Image
									key={src}
									src={src}
									alt={`${title} — imagem ${current + 1}`}
									fill
									sizes="100vw"
									className="object-contain"
								/>
							</div>
						)}

						{items.length > 1 && (
							<>
								<button
									type="button"
									onClick={() => go(-1)}
									aria-label="Imagem anterior"
									className="absolute top-1/2 left-2 flex h-11 w-11 max-sm:bg-black/50 sm:left-4 sm:h-12 sm:w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 backdrop-blur hover:bg-white/20"
								>
									<ChevronLeft className="h-5 w-5" />
								</button>
								<button
									type="button"
									onClick={() => go(1)}
									aria-label="Imagem seguinte"
									className="absolute top-1/2 right-2 flex h-11 w-11 max-sm:bg-black/50 sm:right-4 sm:h-12 sm:w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 backdrop-blur hover:bg-white/20"
								>
									<ChevronRight className="h-5 w-5" />
								</button>
							</>
						)}
					</div>
				</div>
			</dialog>
		</>
	)
}
