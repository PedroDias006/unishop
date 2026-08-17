import type { Metadata } from "next";
import { ArrowRight, Clock, Rss } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PostCard } from "@/components/blog/PostCard";
import { Container } from "@/components/ui/Container";
import { formatarData, posts } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Conteúdo sobre o mercado de limpeza profissional, gestão de loja e como empreender com a Rede Unishop.",
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/blog/rss.xml" },
  },
};

export default function BlogPage() {
  const [destaque, ...demais] = posts;

  return (
    <>
      {/* ================================================================
          ABERTURA + POST EM DESTAQUE
      ================================================================= */}
      <section className="relative overflow-hidden bg-[linear-gradient(115deg,#04224c_0%,#095794_100%)] pb-16 pt-[132px] font-[Manrope] text-white sm:pb-20 sm:pt-[160px] lg:pb-24 lg:pt-[176px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-20 size-[480px] rounded-full bg-[#3ba0e0]/12 blur-3xl"
        />

        <Container className="relative">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#ffc928]" aria-hidden="true" />
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#ffd34c]">
              Blog
            </p>
          </div>

          <h1 className="mt-6 max-w-3xl text-balance text-[clamp(2.4rem,5vw,4.2rem)] font-black leading-[0.98] tracking-[-0.05em]">
            Conteúdo para quem
            <span className="mt-2 block text-[#ffc928]">vive de limpeza.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
            Mercado, gestão de loja, mix de produtos e o caminho para abrir a
            sua unidade — escrito por quem está dentro da operação.
          </p>

          {destaque ? (
            <article className="group relative mt-14 grid overflow-hidden rounded-[26px] border border-white/12 bg-white/6 backdrop-blur-sm transition duration-300 hover:border-[#ffc928]/40 sm:mt-16 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#062a55] lg:aspect-auto lg:min-h-[340px]">
                {destaque.capa ? (
                  <Image
                    src={destaque.capa}
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 620px"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                ) : null}
              </div>

              <div className="flex flex-col justify-center p-7 sm:p-10">
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white/55">
                  <span className="rounded-full bg-[#ffc928] px-2.5 py-1 text-[10px] font-black text-[#07396e]">
                    Mais recente
                  </span>
                  <time dateTime={destaque.data}>{formatarData(destaque.data)}</time>
                  <span aria-hidden="true" className="h-3 w-px bg-white/20" />
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={12} aria-hidden="true" />
                    {destaque.minutos} min
                  </span>
                </div>

                <h2 className="mt-5 text-balance text-2xl font-black leading-[1.12] tracking-[-0.04em] sm:text-3xl">
                  <Link
                    href={`/blog/${destaque.slug}`}
                    className="transition-colors after:absolute after:inset-0 after:content-[''] hover:text-[#ffd34c]"
                  >
                    {destaque.titulo}
                  </Link>
                </h2>

                <p className="mt-4 line-clamp-3 text-sm leading-7 text-white/70 sm:text-base">
                  {destaque.resumo}
                </p>

                <span
                  aria-hidden="true"
                  className="mt-7 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-[#ffd34c]"
                >
                  Ler artigo
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </div>
            </article>
          ) : null}
        </Container>
      </section>

      {/* ================================================================
          DEMAIS ARTIGOS
      ================================================================= */}
      <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f6fafd_60%,#eef4fb_100%)] py-20 font-[Manrope] sm:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black tracking-[-0.04em] text-[var(--brand-blue-950)] sm:text-3xl">
                Todos os artigos
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                {posts.length} publicações
              </p>
            </div>

            <a
              href="/blog/rss.xml"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-xs font-black uppercase tracking-[0.12em] text-[var(--brand-blue-800)] transition hover:border-slate-300 hover:bg-slate-50"
            >
              <Rss size={14} aria-hidden="true" />
              Assinar RSS
            </a>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {demais.map((post, index) => (
              <PostCard key={post.slug} post={post} prioridade={index < 3} />
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================
          CHAMADA FINAL
      ================================================================= */}
      <section className="bg-[var(--brand-blue-950)] py-16 font-[Manrope] text-white sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-2xl font-black tracking-[-0.04em] sm:text-3xl lg:text-4xl">
              Gostou do que leu? O próximo passo é
              <span className="text-[#ffc928]"> ter a sua loja.</span>
            </h2>

            <Link
              href="/modelo-de-negocio"
              className="group mt-8 inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-[#ffc928] px-7 text-sm font-black text-[#07396e] shadow-[0_14px_34px_rgba(227,164,0,0.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ffda55]"
            >
              Faça parte da Unishop
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
