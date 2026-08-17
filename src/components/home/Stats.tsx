import Image from "next/image";

const brands = [
  { name: "Azulim", src: "/images/marcas/azulim-carousel.webp", width: 700, height: 272 },
  { name: "Tuff", src: "/images/marcas/tuff-carousel.webp", width: 700, height: 478 },
  { name: "Asseptgel", src: "/images/marcas/assept-carousel.webp", width: 700, height: 168 },
  { name: "Start Pro", src: "/images/marcas/startpro-carousel.webp", width: 700, height: 156 },
  { name: "Pedrex", src: "/images/marcas/pedrex-carousel.webp", width: 700, height: 335 },
] as const;

function BrandSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-14 pr-14 sm:gap-20 sm:pr-20 lg:gap-24 lg:pr-24" aria-hidden={hidden || undefined}>
      {brands.map((brand) => (
        <div
          key={brand.name}
          className="flex h-16 w-48 shrink-0 items-center justify-center sm:h-20 sm:w-56 lg:w-64"
        >
          <Image
            src={brand.src}
            alt={hidden ? "" : brand.name}
            width={brand.width}
            height={brand.height}
            sizes="236px"
            className="h-auto max-h-12 w-auto max-w-[180px] select-none object-contain sm:max-h-16 sm:max-w-[220px] lg:max-w-[236px]"
          />
        </div>
      ))}
    </div>
  );
}

export function Stats() {
  return (
    <section
      aria-label="Marcas da empresa"
      className="brand-marquee relative z-10 overflow-hidden border-b border-[#0a376a]/10 bg-[linear-gradient(115deg,#ffffff_0%,#f5f9fd_48%,#edf4fb_100%)] py-3 sm:py-4"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#f5f9fd] to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#edf4fb] to-transparent sm:w-32" />

      <div className="brand-marquee-track flex w-max items-center">
        <BrandSet />
        <BrandSet hidden />
      </div>
    </section>
  );
}
