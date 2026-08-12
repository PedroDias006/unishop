"use client";

import { ArrowRight, Ruler, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ranges = [
  {
    max: 75000,
    name: "Unishop Compacta",
    area: "40–60 m²",
    team: "2–3 pessoas",
    description: "Estrutura enxuta para entrada no modelo e operação eficiente.",
  },
  {
    max: 105000,
    name: "Unishop Intermediária",
    area: "70–100 m²",
    team: "3–5 pessoas",
    description: "Mais espaço para exposição, estoque e atendimento consultivo.",
  },
  {
    max: 120000,
    name: "Unishop Completa",
    area: "120 m² ou mais",
    team: "5+ pessoas",
    description: "Operação ampla para consumidores, empresas e profissionais.",
  },
];

export function InvestmentSimulator() {
  const [value, setValue] = useState(86000);
  const model = useMemo(
    () => ranges.find((item) => value <= item.max) ?? ranges[ranges.length - 1],
    [value],
  );

  const formatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

  return (
    <section id="simulador" className="scroll-mt-28 bg-[var(--brand-blue-950)] py-20 text-white sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Simulador demonstrativo"
          title="Transforme valores soltos em uma escolha visual."
          description="O visitante ajusta o investimento e entende imediatamente qual estrutura pode fazer sentido para seu perfil."
          light
          align="center"
        />

        <div className="mx-auto mt-12 max-w-5xl rounded-[34px] border border-white/12 bg-white/8 p-6 backdrop-blur sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-white/60">Investimento inicial estimado</p>
              <strong className="mt-2 block text-4xl font-black tracking-[-0.05em] text-[var(--brand-yellow)] sm:text-5xl">
                {formatted}
              </strong>
              <input
                type="range"
                min="60000"
                max="120000"
                step="1000"
                value={value}
                onChange={(event) => setValue(Number(event.target.value))}
                className="investment-range mt-8 w-full"
                aria-label="Investimento inicial"
              />
              <div className="mt-3 flex justify-between text-xs font-bold text-white/45">
                <span>R$ 60 mil</span>
                <span>R$ 120 mil</span>
              </div>
            </div>

            <div className="rounded-[26px] bg-white p-6 text-[var(--brand-blue-950)] shadow-2xl">
              <span className="text-xs font-black uppercase tracking-[0.16em] text-[var(--brand-blue-700)]">
                Modelo indicado
              </span>
              <h3 className="mt-3 text-3xl font-black tracking-[-0.04em]">{model.name}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{model.description}</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-slate-100 p-4">
                  <Ruler size={19} />
                  <strong className="mt-3 block text-sm">{model.area}</strong>
                  <span className="text-xs text-slate-500">Área sugerida</span>
                </div>
                <div className="rounded-2xl bg-slate-100 p-4">
                  <Users size={19} />
                  <strong className="mt-3 block text-sm">{model.team}</strong>
                  <span className="text-xs text-slate-500">Equipe inicial</span>
                </div>
              </div>
              <a href="/seja-parceiro" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[var(--brand-blue-800)]">
                Solicitar apresentação <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-5 text-white/42">
          Valores meramente demonstrativos neste starter. As condições reais precisam ser validadas pela empresa.
        </p>
      </Container>
    </section>
  );
}
