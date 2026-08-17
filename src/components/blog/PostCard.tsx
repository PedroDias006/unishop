import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatarData, type Post } from "@/content/blog";

type PostCardProps = {
  post: Post;
  /** O primeiro card visível carrega a capa sem lazy. */
  prioridade?: boolean;
};

/**
 * O card inteiro é clicável através de um único link esticado sobre ele
 * (`after:absolute`), então há apenas um destino por card na navegação por
 * teclado e nos leitores de tela.
 */
export function PostCard({ post, prioridade = false }: PostCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#bcd8f2] hover:shadow-[0_22px_50px_-26px_rgba(4,47,105,0.4)] focus-within:border-[#bcd8f2]">
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        {post.capa ? (
          <Image
            src={post.capa}
            alt=""
            fill
            priority={prioridade}
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
          <time dateTime={post.data}>{formatarData(post.data)}</time>
          <span aria-hidden="true" className="h-3 w-px bg-slate-200" />
          <span className="inline-flex items-center gap-1.5">
            <Clock size={12} aria-hidden="true" />
            {post.minutos} min de leitura
          </span>
        </div>

        <h3 className="mt-4 text-balance text-lg font-black leading-[1.22] tracking-[-0.03em] text-[var(--brand-blue-950)]">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors duration-200 after:absolute after:inset-0 after:rounded-[22px] after:content-[''] group-hover:text-[var(--brand-blue-800)]"
          >
            {post.titulo}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
          {post.resumo}
        </p>

        <span
          aria-hidden="true"
          className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-black uppercase tracking-[0.12em] text-[var(--brand-blue-800)]"
        >
          Ler artigo
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </article>
  );
}
