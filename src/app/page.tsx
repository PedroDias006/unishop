import { BusinessModel } from "@/components/home/BusinessModel";
import { BrazilPresence } from "@/components/home/BrazilPresence";
import { Hero } from "@/components/home/Hero";
import { InvestmentSimulator } from "@/components/home/InvestmentSimulator";
import { Segments } from "@/components/home/Segments";
import { SolutionFinder } from "@/components/home/SolutionFinder";
import { Stats } from "@/components/home/Stats";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <BusinessModel />
      <SolutionFinder />
      <BrazilPresence />
      <InvestmentSimulator />
      <Segments />
    </>
  );
}
