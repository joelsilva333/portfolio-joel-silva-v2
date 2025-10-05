"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules"
import { ChevronLeft, ChevronRight, MoveLeft, MoveRight, X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-fade"

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
	cover: string
	images: string[]
	link: string
	soonText?: string
}

const projects: ProjectProps[] = [
	{
		id: 1,
		title: "Anônimo Angola",
		category: "Rede Social",
		description:
			"Plataforma que permite partilhar histórias e desabafos de forma anônima, promovendo apoio e comunidade em Angola.",
		cover:
			"https://pub-8f5f708a259841eabb66c4c65c2660ea.r2.dev/images/projects/anonimo-angola.png",
		images: [
			"https://pub-8f5f708a259841eabb66c4c65c2660ea.r2.dev/images/projects/anonimo-angola.png",
			"https://pub-8f5f708a259841eabb66c4c65c2660ea.r2.dev/images/projects/anonimo-angola-2.png",
			"https://pub-8f5f708a259841eabb66c4c65c2660ea.r2.dev/images/projects/anonimo-angola.mp4",
			"https://pub-8f5f708a259841eabb66c4c65c2660ea.r2.dev/images/projects/anonimo-angola-2.mp4",
			"https://pub-8f5f708a259841eabb66c4c65c2660ea.r2.dev/images/projects/anonimo-angola-3.png",
			"https://pub-8f5f708a259841eabb66c4c65c2660ea.r2.dev/images/projects/anonimo-angola-4.png",
			"https://pub-8f5f708a259841eabb66c4c65c2660ea.r2.dev/images/projects/anonimo-angola-5.png",
		],
		link: "https://anonimo-angola.vercel.app",
	},
	{
		id: 2,
		title: "Kuvica",
		category: "Marketplace",
		description:
			"Marketplace de multisserviços que conecta clientes a prestadores de serviços de forma rápida e segura.",
		cover:
			"https://pub-8f5f708a259841eabb66c4c65c2660ea.r2.dev/images/projects/kuvica.png",
		images: [
			"https://pub-8f5f708a259841eabb66c4c65c2660ea.r2.dev/images/projects/kuvica.png",
			"https://pub-8f5f708a259841eabb66c4c65c2660ea.r2.dev/images/projects/kuvica.mp4",
			"https://pub-8f5f708a259841eabb66c4c65c2660ea.r2.dev/images/projects/kuvica-2.mp4",
			"https://pub-8f5f708a259841eabb66c4c65c2660ea.r2.dev/images/projects/kuvica-3.png",
		],
		link: "HTTPs://kuvica.vercel.app",
	},
	{
		id: 3,
		title: "MOBO GO",
		category: "Carteira Digital",
		description:
			"Aplicativo que digitaliza o pagamento de passagens em táxis coletivos (azuis e brancos) em Angola, permitindo que passageiros comprem tickets digitais e motoristas recebam diretamente em sua carteira digital.",
		cover:
			"https://pub-8f5f708a259841eabb66c4c65c2660ea.r2.dev/images/projects/mobo-go-2.png",
		images: [
			"https://pub-8f5f708a259841eabb66c4c65c2660ea.r2.dev/images/projects/mobo-go-2.png",
			"https://pub-8f5f708a259841eabb66c4c65c2660ea.r2.dev/images/projects/mobo-go.png",
			"https://pub-8f5f708a259841eabb66c4c65c2660ea.r2.dev/images/projects/mobo-go.mp4",
			"https://pub-8f5f708a259841eabb66c4c65c2660ea.r2.dev/images/projects/mobo-go-3.png",
			"https://pub-8f5f708a259841eabb66c4c65c2660ea.r2.dev/images/projects/mobo-go-4.png",
		],
		link: "#",
		soonText: "Em breve no Google Play e App Store",
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
			id="projects"
			viewport={{ once: true, amount: 0.2 }}
			className="w-full max-w-7xl"
		>
			<motion.div
				variants={item}
				className="flex flex-col items-center justify-around w-full z-10"
			>
				<div className="w-full flex max-lg:flex-col max-lg:justify-center max-lg:text-center justify-between items-center">
					<h1 className="text-4xl font-semibold max-lg:text-3xl max-md:text-2xl">
						{"Projectos e trabalhos".toUpperCase()}
					</h1>

					<div className="flex items-center gap-4 relative max-w-40 w-full max-lg:hidden">
						<button className="swiper-button-prev btn-navigation">
							<MoveLeft className="w-5" />
						</button>

						<button className="swiper-button-next btn-navigation">
							<MoveRight className="w-5" />
						</button>
					</div>
				</div>

				<motion.div variants={item} className="relative w-full flex flex-col">
					<Swiper
						spaceBetween={50}
						slidesPerView={"auto"}
						pagination={{
							clickable: true,
						}}
						navigation={{
							nextEl: ".swiper-button-next",
							prevEl: ".swiper-button-prev",
						}}
						autoplay={{
							disableOnInteraction: true,
							delay: 3000,
						}}
						modules={[Navigation, Autoplay, Pagination]}
						breakpoints={{
							0: {
								spaceBetween: 10,
								slidesPerView: 1,
								pagination: { clickable: true },
							},
							1024: {
								spaceBetween: 50,
								slidesPerView: 3,
							},
						}}
						className="w-full z-50 pt-8"
					>
						{projects.map((project) => (
							<SwiperSlide
								key={project.id}
								className="py-12 max-lg:px-5 w-full flex justify-center items-center"
							>
								<div
									className="lg:max-w-sm w-full hover:scale-105 transition-all duration-300 h-124 rounded-2xl bg-cover bg-center flex flex-col items-start  justify-end p-8 group gap-2"
									style={{
										backgroundImage: `linear-gradient(to top, #060708, #00000000), url(${project.cover})`,
										backgroundSize: "cover",
									}}
								>
									<div className="text-light flex justify-between items-center w-full">
										<div>
											<h2 className="text-xs text-light">
												{project.category.toUpperCase()}
											</h2>
											<p className="max-lg:text-sm">
												{project.title.toUpperCase()}
											</p>
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
							className="flex max-lg:flex-col items-center justify-center w-full lg:max-w-5xl h-124"
						>
							<motion.div
								initial={{ opacity: 0, x: -50 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -50 }}
								transition={{ duration: 0.5, delay: 0.2 }}
								className="w-1/2 max-lg:w-full h-full max-lg:h-96 relative"
							>
								<button
									className="absolute top-4 right-4 text-light z-40 cursor-pointer bg-primary/60 backdrop-blur-xs rounded-full p-2 lg:hidden"
									onClick={() => setOpenModal(false)}
								>
									<X className="w-6" />
								</button>
								<Swiper
									slidesPerView={1}
									effect="fade"
									navigation={{
										nextEl: ".project-button-next",
										prevEl: ".project-button-prev",
										disabledClass: "swiper-button-disabled",
									}}
									speed={2000}
									modules={[EffectFade, Navigation]}
									className="w-full h-full max-lg:h-80"
								>
									{selectedProject.images.map((media, index) => (
										<SwiperSlide
											key={index}
											className="w-full h-full  bg-light lg:rounded-l-2xl relative"
										>
											<div className="flex items-center gap-4 justify-between px-3 absolute top-1/2 -translate-y-1/2 w-full z-20">
												<button className="project-button-prev btn-navigation-v2">
													<ChevronLeft className="w-5" />
												</button>

												<button className="project-button-next btn-navigation-v2">
													<ChevronRight className="w-5" />
												</button>
											</div>
											{media.endsWith(".mp4") || media.endsWith(".webm") ? (
												<video
													autoPlay
													loop
													muted
													playsInline
													preload="auto"
													controls={false}
													disablePictureInPicture
													controlsList="nodownload nofullscreen noremoteplayback"
													className="w-full h-full object-contain rounded-l-2xl"
												>
													<source
														src={media}
														type={
															media.endsWith(".mp4")
																? "video/mp4"
																: "video/webm"
														}
													/>
												</video>
											) : (
												<Image
													src={media}
													alt={selectedProject.title}
													width={1920}
													height={1080}
													className="w-full h-full object-contain rounded-l-2xl"
												/>
											)}
										</SwiperSlide>
									))}
								</Swiper>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, x: 50 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 50 }}
								transition={{ duration: 0.5, delay: 0.3 }}
								className="bg-primary h-full text-light rounded-r-2xl w-1/2 max-lg:w-full px-12 py-12 max-lg:p-8 relative flex flex-col justify-between"
							>
								<button
									className="absolute top-4 right-6 text-light cursor-pointer max-lg:hidden"
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
									<h2 className="text-2xl max-lg:text-lg font-semibold">
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
									{selectedProject.link === "#" ? (
										<button
											disabled
											className="btn-secondary mt-8 items-center gap-2 opacity-50"
										>
											{selectedProject.soonText}
										</button>
									) : (
										<Link
											href={selectedProject.link}
											target="_blank"
											className="btn-secondary mt-8 inline-flex items-center gap-2"
										>
											ABRIR PROJECTO <MoveRight className="w-4" />
										</Link>
									)}
								</motion.div>
							</motion.div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	)
}
