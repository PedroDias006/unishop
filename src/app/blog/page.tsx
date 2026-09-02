import type { Metadata } from "next";
import { ArrowRight, Clock, Rss } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { formatarData, listarPosts, type Post } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Conteúdo sobre o mercado de limpeza profissional, gestão de loja e como empreender com a Rede Unishop.",
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/blog/rss.xml" },
  },
};

function categoria(post: Post) {
  return post.categorias?.[0] ?? "Blog Unishop";
}

export default async function BlogPage() {
  const posts = await listarPosts();
  const [destaque, ...demais] = posts;

  return (
    <main className="bg-[var(--background)] pb-20 pt-[132px] font-[Manrope] sm:pb-24 sm:pt-[152px]">
      <Container>
        <header className="border-b border-slate-300 pb-10 sm:pb-12">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4">
                <span aria-hidden="true" className="h-px w-10 bg-[var(--brand-yellow)]" />
                <p className="seccao-olho">Blog Unishop</p>
              </div>

              <h1 className="mt-6 text-balance text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.98] tracking-[-0.055em] text-[var(--brand-blue-950)]">
                Ideias para quem vive de limpeza.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Gestão, mercado, produtos e empreendedorismo explicados de um
                jeito direto por quem acompanha a rotina da Rede Unishop.
              </p>
            </div>

            <div className="flex items-center gap-5 text-sm text-slate-500">
              <span>{posts.length} publicações</span>
              <span aria-hidden="true" className="h-4 w-px bg-slate-300" />
              <a
                href="/blog/rss.xml"
                className="inline-flex min-h-11 items-center gap-2 font-bold text-[var(--brand-blue-800)] transition hover:text-[var(--brand-blue-950)]"
              >
                <Rss size={15} aria-hidden="true" />
                Assinar RSS
              </a>
            </div>
          </div>
        </header>

        {destaque ? (
          <article className="grid gap-7 border-b border-slate-300 py-10 sm:py-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] lg:items-center lg:gap-12">
            <Link
              href={`/blog/${destaque.slug}`}
              aria-label={`Ler: ${destaque.titulo}`}
              className="group relative block aspect-[16/10] overflow-hidden rounded-2xl bg-slate-200"
            >
              {destaque.capa ? (
                <Image
                  src={destaque.capa}
                  alt={destaque.capaAlt ?? ""}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 760px"
                  className="object-cover transition duration-700 group-hover:scale-[1.025]"
                />
              ) : null}
            </Link>

            <div>
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.11em] text-slate-500">
                <span className="bg-[var(--brand-yellow)] px-2.5 py-1 font-black text-[var(--brand-blue-950)]">
                  Em destaque
                </span>
                <span>{categoria(destaque)}</span>
              </div>

              <h2 className="mt-5 text-balance text-3xl font-black leading-[1.06] tracking-[-0.045em] text-[var(--brand-blue-950)] sm:text-4xl">
                <Link
                  href={`/blog/${destaque.slug}`}
                  className="transition-colors hover:text-[var(--brand-blue-800)]"
                >
                  {destaque.titulo}
                </Link>
              </h2>

              <p className="mt-5 line-clamp-4 text-[15px] leading-7 text-slate-600">
                {destaque.resumo}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
                <time dateTime={destaque.data}>{formatarData(destaque.data)}</time>
                <span aria-hidden="true" className="h-3 w-px bg-slate-300" />
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={14} aria-hidden="true" />
                  {destaque.minutos} min de leitura
                </span>
              </div>

              <Link
                href={`/blog/${destaque.slug}`}
                className="group mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-extrabold text-[var(--brand-blue-800)]"
              >
                Ler artigo
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </article>
        ) : null}

        <section className="pt-12 sm:pt-16">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--brand-blue-800)]">
                Arquivo
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[var(--brand-blue-950)] sm:text-3xl">
                Últimas publicações
              </h2>
            </div>
          </div>

          <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {demais.map((post, index) => (
              <article key={post.slug} className="group flex min-w-0 flex-col">
                <Link
                  href={`/blog/${post.slug}`}
                  aria-label={`Ler: ${post.titulo}`}
                  className="relative block aspect-[16/10] overflow-hidden rounded-2xl bg-slate-200"
                >
                  {post.capa ? (
                    <Image
                      src={post.capa}
                      alt={post.capaAlt ?? ""}
                      fill
                      priority={index < 2}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  ) : null}
                </Link>

                <div className="flex flex-1 flex-col pt-5">
                  <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.11em] text-slate-500">
                    <span className="font-black text-[var(--brand-blue-800)]">
                      {categoria(post)}
                    </span>
                    <span aria-hidden="true" className="h-3 w-px bg-slate-300" />
                    <time dateTime={post.data}>{formatarData(post.data)}</time>
                  </div>

                  <h3 className="mt-3 text-balance text-xl font-black leading-[1.16] tracking-[-0.035em] text-[var(--brand-blue-950)]">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="transition-colors hover:text-[var(--brand-blue-800)]"
                    >
                      {post.titulo}
                    </Link>
                  </h3>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                    {post.resumo}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-4 border-t border-slate-200 pt-4 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={13} aria-hidden="true" />
                      {post.minutos} min
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 font-extrabold text-[var(--brand-blue-800)]"
                    >
                      Ler
                      <ArrowRight
                        size={13}
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
