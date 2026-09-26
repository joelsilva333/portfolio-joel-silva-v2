"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { inputClass } from "./ui"

export default function TagInput({
	id,
	name,
	value,
	onChange,
	placeholder,
}: {
	id?: string
	name: string
	value: string[]
	onChange: (tags: string[]) => void
	placeholder?: string
}) {
	const [draft, setDraft] = useState("")

	const commit = (raw: string) => {
		const tags = raw
			.split(",")
			.map((t) => t.trim())
			.filter((t) => t && !value.some((v) => v.toLowerCase() === t.toLowerCase()))
		if (tags.length) onChange([...value, ...tags])
		setDraft("")
	}

	return (
		<div className={cn(inputClass, "flex flex-wrap items-center gap-2 py-2.5 focus-within:border-accent-bright")}>
			<input type="hidden" name={name} value={JSON.stringify(value)} />
			{value.map((tag) => (
				<span key={tag} className="inline-flex items-center gap-1 rounded-lg bg-accent/20 py-1 pr-1 pl-2.5 text-xs text-sky-200">
					{tag}
					<button
						type="button"
						onClick={() => onChange(value.filter((t) => t !== tag))}
						aria-label={`Remover ${tag}`}
						className="rounded p-0.5 hover:bg-white/10"
					>
						<X className="h-3 w-3" />
					</button>
				</span>
			))}
			<input
				id={id}
				value={draft}
				onChange={(e) => (e.target.value.includes(",") ? commit(e.target.value) : setDraft(e.target.value))}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						e.preventDefault()
						commit(draft)
					} else if (e.key === "Backspace" && !draft && value.length) {
						onChange(value.slice(0, -1))
					}
				}}
				onBlur={() => draft && commit(draft)}
				placeholder={value.length ? "" : placeholder}
				className="min-w-32 flex-1 bg-transparent py-1 outline-none placeholder:text-muted/70"
			/>
		</div>
	)
}
