"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { projectsRepo } from "../db/data-source"
import { requireAdmin } from "../auth"
import { slugify } from "@/lib/utils"
import type { FormState } from "./types"

function text(formData: FormData, key: string) {
	return String(formData.get(key) ?? "").trim()
}

function stringList(raw: string) {
	try {
		const parsed = JSON.parse(raw || "[]")
		return Array.isArray(parsed)
			? parsed.map((v) => String(v).trim()).filter(Boolean)
			: []
	} catch {
		return []
	}
}

function isValidUrlOrPath(value: string) {
	if (value.startsWith("/")) return true
	try {
		const url = new URL(value)
		return url.protocol === "https:" || url.protocol === "http:"
	} catch {
		return false
	}
}

function revalidatePublic(slug?: string) {
	revalidatePath("/")
	revalidatePath("/projectos")
	if (slug) revalidatePath(`/projectos/${slug}`)
	revalidatePath("/admin", "layout")
}

export async function saveProjectAction(
	id: string | null,
	_prev: FormState,
	formData: FormData,
): Promise<FormState> {
	await requireAdmin()

	const title = text(formData, "title")
	const slug = slugify(text(formData, "slug") || title)
	const category = text(formData, "category")
	const summary = text(formData, "summary")
	const description = text(formData, "description")
	const cover = text(formData, "cover")
	const link = text(formData, "link")
	const yearRaw = text(formData, "year")
	const year = yearRaw ? Number(yearRaw) : null

	const fieldErrors: Record<string, string> = {}
	if (!title) fieldErrors.title = "O título é obrigatório."
	if (!slug) fieldErrors.slug = "O slug é obrigatório."
	if (!category) fieldErrors.category = "A categoria é obrigatória."
	if (!cover) fieldErrors.cover = "Adicione uma imagem de capa."
	else if (!isValidUrlOrPath(cover)) fieldErrors.cover = "URL de capa inválido."
	if (summary.length > 300) fieldErrors.summary = "Máximo de 300 caracteres."
	if (link && link !== "#" && !isValidUrlOrPath(link)) fieldErrors.link = "URL inválido."
	if (year !== null && (!Number.isInteger(year) || year < 2000 || year > 2100)) {
		fieldErrors.year = "Ano inválido."
	}

	const gallery = stringList(text(formData, "gallery"))
	if (gallery.some((src) => !isValidUrlOrPath(src))) {
		fieldErrors.gallery = "Existe um item da galeria com URL inválido."
	}

	if (Object.keys(fieldErrors).length) {
		return { error: "Corrija os campos assinalados.", fieldErrors }
	}

	const repo = await projectsRepo()
	const clash = await repo.findOne({ where: { slug } })
	if (clash && clash.id !== id) {
		return { error: "Já existe um projecto com este slug.", fieldErrors: { slug: "Slug em uso." } }
	}

	const existing = id ? await repo.findOne({ where: { id } }) : null
	if (id && !existing) return { error: "Projecto não encontrado." }

	const data = {
		title,
		slug,
		category,
		summary,
		description,
		cover,
		gallery,
		technologies: stringList(text(formData, "technologies")),
		client: text(formData, "client") || null,
		role: text(formData, "role") || null,
		year,
		link: link && link !== "#" ? link : null,
		statusText: text(formData, "statusText") || null,
		featured: formData.get("featured") === "on",
		published: formData.get("published") === "on",
	}

	let saved
	if (existing) {
		saved = await repo.save(repo.merge(existing, data))
		if (existing.slug !== slug) revalidatePath(`/projectos/${existing.slug}`)
	} else {
		const last = await repo.find({ order: { order: "DESC" }, take: 1 })
		saved = await repo.save(repo.create({ ...data, order: (last[0]?.order ?? -1) + 1 }))
	}

	revalidatePublic(saved.slug)
	if (!existing) redirect(`/admin/projectos/${saved.id}?criado=1`)
	return { success: "Alterações guardadas." }
}

export async function deleteProjectAction(id: string) {
	await requireAdmin()
	const repo = await projectsRepo()
	const project = await repo.findOne({ where: { id } })
	if (project) {
		await repo.remove(project)
		revalidatePublic(project.slug)
	}
	redirect("/admin/projectos")
}

export async function togglePublishedAction(id: string) {
	await requireAdmin()
	const repo = await projectsRepo()
	const project = await repo.findOne({ where: { id } })
	if (!project) return
	project.published = !project.published
	await repo.save(project)
	revalidatePublic(project.slug)
}

export async function moveProjectAction(id: string, direction: "up" | "down") {
	await requireAdmin()
	const repo = await projectsRepo()
	const all = await repo.find({ order: { order: "ASC", createdAt: "DESC" } })
	const index = all.findIndex((p) => p.id === id)
	const target = direction === "up" ? index - 1 : index + 1
	if (index < 0 || target < 0 || target >= all.length) return

	;[all[index], all[target]] = [all[target], all[index]]
	// Renormaliza a ordem para 0..n, corrigindo também valores duplicados.
	await repo.manager.transaction(async (manager) => {
		for (const [position, project] of all.entries()) {
			if (project.order !== position) {
				await manager.update("Project", { id: project.id }, { order: position })
			}
		}
	})
	revalidatePublic()
}
