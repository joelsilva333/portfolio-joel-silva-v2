import type { Metadata } from "next";
import { Poppins, Oxygen } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const oxygen = Oxygen({
  variable: "--font-oxygen",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Joel Silva | Desenvolvedor Full Stack",
    template: "%s | Joel Silva",
  },
  description:
    "Portfólio de Joel Silva — Desenvolvedor Full Stack especializado em Next.js, TypeScript e interfaces modernas. Explore meus projetos, habilidades e trajetória no desenvolvimento web.",
  keywords: [
    "Joel Silva",
    "Desenvolvedor Full Stack",
    "Desenvolvedor Frontend",
    "Next.js",
    "React",
    "TypeScript",
    "UI/UX",
    "Programador Angola",
    "Portfólio Dev",
  ],
  openGraph: {
    url: "https://portfolio-joel-silva.vercel.app/",
    title: "Joel Silva | Desenvolvedor Full Stack",
    description:
      "Portfólio de Joel Silva — Desenvolvedor Full Stack especializado em Next.js e TypeScript. Veja meus projetos e trajetória.",
    siteName: "Joel Silva - Portfólio",
    images: [
      {
        url: "https://portfolio-joel-silva.vercel.app/images/face.png",
        width: 1920,
        height: 1040,
        alt: "Prévia do portfólio de Joel Silva",
      },
    ],
    locale: "pt-PT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joel Silva | Desenvolvedor Full Stack",
    description:
      "Portfólio de Joel Silva — Desenvolvedor especializado em Next.js e TypeScript.",
    images: ["https://portfolio-joel-silva.vercel.app/images/face.png"],
  },
  alternates: {
    canonical: "https://portfolio-joel-silva.vercel.app/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT">
      <body className={`${poppins.variable} ${oxygen.variable}  antialiased`}>
        {children}

        <Script
          id="structured-data-events"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Development",
              name: "Portfólio de Joel Silva",
              url: "https://portfolio-joel-silva.vercel.app",
              logo: "https://portfolio-joel-silva.vercel.app/white.png",
              department: {
                "@type": "Development",
                name: "Portfólio de Joel Silva",
                url: "https://portfolio-joel-silva.vercel.app",
                description:
                  "Portfólio de Joel Silva — Desenvolvedor Full Stack especializado em Next.js e TypeScript. Veja meus projetos e trajetória.",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
