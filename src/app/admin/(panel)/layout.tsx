import { requireAdmin } from "@/server/auth"
import Sidebar from "@/components/admin/Sidebar"
import { countUnreadMessages } from "@/server/messages"

export const dynamic = "force-dynamic"

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
	// O middleware já protege /admin; verificar aqui também evita depender só dele.
	const session = await requireAdmin()
	const unread = await countUnreadMessages()

	return (
		<div className="flex min-h-screen max-lg:flex-col">
			<Sidebar name={session.name} email={session.email} unread={unread} />
			<main className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
				<div className="mx-auto max-w-6xl">{children}</div>
			</main>
		</div>
	)
}
