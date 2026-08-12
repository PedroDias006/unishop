import { CheckCircle2, Play } from "lucide-react";
import { benefits } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function BusinessModel() {
  return (
    <section id="modelo" className="scroll-mt-28 overflow-hidden bg-white py-20 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <div className="relative">
          <div className="aspect-[4/3] rounded-[36px] bg-[linear-gradient(145deg,#0a3474,#071c41)] p-7 shadow-2xl shadow-blue-950/20">
            <div className="flex h-full flex-col justify-between rounded-[26px] border border-white/15 bg-white/8 p-6 text-white">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[var(--brand-yellow)] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[var(--brand-blue-950)]">
                  Modelo de parceria
                </span>
                <span className="text-xs font-bold text-white/50">Vídeo institucional</span>
              </div>
              <button
                type="button"
                className="mx-auto grid size-24 place-items-center rounded-full border border-white/20 bg-white text-[var(--brand-blue-950)] shadow-2xl transition hover:scale-105"
                aria-label="Reproduzir vídeo"
              >
                <Play size={32} fill="currentColor" />
              </button>
              <div>
                <p className="text-sm text-white/60">Conheça a estrutura</p>
                <strong className="mt-2 block text-3xl font-black tracking-[-0.04em]">
                  Suporte para começar e continuar crescendo.
                </strong>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-7 -right-4 hidden rounded-3xl bg-[var(--brand-yellow)] p-6 text-[var(--brand-blue-950)] shadow-xl sm:block">
            <strong className="block text-3xl font-black">0%</strong>
            <span className="text-xs font-bold uppercase tracking-[0.15em]">royalties</span>
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="Muito além de uma loja"
            title="Um modelo criado para apoiar o empreendedor."
            description="A página precisa explicar o diferencial da parceria de forma rápida, visual e convincente, sem esconder os principais benefícios em longos blocos de texto."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex gap-3 rounded-2xl border border-slate-200 p-4">
                <CheckCircle2 className="mt-0.5 shrink-0 text-[var(--brand-blue-800)]" size={19} />
                <span className="text-sm font-semibold leading-6 text-slate-700">{benefit}</span>
              </div>
            ))}
          </div>
          <ButtonLink href="/modelo-de-negocio" variant="light" className="mt-8">
            Conhecer o modelo completo
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
