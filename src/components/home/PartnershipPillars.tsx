import { ArrowRight, ChevronDown, Check, X } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { PilarEditorial } from "@/data/editorial";

/**
 * O modelo, por inteiro.
 *
 * A faixa existe para vencer uma objeção só — "isso aí é franquia, e franquia
 * come o meu lucro" — então ela foi remontada em torno do argumento, e não em
 * torno de uma foto:
 *
 * 1. a frase, centrada e grande, sem nada disputando o olho;
 * 2. a conta lado a lado: o que uma franquia costuma cobrar contra o que a
 *    Unishop cobra. É a comparação que convence, e ela não existia — antes o
 *    "sem royalties" era uma afirmação solta que o visitante tinha de aceitar
 *    na palavra;
 * 3. os quatro números que fecham a conta (taxa, royalties, retorno, margem);
 * 4. o botão, logo depois do argumento, e não no fim de tudo;
 * 5. os oito pontos do modelo, para quem quiser o detalhe.
 *
 * A foto da fachada saiu daqui: as três lojas aparecem logo abaixo, em
 * `StoreFormats`, e repetir a mesma fachada duas vezes em duas seções
 * seguidas só tirava força das duas.
 *
 * Os oito pontos continuam em `<details>` nativo: o texto fica no HTML — para
 * o buscador e para quem chega sem JavaScript — mas ocupa uma linha cada até
 * alguém pedir para ler, o que evita uma rolagem sem fim no telefone.
 */

/** A conta do fim do mês, que é o que a seção inteira está defendendo. */
const custosDeFranquia = [
  "Taxa de franquia para entrar",
  "Royalties sobre tudo o que a loja vende",
  "Taxa de publicidade mensal",
  "Mensalidade para continuar usando a marca",
];

const custosDeParceria = [
  "R$ 0 de taxa para entrar",
  "0% de royalties, hoje e sempre",
  "Suporte de marketing incluso, sem taxa à parte",
  "Você paga o produto que vai revender — e mais nada",
];

const numeros = [
  { valor: "R$ 0", label: "de taxa de franquia" },
  { valor: "0%", label: "de royalties" },
  // Mesmo prazo do ponto "Retorno do investimento": se ele mudar no painel,
  // esta linha muda junto.
  { valor: "18–24", label: "meses de retorno" },
  { valor: "até 20%", label: "de lucro líquido" },
];

