import {
  ArrowRight,
  BadgePercent,
  CalendarClock,
  GraduationCap,
  Handshake,
  Megaphone,
  PackageSearch,
  Store,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { partnershipPillars } from "@/data/network";

/**
 * No site antigo cada um destes oito pilares era um vídeo que o visitante
 * precisava abrir para descobrir o que dizia. Aqui o texto está na página: dá
 * para ler os oito em meio minuto e só então decidir se quer falar com alguém.
 *
 * A ordem dos ícones acompanha a ordem de `partnershipPillars`.
 */
const icons = [
  Store,
  BadgePercent,
  PackageSearch,
  CalendarClock,
  GraduationCap,
  Megaphone,
  Tag,
  Handshake,
] as const;

export function PartnershipPillars() {
  return (
    <section
      id="parceria"
      className="scroll-mt-28 bg-white py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-16">
          <div>
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="h-px w-10 bg-[var(--brand-yellow)]"
              />
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--brand-blue-800)]">
                O modelo, por inteiro
              </p>
            </div>

            <h2 className="mt-6 text-balance text-3xl font-black leading-[1.03] tracking-[-0.045em] text-[var(--brand-blue-950)] sm:text-4xl lg:text-[46px]">
              Não somos franquia.
              <span className="block text-[var(--brand-yellow-dark)]">
                Somos parceria.
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-base leading-8 text-slate-600 lg:pb-2">
            A diferença não está no nome: está em oito pontos concretos que
            definem quanto você paga, o que recebe e o que se espera de você.
            Estão todos abaixo, sem letra miúda.
          </p>
        </div>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-[26px] border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          {partnershipPillars.map((pillar, index) => {
            const Icon = icons[index];

            return (
              <li
                key={pillar.id}
                className="group relative flex flex-col bg-white p-7 transition duration-300 hover:bg-[#f7fafd] lg:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-full bg-[#eef5fc] text-[var(--brand-blue-800)] transition duration-300 group-hover:bg-[var(--brand-yellow)] group-hover:text-[var(--brand-blue-950)]">
                    <Icon size={19} strokeWidth={2.1} />
                  </span>

                  <span
                    aria-hidden="true"
                    className="text-xs font-black tabular-nums tracking-[0.1em] text-slate-300"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-black leading-[1.2] tracking-[-0.03em] text-[var(--brand-blue-950)]">
                  {pillar.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {pillar.text}
                </p>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 rounded-[26px] bg-[#f6f9fc] px-7 py-7 sm:px-9">
          <p className="max-w-xl text-base leading-7 text-slate-700">
            <strong className="font-black text-[var(--brand-blue-950)]">
              Sem royalties, sem taxa de franquia, sem mensalidade.
            </strong>{" "}
            O que você paga é o produto que vai revender.
          </p>

          <Link
            href="/modelo-de-negocio"
            className="group inline-flex items-center gap-4 rounded-full bg-[var(--brand-blue-900)] py-2.5 pl-6 pr-2.5 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--brand-blue-950)]"
          >
            Ver o modelo em detalhe
            <span className="grid size-9 place-items-center rounded-full bg-[var(--brand-yellow)] text-[var(--brand-blue-950)] transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight size={17} />
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
