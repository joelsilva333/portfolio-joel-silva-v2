import type { Metadata } from "next"
import Link from "next/link"
import { ArrowDown, ArrowUp, ExternalLink, Eye, EyeOff, Pencil, Plus, Star } from "lucide-react"
import PageHeader from "@/components/admin/PageHeader"
import Thumb from "@/components/admin/Thumb"
import { listAllProjects } from "@/server/projects"
import { moveProjectAction, togglePublishedAction } from "@/server/actions/projects"
import { cn } from "@/lib/utils"

export const metadata: Metadata = { title: "Projectos" }

const iconBtn =
	"flex h-9 w-9 items-center justify-center rounded-lg text-muted transition hover:bg-white/10 hover:text-light disabled:pointer-events-none disabled:opacity-30"

export default async function AdminProjectsPage() {
	const projects = await listAllProjects()

	return (
		<>
			<PageHeader
				title="Projectos"
				description="Crie, edite, ordene e publique os projectos do portfólio. A ordem aqui é a ordem no site (os destacados aparecem primeiro)."
				actions={
					<Link href="/admin/projectos/novo" className="btn-primary">
						<Plus className="h-4 w-4" /> Novo projecto
					</Link>
				}
			/>

			{projects.length === 0 ? (
				<div className="card flex flex-col items-center gap-4 p-16 text-center">
					<p className="text-muted">Nenhum projecto ainda.</p>
					<Link href="/admin/projectos/novo" className="btn-primary">
						<Plus className="h-4 w-4" /> Criar projecto
					</Link>
				</div>
			) : (
				<ul className="card divide-y divide-white/6 overflow-hidden">
					{projects.map((p, i) => (
						<li key={p.id} className="flex items-center gap-4 px-4 py-4 sm:px-6">
							<div className="flex flex-col max-sm:hidden">
								<form action={moveProjectAction.bind(null, p.id, "up")}>
									<button type="submit" disabled={i === 0} aria-label={`Subir ${p.title}`} className={cn(iconBtn, "h-7")}>
										<ArrowUp className="h-3.5 w-3.5" />
									</button>
								</form>
								<form action={moveProjectAction.bind(null, p.id, "down")}>
									<button
										type="submit"
										disabled={i === projects.length - 1}
										aria-label={`Descer ${p.title}`}
										className={cn(iconBtn, "h-7")}
									>
										<ArrowDown className="h-3.5 w-3.5" />
									</button>
								</form>
							</div>

							<Thumb src={p.cover} className="h-16 w-24 max-sm:h-12 max-sm:w-16" />

							<div className="min-w-0 flex-1">
								<div className="flex items-center gap-2">
									<Link href={`/admin/projectos/${p.id}`} className="truncate font-medium hover:underline">
										{p.title}
									</Link>
									{p.featured && <Star className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-400" aria-label="Em destaque" />}
								</div>
								<p className="truncate text-xs text-muted">
									{p.category} · /projectos/{p.slug}
								</p>
							</div>

							<span
								className={cn(
									"rounded-full px-2.5 py-1 text-xs font-medium max-md:hidden",
									p.published ? "bg-success/15 text-emerald-300" : "bg-white/10 text-muted",
								)}
							>
								{p.published ? "Publicado" : "Rascunho"}
							</span>

							<div className="flex items-center">
								<form action={togglePublishedAction.bind(null, p.id)}>
									<button
										type="submit"
										className={iconBtn}
										aria-label={p.published ? "Despublicar" : "Publicar"}
										title={p.published ? "Despublicar" : "Publicar"}
									>
										{p.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
									</button>
								</form>
								{p.published && (
									<a
										href={`/projectos/${p.slug}`}
										target="_blank"
										className={cn(iconBtn, "max-sm:hidden")}
										aria-label="Ver no site"
										title="Ver no site"
									>
										<ExternalLink className="h-4 w-4" />
									</a>
								)}
								<Link href={`/admin/projectos/${p.id}`} className={iconBtn} aria-label="Editar" title="Editar">
									<Pencil className="h-4 w-4" />
								</Link>
							</div>
						</li>
					))}
				</ul>
			)}
		</>
	)
}
