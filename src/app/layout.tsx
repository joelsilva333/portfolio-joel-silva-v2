import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060708",
};

export const metadata: Metadata = {
  title: {
    default: "Joel Silva | Desenvolvedor Full Stack",
    template: "%s | Joel Silva",
  },
  description:
    "Desenvolvedor Full Stack em Luanda. Crio websites, plataformas e sistemas web com Next.js, React e TypeScript — do design UI/UX ao deploy. Veja projectos como a Mesa Redonda com CEOs e fale comigo.",
  applicationName: "Joel Silva — Portfólio",
  creator: "Joel Silva",
  icons: {
    icon: "/favicon.ico",
  },
  // A imagem de partilha é gerada em app/opengraph-image.tsx (e por projecto em
  // projectos/[slug]/opengraph-image.tsx); o Next injecta og:image e twitter:image.
  openGraph: {
    title: "Joel Silva | Desenvolvedor Full Stack",
    description:
      "Websites, plataformas e sistemas web feitos de ponta a ponta — do design UI/UX ao deploy. Veja os meus projectos e vamos conversar.",
    url: "/",
    siteName: "Joel Silva — Portfólio",
    locale: "pt_PT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joel Silva | Desenvolvedor Full Stack",
    description:
      "Websites, plataformas e sistemas web feitos de ponta a ponta — do design UI/UX ao deploy.",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://joelsilva.site"),
  authors: [
    {
      name: "Joel Silva",
      url: "https://joelsilva.site",
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
    canonical: "/",
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
      <body className={`${inter.variable} ${grotesk.variable} antialiased`}>
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
              url: "https://joelsilva.site",
              image:
                "https://joelsilva.site/images/joel_silva.png",
              jobTitle: "Desenvolvedor Full Stack",
              worksFor: {
                "@type": "Organization",
                name: "Freelancer / Projetos Independentes",
              },
              sameAs: [
                "https://www.linkedin.com/in/joel-g-da-silva",
                "https://instagram.com/joel_germany_",
                "https://github.com/joelsilva333",
                "https://joelsilva.site",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
