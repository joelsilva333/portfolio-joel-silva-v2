import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
	return (
		<main className="relative isolate flex min-h-screen flex-col items-center justify-center gap-6 px-5 text-center">
			<div className="bg-grid absolute inset-0 -z-10 opacity-50 mask-[radial-gradient(ellipse_at_center,black,transparent_70%)]" />
			<span className="eyebrow">Erro 404</span>
			<h1 className="heading-xl">
				Página <span className="text-gradient">perdida.</span>
			</h1>
			<p className="max-w-md text-muted">A página que procura não existe ou foi movida.</p>
			<Link href="/" className="btn-primary">
				<ArrowLeft className="h-4 w-4" /> Voltar ao início
			</Link>
		</main>
	)
}
