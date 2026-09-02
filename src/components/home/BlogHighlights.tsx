import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Building2,
  Clock,
  Lightbulb,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SocialPostActions } from "@/components/blog/SocialPostActions";
import { Container } from "@/components/ui/Container";
import { formatarData, listarPosts, type Post } from "@/content/blog";

const assuntos = [
  {
    nome: "Gestão de loja",
    apoio: "Decisões mais inteligentes",
    icon: TrendingUp,
  },
  {
    nome: "Mercado local",
    apoio: "Oportunidades por perto",
    icon: Building2,
  },
  {
    nome: "Produtos e soluções",
    apoio: "Aplicação sem dúvida",
    icon: Sparkles,
  },
  {
    nome: "Empreender",
    apoio: "Experiência de quem faz",
    icon: Lightbulb,
  },
] as const;

function categoriaDoPost(post: Post) {
  if (post.categorias?.[0]) return post.categorias[0];

  const texto = `${post.titulo} ${post.resumo}`.toLocaleLowerCase("pt-BR");

  if (texto.includes("hotel") || texto.includes("empresa")) return "Mercado local";
  if (texto.includes("produto") || texto.includes("piscina")) return "Produtos e soluções";
  if (texto.includes("gestão") || texto.includes("loja")) return "Gestão de loja";

  return "Empreendedorismo";
}

function PerfilUnishop({ compacto = false }: { compacto?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span
        className={`${compacto ? "size-10 rounded-xl" : "size-12 rounded-2xl"} grid shrink-0 place-items-center bg-[var(--brand-blue-950)] shadow-[0_8px_24px_rgba(6,31,73,0.18)]`}
      >
        <Image
          src="/images/logotipo.webp"
          alt=""
          width={96}
          height={40}
          className={`${compacto ? "w-7" : "w-9"} h-auto`}
        />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-1.5 text-sm font-extrabold text-[var(--brand-blue-950)]">
          Rede Unishop
          <BadgeCheck
            aria-label="Perfil oficial"
            className="size-4 shrink-0 fill-[var(--brand-blue-800)] text-white"
          />
        </span>
        <span className="mt-0.5 block truncate text-xs font-medium text-slate-500">
          @redeunishop · Conteúdo oficial
        </span>
      </span>
    </div>
  );
}

