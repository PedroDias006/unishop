"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  PackageSearch,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { eventoFiltroDaVitrine } from "@/lib/analytics";
import {
  normalizarBusca,
  type ProdutoDaVitrine,
  type Setor,
} from "@/data/produtos";
import { cenarioDoProduto } from "@/lib/cenarios-produtos";

/**
 * A vitrine: o catálogo inteiro da indústria numa página só.
 *
 * São centenas de produtos, então três decisões seguram o peso da página:
 *
 * 1. O cartão recebe só o que ele desenha (nome, marca, imagem, variações).
 *    Descrição, modo de uso e aplicações moram na página do produto.
 * 2. A grade cresce em blocos de 24. O filtro roda sobre a lista inteira, mas
 *    o DOM só ganha o que já foi pedido.
 * 3. Toda imagem é `lazy` e já vem no tamanho final do cartão — nada passa
 *    pelo otimizador em tempo de requisição.
 *
 * A troca de fragrância acontece dentro do cartão, sem sair da vitrine: é a
 * mesma família de produto mudando de foto.
 */

const PASSO = 24;

type Filtros = {
  busca: string;
  setor: string;
  marca: string;
  categoria: string;
  ambiente: string;
};

const FILTROS_VAZIOS: Filtros = {
  busca: "",
  setor: "",
  marca: "",
  categoria: "",
  ambiente: "",
};

type VitrineProps = {
  produtos: ProdutoDaVitrine[];
  setores: Setor[];
  marcas: string[];
  categorias: string[];
  ambientes: string[];
  inicial?: Partial<Filtros>;
  integrada?: boolean;
};

