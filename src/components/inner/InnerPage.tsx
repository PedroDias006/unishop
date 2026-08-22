import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

interface InnerPageProps {
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
}

export function InnerPage({ eyebrow, title, description, items }: InnerPageProps) {
  return (
    <>
      <section className="bg-[var(--brand-blue-950)] py-20 text-white sm:py-28">
        <Container>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--brand-yellow)]">{eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-balance text-5xl font-black tracking-[-0.06em] sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">{description}</p>
        </Container>
      </section>
      <section className="bg-[var(--background)] py-20 sm:py-28">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <article key={item} className="rounded-[26px] border border-slate-200 p-6">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-[var(--brand-blue-700)]">Etapa {String(index + 1).padStart(2, "0")}</span>
                <h2 className="mt-4 text-xl font-black text-slate-950">{item}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">Esta seção já está preparada para receber conteúdo real, imagens, formulários ou integração com um CMS.</p>
              </article>
            ))}
          </div>
          <div className="mt-12 rounded-[30px] bg-slate-100 p-7 sm:p-10">
            <h2 className="text-3xl font-black tracking-[-0.04em] text-slate-950">Página pronta para evoluir.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">Neste primeiro pacote, as rotas já existem para evitar retrabalho na navegação. Vamos desenvolver cada uma conforme avançarmos.</p>
            <ButtonLink href="/seja-parceiro" className="mt-6 gap-2">Falar com a equipe <ArrowRight size={17} /></ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
