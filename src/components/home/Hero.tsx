import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden bg-[#062f65] pb-10 pt-[118px] text-white sm:pb-12 sm:pt-[132px] lg:min-h-[730px] lg:pb-16 lg:pt-[138px]"
    >
      <div className="hero-atmosphere pointer-events-none absolute inset-0 -z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[47%] border-l border-white/[0.06] lg:block" />
      <div className="pointer-events-none absolute -bottom-56 -left-20 -z-10 size-[520px] rounded-full border border-white/[0.06]" />

      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.93fr_1.07fr] lg:gap-12 lg:px-10 xl:gap-20">
        <div className="relative z-20 max-w-[650px] py-5 lg:py-9">
          <p className="hero-reveal hero-reveal-1 mb-6 flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.24em] text-[#ffdc69] sm:text-xs">
            <span className="size-2 rounded-full bg-[#ffc928] shadow-[0_0_0_6px_rgba(255,201,40,0.12)]" />
            Cuidado que faz diferença
          </p>

          <h1 className="hero-reveal hero-reveal-2 max-w-[650px] text-[clamp(3.3rem,6.6vw,6.25rem)] font-black leading-[0.87] tracking-[-0.065em] text-white">
            Mais cuidado.
            <span className="mt-2 block text-[#ffc928]">Menos complicação.</span>
          </h1>

          <p className="hero-reveal hero-reveal-3 mt-7 max-w-[515px] text-base font-medium leading-7 text-[#dceafa]/72 sm:text-lg sm:leading-8">
            Produtos para casa e negócios, com orientação de quem entende e uma loja perto de você.
          </p>

          <div className="hero-reveal hero-reveal-4 mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <Link
              href="/lojas"
              className="group/primary inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#ffc928] px-6 text-sm font-black text-[#07396e] shadow-[0_18px_42px_rgba(226,169,0,0.22)] transition duration-300 hover:-translate-y-1 hover:bg-[#ffda55] hover:shadow-[0_22px_50px_rgba(226,169,0,0.3)]"
            >
              <MapPin size={18} />
              Encontrar uma loja
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover/primary:translate-x-1"
              />
            </Link>

            <Link
              href="/produtos"
              className="group/secondary inline-flex min-h-11 items-center gap-2 border-b border-white/25 text-sm font-black text-white transition-colors hover:border-[#ffc928] hover:text-[#ffdc69]"
            >
              Conhecer os produtos
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover/secondary:translate-x-1"
              />
            </Link>
          </div>

          <div className="hero-reveal hero-reveal-5 mt-11 flex items-center gap-4 border-t border-white/10 pt-5 sm:max-w-[470px]">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/40">
              Desde 1987
            </span>
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-xs font-bold text-white/58">
              Do dia a dia ao uso profissional
            </span>
          </div>
        </div>

        <div className="hero-reveal hero-reveal-visual relative mx-auto h-[430px] w-full max-w-[700px] sm:h-[520px] lg:h-[555px]">
          <div className="absolute inset-x-1 bottom-0 top-7 overflow-hidden rounded-[34px] bg-[#eaf2f8] shadow-[0_36px_90px_rgba(0,16,44,0.3)] sm:inset-x-4 sm:rounded-[46px] lg:inset-x-0">
            <div className="absolute -right-[18%] -top-[12%] size-[82%] rounded-full bg-[#ffc928]" />
            <div className="absolute -bottom-[42%] -left-[30%] size-[94%] rounded-full border-[50px] border-[#cfe0ee]/55 sm:border-[70px]" />
            <div className="absolute inset-y-0 left-[13%] w-px bg-[#0b3b70]/[0.08]" />
            <div className="absolute left-[13%] top-[11%] h-px w-[18%] bg-[#0b3b70]/15" />

            <p
              aria-hidden="true"
              className="absolute -left-4 top-[42%] z-0 -translate-y-1/2 -rotate-90 text-[clamp(4.5rem,8vw,7.8rem)] font-black leading-none tracking-[-0.08em] text-[#0a376a]/[0.055]"
            >
              CUIDAR
            </p>

            <div className="absolute left-6 top-6 z-20 flex items-center gap-2.5 rounded-full border border-[#0a376a]/10 bg-white/75 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-[#0a447f] shadow-[0_10px_28px_rgba(5,43,84,0.08)] backdrop-blur-md sm:left-9 sm:top-9">
              <span className="size-1.5 rounded-full bg-[#e3ac00]" />
              Seleção especializada
            </div>

            <div className="absolute inset-x-[5%] bottom-[3%] top-[10%] z-10 sm:inset-x-[8%] sm:bottom-[2%]">
              <Image
                src="/images/produtos-showcase/clorogel.webp"
                alt="Seleção de produtos Azulim para cuidados com a casa"
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 660px"
                className="select-none object-contain object-bottom drop-shadow-[0_34px_28px_rgba(2,35,73,0.23)]"
              />
            </div>

            <div className="absolute bottom-5 right-5 z-20 max-w-[190px] rounded-[20px] border border-white/80 bg-white/80 p-4 text-[#0a376a] shadow-[0_18px_42px_rgba(7,45,82,0.13)] backdrop-blur-xl sm:bottom-7 sm:right-7 sm:max-w-[230px] sm:p-5">
              <span className="block text-[10px] font-black uppercase tracking-[0.15em] text-[#9d7600]">
                Para cada ambiente
              </span>
              <p className="mt-1.5 text-sm font-black leading-5 sm:text-base">
                A solução certa, sem perder tempo.
              </p>
            </div>
          </div>

          <div className="absolute right-0 top-0 z-30 hidden items-center gap-2 rounded-full border border-white/15 bg-[#06376f]/82 px-4 py-2.5 text-[11px] font-black text-white shadow-xl backdrop-blur-xl sm:flex lg:-right-5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#ffc928] opacity-55" />
              <span className="relative inline-flex size-2 rounded-full bg-[#ffc928]" />
            </span>
            Mais de 500 lojas
          </div>
        </div>
      </div>

    </section>
  );
}
