"use client";

import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Droplet,
  CheckCircle2,
  Package,
  Leaf,
  Heart,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

// Dados focados na Linha Completa
export const lines = [
  {
    brand: "Azulim",
    eyebrow: "DESINFECÇÃO E PERFUME PARA TODA A CASA",
    titlePrefix: "A Linha Completa",
    titleSuffix: "de",
    titleHighlight: "Limpeza e Desinfecção",
    subtitle: "FAMÍLIA DE PRODUTOS AZULIM",
    description: "Do desinfetante perfumado ao limpador multiuso, a Azulim elimina 99,9% das bactérias e deixa cada ambiente da casa com aquele cheirinho de limpeza que dura o dia inteiro.",
    image: "/images/produtos-showcase/clorogel.webp",
    background: "/images/produtos-showcase/azulim-fundo.webp",
    logo: "/images/marcas/azulim.webp",
    href: "https://www.startquimica.com.br/pt-BR/nossas-marcas/azulim",

    accentColor: "#0ea5e9",
    badge: "Elimina 99,9% das Bactérias",

    features: [
      { icon: Sparkles, text: "Elimina 99,9%\ndas Bactérias" },
      { icon: Droplet, text: "Perfume\nDuradouro" },
      { icon: ShieldCheck, text: "Desinfecção\nComprovada" },
      { icon: Package, text: "Rende até\n30 Litros" },
    ],

    stats: [
      { value: "99,9%", label: "DE BACTÉRIAS ELIMINADAS" },
      { value: "30 Litros", label: "DE RENDIMENTO DILUÍDO" },
      { text: "VÁRIAS\nFRAGRÂNCIAS" },
    ],

    footerChecks: [
      { icon: CheckCircle2, text: "ALTA PERFORMANCE" },
      { icon: Leaf, text: "FÓRMULA TESTADA" },
      { icon: Heart, text: "CUIDA DA SUA CASA" },
    ]
  },
  {
    brand: "Tuff",
    eyebrow: "CUIDADO COMPLETO PARA SUAS ROUPAS",
    titlePrefix: "A Linha Definitiva",
    titleSuffix: "de",
    titleHighlight: "Limpeza e Cuidado",
    subtitle: "FAMÍLIA DE PRODUTOS TUFF",
    description: "A combinação perfeita para roupas impecáveis. Do lava-roupas em pó ao amaciante concentrado e tira-manchas, tenha o poder máximo de limpeza e perfume na sua rotina.",
    image: "/images/produtos-showcase/tuff-linha.webp",
    background: "/images/produtos-showcase/tuff-fundo.webp",
    logo: "/images/marcas/tuff.webp",
    href: "https://www.startquimica.com.br/pt-BR/nossas-marcas/tuff",

    accentColor: "#0756c9",
    badge: "Solução Completa",

    features: [
      { icon: Sparkles, text: "Limpeza\nProfunda" },
      { icon: ShieldCheck, text: "Proteção\ndas Fibras" },
      { icon: Droplet, text: "Fórmulas\nConcentradas" },
      { icon: Package, text: "Rendimento\nMáximo" },
    ],

    stats: [
      { value: "+ Eficiência", label: "NA REMOÇÃO DE MANCHAS" },
      { value: "100%", label: "CUIDADO COM AS CORES" },
      { text: "PERFUME\nDURADOURO" },
    ],

    footerChecks: [
      { icon: CheckCircle2, text: "ALTA PERFORMANCE" },
      { icon: Leaf, text: "FÓRMULAS EFICIENTES" },
      { icon: Heart, text: "CUIDA DAS SUAS ROUPAS" },
    ]
  },
  {
    brand: "Asseptgel",
    eyebrow: "HIGIENIZAÇÃO DE MÃOS E SUPERFÍCIES",
    titlePrefix: "Proteção Completa",
    titleSuffix: "em",
    titleHighlight: "Higiene e Antissepsia",
    subtitle: "FAMÍLIA DE PRODUTOS ASSEPTGEL",
    description: "Álcool gel, espuma antisséptica e lenços umedecidos com álcool 70% e clorexidina. A linha ideal para manter mãos e ambientes protegidos em casa, no comércio ou na indústria.",
    image: "/images/produtos-showcase/asseptgel.webp",
    background: "/images/produtos-showcase/assept-fundo.webp",
    logo: "/images/marcas/assept.webp",
    href: "https://www.startquimica.com.br/pt-BR/nossas-marcas/asseptgel-para-casa",

    accentColor: "#14549e",
    badge: "Álcool 70% + Clorexidina",

    features: [
      { icon: ShieldCheck, text: "Álcool 70%\n+ Clorexidina" },
      { icon: Droplet, text: "Sem Enxágue\nNecessário" },
      { icon: Sparkles, text: "Elimina 99,9%\ndas Bactérias" },
      { icon: Heart, text: "Testado\nDermatologicamente" },
    ],

    stats: [
      { value: "99,9%", label: "DAS BACTÉRIAS ELIMINADAS" },
      { value: "70%", label: "ÁLCOOL ETÍLICO" },
      { text: "SEM ENXÁGUE\nNECESSÁRIO" },
    ],

    footerChecks: [
      { icon: CheckCircle2, text: "ALTA PERFORMANCE" },
      { icon: Leaf, text: "COM ALOE VERA" },
      { icon: Heart, text: "TESTADO DERMATOLOGICAMENTE" },
    ]
  },
  {
    brand: "Start Pro",
    eyebrow: "SOLUÇÕES PROFISSIONAIS DE ALTA PERFORMANCE",
    titlePrefix: "Uso Profissional",
    titleSuffix: "para",
    titleHighlight: "Limpeza Pesada",
    subtitle: "FAMÍLIA DE PRODUTOS START PRO",
    description: "Desincrustantes, acabamentos acrílicos e desentupidores formulados para alta performance. A linha certa para cozinhas industriais, pisos técnicos e ambientes que exigem resultado profissional.",
    image: "/images/produtos-showcase/lavinia.webp",
    background: "/images/produtos-showcase/startpro-fundo.webp",
    logo: "/images/marcas/startpro.webp",
    href: "https://www.startquimica.com.br/pt-BR/nossas-marcas/start-pro",

    accentColor: "#c99400",
    badge: "Uso Profissional",

    features: [
      { icon: ShieldCheck, text: "Alta\nEficiência" },
      { icon: Droplet, text: "Fórmulas\nConcentradas" },
      { icon: Package, text: "Rende até\n20 Litros" },
      { icon: Sparkles, text: "Acabamento\nProfissional" },
    ],

    stats: [
      { value: "4 em 1", label: "SELADOR, CERA E RESTAURADOR" },
      { value: "20 Litros", label: "DE RENDIMENTO DILUÍDO" },
      { text: "USO\nPROFISSIONAL" },
    ],

    footerChecks: [
      { icon: CheckCircle2, text: "ALTA PERFORMANCE" },
      { icon: Leaf, text: "FÓRMULAS EFICIENTES" },
      { icon: Heart, text: "FEITO PARA PROFISSIONAIS" },
    ]
  },
  {
    brand: "Pedrex",
    eyebrow: "LIMPEZA PESADA PARA PEDRAS E PISOS RÚSTICOS",
    titlePrefix: "A Marca Líder",
    titleSuffix: "em",
    titleHighlight: "Limpeza de Pedras",
    subtitle: "FAMÍLIA DE PRODUTOS PEDREX",
    description: "Detergente especializado em pedras rústicas, tijolos e pisos cimentados. Remove sujeiras difíceis, manchas e encardidos, deixando as superfícies como novas.",
    image: "/images/produtos-showcase/pedrex.webp",
    background: "/images/produtos-showcase/pedrex-fundo.webp",
    logo: "/images/marcas/pedrex.webp",
    href: "https://www.startquimica.com.br/pt-BR/nossas-marcas/pedrex",

    accentColor: "#dc2626",
    badge: "Marca Líder #1",

    features: [
      { icon: ShieldCheck, text: "Limpeza\nPesada" },
      { icon: Droplet, text: "Fórmula\nConcentrada" },
      { icon: Sparkles, text: "Remove\nEncardidos" },
      { icon: Package, text: "Rende até\n5 Litros" },
    ],

    stats: [
      { value: "#1", label: "MARCA LÍDER EM LIMPEZA PESADA" },
      { value: "100%", label: "PEDRAS COMO NOVAS" },
      { text: "TIJOLOS E\nCIMENTADOS" },
    ],

    footerChecks: [
      { icon: CheckCircle2, text: "ALTA PERFORMANCE" },
      { icon: Leaf, text: "FÓRMULA EFICIENTE" },
      { icon: Heart, text: "ORIGINAL DESDE 1997" },
    ]
  },
];

