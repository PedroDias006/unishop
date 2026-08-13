import { ArrowRight, Ruler, Users } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

const models = [
  {
    name: "Unishop Compacta",
    investment: "R$ 60 mil",
    label: "Estrutura inicial",
    area: "40–60 m²",
    team: "2–3 pessoas",
    description: "Uma operação enxuta para começar com eficiência e todo o suporte da rede.",
    image: "/images/home/modelo-loja-compacta-v1.png",
    imagePosition: "center",
  },
  {
    name: "Unishop Intermediária",
    investment: "R$ 86 mil",
    label: "Equilíbrio ideal",
    area: "70–100 m²",
    team: "3–5 pessoas",
    description: "Mais espaço para produtos, estoque e um atendimento ainda mais consultivo.",
    image: "/images/home/modelo-loja-intermediaria-v1.png",
    imagePosition: "center",
  },
  {
    name: "Unishop Completa",
    investment: "R$ 120 mil",
    label: "Maior potencial",
    area: "120 m² ou mais",
    team: "5+ pessoas",
    description: "Estrutura ampla para atender consumidores, empresas e profissionais.",
    image: "/images/home/modelo-loja-completa-v1.png",
    imagePosition: "center",
  },
] as const;

export function InvestmentSimulator() {
  return (
    <section
      id="simulador"
      className="scroll-mt-28 bg-[linear-gradient(115deg,#ffffff_0%,#f5f9fd_48%,#edf4fb_100%)] py-20 sm:py-28"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-9 bg-[var(--brand-yellow)]" aria-hidden="true" />
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[var(--brand-blue-800)]">
              Escolha o seu modelo
            </p>
            <span className="h-px w-9 bg-[var(--brand-yellow)]" aria-hidden="true" />
          </div>
          <h2 className="mt-5 text-balance text-4xl font-extrabold tracking-[-0.04em] text-[var(--brand-blue-950)] sm:text-5xl">
            Uma Unishop para cada momento.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Compare investimento, espaço e equipe para encontrar a estrutura que combina com o seu plano.
          </p>
        </div>

        <div className="-mx-5 mt-11 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0">
          {models.map((model) => (
            <article
              key={model.name}
              className="group min-w-[84vw] snap-center overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_20px_45px_-28px_rgba(4,47,105,0.35)] sm:min-w-[360px] lg:min-w-0"
            >
              <div className="relative aspect-[3/2] overflow-hidden bg-slate-100">
                <Image
                  src={model.image}
                  alt={`Referência visual do modelo ${model.name}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, 84vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.025]"
                  style={{ objectPosition: model.imagePosition }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-blue-950)]/65 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/75">
                    A partir de
                  </span>
                  <strong className="mt-0.5 block text-2xl font-extrabold tracking-[-0.04em]">
                    {model.investment}
                  </strong>
                </div>
              </div>

              <div className="p-6">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--brand-blue-700)]">
                  {model.label}
                </p>
                <h3 className="mt-2 text-2xl font-extrabold tracking-[-0.035em] text-[var(--brand-blue-950)]">
                  {model.name}
                </h3>
                <p className="mt-3 min-h-12 text-sm leading-6 text-slate-600">{model.description}</p>

                <div className="mt-5 grid grid-cols-2 border-y border-slate-200 py-4 text-xs text-slate-600">
                  <span className="flex items-center gap-2 border-r border-slate-200 pr-3">
                    <Ruler size={16} className="shrink-0 text-[var(--brand-blue-700)]" />
                    {model.area}
                  </span>
                  <span className="flex items-center gap-2 pl-3">
                    <Users size={16} className="shrink-0 text-[var(--brand-blue-700)]" />
                    {model.team}
                  </span>
                </div>

                <a
                  href="/seja-parceiro"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[var(--brand-blue-800)] transition hover:gap-3"
                >
                  Conhecer o modelo <ArrowRight size={17} />
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-4 max-w-3xl text-center text-xs leading-5 text-slate-400">
          Valores de referência, sujeitos à região, ao ponto comercial e à configuração do projeto.
        </p>
      </Container>
    </section>
  );
}
