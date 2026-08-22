import { BlogHighlights } from "@/components/home/BlogHighlights";
import { BrandUniverse } from "@/components/home/BrandUniverse";
import { BusinessModel } from "@/components/home/BusinessModel";
import { BrazilPresence } from "@/components/home/BrazilPresence";
import { FaqSection } from "@/components/home/FaqSection";
import { Hero } from "@/components/home/Hero";
import { PartnershipPillars } from "@/components/home/PartnershipPillars";
import { obterPilares } from "@/data/editorial";
import { SolutionFinder } from "@/components/home/SolutionFinder";
import { Stats } from "@/components/home/Stats";

/**
 * A ordem da página segue a pergunta que o visitante faz em cada altura da
 * rolagem: que marcas são essas → quem está por trás → como funciona a
 * parceria → o que resolve o meu problema → o que a loja vende → onde tem
 * loja → o que anda saindo no blog → e as dúvidas.
 */
export default async function HomePage() {
  // O carrossel dos pilares roda no navegador, então quem busca o conteúdo é a
  // página — o componente recebe pronto.
  const pilares = await obterPilares();

  return (
    <>
      <Hero />
      <Stats />
      <BusinessModel />
      <PartnershipPillars partnershipPillars={pilares} />
      <SolutionFinder />
      <BrandUniverse />
      <BrazilPresence />
      <BlogHighlights />
      <FaqSection />
    </>
  );
}
