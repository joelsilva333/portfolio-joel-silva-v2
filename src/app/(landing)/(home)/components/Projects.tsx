"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper/modules"
import { MoveLeft, MoveRight, X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import "swiper/css"
import "swiper/css/navigation"

const container = {
	hidden: { opacity: 0, y: 100 },
	show: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			when: "beforeChildren",
			staggerChildren: 0.4,
		},
	},
}

const item = {
	hidden: { opacity: 0, y: 100 },
	show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
}

interface ProjectProps {
	id: number
	title: string
	category: string
	description: string
	image: string
	link: string
}

const projects = [
	{
		id: 1,
		title: "Anônimo Angola",
		category: "Rede Social",
		description:
			"Plataforma que permite partilhar histórias e desabafos de forma anônima, promovendo apoio e comunidade em Angola.",
		image: "/images/projectos/anonimo-angola.png",
		link: "#",
	},
	{
		id: 2,
		title: "Kuvica",
		category: "Marketplace",
		description:
			"Marketplace de multisserviços que conecta clientes a prestadores de serviços de forma rápida e segura.",
		image: "/images/projectos/kuvica.jpg",
		link: "#",
	},
]

export default function Projects() {
	const [openModal, setOpenModal] = useState(false)
	const [selectedProject, setSelectedProject] = useState<ProjectProps>()

	const handleOpenModal = (project: ProjectProps) => {
		setSelectedProject(project)
		setOpenModal(true)
	}

	return (
		<motion.div
			variants={container}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, amount: 0.2 }}
			className="w-full max-w-7xl "
		>
			<motion.div
				variants={item}
				className="flex flex-col items-center justify-around w-full rounded-2xl backdrop-blur-lg"
			>
				<div className="w-full flex justify-between items-center">
					<h1 className="text-4xl">{"Projectos".toUpperCase()}</h1>

					<div className="flex items-center gap-4">
						<button className="swiper-button-prev btn-primary">
							<MoveLeft className="w-5" />
						</button>

						<button className="swiper-button-next btn-primary">
							<MoveRight className="w-5" />
						</button>
					</div>
				</div>

				<motion.div variants={item} className="relative w-full flex flex-col">
					<Swiper
						modules={[Navigation, Autoplay]}
						spaceBetween={50}
						slidesPerView={"auto"}
						navigation={{
							nextEl: ".swiper-button-next",
							prevEl: ".swiper-button-prev",
						}}
						autoplay={{
							disableOnInteraction: true,
							delay: 3000,
						}}
						breakpoints={{
							320: {
								spaceBetween: 10,
								slidesPerView: 1,
							},
							1024: {
								spaceBetween: 50,
								slidesPerView: 3,
							},
						}}
						className="w-full z-50 py-8"
					>
						{projects.map((project) => (
							<SwiperSlide key={project.id} className="py-12">
								<div
									className="max-w-sm w-full hover:scale-105 transition-all duration-300 h-124 rounded-2xl bg-cover bg-center flex flex-col items-start justify-end p-8 group gap-2"
									style={{
										backgroundImage: `linear-gradient(to top, #060708, #00000000), url(${project.image})`,
										backgroundSize: "cover",
									}}
								>
									<div className="text-light flex justify-between items-center w-full">
										<div>
											<h2 className="text-xs text-light">
												{project.category.toUpperCase()}
											</h2>
											<p>{project.title.toUpperCase()}</p>
										</div>

										<button
											className="btn-tertiary"
											onClick={() => handleOpenModal(project)}
										>
											VER MAIS <MoveRight className="w-4" />
										</button>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</motion.div>
			</motion.div>

			<AnimatePresence>
				{openModal && selectedProject && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/50"
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0, y: 50 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.9, opacity: 0, y: 50 }}
							transition={{ duration: 0.4, ease: "easeInOut" }}
							className="flex items-center justify-center w-full max-w-5xl h-124"
						>
							<motion.div
								initial={{ opacity: 0, x: -50 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -50 }}
								transition={{ duration: 0.5, delay: 0.2 }}
								className="w-1/2 h-full"
							>
								<Image
									src={selectedProject.image}
									alt={selectedProject.title}
									width={1920}
									height={1080}
									className="w-full h-full object-cover rounded-l-2xl"
								/>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, x: 50 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 50 }}
								transition={{ duration: 0.5, delay: 0.3 }}
								className="bg-primary h-full text-light rounded-r-2xl w-1/2 px-12 py-12 relative flex flex-col justify-between"
							>
								<button
									className="absolute top-4 right-6 text-light cursor-pointer"
									onClick={() => setOpenModal(false)}
								>
									<X className="w-6" />
								</button>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 20 }}
									transition={{ duration: 0.5, delay: 0.4 }}
									className="flex flex-col gap-2"
								>
									<h2 className="text-2xl">
										{selectedProject.title.toUpperCase()}
									</h2>
									<p className="text-sm leading-relaxed">
										{selectedProject.description}
									</p>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 20 }}
									transition={{ duration: 0.5, delay: 0.5 }}
								>
									<Link
										href={selectedProject.link}
										className="btn-secondary mt-8 inline-flex items-center gap-2"
									>
										TESTAR PROJECTO <MoveRight className="w-4" />
									</Link>
								</motion.div>
							</motion.div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	)
}
