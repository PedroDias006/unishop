import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const testimonials = [
  {
    text: "O depoimento real de um parceiro pode explicar de forma simples como foi a implantação e como funciona o suporte no dia a dia.",
    name: "Nome do parceiro",
    city: "Cidade · Estado",
  },
  {
    text: "Vídeos curtos ou relatos objetivos geram muito mais confiança do que blocos enormes de texto sem destaque visual.",
    name: "Nome do parceiro",
    city: "Cidade · Estado",
  },
];

export function Testimonials() {
  return (
    <section id="historias" className="scroll-mt-28 bg-[#f7f2df] py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Histórias da rede"
          title="A experiência de quem já faz parte."
          description="Espaço preparado para depoimentos reais, vídeos e dados de cada unidade."
          align="center"
        />
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
          {testimonials.map((item) => (
            <article key={item.text} className="rounded-[30px] bg-white p-7 shadow-xl shadow-amber-950/5 sm:p-9">
              <Quote className="text-[var(--brand-yellow-dark)]" size={34} fill="currentColor" />
              <p className="mt-6 text-lg font-semibold leading-8 text-slate-800">“{item.text}”</p>
              <div className="mt-8 border-t border-slate-200 pt-5">
                <strong className="block text-sm font-black text-slate-950">{item.name}</strong>
                <span className="mt-1 block text-xs font-semibold text-slate-500">{item.city}</span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
