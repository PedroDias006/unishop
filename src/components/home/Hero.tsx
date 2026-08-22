"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

/**
 * `mobile` descreve o banner na versão de telefone, onde o layout é outro.
 *
 * As artes são 3:1 (2172x724). Empilhadas num retrato de 375px elas perdiam
 * ~80% da largura e o assunto sumia, então no telefone a foto vira uma faixa
 * no topo e o texto desce para um painel azul — sempre com a mesma anatomia
 * (olho, título, apoio, botão), o que dá coerência entre os cinco banners.
 *
 * `focus` é o object-position da faixa. O valor sai do ponto onde está o
 * assunto de cada arte: loja ~62% da largura, indústria ~80%, parceria ~28%
 * (pessoa à esquerda) e profissional ~83%.
 *
 * `facts` são os três dados que aparecem abaixo do botão. Existem porque o
 * banner sozinho só dizia uma frase de efeito: quem chegava rolava a página
 * inteira sem descobrir o tamanho da rede, o preço de entrada ou o que a loja
 * vende. Todos saem de `docs/conteudo-fontes.md` — nenhum é estimativa.
 */
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
    // Azul de marca (#1150a4, o mesmo `--brand-blue-800`) no lugar do
    // quase-preto: é o tom que a Start usa nos banners institucionais. Cobre a
    // faixa de 88px atrás da navbar, que é onde este valor aparece.
    background: "bg-[#1150a4]",
    darkText: false,
    reverse: false,
    fullImage: "/images/hero/fundo.webp",
    fullHref: "/produtos",
    fullAlt: "Produtos Azulim, Tuff, Asseptgel, Start Pro e Pedrex sobre uma bancada",
    facts: [
      { value: "+2.000", label: "itens no mix de produtos" },
      { value: "5 marcas", label: "Azulim, Tuff, Asseptgel, Start PRO e Pedrex" },
      { value: "Da casa à indústria", label: "no mesmo balcão" },
    ],
    mobile: {
      focus: "object-[55%_center]",
      eyebrow: "Para casa e para o seu negócio",
      lead: "Mais cuidado.",
      accent: "Menos complicação.",
      tail: null,
      text: "Limpeza, higiene e descartáveis das marcas que você já conhece, com orientação de quem entende.",
      cta: { label: "Conhecer os produtos", href: "/produtos" },
    },
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
    fullImage: "/images/hero/banner-loja-informacoes-v2.webp",
    fullHref: "/modelo-de-negocio",
    fullAlt: "Transforme sua loja em uma Unishop",
    facts: [
      { value: "Sem royalties", label: "nem taxa de franquia, nem mensalidade" },
      { value: "3 formatos", label: "de 50 m² a 100 m² ou mais" },
      { value: "Marketing incluso", label: "fachada, PDV e campanhas mensais" },
    ],
    mobile: {
      focus: "object-[74%_center]",
      eyebrow: "Transforme sua loja",
      lead: "Em uma",
      accent: "Unishop!",
      tail: null,
      text: "Limpeza, descartáveis, EPIs, utilidades e embalagens para ampliar suas vendas com suporte completo.",
      cta: { label: "Saiba mais", href: "/modelo-de-negocio" },
    },
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
    fullImage: "/images/hero/banner-industria-base-v2.webp",
    fullHref: "/sobre",
    fullAlt: "Estrutura da indústria e distribuição da Rede Unishop",
    facts: [
      { value: "Desde 1987", label: "fábrica própria em Uberlândia (MG)" },
      { value: "+500 lojas", label: "em 27 estados brasileiros" },
      { value: "Lima & Pergher", label: "entre as 10 maiores do setor no país" },
    ],
    mobile: {
      focus: "object-[100%_center]",
      eyebrow: "Da origem à entrega",
      lead: "Estrutura que",
      accent: "inspira confiança.",
      tail: null,
      text: "Uma operação integrada para levar qualidade e variedade a todo o Brasil.",
      cta: { label: "Conhecer a Unishop", href: "/sobre" },
    },
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
    fullImage: "/images/hero/banner-parceria-informacoes-v2.webp",
    fullHref: "/seja-parceiro",
    fullAlt: "Oportunidade de faturamento com limpeza e higienização",
    facts: [
      { value: "18 a 24 meses", label: "de retorno do investimento" },
      { value: "Até 20%", label: "de lucro líquido" },
      { value: "Estoque inicial", label: "e documentação inclusos no valor" },
    ],
    mobile: {
      focus: "object-[10%_center]",
      eyebrow: "Oportunidade de negócio",
      lead: "Fature até",
      accent: "R$120 mil",
      tail: "por mês com limpeza e higienização",
      text: "Invista a partir de R$60 mil e tenha suporte completo para começar.",
      cta: { label: "Quero conhecer", href: "/seja-parceiro" },
    },
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
    fullImage: "/images/hero/banner-solucoes-profissionais-v1.webp",
    fullHref: "/produtos",
    fullAlt: "Soluções profissionais para limpeza de alta performance",
    facts: [
      { value: "53 tipos", label: "de operação atendidos" },
      { value: "Orientação técnica", label: "do produto à forma de aplicar" },
      { value: "Linha Start PRO", label: "piso, predial e alimentícia" },
    ],
    mobile: {
      focus: "object-[100%_center]",
      eyebrow: "Soluções profissionais",
      lead: "Performance",
      accent: "para quem faz.",
      tail: null,
      text: "Produtos, equipamentos e orientação para operações que exigem eficiência todos os dias.",
      cta: { label: "Explorar soluções", href: "/produtos" },
    },
  },
] as const;

