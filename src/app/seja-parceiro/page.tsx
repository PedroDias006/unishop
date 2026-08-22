import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { contactChannels, headquarters } from "@/data/contact";
import { siteUrl } from "@/data/site";
import { ContactChannels, PartnerIntro } from "./ContactRail";
import { HeadquartersMap } from "./HeadquartersMap";
import { PartnerForm } from "./PartnerForm";

export const metadata: Metadata = {
  title: "Seja um parceiro",
  description:
    "Fale com a equipe comercial da Rede Unishop e entenda investimento, implantação e suporte para abrir a sua unidade.",
  alternates: { canonical: "/seja-parceiro" },
};

/**
 * O mesmo endereço e os mesmos telefones que aparecem na tela, em JSON-LD, para
 * o Google mostrar o contato direto no resultado de busca.
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Rede Unishop",
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${headquarters.street}, ${headquarters.complement}`,
    addressLocality: headquarters.city,
    addressRegion: headquarters.state,
    postalCode: headquarters.postalCode,
    addressCountry: "BR",
  },
  contactPoint: contactChannels
    .filter((channel) => channel.href.startsWith("tel:"))
    .map((channel) => ({
      "@type": "ContactPoint",
      telephone: channel.href.replace("tel:", ""),
      contactType: "sales",
      areaServed: "BR",
      availableLanguage: "Portuguese",
    })),
};

export default function SejaParceiroPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <section className="bg-[var(--background)] py-16 sm:py-24">
        {/* Duas colunas no desktop; no celular vira abertura → formulário →
            canais, que é a ordem em que o visitante precisa das coisas. */}
        <Container className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
          <PartnerIntro />
          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <PartnerForm />
          </div>
          <ContactChannels />
        </Container>
      </section>

      <HeadquartersMap />
    </>
  );
}
