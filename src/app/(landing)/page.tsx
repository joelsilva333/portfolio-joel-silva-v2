import Image from "next/image"

export default function Home() {
	return (
		<div className="flex flex-col items-center relative justify-center w-full h-screen">
			<div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50 text-white">
				<Image
					src={"/images/Me.png"}
					alt={"Me"}
					width={1920}
					height={1080}
					className="w-full h-screen object-cover"
				/>
			</div>
		</div>
	)
}
