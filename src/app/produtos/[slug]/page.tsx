import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FichaDoProduto } from "@/components/products/FichaDoProduto";
import { Container } from "@/components/ui/Container";
import { acharProduto, produtos } from "@/data/produtos";
import { siteUrl } from "@/data/site";
import { cenarioDoProduto } from "@/lib/cenarios-produtos";

type PaginaProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return produtos.map((produto) => ({ slug: produto.slug }));
}

export async function generateMetadata({ params }: PaginaProps): Promise<Metadata> {
  const { slug } = await params;
  const produto = acharProduto(slug);

  if (!produto) return { title: "Produto não encontrado" };

  return {
    title: produto.nome,
    description: produto.resumo.slice(0, 180) || produto.descricao.slice(0, 180),
    alternates: { canonical: `/produtos/${produto.slug}` },
    openGraph: {
      title: `${produto.nome} | Rede Unishop`,
      description: produto.resumo.slice(0, 180),
      images: [{ url: produto.imagem }],
    },
  };
}

export default async function ProdutoPage({ params }: PaginaProps) {
  const { slug } = await params;
  const produto = acharProduto(slug);

  if (!produto) notFound();

  // "Quem viu este, vê também": mesma marca primeiro, categoria depois.
  const relacionados = produtos
    .filter((outro) => outro.slug !== produto.slug)
    .map((outro) => ({
      produto: outro,
      peso:
        (outro.marca && outro.marca === produto.marca ? 2 : 0) +
        (outro.categorias.some((categoria) => produto.categorias.includes(categoria)) ? 1 : 0),
    }))
    .filter((item) => item.peso > 0)
    .sort((a, b) => b.peso - a.peso)
    .slice(0, 4)
    .map((item) => item.produto);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: produto.nome,
    description: produto.descricao || produto.resumo,
    image: `${siteUrl}${produto.imagem}`,
    ...(produto.marca ? { brand: { "@type": "Brand", name: produto.marca } } : {}),
    category: produto.categorias[0],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="bg-slate-50 pb-16 pt-32 sm:pb-24 sm:pt-40">
        <Container>
          <Link
            href="/produtos/catalogo"
            className="inline-flex items-center gap-2 text-[13px] font-bold text-slate-500 transition hover:text-[var(--brand-blue-800)]"
          >
            <ArrowLeft size={15} /> Voltar ao catálogo
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="rounded-[32px] border border-slate-200 bg-white p-6 sm:p-8">
              <FichaDoProduto produto={produto} cenario={cenarioDoProduto(produto)} />
            </div>

            <div>
              {produto.marca && (
                <Link
                  href={`/produtos/catalogo?marca=${encodeURIComponent(produto.marca)}`}
                  className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--brand-blue-700)] transition hover:text-[var(--brand-blue-950)]"
                >
                  {produto.marca}
                </Link>
              )}

              <h1 className="mt-4 text-balance text-4xl font-black leading-[1.05] tracking-[-0.045em] text-[var(--brand-blue-950)] sm:text-5xl">
                {produto.nome}
              </h1>

              {produto.palavras.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {produto.palavras.map((palavra) => (
                    <span
                      key={palavra}
                      className="rounded-full bg-[var(--brand-blue-950)]/6 px-3 py-1.5 text-[12px] font-bold text-[var(--brand-blue-800)]"
                    >
                      {palavra}
                    </span>
                  ))}
                </div>
              )}

              {produto.resumo && (
                <p className="mt-6 text-base leading-7 text-slate-600 sm:text-lg">
                  {produto.resumo}
                </p>
              )}

              {produto.descricao && produto.descricao !== produto.resumo && (
                <div className="mt-8">
                  <h2 className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                    Para que serve
                  </h2>
                  <p className="mt-3 text-[15px] leading-7 text-slate-600">
                    {produto.descricao}
                  </p>
                </div>
              )}

              {produto.modoUso && (
                <div className="mt-8">
                  <h2 className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                    Modo de uso
                  </h2>
                  <p className="mt-3 text-[15px] leading-7 text-slate-600">{produto.modoUso}</p>
                </div>
              )}

              {produto.aplicacoes.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                    Onde aplicar
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {produto.aplicacoes.map((aplicacao) => (
                      <span
                        key={aplicacao}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-semibold text-slate-600"
                      >
                        {aplicacao}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {produto.categorias.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {produto.categorias.map((categoria) => (
                    <Link
                      key={categoria}
                      href={`/produtos/catalogo?categoria=${encodeURIComponent(categoria)}`}
                      className="rounded-full bg-slate-100 px-3 py-1.5 text-[12px] font-bold text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
                    >
                      {categoria}
                    </Link>
                  ))}
                </div>
              )}

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/lojas"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[var(--brand-blue-900)] px-7 py-3.5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[var(--brand-blue-950)]"
                >
                  <MapPin size={16} /> Onde encontrar
                </Link>
                <Link
                  href="/seja-parceiro"
                  className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-[var(--brand-blue-700)]"
                >
                  Vender na minha loja
                  <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {relacionados.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-2xl font-black tracking-[-0.04em] text-[var(--brand-blue-950)] sm:text-3xl">
                Da mesma prateleira
              </h2>
              <Link
                href="/produtos/catalogo"
                className="group inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-blue-800)] transition hover:text-[var(--brand-blue-950)]"
              >
                Ver o catálogo inteiro
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </Link>
            </div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relacionados.map((outro) => (
                <li key={outro.slug}>
                  <Link
                    href={`/produtos/${outro.slug}`}
                    className="group flex h-full flex-col rounded-[24px] border border-slate-200 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-[#bcd8f2] hover:shadow-[0_26px_60px_-34px_rgba(4,47,105,0.45)]"
                  >
                    <div className="relative h-40 overflow-hidden rounded-[18px] bg-slate-100">
                      <Image
                        src={cenarioDoProduto(outro)}
                        alt=""
                        fill
                        unoptimized
                        loading="lazy"
                        aria-hidden="true"
                        sizes="(min-width: 1024px) 240px, 45vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0.7))]" />
                      <Image
                        src={outro.imagem}
                        alt={outro.nome}
                        fill
                        unoptimized
                        loading="lazy"
                        sizes="(min-width: 1024px) 240px, 45vw"
                        className="z-[2] object-contain p-4 drop-shadow-[0_14px_18px_rgba(15,47,84,0.2)] transition duration-300 group-hover:scale-105"
                      />
                    </div>
                    {outro.marca && (
                      <p className="mt-4 text-[11px] font-black uppercase tracking-[0.16em] text-[var(--brand-blue-700)]">
                        {outro.marca}
                      </p>
                    )}
                    <h3 className="mt-1.5 text-[15px] font-black leading-5 tracking-[-0.02em] text-slate-900">
                      {outro.nome}
                    </h3>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
