import type { Metadata } from "next"
import { Poppins, Oxygen } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
	variable: "--font-poppins",
	weight: ["400", "500", "600", "700", "800", "900"],
	subsets: ["latin"],
})

const oxygen = Oxygen({
	variable: "--font-oxygen",
	weight: ["400", "700"],
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "Portfólio - Joel Silva",
	description: "Portfólio de Joel Silva, Desenvolvedor Full Stack.",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-PT">
			<body className={`${poppins.variable} ${oxygen.variable}  antialiased`}>
				{children}
			</body>
		</html>
	)
}
