"use client";

import brazil from "@svg-maps/brazil";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";

type StateFocus = {
  id: string;
  name: string;
  x: number;
  y: number;
};

const regions: Record<string, string> = {
  ac: "Norte",
  al: "Nordeste",
  ap: "Norte",
  am: "Norte",
  ba: "Nordeste",
  ce: "Nordeste",
  df: "Centro-Oeste",
  es: "Sudeste",
  go: "Centro-Oeste",
  ma: "Nordeste",
  mt: "Centro-Oeste",
  ms: "Centro-Oeste",
  mg: "Sudeste",
  pa: "Norte",
  pb: "Nordeste",
  pr: "Sul",
  pe: "Nordeste",
  pi: "Nordeste",
  rj: "Sudeste",
  rn: "Nordeste",
  rs: "Sul",
  ro: "Norte",
  rr: "Norte",
  sc: "Sul",
  sp: "Sudeste",
  se: "Nordeste",
  to: "Norte",
};

const brazilMap = brazil as {
  viewBox: string;
  locations: Array<{ id: string; name: string; path: string }>;
};

export function BrazilPresence() {
  const mapRef = useRef<SVGSVGElement>(null);
  const [selectedState, setSelectedState] = useState<StateFocus | null>(null);
  const [hoveredState, setHoveredState] = useState<StateFocus | null>(null);

  useEffect(() => {
    const initialPath = mapRef.current?.querySelector<SVGPathElement>(
      '[data-state-id="sp"]',
    );

    if (!initialPath) return;

    const bounds = initialPath.getBBox();
    setSelectedState({
      id: "sp",
      name: "São Paulo",
      x: bounds.x + bounds.width / 2,
      y: bounds.y + bounds.height / 2,
    });
  }, []);

  const activeState = hoveredState ?? selectedState;
  const activeRegion = activeState ? regions[activeState.id] : "Brasil";
  const stateCount = brazilMap.locations.length;

  const instruction = useMemo(
    () => (hoveredState ? "Estado em destaque" : "Estado selecionado"),
    [hoveredState],
  );

  function getStateFocus(
    id: string,
    name: string,
    target: SVGPathElement,
  ): StateFocus {
    const bounds = target.getBBox();

    return {
      id,
      name,
      x: bounds.x + bounds.width / 2,
      y: bounds.y + bounds.height / 2,
    };
  }

  return (
    <section
      id="presenca"
      className="scroll-mt-28 overflow-hidden bg-[linear-gradient(115deg,#04316c_0%,#095794_100%)] py-20 font-[Manrope] text-white sm:py-28"
    >
      <Container className="grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <div className="max-w-xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#ffc928]" aria-hidden="true" />
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#ffd34c]">
              Presença nacional
            </p>
          </div>

          <h2 className="mt-5 text-balance text-4xl font-extrabold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            A Unishop está em todo o Brasil.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-7 text-white/70 sm:text-lg">
            Passe o mouse sobre o mapa ou toque em um estado para explorar a presença da rede de norte a sul.
          </p>

          <div className="mt-9 grid max-w-lg grid-cols-2 border-y border-white/15 py-5">
            <div className="border-r border-white/15 pr-5">
              <strong className="block text-3xl font-extrabold tracking-[-0.04em] text-[#ffc928]">
                +500
              </strong>
              <span className="mt-1 block text-xs font-bold uppercase tracking-[0.13em] text-white/55">
                lojas no país
              </span>
            </div>
            <div className="pl-5">
              <strong className="block text-3xl font-extrabold tracking-[-0.04em] text-[#ffc928]">
                {stateCount}
              </strong>
              <span className="mt-1 block text-xs font-bold uppercase tracking-[0.13em] text-white/55">
                estados atendidos
              </span>
            </div>
          </div>

          <div className="mt-8 flex min-h-24 items-center gap-4 border-l-2 border-[#ffc928] bg-white/8 px-5 py-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#ffc928] text-sm font-extrabold text-[#07396e]">
              {activeState?.id.toUpperCase() ?? "BR"}
            </span>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/50">
                {instruction}
              </span>
              <p className="mt-1 text-lg font-extrabold">
                {activeState?.name ?? "Escolha um estado"}
                {activeState ? <span className="font-medium text-white/55"> · {activeRegion}</span> : null}
              </p>
              <p className="mt-1 text-xs text-white/60">Rede Unishop presente</p>
            </div>
          </div>

          <Link
            href="/lojas"
            className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#ffc928] px-6 text-sm font-extrabold text-[#07396e] transition hover:-translate-y-0.5 hover:bg-[#ffd84d]"
          >
            Encontrar uma loja
            <ArrowRight size={17} className="transition group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="relative mx-auto w-full max-w-[680px]">
          <div className="pointer-events-none absolute inset-10 rounded-full bg-[#37a0dc]/18 blur-3xl" />
          <svg
            ref={mapRef}
            viewBox={brazilMap.viewBox}
            role="img"
            aria-label="Mapa interativo do Brasil com todos os estados atendidos pela Rede Unishop"
            className="relative h-auto w-full overflow-visible drop-shadow-[0_22px_34px_rgba(0,18,52,0.24)]"
          >
            {brazilMap.locations.map((location) => {
              const active = activeState?.id === location.id;

              return (
                <path
                  key={location.id}
                  data-state-id={location.id}
                  d={location.path}
                  role="button"
                  tabIndex={0}
                  aria-label={`${location.name}, Rede Unishop presente`}
                  aria-pressed={selectedState?.id === location.id}
                  onPointerEnter={(event) =>
                    setHoveredState(
                      getStateFocus(location.id, location.name, event.currentTarget),
                    )
                  }
                  onPointerLeave={() => setHoveredState(null)}
                  onFocus={(event) =>
                    setHoveredState(
                      getStateFocus(location.id, location.name, event.currentTarget),
                    )
                  }
                  onBlur={() => setHoveredState(null)}
                  onClick={(event) =>
                    setSelectedState(
                      getStateFocus(location.id, location.name, event.currentTarget),
                    )
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedState(
                        getStateFocus(location.id, location.name, event.currentTarget),
                      );
                    }
                  }}
                  className={`cursor-pointer stroke-white transition-[fill,filter,opacity] duration-200 focus:outline-none ${
                    active
                      ? "fill-[#ffc928] drop-shadow-[0_0_9px_rgba(255,201,40,0.6)]"
                      : "fill-[#0a4a84] hover:fill-[#ffc928] focus:fill-[#ffc928]"
                  }`}
                  strokeWidth={1.7}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}

            {activeState ? (
              <foreignObject
                x={activeState.x - 24}
                y={activeState.y - 38}
                width="48"
                height="42"
                className="pointer-events-none overflow-visible"
              >
                <div className="relative mx-auto h-9 w-10 drop-shadow-[0_5px_6px_rgba(0,20,50,0.3)]">
                  <span className="absolute bottom-0 left-1 h-9 w-[2px] rounded-full bg-white" />
                  <span className="absolute left-[6px] top-0 flex h-5 w-8 items-center justify-center rounded-r-sm bg-[#ffc928] text-[6px] font-black tracking-[-0.04em] text-[#07396e]">
                    UNI
                  </span>
                  <MapPin className="absolute -bottom-0.5 -left-1 text-white" size={10} fill="white" />
                </div>
              </foreignObject>
            ) : null}
          </svg>

          <p className="relative mt-4 text-center text-[10px] leading-4 text-white/35">
            Mapa adaptado de SVG Maps Brazil, licenciado sob CC BY 4.0.
          </p>
        </div>
      </Container>
    </section>
  );
}
