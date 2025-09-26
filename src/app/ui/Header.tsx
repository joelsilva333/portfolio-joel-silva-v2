import { MoveRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Header() {
	const navItems = [
		{
			link: "#",
			title: "Sobre",
		},
		{
			link: "#",
			title: "Projectos",
		},
		{
			link: "#",
			title: "Playground",
		},
		{
			link: "#",
			title: "Faq",
		},
	]

	return (
		<header className="fixed top-4 left-1/2 -translate-x-1/2 text-light w-full max-w-7xl rounded-full px-6 py-3 flex items-center justify-between z-20 bg-light/10 backdrop-blur-xs">
			<Link href={"#"}>
				<Image
					src={"/logo/white.png"}
					alt={"Logotipo Joel Silva"}
					width={1920}
					height={1080}
					className="w-10 object-contain"
				/>
			</Link>

			<ul className="flex items-center gap-8">
				{navItems.map((item, index) => (
					<li
						key={index}
						className="font-medium hover:scale-105 transition-all duration-300 text-sm"
					>
						<Link href={item.link}>{item.title.toUpperCase()}</Link>
					</li>
				))}
			</ul>

			<Link href="#" className="btn-primary">
				CONTACTAR <MoveRight className="w-6" />
			</Link>
		</header>
	)
}