type HeroFact = { value: string; label: string };

/**
 * A faixa de dados que fecha cada banner. Em tela larga os três ficam lado a
 * lado separados por um filete; no telefone viram duas colunas para não
 * espremer a linha em três palavras cada.
 *
 * `tone` existe por causa do banner amarelo: lá o texto branco sumiria, então
 * a mesma faixa inverte para azul-marinho.
 */
function HeroFacts({
  facts,
  tone = "light",
  stacked = false,
  className = "",
}: {
  facts: readonly HeroFact[];
  tone?: "light" | "dark";
  /** Para a coluna estreita do banner de parceria, onde os três lado a lado
   *  virariam três palavras espremidas. */
  stacked?: boolean;
  className?: string;
}) {
  const divider = tone === "dark" ? "sm:border-[#07396e]/20" : "sm:border-white/20";
  const value = tone === "dark" ? "text-[#052d64]" : "text-white";
  const label = tone === "dark" ? "text-[#07396e]/70" : "text-white/60";

  if (stacked) {
    return (
      <dl className={`space-y-2.5 ${className}`}>
        {facts.map((fact) => (
          <div key={fact.value} className="flex items-baseline gap-2.5">
            <dt
              className={`shrink-0 text-[13px] font-black uppercase leading-tight ${value}`}
            >
              {fact.value}
            </dt>
            <dd className={`text-[11px] font-semibold leading-[1.35] ${label}`}>
              {fact.label}
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <dl className={`grid grid-cols-2 gap-x-4 gap-y-4 sm:flex sm:flex-wrap sm:gap-x-0 sm:gap-y-3 ${className}`}>
      {facts.map((fact, index) => (
        <div
          key={fact.value}
          className={`sm:max-w-[186px] sm:px-5 sm:first:pl-0 ${
            index > 0 ? `sm:border-l ${divider}` : ""
          } ${index === 2 ? "max-sm:col-span-2" : ""}`}
        >
          <dt
            className={`text-[13px] font-black uppercase leading-tight tracking-[-0.01em] ${value} sm:text-sm`}
          >
            {fact.value}
          </dt>
          <dd className={`mt-1 text-[11px] font-semibold leading-[1.3] ${label} sm:text-xs`}>
            {fact.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  // Só os banners já visitados existem no DOM. Sem isso, os cinco banners de
  // tela cheia baixavam juntos no primeiro acesso e disputavam o LCP.
  const [mountedSlides, setMountedSlides] = useState<readonly number[]>([0]);
  const pointerStart = useRef<number | null>(null);

  function mountSlide(index: number) {
    setMountedSlides((current) =>
      current.includes(index) ? current : [...current, index],
    );
  }

  function goToSlide(index: number) {
    const target = (index + slides.length) % slides.length;
    mountSlide(target);
    setActiveSlide(target);
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
    // O banner seguinte entra quando o navegador fica ocioso, para que a troca
    // automática não comece com o quadro vazio.
    const next = (activeSlide + 1) % slides.length;
    const prepare = () => mountSlide(next);

    const idle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(prepare, { timeout: 3000 })
        : window.setTimeout(prepare, 1800);

    return () => {
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idle as number);
      } else {
        window.clearTimeout(idle as number);
      }
    };
  }, [activeSlide]);

  useEffect(() => {
    if (paused || interacting) return;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => {
        const next = (current + 1) % slides.length;
        mountSlide(next);
        return next;
      });
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
      // 86svh (e não 100vh) deixa a próxima seção despontar por baixo, que é o
      // que avisa ao visitante de telefone que a página continua. `svh` evita o
      // salto de altura quando a barra do navegador móvel recolhe.
      //
      // O piso subiu de 600px para 700px quando a faixa de dados entrou: num
      // aparelho de 640px de altura o painel de texto passou a medir ~465px e,
      // somado à faixa da foto (120px) e ao topo (88px), não cabia em 600 — o
      // botão e os dados eram cortados pelo `overflow-hidden` do slide.
      className="relative isolate min-h-[max(700px,86svh)] touch-pan-y overflow-hidden bg-[#041b49] text-white md:min-h-[920px] lg:min-h-[760px]"
    >
      <div aria-live={paused ? "polite" : "off"} className="absolute inset-0">
        {slides.map((slide, index) => {
          const active = activeSlide === index;
          const mounted = mountedSlides.includes(index);
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
              {/* ============================ TELEFONE ============================
                  Foto em faixa no topo + painel de texto embaixo. Os cinco
                  banners usam exatamente esta anatomia; só a arte e as palavras
                  mudam. */}
              {/* O painel acompanha a cor do próprio banner. Sem isto, o
                  primeiro slide ficaria com a faixa do topo em azul de marca e
                  o painel de texto em azul quase preto, com a emenda à vista. */}
              <div
                className={`absolute inset-x-0 bottom-0 top-[88px] flex flex-col md:hidden ${
                  slide.id === "produtos" ? "bg-[#1150a4]" : "bg-[#04193f]"
                }`}
              >
                {/* A faixa é quem absorve a sobra de altura (`flex-1`), e o
                    texto ocupa o que precisa. Com a faixa em porcentagem fixa,
                    num aparelho de 640px o botão caía para fora da seção. */}
                <div className="relative min-h-[120px] flex-1 overflow-hidden">
                  {mounted ? (
                    <Image
                      src={slide.fullImage}
                      alt=""
                      aria-hidden="true"
                      fill
                      priority={index === 0}
                      sizes="100vw"
                      className={`select-none object-cover ${slide.mobile.focus}`}
                    />
                  ) : null}

                  {/* A vitrine das cinco marcas é o assunto do primeiro banner:
                      no telefone ela se apoia na base da faixa. */}
                  {slide.id === "produtos" && mounted ? (
                    <Image
                      src="/images/hero/vitrine-marcas.webp"
                      alt={slide.fullAlt}
                      width={3651}
                      height={976}
                      priority
                      sizes="120vw"
                      className="absolute bottom-3 left-1/2 h-auto w-[120%] max-w-none -translate-x-1/2 select-none"
                    />
                  ) : null}

                  <div
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-0 h-24 ${
                      slide.id === "produtos"
                        ? "bg-[linear-gradient(180deg,rgba(17,80,164,0)_0%,rgba(17,80,164,0.72)_55%,#1150a4_100%)]"
                        : "bg-[linear-gradient(180deg,rgba(4,25,63,0)_0%,rgba(4,25,63,0.72)_55%,#04193f_100%)]"
                    }`}
                  />
                </div>

                {/* pb-20 reserva a faixa do marcador: com padding menor, num
                    aparelho de 640px o botão encostava nas bolinhas. */}
                <div className="hero-slide-copy relative z-10 flex shrink-0 flex-col px-5 pb-16 sm:px-8">
                  <p className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.22em] text-[#ffdc69]">
                    <span aria-hidden="true" className="h-px w-7 shrink-0 bg-[#ffc928]" />
                    {slide.mobile.eyebrow}
                  </p>

                  <h1 className="mt-4 text-[clamp(1.9rem,8.8vw,2.45rem)] font-black uppercase leading-[0.9] tracking-[-0.045em] text-white">
                    {slide.mobile.lead}
                    <span className="mt-1 block text-[#ffc928]">
                      {slide.mobile.accent}
                    </span>
                    {slide.mobile.tail ? (
                      <span className="mt-2 block text-[clamp(1rem,4.4vw,1.3rem)] leading-[1.15] tracking-[-0.02em]">
                        {slide.mobile.tail}
                      </span>
                    ) : null}
                  </h1>

                  <p className="mt-3.5 text-[14px] font-medium leading-[1.45] text-white/75">
                    {slide.mobile.text}
                  </p>

                  <Link
                    href={slide.mobile.cta.href}
                    tabIndex={active ? 0 : -1}
                    className="mt-5 inline-flex min-h-12 w-fit items-center gap-3 rounded-full bg-[#ffc928] px-6 text-sm font-black uppercase text-[#07396e] shadow-[0_14px_34px_rgba(227,164,0,0.28)]"
                  >
                    {slide.mobile.cta.label}
                    <ArrowRight size={17} />
                  </Link>

                  <HeroFacts
                    facts={slide.facts}
                    className="mt-5 border-t border-white/12 pt-4"
                  />
                </div>
              </div>

              {/* ======================== TABLET E DESKTOP ======================== */}
              {fullArtwork ? (
                slide.visual === "products" ? (
                  <div className="hidden absolute inset-x-0 bottom-0 top-[88px] bg-[#1150a4] sm:top-[96px] md:block">
                    {mounted ? (
                      <Image
                        src={fullArtwork.image}
                        alt=""
                        aria-hidden="true"
                        fill
                        priority
                        sizes="100vw"
                        className="select-none object-cover object-[60%_center]"
                      />
                    ) : null}

                    {/* Degradê azul à esquerda: é o que deixa o amarelo da
                        marca chapado e legível, como nos outros banners. Sobre
                        a bancada clara o mesmo amarelo daria 1,6:1; sobre este
                        azul dá 5:1, e o branco do título, 7,7:1. */}
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,80,164,0.94)_0%,rgba(17,80,164,0.76)_40%,rgba(17,80,164,0.12)_74%)] sm:bg-[linear-gradient(90deg,rgba(17,80,164,0.96)_0%,rgba(17,80,164,0.89)_30%,rgba(17,80,164,0.38)_56%,rgba(17,80,164,0)_74%)]" />

                    {/* A vitrine com as cinco marcas, apoiada na bancada */}
                    <div className="absolute inset-x-0 bottom-[4%] z-10 sm:bottom-[5%] lg:bottom-[2%]">
                      {mounted ? (
                        <Image
                          src="/images/hero/vitrine-marcas.webp"
                          alt={fullArtwork.alt}
                          width={3651}
                          height={976}
                          priority
                          sizes="(max-width: 640px) 124vw, (max-width: 1024px) 96vw, (max-width: 1600px) 76vw, 1060px"
                          // O teto em px impede que a vitrine cresça até
                          // encostar no título em telas largas: o título para
                          // de crescer (max-w-[620px]) mas 76vw não.
                          className="ml-auto h-auto w-[124%] max-w-none translate-x-[10%] select-none sm:w-[96%] sm:translate-x-0 lg:w-[76%] lg:max-w-[1060px]"
                        />
                      ) : null}
                    </div>

                    {/* A cópia fica na parte de cima e a vitrine ocupa a
                        bancada embaixo: assim as duas não disputam espaço e os
                        produtos podem ser bem maiores. */}
                    <div className="absolute inset-0 mx-auto flex w-full max-w-[1728px] items-start px-5 pt-9 sm:px-[5.5%] sm:pt-[6%] lg:px-[3.4%] lg:pt-[5%] xl:px-[2.8%]">
                      <div className="hero-slide-copy relative z-20 w-full sm:w-[52%] sm:max-w-[620px]">
                        <p className="mb-5 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.22em] text-[#ffdc69] sm:text-xs lg:text-sm">
                          <span aria-hidden="true" className="h-px w-8 bg-[#ffc928]" />
                          Para casa e para o seu negócio
                        </p>

                        {/* O título encolheu de 5,75rem para 4,75rem: era ele
                            que empurrava o texto de apoio e a faixa de dados
                            para fora do quadro. */}
                        <h1 className="text-[clamp(2.5rem,4.2vw,4.75rem)] font-black uppercase leading-[0.88] tracking-[-0.055em] text-white">
                          Mais cuidado.
                          <span className="mt-2 block text-[#ffc928]">
                            Menos complicação.
                          </span>
                        </h1>

                        <p className="mt-5 max-w-[520px] text-sm font-semibold leading-6 text-white/78 lg:text-base lg:leading-7">
                          Limpeza, higiene, assepsia e descartáveis das marcas
                          que você já conhece — com quem sabe indicar o produto
                          certo e a forma correta de aplicar.
                        </p>

                        <Link
                          href={fullArtwork.href}
                          tabIndex={active ? 0 : -1}
                          className="group mt-7 inline-flex min-h-13 items-center gap-3 rounded-full bg-[#ffc928] px-6 text-sm font-black uppercase text-[#07396e] shadow-[0_14px_34px_rgba(227,164,0,0.28)] transition duration-300 hover:-translate-y-1 hover:bg-[#ffda55]"
                        >
                          Conhecer os produtos
                          <ArrowRight
                            size={17}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </Link>

                        <HeroFacts
                          facts={slide.facts}
                          className="mt-7 border-t border-white/14 pt-5"
                        />
                      </div>
                    </div>
                  </div>
                ) : slide.visual === "store" ? (
                  <div className="hidden absolute inset-x-0 bottom-0 top-[88px] bg-[#020c28] sm:top-[96px] md:block">
                    {mounted ? (
                      <Image
                        src={fullArtwork.image}
                        alt="Conceito de loja da Rede Unishop"
                        fill
                        sizes="100vw"
                        className="select-none object-cover object-center"
                      />
                    ) : null}

                    <div className="absolute inset-0 mx-auto flex w-full max-w-[1728px] items-center px-[6.2%]">
                      <div className="hero-slide-copy relative z-20 w-[45%] max-w-[640px]">
                        <p className="mb-5 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.22em] text-[#ffdc69] sm:text-xs lg:text-sm">
                          <span className="h-px w-8 bg-[#ffc928]" />
                          Transforme sua loja
                        </p>

                        <h1 className="text-[clamp(2.4rem,4vw,4.6rem)] font-black uppercase leading-[0.86] tracking-[-0.055em] text-white">
                          Em uma
                          <span className="mt-2 block text-[#ffc928] sm:mt-3">
                            Unishop!
                          </span>
                        </h1>

                        <p className="mt-6 max-w-[520px] text-sm font-semibold leading-6 text-white/78 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
                          Limpeza, descartáveis, EPIs, utilidades e embalagens — aumente suas vendas com um modelo rentável e suporte completo.
                        </p>

                        <Link
                          href={fullArtwork.href}
                          tabIndex={active ? 0 : -1}
                          className="group mt-7 inline-flex min-h-13 items-center gap-4 rounded-full bg-[#ffc928] px-6 text-sm font-black uppercase text-[#07396e] shadow-[0_14px_34px_rgba(227,164,0,0.28)] transition hover:-translate-y-1 hover:bg-[#ffda55]"
                        >
                          Saiba mais
                          <ArrowRight
                            size={18}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </Link>

                        <HeroFacts
                          facts={slide.facts}
                          className="mt-7 border-t border-white/14 pt-5"
                        />
                      </div>
                    </div>
                  </div>
                ) : slide.visual === "industry" ? (
                  <div className="hidden absolute inset-x-0 bottom-0 top-[88px] bg-[#020c28] sm:top-[96px] md:block">
                    {mounted ? (
                      <Image
                        src={fullArtwork.image}
                        alt="Moldura institucional da Rede Unishop"
                        fill
                        sizes="100vw"
                        className="select-none object-cover object-center"
                      />
                    ) : null}

                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,18,60,0.92)_0%,rgba(1,25,76,0.72)_46%,rgba(1,20,61,0.08)_78%)] sm:hidden" />

                    <div className="absolute inset-0 mx-auto flex w-full max-w-[2048px] items-center px-5 sm:px-[5.5%] lg:px-[6.2%]">
                      <div className="hero-slide-copy relative z-20 w-full text-center sm:w-[34%] sm:max-w-[610px] sm:text-left">
                        <p className="mb-4 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.24em] text-[#ffdc69] sm:justify-start sm:text-xs lg:text-sm">
                          <span className="h-px w-8 bg-[#ffc928]" />
                          Da origem à entrega
                        </p>

                        <h1 className="text-[clamp(2.4rem,3.9vw,4.6rem)] font-black uppercase leading-[0.88] tracking-[-0.055em] text-white drop-shadow-[0_3px_16px_rgba(0,0,0,0.24)]">
                          Estrutura que
                          <span className="mt-2 block text-[#ffc928]">
                            inspira confiança.
                          </span>
                        </h1>

                        <p className="mx-auto mt-5 max-w-[520px] text-sm font-semibold leading-6 text-white/82 sm:mx-0 sm:text-base sm:leading-7 lg:mt-6 lg:text-lg lg:leading-8">
                          Uma operação integrada para levar qualidade, variedade e eficiência a todo o Brasil.
                        </p>

                        <Link
                          href={fullArtwork.href}
                          tabIndex={active ? 0 : -1}
                          className="group mt-6 inline-flex min-h-12 items-center gap-4 rounded-full bg-[#ffc928] px-6 text-xs font-black uppercase text-[#07396e] shadow-[0_14px_34px_rgba(227,164,0,0.28)] transition hover:-translate-y-1 hover:bg-[#ffda55] lg:text-sm"
                        >
                          Conhecer a Unishop
                          <ArrowRight
                            size={18}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </Link>

                        <HeroFacts
                          facts={slide.facts}
                          className="mt-7 border-t border-white/14 pt-5 text-left"
                        />
                      </div>
                    </div>
                  </div>
                ) : slide.visual === "professional" ? (
                  <div className="hidden absolute inset-x-0 bottom-0 top-[88px] bg-[#fdbd08] sm:top-[96px] md:block">
                    {mounted ? (
                      <Image
                        src={fullArtwork.image}
                        alt="Profissional realizando limpeza técnica com equipamento especializado"
                        fill
                        sizes="100vw"
                        className="select-none object-cover object-center"
                      />
                    ) : null}

                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,194,24,0.95)_0%,rgba(255,194,24,0.88)_48%,rgba(4,28,73,0.4)_100%)] sm:hidden" />

                    <div className="absolute inset-0 mx-auto flex w-full max-w-[2048px] items-center px-5 sm:px-[5.5%] lg:px-[6.2%]">
                      <div className="hero-slide-copy relative z-20 w-full text-center sm:w-[35%] sm:max-w-[620px] sm:text-left">
                        <p className="mb-4 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.24em] text-[#07396e]/75 sm:justify-start sm:text-xs lg:text-sm">
                          <span className="h-px w-8 bg-[#07396e]/55" />
                          Soluções profissionais
                        </p>

                        <h1 className="text-[clamp(2.5rem,4.1vw,4.8rem)] font-black uppercase leading-[0.86] tracking-[-0.06em] text-[#052d64] drop-shadow-[0_2px_0_rgba(255,255,255,0.16)]">
                          Performance
                          <span className="mt-2 block text-white drop-shadow-[0_3px_10px_rgba(103,67,0,0.22)]">
                            para quem faz.
                          </span>
                        </h1>

                        <p className="mx-auto mt-5 max-w-[540px] text-sm font-bold leading-6 text-[#07396e]/82 sm:mx-0 sm:text-base sm:leading-7 lg:mt-6 lg:text-lg lg:leading-8">
                          Produtos, equipamentos e orientação para operações que exigem eficiência todos os dias.
                        </p>

                        <Link
                          href={fullArtwork.href}
                          tabIndex={active ? 0 : -1}
                          className="group mt-6 inline-flex min-h-12 items-center gap-4 rounded-full bg-[#07396e] px-6 text-xs font-black uppercase text-white shadow-[0_14px_34px_rgba(4,35,76,0.24)] transition hover:-translate-y-1 hover:bg-[#0b4d8f] lg:text-sm"
                        >
                          Explorar soluções
                          <ArrowRight
                            size={18}
                            className="text-[#ffc928] transition-transform group-hover:translate-x-1"
                          />
                        </Link>

                        <HeroFacts
                          facts={slide.facts}
                          tone="dark"
                          className="mt-7 border-t border-[#07396e]/20 pt-5 text-left"
                        />
                      </div>
                    </div>
                  </div>
                ) : slide.visual === "partner" ? (
                  <div className="hidden absolute inset-x-0 bottom-0 top-[88px] bg-[#020c28] sm:top-[96px] md:block">
                    {mounted ? (
                      <Image
                        src={fullArtwork.image}
                        alt="Empreendedora da Rede Unishop em uma operação de limpeza e higienização"
                        fill
                        sizes="100vw"
                        className="select-none object-cover object-[25%_center] sm:object-center"
                      />
                    ) : null}

                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,12,44,0.12)_0%,rgba(1,16,54,0.88)_36%,rgba(1,20,63,0.1)_82%)] sm:hidden" />

                    <div className="absolute inset-0 mx-auto flex w-full max-w-[2048px] items-center px-5 sm:px-8 lg:px-0">
                      <div className="hero-slide-copy relative z-20 w-full text-center sm:ml-[41%] sm:w-[48%] sm:text-left lg:ml-[47%] lg:w-[30%]">
                        <p className="mb-3 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.24em] text-[#ffdc69] sm:justify-start sm:text-xs lg:mb-4 lg:text-sm">
                          <span className="h-px w-8 bg-[#ffc928]" />
                          Oportunidade de negócio
                        </p>

                        <h1 className="font-black uppercase leading-[0.88] tracking-[-0.045em] text-white drop-shadow-[0_3px_16px_rgba(0,0,0,0.28)]">
                          <span className="block text-[clamp(1.4rem,1.95vw,2.5rem)] tracking-[-0.025em]">
                            Fature até
                          </span>
                          <span className="my-1 block text-[clamp(2.8rem,4.3vw,5.2rem)] text-[#ffc928] sm:my-2">
                            R$120 mil
                          </span>
                          <span className="block text-[clamp(1.1rem,1.6vw,2rem)] leading-[1.02] tracking-[-0.02em]">
                            por mês com
                            <span className="mt-1 block">limpeza e higienização</span>
                          </span>
                        </h1>

                        <div className="mx-auto mt-5 max-w-[650px] border-t border-[#ffc928]/70 pt-4 sm:mx-0 lg:mt-7 lg:pt-5">
                          <p className="text-xs font-medium leading-5 text-white/88 sm:text-sm sm:leading-6 lg:text-base lg:leading-7">
                            Invista a partir de <strong className="font-black text-[#ffc928]">R$60 mil</strong> e tenha suporte completo para começar.
                          </p>

                          <Link
                            href={fullArtwork.href}
                            tabIndex={active ? 0 : -1}
                            className="group mt-4 inline-flex min-h-11 items-center gap-3 rounded-full bg-[#ffc928] px-5 text-xs font-black uppercase text-[#07396e] shadow-[0_12px_30px_rgba(227,164,0,0.28)] transition hover:-translate-y-1 hover:bg-[#ffda55] lg:mt-5 lg:min-h-12 lg:px-6 lg:text-sm"
                          >
                            Quero conhecer
                            <ArrowRight
                              size={18}
                              className="transition-transform group-hover:translate-x-1"
                            />
                          </Link>

                          <HeroFacts
                            facts={slide.facts}
                            stacked
                            className="mt-5 text-left"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={fullArtwork.href}
                    tabIndex={active ? 0 : -1}
                    aria-label={fullArtwork.alt}
                    className="hidden absolute inset-x-0 bottom-0 top-[88px] bg-[#020c28] sm:top-[96px] md:block"
                  >
                    {mounted ? (
                      <Image
                        src={fullArtwork.image}
                        alt={fullArtwork.alt}
                        fill
                        sizes="100vw"
                        className="select-none object-contain object-center"
                      />
                    ) : null}
                  </Link>
                )
              ) : null}
            </article>
          );
        })}
      </div>

      <button
        type="button"
        onClick={previousSlide}
        aria-label="Banner anterior"
        className={`group absolute left-0 top-1/2 z-50 hidden h-20 w-11 -translate-y-1/2 place-items-center rounded-r-full border border-l-0 backdrop-blur-sm transition duration-300 hover:w-13 md:grid ${
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
        className={`group absolute right-0 top-1/2 z-50 hidden h-20 w-11 -translate-y-1/2 place-items-center rounded-l-full border border-r-0 backdrop-blur-sm transition duration-300 hover:w-13 md:grid ${
          slides[activeSlide].darkText
            ? "border-[#07396e]/15 bg-white/12 text-[#07396e]/55 hover:bg-white/22 hover:text-[#07396e]"
            : "border-white/10 bg-[#031a43]/12 text-white/50 hover:bg-[#031a43]/28 hover:text-white"
        }`}
      >
        <ChevronRight size={22} className="transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* No telefone as setas laterais cobriam o texto, então a navegação vira
          um marcador embaixo — que também revela que existem cinco banners. */}
      <div className="absolute inset-x-0 bottom-3 z-50 flex justify-center gap-2 md:hidden">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goToSlide(index)}
            aria-label={`Ir para o banner ${index + 1}: ${slide.mobile.eyebrow}`}
            aria-current={index === activeSlide}
            className="grid h-11 w-7 place-items-center"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                index === activeSlide ? "w-7 bg-[#ffc928]" : "w-3 bg-white/35"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
