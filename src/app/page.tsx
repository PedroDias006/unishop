import { BlogHighlights } from "@/components/home/BlogHighlights";
import { BrandUniverse } from "@/components/home/BrandUniverse";
import { BusinessModel } from "@/components/home/BusinessModel";
import { BrazilPresence } from "@/components/home/BrazilPresence";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { InvestmentSimulator } from "@/components/home/InvestmentSimulator";
import { NetworkNumbers } from "@/components/home/NetworkNumbers";
import { PartnershipPillars } from "@/components/home/PartnershipPillars";
import { Segments } from "@/components/home/Segments";
import { SolutionFinder } from "@/components/home/SolutionFinder";
import { Stats } from "@/components/home/Stats";

/**
 * A ordem da página segue a pergunta que o visitante faz em cada altura da
 * rolagem: que marcas são essas → qual o tamanho da rede → quem está por trás
 * → como funciona a parceria → o que resolve o meu problema → o que a loja
 * vende → onde tem loja → quanto custa → deu certo com quem? → e as dúvidas.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <NetworkNumbers />
      <BusinessModel />
      <PartnershipPillars />
      <SolutionFinder />
      <BrandUniverse />
      <BrazilPresence />
      <InvestmentSimulator />
      <Segments />
      <BlogHighlights />
      <FaqSection />
      <FinalCta />
    </>
  );
}
