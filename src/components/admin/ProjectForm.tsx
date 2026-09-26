"use client"

import { startTransition, useActionState, useState } from "react"
import { Loader2, Save } from "lucide-react"
import ProjectCard from "@/components/ProjectCard"
import type { ProjectDTO } from "@/server/projects"
import { saveProjectAction } from "@/server/actions/projects"
import { cn, slugify } from "@/lib/utils"
import { Alert, Field, Panel, inputClass } from "./ui"
import { CoverField, GalleryField } from "./MediaFields"
import TagInput from "./TagInput"

type Values = {
	title: string
	slug: string
	category: string
	summary: string
	description: string
	cover: string
	gallery: string[]
	technologies: string[]
	client: string
	role: string
	year: string
	link: string
	statusText: string
	featured: boolean
	published: boolean
}

function initialValues(p?: ProjectDTO | null): Values {
	return {
		title: p?.title ?? "",
		slug: p?.slug ?? "",
		category: p?.category ?? "",
		summary: p?.summary ?? "",
		description: p?.description ?? "",
		cover: p?.cover ?? "",
		gallery: p?.gallery ?? [],
		technologies: p?.technologies ?? [],
		client: p?.client ?? "",
		role: p?.role ?? "",
		year: p?.year ? String(p.year) : String(new Date().getFullYear()),
		link: p?.link ?? "",
		statusText: p?.statusText ?? "",
		featured: p?.featured ?? false,
		published: p?.published ?? true,
	}
}

