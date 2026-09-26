import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import LoginForm from "./LoginForm"

export const metadata: Metadata = { title: "Entrar" }

export default async function LoginPage({
	searchParams,
}: {
	searchParams: Promise<{ next?: string }>
}) {
	const { next } = await searchParams

	return (
		<main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-5">
			<div className="bg-grid absolute inset-0 -z-10 opacity-50 mask-[radial-gradient(ellipse_at_center,black,transparent_70%)]" />
			<div className="absolute top-1/2 left-1/2 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[120px]" />

			<div className="card w-full max-w-md p-8 sm:p-10">
				<div className="mb-8 flex flex-col items-center gap-4 text-center">
					<Image src="/logo/white.png" alt="" width={80} height={80} className="w-12" priority />
					<div>
						<h1 className="font-display text-2xl font-semibold">Painel de administração</h1>
						<p className="mt-1 text-sm text-muted">Entre para gerir os seus projectos.</p>
					</div>
				</div>
				<LoginForm next={next} />
				<Link href="/" className="mt-6 block text-center text-xs text-muted hover:text-light">
					← Voltar ao site
				</Link>
			</div>
		</main>
	)
}
