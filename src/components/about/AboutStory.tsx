import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const milestones = [
  { value: "1987", label: "início em Uberlândia" },
  { value: "+2 mil", label: "itens no mix de produtos" },
  { value: "2006", label: "primeira Start Shop" },
  { value: "2021", label: "nasce a Rede Unishop" },
] as const;

const chapters = [
  {
    id: "fundacao",
    marker: "1987",
    title: "O começo, em Uberlândia",
    text: "A Start Química iniciou suas atividades empresariais em 1987, em Uberlândia, fabricando apenas produtos para limpeza de automóveis. A Rede Unishop é a rede autorizada Start Química profissional.",
    image: "/images/sobre/01-fundacao.webp",
    width: 509,
    height: 593,
    alt: "Fotos históricas da fundação da Start Química: a fachada original, a equipe e a vista aérea da fábrica em Uberlândia",
  },
  {
    id: "mercado",
    marker: "O salto",
    title: "Entrar no quarto maior mercado de limpeza do mundo",
    text: "Um mercado repleto de marcas consolidadas. Mas uma coisa era certa: sabíamos exatamente aonde queríamos chegar.",
    image: "/images/sobre/02-mercado.webp",
    width: 900,
    height: 624,
    alt: "Linha de produtos de limpeza Azulim",
  },
  {
    id: "pesquisa",
    marker: "Pesquisa",
    title: "Investir pesado em pesquisa e desenvolvimento",
    text: "A estratégia rendeu frutos rapidamente. Hoje são mais de 2.000 itens de limpeza no mix, atendendo laticínios, frigoríficos, mineradoras, indústrias de alimentos, clubes, condomínios, hotéis, motéis, lavanderias, hospitais, restaurantes, escritórios e residências — além das linhas automotiva e agropecuária.",
    image: "/images/sobre/03-pesquisa.webp",
    width: 706,
    height: 747,
    alt: "Laboratório de pesquisa e desenvolvimento da Start Química",
  },
  {
    id: "reconhecimento",
    marker: "Exportação",
    title: "Reconhecimento nacional e internacional",
    text: "A empresa se desenvolveu, ganhou espaço em todo o mercado nacional e também passou a exportar para países da Europa, da África e da América.",
    image: "/images/sobre/04-reconhecimento.webp",
    width: 900,
    height: 897,
    alt: "Globo terrestre destacando os continentes atendidos pela exportação",
  },
  {
    id: "solucao",
    marker: "Solução",
    title: "Entregar a solução completa era o caminho",
    text: "Itens para cada necessidade, com preço competitivo e qualidade premium. A adesão foi tanta que chegou a influenciar hábitos de consumo: as pessoas reduziram as idas ao mercado e passaram a procurar diretamente a indústria para comprar os produtos Start.",
    image: "/images/sobre/05-solucao-completa.webp",
    width: 900,
    height: 709,
    alt: "Variedade de produtos de limpeza da linha Start",
  },
  {
    id: "primeira-loja",
    marker: "2006",
    title: "A primeira Start Shop",
    text: "Um Centro de Soluções em Limpeza e Higienização. Ali sentávamos e entendíamos a real necessidade do cliente — qual o problema e qual a demanda de limpeza — para então oferecer uma solução completa, da indicação do produto até a forma correta de aplicação.",
    image: "/images/sobre/06-primeira-loja.webp",
    width: 806,
    height: 921,
    alt: "Fachadas das primeiras lojas Start Shop",
  },
  {
    id: "expansao",
    marker: "2019",
    title: "100 lojas espalhadas pelo Brasil",
    text: "Começou a expansão do modelo de lojas pelo país. Ao final daquele ano, já eram 100 unidades em operação.",
    image: "/images/sobre/07-expansao.webp",
    width: 871,
    height: 845,
    alt: "Mapa da expansão das lojas pelo Brasil",
  },
  {
    id: "rede-unishop",
    marker: "2021",
    title: "A Start Shop passa a se chamar Rede Unishop",
    text: "Já com 300 lojas, a rede ganhou uma nova identidade — deixando claro que a loja é especializada em limpeza profissional.",
    image: "/images/sobre/08-rede-unishop.webp",
    width: 865,
    height: 1079,
    alt: "Nova identidade visual da Rede Unishop aplicada na fachada da loja",
  },
  {
    id: "pessoas",
    marker: "Hoje",
    title: "Além de produtos, mudanças na vida das pessoas",
    text: "Nessa trajetória percebemos que, além de produtos, tínhamos o desejo de oferecer mudanças significativas na vida das pessoas.",
    image: "/images/sobre/09-pessoas.webp",
    width: 900,
    height: 623,
    alt: "Profissionais de limpeza doméstica, comercial e industrial atendidos pela Rede Unishop",
  },
] as const;

