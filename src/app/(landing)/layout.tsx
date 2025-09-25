import Image from "next/image"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative w-full min-h-screen">
			<Image
				src={"/images/Me.png"}
				alt={"Me"}
				width={1920}
				height={1080}
				className="w-full h-screen object-cover"
			/>
			{children}
		</div>
	)
}
