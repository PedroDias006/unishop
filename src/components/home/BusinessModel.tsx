import Image from "next/image";
import { Container } from "@/components/ui/Container";

const institutionalVideoUrl =
  "https://www.youtube-nocookie.com/embed/z-79Qq5wZ1s?rel=0&modestbranding=1";

const numeros = [
  { valor: "1987", rotulo: "início da Start Química em Uberlândia (MG)" },
  { valor: "250 mil m²", rotulo: "de terreno na fábrica" },
  { valor: "+4.900", rotulo: "colaboradores diretos e indiretos" },
  { valor: "+500", rotulo: "lojas em 27 estados" },
];

const fotos = [
  {
    src: "/images/empresa/industria.webp",
    alt: "Vista aérea da fábrica da Start Química, em Uberlândia (MG)",
    etiqueta: "Onde tudo começa",
    titulo: "Indústria própria em Uberlândia",
    texto: "Produção, tecnologia e distribuição reunidas em uma estrutura de 250 mil m².",
  },
  {
    src: "/images/empresa/loja.webp",
    alt: "Fachada de uma unidade da Rede Unishop",
    etiqueta: "Onde tudo chega",
    titulo: "O mesmo padrão em todo o país",
    texto: "Uma rede de lojas próxima de quem compra e preparada para diferentes rotinas.",
  },
  {
    src: "/images/empresa/parceiro.webp",
    alt: "Parceiro da Rede Unishop em frente à unidade dele",
    etiqueta: "Quem faz acontecer",
    titulo: "Parceiros, donos do próprio negócio",
    texto: "Experiência de rede com atendimento local e relacionamento de verdade.",
  },
];

/**
 * O vídeo subiu para o lado do título e o carrossel virou uma grade de três.
 *
 * O trilho tinha dois problemas. O primeiro é que ele existia para um conteúdo
 * que não pedia trilho: são três fotos, e três cabem lado a lado — o carrossel
 * só servia para empurrar a terceira para fora da tela e pedir um clique na
 * seta para ver o que já caberia de graça. O segundo é que o vídeo estava lá
 * dentro, como quarto cartão: a peça mais forte da seção ficava atrás de uma
 * rolagem horizontal enquanto sobrava meia largura vazia ao lado do título.
 *
 * Sem trilho não há estado, referência nem efeito para sincronizar as setas.
 * O componente deixou de ser `"use client"` e passou a não mandar JavaScript
 * nenhum para o navegador.
 */
export function BusinessModel() {
  return (
    <section
      id="modelo"
      className="scroll-mt-28 overflow-hidden bg-[var(--background)] py-20 sm:py-24 lg:py-28"
    >
      <Container>
        {/* No telefone a grade vira pilha, e a `order` mantém o vídeo abaixo do
            texto: abrir a seção com um player faz o visitante bater num vídeo
            antes de saber do que ela trata. Em tela grande ele ocupa a coluna
            da direita, que era justamente o espaço vazio ao lado do título. */}
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,30rem)] lg:gap-14">
          <div className="order-1">
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="h-px w-10 bg-[var(--brand-yellow)]"
              />
              <p className="seccao-olho">Conheça a Unishop</p>
            </div>

            <h2 className="mt-6 seccao-titulo">
              Uma história feita para{" "}
              <span className="text-[var(--brand-yellow)]">crescer junto.</span>
            </h2>

            <p className="mt-6 max-w-2xl seccao-apoio">
              Tudo começou numa garagem em Uberlândia, fabricando produtos de
              limpeza automotiva. Hoje, indústria, distribuição e lojas formam a
              mesma cadeia — do frasco que sai da linha ao balcão que atende você.
            </p>
          </div>

          <div className="order-2">
            <div className="overflow-hidden rounded-[18px] bg-[var(--brand-blue-950)] shadow-[0_28px_70px_-40px_rgba(6,31,73,0.55)]">
              <div className="aspect-video">
                <iframe
                  className="h-full w-full"
                  src={institutionalVideoUrl}
                  title="Vídeo institucional da Rede Unishop"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-7 bg-[var(--brand-yellow)]" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Nossa história em vídeo
              </p>
            </div>
          </div>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-y border-[#0a376a]/10 py-8 sm:mt-12 sm:grid-cols-4 sm:gap-x-8 sm:py-9">
          {numeros.map((numero) => (
            <div key={numero.valor} className="min-w-0">
              <dt className="text-[30px] font-black leading-none tracking-[-0.045em] text-[var(--brand-blue-900)] sm:text-[34px] lg:text-[38px]">
                {numero.valor}
              </dt>
              <dd className="mt-2 max-w-[18ch] text-xs font-semibold leading-[1.45] text-slate-500 sm:text-[13px]">
                {numero.rotulo}
              </dd>
            </div>
          ))}
        </dl>

        {/* Três colunas em tela grande, porque três cabem. No telefone viram
            uma faixa que corre para o lado — empilhados dariam ~1200px de
            rolagem num trecho que é complemento, não conteúdo principal. */}
        <ul className="mt-10 -mx-5 flex snap-x snap-mandatory list-none gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:snap-none sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0">
          {fotos.map((foto) => (
            <li
              key={foto.src}
              className="w-[80%] shrink-0 snap-start sm:w-auto sm:shrink"
            >
              <article className="group relative aspect-[4/5] overflow-hidden rounded-[18px] bg-slate-200">
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 80vw, 31vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061f49]/95 via-[#061f49]/20 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--brand-yellow)]">
                    {foto.etiqueta}
                  </p>
                  <h3 className="mt-3 max-w-[14ch] text-[22px] font-black leading-[1.05] tracking-[-0.04em] sm:text-[25px]">
                    {foto.titulo}
                  </h3>
                  <p className="mt-3 max-w-[33ch] text-sm leading-6 text-white/72">
                    {foto.texto}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-4 border-t border-[#0a376a]/10 pt-8 sm:flex-row sm:items-center sm:gap-6">
          <Image
            src="/images/imprensa/selo-exame-negocios-em-expansao.webp"
            alt="Selo do ranking EXAME Negócios em Expansão 2024"
            width={1400}
            height={148}
            loading="lazy"
            sizes="(max-width: 640px) 90vw, 340px"
            className="h-auto w-full max-w-[310px] sm:max-w-[340px]"
          />
          <p className="max-w-sm text-xs leading-5 text-slate-500">
            Selecionada entre milhares de empresas inscritas em todo o Brasil,
            em parceria com o BTG Pactual.
          </p>
        </div>
      </Container>
    </section>
  );
}
