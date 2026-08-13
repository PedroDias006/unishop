import { Container } from "@/components/ui/Container";

const institutionalVideoUrl =
  "https://www.youtube-nocookie.com/embed/z-79Qq5wZ1s?rel=0&modestbranding=1";

export function BusinessModel() {
  return (
    <section id="modelo" className="scroll-mt-28 bg-white py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-9 bg-[var(--brand-yellow)]" aria-hidden="true" />
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[var(--brand-blue-800)]">
              Conheça a Unishop
            </p>
            <span className="h-px w-9 bg-[var(--brand-yellow)]" aria-hidden="true" />
          </div>

          <h2 className="mt-5 text-balance text-4xl font-extrabold tracking-[-0.04em] text-[var(--brand-blue-950)] sm:text-5xl">
            Uma história construída para crescer junto.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Conheça de perto a estrutura, o propósito e as pessoas que fazem a Rede Unishop
            avançar por todo o Brasil.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-6xl overflow-hidden border border-slate-200 bg-[var(--brand-blue-950)] shadow-[0_24px_60px_-34px_rgba(4,31,72,0.5)] sm:mt-12">
          <div className="aspect-video">
            <iframe
              className="h-full w-full"
              src={institutionalVideoUrl}
              title="Vídeo institucional da Rede Unishop"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
