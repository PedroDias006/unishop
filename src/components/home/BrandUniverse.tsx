import { ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { brandUniverse } from "@/data/network";

/**
 * O carrossel de logos no topo da página diz que as marcas existem, mas não o
 * que cada uma resolve. Esta seção fecha essa lacuna: cada marca com o próprio
 * posicionamento, o dado que a diferencia e as categorias que ela cobre.
 *
 * A primeira marca ocupa duas colunas porque a Azulim é a mais conhecida da
 * indústria e serve de porta de entrada para as outras quatro.
 */
export function BrandUniverse() {
  return (
    <section
      id="marcas"
      className="scroll-mt-28 bg-[#f6f9fc] py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="max-w-3xl">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="h-px w-10 bg-[var(--brand-yellow)]"
            />
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--brand-blue-800)]">
              As marcas que estão na prateleira
            </p>
          </div>

          <h2 className="mt-6 text-balance text-3xl font-black leading-[1.03] tracking-[-0.045em] text-[var(--brand-blue-950)] sm:text-4xl lg:text-[46px]">
            Cinco marcas, cada uma com um problema para resolver.
          </h2>

          <p className="mt-6 text-base leading-8 text-slate-600">
            Todas saem da mesma indústria, a Start Química, o que significa
            fornecedor único, laudo técnico e reposição sem intermediário. Da
            faxina de casa ao piso de um condomínio inteiro.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-6">
          {brandUniverse.map((brand, index) => (
            <article
              key={brand.name}
              // Duas marcas na primeira fileira e três na segunda: com cinco
              // cards, dividir 6 colunas em 3+3 e depois 2+2+2 evita a sobra
              // de um card solitário no fim.
              className={`group relative flex flex-col overflow-hidden rounded-[26px] border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#bcd8f2] hover:shadow-[0_26px_60px_-34px_rgba(4,47,105,0.45)] lg:p-8 ${
                index < 2 ? "lg:col-span-3" : "lg:col-span-2"
              }`}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="relative h-11 w-36 shrink-0">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    sizes="144px"
                    className="select-none object-contain object-left"
                  />
                </div>

                <a
                  href={brand.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-slate-400 transition-colors duration-200 hover:text-[var(--brand-blue-800)]"
                >
                  Ver linha
                  <ArrowUpRight size={13} />
                </a>
              </div>

              <p className="mt-7 text-lg font-black leading-[1.25] tracking-[-0.03em] text-[var(--brand-blue-950)] sm:text-xl">
                {brand.tagline}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {brand.text}
              </p>

              <p className="mt-5 flex items-start gap-2.5 rounded-2xl bg-[#f4f9ff] px-4 py-3 text-[13px] font-semibold leading-5 text-[var(--brand-blue-900)]">
                <Check
                  size={15}
                  strokeWidth={2.8}
                  className="mt-0.5 shrink-0 text-[var(--brand-yellow-dark)]"
                />
                {brand.highlight}
              </p>

              <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                {brand.categories.map((category) => (
                  <li
                    key={category}
                    className="rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="mt-8 text-sm leading-6 text-slate-500">
          Além dessas, o portfólio da indústria reúne mais de 20 marcas —
          Qualimilk e Qualifood para o agro e o setor alimentício, Indy para
          estética automotiva, Aquapool para piscinas, Free Pet, Galeno, Vorel e
          outras.
        </p>
      </Container>
    </section>
  );
}
