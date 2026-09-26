import { ArrowUp, ArrowUpRight, Github, Instagram, Linkedin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { CONTACT } from "@/lib/utils"
import { WhatsAppIcon } from "@/components/icons"

const socials = [
	{ href: CONTACT.whatsapp, label: "WhatsApp", icon: WhatsAppIcon },
	{ href: CONTACT.github, label: "GitHub", icon: Github },
	{ href: CONTACT.linkedin, label: "LinkedIn", icon: Linkedin },
	{ href: CONTACT.instagram, label: "Instagram", icon: Instagram },
]

const links = [
	{ href: "/#about", label: "Sobre" },
	{ href: "/#specialities", label: "Especialidades" },
	{ href: "/projectos", label: "Projectos" },
	{ href: "/#experiencia", label: "Experiência" },
	{ href: "/#faq", label: "FAQ" },
]

export default function Footer() {
	return (
		<footer className="relative mt-4 border-t border-white/6 bg-surface sm:mt-12">
			<div className="container-page grid grid-cols-2 gap-x-6 gap-y-10 py-10 sm:py-16 md:grid-cols-[1.5fr_1fr_1fr] md:gap-12">
				<div className="col-span-2 flex flex-col gap-4 sm:gap-5 md:col-span-1">
					<Link href="/" className="flex items-center gap-3">
						<Image src="/logo/white.png" alt="" width={80} height={80} className="w-10" />
						<span className="font-display font-semibold tracking-wide">JOEL SILVA</span>
					</Link>
					<p className="max-w-sm text-sm leading-relaxed text-muted">
						Desenvolvedor Full Stack em Angola. Desenho e construo produtos digitais
						bonitos por fora e sólidos por dentro.
					</p>
					<a
						href="#contacto"
						className="group inline-flex w-fit items-center gap-2 font-display text-lg text-light"
					>
						Iniciar um projecto
						<ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
					</a>
				</div>

				<div>
					<h2 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted">
						Navegação
					</h2>
					<ul className="flex flex-col gap-2.5 text-sm">
						{links.map((l) => (
							<li key={l.href}>
								<Link href={l.href} className="text-light/80 transition hover:text-white">
									{l.label}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div>
					<h2 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted">
						Redes
					</h2>
					<ul className="flex flex-col gap-2.5 text-sm">
						{socials.map(({ href, label, icon: Icon }) => (
							<li key={label}>
								<a
									href={href}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 text-light/80 transition hover:text-white"
								>
									<Icon className="h-4 w-4" /> {label}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="border-t border-white/6">
				<div className="container-page flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-5 text-xs text-muted sm:py-6">
					<p>© {new Date().getFullYear()} Joel Germano. Todos os direitos reservados.</p>
					<a href="#top" className="inline-flex items-center gap-1.5 hover:text-light">
						Voltar ao topo <ArrowUp className="h-3.5 w-3.5" />
					</a>
				</div>
			</div>
		</footer>
	)
}
