import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteUrl } from "@/data/site";
import "./globals.css";

const title = "Rede Unishop | Mais cuidado. Menos complicação.";
const description =
  "Produtos para casa e negócios, com orientação de quem entende e uma Rede Unishop perto de você.";

// metadataBase fixo (em vez de derivado de headers()) para que as páginas
// continuem estáticas e possam ser servidas direto do cache/CDN.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Rede Unishop",
  },
  description,
  applicationName: "Rede Unishop",
  alternates: { canonical: "/" },
  openGraph: {
    siteName: "Rede Unishop",
    title,
    description:
      "Produtos para casa e negócios, com orientação especializada e uma loja perto de você.",
    url: "/",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Rede Unishop — Mais cuidado. Menos complicação.",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Produtos para casa e negócios, com orientação especializada e uma loja perto de você.",
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#04224c",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <head>
        <link
          rel="preload"
          href="/fonts/manrope-latin-variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* O vídeo institucional só é buscado quando o usuário rola até ele. */}
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
      </head>

      <body>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
