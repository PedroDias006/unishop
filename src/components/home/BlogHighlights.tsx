import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PostCard } from "@/components/blog/PostCard";
import { Container } from "@/components/ui/Container";
import { listarPosts } from "@/content/blog";

/** São 24 artigos publicados e nenhum aparecia na home. */
export async function BlogHighlights() {
  const posts = await listarPosts();
  // O post marcado como destaque no painel vem primeiro; o resto segue a data.
  const ordenados = [...posts].sort(
    (a, b) => Number(Boolean(b.destaque)) - Number(Boolean(a.destaque)),
  );
  const destaques = ordenados.slice(0, 3);

  if (destaques.length === 0) return null;

  return (
    <section
      id="blog-destaques"
      className="scroll-mt-28 bg-[var(--background)] py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="h-px w-10 bg-[var(--brand-yellow)]"
              />
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--brand-blue-800)]">
                Conteúdo para decidir
              </p>
            </div>

            <h2 className="mt-6 text-balance text-3xl font-black leading-[1.03] tracking-[-0.045em] text-[var(--brand-blue-950)] sm:text-4xl lg:text-[46px]">
              O que a rede aprendeu abrindo mais de 500 lojas.
            </h2>

            <p className="mt-6 text-base leading-8 text-slate-600">
              Contas de investimento, comparações com franquia e o que cada tipo
              de cliente compra — escrito para quem ainda está decidindo.
            </p>
          </div>

          <Link
            href="/blog"
            className="group inline-flex items-center gap-4 rounded-full border border-slate-300 py-2.5 pl-6 pr-2.5 text-sm font-bold text-[var(--brand-blue-900)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--brand-blue-800)]"
          >
            Ver todos os artigos
            <span className="grid size-9 place-items-center rounded-full bg-[var(--brand-yellow)] text-[var(--brand-blue-950)] transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight size={17} />
            </span>
          </Link>
        </div>

        {/*
          No telefone os três cards empilhados viravam três telas de rolagem de
          um assunto que o visitante talvez nem queira ler — e empurravam o
          resto da página para longe. Aqui eles viram uma faixa que corre para
          o lado: quem tem interesse arrasta, quem não tem passa direto.

          As margens negativas sangram a faixa até a borda da tela (o
          `Container` tem px-5) para o terceiro card ficar espiando no canto e
          avisar que existe mais coisa ao lado. A partir do `sm` volta a ser a
          grade de sempre.
        */}
        <div className="mt-12 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {destaques.map((post) => (
            <div
              key={post.slug}
              className="w-[84%] shrink-0 snap-start sm:w-auto sm:shrink"
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
