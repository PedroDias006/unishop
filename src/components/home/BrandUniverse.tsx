"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { brandUniverse } from "@/data/network";
import { linkDaMarca } from "@/data/produtos";

/**
 * O carrossel de logos no topo da página diz que as marcas existem, mas não o
 * que cada uma resolve. Esta seção fecha essa lacuna: cada marca com o próprio
 * posicionamento e as categorias que ela cobre.
 *
 * A vitrine é a da Apple Store, e de propósito. O que ela faz de certo:
 *
 * - cada cartão tem a cor da coisa que ele vende, não a cor do site. Cinco
 *   cartões brancos iguais viram uma tabela; cinco fundos diferentes viram
 *   uma prateleira;
 * - a foto da marca ocupa o cartão inteiro e o texto vai por cima dela. É a
 *   embalagem que a pessoa reconhece na gôndola, então é ela que manda no
 *   cartão — e por isso nenhuma cortina branca passa por cima: a área limpa
 *   onde o texto assenta foi aberta na própria imagem;
 * - o texto fica em dois degraus — a assinatura visual da marca e uma chamada
 *   grande. O cartão não tenta explicar a linha inteira;
 * - o trilho encaixa (`scroll-snap`) e o cartão seguinte fica meio à mostra,
 *   dizendo que tem mais coisa ali sem precisar de legenda.
 *
 * O passeio automático saiu junto com o arrasto por JavaScript. A rolagem
 * agora é a nativa do navegador — que já tem inércia, encaixe e aceita o dedo
 * — e as setas só empurram o trilho um cartão por vez. Menos código, e o
 * movimento não foge mais de quem está tentando ler.
 */

/**
 * A foto e as cores de cada cartão. A cor de fundo é sempre a do topo da
 * própria foto, para a emenda entre uma e outra não aparecer.
 */
type Tema = {
  /**
   * A foto do cartão, recomposta por `scripts/recompor-vitrine.mjs`: as cinco
   * saem na proporção exata do cartão e com o produto começando a 47% da
   * altura, abaixo de onde o texto termina. É por isso que não existe véu
   * nenhum por cima delas — a folga está na imagem, não numa cortina branca
   * que apaga metade da foto.
   */
  foto: string;
  /** Logo já aparado, sem a folga da arte original. */
  logo: string;
  /**
   * A largura real do arquivo — todos os logos foram aparados para 96px de
   * altura. É ela que dá a proporção ao `w-auto`: sem isso, um desenho quase
   * quadrado como o do Tuff sairia esticado na mesma caixa de um desenho
   * quatro vezes mais largo, como o do Start PRO.
   */
  logoW: number;
  /**
   * Cor do cartão. Fica atrás da foto — no Asseptgel, que é recorte sem fundo,
   * é ela que aparece em volta do frasco.
   */
  fundo: string;
  texto: string;
};

const temas: Record<string, Tema> = {
  Azulim: {
    foto: "/images/marcas-vitrine/azulim-large.webp",
    logo: "/images/marcas-vitrine/logo-azulim.webp",
    logoW: 246,
    fundo: "bg-[linear-gradient(168deg,#eaf4fd_0%,#cbe4fa_100%)]",
    texto: "text-[#062546]",
  },
  Tuff: {
    foto: "/images/marcas-vitrine/tuff-large.webp",
    logo: "/images/marcas-vitrine/logo-tuff.webp",
    logoW: 141,
    fundo: "bg-[#04122e]",
    texto: "text-white",
  },
  Asseptgel: {
    foto: "/images/marcas-vitrine/asseptgel-large.webp",
    logo: "/images/marcas-vitrine/logo-asseptgel.webp",
    logoW: 399,
    fundo: "bg-[linear-gradient(168deg,#f4fbff_0%,#cfe9f7_100%)]",
    texto: "text-[#062f45]",
  },
  "Start PRO": {
    foto: "/images/marcas-vitrine/startpro-large.webp",
    logo: "/images/marcas-vitrine/logo-startpro.webp",
    logoW: 423,
    fundo: "bg-[#eceef1]",
    texto: "text-[#0b1f3d]",
  },
  Pedrex: {
    foto: "/images/marcas-vitrine/pedrex-large.webp",
    logo: "/images/marcas-vitrine/logo-pedrex.webp",
    logoW: 200,
    fundo: "bg-[#eef0f4]",
    texto: "text-[#0b1f3d]",
  },
};

/** Um cartão nunca passa de 395px; é isso que o navegador precisa saber. */
const TAMANHOS =
  "(min-width: 1280px) 395px, (min-width: 1024px) 380px, (min-width: 640px) 340px, 290px";

