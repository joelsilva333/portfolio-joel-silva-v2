import { NextResponse, type NextRequest } from "next/server"
import { SESSION_COOKIE, verifySession } from "./server/session"

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl
	const session = await verifySession(request.cookies.get(SESSION_COOKIE)?.value)

	if (pathname === "/admin/login") {
		return session
			? NextResponse.redirect(new URL("/admin", request.url))
			: NextResponse.next()
	}

	if (!session) {
		if (pathname.startsWith("/api/")) {
			return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
		}
		const url = new URL("/admin/login", request.url)
		url.searchParams.set("next", pathname)
		return NextResponse.redirect(url)
	}

	return NextResponse.next()
}

// /api/admin/upload fica de fora: o middleware limita o corpo do pedido a 10 MB
// (cortaria vídeos) e a rota valida a sessão por conta própria.
export const config = {
	matcher: ["/admin/:path*", "/api/admin/((?!upload$).*)"],
}
