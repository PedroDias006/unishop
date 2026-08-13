"use client";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

const slides = [
  {
    id: "produtos",
    eyebrow: null,
    title: "Mais cuidado.",
    accent: (
      <>
        Menos
        <br />
        complicação.
      </>
    ),
    description: null,
    cta: null,
    visual: "products",
    background:
      "bg-[radial-gradient(circle_at_55%_8%,rgba(25,103,196,0.36),transparent_32%),linear-gradient(114deg,#03183f_0%,#05265a_46%,#063776_100%)]",
    darkText: false,
    reverse: false,
    fullImage: null,
    fullHref: null,
    fullAlt: null,
  },
  {
    id: "lojas",
    eyebrow: "Transforme sua loja",
    title: "Em uma",
    accent: "Unishop!",
    description:
      "Limpeza, descartáveis, EPIs, utilidades e embalagens para ampliar suas vendas com suporte completo.",
    cta: { label: "Conhecer o modelo", href: "/modelo-de-negocio" },
    visual: "store",
    background:
      "bg-[radial-gradient(circle_at_80%_16%,rgba(60,156,238,0.42),transparent_29%),linear-gradient(118deg,#031d4c_0%,#0752a9_100%)]",
    darkText: false,
    reverse: false,
    fullImage: "/images/hero/banner-loja-original.png",
    fullHref: "/modelo-de-negocio",
    fullAlt: "Transforme sua loja em uma Unishop",
  },
  {
    id: "industria",
    eyebrow: "Da origem à entrega",
    title: "Estrutura que",
    accent: "inspira confiança.",
    description:
      "A força de uma operação integrada para levar qualidade e variedade a todo o Brasil.",
    cta: { label: "Conhecer a Unishop", href: "/sobre" },
    visual: "industry",
    background:
      "bg-[radial-gradient(circle_at_12%_84%,rgba(21,104,198,0.32),transparent_30%),linear-gradient(132deg,#03183e_0%,#0a3f88_100%)]",
    darkText: false,
    reverse: false,
    fullImage: null,
    fullHref: null,
    fullAlt: null,
  },
  {
    id: "parceria",
    eyebrow: "Oportunidade de negócio",
    title: "Fature até",
    accent: "R$120 mil/mês",
    description:
      "Invista a partir de R$60 mil e tenha suporte completo para começar.",
    cta: { label: "Quero conhecer", href: "/seja-parceiro" },
    visual: "partner",
    background:
      "bg-[radial-gradient(circle_at_88%_8%,rgba(20,101,205,0.38),transparent_28%),linear-gradient(118deg,#020d2c_0%,#03285f_54%,#061b44_100%)]",
    darkText: false,
    reverse: false,
    fullImage: "/images/hero/banner-parceria-original.png",
    fullHref: "/seja-parceiro",
    fullAlt: "Oportunidade de faturamento com limpeza e higienização",
  },
  {
    id: "profissional",
    eyebrow: "Soluções profissionais",
    title: "Performance",
    accent: "para quem faz.",
    description:
      "Produtos e orientação para operações que exigem eficiência todos os dias.",
    cta: { label: "Explorar soluções", href: "/produtos" },
    visual: "professional",
    background:
      "bg-[radial-gradient(circle_at_88%_76%,rgba(0,118,199,0.34),transparent_28%),linear-gradient(112deg,#020f2d_0%,#063566_58%,#07508e_100%)]",
    darkText: false,
    reverse: false,
    fullImage: null,
    fullHref: null,
    fullAlt: null,
  },
] as const;

