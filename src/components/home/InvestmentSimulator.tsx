"use client";

import { ArrowRight, Check, Ruler, Users } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/ui/Container";

const models = [
  {
    name: "Unishop Compacta",
    investment: "R$ 60 mil",
    eyebrow: "Estrutura inicial",
    area: "40–60 m²",
    team: "2–3 pessoas",
    description:
      "Uma operação enxuta, pensada para começar com eficiência sem abrir mão da identidade e do suporte da rede.",
    features: ["Mix essencial de produtos", "Implantação otimizada", "Operação simples e funcional"],
    image: "/images/hero/loja-unishop-conceito.png",
    imagePosition: "center",
  },
  {
    name: "Unishop Intermediária",
    investment: "R$ 86 mil",
    eyebrow: "Equilíbrio ideal",
    area: "70–100 m²",
    team: "3–5 pessoas",
    description:
      "Mais espaço para exposição, estoque e atendimento consultivo — um formato equilibrado para ampliar as possibilidades de venda.",
    features: ["Exposição ampliada", "Estoque mais estruturado", "Atendimento consultivo"],
    image: "/images/hero/banner-loja-informacoes-v2.png",
    imagePosition: "72% center",
  },
  {
    name: "Unishop Completa",
    investment: "R$ 120 mil",
    eyebrow: "Maior potencial",
    area: "120 m² ou mais",
    team: "5+ pessoas",
    description:
      "Uma estrutura ampla para atender consumidores, empresas e profissionais com maior capacidade de exposição e operação.",
    features: ["Portfólio mais amplo", "Atendimento B2B e B2C", "Maior capacidade operacional"],
    image: "/images/hero/loja-unishop-premium.png",
    imagePosition: "center",
  },
] as const;

export function InvestmentSimulator() {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const model = models[selectedIndex];

  return (
    <section
      id="simulador"
      className="scroll-mt-28 overflow-hidden bg-[var(--brand-blue-950)] py-20 text-white sm:py-28"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-9 bg-[var(--brand-yellow)]" aria-hidden="true" />
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[var(--brand-yellow)]">
              Encontre o seu modelo
            </p>
            <span className="h-px w-9 bg-[var(--brand-yellow)]" aria-hidden="true" />
          </div>
          <h2 className="mt-5 text-balance text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl">
            Quanto você deseja investir?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
            Compare os formatos e entenda, de forma simples, qual estrutura acompanha melhor o seu momento de negócio.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-6xl overflow-hidden border border-white/15 bg-white shadow-[0_30px_80px_-38px_rgba(0,0,0,0.65)]">
          <div className="grid border-b border-slate-200 sm:grid-cols-3" role="group" aria-label="Escolha uma faixa de investimento">
            {models.map((item, index) => {
              const isSelected = selectedIndex === index;

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  aria-pressed={isSelected}
                  className={`relative flex min-h-24 items-center justify-between gap-4 border-b border-slate-200 px-5 py-4 text-left transition sm:border-b-0 sm:border-r sm:px-7 last:border-b-0 last:sm:border-r-0 ${
                    isSelected
                      ? "bg-[var(--brand-yellow)] text-[var(--brand-blue-950)]"
                      : "bg-white text-slate-500 hover:bg-slate-50 hover:text-[var(--brand-blue-950)]"
                  }`}
                >
                  <span>
                    <span className="block text-[10px] font-extrabold uppercase tracking-[0.17em] opacity-65">
                      A partir de
                    </span>
                    <strong className="mt-1 block text-2xl font-extrabold tracking-[-0.04em]">
                      {item.investment}
                    </strong>
                  </span>
                  <span className="hidden text-xs font-bold sm:block">{item.name.replace("Unishop ", "")}</span>
                  {isSelected && (
                    <span className="absolute inset-x-0 bottom-0 h-1 bg-[var(--brand-blue-900)]" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="grid min-h-[560px] lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative min-h-[320px] overflow-hidden bg-slate-200 lg:min-h-full">
              <Image
                key={model.image}
                src={model.image}
                alt={`Referência visual do modelo ${model.name}`}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
                style={{ objectPosition: model.imagePosition }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-blue-950)]/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--brand-yellow)]">
                  Visual de referência
                </span>
                <p className="mt-2 max-w-md text-sm leading-6 text-white/80">
                  A configuração final é definida conforme o ponto comercial e o potencial da região.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center bg-white p-7 text-[var(--brand-blue-950)] sm:p-10 lg:p-12">
              <div className="flex items-center justify-between border-b border-slate-200 pb-5">
                <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--brand-blue-700)]">
                  {model.eyebrow}
                </span>
                <span className="text-xs font-bold text-slate-400">0{selectedIndex + 1} / 03</span>
              </div>

              <h3 className="mt-7 text-4xl font-extrabold tracking-[-0.045em] sm:text-[2.75rem]">
                {model.name}
              </h3>
              <p className="mt-4 text-base leading-7 text-slate-600">{model.description}</p>

              <div className="mt-7 grid grid-cols-2 border-y border-slate-200 py-5">
                <div className="flex items-start gap-3 border-r border-slate-200 pr-4">
                  <Ruler className="mt-0.5 shrink-0 text-[var(--brand-blue-700)]" size={20} />
                  <div>
                    <strong className="block text-sm">{model.area}</strong>
                    <span className="mt-1 block text-xs text-slate-500">Área sugerida</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 pl-4">
                  <Users className="mt-0.5 shrink-0 text-[var(--brand-blue-700)]" size={20} />
                  <div>
                    <strong className="block text-sm">{model.team}</strong>
                    <span className="mt-1 block text-xs text-slate-500">Equipe inicial</span>
                  </div>
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                {model.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                    <span className="grid size-5 shrink-0 place-items-center bg-[var(--brand-yellow)] text-[var(--brand-blue-950)]">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="/seja-parceiro"
                className="mt-8 inline-flex w-fit items-center gap-3 bg-[var(--brand-blue-900)] px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-[var(--brand-blue-800)]"
              >
                Conhecer este modelo <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-5 text-white/45">
          Os valores são referências iniciais e podem variar conforme a região, o ponto comercial e a configuração do projeto.
        </p>
      </Container>
    </section>
  );
}
