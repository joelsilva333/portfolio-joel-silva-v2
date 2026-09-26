"use client"

import { useFormStatus } from "react-dom"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export const inputClass =
	"w-full rounded-xl border border-white/10 bg-white/3 px-4 py-3 text-base text-light placeholder:text-muted/70 sm:text-sm transition focus:border-accent-bright focus:bg-white/5 focus:outline-none aria-[invalid=true]:border-danger"

export function Field({
	label,
	htmlFor,
	hint,
	error,
	children,
	className,
}: {
	label: string
	htmlFor?: string
	hint?: string
	error?: string
	children: React.ReactNode
	className?: string
}) {
	return (
		<div className={cn("flex flex-col gap-2", className)}>
			<label htmlFor={htmlFor} className="text-sm font-medium text-light/90">
				{label}
			</label>
			{children}
			{error ? (
				<p className="text-xs text-danger" role="alert">
					{error}
				</p>
			) : (
				hint && <p className="text-xs text-muted">{hint}</p>
			)}
		</div>
	)
}

export function Alert({ tone, children }: { tone: "error" | "success"; children: React.ReactNode }) {
	const Icon = tone === "error" ? AlertCircle : CheckCircle2
	return (
		<div
			role={tone === "error" ? "alert" : "status"}
			className={cn(
				"flex items-center gap-3 rounded-xl border px-4 py-3 text-sm",
				tone === "error"
					? "border-danger/30 bg-danger/10 text-red-200"
					: "border-success/30 bg-success/10 text-emerald-200",
			)}
		>
			<Icon className="h-4 w-4 shrink-0" />
			{children}
		</div>
	)
}

export function SubmitButton({
	children,
	pendingLabel = "A guardar…",
	className,
	variant = "primary",
}: {
	children: React.ReactNode
	pendingLabel?: string
	className?: string
	variant?: "primary" | "ghost" | "danger"
}) {
	const { pending } = useFormStatus()
	return (
		<button
			type="submit"
			disabled={pending}
			className={cn(
				variant === "primary" && "btn-primary",
				variant === "ghost" && "btn-ghost",
				variant === "danger" &&
					"btn border border-danger/40 text-red-300 hover:border-danger hover:bg-danger/10",
				className,
			)}
		>
			{pending ? (
				<>
					<Loader2 className="h-4 w-4 animate-spin" /> {pendingLabel}
				</>
			) : (
				children
			)}
		</button>
	)
}

export function Panel({
	title,
	description,
	children,
	className,
}: {
	title?: string
	description?: string
	children: React.ReactNode
	className?: string
}) {
	return (
		<section className={cn("card p-6 sm:p-7", className)}>
			{title && (
				<header className="mb-6">
					<h2 className="font-display text-lg font-semibold">{title}</h2>
					{description && <p className="mt-1 text-sm text-muted">{description}</p>}
				</header>
			)}
			{children}
		</section>
	)
}
