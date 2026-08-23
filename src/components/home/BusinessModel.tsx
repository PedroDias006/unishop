import { Building2, MapPinned, PackageCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";

const institutionalVideoUrl =
  "https://www.youtube-nocookie.com/embed/z-79Qq5wZ1s?rel=0&modestbranding=1";

const highlights = [
  {
    icon: Building2,
    title: "Estrutura sólida",
  },
  {
    icon: MapPinned,
    title: "Presença nacional",
  },
  {
    icon: PackageCheck,
    title: "Portfólio completo",
  },
];

export function BusinessModel() {
  return (
    <section
      id="modelo"
      className="scroll-mt-28 overflow-hidden bg-[var(--background)] py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          {/* VÍDEO
              No telefone a coluna vira pilha e o vídeo, por ser o primeiro
              filho, abria a seção: o visitante batia num player antes de saber
              do que a seção trata. A `order` desce ele para depois do texto,
              que é onde vira convite em vez de obstáculo. No desktop as duas
              colunas voltam à ordem do HTML — vídeo à esquerda. */}
          <div className="order-2 relative lg:order-none">
            <span
              aria-hidden="true"
              className="absolute -left-3 top-8 hidden h-[72%] w-[3px] rounded-full bg-[var(--brand-yellow)] lg:block"
            />

            <div className="relative overflow-hidden rounded-[22px] border border-slate-200 bg-[var(--brand-blue-950)] shadow-[0_24px_70px_-38px_rgba(6,31,73,0.35)]">
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

            <div className="mt-4 flex items-center gap-3">
              <span className="h-px w-7 bg-[var(--brand-yellow)]" />

              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Assista à apresentação institucional
              </p>
            </div>
          </div>

          {/* APRESENTAÇÃO */}
          <div className="order-1 lg:order-none">
            <div className="flex items-center gap-4">
              <span
                className="h-px w-10 bg-[var(--brand-yellow)]"
                aria-hidden="true"
              />

              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--brand-blue-800)]">
                Conheça a Unishop
              </p>
            </div>

            <h2 className="mt-7 max-w-2xl text-4xl font-black leading-[1.02] tracking-[-0.045em] text-[var(--brand-blue-950)] sm:text-5xl lg:text-[58px]">
              Uma história feita
              <br />
              para{" "}
              <span className="relative inline-block text-[var(--brand-yellow)]">
                crescer junto.
                <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-[var(--brand-yellow)]" />
              </span>
            </h2>

            <p className="mt-9 max-w-xl text-base leading-8 text-slate-600 sm:text-[17px]">
              Conheça de perto a estrutura, o propósito e as pessoas que fazem
              a Rede Unishop avançar e levar soluções para diferentes
              necessidades em todo o Brasil.
            </p>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-5">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-2.5"
                  >
                    <span className="grid size-8 place-items-center rounded-full bg-white text-[var(--brand-blue-800)] shadow-[0_5px_18px_rgba(6,31,73,0.07)]">
                      <Icon size={15} strokeWidth={2.2} />
                    </span>

                    <span className="text-sm font-bold text-[var(--brand-blue-900)]">
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 max-w-xl border-t border-slate-200 pt-6">
              <p className="text-sm leading-6 text-slate-500">
                Uma rede que combina experiência, variedade e proximidade para
                construir relações que vão além da venda.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
