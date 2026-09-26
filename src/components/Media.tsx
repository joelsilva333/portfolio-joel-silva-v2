import Image from "next/image"
import { isVideo } from "@/lib/utils"

interface MediaProps {
	src: string
	alt: string
	className?: string
	sizes?: string
	priority?: boolean
	fit?: "cover" | "contain"
}

// Imagem optimizada ou vídeo silencioso em loop, consoante a extensão.
export default function Media({ src, alt, className, sizes, priority, fit = "cover" }: MediaProps) {
	const fitClass = fit === "cover" ? "object-cover" : "object-contain"

	if (isVideo(src)) {
		return (
			<video
				src={src}
				autoPlay
				loop
				muted
				playsInline
				preload="metadata"
				aria-label={alt}
				className={`absolute inset-0 h-full w-full ${fitClass} ${className ?? ""}`}
			/>
		)
	}

	return (
		<Image
			src={src}
			alt={alt}
			fill
			sizes={sizes ?? "100vw"}
			priority={priority}
			className={`${fitClass} ${className ?? ""}`}
		/>
	)
}
