import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/content/blog";
import { urlDaImagem } from "@/sanity/lib/image";

/**
 * O corpo do artigo, venha ele de onde vier.
 *
 * Post do CMS chega como rich text (`corpo`) e mantém negrito, itálico, links e
 * imagens no meio do texto. Post do acervo antigo chega como `blocos`, que é
 * texto puro — foi assim que ele saiu do WordPress. Os dois desenham com a
 * mesma tipografia, então o leitor não percebe a diferença de origem.
 */

const componentes: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-6 text-[17px] leading-8 text-slate-700 first:mt-0">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 text-balance text-2xl font-black leading-[1.2] tracking-[-0.035em] text-[var(--brand-blue-950)] first:mt-0 sm:text-[28px]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-9 text-balance text-xl font-black leading-[1.25] tracking-[-0.03em] text-[var(--brand-blue-950)] sm:text-[22px]">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-[3px] border-[#ffc928] pl-5 text-lg font-semibold leading-8 text-[var(--brand-blue-900)]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-6 grid gap-3">{children}</ul>,
    number: ({ children }) => (
      <ol className="mt-6 grid list-decimal gap-3 pl-5 marker:font-black marker:text-[var(--brand-blue-800)]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="relative pl-7 text-[17px] leading-8 text-slate-700">
        <span
          aria-hidden="true"
          className="absolute left-0 top-3 size-2 rounded-full bg-[#ffc928]"
        />
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="text-[17px] leading-8 text-slate-700">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-slate-900">{children}</strong>
    ),
    link: ({ children, value }) => {
      const href = String(value?.href ?? "");
      const interno = href.startsWith("/");

      if (interno) {
        return (
          <Link
            href={href}
            className="font-bold text-[var(--brand-blue-800)] underline underline-offset-4 transition hover:text-[var(--brand-blue-950)]"
          >
            {children}
          </Link>
        );
      }

      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-[var(--brand-blue-800)] underline underline-offset-4 transition hover:text-[var(--brand-blue-950)]"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const src = urlDaImagem(value, 1200);
      if (!src) return null;

      return (
        <figure className="mt-10">
          <Image
            src={src}
            alt={String(value?.alt ?? "")}
            width={1200}
            height={675}
            unoptimized
            className="h-auto w-full rounded-[20px] object-cover"
          />
          {value?.legenda && (
            <figcaption className="mt-3 text-center text-[13px] text-slate-500">
              {value.legenda}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export function CorpoDoPost({ post }: { post: Post }) {
  if (post.corpo && post.corpo.length > 0) {
    return (
      <div className="mx-auto mt-10 max-w-[40rem]">
        <PortableText value={post.corpo} components={componentes} />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-[40rem]">
      {post.blocos.map((bloco, indice) => {
        if (bloco.tipo === "titulo") {
          return (
            <h2
              key={indice}
              className="mt-12 text-balance text-2xl font-black leading-[1.2] tracking-[-0.035em] text-[var(--brand-blue-950)] first:mt-0 sm:text-[28px]"
            >
              {bloco.texto}
            </h2>
          );
        }

        if (bloco.tipo === "lista") {
          return (
            <ul key={indice} className="mt-6 grid gap-3">
              {bloco.itens.map((item, i) => (
                <li key={i} className="relative pl-7 text-[17px] leading-8 text-slate-700">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-3 size-2 rounded-full bg-[#ffc928]"
                  />
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={indice} className="mt-6 text-[17px] leading-8 text-slate-700 first:mt-0">
            {bloco.texto}
          </p>
        );
      })}
    </div>
  );
}
