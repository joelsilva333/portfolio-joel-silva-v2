import { readFile } from "node:fs/promises"
import path from "node:path"
import { UPLOAD_DIR, resolveUploadPath } from "@/server/storage"

export const OG_SIZE = { width: 1200, height: 630 }

type OgFont = { name: string; data: ArrayBuffer; weight: 400 | 500 | 600 | 700; style: "normal" }

let fontsPromise: Promise<OgFont[]> | null = null

async function googleFont(family: string, weight: number) {
	// Sem User-Agent de browser, o Google Fonts devolve TTF (o formato que o Satori lê).
	const css = await fetch(
		`https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}&display=swap`,
	).then((r) => r.text())
	const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1]
	if (!url) throw new Error(`Fonte ${family} indisponível`)
	return fetch(url).then((r) => r.arrayBuffer())
}

// Fontes da marca; se a rede falhar, o ImageResponse usa a fonte por omissão.
export function loadOgFonts() {
	fontsPromise ??= Promise.all([
		googleFont("Space Grotesk", 600).then((data) => ({ name: "Grotesk", data, weight: 600 as const, style: "normal" as const })),
		googleFont("Inter", 400).then((data) => ({ name: "Inter", data, weight: 400 as const, style: "normal" as const })),
	]).catch((error) => {
		console.warn("[og] Fontes não carregadas:", error)
		fontsPromise = null
		return []
	})
	return fontsPromise
}

const MIME: Record<string, string> = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg" }

function toDataUrl(buffer: ArrayBuffer | Buffer, mime: string) {
	return `data:${mime};base64,${Buffer.from(buffer as ArrayBuffer).toString("base64")}`
}

export async function publicImage(file: string) {
	const buffer = await readFile(path.join(process.cwd(), "public", file))
	return toDataUrl(buffer, MIME[path.extname(file).toLowerCase()] ?? "image/png")
}

/**
 * Carrega uma imagem de projecto como data URL. O Satori só suporta PNG/JPEG,
 * por isso WEBP/AVIF/vídeos devolvem null e o layout segue sem capa.
 */
export async function projectImage(src: string): Promise<string | null> {
	try {
		const ext = path.extname(src.split("?")[0]).toLowerCase()
		if (src.startsWith("/media/")) {
			const file = resolveUploadPath(src.slice("/media/".length).split("/"))
			if (!file || !file.startsWith(UPLOAD_DIR) || !MIME[ext]) return null
			return toDataUrl(await readFile(file), MIME[ext])
		}
		if (src.startsWith("/")) {
			return MIME[ext] ? await publicImage(src.slice(1)) : null
		}
		const res = await fetch(src, { signal: AbortSignal.timeout(5000) })
		const type = res.headers.get("content-type")?.split(";")[0] ?? ""
		if (!res.ok || !["image/png", "image/jpeg"].includes(type)) return null
		return toDataUrl(await res.arrayBuffer(), type)
	} catch {
		return null
	}
}
