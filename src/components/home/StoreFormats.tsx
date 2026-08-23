import { ArrowRight, Ruler, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { storeFormats } from "@/data/network";

/**
 * Os três formatos de loja.
 *
 * No site antigo isso era um slider: o visitante arrastava um controle entre
 * R$ 60 mil, R$ 86 mil e R$ 120 mil e a lista embaixo trocava. O problema é
 * que o slider mostra um formato por vez e esconde os outros dois — quem
 * quer decidir precisa comparar, e comparar exigia arrastar e memorizar.
 *
 * Aqui os três ficam lado a lado, com a mesma anatomia (foto, preço, área,
 * equipe): a diferença entre eles aparece na leitura horizontal, sem clique
 * nenhum. A seção termina nos cartões — o que o investimento cobre é igual
 * nos três e está respondido no FAQ e em `/modelo-de-negocio`.
 *
 * Os números são os da fonte (`docs/conteudo-fontes.md`, seção 4), não os
 * arredondamentos que circulavam em outras telas do site.
 */
export function StoreFormats() {
  return (
    <section
      id="formatos"
      className="scroll-mt-28 bg-[var(--background)] py-20 sm:py-24 lg:py-28"
    >
      <Container>
        {/* ── Abertura ─────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-9 bg-[var(--brand-yellow)]"
            />

            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--brand-blue-800)]">
              Três formatos de loja
            </p>

            <span
              aria-hidden="true"
              className="h-px w-9 bg-[var(--brand-yellow)]"
            />
          </div>

          <h2 className="mt-6 text-balance text-[34px] font-black leading-[1.02] tracking-[-0.05em] text-[var(--brand-blue-950)] sm:text-5xl lg:text-[56px]">
            Comece do tamanho que
            <span className="block text-[var(--brand-blue-800)]">
              couber no seu plano.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-8 text-slate-600 sm:text-[17px]">
            Entre um formato e outro muda a área de vendas e o tamanho da
            equipe. O pacote de abertura é o mesmo nos três — e o investimento
            é o único cheque que você assina para a rede.
          </p>
        </div>

        {/* ── Os três cartões ──────────────────────────────────────────────
            No telefone viram um carrossel de arrastar com encaixe; a partir
            do desktop, três colunas iguais para a comparação acontecer de
            relance. */}
        <ul className="-mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
          {storeFormats.map((format) => (
            <li
              key={format.id}
              className="min-w-[84vw] snap-center sm:min-w-[380px] lg:min-w-0"
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-[26px] bg-white shadow-[0_1px_2px_rgba(6,31,73,0.05),0_26px_60px_-42px_rgba(6,31,73,0.45)] ring-1 ring-slate-900/[0.06] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_1px_2px_rgba(6,31,73,0.06),0_36px_70px_-40px_rgba(6,31,73,0.5)]">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <Image
                    src={format.image}
                    alt={format.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 84vw"
                    className="object-cover transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--brand-blue-900)] backdrop-blur-sm">
                    {format.badge}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--brand-blue-700)]">
                    {format.label}
                  </p>

                  <h3 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[var(--brand-blue-950)]">
                    {format.name}
                  </h3>

                  <p className="mt-3 text-[15px] leading-7 text-slate-600">
                    {format.tagline}
                  </p>

                  {/* O preço é o dado que a pessoa veio buscar: fica sozinho,
                      grande, e não disputa espaço com o resto. */}
                  <div className="mt-7">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                      Investimento a partir de
                    </p>

                    <p className="mt-1 text-[42px] font-black leading-none tracking-[-0.055em] text-[var(--brand-blue-950)]">
                      {format.investment}
                    </p>
                  </div>

                  <div className="mt-7 grid gap-3 border-t border-slate-200 pt-5 text-sm">
                    <p className="flex items-center gap-3">
                      <Ruler
                        size={17}
                        aria-hidden="true"
                        className="shrink-0 text-[var(--brand-blue-700)]"
                      />

                      <span className="font-bold text-[var(--brand-blue-950)]">
                        {format.area}{" "}
                        <span className="font-medium text-slate-500">
                          de área de vendas
                        </span>
                      </span>
                    </p>

                    <p className="flex items-center gap-3">
                      <Users
                        size={17}
                        aria-hidden="true"
                        className="shrink-0 text-[var(--brand-blue-700)]"
                      />

                      <span className="font-medium text-slate-500">
                        {format.team}
                      </span>
                    </p>
                  </div>

                  <Link
                    href="/seja-parceiro"
                    className="mt-auto inline-flex items-center gap-2 self-start pt-7 text-sm font-black text-[var(--brand-blue-800)] transition-all duration-300 hover:gap-3.5"
                  >
                    Quero este formato
                    <ArrowRight size={17} aria-hidden="true" />
                    <span className="sr-only"> — {format.name}</span>
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-5 text-slate-400">
          Valores de referência, sujeitos à região, ao ponto comercial e à
          configuração do projeto.
        </p>
      </Container>
    </section>
  );
}
