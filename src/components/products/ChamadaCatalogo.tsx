import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { marcasDoCatalogo, produtos } from "@/data/produtos";

/**
 * A porta de entrada da vitrine, no fim da página de produtos.
 *
 * As cinco marcas em destaque acima têm cenário, vídeo e história. Aqui é o
 * contrário: a promessa é quantidade — o catálogo inteiro da indústria, que é
 * o que a loja pode encomendar. As miniaturas são só uma amostra do que vem
 * depois do clique.
 */
export function ChamadaCatalogo() {
  const marcasEmDestaque = [
    "Azulim",
    "Tuff",
    "Asseptgel",
    "Start PRO",
    "Pedrex",
    "Aquapool",
  ];
  const amostra = marcasEmDestaque.flatMap((marca) => {
    const produto = produtos.find((item) => item.marca === marca && item.imagem);
    return produto ? [produto] : [];
  });
  const variantes = produtos.reduce((soma, produto) => soma + produto.variantes.length, 0);

  return (
    <section className="relative z-10 -mt-8 overflow-hidden rounded-t-[2.75rem] border-t border-slate-200/80 bg-[#f6f8fb] py-16 sm:-mt-12 sm:rounded-t-[4rem] sm:py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-52 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(31,102,196,0.12)_0%,rgba(31,102,196,0)_68%)]"
      />

      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16 xl:gap-20">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-[var(--brand-blue-700)]" aria-hidden="true" />
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--brand-blue-700)]">
                Portfólio Unishop
              </p>
            </div>

            <h2 className="mt-5 text-balance text-4xl font-black leading-[1.03] tracking-[-0.05em] text-[var(--brand-blue-950)] sm:text-5xl">
              Um catálogo gigante. Uma experiência leve.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600">
              Da limpeza da casa à operação industrial, todo o mix da rede está
              reunido em uma vitrine simples de explorar — por marca, categoria ou
              ambiente.
            </p>

            <dl className="mt-9 grid grid-cols-3 border-y border-slate-200 py-5">
              <div className="pr-3">
                <dt className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                  Produtos
                </dt>
                <dd className="mt-1 text-2xl font-black tracking-[-0.04em] text-[var(--brand-blue-950)]">
                  {produtos.length}
                </dd>
              </div>
              <div className="border-l border-slate-200 px-4">
                <dt className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                  Variações
                </dt>
                <dd className="mt-1 text-2xl font-black tracking-[-0.04em] text-[var(--brand-blue-950)]">
                  {variantes}
                </dd>
              </div>
              <div className="border-l border-slate-200 pl-4">
                <dt className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                  Marcas
                </dt>
                <dd className="mt-1 text-2xl font-black tracking-[-0.04em] text-[var(--brand-blue-950)]">
                  {marcasDoCatalogo.length}
                </dd>
              </div>
            </dl>

            <Link
              href="/produtos/catalogo"
              className="group mt-9 inline-flex min-h-14 items-center gap-4 rounded-full bg-[var(--brand-blue-950)] py-2 pl-7 pr-2 text-sm font-black text-white shadow-[0_16px_34px_-18px_rgba(6,31,73,0.7)] transition hover:-translate-y-0.5 hover:bg-[var(--brand-blue-900)]"
            >
              Explorar catálogo completo
              <span className="grid size-10 place-items-center rounded-full bg-[var(--brand-yellow)] text-[var(--brand-blue-950)]">
                <ArrowRight size={17} className="transition group-hover:translate-x-1" />
              </span>
            </Link>
          </div>

          <div className="relative rounded-[2rem] border border-white bg-white/80 p-4 shadow-[0_32px_90px_-50px_rgba(6,31,73,0.42)] backdrop-blur-sm sm:p-6">
            <div className="flex items-end justify-between gap-5 px-1 pb-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--brand-blue-700)]">
                  Uma pequena amostra
                </p>
                <h3 className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--brand-blue-950)] sm:text-2xl">
                  Soluções para cada rotina.
                </h3>
              </div>
              <p className="hidden text-right text-xs font-bold leading-5 text-slate-400 sm:block">
                6 de {produtos.length}
                <br />produtos
              </p>
            </div>

            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {amostra.map((produto) => (
                <li key={produto.slug}>
                  <Link
                    href={`/produtos/${produto.slug}`}
                    className="group flex h-full flex-col rounded-[1.4rem] border border-slate-200/80 bg-[#f8fafc] p-2.5 transition duration-300 hover:-translate-y-1 hover:border-[#bdd7f0] hover:bg-white hover:shadow-[0_18px_38px_-28px_rgba(6,31,73,0.48)] sm:p-3"
                  >
                    <div className="relative aspect-[5/4] overflow-hidden rounded-[1rem] bg-white">
                      <Image
                        src={produto.imagem}
                        alt={produto.nome}
                        fill
                        unoptimized
                        loading="lazy"
                        sizes="(min-width: 1024px) 180px, (min-width: 640px) 28vw, 42vw"
                        className="object-contain p-3 transition duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="px-1 pb-1 pt-3">
                      <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[var(--brand-blue-700)]">
                        {produto.marca}
                      </p>
                      <p className="mt-1 text-xs font-extrabold leading-4 text-slate-700">
                        {produto.nome}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
