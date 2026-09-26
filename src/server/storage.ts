import path from "node:path"

export const UPLOAD_DIR = path.resolve(
	process.env.UPLOAD_DIR || path.join(process.cwd(), "storage", "uploads"),
)

export const MEDIA_TYPES: Record<string, string> = {
	".png": "image/png",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".webp": "image/webp",
	".avif": "image/avif",
	".gif": "image/gif",
	".svg": "image/svg+xml",
	".mp4": "video/mp4",
	".webm": "video/webm",
}

export const MAX_UPLOAD_BYTES = 60 * 1024 * 1024

// Resolve um caminho pedido garantindo que fica dentro da pasta de uploads.
export function resolveUploadPath(segments: string[]) {
	const target = path.resolve(UPLOAD_DIR, ...segments)
	return target.startsWith(UPLOAD_DIR + path.sep) ? target : null
}
