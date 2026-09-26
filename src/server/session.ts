// Sem dependências de Node/DB: este módulo também corre no middleware (edge).
import { SignJWT, jwtVerify } from "jose"

export const SESSION_COOKIE = "admin_session"
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7

export interface SessionPayload {
	sub: string
	name: string
	email: string
}

function secret() {
	const value = process.env.AUTH_SECRET
	if (!value || value.length < 32) {
		throw new Error("AUTH_SECRET tem de estar definido e ter pelo menos 32 caracteres.")
	}
	return new TextEncoder().encode(value)
}

export async function signSession(payload: SessionPayload) {
	return new SignJWT({ name: payload.name, email: payload.email })
		.setProtectedHeader({ alg: "HS256" })
		.setSubject(payload.sub)
		.setIssuedAt()
		.setExpirationTime(`${SESSION_MAX_AGE}s`)
		.sign(secret())
}

export async function verifySession(token: string | undefined): Promise<SessionPayload | null> {
	if (!token) return null
	try {
		const { payload } = await jwtVerify(token, secret(), { algorithms: ["HS256"] })
		if (!payload.sub) return null
		return {
			sub: payload.sub,
			name: String(payload.name ?? ""),
			email: String(payload.email ?? ""),
		}
	} catch {
		return null
	}
}
