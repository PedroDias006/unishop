import { ArrowRight, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { obterFaq } from "@/data/editorial";

/**
 * Nenhum dos dois sites da empresa tem FAQ, e é a dúvida que mais aparece
 * antes de alguém preencher o formulário: se é franquia, quanto custa, o que
 * vem incluso, em quanto tempo volta.
 *
 * `<details>` nativo em vez de estado em React: a resposta já vem no HTML, o
 * que serve tanto para quem chega sem JavaScript quanto para o buscador.
 */
export async function FaqSection() {
  const faq = await obterFaq();

  return (
    <section
      id="duvidas"
      className="scroll-mt-28 bg-[var(--background)] py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="h-px w-10 bg-[var(--brand-yellow)]"
              />
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--brand-blue-800)]">
                Perguntas frequentes
              </p>
            </div>

            <h2 className="mt-6 text-balance text-3xl font-black leading-[1.03] tracking-[-0.045em] text-[var(--brand-blue-950)] sm:text-4xl lg:text-[44px]">
              As dúvidas que aparecem antes da primeira conversa.
            </h2>

            <p className="mt-6 max-w-md text-base leading-8 text-slate-600">
              Se a sua não estiver aqui, a equipe comercial responde direto —
              sem compromisso e sem etapa intermediária.
            </p>

            <Link
              href="/seja-parceiro"
              className="group mt-8 inline-flex items-center gap-4 rounded-full bg-[var(--brand-blue-900)] py-2.5 pl-6 pr-2.5 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--brand-blue-950)]"
            >
              Falar com a equipe
              <span className="grid size-9 place-items-center rounded-full bg-[var(--brand-yellow)] text-[var(--brand-blue-950)] transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight size={17} />
              </span>
            </Link>
          </div>

          {/*
            No telefone as perguntas abertas de uma vez viravam uma parede de
            texto antes do rodapé. Aqui elas ficam atrás de um botão; no
            desktop, onde há coluna sobrando, continuam à vista como antes.

            É um checkbox escondido em vez de estado em React porque a seção é
            um componente de servidor e, principalmente, porque assim as
            respostas continuam no HTML — só escondidas por CSS. Era esse o
            motivo de o acordeão usar `<details>` nativo, e some se a lista
            passar a ser renderizada condicionalmente.
          */}
          <div>
            <input
              type="checkbox"
              id="ver-perguntas-frequentes"
              className="peer sr-only"
            />

            <label
              htmlFor="ver-perguntas-frequentes"
              className="hidden min-h-13 cursor-pointer items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-black text-[var(--brand-blue-950)] shadow-[0_10px_26px_rgba(6,31,73,0.06)] max-lg:flex peer-checked:max-lg:hidden peer-focus-visible:ring-4 peer-focus-visible:ring-[var(--brand-yellow)]/40"
            >
              Ver as {faq.length} perguntas frequentes
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--brand-yellow)] text-[var(--brand-blue-950)]">
                <Plus size={16} strokeWidth={2.6} />
              </span>
            </label>

            <label
              htmlFor="ver-perguntas-frequentes"
              className="hidden min-h-13 cursor-pointer items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-black text-[var(--brand-blue-950)] peer-checked:max-lg:flex peer-focus-visible:ring-4 peer-focus-visible:ring-[var(--brand-yellow)]/40"
            >
              Ocultar as perguntas
              <span className="grid size-8 shrink-0 place-items-center rounded-full border border-slate-200 text-[var(--brand-blue-800)]">
                <Minus size={16} strokeWidth={2.6} />
              </span>
            </label>

            <div className="divide-y divide-slate-200 border-y border-slate-200 max-lg:mt-4 max-lg:hidden peer-checked:max-lg:block">
              {faq.map((item) => (
              <details key={item.question} className="group py-1">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base font-black leading-[1.35] tracking-[-0.02em] text-[var(--brand-blue-950)] transition-colors duration-200 group-hover:text-[var(--brand-blue-800)] sm:text-lg">
                    {item.question}
                  </h3>

                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-slate-200 text-[var(--brand-blue-800)] transition duration-300 group-open:rotate-45 group-open:border-[var(--brand-yellow)] group-open:bg-[var(--brand-yellow)] group-open:text-[var(--brand-blue-950)]"
                  >
                    <Plus size={16} strokeWidth={2.6} />
                  </span>
                </summary>

                <p className="max-w-2xl pb-6 pr-14 text-[15px] leading-7 text-slate-600">
                  {item.answer}
                </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
