import type { MetadataRoute } from "next"
import { listPublishedProjects } from "@/server/projects"

const BASE = "https://joelsilva.site"

export const dynamic = "force-dynamic"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const projects = await listPublishedProjects()
	return [
		{ url: BASE, changeFrequency: "monthly", priority: 1 },
		{ url: `${BASE}/projectos`, changeFrequency: "weekly", priority: 0.8 },
		...projects.map((p) => ({
			url: `${BASE}/projectos/${p.slug}`,
			lastModified: p.updatedAt,
			changeFrequency: "monthly" as const,
			priority: 0.7,
		})),
	]
}
