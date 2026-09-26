export default function PageHeader({
	title,
	description,
	actions,
}: {
	title: string
	description?: string
	actions?: React.ReactNode
}) {
	return (
		<div className="mb-10 flex flex-wrap items-end justify-between gap-6">
			<div>
				<h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
				{description && <p className="mt-2 text-muted">{description}</p>}
			</div>
			{actions && <div className="flex flex-wrap gap-3">{actions}</div>}
		</div>
	)
}
