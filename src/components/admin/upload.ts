export const ACCEPT_MEDIA = "image/png,image/jpeg,image/webp,image/avif,image/gif,video/mp4,video/webm"

export async function uploadFiles(files: FileList | File[]): Promise<string[]> {
	const body = new FormData()
	for (const file of Array.from(files)) body.append("files", file)

	const res = await fetch("/api/admin/upload", { method: "POST", body })
	const data = await res.json().catch(() => ({}))
	if (!res.ok) throw new Error(data.error || "Falha no upload.")
	return data.urls as string[]
}
