/**
 * Prepara a base de dados:
 *   1. cria a base de dados se ainda não existir;
 *   2. sincroniza o esquema (tabelas) com as entidades;
 *   3. cria o utilizador admin (ADMIN_EMAIL / ADMIN_PASSWORD);
 *   4. insere os projectos iniciais que ainda não existam.
 *
 * Uso: npm run db:setup
 */
import { config } from "dotenv"
config({ path: ".env.local" })
config()

import bcrypt from "bcryptjs"
import { Client } from "pg"
import { createDataSource } from "../src/server/db/data-source"
import type { AdminUser, Project } from "../src/server/db/entities"

const R2 = "https://pub-8f5f708a259841eabb66c4c65c2660ea.r2.dev/images/projects"

const projects: Array<Partial<Project>> = [
	{
		slug: "anonimo-angola",
		title: "Anônimo Angola",
		category: "Rede Social",
		summary:
			"Plataforma para partilhar histórias e desabafos de forma anónima, promovendo apoio e comunidade em Angola.",
		description:
			"Plataforma que permite partilhar histórias e desabafos de forma anônima, promovendo apoio e comunidade em Angola.",
		cover: `${R2}/anonimo-angola.png`,
		gallery: [
			`${R2}/anonimo-angola.png`,
			`${R2}/anonimo-angola-2.png`,
			`${R2}/anonimo-angola.mp4`,
			`${R2}/anonimo-angola-2.mp4`,
			`${R2}/anonimo-angola-3.png`,
			`${R2}/anonimo-angola-4.png`,
			`${R2}/anonimo-angola-5.png`,
		],
		technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
		role: "Design UI/UX e Full Stack",
		link: null,
		statusText: "Disponível em breve",
		featured: true,
	},
	{
		slug: "mesa-redonda-com-ceos",
		title: "Mesa Redonda com CEOs",
		category: "Evento Corporativo",
		summary:
			"Ecossistema digital completo para um evento corporativo: do design aos pagamentos e gestão de convidados.",
		description:
			"Um evento realizado pela Global Services Corporation, onde desenvolvi todo o ecossistema, desde o design até os métodos de pagamentos e gestão de convidados.",
		cover: "https://globalsc.ao/images/events/mr-logo.png",
		gallery: ["/images/projects/mesa-redonda.png"],
		technologies: ["Next.js", "TypeScript", "Pagamentos"],
		client: "Global Services Corporation",
		role: "Design e Full Stack",
		link: "https://www.mesaredonda.globalsc.ao/",
	},
	{
		slug: "patrimonial-angola",
		title: "Patrimonial Angola",
		category: "Construção Civil",
		summary:
			"Website institucional para uma empresa de construção civil, do design UI ao frontend e backend.",
		description:
			"Empresa de Construção Civil, onde desenvolvi o website para a empresa desde o design UI ao desenvolvimento do frontend e backend.",
		cover: "/images/projects/patrimonial-angola-2.png",
		gallery: ["/images/projects/patrimonial-angola.png"],
		technologies: ["Next.js", "Tailwind CSS", "Node.js"],
		client: "Patrimonial Angola",
		role: "Design UI e Full Stack",
		link: "https://patrimonial-angola.vercel.app/",
	},
	{
		slug: "global-services-corporation",
		title: "Global Services Corporation",
		category: "Mediação de Seguros e Eventos",
		summary:
			"Website e infraestrutura interna: sistema de mediação de seguros, gestão de eventos, convites e pagamentos.",
		description:
			"Desenvolvi o website e a infraestrutura interna da empresa, como o sistema de mediação de seguros, desde o design UI/UX, ao desenvolvimento do sistema de mediação de seguros e gestão de eventos corporativos, incluindo o sistema de convites e pagamentos para os eventos.",
		cover: "https://globalsc.ao/logo/with-bg.png",
		gallery: ["https://globalsc.ao/logo/with-bg.png"],
		technologies: ["Next.js", "TypeScript", "PostgreSQL", "Node.js"],
		client: "Global Services Corporation",
		role: "Design UI/UX e Full Stack",
		link: "https://www.globalsc.ao/",
		featured: true,
	},
]

async function ensureDatabase() {
	const url = new URL(process.env.DATABASE_URL!)
	const name = decodeURIComponent(url.pathname.slice(1))
	url.pathname = "/postgres"

	const client = new Client({ connectionString: url.toString() })
	try {
		await client.connect()
		const { rowCount } = await client.query("SELECT 1 FROM pg_database WHERE datname = $1", [name])
		if (!rowCount) {
			await client.query(`CREATE DATABASE "${name.replace(/"/g, '""')}"`)
			console.log(`✓ Base de dados "${name}" criada`)
		} else {
			console.log(`• Base de dados "${name}" já existe`)
		}
	} catch (error) {
		// Serviços alojados (Neon, Supabase, Railway…) já entregam a BD criada e
		// muitas vezes não deixam ligar à "postgres" nem criar bases: segue em frente.
		console.warn(`• Não foi possível verificar/criar "${name}" (${(error as Error).message}); a assumir que já existe`)
	} finally {
		await client.end().catch(() => {})
	}
}

async function main() {
	if (!process.env.DATABASE_URL) throw new Error("Defina DATABASE_URL em .env.local")

	await ensureDatabase()

	const ds = await createDataSource({ synchronize: true }).initialize()
	console.log("✓ Esquema sincronizado")

	const users = ds.getRepository<AdminUser>("AdminUser")
	const email = (process.env.ADMIN_EMAIL || "").trim().toLowerCase()
	const password = process.env.ADMIN_PASSWORD || ""
	if (!email || password.length < 8) {
		console.warn("! ADMIN_EMAIL/ADMIN_PASSWORD (mín. 8 caracteres) em falta: admin não criado")
	} else if (await users.existsBy({ email })) {
		console.log(`• Admin ${email} já existe`)
	} else {
		await users.save(
			users.create({
				email,
				name: process.env.ADMIN_NAME || "Joel Silva",
				passwordHash: await bcrypt.hash(password, 12),
			}),
		)
		console.log(`✓ Admin ${email} criado`)
	}

	const repo = ds.getRepository<Project>("Project")
	let created = 0
	for (const [order, project] of projects.entries()) {
		if (await repo.existsBy({ slug: project.slug! })) continue
		await repo.save(repo.create({ ...project, order, published: true }))
		created++
	}
	console.log(created ? `✓ ${created} projecto(s) inserido(s)` : "• Projectos já existem")

	await ds.destroy()
}

main().catch((error) => {
	console.error("✗ Falhou:", error.message ?? error)
	process.exit(1)
})