export async function BlogHighlights() {
  const posts = await listarPosts();
  const ordenados = [...posts].sort(
    (a, b) => Number(Boolean(b.destaque)) - Number(Boolean(a.destaque)),
  );
  const [principal, ...laterais] = ordenados.slice(0, 3);

  if (!principal) return null;

  return (
    <section
      id="blog-destaques"
      className="scroll-mt-28 overflow-hidden bg-[var(--background)] py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-10 bg-[var(--brand-yellow)]" />
              <p className="seccao-olho">Unishop em pauta</p>
            </div>

            <h2 className="mt-6 seccao-titulo">
              Um feed para quem limpa, vende e faz o negócio girar.
            </h2>

            <p className="mt-6 max-w-2xl seccao-apoio">
              Bastidores, ideias práticas e aprendizados da rede em publicações
              feitas para abrir conversa — e não apenas preencher uma página.
            </p>
          </div>

          <Link
            href="/blog"
            className="group inline-flex min-h-12 w-fit items-center gap-4 rounded-full bg-[var(--brand-blue-950)] py-2 pl-6 pr-2 text-sm font-extrabold text-white shadow-[0_16px_36px_-20px_rgba(6,31,73,0.7)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--brand-blue-900)]"
          >
            Entrar no blog
            <span className="grid size-8 place-items-center rounded-full bg-[var(--brand-yellow)] text-[var(--brand-blue-950)] transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight size={16} aria-hidden="true" />
            </span>
          </Link>
        </div>

        <div className="mt-10 -mx-5 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0">
          {assuntos.map((assunto) => {
            const Icon = assunto.icon;

            return (
              <div
                key={assunto.nome}
                className="flex min-w-[232px] items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_10px_26px_-22px_rgba(6,31,73,0.45)]"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#edf6ff] text-[var(--brand-blue-800)]">
                  <Icon size={17} aria-hidden="true" />
                </span>
                <span>
                  <strong className="block text-sm font-extrabold text-[var(--brand-blue-950)]">
                    {assunto.nome}
                  </strong>
                  <span className="mt-0.5 block text-[11px] text-slate-500">
                    {assunto.apoio}
                  </span>
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)] lg:gap-6">
          <article className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_24px_60px_-38px_rgba(6,31,73,0.42)]">
            <header className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
              <PerfilUnishop />
              <span className="shrink-0 text-right text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">
                {formatarData(principal.data)}
              </span>
            </header>

            <Link
              href={`/blog/${principal.slug}`}
              className="group relative block aspect-[16/9] overflow-hidden bg-slate-100"
              aria-label={`Ler: ${principal.titulo}`}
            >
              {principal.capa ? (
                <Image
                  src={principal.capa}
                  alt={principal.capaAlt ?? ""}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 720px"
                  className="object-cover transition duration-700 group-hover:scale-[1.025]"
                />
              ) : null}
              <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-[var(--brand-blue-900)] shadow-sm backdrop-blur sm:left-5 sm:top-5">
                Em destaque
              </span>
            </Link>

            <div className="px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">
                <span className="rounded-full bg-[#edf6ff] px-3 py-1 text-[10px] font-black text-[var(--brand-blue-800)]">
                  {categoriaDoPost(principal)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={13} aria-hidden="true" />
                  {principal.minutos} min de leitura
                </span>
              </div>

              <h3 className="mt-4 text-balance text-2xl font-black leading-[1.12] tracking-[-0.04em] text-[var(--brand-blue-950)] sm:text-[30px]">
                <Link
                  href={`/blog/${principal.slug}`}
                  className="transition-colors hover:text-[var(--brand-blue-800)]"
                >
                  {principal.titulo}
                </Link>
              </h3>

              <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600 sm:text-[15px]">
                {principal.resumo}
              </p>

              <SocialPostActions
                titulo={principal.titulo}
                url={`/blog/${principal.slug}`}
              />
            </div>
          </article>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {laterais.map((post) => (
              <article
                key={post.slug}
                className="group overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_18px_48px_-36px_rgba(6,31,73,0.42)] transition duration-300 hover:-translate-y-1 hover:border-[#bcd8f2] lg:grid lg:grid-cols-[176px_minmax(0,1fr)]"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative block aspect-[16/10] overflow-hidden bg-slate-100 lg:aspect-auto lg:min-h-[240px]"
                  aria-label={`Ler: ${post.titulo}`}
                >
                  {post.capa ? (
                    <Image
                      src={post.capa}
                      alt={post.capaAlt ?? ""}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 176px"
                      className="object-cover transition duration-500 group-hover:scale-[1.035]"
                    />
                  ) : null}
                </Link>

                <div className="flex min-w-0 flex-col p-5">
                  <PerfilUnishop compacto />

                  <span className="mt-5 text-[10px] font-black uppercase tracking-[0.12em] text-[var(--brand-blue-800)]">
                    {categoriaDoPost(post)}
                  </span>

                  <h3 className="mt-2 text-balance text-lg font-black leading-[1.18] tracking-[-0.03em] text-[var(--brand-blue-950)]">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="transition-colors hover:text-[var(--brand-blue-800)]"
                    >
                      {post.titulo}
                    </Link>
                  </h3>

                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4 text-[11px] font-bold text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <BookOpen size={13} aria-hidden="true" />
                      {post.minutos} min
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 font-extrabold text-[var(--brand-blue-800)]"
                    >
                      Abrir
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
        </div>
      </Container>
    </section>
  );
}
