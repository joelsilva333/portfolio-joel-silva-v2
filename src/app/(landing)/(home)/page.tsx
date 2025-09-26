import Hero from "./components/Hero"
import AboutMe from "./components/AboutMe"
import Projects from "./components/Projects"

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col items-center relative justify-center gap-16">
			<Hero />
			<AboutMe />
			<hr className="w-full border-light/15 max-w-7xl" />
			<Projects />
		</div>
	)
}