function SlideVisual({
  visual,
  active,
}: {
  visual: (typeof slides)[number]["visual"];
  active: boolean;
}) {
  if (visual === "products") {
    return (
      <div className="relative h-full w-full">
        <div className="pointer-events-none absolute -right-[32%] -top-[5%] z-0 aspect-square w-[103%] rounded-full bg-[#ffc21a] shadow-[0_0_80px_rgba(255,189,0,0.12)] sm:-right-[24%] sm:-top-[12%] lg:-right-[18%] lg:-top-[10%] lg:w-[91%]" />
        <div className="hero-pedestal pointer-events-none absolute bottom-0 left-[-12%] z-10 h-[116px] w-[126%] sm:h-[142px] lg:left-[-7%] lg:h-[164px] lg:w-[119%]" />
        <Link
          href="/produtos"
          tabIndex={active ? 0 : -1}
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
    );
  }

  if (visual === "store") {
    return (
      <div className="relative h-full w-full">
        <div className="absolute -right-[17%] -top-[12%] h-[126%] w-[91%] rotate-[8deg] rounded-[42%_0_0_42%] border border-[#ffc928]/45" />
        <div className="absolute -right-[11%] -top-[6%] h-[116%] w-[86%] rotate-[8deg] rounded-[42%_0_0_42%] bg-[#ffc928] shadow-[0_0_36px_rgba(255,201,40,0.2)]" />
        <div className="absolute inset-x-[1%] bottom-[3%] top-[7%] rotate-[1deg] overflow-hidden rounded-[38px_150px_38px_38px] border-[3px] border-[#ffc928] bg-[#061d4b] shadow-[0_36px_84px_rgba(0,10,34,0.45)] sm:inset-x-[4%] sm:rounded-[50px_190px_50px_50px] lg:inset-x-[1%] lg:bottom-[6%] lg:top-[5%]">
          <Image
            src="/images/hero/loja-unishop-premium.png"
            alt="Conceito premium de uma loja da Rede Unishop"
            fill
            sizes="(max-width: 1024px) 100vw, 820px"
            className="object-cover object-[58%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#031b48]/16 via-transparent to-[#ffc928]/8" />
          <Image
            src="/images/logotipo.webp"
            alt="Rede Unishop"
            width={220}
            height={74}
            className="absolute left-[40%] top-[28%] hidden h-auto w-[16%] object-contain drop-shadow-lg lg:block"
          />
        </div>
        <div className="absolute bottom-[1%] left-[2%] z-20 grid size-20 place-items-center rounded-full border-[6px] border-[#ffc928] bg-[#07396e] text-[#ffc928] shadow-[0_18px_40px_rgba(0,13,38,0.38)] sm:size-24 lg:bottom-[4%]">
          <ShoppingCart size={34} strokeWidth={2.2} />
        </div>
        <div className="hero-dot-matrix absolute right-[3%] top-[2%] size-20 opacity-70" />
      </div>
    );
  }

  if (visual === "industry") {
    return (
      <div className="relative h-full w-full">
        <div className="absolute -right-[14%] -top-[18%] h-[138%] w-[88%] rounded-l-[46%] bg-[#ffc928] sm:w-[84%] lg:-right-[8%]" />
        <div className="absolute inset-x-[2%] bottom-[3%] top-[7%] overflow-hidden rounded-[46%_36px_36px_46%] border-[9px] border-[#ffc928] shadow-[0_32px_72px_rgba(0,14,40,0.36)] sm:inset-x-[5%] lg:inset-x-[2%] lg:bottom-[5%] lg:top-[5%]">
          <Image
            src="/images/ChatGPT Image 20 de jul. de 2026, 21_29_52.webp"
            alt="Estrutura industrial que apoia a Rede Unishop"
            fill
            sizes="(max-width: 1024px) 100vw, 820px"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07285a]/12 via-transparent to-[#ffc928]/8" />
        </div>
        <span className="absolute right-[2%] top-[5%] hidden text-[7.5rem] font-black leading-none tracking-[-0.08em] text-[#05285d]/10 sm:block lg:right-[-1%]">
          38
        </span>
      </div>
    );
  }

  if (visual === "partner") {
    return (
      <div className="relative h-full w-full">
        <div className="absolute inset-x-[1%] bottom-[3%] top-[5%] overflow-hidden rounded-[42px] border border-[#ffc928]/55 bg-[#051a43] shadow-[0_32px_78px_rgba(0,9,30,0.42)] sm:inset-x-[3%] sm:rounded-[54px] lg:inset-x-[1%] lg:bottom-[5%]">
          <Image
            src="/images/hero/parceria-unishop-premium.png"
            alt="Empreendedora em uma operação de limpeza e higienização"
            fill
            sizes="(max-width: 1024px) 100vw, 820px"
            className="object-cover object-[47%_center]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_30%,rgba(2,18,49,0.2)_46%,transparent_74%)]" />
        </div>
        <div className="absolute -right-[5%] -top-[10%] size-[42%] rounded-full border-[34px] border-[#ffc928]/90" />
        <div className="hero-dot-matrix absolute right-[2%] top-[1%] size-24 opacity-70" />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <div className="absolute -left-[2%] top-[4%] size-28 rounded-full border-[22px] border-[#ffc928] sm:size-36 sm:border-[28px] lg:left-[1%]" />
      <div className="absolute -right-[18%] bottom-[-30%] aspect-square w-[80%] rounded-full bg-[#ffc928] sm:-right-[10%] lg:-right-[8%]" />
      <div className="absolute inset-x-[2%] bottom-[3%] top-[7%] overflow-hidden rounded-[44px_44px_180px_44px] border-[8px] border-[#dceef8] shadow-[0_32px_74px_rgba(0,14,42,0.35)] sm:inset-x-[6%] sm:rounded-[52px_52px_230px_52px] lg:inset-x-[3%] lg:bottom-[5%] lg:top-[5%]">
        <Image
          src="/images/hero/limpeza-profissional.png"
          alt="Profissional realizando limpeza técnica em um ambiente comercial"
          fill
          sizes="(max-width: 1024px) 100vw, 820px"
          className="object-cover object-[55%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#031b48]/18 via-transparent to-[#dff4ff]/8" />
      </div>
    </div>
  );
}

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const pointerStart = useRef<number | null>(null);

  function goToSlide(index: number) {
    setActiveSlide((index + slides.length) % slides.length);
  }

  function previousSlide() {
    goToSlide(activeSlide - 1);
  }

  function nextSlide() {
    goToSlide(activeSlide + 1);
  }

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPaused(true);
    }
  }, []);

  useEffect(() => {
    if (paused || interacting) return;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 10000);

    return () => window.clearInterval(timer);
  }, [activeSlide, interacting, paused]);

  function handlePointerDown(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") pointerStart.current = event.clientX;
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLElement>) {
    if (pointerStart.current === null) return;

    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;

    if (Math.abs(distance) < 45) return;
    if (distance > 0) previousSlide();
    else nextSlide();
  }

  return (
    <section
      id="inicio"
      aria-label="Apresentação da Rede Unishop"
      aria-roledescription="carrossel"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false);
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className="relative isolate min-h-[820px] touch-pan-y overflow-hidden bg-[#041b49] text-white sm:min-h-[920px] lg:min-h-[760px]"
    >
      <div aria-live={paused ? "polite" : "off"} className="absolute inset-0">
        {slides.map((slide, index) => {
          const active = activeSlide === index;
          const fullArtwork =
            slide.fullImage && slide.fullHref && slide.fullAlt
              ? {
                  image: slide.fullImage,
                  href: slide.fullHref,
                  alt: slide.fullAlt,
                }
              : null;

          return (
            <article
              key={slide.id}
              aria-hidden={!active}
              aria-label={`${index + 1} de ${slides.length}`}
              aria-roledescription="slide"
              className={`hero-slide absolute inset-0 overflow-hidden ${slide.background} ${
                active ? "hero-slide-active" : ""
              }`}
            >
              {fullArtwork ? (
                <Link
                  href={fullArtwork.href}
                  tabIndex={active ? 0 : -1}
                  aria-label={fullArtwork.alt}
                  className="absolute inset-x-0 bottom-0 top-[88px] bg-[#020c28] sm:top-[96px]"
                >
                  <Image
                    src={fullArtwork.image}
                    alt={fullArtwork.alt}
                    fill
                    sizes="100vw"
                    className="select-none object-contain object-center"
                  />
                </Link>
              ) : (
                <>
              {slide.visual === "store" ? (
                <div className="pointer-events-none absolute -left-28 top-[32%] size-80 rotate-12 rounded-[72px] border border-white/10" />
              ) : null}
              {slide.visual === "industry" ? (
                <div className="hero-industrial-grid pointer-events-none absolute inset-0 opacity-25" />
              ) : null}
              {slide.visual === "partner" ? (
                <div className="hero-opportunity-ribbons pointer-events-none absolute inset-0" />
              ) : null}
              {slide.visual === "professional" ? (
                <div className="pointer-events-none absolute inset-y-0 left-[38%] hidden w-px bg-white/10 lg:block" />
              ) : null}

              <div
                className={`mx-auto grid h-full w-full max-w-[1440px] grid-rows-[auto_1fr] px-5 pb-6 pt-[114px] sm:px-8 sm:pb-8 sm:pt-[128px] lg:grid-rows-1 lg:px-10 lg:pb-0 lg:pt-[116px] xl:px-12 ${
                  slide.visual === "partner"
                    ? "lg:grid-cols-[0.78fr_1.22fr]"
                    :
                  slide.reverse
                    ? "lg:grid-cols-[1.12fr_0.88fr]"
                    : "lg:grid-cols-[0.78fr_1.22fr]"
                }`}
              >
                <div
                  className={`hero-slide-copy relative z-30 flex items-center pb-6 pt-6 sm:pb-8 lg:pb-8 lg:pt-4 ${
                    slide.visual === "partner"
                      ? "lg:order-2 lg:pl-10"
                      :
                    slide.reverse ? "lg:order-2 lg:pl-10" : ""
                  }`}
                >
                  <div className="max-w-[610px]">
                    {slide.eyebrow ? (
                      <p
                        className={`mb-5 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.22em] sm:text-xs ${
                          slide.darkText ? "text-[#07396e]/70" : "text-[#ffdc69]"
                        }`}
                      >
                        <span
                          className={`h-px w-8 ${
                            slide.darkText ? "bg-[#07396e]/55" : "bg-[#ffc928]"
                          }`}
                        />
                        {slide.eyebrow}
                      </p>
                    ) : null}

                    <h1
                      className={`font-black leading-[0.86] tracking-[-0.065em] ${
                        slide.visual === "partner"
                          ? "text-[clamp(2.9rem,5.2vw,5.4rem)]"
                          : "text-[clamp(3.35rem,6vw,6.35rem)]"
                      } ${
                        slide.darkText ? "text-[#07396e]" : "text-white"
                      }`}
                    >
                      {slide.title}
                      <span
                        className={`mt-2 block sm:mt-3 ${
                          slide.visual === "partner"
                            ? "hero-gold-text"
                            : slide.darkText
                              ? "text-white"
                              : "text-[#ffc928]"
                        }`}
                      >
                        {slide.accent}
                      </span>
                    </h1>

                    {slide.description ? (
                      <p
                        className={`mt-6 max-w-[510px] text-sm font-semibold leading-6 sm:text-lg sm:leading-8 ${
                          slide.darkText ? "text-[#07396e]/72" : "text-[#dceafa]/72"
                        }`}
                      >
                        {slide.description}
                      </p>
                    ) : (
                      <p className="sr-only">
                        Produtos para casa e negócios, com orientação especializada e uma Rede Unishop perto de você.
                      </p>
                    )}

                    {slide.cta ? (
                      <Link
                        href={slide.cta.href}
                        tabIndex={active ? 0 : -1}
                        className={`group mt-7 inline-flex min-h-13 items-center gap-3 rounded-full px-5 text-sm font-black shadow-[0_16px_38px_rgba(0,35,76,0.18)] transition duration-300 hover:-translate-y-1 ${
                          slide.darkText
                            ? "bg-[#07396e] text-white hover:bg-[#0a4b91]"
                            : "bg-[#ffc928] text-[#07396e] hover:bg-[#ffda55]"
                        }`}
                      >
                        {slide.cta.label}
                        <ArrowRight
                          size={17}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </Link>
                    ) : null}
                  </div>
                </div>

                <div
                  className={`hero-slide-visual relative min-h-0 self-stretch ${
                    slide.visual === "partner"
                      ? "lg:order-1"
                      : slide.reverse
                        ? "lg:order-1"
                        : ""
                  }`}
                >
                  <SlideVisual visual={slide.visual} active={active} />
                </div>
              </div>
                </>
              )}
            </article>
          );
        })}
      </div>

      <button
        type="button"
        onClick={previousSlide}
        aria-label="Banner anterior"
        className={`group absolute left-0 top-1/2 z-50 grid h-20 w-11 -translate-y-1/2 place-items-center rounded-r-full border border-l-0 backdrop-blur-sm transition duration-300 hover:w-13 ${
          slides[activeSlide].darkText
            ? "border-[#07396e]/15 bg-white/12 text-[#07396e]/55 hover:bg-white/22 hover:text-[#07396e]"
            : "border-white/10 bg-[#031a43]/12 text-white/50 hover:bg-[#031a43]/28 hover:text-white"
        }`}
      >
        <ChevronLeft size={22} className="transition-transform group-hover:-translate-x-0.5" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Próximo banner"
        className={`group absolute right-0 top-1/2 z-50 grid h-20 w-11 -translate-y-1/2 place-items-center rounded-l-full border border-r-0 backdrop-blur-sm transition duration-300 hover:w-13 ${
          slides[activeSlide].darkText
            ? "border-[#07396e]/15 bg-white/12 text-[#07396e]/55 hover:bg-white/22 hover:text-[#07396e]"
            : "border-white/10 bg-[#031a43]/12 text-white/50 hover:bg-[#031a43]/28 hover:text-white"
        }`}
      >
        <ChevronRight size={22} className="transition-transform group-hover:translate-x-0.5" />
      </button>
    </section>
  );
}
