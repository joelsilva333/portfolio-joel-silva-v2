import Reveal from "./Reveal"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
	index: string
	eyebrow: string
	title: React.ReactNode
	description?: string
	action?: React.ReactNode
	align?: "left" | "center"
}

export default function SectionHeading({
	index,
	eyebrow,
	title,
	description,
	action,
	align = "left",
}: SectionHeadingProps) {
	return (
		<Reveal
			className={cn(
				"flex gap-5 max-md:flex-col sm:gap-8",
				align === "center"
					? "flex-col items-center text-center"
					: "md:items-end md:justify-between",
			)}
		>
			<div className={cn("flex max-w-3xl flex-col gap-3 sm:gap-5", align === "center" && "items-center")}>
				<span className="eyebrow">
					{index} — {eyebrow}
				</span>
				<h2 className="heading-lg">{title}</h2>
				{description && <p className="max-w-xl leading-relaxed text-muted max-sm:text-[15px]">{description}</p>}
			</div>
			{action}
		</Reveal>
	)
}
