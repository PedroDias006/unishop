"use client";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
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
  },
  {
    id: "lojas",
    eyebrow: "Presença que aproxima",
    title: "Uma loja.",
    accent: "Mil soluções.",
    description:
      "Um espaço completo, atendimento próximo e orientação para escolher melhor.",
    cta: { label: "Encontrar uma loja", href: "/lojas" },
    visual: "store",
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
  },
  {
    id: "parceria",
    eyebrow: "Empreenda com suporte",
    title: "Seu negócio.",
    accent: "Nossa força.",
    description:
      "Modelo estruturado, portfólio amplo e acompanhamento para você crescer com segurança.",
    cta: { label: "Quero ser parceiro", href: "/seja-parceiro" },
    visual: "partner",
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
        <div className="absolute -right-[18%] top-[4%] aspect-square w-[85%] rounded-full bg-[#ffc928] sm:-right-[10%] sm:top-[-4%] lg:-right-[12%] lg:w-[82%]" />
        <div className="absolute inset-x-[1%] bottom-[2%] top-[8%] overflow-hidden rounded-[42px_150px_42px_42px] border-[8px] border-[#f8d03e] shadow-[0_32px_70px_rgba(0,15,44,0.35)] sm:inset-x-[4%] sm:rounded-[54px_190px_54px_54px] lg:inset-x-[2%] lg:bottom-[5%] lg:top-[6%]">
          <Image
            src="/images/hero/loja-unishop-conceito.png"
            alt="Conceito de uma loja contemporânea da Rede Unishop"
            fill
            sizes="(max-width: 1024px) 100vw, 820px"
            className="object-cover object-[56%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#031b48]/25 via-transparent to-white/5" />
        </div>
        <div className="absolute bottom-[4%] left-[-2%] size-24 rounded-full border-[18px] border-[#e8f5fc]/85 sm:size-32 sm:border-[24px] lg:bottom-[7%]" />
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
        <div className="absolute -right-[18%] -top-[12%] aspect-square w-[92%] rounded-full bg-[#ffc928] sm:-right-[10%] lg:-right-[7%] lg:w-[88%]" />
        <div className="absolute inset-x-[7%] bottom-[2%] top-[5%] overflow-hidden rounded-[180px_44px_44px_44px] border border-white/35 bg-[#dcecf5] shadow-[0_32px_74px_rgba(0,14,42,0.34)] sm:inset-x-[12%] sm:rounded-[230px_52px_52px_52px] lg:inset-x-[10%] lg:bottom-[4%]">
          <Image
            src="/images/hero/empreendedora-unishop.png"
            alt="Empreendedora em uma loja de soluções de limpeza e utilidades"
            fill
            sizes="(max-width: 1024px) 100vw, 760px"
            className="object-cover object-[55%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#031b48]/20 via-transparent to-white/5" />
        </div>
        <div className="absolute bottom-[1%] right-[3%] h-16 w-[46%] rounded-t-full bg-[#bdd8e8] sm:h-20 lg:bottom-[3%]" />
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
    }, 7000);

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
      <div className="hero-atmosphere pointer-events-none absolute inset-0 -z-20" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#031637]/35 to-transparent" />

      <div aria-live={paused ? "polite" : "off"} className="absolute inset-0">
        {slides.map((slide, index) => {
          const active = activeSlide === index;

          return (
            <article
              key={slide.id}
              aria-hidden={!active}
              aria-label={`${index + 1} de ${slides.length}`}
              aria-roledescription="slide"
              className={`hero-slide absolute inset-0 ${active ? "hero-slide-active" : ""}`}
            >
              <div className="mx-auto grid h-full w-full max-w-[1440px] grid-rows-[auto_1fr] px-5 pb-[82px] pt-[114px] sm:px-8 sm:pb-[92px] sm:pt-[128px] lg:grid-cols-[0.78fr_1.22fr] lg:grid-rows-1 lg:px-10 lg:pb-[76px] lg:pt-[116px] xl:px-12">
                <div className="hero-slide-copy relative z-30 flex items-center pb-6 pt-6 sm:pb-8 lg:pb-8 lg:pt-4">
                  <div className="max-w-[610px]">
                    {slide.eyebrow ? (
                      <p className="mb-5 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.22em] text-[#ffdc69] sm:text-xs">
                        <span className="h-px w-8 bg-[#ffc928]" />
                        {slide.eyebrow}
                      </p>
                    ) : null}

                    <h1 className="text-[clamp(3.35rem,6vw,6.35rem)] font-black leading-[0.86] tracking-[-0.065em] text-white">
                      {slide.title}
                      <span className="mt-2 block text-[#ffc928] sm:mt-3">
                        {slide.accent}
                      </span>
                    </h1>

                    {slide.description ? (
                      <p className="mt-6 max-w-[510px] text-sm font-semibold leading-6 text-[#dceafa]/72 sm:text-lg sm:leading-8">
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
                        className="group mt-7 inline-flex min-h-13 items-center gap-3 rounded-full bg-[#ffc928] px-5 text-sm font-black text-[#07396e] shadow-[0_16px_38px_rgba(226,169,0,0.22)] transition duration-300 hover:-translate-y-1 hover:bg-[#ffda55]"
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

                <div className="hero-slide-visual relative min-h-0 self-stretch">
                  <SlideVisual visual={slide.visual} active={active} />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="absolute inset-x-4 bottom-4 z-50 mx-auto flex max-w-max items-center rounded-full border border-white/15 bg-[#061d48]/72 p-1.5 shadow-[0_16px_40px_rgba(0,12,34,0.28)] backdrop-blur-xl sm:bottom-5">
        <button
          type="button"
          onClick={previousSlide}
          aria-label="Banner anterior"
          className="grid size-10 place-items-center rounded-full text-white/72 transition hover:bg-white/10 hover:text-white"
        >
          <ChevronLeft size={19} />
        </button>

        <div className="mx-1 flex items-center gap-1" role="group" aria-label="Escolher banner">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Ir para o banner ${index + 1}`}
              aria-current={activeSlide === index ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-500 ${
                activeSlide === index
                  ? "w-8 bg-[#ffc928]"
                  : "w-2 bg-white/30 hover:bg-white/55"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setPaused((current) => !current)}
          aria-label={paused ? "Retomar rotação automática" : "Pausar rotação automática"}
          className="ml-1 grid size-10 place-items-center rounded-full text-white/72 transition hover:bg-white/10 hover:text-white"
        >
          {paused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Próximo banner"
          className="grid size-10 place-items-center rounded-full text-white/72 transition hover:bg-white/10 hover:text-white"
        >
          <ChevronRight size={19} />
        </button>
      </div>
    </section>
  );
}
