import { randomUUID } from "node:crypto"
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { NextResponse } from "next/server"
import { getSession } from "@/server/auth"
import { MAX_UPLOAD_BYTES, MEDIA_TYPES, UPLOAD_DIR } from "@/server/storage"

export const runtime = "nodejs"

export async function POST(request: Request) {
	if (!(await getSession())) {
		return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
	}

	const form = await request.formData()
	const files = form.getAll("files").filter((f): f is File => f instanceof File)
	if (!files.length) {
		return NextResponse.json({ error: "Nenhum ficheiro enviado." }, { status: 400 })
	}

	const folder = new Date().toISOString().slice(0, 7) // AAAA-MM
	await mkdir(path.join(UPLOAD_DIR, folder), { recursive: true })

	const urls: string[] = []
	for (const file of files) {
		const ext = path.extname(file.name).toLowerCase()
		// SVG pode conter scripts: não é aceite em uploads.
		if (!MEDIA_TYPES[ext] || ext === ".svg") {
			return NextResponse.json(
				{ error: `Tipo de ficheiro não suportado: ${file.name}` },
				{ status: 415 },
			)
		}
		if (file.size > MAX_UPLOAD_BYTES) {
			return NextResponse.json(
				{ error: `${file.name} excede o limite de 60 MB.` },
				{ status: 413 },
			)
		}

		const name = `${randomUUID()}${ext}`
		await writeFile(path.join(UPLOAD_DIR, folder, name), Buffer.from(await file.arrayBuffer()))
		urls.push(`/media/${folder}/${name}`)
	}

	return NextResponse.json({ urls })
}
