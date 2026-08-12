import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { segments } from "@/data/site";

export function Segments() {
  return (
    <section id="segmentos" className="scroll-mt-28 bg-white py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <SectionHeading
            eyebrow="Portfólio amplo"
            title="Uma marca presente em diferentes rotinas."
            description="A divisão por segmentos ajuda o cliente a entender rapidamente onde a Unishop pode atender."
          />
          <p className="max-w-2xl text-sm leading-7 text-slate-500 lg:justify-self-end">
            Esta estrutura também pode receber páginas próprias por categoria, filtros de produtos e links para compra ou contato com a unidade mais próxima.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {segments.map((segment) => {
            const Icon = segment.icon;
            return (
              <article key={segment.name} className="group rounded-[26px] border border-slate-200 p-6 transition hover:border-[var(--brand-blue-700)] hover:shadow-xl hover:shadow-slate-950/5">
                <span className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-[var(--brand-blue-800)] transition group-hover:bg-[var(--brand-blue-900)] group-hover:text-white">
                  <Icon size={22} />
                </span>
                <h3 className="mt-6 text-xl font-black text-slate-950">{segment.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{segment.description}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
