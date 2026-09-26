import { createReadStream } from "node:fs"
import { stat } from "node:fs/promises"
import path from "node:path"
import { Readable } from "node:stream"
import { MEDIA_TYPES, resolveUploadPath } from "@/server/storage"

export const runtime = "nodejs"

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ path: string[] }> },
) {
	const file = resolveUploadPath((await params).path)
	const type = file && MEDIA_TYPES[path.extname(file).toLowerCase()]
	if (!file || !type) return new Response("Não encontrado", { status: 404 })

	let size: number
	try {
		size = (await stat(file)).size
	} catch {
		return new Response("Não encontrado", { status: 404 })
	}

	const headers: Record<string, string> = {
		"Content-Type": type,
		"Accept-Ranges": "bytes",
		// Os nomes são UUIDs: o conteúdo de um URL nunca muda.
		"Cache-Control": "public, max-age=31536000, immutable",
		"X-Content-Type-Options": "nosniff",
	}

	// Pedidos parciais: necessários para reproduzir vídeo no Safari/iOS.
	const range = request.headers.get("range")?.match(/bytes=(\d*)-(\d*)/)
	if (range) {
		const start = range[1] ? Number(range[1]) : Math.max(0, size - Number(range[2]))
		const end = range[1] && range[2] ? Math.min(Number(range[2]), size - 1) : size - 1
		if (start > end || start >= size) {
			return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}` } })
		}
		const stream = Readable.toWeb(createReadStream(file, { start, end })) as ReadableStream
		return new Response(stream, {
			status: 206,
			headers: {
				...headers,
				"Content-Range": `bytes ${start}-${end}/${size}`,
				"Content-Length": String(end - start + 1),
			},
		})
	}

	const stream = Readable.toWeb(createReadStream(file)) as ReadableStream
	return new Response(stream, { headers: { ...headers, "Content-Length": String(size) } })
}
