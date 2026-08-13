import Image from "next/image";

const brands = [
  { name: "Azulim", src: "/images/marcas/azulim-carousel.webp", width: 876, height: 340 },
  { name: "Tuff", src: "/images/marcas/tuff-carousel.webp", width: 1162, height: 794 },
  { name: "Asseptgel", src: "/images/marcas/assept-carousel.webp", width: 1215, height: 291 },
  { name: "Start Pro", src: "/images/marcas/startpro-carousel.webp", width: 1079, height: 240 },
  { name: "Pedrex", src: "/images/marcas/pedrex-carousel.webp", width: 1215, height: 582 },
] as const;

function BrandSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-14 pr-14 sm:gap-20 sm:pr-20 lg:gap-24 lg:pr-24" aria-hidden={hidden || undefined}>
      {brands.map((brand) => (
        <div
          key={brand.name}
          className="flex h-20 w-48 shrink-0 items-center justify-center sm:h-24 sm:w-56 lg:w-64"
        >
          <Image
            src={brand.src}
            alt={hidden ? "" : brand.name}
            width={brand.width}
            height={brand.height}
            className="h-auto max-h-16 w-auto max-w-[180px] select-none object-contain sm:max-h-20 sm:max-w-[220px] lg:max-w-[236px]"
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
      className="brand-marquee relative z-10 overflow-hidden border-b border-[#0a376a]/10 bg-[#f7f9fb] py-5 sm:py-6"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#f7f9fb] to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#f7f9fb] to-transparent sm:w-32" />

      <div className="brand-marquee-track flex w-max items-center">
        <BrandSet />
        <BrandSet hidden />
      </div>
    </section>
  );
}