export function Vitrine({
  produtos,
  setores,
  marcas,
  categorias,
  ambientes,
  inicial,
  integrada = false,
}: VitrineProps) {
  const [filtros, setFiltros] = useState<Filtros>({ ...FILTROS_VAZIOS, ...inicial });
  const [visiveis, setVisiveis] = useState(PASSO);
  const primeiraRenderizacao = useRef(true);
  const trilhoDeMarcas = useRef<HTMLDivElement>(null);

  const contagemPorMarca = useMemo(() => {
    const contagem = new Map<string, number>();
    for (const produto of produtos) {
      if (!produto.marca) continue;
      contagem.set(produto.marca, (contagem.get(produto.marca) ?? 0) + 1);
    }
    return contagem;
  }, [produtos]);

  const filtrados = useMemo(() => {
    const termo = normalizarBusca(filtros.busca.trim());

    return produtos.filter((produto) => {
      if (filtros.setor && !produto.setores.includes(filtros.setor)) return false;
      if (filtros.marca && produto.marca !== filtros.marca) return false;
      if (filtros.categoria && !produto.categorias.includes(filtros.categoria)) return false;
      if (filtros.ambiente && !produto.ambientes.includes(filtros.ambiente)) return false;
      if (termo && !produto.busca.includes(termo)) return false;
      return true;
    });
  }, [produtos, filtros]);

  /**
   * O endereço acompanha os filtros para que uma seleção possa ser mandada
   * por link. É `replaceState` de propósito: trocar de marca não é navegação,
   * e empilhar cada clique no botão "voltar" seria um pesadelo.
   */
  useEffect(() => {
    if (primeiraRenderizacao.current) {
      primeiraRenderizacao.current = false;
      return;
    }

    const parametros = new URLSearchParams();
    for (const [chave, valor] of Object.entries(filtros)) {
      if (valor) parametros.set(chave, valor);
    }

    const consulta = parametros.toString();
    window.history.replaceState(null, "", consulta ? `?${consulta}` : window.location.pathname);
  }, [filtros]);

  /**
   * Todo filtro passa por aqui porque a grade precisa voltar ao começo junto:
   * quem já pediu "mostrar mais" três vezes e troca de marca não pode continuar
   * olhando o rodapé de uma lista que nem existe mais.
   */
  function mudarFiltros(proximo: (atual: Filtros) => Filtros) {
    setFiltros(proximo);
    setVisiveis(PASSO);
  }

  function alternar(campo: keyof Filtros, valor: string) {
    // O evento fica fora do atualizador de estado de propósito: em modo
    // estrito o React chama o atualizador duas vezes, e o GTM contaria dois.
    const proximo = filtros[campo] === valor ? "" : valor;

    eventoFiltroDaVitrine(campo, proximo);
    mudarFiltros((atual) => ({ ...atual, [campo]: proximo }));
  }

  function definir(campo: keyof Filtros, valor: string) {
    // A busca dispararia um evento por tecla; o resto é clique, e clique conta.
    if (campo !== "busca") eventoFiltroDaVitrine(campo, valor);
    mudarFiltros((atual) => ({ ...atual, [campo]: valor }));
  }

  function rolarMarcas(direcao: -1 | 1) {
    trilhoDeMarcas.current?.scrollBy({
      left: direcao * Math.min(520, window.innerWidth * 0.7),
      behavior: "smooth",
    });
  }

  const temFiltro = Object.values(filtros).some(Boolean);
  const filtrosAtivos: { campo: keyof Filtros; rotulo: string }[] = [];

  if (filtros.busca) {
    filtrosAtivos.push({ campo: "busca", rotulo: `Busca: ${filtros.busca}` });
  }
  if (filtros.setor) {
    const setor = setores.find((item) => item.id === filtros.setor);
    if (setor) filtrosAtivos.push({ campo: "setor", rotulo: setor.nome });
  }
  if (filtros.marca) {
    filtrosAtivos.push({ campo: "marca", rotulo: filtros.marca });
  }
  if (filtros.categoria) {
    filtrosAtivos.push({ campo: "categoria", rotulo: filtros.categoria });
  }
  if (filtros.ambiente) {
    filtrosAtivos.push({ campo: "ambiente", rotulo: filtros.ambiente });
  }

  const resumoDosResultados =
    filtrados.length === produtos.length
      ? `${produtos.length} produtos no catálogo`
      : filtrados.length === 1
        ? "1 produto encontrado"
        : `${filtrados.length} produtos encontrados`;

  return (
    <>
      {integrada ? (
        <section className="relative z-10 -mt-8 overflow-hidden rounded-t-[2.75rem] border-t border-slate-200/80 bg-[var(--background)] pb-9 pt-16 sm:-mt-12 sm:rounded-t-[4rem] sm:pb-11 sm:pt-20">
          <Container>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--brand-blue-700)]">
                  Catálogo completo
                </p>
                <h2 className="mt-3 max-w-2xl text-balance text-3xl font-black leading-[1.05] tracking-[-0.045em] text-[var(--brand-blue-950)] sm:text-4xl">
                  Encontre a solução certa para cada rotina.
                </h2>
              </div>
              <p className="max-w-md text-sm font-semibold leading-6 text-slate-500 sm:text-right">
                {produtos.length} produtos organizados por uso, marca, categoria e
                ambiente.
              </p>
            </div>
          </Container>
        </section>
      ) : (
        <section className="relative overflow-hidden bg-[linear-gradient(118deg,#041d46_0%,#07356f_55%,#0c5aa2_100%)] pb-32 pt-32 text-white sm:pb-36 sm:pt-40">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(115,198,255,0.28)_0%,rgba(115,198,255,0)_68%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-[55%] hidden w-px bg-white/10 lg:block"
          />

          <Container className="relative">
            <div className="grid items-end gap-12 lg:grid-cols-[1fr_0.72fr] lg:gap-16">
              <div>
                <div className="flex items-center gap-3">
                  <span
                    className="h-px w-9 bg-[var(--brand-yellow)]"
                    aria-hidden="true"
                  />
                  <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--brand-yellow)]">
                    Catálogo completo
                  </p>
                </div>

                <h1 className="mt-5 max-w-3xl text-balance text-4xl font-black leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                  Encontre o produto certo para o que você precisa.
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">
                  Pesquise pelo nome ou refine por uso, marca e categoria. O catálogo
                  inteiro da rede, organizado para você chegar à solução sem perder
                  tempo.
                </p>
              </div>

              <dl className="grid grid-cols-3 gap-3 lg:pb-1">
                <ResumoDoCatalogo valor={produtos.length} rotulo="produtos" />
                <ResumoDoCatalogo valor={marcas.length} rotulo="marcas" />
                <ResumoDoCatalogo valor={categorias.length} rotulo="categorias" />
              </dl>
            </div>
          </Container>
        </section>
      )}

      <section
        id="filtros-catalogo"
        className={`relative z-10 scroll-mt-28 pb-5 ${
          integrada ? "bg-[var(--background)]" : "-mt-20"
        }`}
      >
        <Container>
          <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_28px_80px_-42px_rgba(6,31,73,0.5)]">
            <div className="grid gap-4 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_230px_230px]">
              <div>
                <label
                  htmlFor="busca-vitrine"
                  className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-slate-400"
                >
                  O que você procura?
                </label>
                <div className="relative">
                  <Search
                    size={19}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--brand-blue-700)]"
                    aria-hidden="true"
                  />
                  <input
                    id="busca-vitrine"
                    type="search"
                    value={filtros.busca}
                    onChange={(evento) => definir("busca", evento.target.value)}
                    placeholder="Digite um produto, marca ou necessidade"
                    className="min-h-14 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] pl-12 pr-12 text-[15px] font-semibold text-slate-900 outline-none transition placeholder:font-medium placeholder:text-slate-400 focus:border-[var(--brand-blue-700)] focus:bg-white focus:ring-4 focus:ring-blue-100/70"
                  />
                  {filtros.busca && (
                    <button
                      type="button"
                      onClick={() => definir("busca", "")}
                      aria-label="Limpar busca"
                      className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>
              </div>

              <Selecao
                rotulo="Categoria"
                valor={filtros.categoria}
                opcoes={categorias}
                onChange={(valor) => definir("categoria", valor)}
              />
              <Selecao
                rotulo="Ambiente"
                valor={filtros.ambiente}
                opcoes={ambientes}
                onChange={(valor) => definir("ambiente", valor)}
              />
            </div>

            <div className="border-t border-slate-100 px-5 py-5 sm:px-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                <div className="flex min-w-40 items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
                  <SlidersHorizontal size={15} aria-hidden="true" /> Onde vai usar?
                </div>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por setor">
                  <Chip ativo={!filtros.setor} onClick={() => definir("setor", "")}>
                    Todos
                  </Chip>
                  {setores.map((setor) => (
                    <Chip
                      key={setor.id}
                      ativo={filtros.setor === setor.id}
                      onClick={() => alternar("setor", setor.id)}
                    >
                      {setor.nome}
                    </Chip>
                  ))}
                </div>

                {temFiltro && (
                  <button
                    type="button"
                    onClick={() => mudarFiltros(() => FILTROS_VAZIOS)}
                    className="inline-flex min-h-10 items-center gap-2 self-start rounded-full px-3 text-[13px] font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 lg:ml-auto lg:self-auto"
                  >
                    <X size={14} /> Limpar tudo
                  </button>
                )}
              </div>
            </div>

            <div className="border-t border-slate-100 px-5 py-5 sm:px-6">
              <div className="mb-3 flex items-center justify-between gap-4">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
                  Escolha uma marca
                </p>
                <div className="flex items-center gap-2">
                  <p className="mr-1 hidden text-xs font-bold text-slate-400 sm:block">
                    {marcas.length} disponíveis
                  </p>
                  <button
                    type="button"
                    onClick={() => rolarMarcas(-1)}
                    aria-label="Ver marcas anteriores"
                    className="grid size-8 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[var(--brand-blue-900)]"
                  >
                    <ChevronLeft size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => rolarMarcas(1)}
                    aria-label="Ver próximas marcas"
                    className="grid size-8 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[var(--brand-blue-900)]"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
              <div
                ref={trilhoDeMarcas}
                className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
                role="group"
                aria-label="Filtrar por marca"
              >
                <Chip ativo={!filtros.marca} onClick={() => definir("marca", "")}>
                  Todas as marcas
                </Chip>
                {marcas.map((marca) => (
                  <Chip
                    key={marca}
                    ativo={filtros.marca === marca}
                    onClick={() => alternar("marca", marca)}
                  >
                    {marca}
                    <span className="ml-1.5 text-[11px] font-bold opacity-55">
                      {contagemPorMarca.get(marca) ?? 0}
                    </span>
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <div className="sticky top-[76px] z-20 border-y border-slate-200/80 bg-white/94 backdrop-blur-xl sm:top-[84px]">
        <Container className="flex min-h-16 items-center justify-between gap-4 py-2">
          <div aria-live="polite">
            <p className="text-sm font-black text-[var(--brand-blue-950)]">
              {resumoDosResultados}
            </p>
            <p className="hidden text-xs font-semibold text-slate-400 sm:block">
              Exibindo {Math.min(visiveis, filtrados.length)} agora
            </p>
          </div>
          <a
            href="#filtros-catalogo"
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-[13px] font-black text-[var(--brand-blue-900)] transition hover:border-blue-200 hover:bg-blue-50"
          >
            <SlidersHorizontal size={15} /> Ajustar filtros
            {filtrosAtivos.length > 0 && (
              <span className="grid size-5 place-items-center rounded-full bg-[var(--brand-blue-900)] text-[10px] text-white">
                {filtrosAtivos.length}
              </span>
            )}
          </a>
        </Container>
      </div>

      <section className="bg-[var(--background)] py-10 sm:py-14">
        <Container>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--brand-blue-700)]">
                Vitrine de produtos
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[var(--brand-blue-950)] sm:text-3xl">
                {temFiltro ? "Resultados para sua seleção" : "Explore todo o catálogo"}
              </h2>
            </div>
            <p className="text-sm font-semibold text-slate-500">
              Clique em um produto para ver detalhes e formas de uso.
            </p>
          </div>

          {filtrosAtivos.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-2" aria-label="Filtros ativos">
              <span className="mr-1 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400">
                Filtrando por
              </span>
              {filtrosAtivos.map((filtro) => (
                <button
                  key={filtro.campo}
                  type="button"
                  onClick={() => definir(filtro.campo, "")}
                  className="inline-flex min-h-9 items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 text-[12px] font-bold text-[var(--brand-blue-900)] transition hover:border-blue-200 hover:bg-blue-100"
                  aria-label={`Remover filtro ${filtro.rotulo}`}
                >
                  {filtro.rotulo} <X size={13} />
                </button>
              ))}
            </div>
          )}

          {filtrados.length === 0 ? (
            <div className="mt-8 rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center sm:p-14">
              <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-blue-50 text-[var(--brand-blue-700)]">
                <PackageSearch size={25} />
              </span>
              <p className="mt-5 text-xl font-black tracking-[-0.03em] text-slate-900">
                Não encontramos essa combinação.
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                Tente um termo mais simples ou remova alguns filtros para ampliar os
                resultados.
              </p>
              <button
                type="button"
                onClick={() => mudarFiltros(() => FILTROS_VAZIOS)}
                className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--brand-blue-900)] px-6 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[var(--brand-blue-950)]"
              >
                Ver catálogo completo
              </button>
            </div>
          ) : (
            <>
              <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtrados.slice(0, visiveis).map((produto) => (
                  <CartaoDeProduto key={produto.slug} produto={produto} />
                ))}
              </ul>

              {visiveis < filtrados.length && (
                <div className="mt-12 flex flex-col items-center">
                  <p className="mb-4 text-xs font-bold text-slate-400">
                    Você viu {visiveis} de {filtrados.length} produtos
                  </p>
                  <button
                    type="button"
                    onClick={() => setVisiveis((atual) => atual + PASSO)}
                    className="inline-flex min-h-13 items-center gap-3 rounded-full border border-slate-200 bg-white px-7 text-sm font-black text-[var(--brand-blue-900)] shadow-[0_14px_35px_-26px_rgba(6,31,73,0.5)] transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50"
                  >
                    Mostrar mais {Math.min(PASSO, filtrados.length - visiveis)} produtos
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </Container>
      </section>
    </>
  );
}

