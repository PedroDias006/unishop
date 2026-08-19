import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PostCard } from "@/components/blog/PostCard";
import { Container } from "@/components/ui/Container";
import { posts } from "@/content/blog";

/** São 24 artigos publicados e nenhum aparecia na home. */
export function BlogHighlights() {
  const destaques = posts.slice(0, 3);

  if (destaques.length === 0) return null;

  return (
    <section
      id="blog-destaques"
      className="scroll-mt-28 bg-[#f6f9fc] py-20 sm:py-24 lg:py-28"
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

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destaques.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}
