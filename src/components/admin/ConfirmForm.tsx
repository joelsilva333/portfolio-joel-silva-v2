"use client"

// Formulário de server action que pede confirmação antes de submeter.
export default function ConfirmForm({
	action,
	message,
	children,
}: {
	action: () => Promise<void>
	message: string
	children: React.ReactNode
}) {
	return (
		<form
			action={action}
			onSubmit={(e) => {
				if (!confirm(message)) e.preventDefault()
			}}
		>
			{children}
		</form>
	)
}
