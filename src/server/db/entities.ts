import { EntitySchema } from "typeorm"

export interface Project {
	id: string
	slug: string
	title: string
	category: string
	summary: string
	description: string
	cover: string
	gallery: string[]
	technologies: string[]
	client: string | null
	role: string | null
	year: number | null
	link: string | null
	statusText: string | null
	featured: boolean
	published: boolean
	order: number
	createdAt: Date
	updatedAt: Date
}

export interface AdminUser {
	id: string
	name: string
	email: string
	passwordHash: string
	createdAt: Date
	updatedAt: Date
}

// EntitySchema em vez de decorators: evita depender de emitDecoratorMetadata,
// que o compilador do Next (SWC/Turbopack) não garante.
export const ProjectEntity = new EntitySchema<Project>({
	name: "Project",
	tableName: "projects",
	columns: {
		id: { type: "uuid", primary: true, generated: "uuid" },
		slug: { type: "varchar", length: 160, unique: true },
		title: { type: "varchar", length: 160 },
		category: { type: "varchar", length: 120 },
		summary: { type: "varchar", length: 300, default: "" },
		description: { type: "text", default: "" },
		cover: { type: "text" },
		gallery: { type: "jsonb", default: () => "'[]'" },
		technologies: { type: "jsonb", default: () => "'[]'" },
		client: { type: "varchar", length: 160, nullable: true },
		role: { type: "varchar", length: 160, nullable: true },
		year: { type: "int", nullable: true },
		link: { type: "text", nullable: true },
		statusText: { type: "varchar", length: 160, nullable: true },
		featured: { type: "boolean", default: false },
		published: { type: "boolean", default: true },
		order: { type: "int", default: 0 },
		createdAt: { type: "timestamptz", createDate: true },
		updatedAt: { type: "timestamptz", updateDate: true },
	},
})

export interface Message {
	id: string
	name: string
	email: string
	phone: string | null
	company: string | null
	projectType: string | null
	budget: string | null
	message: string
	read: boolean
	createdAt: Date
}

export const MessageEntity = new EntitySchema<Message>({
	name: "Message",
	tableName: "messages",
	columns: {
		id: { type: "uuid", primary: true, generated: "uuid" },
		name: { type: "varchar", length: 120 },
		email: { type: "varchar", length: 200 },
		phone: { type: "varchar", length: 40, nullable: true },
		company: { type: "varchar", length: 160, nullable: true },
		projectType: { type: "varchar", length: 80, nullable: true },
		budget: { type: "varchar", length: 80, nullable: true },
		message: { type: "text" },
		read: { type: "boolean", default: false },
		createdAt: { type: "timestamptz", createDate: true },
	},
	indices: [{ columns: ["read", "createdAt"] }],
})

export const AdminUserEntity = new EntitySchema<AdminUser>({
	name: "AdminUser",
	tableName: "admin_users",
	columns: {
		id: { type: "uuid", primary: true, generated: "uuid" },
		name: { type: "varchar", length: 120 },
		email: { type: "varchar", length: 200, unique: true },
		passwordHash: { type: "varchar", length: 200 },
		createdAt: { type: "timestamptz", createDate: true },
		updatedAt: { type: "timestamptz", updateDate: true },
	},
})