export function PartnershipPillars({
  partnershipPillars,
}: {
  partnershipPillars: PilarEditorial[];
}) {
  return (
    <section
      id="parceria"
      className="scroll-mt-28 overflow-hidden bg-[#06214d] py-20 text-white sm:py-24 lg:py-28"
    >
      <Container>
        {/* ── A frase ──────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-9 bg-[var(--brand-yellow)]"
            />

            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--brand-yellow)]">
              O modelo, por inteiro
            </p>

            <span
              aria-hidden="true"
              className="h-px w-9 bg-[var(--brand-yellow)]"
            />
          </div>

          <h2 className="mt-6 text-balance text-[34px] font-black leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-[56px]">
            Não somos franquia.
            <span className="block text-[var(--brand-yellow)]">
              Somos parceria.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-8 text-white/65 sm:text-[17px]">
            A diferença não está no nome, está na conta do fim do mês. Você é
            dono do seu negócio, usa uma marca que o Brasil inteiro já conhece
            e não divide o seu resultado com ninguém.
          </p>
        </div>

        {/* ── A conta, lado a lado ─────────────────────────────────────────
            Um painel só, partido por um fio: a linha de baixo do painel da
            esquerda encontra a da direita, então os itens ficam alinhados e
            a comparação se lê na horizontal. */}
        <div className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-[28px] bg-white/[0.04] ring-1 ring-white/10 backdrop-blur-sm">
          <div className="grid md:grid-cols-2">
            {/* O modelo de sempre */}
            <div className="border-b border-white/10 p-7 sm:p-9 md:border-b-0 md:border-r">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40">
                No modelo tradicional de franquia
              </p>

              <ul className="mt-6 grid gap-4">
                {custosDeFranquia.map((item) => (
                  <li key={item} className="flex items-start gap-3.5">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-white/[0.06] text-white/35"
                    >
                      <X size={14} strokeWidth={2.6} />
                    </span>

                    <span className="text-[15px] leading-6 text-white/45">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* O nosso */}
            <div className="relative p-7 sm:p-9">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-[var(--brand-yellow)]/10 blur-3xl"
              />

              <p className="relative text-[11px] font-black uppercase tracking-[0.2em] text-[var(--brand-yellow)]">
                Na parceria Unishop
              </p>

              <ul className="relative mt-6 grid gap-4">
                {custosDeParceria.map((item) => (
                  <li key={item} className="flex items-start gap-3.5">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[var(--brand-yellow)] text-[var(--brand-blue-950)]"
                    >
                      <Check size={14} strokeWidth={3} />
                    </span>

                    <span className="text-[15px] font-medium leading-6 text-white">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Os quatro números fecham o painel: são a mesma conta, resumida.
              Os filetes verticais saem de variantes por posição — no celular
              a grade é 2×2 e o filete da esquerda cai nos ímpares; a partir
              do `sm` viram quatro colunas e só o primeiro fica sem. */}
          <dl className="grid grid-cols-2 border-t border-white/10 [&>*:nth-child(n+3)]:border-t [&>*:nth-child(odd)]:border-l-0 [&>*]:border-l [&>*]:border-white/10 sm:grid-cols-4 sm:[&>*:first-child]:border-l-0 sm:[&>*:nth-child(n+3)]:border-t-0 sm:[&>*:nth-child(odd)]:border-l">
            {numeros.map((item) => (
              // `flex-col-reverse` põe o número em cima sem trocar a ordem no
              // HTML: a lista continua sendo termo e depois definição, que é
              // o que o leitor de tela anuncia.
              <div
                key={item.label}
                className="flex flex-col-reverse px-5 py-6 text-center sm:py-8"
              >
                <dt className="mt-2 text-[11px] font-bold leading-4 text-white/45">
                  {item.label}
                </dt>

                <dd className="text-[30px] font-black leading-none tracking-[-0.05em] text-[var(--brand-yellow)] sm:text-[34px]">
                  {item.valor}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/seja-parceiro"
            className="group inline-flex items-center gap-4 rounded-full bg-[var(--brand-yellow)] py-2.5 pl-6 pr-2.5 text-sm font-black text-[var(--brand-blue-950)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ffd84d]"
          >
            Quero abrir uma unidade
            <span className="grid size-9 place-items-center rounded-full bg-[var(--brand-blue-950)] text-[var(--brand-yellow)] transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight size={17} aria-hidden="true" />
            </span>
          </Link>
        </div>

        {/* ── OS OITO PONTOS ───────────────────────────────────────────────
            Fechados por padrão: a lista inteira cabe em oito linhas e cada um
            abre onde está, sem empurrar a página para baixo antes da hora. */}
        <div className="mx-auto mt-20 max-w-5xl lg:mt-24">
          <p className="text-center text-[11px] font-black uppercase tracking-[0.2em] text-white/40">
            Os oito pontos do modelo · toque para ler
          </p>

          {/* Duas colunas de CSS puro no desktop: cada uma flui sozinha, então
              abrir um ponto não deixa buraco ao lado dele. */}
          <div className="mt-7 border-t border-white/12 lg:columns-2 lg:gap-x-14">
            {partnershipPillars.map((pilar, index) => (
              <details
                key={pilar.id}
                className="group break-inside-avoid border-b border-white/12"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 py-4 [&::-webkit-details-marker]:hidden">
                  <span className="text-[11px] font-black tabular-nums text-[var(--brand-yellow)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="flex-1 text-[15px] font-bold leading-snug transition-colors duration-200 group-hover:text-[var(--brand-yellow)]">
                    {pilar.title}
                  </span>

                  <ChevronDown
                    aria-hidden="true"
                    size={17}
                    className="shrink-0 text-white/35 transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>

                <p className="pb-5 pl-9 pr-6 text-sm leading-6 text-white/60">
                  {pilar.text}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/modelo-de-negocio"
              className="inline-flex items-center gap-2 text-sm font-bold text-white/70 underline-offset-4 transition-colors duration-300 hover:text-[var(--brand-yellow)] hover:underline"
            >
              Ver o modelo em detalhe
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
