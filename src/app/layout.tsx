import type { Metadata } from "next";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: {
      default: "Rede Unishop | Mais cuidado. Menos complicação.",
      template: "%s | Rede Unishop",
    },
    description:
      "Produtos para casa e negócios, com orientação de quem entende e uma Rede Unishop perto de você.",
    openGraph: {
      title: "Rede Unishop | Mais cuidado. Menos complicação.",
      description:
        "Produtos para casa e negócios, com orientação especializada e uma loja perto de você.",
      images: [
        {
          url: new URL("/og.png", metadataBase),
          width: 1728,
          height: 908,
          alt: "Rede Unishop — Mais cuidado. Menos complicação.",
        },
      ],
      locale: "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Rede Unishop | Mais cuidado. Menos complicação.",
      description:
        "Produtos para casa e negócios, com orientação especializada e uma loja perto de você.",
      images: [new URL("/og.png", metadataBase)],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
