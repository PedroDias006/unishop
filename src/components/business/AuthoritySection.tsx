import Image from "next/image";
import { Factory, ShieldOff, SlidersHorizontal } from "lucide-react";

import { Container } from "@/components/ui/Container";

const differentiators = [
  { icon: ShieldOff, title: "Sem royalties" },
  { icon: SlidersHorizontal, title: "Autonomia na gestão" },
  { icon: Factory, title: "Indústria por trás" },
];

const press: {
  outlet: string;
  date?: string;
  headline: string;
  image: string;
  url?: string;
}[] = [
  {
    outlet: "O Tempo",
    date: "Set. 2024",
    headline: "Rede Unishop sai de cinco para 400 lojas em quatro anos",
    image: "/images/imprensa/o-tempo-400-lojas.webp",
  },
  {
    outlet: "Diário do Comércio",
    date: "Fev. 2025",
    headline: "Mineira Unishop quer chegar a 700 lojas em 2025",
    image: "/images/imprensa/diario-do-comercio-700-lojas.webp",
  },
  {
    outlet: "Exame",
    headline:
      "Com modelo sem taxas, rede de limpeza de Uberlândia cresceu 80 vezes e quer 1.000 lojas",
    image: "/images/imprensa/exame-modelo-sem-taxas.webp",
  },
];

export function AuthoritySection() {
  return (
    <section className="bg-[#f5f8fc] py-14 sm:py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
          {/* DISCURSO */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--brand-blue-800)]">
              Rede autorizada Start Química
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[var(--brand-blue-950)] sm:text-4xl">
              Esqueça a franquia tradicional.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
              Na Unishop você tem autonomia para gerir o próprio negócio, sem
              taxas e sem regras engessadas. Por trás da rede está a Start
              Química, referência em limpeza e higienização com 38 anos de
              mercado e duas linhas de produtos — consumo e profissional — que
              atendem do dia a dia doméstico a hospitais, lavanderias,
              restaurantes, hotéis e indústrias.
            </p>

            <ul className="mt-6 flex flex-wrap gap-2.5">
              {differentiators.map((item) => {
                const Icon = item.icon;

                return (
                  <li
                    key={item.title}
                    className="flex items-center gap-2.5 rounded-full bg-white px-4 py-2.5 text-xs font-black text-[var(--brand-blue-950)] shadow-[0_4px_14px_rgba(6,31,73,0.06)]"
                  >
                    <Icon
                      size={15}
                      className="text-[var(--brand-blue-800)]"
                      aria-hidden="true"
                    />

                    {item.title}
                  </li>
                );
              })}
            </ul>

            {/* FÁBRICA */}
            <figure className="m-0 mt-8">
              <div className="relative aspect-[16/7] overflow-hidden rounded-[20px] bg-[#edf2f7]">
                <Image
                  src="/images/hero/banner-industria-base-v2.webp"
                  alt="Vista aérea da fábrica da Start Química"
                  fill
                  sizes="(max-width: 1024px) 100vw, 54vw"
                  className="object-cover object-[70%_center]"
                />
              </div>

              <figcaption className="mt-2.5 text-xs leading-5 text-slate-500">
                Fábrica da Start Química: mais de 300.000 m² de área de
                produção.
              </figcaption>
            </figure>

            {/* SELO EXAME */}
            <div className="mt-8">
              <Image
                src="/images/imprensa/selo-exame-negocios-em-expansao.webp"
                alt="Selo do ranking EXAME Negócios em Expansão 2024"
                width={1400}
                height={148}
                sizes="(max-width: 1024px) 100vw, 34vw"
                className="h-auto w-full max-w-[420px]"
              />

              <p className="mt-3 max-w-md text-xs leading-5 text-slate-500">
                Selecionada entre milhares de empresas inscritas de todo o
                Brasil, em parceria com o BTG Pactual.
              </p>
            </div>
          </div>

          {/* IMPRENSA */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--brand-blue-800)]">
              Na imprensa
            </p>

            <div className="mt-4 space-y-5">
              {press.map((item) => {
                const shot = (
                  <div className="relative aspect-[5/2] overflow-hidden rounded-[16px] bg-white shadow-[0_8px_24px_rgba(6,31,73,0.08)]">
                    <Image
                      src={item.image}
                      alt={`${item.outlet}: ${item.headline}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-top"
                    />
                  </div>
                );

                return item.url ? (
                  <a
                    key={item.headline}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition duration-300 hover:-translate-y-0.5"
                  >
                    {shot}
                  </a>
                ) : (
                  <div key={item.headline}>{shot}</div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
