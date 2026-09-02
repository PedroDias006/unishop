import { BlogHighlights } from "@/components/home/BlogHighlights";
import { BrandUniverse } from "@/components/home/BrandUniverse";
import { BusinessModel } from "@/components/home/BusinessModel";
import { BrazilPresence } from "@/components/home/BrazilPresence";
import { FaqSection } from "@/components/home/FaqSection";
import { Hero } from "@/components/home/Hero";
import { SolutionFinder } from "@/components/home/SolutionFinder";
import { Stats } from "@/components/home/Stats";
import { StoreFormats } from "@/components/home/StoreFormats";

/**
 * A ordem da página segue a pergunta que o visitante faz em cada altura da
 * rolagem: que marcas são essas → quem está por trás → o que essa gente vende
 * → o que resolve o meu problema → onde tem loja perto de mim → quanto custa
 * abrir uma → o que anda saindo no blog → e as dúvidas.
 *
 * Duas seções ficam coladas na que as motiva, e é essa a lógica do arranjo:
 *
 * - As marcas vêm logo depois da apresentação da rede. A seção anterior conta
 *   que existe indústria própria; esta mostra o que sai dela.
 * - O mapa vem logo depois do buscador de soluções. Quem acabou de descobrir
 *   qual produto resolve o problema dele tem uma pergunta só na sequência:
 *   onde eu compro isso.
 *
 * Os oito pontos do modelo (`PartnershipPillars`) saíram daqui: a home vai
 * direto ao preço, e o detalhe do modelo continua em `/modelo-de-negocio`.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <BusinessModel />
      <BrandUniverse />
      <SolutionFinder />
      <BrazilPresence />
      <StoreFormats />
      <BlogHighlights />
      <FaqSection />
    </>
  );
}
