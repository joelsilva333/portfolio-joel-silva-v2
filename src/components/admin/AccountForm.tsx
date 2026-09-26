"use client"

import { useActionState } from "react"
import { Save } from "lucide-react"
import { updateAccountAction } from "@/server/actions/auth"
import { Alert, Field, Panel, SubmitButton, inputClass } from "./ui"

export default function AccountForm({ name, email }: { name: string; email: string }) {
	const [state, action] = useActionState(updateAccountAction, {})

	return (
		<form action={action} className="grid max-w-3xl gap-6">
			{state.error && <Alert tone="error">{state.error}</Alert>}
			{state.success && <Alert tone="success">{state.success}</Alert>}

			<Panel title="Perfil">
				<div className="grid gap-5 sm:grid-cols-2">
					<Field label="Nome" htmlFor="name">
						<input id="name" name="name" defaultValue={name} required autoComplete="name" className={inputClass} />
					</Field>
					<Field label="Email" htmlFor="email">
						<input id="email" name="email" type="email" defaultValue={email} required autoComplete="email" className={inputClass} />
					</Field>
				</div>
			</Panel>

			<Panel title="Palavra-passe" description="Deixe em branco para manter a actual.">
				<div className="grid gap-5 sm:grid-cols-2">
					<Field label="Nova palavra-passe" htmlFor="newPassword" hint="Mínimo de 8 caracteres.">
						<input id="newPassword" name="newPassword" type="password" autoComplete="new-password" minLength={8} className={inputClass} />
					</Field>
					<Field label="Confirmar nova palavra-passe" htmlFor="confirmPassword">
						<input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" className={inputClass} />
					</Field>
				</div>
			</Panel>

			<Panel>
				<div className="flex flex-wrap items-end justify-between gap-5">
					<Field label="Palavra-passe actual *" htmlFor="currentPassword" hint="Necessária para confirmar qualquer alteração." className="min-w-64 flex-1">
						<input
							id="currentPassword"
							name="currentPassword"
							type="password"
							required
							autoComplete="current-password"
							className={inputClass}
						/>
					</Field>
					<SubmitButton>
						<Save className="h-4 w-4" /> Guardar
					</SubmitButton>
				</div>
			</Panel>
		</form>
	)
}
