import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import {
	SESSION_COOKIE,
	SESSION_MAX_AGE,
	signSession,
	verifySession,
	type SessionPayload,
} from "./session"

export async function getSession() {
	const store = await cookies()
	return verifySession(store.get(SESSION_COOKIE)?.value)
}

export async function requireAdmin() {
	const session = await getSession()
	if (!session) redirect("/admin/login")
	return session
}

export async function startSession(payload: SessionPayload) {
	const store = await cookies()
	store.set(SESSION_COOKIE, await signSession(payload), {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: SESSION_MAX_AGE,
	})
}

export async function endSession() {
	const store = await cookies()
	store.delete(SESSION_COOKIE)
}