function ResumoDoCatalogo({ valor, rotulo }: { valor: number; rotulo: string }) {
  return (
    <div className="rounded-2xl border border-white/12 bg-white/8 px-3 py-4 backdrop-blur-sm sm:px-4">
      <dt className="text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl">
        {valor}
      </dt>
      <dd className="mt-1 text-[9px] font-black uppercase tracking-[0.16em] text-white/55 sm:text-[10px]">
        {rotulo}
      </dd>
    </div>
  );
}

function Chip({
  ativo,
  onClick,
  children,
}: {
  ativo: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={ativo}
      className={`inline-flex min-h-10 shrink-0 items-center gap-1 rounded-full border px-4 text-[13px] font-bold transition ${
        ativo
          ? "border-transparent bg-[var(--brand-blue-900)] text-white shadow-[0_10px_22px_-15px_rgba(6,31,73,0.8)]"
          : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50/60 hover:text-[var(--brand-blue-900)]"
      }`}
    >
      {ativo && <Check size={13} strokeWidth={3} aria-hidden="true" />}
      {children}
    </button>
  );
}

function Selecao({
  rotulo,
  valor,
  opcoes,
  onChange,
}: {
  rotulo: string;
  valor: string;
  opcoes: string[];
  onChange: (valor: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
        {rotulo}
      </span>
      <span className="relative block">
        <select
          value={valor}
          onChange={(evento) => onChange(evento.target.value)}
          className="min-h-14 w-full appearance-none rounded-2xl border border-slate-200 bg-[#f8fafc] pl-4 pr-11 text-[14px] font-bold text-slate-700 outline-none transition focus:border-[var(--brand-blue-700)] focus:bg-white focus:ring-4 focus:ring-blue-100/70"
        >
          <option value="">Todas</option>
          {opcoes.map((opcao) => (
            <option key={opcao} value={opcao}>
              {opcao}
            </option>
          ))}
        </select>
        <ChevronDown
          size={17}
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </span>
    </label>
  );
}

function CartaoDeProduto({ produto }: { produto: ProdutoDaVitrine }) {
  const [variante, setVariante] = useState(0);
  const atual = produto.variantes[variante] ?? { rotulo: "", imagem: produto.imagem };
  const cenario = cenarioDoProduto(produto);

  return (
    <li className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/90 bg-white p-3 transition duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-[0_28px_65px_-38px_rgba(4,47,105,0.42)]">
      <Link href={`/produtos/${produto.slug}`} className="flex flex-1 flex-col">
        {/* Numa grade com centenas de itens, o contexto precisa continuar suave
            para não brigar com o rótulo. Os dez cenários são compartilhados e
            carregados sob demanda. */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-slate-100">
          <Image
            src={cenario}
            alt=""
            aria-hidden="true"
            fill
            unoptimized
            loading="lazy"
            sizes="(min-width: 1280px) 240px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.38)_58%,rgba(255,255,255,0.68)_100%)]"
          />
          {produto.marca && (
            <span className="absolute left-3 top-3 z-10 max-w-[62%] truncate rounded-full border border-white/80 bg-white/88 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-[var(--brand-blue-700)] shadow-sm backdrop-blur-sm">
              {produto.marca}
            </span>
          )}
          {produto.variantes.length > 1 && (
            <span className="absolute right-3 top-3 z-10 rounded-full bg-[var(--brand-blue-950)]/88 px-2.5 py-1 text-[9px] font-black text-white backdrop-blur-sm">
              {produto.variantes.length} opções
            </span>
          )}
          <Image
            src={atual.imagem}
            alt={produto.nome}
            fill
            unoptimized
            loading="lazy"
            sizes="(min-width: 1280px) 240px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="z-[2] object-contain p-6 drop-shadow-[0_12px_16px_rgba(6,31,73,0.16)] transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
          {produto.categorias[0] && (
            <p className="text-[10px] font-black uppercase tracking-[0.13em] text-slate-400">
              {produto.categorias[0]}
            </p>
          )}

          <h2 className="mt-2 text-[16px] font-black leading-5 tracking-[-0.025em] text-slate-900">
            {produto.nome}
          </h2>

          <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 text-[12px] font-black text-[var(--brand-blue-900)]">
            Ver detalhes
            <span className="grid size-8 place-items-center rounded-full bg-blue-50 transition duration-300 group-hover:bg-[var(--brand-blue-900)] group-hover:text-white">
              <ArrowUpRight size={15} />
            </span>
          </div>
        </div>
      </Link>

      {produto.variantes.length > 1 && (
        <div className="border-t border-slate-100 px-2 pb-1 pt-3">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-400">
              Trocar variação
            </p>
            <p className="max-w-28 truncate text-[10px] font-bold text-slate-500">
              {atual.rotulo}
            </p>
          </div>
          <div
            className="no-scrollbar flex gap-1.5 overflow-x-auto"
            role="group"
            aria-label={`Variações de ${produto.nome}`}
          >
            {produto.variantes.slice(0, 3).map((opcao, indice) => (
              <button
                key={opcao.rotulo}
                type="button"
                onClick={() => setVariante(indice)}
                aria-pressed={indice === variante}
                title={opcao.rotulo}
                className={`max-w-28 shrink-0 truncate rounded-full px-2.5 py-1.5 text-[10px] font-bold transition ${
                  indice === variante
                    ? "bg-[var(--brand-blue-950)] text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800"
                }`}
              >
                {opcao.rotulo}
              </button>
            ))}
            {produto.variantes.length > 3 && (
              <Link
                href={`/produtos/${produto.slug}`}
                className="shrink-0 rounded-full px-2.5 py-1.5 text-[10px] font-bold text-[var(--brand-blue-700)] transition hover:bg-slate-100"
              >
                +{produto.variantes.length - 3}
              </Link>
            )}
          </div>
        </div>
      )}
    </li>
  );
}

export function ChamadaParceiro() {
  return (
    <section className="bg-[var(--background)] pb-16 pt-2 sm:pb-20">
      <Container>
        <div className="relative flex flex-col items-start gap-8 overflow-hidden rounded-[2.25rem] bg-[linear-gradient(120deg,#061f49_0%,#0a3a79_58%,#0e5ba3_100%)] p-8 text-white shadow-[0_30px_80px_-50px_rgba(6,31,73,0.75)] sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-32 size-80 rounded-full bg-[radial-gradient(circle,rgba(102,190,255,0.3)_0%,rgba(102,190,255,0)_68%)]"
          />
          <div className="relative max-w-2xl">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--brand-yellow)]">
              Oportunidade Unishop
            </p>
            <h2 className="mt-3 text-balance text-3xl font-black tracking-[-0.04em] sm:text-4xl">
              Esse catálogo inteiro na sua loja.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/70">
              O parceiro Unishop compra direto da indústria, sem royalties e sem
              taxa de franquia. É o mesmo mix que você acabou de ver.
            </p>
          </div>

          <Link
            href="/seja-parceiro"
            className="group relative inline-flex min-h-14 shrink-0 items-center gap-3 rounded-full bg-[var(--brand-yellow)] px-7 py-3.5 text-sm font-black text-[var(--brand-blue-950)] transition hover:-translate-y-0.5 hover:bg-[#ffd84d]"
          >
            Quero ser parceiro
            <ArrowRight size={17} className="transition group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