const AUTO_ADVANCE_MS = 10000;

interface ProductShowcaseProps {
  active: number;
  onActiveChange: (index: number) => void;
}

export function ProductShowcase({ active, onActiveChange }: ProductShowcaseProps) {
  const [paused, setPaused] = useState(false);
  // Cada marca traz um fundo de tela cheia. Carregar as cinco de uma vez
  // custava alguns megabytes antes de o visitante ver a primeira.
  const [mountedLines, setMountedLines] = useState<readonly number[]>([0]);

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      const next = (active + 1) % lines.length;
      mountLine(next);
      onActiveChange(next);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [active, paused, onActiveChange]);

  useEffect(() => {
    // Marca a linha atual (pode ter vindo do menu de marcas acima) e prepara a
    // próxima quando o navegador ficar ocioso.
    const next = (active + 1) % lines.length;
    const prepare = () => mountLine(active, next);

    const idle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(prepare, { timeout: 3000 })
        : window.setTimeout(prepare, 1200);

    return () => {
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idle as number);
      } else {
        window.clearTimeout(idle as number);
      }
    };
  }, [active]);

  function mountLine(...indexes: number[]) {
    setMountedLines((current) =>
      indexes.every((index) => current.includes(index))
        ? current
        : [...new Set([...current, ...indexes])],
    );
  }

  function goTo(index: number) {
    const target = (index + lines.length) % lines.length;
    mountLine(target);
    onActiveChange(target);
  }

  return (
    <section
      id="linhas-produtos"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
      aria-roledescription="carrossel"
      className="relative isolate w-full overflow-hidden bg-white py-16 lg:py-24"
    >
      {/* Fundo com crossfade, cobrindo a seção inteira (inclusive o espaçamento interno) */}
      <div className="absolute inset-0 -z-10">
        {lines.map((product, index) =>
          mountedLines.includes(index) ? (
            <Image
              key={product.brand}
              src={product.background}
              alt=""
              aria-hidden="true"
              fill
              sizes="100vw"
              className={`object-cover saturate-[1.15] transition-opacity duration-700 ${
                index === active ? "opacity-100" : "opacity-0"
              }`}
              priority={index === 0}
            />
          ) : null,
        )}
        {/* Lavagem leve geral, deixa a foto evidente */}
        <div className="absolute inset-0 bg-white/22" />
        {/* Reforço de contraste só atrás do bloco de texto (coluna esquerda) */}
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-white/78 via-white/35 to-transparent lg:w-[58%]" />
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ width: `${lines.length * 100}%`, transform: `translateX(-${active * (100 / lines.length)}%)` }}
        >
          {lines.map((product, index) => (
            <div
              key={product.brand}
              aria-hidden={index !== active}
              className="relative w-full shrink-0"
              style={{ width: `${100 / lines.length}%` }}
            >
              <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-16 px-6 lg:flex-row lg:gap-12 lg:px-12">

                {/* ---------------------------------------------------
                    LADO ESQUERDO (LOGO GIGANTE, TEXTOS E CTA)
                --------------------------------------------------- */}
                <div className="flex w-full flex-col lg:w-[45%] xl:w-[40%]">

                  {/* Logo da Marca (Agora bem maior) */}
                  <div className="relative mb-10 h-20 w-full max-w-[280px] sm:h-28 sm:max-w-[320px]">
                    <Image
                      src={product.logo}
                      alt={`Logo ${product.brand}`}
                      fill
                      sizes="320px"
                      loading={index === 0 ? "eager" : "lazy"}
                      className="object-contain object-left"
                    />
                  </div>

                  {/* Eyebrow / Tag */}
                  <div className="mb-4 flex items-center gap-4">
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0756c9]">
                      {product.eyebrow}
                    </span>
                  </div>

                  {/* Título Principal */}
                  <h2 className="text-[40px] font-black leading-[1.05] tracking-tight text-[#092b4c] sm:text-[48px] xl:text-[56px]">
                    {product.titlePrefix} <br />
                    {product.titleSuffix}{" "}
                    <span style={{ color: product.accentColor }}>{product.titleHighlight}</span>
                  </h2>

                  {/* Descrição */}
                  <p className="mt-6 max-w-[480px] text-[16px] leading-relaxed text-[#596977] sm:text-[18px]">
                    {product.description}
                  </p>

                  {/* Ícones de Benefícios (Design Clean para Fundo Branco) */}
                  <div className="mt-10 flex flex-wrap gap-6 sm:gap-8">
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex flex-col items-start gap-3">
                        <div className="grid size-12 place-items-center rounded-full bg-[#f0f5ff] text-[#0756c9] shadow-sm">
                          <feature.icon size={22} strokeWidth={1.5} />
                        </div>
                        <span className="whitespace-pre-line text-[13px] font-bold leading-tight text-[#092b4c]">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Botão Call-to-Action (Focado em Vendas) */}
                  <div className="mt-12">
                    <a
                      href={product.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={index === active ? 0 : -1}
                      className="group inline-flex min-h-[56px] items-center gap-5 rounded-full py-2 pl-8 pr-2 text-[15px] font-bold text-white shadow-[0_12px_24px_rgba(7,86,201,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(7,86,201,0.35)]"
                      style={{ backgroundColor: product.accentColor }}
                    >
                      Comprar a Linha Completa
                      <span className="grid size-11 place-items-center rounded-full bg-white/20 text-white transition-transform duration-300 group-hover:rotate-45">
                        <ArrowUpRight size={18} />
                      </span>
                    </a>
                  </div>
                </div>

                {/* ---------------------------------------------------
                    LADO DIREITO (IMAGEM COM VÁRIOS PRODUTOS E STATS)
                --------------------------------------------------- */}
                <div className="relative flex w-full flex-col items-center justify-center lg:w-[55%] xl:w-[60%]">

                  {/* Badge Superior Direito Flutuante */}
                  {product.badge && (
                    <div className="product-badge-float absolute right-[5%] top-0 z-30 flex items-center gap-2 rounded-full border border-gray-100 bg-white px-3.5 py-2 shadow-[0_15px_35px_rgba(0,0,0,0.08)] sm:px-5 sm:py-3">
                      <Sparkles size={18} className="shrink-0" style={{ color: product.accentColor }} />
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#092b4c] sm:text-[12px]">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Contêiner da Imagem (Ajustado para imagens mais largas com vários produtos) */}
                  <div className="relative z-20 flex h-[400px] w-full max-w-[800px] items-center justify-center sm:h-[500px] lg:h-[600px]">
                    {/* Sombra de chão muito difusa para assentar os produtos */}
                    <div className="absolute bottom-[5%] left-1/2 h-[30px] w-[70%] -translate-x-1/2 rounded-[100%] bg-black/15 blur-[25px]" />

                    {mountedLines.includes(index) ? (
                      <Image
                        src={product.image}
                        alt={`Linha completa ${product.brand}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] z-10"
                        priority={index === 0}
                      />
                    ) : null}
                  </div>

                  {/* Cartão Branco Flutuante Inferior (Stats) - Traz muita autoridade */}
                  {/* No telefone os três números dividiam ~93px cada e "30 Litros"
                      quebrava no meio: vira grade de três colunas com o número
                      menor. */}
                  <div className="relative z-30 mt-[-20px] grid w-full max-w-[650px] grid-cols-3 gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)] sm:flex sm:items-center sm:justify-between sm:px-10 sm:py-6 lg:mt-[-40px]">
                    {product.stats.map((stat, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="flex flex-col">
                          {stat.value && (
                            <span className="text-[17px] font-black leading-none text-[#092b4c] sm:text-[32px]">
                              {stat.value}
                            </span>
                          )}
                          <span className="mt-1 whitespace-pre-line text-[10px] font-bold uppercase tracking-wider text-[#697b8b] sm:text-[11px]">
                            {stat.label || stat.text}
                          </span>
                        </div>
                        {/* Separador */}
                        {i < product.stats.length - 1 && (
                          <div className="ml-4 hidden h-10 w-px bg-gray-200 sm:ml-6 sm:block" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ===================================================
                  RODAPÉ DO PRODUTO (LINHA FINAL DE CONFIANÇA)
              =================================================== */}
              <div className="relative z-20 mt-20 w-full border-t border-gray-100 bg-[#fafcfd] py-6">
                <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-center gap-x-12 gap-y-4 px-6 lg:px-12">
                  {product.footerChecks.map((check, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <check.icon size={18} className="text-[#0756c9]" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#596977]">
                        {check.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controles do carrossel */}
      <div className="mx-auto mt-10 flex w-full max-w-[1400px] items-center justify-center gap-6 px-6 lg:px-12">
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          aria-label="Marca anterior"
          className="grid size-11 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-500 shadow-sm transition hover:border-slate-300 hover:text-[#092b4c]"
        >
          <ChevronLeft size={19} />
        </button>

        <div className="flex items-center gap-2.5">
          {lines.map((product, index) => (
            <button
              key={product.brand}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Ver linha ${product.brand}`}
              aria-current={index === active}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === active ? "w-7 bg-[#092b4c]" : "w-2.5 bg-slate-200 hover:bg-slate-300"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(active + 1)}
          aria-label="Próxima marca"
          className="grid size-11 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-500 shadow-sm transition hover:border-slate-300 hover:text-[#092b4c]"
        >
          <ChevronRight size={19} />
        </button>
      </div>
    </section>
  );
}
