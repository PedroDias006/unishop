import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export function FinalCta() {
  return (
    <section className="bg-[var(--background)] py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[36px] bg-[var(--brand-blue-900)] px-6 py-14 text-white sm:px-12 lg:px-16 lg:py-16">
          <div className="absolute -right-16 -top-20 size-72 rounded-full bg-[var(--brand-yellow)]/15" />
          <div className="absolute -bottom-28 right-32 size-56 rounded-full border border-white/10" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--brand-yellow)]">Próximo passo</p>
              <h2 className="mt-4 text-balance text-4xl font-black tracking-[-0.05em] sm:text-5xl">
                Seu próximo negócio pode começar aqui.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/68">
                Formulário simples, argumentos claros e um caminho direto para falar com a equipe comercial.
              </p>
            </div>
            <ButtonLink href="/seja-parceiro" className="gap-2 lg:justify-self-end">
              Quero conhecer o modelo <ArrowRight size={18} />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
