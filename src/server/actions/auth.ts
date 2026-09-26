"use server"

import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"
import { adminUsersRepo } from "../db/data-source"
import { endSession, requireAdmin, startSession } from "../auth"
import type { FormState } from "./types"

// Limitador simples em memória contra força bruta (por email).
const attempts = new Map<string, { count: number; until: number }>()
const MAX_ATTEMPTS = 5
const LOCK_MS = 10 * 60 * 1000

export async function loginAction(_prev: FormState, formData: FormData): Promise<FormState> {
	const email = String(formData.get("email") ?? "").trim().toLowerCase()
	const password = String(formData.get("password") ?? "")
	const next = String(formData.get("next") ?? "")

	if (!email || !password) return { error: "Preencha o email e a palavra-passe." }

	const entry = attempts.get(email)
	const active = entry && entry.until > Date.now()
	if (active && entry.count >= MAX_ATTEMPTS) {
		return { error: "Demasiadas tentativas. Tente novamente dentro de alguns minutos." }
	}

	let user
	try {
		user = await (await adminUsersRepo()).findOne({ where: { email } })
	} catch (error) {
		console.error("[auth] Falha na base de dados:", error)
		return { error: "Não foi possível ligar à base de dados." }
	}

	const valid = user ? await bcrypt.compare(password, user.passwordHash) : false
	if (!user || !valid) {
		attempts.set(email, { count: (active ? entry.count : 0) + 1, until: Date.now() + LOCK_MS })
		return { error: "Credenciais inválidas." }
	}

	attempts.delete(email)
	await startSession({ sub: user.id, name: user.name, email: user.email })
	// Só aceita destinos internos do painel (evita open redirect).
	redirect(next.startsWith("/admin") && !next.startsWith("//") ? next : "/admin")
}

export async function logoutAction() {
	await endSession()
	redirect("/admin/login")
}

export async function updateAccountAction(
	_prev: FormState,
	formData: FormData,
): Promise<FormState> {
	const session = await requireAdmin()
	const repo = await adminUsersRepo()
	const user = await repo.findOne({ where: { id: session.sub } })
	if (!user) return { error: "Conta não encontrada." }

	const name = String(formData.get("name") ?? "").trim()
	const email = String(formData.get("email") ?? "").trim().toLowerCase()
	const current = String(formData.get("currentPassword") ?? "")
	const newPassword = String(formData.get("newPassword") ?? "")
	const confirm = String(formData.get("confirmPassword") ?? "")

	if (!name || !email) return { error: "Nome e email são obrigatórios." }
	if (!(await bcrypt.compare(current, user.passwordHash))) {
		return { error: "A palavra-passe actual está incorrecta." }
	}
	if (newPassword) {
		if (newPassword.length < 8) {
			return { error: "A nova palavra-passe deve ter pelo menos 8 caracteres." }
		}
		if (newPassword !== confirm) return { error: "As palavras-passe não coincidem." }
		user.passwordHash = await bcrypt.hash(newPassword, 12)
	}
	if (email !== user.email && (await repo.existsBy({ email }))) {
		return { error: "Já existe uma conta com esse email." }
	}

	user.name = name
	user.email = email
	await repo.save(user)
	await startSession({ sub: user.id, name: user.name, email: user.email })
	return { success: "Conta actualizada com sucesso." }
}
