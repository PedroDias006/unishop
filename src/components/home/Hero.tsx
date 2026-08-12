import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate min-h-[650px] overflow-hidden bg-[#041b49] pt-[104px] text-white sm:min-h-[700px] sm:pt-[112px] lg:min-h-[760px] lg:pt-[116px]"
    >
      <div className="hero-atmosphere pointer-events-none absolute inset-0 -z-20" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#031637]/35 to-transparent" />

      <div className="mx-auto grid min-h-[546px] w-full max-w-[1440px] px-5 sm:min-h-[588px] sm:px-8 lg:min-h-[644px] lg:grid-cols-[0.78fr_1.22fr] lg:px-10 xl:px-12">
        <div className="relative z-30 flex items-center pb-12 pt-10 sm:pb-16 lg:pb-24 lg:pt-4">
          <div className="max-w-[600px]">
            <h1 className="hero-reveal hero-reveal-2 text-[clamp(3.65rem,6.2vw,6.65rem)] font-black leading-[0.84] tracking-[-0.065em] text-white">
              Mais cuidado.
              <span className="mt-3 block text-[#ffc928] sm:mt-4">
                Menos
                <br />
                complicação.
              </span>
            </h1>

            <p className="sr-only">
              Produtos para casa e negócios, com orientação especializada e uma Rede Unishop perto de você.
            </p>
          </div>
        </div>

        <div className="hero-reveal hero-reveal-visual relative h-[410px] self-end sm:h-[500px] lg:h-[644px]">
          <div className="pointer-events-none absolute -right-[32%] -top-[5%] z-0 aspect-square w-[103%] rounded-full bg-[#ffc21a] shadow-[0_0_80px_rgba(255,189,0,0.12)] sm:-right-[24%] sm:-top-[12%] lg:-right-[18%] lg:-top-[10%] lg:w-[91%]" />

          <div className="pointer-events-none absolute bottom-0 left-[-12%] z-10 h-[116px] w-[126%] sm:h-[142px] lg:left-[-7%] lg:h-[164px] lg:w-[119%]">
            <div className="absolute inset-x-0 top-0 h-[76px] rounded-[50%] border border-white/45 bg-[linear-gradient(180deg,#e9f7ff_0%,#c7e1f1_58%,#aacadd_100%)] shadow-[0_-12px_38px_rgba(190,225,246,0.24)] sm:h-[92px] lg:h-[108px]" />
            <div className="absolute inset-x-0 bottom-0 top-[38px] bg-[linear-gradient(100deg,#a9c9dd_0%,#d5ebf7_48%,#b4d3e5_100%)] sm:top-[46px] lg:top-[54px]" />
            <div className="absolute inset-x-0 top-[38px] h-px bg-white/75 sm:top-[46px] lg:top-[54px]" />
          </div>

          <Link
            href="/produtos"
            aria-label="Conhecer os produtos da Rede Unishop"
            className="group absolute -bottom-[1%] left-[-3%] z-20 h-[108%] w-[107%] sm:-bottom-[2%] sm:left-[-1%] sm:h-[112%] sm:w-[104%] lg:-bottom-[2%] lg:left-[1%] lg:h-[111%] lg:w-[100%]"
          >
            <Image
              src="/images/produtos-showcase/clorogel.webp"
              alt="Linha de produtos Azulim para cuidados com a casa"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 820px"
              className="select-none object-contain object-bottom drop-shadow-[0_32px_26px_rgba(1,20,48,0.28)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
