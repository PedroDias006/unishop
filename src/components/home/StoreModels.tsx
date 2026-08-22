"use client";

import { ArrowLeft, ArrowRight, Quote, Ruler, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";

/**
 * Formatos de loja e depoimentos de parceiros eram duas seções seguidas, com
 * o mesmo degradê de fundo e dois títulos centralizados — na rolagem viravam
 * uma mancha clara só, comprida e sem hierarquia.
 *
 * As duas são a mesma pergunta partida ao meio ("quanto custa e deu certo com
 * quem?"), então aqui viraram um bloco só: o parceiro de um lado, os três
 * formatos do outro, dentro do mesmo painel e divididos por um fio. Quem lê o
 * depoimento tem o preço no campo de visão, e vice-versa — que é o efeito que
 * empilhar um em cima do outro não dava.
 *
 * O painel é escuro no meio de uma seção clara: é o contraste que faltava, e
 * os recortes dos parceiros (PNG com transparência) ganham onde se apoiar.
 */

const models = [
  {
    name: "Unishop Compacta",
    investment: "R$ 60 mil",
    label: "Estrutura inicial",
    area: "40–60 m²",
    team: "2–3 pessoas",
    image: "/images/home/modelo-loja-compacta-v1.webp",
  },
  {
    name: "Unishop Intermediária",
    investment: "R$ 86 mil",
    label: "Equilíbrio ideal",
    area: "70–100 m²",
    team: "3–5 pessoas",
    image: "/images/home/modelo-loja-intermediaria-v1.webp",
  },
  {
    name: "Unishop Completa",
    investment: "R$ 120 mil",
    label: "Maior potencial",
    area: "120 m² ou mais",
    team: "5+ pessoas",
    image: "/images/home/modelo-loja-completa-v1.webp",
  },
] as const;

const partners = [
  {
    id: "rael",
    name: "Rael",
    role: "Parceiro Unishop",
    store: "Lojas Pratus Casa, Decorações e Presentes",
    image: "/images/partners/rael.webp",
    alt: "Rael, parceiro Unishop",
    testimonial:
      "Como parceiro da Unishop eu percebi que o principal diferencial é quando o cliente chega, apresenta o problema dele, você capta o tipo de superfície que for lavar, passa a parte técnica, explica o produto próprio. A pessoa sai satisfeita, te indica, volta. Esse plano Start Shop ficou excelente, para quem quer ter uma loja, é um negócio show de bola.",
  },
  {
    id: "adeir-adriana",
    name: "Sr. Adeir e Dona Adriana",
    role: "Parceiros Unishop",
    store: "Loja Ponto Clean",
    image: "/images/partners/adeir-adriana.webp",
    alt: "Sr. Adeir e Dona Adriana, parceiros Unishop",
    testimonial:
      "Mesmo quando meus clientes fazem a compra do mês no supermercado, acabam vindo na minha loja para repor alguma coisa ou procurar produtos que não encontram lá. A Start Shop é um bom negócio e eu recomendo. Acredito que nossos pontos fortes que garantem o ótimo desempenho da nossa loja são o relacionamento com os clientes e a qualidade dos produtos Start.",
  },
] as const;

export function StoreModels() {
  const [active, setActive] = useState(0);
  const partner = partners[active];

  return (
    <section
      id="modelos"
      className="scroll-mt-28 bg-[linear-gradient(115deg,#ffffff_0%,#f5f9fd_48%,#edf4fb_100%)] py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-16">
          <div>
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="h-px w-10 bg-[var(--brand-yellow)]"
              />
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--brand-blue-800)]">
                Escolha o seu modelo
              </p>
            </div>

            <h2 className="mt-6 text-balance text-3xl font-black leading-[1.03] tracking-[-0.045em] text-[var(--brand-blue-950)] sm:text-4xl lg:text-[46px]">
              Uma Unishop para cada momento.
            </h2>
          </div>

          <p className="max-w-xl text-base leading-8 text-slate-600 lg:pb-2">
            Três formatos, três tamanhos de investimento — e, do lado, quem já
            escolheu um deles e conta como foi.
          </p>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-[32px] bg-[var(--brand-blue-950)] text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-28 size-80 rounded-full bg-[var(--brand-yellow)]/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-16 size-80 rounded-full bg-[var(--brand-blue-700)]/25 blur-3xl"
          />

          <div className="relative grid lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
            {/* ── Parceiro ─────────────────────────────────────────────── */}
            <div className="flex flex-col border-b border-white/10 lg:border-b-0 lg:border-r">
              <div className="p-7 sm:p-9 lg:p-10 lg:pb-7">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="h-px w-10 bg-[var(--brand-yellow)]"
                  />
                  <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--brand-yellow)]">
                    Quem já escolheu
                  </p>
                </div>

                {/* Os dois depoimentos ocupam a mesma célula da grade: a
                    altura sai do mais longo e ninguém precisa chutar um
                    min-height — que era de onde vinha o vazio de antes. */}
                <div className="mt-6 grid">
                  {partners.map((item, index) => (
                    <blockquote
                      key={item.id}
                      aria-hidden={index !== active}
                      className={`col-start-1 row-start-1 transition-opacity duration-500 ${
                        index === active
                          ? "opacity-100"
                          : "pointer-events-none opacity-0"
                      }`}
                    >
                      <Quote
                        size={24}
                        strokeWidth={2}
                        aria-hidden="true"
                        className="text-[var(--brand-yellow)]"
                      />

                      <p className="mt-3.5 text-[15px] leading-[1.7] text-white/80">
                        {item.testimonial}
                      </p>

                      <footer className="mt-5">
                        <p className="text-lg font-black tracking-[-0.03em] text-white sm:text-xl">
                          {item.name}
                        </p>
                        <p className="mt-1 text-[13px] leading-5 text-white/55">
                          {item.role} — {item.store}
                        </p>
                      </footer>
                    </blockquote>
                  ))}
                </div>

                {/* As duas setas ficam sempre visíveis, desabilitadas nas
                    pontas. Antes só renderizava a que dava para usar, e a
                    sozinha caía solta num canto do vazio. */}
                <div className="mt-6 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActive((i) => Math.max(0, i - 1))}
                    disabled={active === 0}
                    aria-label="Ver o parceiro anterior"
                    className="grid size-11 place-items-center rounded-full border border-white/20 text-white transition duration-300 hover:border-[var(--brand-yellow)] hover:bg-[var(--brand-yellow)] hover:text-[var(--brand-blue-950)] disabled:cursor-not-allowed disabled:border-white/10 disabled:text-white/25 disabled:hover:bg-transparent"
                  >
                    <ArrowLeft size={17} strokeWidth={2.2} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActive((i) => Math.min(partners.length - 1, i + 1))
                    }
                    disabled={active === partners.length - 1}
                    aria-label="Ver o próximo parceiro"
                    className="grid size-11 place-items-center rounded-full border border-white/20 text-white transition duration-300 hover:border-[var(--brand-yellow)] hover:bg-[var(--brand-yellow)] hover:text-[var(--brand-blue-950)] disabled:cursor-not-allowed disabled:border-white/10 disabled:text-white/25 disabled:hover:bg-transparent"
                  >
                    <ArrowRight size={17} strokeWidth={2.2} />
                  </button>

                  <span
                    aria-hidden="true"
                    className="ml-1 text-xs font-black tabular-nums tracking-[0.14em] text-white/40"
                  >
                    {String(active + 1).padStart(2, "0")} /{" "}
                    {String(partners.length).padStart(2, "0")}
                  </span>
                </div>

                <p className="sr-only" aria-live="polite">
                  Depoimento {active + 1} de {partners.length}: {partner.name}.
                </p>
              </div>

              {/* O recorte encosta no canto do painel: `mt-auto` empurra para
                  baixo e `items-end` assenta a figura no chão. */}
              <div className="relative mt-auto grid items-end">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-10 bottom-0 h-20 bg-[radial-gradient(ellipse_at_bottom,rgba(255,201,40,0.22),transparent_72%)]"
                />

                {partners.map((item, index) => (
                  <div
                    key={item.id}
                    aria-hidden={index !== active}
                    className={`relative col-start-1 row-start-1 h-[250px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:h-[280px] ${
                      index === active
                        ? "scale-100 opacity-100"
                        : "pointer-events-none scale-[0.97] opacity-0"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={index === active ? item.alt : ""}
                      fill
                      sizes="(min-width: 1024px) 40vw, 90vw"
                      className="object-contain object-bottom"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* ── Formatos de loja ─────────────────────────────────────── */}
            <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-10">
              <ul className="grid gap-3">
                {models.map((model) => (
                  <li key={model.name}>
                    <Link
                      href="/seja-parceiro"
                      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-2.5 pr-4 transition duration-300 hover:border-[var(--brand-yellow)]/45 hover:bg-white/[0.09] sm:gap-5"
                    >
                      <div className="relative h-[74px] w-[104px] shrink-0 overflow-hidden rounded-xl bg-white/10 sm:h-[86px] sm:w-[128px]">
                        <Image
                          src={model.image}
                          alt=""
                          aria-hidden="true"
                          fill
                          sizes="128px"
                          className="object-cover object-center transition duration-500 group-hover:scale-[1.06]"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/40">
                          {model.label}
                        </p>

                        <p className="mt-1 text-base font-black tracking-[-0.025em] text-white sm:text-[17px]">
                          {model.name}
                        </p>

                        <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white/50">
                          <span className="inline-flex items-center gap-1.5">
                            <Ruler size={13} className="shrink-0" />
                            {model.area}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Users size={13} className="shrink-0" />
                            {model.team}
                          </span>
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-[9px] font-black uppercase tracking-[0.14em] text-white/40">
                          A partir de
                        </p>
                        <p className="mt-0.5 text-lg font-black tracking-[-0.035em] text-[var(--brand-yellow)] sm:text-xl">
                          {model.investment}
                        </p>
                      </div>

                      <ArrowRight
                        size={17}
                        aria-hidden="true"
                        className="hidden shrink-0 text-white/25 transition duration-300 group-hover:translate-x-0.5 group-hover:text-[var(--brand-yellow)] sm:block"
                      />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center justify-between gap-5">
                <p className="max-w-xs text-[11px] leading-5 text-white/35">
                  Valores de referência, sujeitos à região, ao ponto comercial e
                  à configuração do projeto.
                </p>

                <Link
                  href="/seja-parceiro"
                  className="group inline-flex items-center gap-4 rounded-full bg-[var(--brand-yellow)] py-2.5 pl-6 pr-2.5 text-sm font-black text-[var(--brand-blue-950)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ffd75a]"
                >
                  Quero fazer parte
                  <span className="grid size-9 place-items-center rounded-full bg-[var(--brand-blue-950)] text-[var(--brand-yellow)] transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowRight size={17} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
