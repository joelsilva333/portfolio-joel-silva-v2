import { messagesRepo } from "./db/data-source"
import type { Message } from "./db/entities"

export type MessageDTO = Omit<Message, "createdAt"> & { createdAt: string }

const toDTO = (m: Message): MessageDTO => ({ ...m, createdAt: m.createdAt.toISOString() })

export async function listMessages(filter: "all" | "unread" = "all") {
	const repo = await messagesRepo()
	const rows = await repo.find({
		where: filter === "unread" ? { read: false } : {},
		order: { createdAt: "DESC" },
	})
	return rows.map(toDTO)
}

export async function getMessage(id: string) {
	const row = await (await messagesRepo()).findOne({ where: { id } })
	return row ? toDTO(row) : null
}

export async function countUnreadMessages() {
	try {
		return await (await messagesRepo()).count({ where: { read: false } })
	} catch {
		return 0
	}
}
