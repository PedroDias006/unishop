"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Hammer,
  MessagesSquare,
  PencilRuler,
  Search,
  Store,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { AuthoritySection } from "@/components/business/AuthoritySection";
import { PartnerTestimonials } from "@/components/business/PartnerTestimonials";

const models = [
  {
    slug: "compacta",
    shortName: "Compacta",
    name: "Unishop Compacta",
    label: "Para começar com eficiência",
    investment: "R$ 60 mil",
    area: "40–60 m²",
    team: "2–3 pessoas",
    image: "/images/home/modelo-loja-compacta-v1.webp",
    description:
      "Uma estrutura mais enxuta para quem deseja entrar na rede com uma operação eficiente, organizada e preparada para crescer.",
    benefits: [
      "Estrutura otimizada",
      "Operação mais enxuta",
      "Suporte da Rede Unishop",
    ],
  },
  {
    slug: "intermediaria",
    shortName: "Intermediária",
    name: "Unishop Intermediária",
    label: "O equilíbrio entre espaço e operação",
    investment: "R$ 86 mil",
    area: "70–100 m²",
    team: "3–5 pessoas",
    image: "/images/home/modelo-loja-intermediaria-v1.webp",
    description:
      "Mais espaço para exposição, estoque e atendimento consultivo, mantendo uma estrutura equilibrada para a operação.",
    benefits: [
      "Mix de produtos ampliado",
      "Mais espaço de exposição",
      "Atendimento mais consultivo",
    ],
  },
  {
    slug: "completa",
    shortName: "Completa",
    name: "Unishop Completa",
    label: "Para explorar todo o potencial",
    investment: "R$ 120 mil",
    area: "120 m² ou mais",
    team: "5+ pessoas",
    image: "/images/home/modelo-loja-completa-v1.webp",
    description:
      "Uma unidade ampla para atender consumidores, empresas e profissionais com maior variedade e capacidade operacional.",
    benefits: [
      "Portfólio mais amplo",
      "Maior capacidade de atendimento",
      "Estrutura para diferentes públicos",
    ],
  },
];

const journey = [
  {
    number: "01",
    icon: MessagesSquare,
    title: "Primeiro contato",
    text: "Conte para a nossa equipe onde você está e o que busca.",
  },
  {
    number: "02",
    icon: Search,
    title: "Análise",
    text: "Entendemos região, estrutura desejada e possibilidades.",
  },
  {
    number: "03",
    icon: PencilRuler,
    title: "Projeto",
    text: "Definimos junto com você o formato mais adequado.",
  },
  {
    number: "04",
    icon: Hammer,
    title: "Implantação",
    text: "A unidade começa a ganhar forma com orientação da rede.",
  },
  {
    number: "05",
    icon: Store,
    title: "Operação",
    text: "Você inicia uma nova etapa contando com suporte Unishop.",
  },
];

type NetworkTotals = { stores: number; cities: number; states: number };

