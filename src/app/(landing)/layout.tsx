import Header from "../ui/Header"
import Footer from "../ui/Footer"
import MobileContactBar from "@/components/MobileContactBar"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div id="top" className="relative flex min-h-screen flex-col overflow-x-clip">
			<Header />
			<main className="flex-1">{children}</main>
			<Footer />
			<MobileContactBar />
		</div>
	)
}
