import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { PilarEditorial } from "@/data/editorial";

/**
 * O modelo, por inteiro.
 *
 * A faixa vive de um argumento só — não se paga taxa nenhuma — e de uma
 * imagem: a loja pronta, que é o que a pessoa quer ver antes de perguntar o
 * preço. Tudo o mais é subordinado a esses dois.
 *
 * Três decisões de tamanho, porque a seção é longa por natureza (são oito
 * pontos) e no celular isso vira rolagem sem fim:
 *
 * - os números resumem a conta em uma linha, no lugar de um demonstrativo
 *   inteiro: 0% de royalties, R$ 0 de taxa, 18 a 24 meses de retorno;
 * - o CTA sobe para junto dos números, e não espera o fim da faixa;
 * - os oito pontos ficam fechados em `<details>` nativo. O texto continua no
 *   HTML — para o buscador e para quem chega sem JavaScript — mas ocupa uma
 *   linha cada até alguém pedir para ler.
 *
 * O fundo é azul da marca e liso. A cor e o brilho da faixa vêm da foto, que
 * entra inteira, sem véu por cima: escurecer a fachada para "combinar" com o
 * fundo seria jogar fora justamente o que ela tem de bom.
 */
export function PartnershipPillars({
  partnershipPillars,
}: {
  partnershipPillars: PilarEditorial[];
}) {
  return (
    <section
      id="parceria"
      className="scroll-mt-28 bg-[#06214d] py-16 text-white sm:py-20 lg:py-24"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="h-px w-10 bg-[var(--brand-yellow)]"
              />

              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--brand-yellow)]">
                O modelo, por inteiro
              </p>
            </div>

            <h2 className="mt-5 text-balance text-3xl font-black leading-[1.03] tracking-[-0.045em] sm:text-4xl lg:text-[46px]">
              Não somos franquia.
              <span className="block text-[var(--brand-yellow)]">
                Somos parceria.
              </span>
            </h2>

            <p className="mt-5 max-w-lg text-base leading-7 text-white/65">
              A diferença não está no nome, está na conta do fim do mês. Você
              paga o produto que vai revender — e mais nada.
            </p>

            {/* Os três números que respondem "quanto custa" antes da pergunta. */}
            <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-white/12 py-5">
              {[
                { valor: "0%", label: "de royalties" },
                { valor: "R$ 0", label: "de taxa de franquia" },
                // Mesmo prazo do ponto "Retorno do investimento": se ele mudar
                // no painel, esta linha muda junto.
                { valor: "18–24", label: "meses de retorno" },
              ].map((item) => (
                // `flex-col-reverse` põe o número em cima sem trocar a ordem
                // no HTML: a lista continua sendo termo e depois definição,
                // que é o que o leitor de tela anuncia.
                <div key={item.label} className="flex flex-col-reverse">
                  <dt className="mt-2 text-[11px] font-bold leading-4 text-white/50">
                    {item.label}
                  </dt>

                  <dd className="text-[26px] font-black leading-none tracking-[-0.05em] text-[var(--brand-yellow)] sm:text-[34px]">
                    {item.valor}
                  </dd>
                </div>
              ))}
            </dl>

            <Link
              href="/seja-parceiro"
              className="group mt-8 inline-flex items-center gap-4 rounded-full bg-[var(--brand-yellow)] py-2.5 pl-6 pr-2.5 text-sm font-black text-[var(--brand-blue-950)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ffd84d]"
            >
              Quero abrir uma unidade
              <span className="grid size-9 place-items-center rounded-full bg-[var(--brand-blue-950)] text-[var(--brand-yellow)] transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight size={17} />
              </span>
            </Link>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] lg:aspect-[5/4]">
            <Image
              src="/images/hero/fachada-unishop-hero.webp"
              alt="Fachada de uma loja da Rede Unishop, em azul e amarelo, vista da rua."
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* OS OITO PONTOS
            Fechados por padrão: a lista inteira cabe em oito linhas e cada um
            abre onde está, sem empurrar a página para baixo antes da hora. */}
        <div className="mt-14 lg:mt-16">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40">
            Os oito pontos do modelo · toque para ler
          </p>

          {/* Duas colunas de CSS puro no desktop: cada uma flui sozinha, então
              abrir um ponto não deixa buraco ao lado dele. */}
          <div className="mt-5 border-t border-white/12 lg:columns-2 lg:gap-x-14">
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

          <Link
            href="/modelo-de-negocio"
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-white/70 underline-offset-4 transition-colors duration-300 hover:text-[var(--brand-yellow)] hover:underline"
          >
            Ver o modelo em detalhe
            <ArrowRight size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
