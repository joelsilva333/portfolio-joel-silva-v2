import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink } from "lucide-react"
import PageHeader from "@/components/admin/PageHeader"
import ProjectForm from "@/components/admin/ProjectForm"
import DeleteProject from "@/components/admin/DeleteProject"
import { getProjectById, listAllProjects } from "@/server/projects"

export const metadata: Metadata = { title: "Editar projecto" }

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export default async function EditProjectPage({
	params,
	searchParams,
}: {
	params: Promise<{ id: string }>
	searchParams: Promise<{ criado?: string }>
}) {
	const { id } = await params
	const { criado } = await searchParams
	if (!UUID.test(id)) notFound()

	const [project, all] = await Promise.all([getProjectById(id), listAllProjects()])
	if (!project) notFound()
	const categories = [...new Set(all.map((p) => p.category))]

	return (
		<>
			<Link href="/admin/projectos" className="mb-4 inline-flex items-center gap-2 text-sm text-muted hover:text-light">
				<ArrowLeft className="h-4 w-4" /> Projectos
			</Link>
			<PageHeader
				title={project.title}
				description={`Última alteração: ${new Intl.DateTimeFormat("pt-PT", { dateStyle: "long", timeStyle: "short" }).format(new Date(project.updatedAt))}`}
				actions={
					project.published && (
						<a href={`/projectos/${project.slug}`} target="_blank" className="btn-ghost">
							<ExternalLink className="h-4 w-4" /> Ver no site
						</a>
					)
				}
			/>
			<ProjectForm
				project={project}
				categories={categories}
				notice={criado ? "Projecto criado com sucesso." : undefined}
			/>
			<DeleteProject id={project.id} title={project.title} />
		</>
	)
}
