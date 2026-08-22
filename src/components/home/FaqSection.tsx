import { ArrowRight, Plus } from "lucide-react";
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
      className="scroll-mt-28 bg-white py-20 sm:py-24 lg:py-28"
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

          <div className="divide-y divide-slate-200 border-y border-slate-200">
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
      </Container>
    </section>
  );
}
