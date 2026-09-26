"use client"

import { Trash2 } from "lucide-react"
import { deleteProjectAction } from "@/server/actions/projects"
import { SubmitButton } from "./ui"

export default function DeleteProject({ id, title }: { id: string; title: string }) {
	return (
		<section className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl max-lg:mb-24 border border-danger/20 bg-danger/4 p-6 sm:p-7">
			<div>
				<h2 className="font-display text-lg font-semibold">Eliminar projecto</h2>
				<p className="mt-1 text-sm text-muted">Esta acção é permanente e não pode ser desfeita.</p>
			</div>
			<form
				action={deleteProjectAction.bind(null, id)}
				onSubmit={(e) => {
					if (!confirm(`Eliminar "${title}" definitivamente?`)) e.preventDefault()
				}}
			>
				<SubmitButton variant="danger" pendingLabel="A eliminar…">
					<Trash2 className="h-4 w-4" /> Eliminar
				</SubmitButton>
			</form>
		</section>
	)
}
