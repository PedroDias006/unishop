"use client";

import { ArrowRight, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ProductShowcase } from "@/components/products/ProductShowcase";
import { ProductsHeroMedia } from "@/components/products/ProductsHeroMedia";

// ============================================================================
// DADOS DO HERO (MARCAS)
// ============================================================================
const brands = [
  { name: "Azulim", logo: "/images/marcas/azulim.webp" },
  { name: "Tuff", logo: "/images/marcas/tuff.webp" },
  { name: "Asseptgel", logo: "/images/marcas/assept.webp" },
  { name: "StartPRO", logo: "/images/marcas/startpro.webp" },
  { name: "Pedrex", logo: "/images/marcas/pedrex.webp" },
];

// ============================================================================
// COMPONENTE PRINCIPAL (PÁGINA)
// ============================================================================
export function ProductsLanding() {
  const [activeBrand, setActiveBrand] = useState(0);

  function selectBrand(index: number) {
    setActiveBrand(index);
    document.getElementById("linhas-produtos")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">

      {/* =====================================================================
          SECÇÃO 1: HERO IMPRESSIONANTE
      ====================================================================== */}
      <section className="relative w-full flex flex-col">
        {/* IMAGEM E TEXTO (90% DA TELA)
            `svh` no lugar de `vh`: no telefone o `vh` ignora a barra do
            navegador e empurrava o botão para fora da tela. No aparelho o topo
            também é mais baixo, para o bloco de marcas despontar por baixo. */}
        <div className="relative flex h-[80svh] min-h-[540px] w-full flex-col justify-center overflow-hidden lg:h-[90svh] lg:min-h-[700px]">
          <ProductsHeroMedia />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12">
            <div className="max-w-[700px] font-[Manrope]">
              <div className="mb-6 flex items-center gap-4">
                <span className="h-px w-8 bg-white/60" />
                <span className="text-[12px] font-black uppercase tracking-[0.3em] text-white/90">
                  Inovação & Cuidado
                </span>
              </div>

              <h1 className="text-[44px] font-black leading-[1.05] tracking-tight text-white sm:text-[56px] lg:text-[72px]">
                Soluções inteligentes que <br />
                transformam <span className="hero-gold-text">o seu dia a dia.</span>
              </h1>

              <div className="mt-10">
                <a
                  href="#marcas"
                  className="group inline-flex min-h-[56px] items-center gap-4 rounded-full bg-white py-2 pl-8 pr-2 text-[15px] font-bold text-[#092b4c] transition-all duration-300 hover:scale-105 hover:bg-[#f4f6f8]"
                >
                  Conheça as iniciativas
                  <span className="grid size-11 place-items-center rounded-full bg-[#092b4c]/10 text-[#092b4c] transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight size={18} />
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* CONTROLOS DO SLIDER (apenas decorativos: escondidos de leitores de
              tela e fora da ordem de tabulação, já que não acionam nada) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[15%] right-6 z-10 hidden items-center gap-6 lg:flex lg:right-12"
          >
            <div className="flex gap-3">
              <span className="grid size-12 place-items-center rounded-full border border-white/30 text-white backdrop-blur-sm">
                <ChevronLeft size={20} />
              </span>
              <span className="grid size-12 place-items-center rounded-full border border-white/30 text-white backdrop-blur-sm">
                <ChevronRight size={20} />
              </span>
            </div>
            <div className="flex gap-2">
              <span className="size-2 rounded-full bg-white" />
              <span className="size-2 rounded-full bg-white/30" />
              <span className="size-2 rounded-full bg-white/30" />
            </div>
          </div>
        </div>

        {/* BLOCO BRANCO SOBREPOSTO (MARCAS) */}
        <div 
          id="marcas"
          className="relative z-20 -mt-20 flex w-full flex-col items-center justify-center rounded-t-[2.5rem] bg-white px-6 pb-16 pt-16 shadow-[0_-20px_50px_rgba(0,0,0,0.15)] sm:rounded-t-[4rem] sm:pt-20 lg:-mt-24 lg:pb-24"
        >
          {/* Botão Flutuante (Scroll Down) */}
          <div className="absolute -top-7 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-[0_10px_25px_rgba(0,0,0,0.1)] border border-gray-50 text-[#f4c21f]">
            <ChevronDown size={24} className="animate-bounce" />
          </div>

          <h3 className="mb-14 text-center text-[28px] font-black tracking-tight text-[#092b4c] sm:text-[34px] lg:text-[40px]">
            Nossas marcas
          </h3>

          <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center justify-center gap-x-12 gap-y-10 sm:gap-x-16 lg:flex-nowrap lg:gap-x-20 xl:gap-x-24">
            {brands.map((brand, index) => (
              <button
                key={index}
                type="button"
                onClick={() => selectBrand(index)}
                aria-label={`Ver linha de produtos ${brand.name}`}
                aria-current={activeBrand === index}
                className={`relative h-20 w-40 shrink-0 cursor-pointer rounded-2xl transition-all duration-300 hover:scale-105 sm:h-24 sm:w-48 lg:h-28 lg:w-52 xl:h-32 xl:w-56 ${
                  activeBrand === index ? "opacity-100" : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={brand.logo}
                  alt={`Logo ${brand.name}`}
                  fill
                  sizes="(max-width: 640px) 160px, (max-width: 1024px) 192px, 224px"
                  className="object-contain"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECÇÃO 2: FAMÍLIA DE PRODUTOS (TUFF, AZULIM, ASSEPTGEL, START PRO, PEDREX)
      ====================================================================== */}
      <ProductShowcase active={activeBrand} onActiveChange={setActiveBrand} />
    </div>
  );
}