"use client"

import { useActionState } from "react"
import { LogIn } from "lucide-react"
import { loginAction } from "@/server/actions/auth"
import { Alert, Field, SubmitButton, inputClass } from "@/components/admin/ui"

export default function LoginForm({ next }: { next?: string }) {
	const [state, action] = useActionState(loginAction, {})

	return (
		<form action={action} className="flex flex-col gap-5">
			<input type="hidden" name="next" value={next ?? ""} />
			{state.error && <Alert tone="error">{state.error}</Alert>}
			<Field label="Email" htmlFor="email">
				<input id="email" name="email" type="email" autoComplete="username" required className={inputClass} />
			</Field>
			<Field label="Palavra-passe" htmlFor="password">
				<input
					id="password"
					name="password"
					type="password"
					autoComplete="current-password"
					required
					className={inputClass}
				/>
			</Field>
			<SubmitButton className="w-full" pendingLabel="A entrar…">
				<LogIn className="h-4 w-4" /> Entrar
			</SubmitButton>
		</form>
	)
}