/**
 * A régua de atalhos que abre a seção, no lugar da fileira de ícones que a
 * Apple põe acima da vitrine: oito categorias do catálogo, cada uma com a cara
 * de um produto que a representa, levando direto para a vitrine já filtrada.
 *
 * O caminho da foto está escrito à mão, e não resolvido pelo slug, de
 * propósito: esta seção roda no navegador, e chamar `acharProduto()` aqui
 * arrastaria os 316 produtos do catálogo para dentro do pacote do cliente só
 * para descobrir oito endereços. O slug fica no comentário — é por ele que se
 * acha o produto de novo se a foto precisar trocar.
 */
const atalhos = [
  {
    rotulo: "Limpadores",
    categoria: "Limpadores",
    // limpa-vidros-azulim
    imagem: "/images/produtos/9bd61fc3-26e5-463e-ba6c-72c633dadcc1.webp",
  },
  {
    rotulo: "Multiusos",
    categoria: "Multiusos",
    // multiuso-bactericida-azulim
    imagem: "/images/produtos/3c61167a-f152-4fe6-8254-03dd0ee4e9e8.webp",
  },
  {
    rotulo: "Desinfetantes",
    categoria: "Desinfetantes",
    // desinfetante-azulim
    imagem: "/images/produtos/50b2a0e4-f8fc-456e-87ef-85b6ddb33341.webp",
  },
  {
    rotulo: "Detergentes",
    categoria: "Detergentes",
    // detergente-amoniacal-azulim
    imagem: "/images/produtos/c807206f-2a4b-4b1a-b77f-d96d06bab759.webp",
  },
  {
    rotulo: "Desengordurantes",
    categoria: "Desengordurantes",
    // desengordurante-azulim
    imagem: "/images/produtos/9bbdbf37-0689-45e5-8cdb-a65a353f4345.webp",
  },
  {
    rotulo: "Amaciantes",
    categoria: "Amaciantes",
    // amaciante-plus-tuff
    imagem: "/images/produtos/8c72ad96-fa77-4ada-910b-1cefca61df42.webp",
  },
  {
    rotulo: "Sabão em pó",
    categoria: "Sabão em pó",
    // sabao-em-po-tuff
    imagem: "/images/produtos/4acd1da8-4faa-4c64-9149-62c676ec669b.webp",
  },
  {
    rotulo: "Alvejantes",
    categoria: "Alvejantes",
    // tira-manchas-tuff
    imagem: "/images/produtos/5da568ad-28c3-4ce9-a193-6f4f54bc0be6.webp",
  },
  {
    rotulo: "Clorados",
    categoria: "Água Sanitária e Clorados",
    // cloro-gel-azulim
    imagem: "/images/produtos/7360ef76-074a-451f-a168-8f2e2e39ad80.webp",
  },
  {
    rotulo: "Assepsia",
    categoria: "Assepsia",
    // sabonete-espuma-asseptgel
    imagem: "/images/produtos/61bf86ec-5200-43e7-b5f0-e268e7bf2551.webp",
  },
  {
    rotulo: "Ceras",
    categoria: "Ceras",
    // cera-acrilica-start
    imagem: "/images/produtos/7cb4e219-6874-45be-8452-5e96fa5bf48f.webp",
  },
  {
    rotulo: "Pisos",
    categoria: "Tratamento de Pisos",
    // acabamento-acrilico-startpro
    imagem: "/images/produtos/061d458e-befa-4aa1-a071-0b1e46618c34.webp",
  },
  {
    rotulo: "Automotiva",
    categoria: "Automotiva",
    // cera-automotiva-indy
    imagem: "/images/produtos/d3f04d56-4265-4493-9082-df275683f109.webp",
  },
  {
    rotulo: "Piscinas",
    categoria: "Tratamento de Águas",
    // aquashock-aquapool
    imagem: "/images/produtos/84569932-2078-43d5-9a59-1b4eab634a2a.webp",
  },
  {
    rotulo: "Cabelos",
    categoria: "Cuidados para cabelos",
    // condicionador-biohair
    imagem: "/images/produtos/c4a1e481-cc22-4676-b8be-57318c881ba5.webp",
  },
  {
    rotulo: "Alimentícia",
    categoria: "Alimentícia",
    // desinfetante-hortifruticola-qualifood
    imagem: "/images/produtos/ca22d74c-83f9-49ee-818a-1e872a5672d0.webp",
  },
];

const temaPadrao = temas.Tuff;

