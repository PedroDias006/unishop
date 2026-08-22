import { ArrowRight, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductsHeroMedia } from "@/components/products/ProductsHeroMedia";

// ============================================================================
// DADOS DO HERO (MARCAS)
// ============================================================================
const brands = [
  { name: "Azulim", catalogName: "Azulim", logo: "/images/marcas/azulim.webp" },
  { name: "Tuff", catalogName: "Tuff", logo: "/images/marcas/tuff.webp" },
  { name: "Asseptgel", catalogName: "Asseptgel", logo: "/images/marcas/assept.webp" },
  { name: "StartPRO", catalogName: "Start PRO", logo: "/images/marcas/startpro.webp" },
  { name: "Pedrex", catalogName: "Pedrex", logo: "/images/marcas/pedrex.webp" },
];

// ============================================================================
// COMPONENTE PRINCIPAL (PÁGINA)
// ============================================================================
export function ProductsLanding() {
  return (
    <div className="flex w-full flex-col overflow-x-clip bg-[var(--background)]">

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
                  href="#filtros-catalogo"
                  className="group inline-flex min-h-[56px] items-center gap-4 rounded-full bg-white py-2 pl-8 pr-2 text-[15px] font-bold text-[#092b4c] transition-all duration-300 hover:scale-105 hover:bg-[#f4f6f8]"
                >
                  Explorar catálogo
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
          className="relative z-20 -mt-20 flex w-full flex-col items-center justify-center rounded-t-[2.5rem] bg-[var(--background)] px-6 pb-16 pt-16 shadow-[0_-20px_50px_rgba(0,0,0,0.15)] sm:rounded-t-[4rem] sm:pt-20 lg:-mt-24 lg:pb-24"
        >
          {/* Botão Flutuante (Scroll Down) */}
          <div className="absolute -top-7 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-[0_10px_25px_rgba(0,0,0,0.1)] border border-gray-50 text-[#f4c21f]">
            <ChevronDown size={24} className="animate-bounce" />
          </div>

          <h3 className="mb-14 text-center text-[28px] font-black tracking-tight text-[#092b4c] sm:text-[34px] lg:text-[40px]">
            Nossas marcas
          </h3>

          <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center justify-center gap-x-8 gap-y-10 sm:gap-x-10 lg:flex-nowrap lg:gap-x-10 xl:gap-x-16">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                href={`/produtos?marca=${encodeURIComponent(brand.catalogName)}#filtros-catalogo`}
                aria-label={`Ver linha de produtos ${brand.name}`}
                className="relative h-20 w-36 shrink-0 rounded-2xl opacity-70 transition-all duration-300 hover:scale-105 hover:opacity-100 focus-visible:opacity-100 sm:h-24 sm:w-40 lg:h-24 lg:w-40 xl:h-28 xl:w-48"
              >
                <Image
                  src={brand.logo}
                  alt={`Logo ${brand.name}`}
                  fill
                  sizes="(max-width: 640px) 160px, (max-width: 1024px) 192px, 224px"
                  className="object-contain"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
