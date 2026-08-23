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
 * rolagem: que marcas são essas → quem está por trás → o que resolve o meu
 * problema → quanto custa abrir uma loja → o que a loja vende → o que anda
 * saindo no blog → onde tem loja → e as dúvidas.
 *
 * O buscador de soluções subiu para logo depois da apresentação da rede: ele é
 * a primeira coisa que responde a um visitante que chegou com um problema de
 * limpeza na mão, e não só a quem veio pensando em abrir loja. O mapa desceu
 * para perto do rodapé, onde vira o "onde encontro" de quem já se convenceu.
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
      <SolutionFinder />
      <StoreFormats />
      <BrandUniverse />
      <BlogHighlights />
      <BrazilPresence />
      <FaqSection />
    </>
  );
}
