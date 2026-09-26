import type { Metadata } from "next"
import PageHeader from "@/components/admin/PageHeader"
import AccountForm from "@/components/admin/AccountForm"
import { requireAdmin } from "@/server/auth"

export const metadata: Metadata = { title: "Definições" }

export default async function SettingsPage() {
	const session = await requireAdmin()
	return (
		<>
			<PageHeader title="Definições" description="Dados da sua conta de administrador." />
			<AccountForm name={session.name} email={session.email} />
		</>
	)
}