export function AboutStory() {
  return (
    <>
      {/* ================================================================
          ABERTURA
      ================================================================= */}
      <section className="relative overflow-hidden bg-[linear-gradient(115deg,#04224c_0%,#095794_100%)] pb-16 pt-[132px] font-[Manrope] text-white sm:pb-20 sm:pt-[160px] lg:pb-24 lg:pt-[180px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-24 size-[520px] rounded-full bg-[#3ba0e0]/12 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="hero-dot-matrix pointer-events-none absolute right-[6%] top-[22%] hidden size-28 opacity-40 lg:block"
        />

        <Container className="relative">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#ffc928]" aria-hidden="true" />
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#ffd34c]">
              Nossa história
            </p>
          </div>

          <h1 className="mt-6 max-w-4xl text-balance text-[clamp(2.6rem,5.4vw,4.6rem)] font-black leading-[0.95] tracking-[-0.05em]">
            A essência da limpeza,
            <span className="mt-2 block text-[#ffc928]">desde 1987.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
            Tudo começou em Uberlândia, com produtos para limpeza de automóveis.
            Quase quatro décadas depois, a Start Química reúne mais de 2 mil
            soluções e uma rede de lojas especializadas em todo o Brasil.
          </p>

          <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-x-4 gap-y-8 border-t border-white/15 pt-8 sm:gap-x-8 lg:grid-cols-4">
            {milestones.map((item) => (
              <div key={item.label}>
                <dt className="text-2xl font-extrabold tracking-[-0.04em] text-[#ffc928] sm:text-3xl">
                  {item.value}
                </dt>
                <dd className="mt-1.5 text-[11px] font-bold uppercase leading-4 tracking-[0.11em] text-white/55 sm:text-xs">
                  {item.label}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ================================================================
          LINHA DO TEMPO
      ================================================================= */}
      <section
        id="linha-do-tempo"
        className="scroll-mt-28 bg-[linear-gradient(180deg,#ffffff_0%,#f6fafd_38%,#edf4fb_100%)] py-20 font-[Manrope] sm:py-28"
      >
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-black tracking-[-0.045em] text-[var(--brand-blue-950)] sm:text-4xl lg:text-5xl">
              De uma fábrica de produtos automotivos a uma rede nacional.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              Cada passo dessa trajetória nasceu da mesma pergunta: qual é, de
              verdade, a necessidade de quem precisa limpar?
            </p>
          </div>

          <ol className="relative mx-auto mt-16 max-w-6xl sm:mt-20">
            {/* Fio condutor da linha do tempo */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-[7px] w-px bg-[linear-gradient(180deg,transparent,rgba(17,80,164,0.35)_5%,rgba(17,80,164,0.35)_95%,transparent)] lg:left-1/2"
            />

            {chapters.map((chapter, index) => {
              const flipped = index % 2 === 1;

              return (
                <li
                  key={chapter.id}
                  className="relative pb-16 pl-9 last:pb-0 sm:pl-12 lg:px-0 lg:pb-24"
                >
                  {/* Marcador sobre o fio */}
                  <span
                    aria-hidden="true"
                    className="absolute left-[7px] top-2 size-3.5 -translate-x-1/2 rounded-full border-[3px] border-[#ffc928] bg-white shadow-[0_0_0_5px_rgba(237,244,251,0.9)] lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2"
                  />

                  <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                    <div className={flipped ? "lg:order-2 lg:pl-16" : "lg:pr-16"}>
                      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--brand-blue-700)]">
                        {chapter.marker}
                      </p>

                      <h3 className="mt-3 text-balance text-2xl font-black leading-[1.12] tracking-[-0.04em] text-[var(--brand-blue-950)] sm:text-3xl lg:text-[34px]">
                        {chapter.title}
                      </h3>

                      <p className="mt-5 text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-8">
                        {chapter.text}
                      </p>
                    </div>

                    <div
                      className={`relative ${flipped ? "lg:order-1 lg:pr-16" : "lg:pl-16"}`}
                    >
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-6 rounded-full bg-[#8fc4ee]/18 blur-3xl"
                      />
                      <Image
                        src={chapter.image}
                        alt={chapter.alt}
                        width={chapter.width}
                        height={chapter.height}
                        priority={index === 0}
                        sizes="(max-width: 1024px) 88vw, 470px"
                        className="relative mx-auto h-auto w-full max-w-[420px] object-contain drop-shadow-[0_18px_34px_rgba(4,34,76,0.13)] lg:max-w-none"
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* ================================================================
          FECHO
      ================================================================= */}
      <section className="bg-[var(--brand-blue-950)] py-20 font-[Manrope] text-white sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span
              aria-hidden="true"
              className="mx-auto mb-8 block h-px w-10 bg-[#ffc928]"
            />
            <p className="text-balance text-3xl font-black leading-[1.1] tracking-[-0.045em] sm:text-4xl lg:text-5xl">
              Dividindo a nossa história é possível
              <span className="text-[#ffc928]"> construir muitas outras.</span>
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/modelo-de-negocio"
                className="group inline-flex min-h-13 w-full items-center justify-center gap-3 rounded-full bg-[#ffc928] px-7 text-sm font-black text-[#07396e] shadow-[0_14px_34px_rgba(227,164,0,0.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ffda55] sm:w-auto"
              >
                Faça parte da Unishop
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/lojas"
                className="inline-flex min-h-13 w-full items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/8 px-7 text-sm font-black text-white transition duration-300 hover:border-white/35 hover:bg-white/16 sm:w-auto"
              >
                <MapPin size={17} />
                Encontre uma loja
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
