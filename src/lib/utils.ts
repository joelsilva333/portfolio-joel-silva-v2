export function slugify(value: string) {
	return value
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")
}

export function isVideo(src: string) {
	return /\.(mp4|webm|mov)(\?.*)?$/i.test(src)
}

export function cn(...classes: Array<string | false | null | undefined>) {
	return classes.filter(Boolean).join(" ")
}

export function paragraphs(text: string) {
	return text
		.split(/\n\s*\n/)
		.map((p) => p.trim())
		.filter(Boolean)
}

export const CONTACT = {
	whatsapp:
		"https://api.whatsapp.com/send?phone=244946506875&text=Olá!%20Quero%20um%20website%20para%20mim!",
	github: "https://github.com/joelsilva333",
	linkedin: "https://www.linkedin.com/in/joel-g-da-silva",
	instagram: "https://instagram.com/joel_germany_",
}