export function BrandUniverse() {
  const trilhoRef = useRef<HTMLUListElement>(null);
  const reinicioRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [noInicio, setNoInicio] = useState(true);

  const reiniciarCiclo = useCallback(() => {
    const trilho = trilhoRef.current;
    if (!trilho) return;

    const primeiro = trilho.querySelector<HTMLElement>("[data-carousel-first]");
    const primeiraCopia = trilho.querySelector<HTMLElement>("[data-carousel-copy]");
    if (!primeiro || !primeiraCopia) return;

    const larguraDoCiclo = primeiraCopia.offsetLeft - primeiro.offsetLeft;
    if (larguraDoCiclo <= 0 || trilho.scrollLeft < larguraDoCiclo - 2) return;

    // A cópia é visualmente idêntica. Voltamos para a mesma posição do ciclo
    // original sem animação, portanto a continuidade para a direita não pisca.
    const posicaoEquivalente = Math.max(0, trilho.scrollLeft - larguraDoCiclo);
    trilho.style.scrollBehavior = "auto";
    trilho.scrollLeft = posicaoEquivalente;
    setNoInicio(posicaoEquivalente <= 2);

    requestAnimationFrame(() => trilho.style.removeProperty("scroll-behavior"));
  }, []);

  const sincronizar = useCallback(() => {
    const trilho = trilhoRef.current;
    if (!trilho) return;

    setNoInicio(trilho.scrollLeft <= 2);

    if (reinicioRef.current) clearTimeout(reinicioRef.current);
    reinicioRef.current = setTimeout(reiniciarCiclo, 180);
  }, [reiniciarCiclo]);

  useEffect(() => {
    sincronizar();
    window.addEventListener("resize", sincronizar);
    return () => {
      window.removeEventListener("resize", sincronizar);
      if (reinicioRef.current) clearTimeout(reinicioRef.current);
    };
  }, [sincronizar]);

  function andar(direcao: 1 | -1) {
    const trilho = trilhoRef.current;
    if (!trilho) return;

    const cartao = trilho.querySelector("li");
    // Um cartão inteiro mais o gap; sem cartão medido, quase uma tela.
    const passo = cartao ? cartao.clientWidth + 22 : trilho.clientWidth * 0.85;
    trilho.scrollBy({ left: direcao * passo, behavior: "smooth" });
  }

  return (
    <section
      id="marcas"
      className="scroll-mt-28 overflow-hidden bg-[var(--background)] py-20 sm:py-24 lg:py-28"
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
      </Container>

      {/* RÉGUA DE ATALHOS
          Ela fica encostada no carrossel, sem nenhum texto no meio: as duas
          faixas rolam para o lado e precisam ser lidas como uma coisa só —
          o atalho em cima, a marca embaixo. */}
      <nav
        aria-label="Atalhos por categoria de produto"
        className="mt-10 sm:mt-12"
      >
        {/* O `pt-3` existe por causa do `overflow-x-auto`: rolagem horizontal
            também corta na vertical, e sem essa folga o produto que sobe no
            hover era decepado na borda de cima do trilho. */}
        <ul className="carousel-rail no-scrollbar flex gap-6 overflow-x-auto scroll-smooth pb-1 pt-3 sm:gap-8">
          {atalhos.map((atalho) => (
            <li key={atalho.categoria} className="shrink-0">
              <Link
                href={`/produtos/catalogo?categoria=${encodeURIComponent(atalho.categoria)}`}
                draggable={false}
                className="group flex w-[110px] flex-col items-center gap-2.5 sm:w-[120px]"
              >
                <span className="relative block h-[82px] w-full sm:h-[94px]">
                  <Image
                    src={atalho.imagem}
                    alt=""
                    fill
                    sizes="108px"
                    draggable={false}
                    className="select-none object-contain transition-transform duration-300 group-hover:-translate-y-1"
                  />
                </span>

                {/* Caixa de duas linhas em todos: sem altura fixa, um rótulo
                    que quebrasse desalinharia a fileira inteira. O `hyphens`
                    é para "Desengordurantes", que é uma palavra só e não tem
                    onde quebrar sozinha — a página é `lang="pt-BR"`, então o
                    navegador sabe onde pôr o hífen. */}
                <span className="flex h-9 w-full items-start justify-center hyphens-auto break-words text-center text-[12.5px] font-semibold leading-tight text-[#1d1d1f] transition-colors duration-200 group-hover:text-[var(--brand-blue-800)] sm:text-[13.5px]">
                  {atalho.rotulo}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* O trilho sai da Container e recebe a mesma margem por dentro: assim o
          primeiro cartão alinha com o título e o último some na borda da tela,
          em vez de parar num vazio no meio do caminho. */}
      <div className="relative mt-7 sm:mt-8">
        <ul
          ref={trilhoRef}
          onScroll={sincronizar}
          className="carousel-rail no-scrollbar flex snap-x snap-mandatory gap-[22px] overflow-x-auto scroll-smooth pb-2"
        >
          {[0, 1].flatMap((ciclo) => brandUniverse.map((marca, index) => {
            const tema = temas[marca.name] ?? temaPadrao;

            return (
              <li
                key={`${ciclo}-${marca.name}`}
                className="snap-start"
                aria-hidden={ciclo === 1 ? true : undefined}
                data-carousel-first={ciclo === 0 && index === 0 ? "" : undefined}
                data-carousel-copy={ciclo === 1 && index === 0 ? "" : undefined}
              >
                <Link
                  href={linkDaMarca(marca.name)}
                  aria-label={`${marca.name} — ${marca.tagline}`}
                  draggable={false}
                  tabIndex={ciclo === 1 ? -1 : undefined}
                  className={`group relative flex h-[368px] w-[290px] flex-col overflow-hidden rounded-[18px] p-5 transition-shadow duration-300 hover:shadow-[0_30px_70px_-40px_rgba(4,25,60,0.5)] sm:h-[432px] sm:w-[340px] sm:p-6 lg:h-[483px] lg:w-[380px] xl:h-[502px] xl:w-[395px] ${tema.fundo} ${tema.texto}`}
                >
                  {/* A foto é o cartão inteiro. Nenhuma cortina por cima: a
                      área limpa onde o texto assenta já vem embutida na
                      imagem, e a proporção do arquivo é a mesma do cartão, de
                      modo que o `object-cover` não corta nada. */}
                  <Image
                    src={tema.foto}
                    alt=""
                    fill
                    sizes={TAMANHOS}
                    draggable={false}
                    className="select-none object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />

                  {/* A altura fixa mantém logo e título na mesma linha de base
                      em todas as marcas, sem disputar espaço com o produto. */}
                  <div className="relative h-[142px] shrink-0 sm:h-[166px]">
                    {/* O nome já está escrito no logo, no tipo da própria
                        marca. Repeti-lo logo abaixo, na fonte do site, era
                        dizer a mesma coisa duas vezes. O título continua no
                        HTML — para o leitor de tela e para o buscador — mas
                        não na tela. */}
                    <h3 className="sr-only">{marca.name}</h3>

                    {/* A linha do logo tem altura fixa e a arte se encaixa
                        dentro dela. Os cinco desenhos têm proporções muito
                        diferentes — do Tuff, quase quadrado, ao Start PRO,
                        quatro vezes mais largo que alto — e sem uma caixa
                        comum um sairia do tamanho do outro. */}
                    <span className="flex h-11 items-center sm:h-14">
                      <Image
                        src={tema.logo}
                        alt=""
                        width={tema.logoW}
                        height={96}
                        draggable={false}
                        className="h-9 w-auto max-w-[116px] select-none object-contain sm:h-11 sm:max-w-[132px]"
                      />
                    </span>

                    <p className="mt-3.5 line-clamp-3 max-w-[24ch] text-[20px] font-black leading-[1.08] tracking-[-0.035em] sm:mt-4 sm:text-[22px] lg:text-[24px]">
                      {marca.tagline}
                    </p>
                  </div>
                </Link>
              </li>
            );
          }))}
        </ul>

        {/* A esquerda respeita o começo real. A direita permanece disponível:
            depois do último cartão ela atravessa para a cópia do primeiro e o
            trilho se reposiciona, sem animação perceptível, no ciclo original. */}
        <button
          type="button"
          onClick={() => andar(-1)}
          aria-hidden={noInicio}
          tabIndex={noInicio ? -1 : undefined}
          aria-label="Ver as marcas anteriores"
          className={`absolute left-3 top-[calc(50%-4px)] grid size-11 -translate-y-1/2 place-items-center rounded-full bg-[#e8e8ed]/92 text-[#1d1d1f] backdrop-blur transition duration-300 hover:bg-[#dcdce3] sm:left-5 sm:size-14 ${
            noInicio ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <ChevronLeft className="size-5 sm:size-6" strokeWidth={2.2} />
        </button>

        <button
          type="button"
          onClick={() => andar(1)}
          aria-label="Ver as próximas marcas"
          className="absolute right-3 top-[calc(50%-4px)] grid size-11 -translate-y-1/2 place-items-center rounded-full bg-[#e8e8ed]/92 text-[#1d1d1f] opacity-100 backdrop-blur transition duration-300 hover:bg-[#dcdce3] sm:right-5 sm:size-14"
        >
          <ChevronRight className="size-5 sm:size-6" strokeWidth={2.2} />
        </button>
      </div>

      <Container>
        <p className="mt-10 text-sm leading-6 text-slate-500">
          Além dessas, o portfólio da indústria reúne mais de 20 marcas —
          Qualimilk e Qualifood para o agro e o setor alimentício, Indy para
          estética automotiva, Aquapool para piscinas, Free Pet, Galeno, Vorel e
          outras.
        </p>
      </Container>
    </section>
  );
}
