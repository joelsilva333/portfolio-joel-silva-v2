import { ArrowRight } from "lucide-react"

// Indicação visível só em mobile, por baixo de um .mobile-rail.
export default function SwipeHint({ count, label = "itens" }: { count: number; label?: string }) {
	return (
		<p className="-mt-4 flex items-center justify-between text-xs text-muted md:hidden" aria-hidden>
			<span>
				{count} {label}
			</span>
			<span className="inline-flex items-center gap-1.5">
				Deslize para ver mais <ArrowRight className="h-3.5 w-3.5" />
			</span>
		</p>
	)
}
