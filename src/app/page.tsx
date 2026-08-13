import { BusinessModel } from "@/components/home/BusinessModel";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { InvestmentSimulator } from "@/components/home/InvestmentSimulator";
import { Segments } from "@/components/home/Segments";
import { SolutionFinder } from "@/components/home/SolutionFinder";
import { Stats } from "@/components/home/Stats";
import { Testimonials } from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <SolutionFinder />
      <BusinessModel />
      <InvestmentSimulator />
      <Segments />
      <Testimonials />
      <FinalCta />
    </>
  );
}
