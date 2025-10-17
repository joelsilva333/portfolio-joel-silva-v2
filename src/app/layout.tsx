import type { Metadata } from "next";
import { Poppins, Oxygen } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const oxygen = Oxygen({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-oxygen",
});

export const metadata: Metadata = {
  title: "Joel Silva | Desenvolvedor Full Stack",
  description:
    "Portfólio de Joel Silva — Desenvolvedor Full Stack especializado em Next.js, TypeScript e interjoel_silvas modernas. Explore meus projetos, habilidades e trajetória no desenvolvimento web.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Joel Silva | Desenvolvedor Full Stack",
    description:
      "Portfólio de Joel Silva — Desenvolvedor Full Stack especializado em Next.js, TypeScript e interjoel_silvas modernas. Explore meus projetos, habilidades e trajetória no desenvolvimento web.",
    url: "https://portfolio-joel-silva.vercel.app",
    siteName: "Joel Silva - Portfólio",
    images: [
      {
        url: "https://portfolio-joel-silva.vercel.app/images/joel_silva.png",
        width: 1920,
        height: 1040,
        alt: "Portfólio de Joel Silva",
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
    images: ["https://portfolio-joel-silva.vercel.app/images/joel_silva.png"],
  },
  metadataBase: new URL("https://portfolio-joel-silva.vercel.app"),
  themeColor: "#ffffff",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  authors: [
    {
      name: "Joel Silva",
      url: "https://portfolio-joel-silva.vercel.app",
    },
  ],
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
    "Desenvolvedor Web",
    "Freelancer Angola",
  ],
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
      <body className={`${poppins.variable} ${oxygen.variable} antialiased`}>
        {children}

        <Script
          id="structured-data-portfolio"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Joel Silva",
              url: "https://portfolio-joel-silva.vercel.app",
              image: "https://portfolio-joel-silva.vercel.app/images/joel_silva.png",
              jobTitle: "Desenvolvedor Full Stack",
              worksFor: {
                "@type": "Organization",
                name: "Freelancer / Projetos Independentes",
              },
              sameAs: [
                "https://www.linkedin.com/in/joel-silva",
                "https://github.com/joel-silva",
                "https://portfolio-joel-silva.vercel.app",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
