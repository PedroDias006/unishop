import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/PostCard";
import { Container } from "@/components/ui/Container";
import { CorpoDoPost } from "@/components/blog/CorpoDoPost";
import { buscarPost, formatarData, listarPosts, relacionados } from "@/content/blog";
import { siteUrl } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await listarPosts();

  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await buscarPost(slug);

  if (!post) return { title: "Artigo não encontrado" };

  return {
    title: post.titulo,
    description: post.resumo,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.titulo,
      description: post.resumo,
      url: `/blog/${post.slug}`,
      publishedTime: post.data,
      images: post.capa ? [{ url: post.capa, width: 1200, height: 675 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.titulo,
      description: post.resumo,
      images: post.capa ? [post.capa] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await buscarPost(slug);

  if (!post) notFound();

  const sugestoes = await relacionados(post.slug);

  const dadosEstruturados = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.titulo,
    description: post.resumo,
    datePublished: post.data,
    author: { "@type": "Organization", name: "Rede Unishop" },
    publisher: { "@type": "Organization", name: "Rede Unishop" },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    ...(post.capa ? { image: `${siteUrl}${post.capa}` } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados) }}
      />

      {/* ================================================================
          CABEÇALHO DO ARTIGO
      ================================================================= */}
      <section className="bg-[linear-gradient(115deg,#04224c_0%,#095794_100%)] pb-14 pt-[124px] font-[Manrope] text-white sm:pb-16 sm:pt-[150px]">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-white/60 transition hover:text-[#ffd34c]"
            >
              <ArrowLeft
                size={14}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              Voltar para o blog
            </Link>

            <h1 className="mt-6 text-balance text-[clamp(1.9rem,4.2vw,3.2rem)] font-black leading-[1.06] tracking-[-0.045em]">
              {post.titulo}
            </h1>

            <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-white/15 pt-5 text-[11px] font-bold uppercase tracking-[0.12em] text-white/55">
              <time dateTime={post.data}>{formatarData(post.data)}</time>
              <span aria-hidden="true" className="h-3 w-px bg-white/20" />
              <span className="inline-flex items-center gap-1.5">
                <Clock size={12} aria-hidden="true" />
                {post.minutos} min de leitura
              </span>
              <span aria-hidden="true" className="h-3 w-px bg-white/20" />
              <span>Por Equipe Unishop</span>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          CORPO
      ================================================================= */}
      <article className="bg-white pb-20 font-[Manrope] sm:pb-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            {post.capa ? (
              <div className="relative -mt-10 aspect-[16/9] overflow-hidden rounded-[22px] bg-slate-100 shadow-[0_24px_60px_-30px_rgba(4,34,76,0.5)] sm:-mt-12">
                <Image
                  src={post.capa}
                  alt={`Imagem de capa do artigo: ${post.titulo}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 768px"
                  className="object-cover"
                />
              </div>
            ) : null}

            {/* A coluna de leitura é mais estreita que a das imagens: mantém
                a linha em torno de 75 caracteres, que é o confortável. */}
            <p className="mx-auto mt-10 max-w-[40rem] border-l-[3px] border-[#ffc928] pl-5 text-lg font-semibold leading-8 text-[var(--brand-blue-900)] sm:text-xl sm:leading-9">
              {post.resumo}
            </p>

            <CorpoDoPost post={post} />

            {/* Chamada dentro do artigo */}
            <aside className="mt-14 overflow-hidden rounded-[24px] bg-[linear-gradient(115deg,#04224c_0%,#095794_100%)] p-7 text-white sm:p-10">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#ffd34c]">
                Quer ir além da leitura?
              </p>
              <p className="mt-4 text-balance text-xl font-black leading-[1.2] tracking-[-0.035em] sm:text-2xl">
                Entenda como funciona o modelo de negócio da Rede Unishop.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/modelo-de-negocio"
                  className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[#ffc928] px-6 text-sm font-black text-[#07396e] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ffda55]"
                >
                  Faça parte da Unishop
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href="/seja-parceiro"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/8 px-6 text-sm font-black text-white transition duration-300 hover:border-white/35 hover:bg-white/16"
                >
                  Falar com a equipe
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </article>

      {/* ================================================================
          LEIA TAMBÉM
      ================================================================= */}
      {sugestoes.length ? (
        <section className="bg-[linear-gradient(180deg,#f6fafd_0%,#eef4fb_100%)] py-16 font-[Manrope] sm:py-20">
          <Container>
            <h2 className="text-2xl font-black tracking-[-0.04em] text-[var(--brand-blue-950)] sm:text-3xl">
              Leia também
            </h2>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sugestoes.map((sugestao) => (
                <PostCard key={sugestao.slug} post={sugestao} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
