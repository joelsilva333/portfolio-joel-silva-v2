import Hero from "./components/Hero"
import AboutMe from "./components/AboutMe"
import Projects from "./components/Projects"
import Specialties from "./components/Specialties"
import TechMarquee from "./components/TechMarquee"
import FAQ from "./components/FAQ"
import Experience from "./components/Experience"
import Contact from "@/components/Contact"
import { listPublishedProjects } from "@/server/projects"

// Os projectos vêm da base de dados e mudam a partir do painel.
export const dynamic = "force-dynamic"

export default async function Home() {
	const projects = await listPublishedProjects()

	return (
		<>
			<Hero projectCount={projects.length} />
			<TechMarquee />
			<AboutMe />
			<Divider />
			<Specialties />
			<Divider />
			<Projects projects={projects} />
			<Divider />
			<Experience />
			<Divider />
			<FAQ />
			<Contact index="06" />
		</>
	)
}

function Divider() {
	return (
		<div className="container-page">
			<hr className="border-white/6" />
		</div>
	)
}
