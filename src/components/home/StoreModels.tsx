import { ArrowUpRight, Ruler, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { storeModels } from "@/data/site";

export function StoreModels() {
  return (
    <section id="modelos" className="scroll-mt-28 bg-slate-50 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Modelos de loja"
          title="Estruturas para diferentes momentos de negócio."
          description="Cards objetivos facilitam a comparação sem obrigar o visitante a interpretar seções repetidas."
          align="center"
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {storeModels.map((model, index) => (
            <article
              key={model.name}
              className={`group overflow-hidden rounded-[30px] border bg-white transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-950/10 ${
                index === 1 ? "border-[var(--brand-blue-700)] ring-4 ring-blue-100" : "border-slate-200"
              }`}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[linear-gradient(145deg,#e8eff8,#f8fafc)] p-6">
                <div className="absolute -right-8 -top-12 size-44 rounded-full bg-[var(--brand-yellow)]/40 blur-2xl" />
                <div className="relative flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="grid size-9 place-items-center rounded-xl bg-[var(--brand-blue-900)] text-xs font-black text-[var(--brand-yellow)]">U</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-slate-500">{model.tag}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="h-14 rounded-xl bg-slate-100" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6 sm:p-7">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--brand-blue-700)]">
                  {model.investment}
                </p>
                <h3 className="mt-3 text-2xl font-black tracking-[-0.04em] text-slate-950">{model.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{model.description}</p>
                <div className="mt-6 flex gap-5 border-t border-slate-200 pt-5 text-xs font-bold text-slate-600">
                  <span className="flex items-center gap-2"><Ruler size={16} /> {model.area}</span>
                  <span className="flex items-center gap-2"><Users size={16} /> {model.team}</span>
                </div>
                <a href="/modelo-de-negocio" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[var(--brand-blue-800)]">
                  Ver detalhes <ArrowUpRight size={17} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
