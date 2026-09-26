import { projectsRepo } from "./db/data-source"
import type { Project } from "./db/entities"

// Objecto simples e serializável para passar a Client Components.
export type ProjectDTO = Omit<Project, "createdAt" | "updatedAt"> & {
	createdAt: string
	updatedAt: string
}

export function toDTO(project: Project): ProjectDTO {
	return {
		...project,
		createdAt: project.createdAt.toISOString(),
		updatedAt: project.updatedAt.toISOString(),
	}
}

export async function listPublishedProjects() {
	try {
		const repo = await projectsRepo()
		const rows = await repo.find({
			where: { published: true },
			order: { featured: "DESC", order: "ASC", createdAt: "DESC" },
		})
		return rows.map(toDTO)
	} catch (error) {
		// O site público continua de pé mesmo que a base de dados esteja em baixo.
		console.error("[projects] Falha ao listar projectos:", error)
		return []
	}
}

export async function getPublishedProjectBySlug(slug: string) {
	try {
		const repo = await projectsRepo()
		const project = await repo.findOne({ where: { slug, published: true } })
		return project ? toDTO(project) : null
	} catch (error) {
		console.error("[projects] Falha ao obter projecto:", error)
		return null
	}
}

export async function listAllProjects() {
	const repo = await projectsRepo()
	const rows = await repo.find({ order: { order: "ASC", createdAt: "DESC" } })
	return rows.map(toDTO)
}

export async function getProjectById(id: string) {
	const repo = await projectsRepo()
	const project = await repo.findOne({ where: { id } })
	return project ? toDTO(project) : null
}
