import { Container } from "@/components/ui/Container";
import { businessNumbers, networkNumbers } from "@/data/network";

/**
 * Os números da rede vinham no site antigo e não tinham lugar no novo — quem
 * chegava lia cinco banners sem nunca descobrir o tamanho da operação.
 *
 * São duas leituras diferentes na mesma faixa: em cima, o porte da rede (para
 * o consumidor); embaixo, os números do negócio (para quem pensa em investir).
 */
export function NetworkNumbers() {
  return (
    <section
      aria-label="A Rede Unishop em números"
      className="relative overflow-hidden bg-[var(--brand-blue-950)] py-16 text-white sm:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-32 size-96 rounded-full bg-[var(--brand-yellow)]/8 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-20 size-96 rounded-full bg-[var(--brand-blue-700)]/20 blur-3xl"
      />

      <Container className="relative">
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="h-px w-10 bg-[var(--brand-yellow)]" />
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--brand-yellow)]">
            A rede em números
          </p>
        </div>

        <h2 className="mt-6 max-w-3xl text-balance text-3xl font-black leading-[1.04] tracking-[-0.045em] sm:text-4xl lg:text-[44px]">
          Uma operação que já cobre o Brasil inteiro.
        </h2>

        <p className="mt-5 max-w-2xl text-base leading-7 text-white/65">
          A Rede Unishop nasceu dentro de uma indústria de limpeza com quase
          quatro décadas de estrada. É esse tamanho que sustenta o preço, a
          variedade e o abastecimento de cada loja.
        </p>

        {/* Porte da rede */}
        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {networkNumbers.map((item) => (
            // `flex-col-reverse` põe o número em cima sem trocar a ordem no
            // HTML: a lista continua sendo termo (rótulo) e depois definição
            // (número), que é o que o leitor de tela anuncia.
            <div
              key={item.label}
              className="flex flex-col-reverse border-t border-white/12 pt-5"
            >
              <dt className="mt-3 text-sm font-bold leading-5 text-white/70">
                {item.label}
              </dt>
              <dd className="text-[clamp(2.5rem,5.6vw,3.75rem)] font-black leading-none tracking-[-0.05em] text-[var(--brand-yellow)]">
                {item.value}
                {item.unit ? (
                  <>
                    {" "}
                    <span className="text-[0.42em] font-black uppercase tracking-[0.1em] text-white/70">
                      {item.unit}
                    </span>
                  </>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>

        {/* Números do negócio */}
        <div className="mt-14 rounded-[26px] border border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:p-10">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/45">
            Para quem pensa em abrir uma unidade
          </p>

          <dl className="mt-7 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {businessNumbers.map((item) => (
              <div key={item.label}>
                <dt>
                  <span className="block text-2xl font-black tracking-[-0.035em] text-white sm:text-[28px]">
                    {item.value}
                  </span>
                  <span className="mt-1.5 block text-xs font-black uppercase tracking-[0.14em] text-[var(--brand-yellow)]">
                    {item.label}
                  </span>
                </dt>
                <dd className="mt-3 text-sm leading-6 text-white/55">
                  {item.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
