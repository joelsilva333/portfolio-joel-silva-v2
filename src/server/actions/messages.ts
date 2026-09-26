"use server"

import { headers } from "next/headers"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { messagesRepo } from "../db/data-source"
import { requireAdmin } from "../auth"
import type { FormState } from "./types"

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Limite simples em memória: 5 mensagens por IP a cada 10 minutos.
const hits = new Map<string, number[]>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5

function field(formData: FormData, key: string, max: number) {
	return String(formData.get(key) ?? "").trim().slice(0, max)
}

export async function sendMessageAction(_prev: FormState, formData: FormData): Promise<FormState> {
	// Honeypot: campo invisível que só os bots preenchem. Finge sucesso.
	if (field(formData, "website", 200)) return { success: "Mensagem enviada." }

	const name = field(formData, "name", 120)
	const email = field(formData, "email", 200).toLowerCase()
	const message = field(formData, "message", 5000)

	const fieldErrors: Record<string, string> = {}
	if (name.length < 2) fieldErrors.name = "Indique o seu nome."
	if (!EMAIL.test(email)) fieldErrors.email = "Indique um email válido."
	if (message.length < 10) fieldErrors.message = "Conte-me um pouco mais (mín. 10 caracteres)."
	if (Object.keys(fieldErrors).length) return { error: "Verifique os campos assinalados.", fieldErrors }

	const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "local"
	const now = Date.now()
	const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
	if (recent.length >= MAX_PER_WINDOW) {
		return { error: "Enviou várias mensagens seguidas. Tente novamente daqui a alguns minutos." }
	}

	try {
		const repo = await messagesRepo()
		await repo.save(
			repo.create({
				name,
				email,
				message,
				phone: field(formData, "phone", 40) || null,
				company: field(formData, "company", 160) || null,
				projectType: field(formData, "projectType", 80) || null,
				budget: field(formData, "budget", 80) || null,
			}),
		)
	} catch (error) {
		console.error("[contact] Falha ao guardar mensagem:", error)
		return { error: "Não foi possível enviar agora. Tente novamente mais tarde." }
	}

	hits.set(ip, [...recent, now])
	revalidatePath("/admin", "layout")
	return { success: `Obrigado, ${name.split(" ")[0]}! Recebi a sua mensagem e respondo em breve.` }
}

export async function setMessageReadAction(id: string, read: boolean) {
	await requireAdmin()
	await (await messagesRepo()).update({ id }, { read })
	revalidatePath("/admin", "layout")
	// Ficar na página de detalhe voltaria a marcá-la como lida.
	if (!read) redirect("/admin/mensagens")
}

export async function deleteMessageAction(id: string) {
	await requireAdmin()
	await (await messagesRepo()).delete({ id })
	revalidatePath("/admin", "layout")
	redirect("/admin/mensagens")
}
