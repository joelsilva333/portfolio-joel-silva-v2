import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import PageHeader from "@/components/admin/PageHeader"
import ProjectForm from "@/components/admin/ProjectForm"
import { listAllProjects } from "@/server/projects"

export const metadata: Metadata = { title: "Novo projecto" }

export default async function NewProjectPage() {
	const categories = [...new Set((await listAllProjects()).map((p) => p.category))]

	return (
		<>
			<Link href="/admin/projectos" className="mb-4 inline-flex items-center gap-2 text-sm text-muted hover:text-light">
				<ArrowLeft className="h-4 w-4" /> Projectos
			</Link>
			<PageHeader title="Novo projecto" description="Preencha os dados e veja a pré-visualização em tempo real." />
			<ProjectForm categories={categories} />
		</>
	)
}
