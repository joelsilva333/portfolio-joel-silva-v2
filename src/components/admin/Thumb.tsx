import Media from "@/components/Media"
import { cn } from "@/lib/utils"

export default function Thumb({ src, className }: { src: string; className?: string }) {
	return (
		<div className={cn("relative shrink-0 overflow-hidden rounded-xl border border-white/7 bg-surface-2", className)}>
			<Media src={src} alt="" sizes="160px" />
		</div>
	)
}
