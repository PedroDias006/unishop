"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";

const partners = [
  {
    id: 1,
    name: "Rael",
    role: "Parceiro Unishop",
    store: "Lojas Pratus Casa, Decorações e Presentes",
    image: "/images/partners/rael.webp",
    alt: "Parceiro Unishop Rael",
    testimonial:
      "Como parceiro da Unishop eu percebi que o principal diferencial é quando o cliente chega, apresenta o problema dele, você capta o tipo de superfície que for lavar, passa a parte técnica, explica o produto próprio. A pessoa sai satisfeita, te indica, volta. Esse plano Start Shop ficou excelente, para quem quer ter uma loja, é um negócio show de bola.",
  },
  {
    id: 2,
    name: "Sr. Adeir e Dona Adriana",
    role: "Parceiros Unishop",
    store: "Loja Ponto Clean",
    image: "/images/partners/adeir-adriana.webp",
    alt: "Parceiros Unishop Sr. Adeir e Dona Adriana",
    testimonial:
      "Mesmo quando meus clientes fazem a compra do mês no supermercado, acabam vindo na minha loja para repor alguma coisa ou procurar produtos que não encontram lá. A Start Shop é um bom negócio e eu recomendo. Acredito que nossos pontos fortes que garantem o ótimo desempenho da nossa loja são o relacionamento com os clientes e a qualidade dos produtos Start.",
  },
];

export function Segments() {
  const [active, setActive] = useState(0);

  const goNext = () => {
    if (active < partners.length - 1) setActive(active + 1);
  };

  const goPrev = () => {
    if (active > 0) setActive(active - 1);
  };

  return (
    <section
      id="segmentos"
      className="scroll-mt-28 overflow-hidden bg-[var(--background)] py-14 sm:py-16 lg:py-20"
    >
      <Container>
        {/* Título */}
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-black uppercase leading-[1.02] tracking-[-0.045em] text-[var(--brand-blue-950)] sm:text-4xl lg:text-5xl">
            Parceiros Unishop
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
            Conheça quem já transformou a parceria com a Unishop em parte da
            própria trajetória.
          </p>
        </div>

        {/* Conteúdo */}
        <div className="mx-auto mt-10 max-w-6xl">
          <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
            {/* Imagem */}
            <div className="relative min-h-[280px] sm:min-h-[340px] lg:min-h-[380px]">
              {partners.map((partner, index) => {
                const isActive = index === active;

                return (
                  <div
                    key={partner.id}
                    className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive
                        ? "translate-x-0 scale-100 opacity-100"
                        : index < active
                          ? "-translate-x-8 scale-[0.985] opacity-0"
                          : "translate-x-8 scale-[0.985] opacity-0"
                    }`}
                  >
                    <Image
                      src={partner.image}
                      alt={partner.alt}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-contain object-center"
                    />
                  </div>
                );
              })}
            </div>

            {/* Texto */}
            <div className="relative min-h-[300px] sm:min-h-[320px] lg:min-h-[340px]">
              {partners.map((partner, index) => {
                const isActive = index === active;

                return (
                  <article
                    key={partner.id}
                    className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive
                        ? "translate-x-0 opacity-100"
                        : index < active
                          ? "translate-x-6 opacity-0 pointer-events-none"
                          : "-translate-x-6 opacity-0 pointer-events-none"
                    }`}
                  >
                    <Quote
                      size={28}
                      strokeWidth={2}
                      className="text-[var(--brand-yellow-dark)]"
                    />

                    <h3 className="mt-4 text-2xl font-black tracking-[-0.03em] text-[var(--brand-blue-800)] sm:text-3xl lg:text-4xl">
                      {partner.name}
                    </h3>

                    <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-slate-900">
                      {partner.role}
                    </p>

                    <p className="mt-1.5 text-lg text-slate-700 sm:text-xl">
                      {partner.store}
                    </p>

                    <p className="mt-5 max-w-2xl text-base leading-[1.6] text-slate-600">
                      "{partner.testimonial}"
                    </p>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Navegação simples */}
          <div className="mt-6 flex items-center justify-center lg:justify-start">
            {active > 0 && (
              <button
                type="button"
                onClick={goPrev}
                aria-label="Voltar para o parceiro anterior"
                className="rounded-full border border-slate-200 bg-white p-3 text-slate-500 shadow-sm transition hover:border-slate-300 hover:text-[var(--brand-blue-900)]"
              >
                <ChevronLeft size={20} />
              </button>
            )}

            {active < partners.length - 1 && (
              <button
                type="button"
                onClick={goNext}
                aria-label="Ir para o próximo parceiro"
                className="rounded-full border border-slate-200 bg-white p-3 text-slate-500 shadow-sm transition hover:border-slate-300 hover:text-[var(--brand-blue-900)]"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>

          {/* CTA */}
          <div className="mt-8 flex justify-center lg:justify-end">
            <Link
              href="/seja-parceiro"
              className="group inline-flex items-center gap-5 rounded-full bg-[var(--brand-blue-900)] py-2.5 pl-6 pr-2.5 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--brand-blue-950)]"
            >
              Quero fazer parte

              <span className="grid size-9 place-items-center rounded-full bg-[var(--brand-yellow)] text-[var(--brand-blue-950)] transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight size={17} />
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
