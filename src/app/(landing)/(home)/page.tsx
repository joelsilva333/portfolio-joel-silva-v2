import Hero from "./components/Hero"
import AboutMe from "./components/AboutMe"
import Projects from "./components/Projects"
import Image from "next/image"
import Specialties from "./components/Specialties"

export default function Home() {
	const positions = ["top-[10%] left-0 rotate-180"]

	return (
		<div className="min-h-screen flex flex-col items-center relative justify-center gap-16">
			{positions.map((position, index) => (
				<Image
					key={index}
					src="/images/bg/circle.png"
					alt="Circle Decoration"
					width={1000}
					height={1000}
					className={`absolute  ${position}  animate-pulse z-0`}
				/>
			))}
			<Hero />
			<AboutMe />
			<hr className="w-full border-light/15 max-w-7xl" />
			<Specialties />
			<hr className="w-full border-light/15 max-w-7xl" />
			<Projects />
		</div>
	)
}
