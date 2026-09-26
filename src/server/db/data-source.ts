import "reflect-metadata"
import pg from "pg"
import { DataSource, type ObjectLiteral, type Repository } from "typeorm"
import {
	AdminUserEntity,
	MessageEntity,
	ProjectEntity,
	type AdminUser,
	type Message,
	type Project,
} from "./entities"

export function createDataSource(overrides: { synchronize?: boolean } = {}) {
	if (!process.env.DATABASE_URL) {
		throw new Error("DATABASE_URL não está definido. Veja o ficheiro .env.example.")
	}

	return new DataSource({
		type: "postgres",
		// Driver passado explicitamente: por omissão o TypeORM faz require("pg") em
		// runtime, que o build de produção não detecta e deixa de fora do servidor.
		driver: pg,
		url: process.env.DATABASE_URL,
		entities: [ProjectEntity, AdminUserEntity, MessageEntity],
		synchronize: overrides.synchronize ?? process.env.DB_SYNCHRONIZE === "true",
		logging: false,
	})
}

// Uma única ligação por processo; sobrevive ao hot reload do Next em desenvolvimento.
const globalForDb = globalThis as unknown as { __dataSource?: Promise<DataSource> }

export function getDataSource() {
	if (!globalForDb.__dataSource) {
		globalForDb.__dataSource = createDataSource()
			.initialize()
			.catch((error) => {
				globalForDb.__dataSource = undefined
				throw error
			})
	}
	return globalForDb.__dataSource
}

// Repositórios resolvidos pelo nome da entidade: após um hot reload os objectos
// EntitySchema são recriados, mas o nome continua a apontar para a metadata certa.
async function repo<T extends ObjectLiteral>(name: string): Promise<Repository<T>> {
	const ds = await getDataSource()
	return ds.getRepository<T>(name)
}

export const projectsRepo = () => repo<Project>("Project")
export const adminUsersRepo = () => repo<AdminUser>("AdminUser")
export const messagesRepo = () => repo<Message>("Message")
