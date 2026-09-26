"use client"

import { useRef, useState } from "react"
import { ArrowLeft, ArrowRight, ImagePlus, Link2, Loader2, Trash2, Upload } from "lucide-react"
import Media from "@/components/Media"
import { cn } from "@/lib/utils"
import { ACCEPT_MEDIA, uploadFiles } from "./upload"
import { inputClass } from "./ui"

function useUploader(onDone: (urls: string[]) => void) {
	const [busy, setBusy] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const run = async (files: FileList | File[] | null) => {
		if (!files || !files.length) return
		setBusy(true)
		setError(null)
		try {
			onDone(await uploadFiles(files))
		} catch (e) {
			setError(e instanceof Error ? e.message : "Falha no upload.")
		} finally {
			setBusy(false)
		}
	}
	return { busy, error, run }
}

function UrlAdder({ onAdd, placeholder }: { onAdd: (url: string) => void; placeholder: string }) {
	const [value, setValue] = useState("")
	const add = () => {
		const url = value.trim()
		if (url) onAdd(url)
		setValue("")
	}
	return (
		<div className="flex gap-2">
			<div className="relative flex-1">
				<Link2 className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted" />
				<input
					type="url"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault()
							add()
						}
					}}
					placeholder={placeholder}
					className={cn(inputClass, "pl-10")}
				/>
			</div>
			<button type="button" onClick={add} className="btn-ghost px-4! py-2!">
				Adicionar
			</button>
		</div>
	)
}

export function CoverField({
	value,
	onChange,
	error,
}: {
	value: string
	onChange: (url: string) => void
	error?: string
}) {
	const input = useRef<HTMLInputElement>(null)
	const [dragging, setDragging] = useState(false)
	const { busy, error: uploadError, run } = useUploader((urls) => onChange(urls[0]))

	return (
		<div className="flex flex-col gap-3">
			<input type="hidden" name="cover" value={value} />
			<button
				type="button"
				onClick={() => input.current?.click()}
				onDragOver={(e) => {
					e.preventDefault()
					setDragging(true)
				}}
				onDragLeave={() => setDragging(false)}
				onDrop={(e) => {
					e.preventDefault()
					setDragging(false)
					run(e.dataTransfer.files)
				}}
				className={cn(
					"group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed transition",
					dragging ? "border-accent-bright bg-accent/10" : "border-white/10 hover:border-white/25",
					error && "border-danger/60",
				)}
			>
				{value ? (
					<>
						<Media src={value} alt="Pré-visualização da capa" sizes="600px" />
						<span className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 text-sm opacity-0 transition group-hover:opacity-100">
							<Upload className="h-4 w-4" /> Substituir capa
						</span>
					</>
				) : (
					<span className="flex flex-col items-center gap-2 text-sm text-muted">
						<ImagePlus className="h-8 w-8" />
						<span>
							<strong className="text-light">Clique</strong> ou arraste uma imagem/vídeo
						</span>
						<span className="text-xs">PNG, JPG, WEBP, AVIF, MP4 · até 60 MB</span>
					</span>
				)}
				{busy && (
					<span className="absolute inset-0 flex items-center justify-center bg-black/70">
						<Loader2 className="h-6 w-6 animate-spin" />
					</span>
				)}
			</button>
			<input
				ref={input}
				type="file"
				accept={ACCEPT_MEDIA}
				className="hidden"
				onChange={(e) => {
					run(e.target.files)
					e.target.value = ""
				}}
			/>
			<UrlAdder onAdd={onChange} placeholder="…ou cole o URL de uma imagem" />
			{(uploadError || error) && <p className="text-xs text-danger">{uploadError || error}</p>}
		</div>
	)
}

export function GalleryField({
	value,
	onChange,
	error,
}: {
	value: string[]
	onChange: (items: string[]) => void
	error?: string
}) {
	const input = useRef<HTMLInputElement>(null)
	const { busy, error: uploadError, run } = useUploader((urls) => onChange([...value, ...urls]))

	const move = (from: number, to: number) => {
		if (to < 0 || to >= value.length) return
		const next = [...value]
		;[next[from], next[to]] = [next[to], next[from]]
		onChange(next)
	}

	return (
		<div className="flex flex-col gap-4">
			<input type="hidden" name="gallery" value={JSON.stringify(value)} />
			<ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
				{value.map((src, i) => (
					<li
						key={src + i}
						className="group relative aspect-4/3 overflow-hidden rounded-xl border border-white/10 bg-surface-2"
					>
						<Media src={src} alt={`Item ${i + 1} da galeria`} sizes="240px" />
						<span className="absolute top-2 left-2 rounded-md bg-black/70 px-1.5 py-0.5 text-[11px] tabular-nums">
							{i + 1}
						</span>
						<div className="absolute inset-x-2 bottom-2 flex justify-between gap-1 opacity-0 transition group-focus-within:opacity-100 group-hover:opacity-100 max-sm:opacity-100">
							<div className="flex gap-1">
								<button type="button" onClick={() => move(i, i - 1)} disabled={i === 0} aria-label="Mover para trás" className="rounded-md bg-black/70 p-1.5 disabled:opacity-30">
									<ArrowLeft className="h-3.5 w-3.5" />
								</button>
								<button type="button" onClick={() => move(i, i + 1)} disabled={i === value.length - 1} aria-label="Mover para a frente" className="rounded-md bg-black/70 p-1.5 disabled:opacity-30">
									<ArrowRight className="h-3.5 w-3.5" />
								</button>
							</div>
							<button
								type="button"
								onClick={() => onChange(value.filter((_, j) => j !== i))}
								aria-label="Remover da galeria"
								className="rounded-md bg-black/70 p-1.5 text-red-300 hover:bg-danger hover:text-white"
							>
								<Trash2 className="h-3.5 w-3.5" />
							</button>
						</div>
					</li>
				))}
				<li>
					<button
						type="button"
						onClick={() => input.current?.click()}
						onDragOver={(e) => e.preventDefault()}
						onDrop={(e) => {
							e.preventDefault()
							run(e.dataTransfer.files)
						}}
						className="flex aspect-4/3 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/10 text-xs text-muted transition hover:border-white/25 hover:text-light"
					>
						{busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <ImagePlus className="h-5 w-5" />}
						{busy ? "A enviar…" : "Adicionar ficheiros"}
					</button>
				</li>
			</ul>
			<input
				ref={input}
				type="file"
				accept={ACCEPT_MEDIA}
				multiple
				className="hidden"
				onChange={(e) => {
					run(e.target.files)
					e.target.value = ""
				}}
			/>
			<UrlAdder onAdd={(url) => onChange([...value, url])} placeholder="Adicionar por URL" />
			{(uploadError || error) && <p className="text-xs text-danger">{uploadError || error}</p>}
		</div>
	)
}