export default function ProjectForm({
	project,
	categories,
	notice,
}: {
	project?: ProjectDTO | null
	categories: string[]
	notice?: string
}) {
	const [state, formAction, pending] = useActionState(
		saveProjectAction.bind(null, project?.id ?? null),
		notice ? { success: notice } : {},
	)
	const [v, setV] = useState<Values>(() => initialValues(project))
	// Enquanto o slug não for editado à mão, acompanha o título.
	const [slugTouched, setSlugTouched] = useState(!!project)
	const set = <K extends keyof Values>(key: K, value: Values[K]) => setV((prev) => ({ ...prev, [key]: value }))
	const errors = state.fieldErrors ?? {}

	const preview: ProjectDTO = {
		id: project?.id ?? "preview",
		slug: v.slug || "novo-projecto",
		title: v.title || "Título do projecto",
		category: v.category || "Categoria",
		summary: v.summary || "O resumo do projecto aparece aqui.",
		description: v.description,
		cover: v.cover || "/images/pc.jpg",
		gallery: v.gallery,
		technologies: v.technologies,
		client: v.client || null,
		role: v.role || null,
		year: v.year ? Number(v.year) : null,
		link: v.link || null,
		statusText: v.statusText || null,
		featured: v.featured,
		published: v.published,
		order: 0,
		createdAt: "",
		updatedAt: "",
	}

	return (
		<form
			// Submissão manual: evita o reset automático do formulário após a action,
			// para que um erro de validação não apague o que foi escrito.
			onSubmit={(e) => {
				e.preventDefault()
				const data = new FormData(e.currentTarget)
				startTransition(() => formAction(data))
			}}
			className="grid grid-cols-1 gap-6 max-lg:pb-24 lg:grid-cols-[minmax(0,1fr)_22rem]"
			noValidate
		>
			<div className="flex min-w-0 flex-col gap-6">
				{state.error && <Alert tone="error">{state.error}</Alert>}
				{state.success && !state.error && <Alert tone="success">{state.success}</Alert>}

				<Panel title="Informação principal" description="O essencial que aparece nos cartões e no topo da página.">
					<div className="grid gap-5 sm:grid-cols-2">
						<Field label="Título *" htmlFor="title" error={errors.title} className="sm:col-span-2">
							<input
								id="title"
								name="title"
								value={v.title}
								onChange={(e) => {
									set("title", e.target.value)
									if (!slugTouched) set("slug", slugify(e.target.value))
								}}
								aria-invalid={!!errors.title}
								className={inputClass}
								placeholder="Ex.: Mesa Redonda com CEOs"
							/>
						</Field>
						<Field label="Slug (URL) *" htmlFor="slug" error={errors.slug} hint={`/projectos/${v.slug || "…"}`}>
							<input
								id="slug"
								name="slug"
								value={v.slug}
								onChange={(e) => {
									setSlugTouched(true)
									set("slug", e.target.value)
								}}
								onBlur={() => set("slug", slugify(v.slug))}
								aria-invalid={!!errors.slug}
								className={inputClass}
							/>
						</Field>
						<Field label="Categoria *" htmlFor="category" error={errors.category}>
							<input
								id="category"
								name="category"
								list="category-options"
								value={v.category}
								onChange={(e) => set("category", e.target.value)}
								aria-invalid={!!errors.category}
								className={inputClass}
								placeholder="Ex.: Rede Social"
							/>
							<datalist id="category-options">
								{categories.map((c) => (
									<option key={c} value={c} />
								))}
							</datalist>
						</Field>
						<Field
							label="Resumo"
							htmlFor="summary"
							error={errors.summary}
							hint={`${v.summary.length}/300 · Uma ou duas frases para os cartões.`}
							className="sm:col-span-2"
						>
							<textarea
								id="summary"
								name="summary"
								rows={2}
								maxLength={300}
								value={v.summary}
								onChange={(e) => set("summary", e.target.value)}
								className={cn(inputClass, "resize-y")}
							/>
						</Field>
						<Field
							label="Descrição completa"
							htmlFor="description"
							hint="Separe parágrafos com uma linha em branco. O primeiro parágrafo aparece em destaque."
							className="sm:col-span-2"
						>
							<textarea
								id="description"
								name="description"
								rows={8}
								value={v.description}
								onChange={(e) => set("description", e.target.value)}
								className={cn(inputClass, "resize-y leading-relaxed")}
							/>
						</Field>
					</div>
				</Panel>

				<Panel title="Capa *" description="Imagem principal: usada nos cartões, no topo da página e nas partilhas.">
					<CoverField value={v.cover} onChange={(url) => set("cover", url)} error={errors.cover} />
				</Panel>

				<Panel title="Galeria" description="Imagens e vídeos mostrados na página do projecto. Use as setas para reordenar.">
					<GalleryField value={v.gallery} onChange={(items) => set("gallery", items)} error={errors.gallery} />
				</Panel>

				<Panel title="Detalhes">
					<div className="grid gap-5 sm:grid-cols-2">
						<Field label="Cliente" htmlFor="client">
							<input id="client" name="client" value={v.client} onChange={(e) => set("client", e.target.value)} className={inputClass} />
						</Field>
						<Field label="A minha função" htmlFor="role">
							<input
								id="role"
								name="role"
								value={v.role}
								onChange={(e) => set("role", e.target.value)}
								className={inputClass}
								placeholder="Ex.: Design UI/UX e Full Stack"
							/>
						</Field>
						<Field label="Ano" htmlFor="year" error={errors.year}>
							<input
								id="year"
								name="year"
								type="number"
								inputMode="numeric"
								min={2000}
								max={2100}
								value={v.year}
								onChange={(e) => set("year", e.target.value)}
								aria-invalid={!!errors.year}
								className={inputClass}
							/>
						</Field>
						<Field label="Link do projecto" htmlFor="link" error={errors.link} hint="Deixe vazio se ainda não estiver disponível.">
							<input
								id="link"
								name="link"
								type="url"
								value={v.link}
								onChange={(e) => set("link", e.target.value)}
								aria-invalid={!!errors.link}
								className={inputClass}
								placeholder="https://"
							/>
						</Field>
						<Field label="Tecnologias" htmlFor="technologies" hint="Enter ou vírgula para adicionar." className="sm:col-span-2">
							<TagInput
								id="technologies"
								name="technologies"
								value={v.technologies}
								onChange={(tags) => set("technologies", tags)}
								placeholder="Next.js, TypeScript, PostgreSQL…"
							/>
						</Field>
						{!v.link && (
							<Field label="Texto quando não há link" htmlFor="statusText" className="sm:col-span-2">
								<input
									id="statusText"
									name="statusText"
									value={v.statusText}
									onChange={(e) => set("statusText", e.target.value)}
									className={inputClass}
									placeholder="Disponível em breve"
								/>
							</Field>
						)}
					</div>
				</Panel>
			</div>

			<aside className="flex flex-col gap-6 lg:sticky lg:top-8 lg:self-start">
				<Panel title="Publicação">
					<div className="flex flex-col gap-3">
						<Toggle
							name="published"
							checked={v.published}
							onChange={(c) => set("published", c)}
							label="Publicado"
							hint="Visível no site público."
						/>
						<Toggle
							name="featured"
							checked={v.featured}
							onChange={(c) => set("featured", c)}
							label="Em destaque"
							hint="Aparece primeiro e em grande na página inicial."
						/>
					</div>
					<button type="submit" disabled={pending} className="btn-primary mt-6 w-full max-lg:hidden">
						{pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
						{pending ? "A guardar…" : project ? "Guardar alterações" : "Criar projecto"}
					</button>
				</Panel>

				<div className="flex flex-col gap-3 max-lg:hidden">
					<p className="px-1 text-xs font-medium tracking-[0.2em] text-muted uppercase">Pré-visualização</p>
					<div className="pointer-events-none" aria-hidden>
						<ProjectCard project={preview} index={0} />
					</div>
				</div>
			</aside>

			{/* Mobile/tablet: botão de guardar sempre à mão */}
			<div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/8 bg-primary/90 px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden">
				<button type="submit" disabled={pending} className="btn-primary w-full">
					{pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
					{pending ? "A guardar…" : project ? "Guardar alterações" : "Criar projecto"}
				</button>
			</div>
		</form>
	)
}

function Toggle({
	name,
	checked,
	onChange,
	label,
	hint,
}: {
	name: string
	checked: boolean
	onChange: (checked: boolean) => void
	label: string
	hint: string
}) {
	return (
		<label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-white/7 p-4 transition hover:border-white/15">
			<span>
				<span className="block text-sm font-medium">{label}</span>
				<span className="block text-xs text-muted">{hint}</span>
			</span>
			<input
				type="checkbox"
				name={name}
				checked={checked}
				onChange={(e) => onChange(e.target.checked)}
				className="peer sr-only"
			/>
			<span
				aria-hidden
				className="relative mt-0.5 h-6 w-11 shrink-0 rounded-full bg-white/15 transition peer-checked:bg-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-bright after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition peer-checked:after:translate-x-5"
			/>
		</label>
	)
}
