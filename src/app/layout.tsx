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
	metadataBase: new URL("https://portfolio-joel-silva.vercel.app/"),
	title: {
		default: "Joel Silva | Desenvolvedor Full Stack",
		template: "%s | Joel Silva",
	},
	description:
		"Portfólio de Joel Silva — Desenvolvedor Full Stack especializado em Next.js, TypeScript e interfaces modernas. Explore meus projetos, habilidades e trajetória no desenvolvimento web.",
	keywords: [
		"Joel Silva",
		"Desenvolvedor Full Stack",
		"Desenvolvedor Frontend",
		"Next.js",
		"React",
		"TypeScript",
		"UI/UX",
		"Programador Angola",
		"Portfólio Dev",
	],
	authors: [{ name: "Joel Silva" }],
	creator: "Joel Silva",
	publisher: "Joel Silva",
	openGraph: {
		type: "website",
		locale: "pt_PT",
		url: "https://portfolio-joel-silva.vercel.app/",
		title: "Joel Silva | Desenvolvedor Full Stack",
		description:
			"Portfólio de Joel Silva — Desenvolvedor Full Stack especializado em Next.js e TypeScript. Veja meus projetos e trajetória.",
		siteName: "Joel Silva - Portfólio",
		images: [
			{
				url: "/images/face.png",
				width: 1200,
				height: 630,
				alt: "Prévia do portfólio de Joel Silva",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Joel Silva | Desenvolvedor Full Stack",
		description:
			"Portfólio de Joel Silva — Desenvolvedor especializado em Next.js e TypeScript.",
		creator: "@JOELGERMANY4",
		images: ["/images/face.png"],
	},
	alternates: {
		canonical: "https://portfolio-joel-silva.vercel.app/",
	},
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
