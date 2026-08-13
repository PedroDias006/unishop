import Image from "next/image";

const brands = [
  { name: "Azulim", src: "/images/marcas/azulim.webp", width: 138 },
  { name: "Tuff", src: "/images/marcas/tuff.webp", width: 88 },
  { name: "Asseptgel", src: "/images/marcas/assept.webp", width: 124 },
  { name: "Start Pro", src: "/images/marcas/startpro.webp", width: 118 },
  { name: "Pedrex", src: "/images/marcas/pedrex.webp", width: 112 },
] as const;

function BrandSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-16 pr-16 sm:gap-24 sm:pr-24 lg:gap-32 lg:pr-32" aria-hidden={hidden || undefined}>
      {brands.map((brand) => (
        <div
          key={brand.name}
          className="flex h-16 w-36 shrink-0 items-center justify-center sm:w-44 lg:w-48"
        >
          <Image
            src={brand.src}
            alt={hidden ? "" : brand.name}
            width={brand.width * 3}
            height={180}
            className="h-auto max-h-11 w-auto max-w-[138px] select-none object-contain sm:max-h-12 sm:max-w-[150px]"
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