export function BusinessOpportunityPage() {
  const [activeModel, setActiveModel] = useState(1);
  const [networkStats, setNetworkStats] = useState<NetworkTotals | null>(null);

  const current = models[activeModel];

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/unishop-locations", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: { totals?: NetworkTotals } | null) =>
        setNetworkStats(payload?.totals ?? null),
      )
      .catch(() => {});

    return () => controller.abort();
  }, []);

  return (
    <>
      {/* HERO */}
      {/* O hero cresce para encostar a faixa na base da tela (249px é a altura
          da faixa). O teto de 860px evita um vazio enorme em telas muito altas. */}
      <section className="relative isolate overflow-hidden bg-white lg:flex lg:min-h-[min(calc(100vh-249px),860px)] lg:flex-col lg:justify-end">
        {/* FACHADA AO FUNDO */}
        <Image
          src="/images/hero/fachada-unishop-hero.webp"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center"
        />

        {/* VÉU — a foto fica à mostra na esquerda e só clareia sob o texto */}
        <div className="absolute inset-0 -z-10 bg-white/[0.86] lg:bg-transparent lg:bg-[linear-gradient(100deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.14)_30%,rgba(255,255,255,0.88)_42%,#ffffff_46.5%)]" />

        <Container>
          <div className="grid items-end gap-4 pb-10 pt-24 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10 lg:pb-0 lg:pt-14">
            {/* PERSONAGEM */}
            <div className="relative order-2 mx-auto w-full max-w-[380px] lg:order-1 lg:mx-0 lg:max-w-none lg:pt-14">
              <div className="relative aspect-[4/5] lg:aspect-auto lg:h-[570px]">
                <Image
                  src="/images/hero/personagem-diretoria.webp"
                  alt="Colaborador da Rede Unishop"
                  fill
                  priority
                  sizes="(max-width: 1024px) 80vw, 42vw"
                  className="object-contain object-bottom"
                />
              </div>
            </div>

            {/* CONTEÚDO PRINCIPAL */}
            <div className="order-1 max-w-[640px] py-6 lg:order-2 lg:pb-6 lg:pt-14">
              <div className="flex items-center gap-4">
                <span
                  className="h-px w-10 bg-[var(--brand-yellow)]"
                  aria-hidden="true"
                />

                <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[var(--brand-blue-700)]">
                  Mensagem da diretoria
                </p>
              </div>

              <h1 className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.05em] text-[var(--brand-blue-950)] sm:text-5xl lg:text-[54px]">
                Um convite para
                <br />
                crescer com a gente.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                Acreditamos que grandes negócios nascem de parcerias fortes. Se
                você busca uma oportunidade sólida, com suporte real e uma marca
                em expansão, a Rede Unishop quer caminhar ao seu lado.
              </p>

              <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3">
                {[
                  "Modelos para diferentes investimentos",
                  "Acompanhamento na implantação",
                  "Suporte da Rede Unishop",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 text-sm font-semibold text-[var(--brand-blue-950)]"
                  >
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[var(--brand-yellow)] text-[var(--brand-blue-950)]">
                      <Check size={11} strokeWidth={3} />
                    </span>

                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link
                  href="/seja-parceiro"
                  className="group inline-flex items-center gap-6 rounded-full bg-[var(--brand-yellow)] py-2.5 pl-7 pr-2.5 text-sm font-black text-[var(--brand-blue-950)] shadow-[0_16px_40px_rgba(0,0,0,0.12)] transition duration-300 hover:-translate-y-0.5"
                >
                  Quero ser um parceiro

                  <span className="grid size-10 place-items-center rounded-full bg-[var(--brand-blue-950)] text-white transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowRight size={18} />
                  </span>
                </Link>

                <a
                  href="#modelos"
                  className="inline-flex items-center rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-[var(--brand-blue-950)] transition duration-300 hover:border-[var(--brand-blue-950)]"
                >
                  Conhecer os modelos
                </a>
              </div>

              <div className="mt-7 flex flex-wrap gap-x-10 gap-y-4 border-t border-slate-200 pt-5">
                <div>
                  <strong className="block text-3xl font-black tracking-[-0.04em] text-[var(--brand-blue-950)]">
                    {networkStats?.stores ?? "—"}
                  </strong>

                  <span className="mt-1 block text-xs font-semibold text-slate-500">
                    unidades na rede
                  </span>
                </div>

                <div>
                  <strong className="block text-3xl font-black tracking-[-0.04em] text-[var(--brand-blue-950)]">
                    {networkStats?.cities ?? "—"}
                  </strong>

                  <span className="mt-1 block text-xs font-semibold text-slate-500">
                    cidades
                  </span>
                </div>

                <div>
                  <strong className="block text-3xl font-black tracking-[-0.04em] text-[var(--brand-blue-950)]">
                    {networkStats?.states ?? "—"}
                  </strong>

                  <span className="mt-1 block text-xs font-semibold text-slate-500">
                    estados
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* JORNADA */}
      <section className="bg-[var(--brand-blue-950)] py-8 sm:py-9">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--brand-yellow)]">
              Da ideia à operação
            </p>

            <h2 className="mt-2 text-xl font-black tracking-[-0.04em] text-white sm:text-2xl">
              Um caminho claro para começar.
            </h2>
          </div>

          <ol className="mt-6 grid gap-6 md:grid-cols-5 md:gap-4">
            {journey.map((step, index) => {
              const Icon = step.icon;

              return (
                <li key={step.number} className="relative text-center">
                  <span
                    className="journey-step relative z-10 mx-auto grid size-12 place-items-center rounded-full bg-white/10 text-white/70"
                    style={{ animationDelay: `${index * 2.4}s` }}
                  >
                    <Icon size={19} strokeWidth={2.2} aria-hidden="true" />
                  </span>

                  <span className="mt-3 block text-[9px] font-black tracking-[0.2em] text-white/40">
                    {step.number}
                  </span>

                  <h3 className="mt-1 text-sm font-black text-white">
                    {step.title}
                  </h3>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      <AuthoritySection />

      {/* ESCOLHA DO MODELO */}
      <section id="modelos" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--brand-blue-800)]">
              Escolha seu modelo
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[var(--brand-blue-950)] sm:text-4xl">
              Uma Unishop para cada momento.
            </h2>
          </div>

          {/* TABS */}
          <div className="mx-auto mt-8 flex max-w-lg overflow-x-auto border-b border-slate-200">
            {models.map((model, index) => (
              <button
                key={model.slug}
                type="button"
                onClick={() => setActiveModel(index)}
                className={`relative min-w-[130px] flex-1 px-4 pb-3.5 text-sm font-black transition ${
                  activeModel === index
                    ? "text-[var(--brand-blue-950)]"
                    : "text-slate-400 hover:text-[var(--brand-blue-700)]"
                }`}
              >
                {model.shortName}

                <span
                  className={`absolute inset-x-0 bottom-0 h-[3px] bg-[var(--brand-yellow)] transition-transform duration-500 ${
                    activeModel === index ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:gap-14">
            {/* INFORMAÇÕES */}
            <div>
              <h3 className="text-2xl font-black tracking-[-0.04em] text-[var(--brand-blue-950)] sm:text-3xl">
                {current.name}
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
                {current.description}
              </p>

              <div className="mt-6 flex flex-wrap items-end gap-x-10 gap-y-5 border-y border-slate-200 py-5">
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                    A partir de
                  </span>

                  <strong className="mt-0.5 block text-4xl font-black tracking-[-0.05em] text-[var(--brand-blue-900)]">
                    {current.investment}
                  </strong>
                </div>

                <div className="flex gap-x-10">
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                      Área
                    </span>

                    <strong className="mt-1 block text-sm font-black text-[var(--brand-blue-950)]">
                      {current.area}
                    </strong>
                  </div>

                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                      Equipe
                    </span>

                    <strong className="mt-1 block text-sm font-black text-[var(--brand-blue-950)]">
                      {current.team}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-2.5">
                {current.benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 text-sm font-semibold text-slate-600"
                  >
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[var(--brand-yellow)] text-[var(--brand-blue-950)]">
                      <Check size={11} strokeWidth={3} />
                    </span>

                    {benefit}
                  </div>
                ))}
              </div>

              <Link
                href={`/seja-parceiro?modelo=${current.slug}`}
                className="group mt-7 inline-flex items-center gap-5 rounded-full bg-[var(--brand-blue-900)] py-2.5 pl-6 pr-2.5 text-sm font-bold text-white transition hover:bg-[var(--brand-blue-950)]"
              >
                Tenho interesse neste modelo

                <span className="grid size-9 place-items-center rounded-full bg-[var(--brand-yellow)] text-[var(--brand-blue-950)]">
                  <ArrowRight size={17} />
                </span>
              </Link>
            </div>

            {/* IMAGEM DO MODELO ATIVO */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-[#edf2f7]">
              {models.map((model, index) => (
                <div
                  key={model.slug}
                  className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    activeModel === index
                      ? "scale-100 opacity-100"
                      : "pointer-events-none scale-[1.035] opacity-0"
                  }`}
                >
                  <Image
                    src={model.image}
                    alt={model.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-5 text-slate-400">
            Valores de referência, sujeitos à região, ao ponto comercial e à
            configuração final do projeto.
          </p>
        </Container>
      </section>

      <PartnerTestimonials />
    </>
  );
}