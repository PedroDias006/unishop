"use client";

import {
  ArrowLeft,
  Check,
  ExternalLink,
  LoaderCircle,
  MapPin,
  Navigation,
  Search,
  Store,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";

type StateFocus = {
  id: string;
  name: string;
  x: number;
  y: number;
};

type CityLocation = {
  name: string;
  state: string;
  stores: number;
  locations: StoreLocation[];
};

type StoreLocation = {
  id: string;
  name: string;
  address: string;
  phone?: string;
};

type LocationPayload = {
  cities: CityLocation[];
  states: string[];
  totals: { stores: number; cities: number; states: number };
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

type BrazilMap = {
  viewBox: string;
  locations: Array<{ id: string; name: string; path: string }>;
};

// Placeholder até o mapa entrar. O viewBox é o mesmo do arquivo real, então a
// caixa já nasce com a altura definitiva e a seção não salta.
const emptyMap: BrazilMap = { viewBox: "0 0 613 639", locations: [] };

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
}

function getMapsQuery(store: StoreLocation) {
  return `${store.name}, ${store.address}`;
}

function getMapEmbedUrl(store: StoreLocation) {
  return `https://www.google.com/maps?q=${encodeURIComponent(getMapsQuery(store))}&hl=pt-BR&z=16&output=embed`;
}

function getMapLinkUrl(store: StoreLocation) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(getMapsQuery(store))}`;
}

function getDirectionsUrl(store: StoreLocation) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(getMapsQuery(store))}`;
}

export function BrazilPresence() {
  const mapRef = useRef<SVGSVGElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [brazilMap, setBrazilMap] = useState<BrazilMap>(emptyMap);
  const [data, setData] = useState<LocationPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<CityLocation | null>(null);
  const [selectedStore, setSelectedStore] = useState<StoreLocation | null>(null);
  const [selectedState, setSelectedState] = useState<StateFocus | null>(null);
  const [hoveredState, setHoveredState] = useState<StateFocus | null>(null);

  const activeStateIds = useMemo(
    () => new Set((data?.states ?? []).map((state) => state.toLowerCase())),
    [data],
  );

  const cityResults = useMemo(() => {
    const term = normalize(query);
    if (!data || term.length < 2 || selectedCity) return [];

    return data.cities
      .map((city) => {
        const normalizedName = normalize(city.name);
        const score = normalizedName === term ? 0 : normalizedName.startsWith(term) ? 1 : 2;
        return { city, normalizedName, score };
      })
      .filter(({ normalizedName }) => normalizedName.includes(term))
      .sort((a, b) => a.score - b.score || a.city.name.localeCompare(b.city.name, "pt-BR"))
      .slice(0, 7)
      .map(({ city }) => city);
  }, [data, query, selectedCity]);

  const activeState = hoveredState ?? selectedState;
  const activeRegion = activeState ? regions[activeState.id] : "Brasil";
  const selectedStateCities = activeState
    ? data?.cities.filter((city) => city.state.toLowerCase() === activeState.id).length ?? 0
    : 0;

  useEffect(() => {
    // O traçado do mapa (~64 KB) e a lista de unidades só são buscados quando
    // a seção se aproxima da tela. Antes, ambos saíam junto com a home inteira.
    const section = sectionRef.current;
    const controller = new AbortController();
    let started = false;

    function load() {
      if (started) return;
      started = true;

      import("@svg-maps/brazil")
        .then((module) => setBrazilMap(module.default as BrazilMap))
        .catch(() => setBrazilMap(emptyMap));

      fetch("/api/unishop-locations", { signal: controller.signal })
        .then((response) => {
          if (!response.ok) throw new Error("Location request failed");
          return response.json() as Promise<LocationPayload>;
        })
        .then((payload) => setData(payload))
        .catch((error: unknown) => {
          if (!(error instanceof DOMException && error.name === "AbortError")) setData(null);
        })
        .finally(() => setIsLoading(false));
    }

    if (!section || typeof IntersectionObserver !== "function") {
      load();
      return () => controller.abort();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          load();
        }
      },
      { rootMargin: "600px 0px" },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!activeStateIds.has("sp") || selectedState) return;

    const target = mapRef.current?.querySelector<SVGPathElement>(
      '[data-state-id="sp"]',
    );
    const location = brazilMap.locations.find((item) => item.id === "sp");

    if (!target || !location) return;
    setSelectedState(getStateFocus(location.id, location.name, target));
  }, [activeStateIds, brazilMap, selectedState]);

  function getStateFocus(id: string, name: string, target: SVGPathElement): StateFocus {
    const bounds = target.getBBox();

    return {
      id,
      name,
      x: bounds.x + bounds.width / 2,
      y: bounds.y + bounds.height / 2,
    };
  }

  function focusState(stateId: string) {
    const target = mapRef.current?.querySelector<SVGPathElement>(
      `[data-state-id="${stateId}"]`,
    );
    const location = brazilMap.locations.find((item) => item.id === stateId);

    if (!target || !location || !activeStateIds.has(stateId)) return;
    setSelectedState(getStateFocus(location.id, location.name, target));
  }

  function chooseCity(city: CityLocation) {
    setSelectedCity(city);
    setSelectedStore(city.locations[0] ?? null);
    setQuery(`${city.name} - ${city.state}`);
    setSearchOpen(false);
    focusState(city.state.toLowerCase());
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    setSelectedCity(null);
    setSelectedStore(null);
    setSearchOpen(true);
  }

  function showBrazilMap() {
    setSelectedCity(null);
    setSelectedStore(null);
    setQuery("");
    setSearchOpen(false);
  }

  return (
    <section
      ref={sectionRef}
      id="presenca"
      className="scroll-mt-28 overflow-hidden bg-[linear-gradient(115deg,#04316c_0%,#095794_100%)] py-20 font-[Manrope] text-white sm:py-28"
    >
      <Container className="grid items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
        <div className="max-w-xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#ffc928]" aria-hidden="true" />
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#ffd34c]">
              Presença confirmada
            </p>
          </div>

          <h2 className="mt-5 text-balance text-4xl font-extrabold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            Tem Unishop na sua cidade?
          </h2>
          <p className="mt-6 max-w-lg text-base leading-7 text-white/70 sm:text-lg">
            Pesquise sua cidade ou explore apenas os estados que possuem unidades cadastradas na rede.
          </p>

          <div className="relative z-20 mt-8 max-w-lg">
            <label htmlFor="unishop-city-search" className="mb-2 block text-sm font-bold text-white/90">
              Consulte sua cidade
            </label>
            <div className="relative">
              <Search
                size={18}
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#07508b]"
              />
              <input
                id="unishop-city-search"
                type="search"
                value={query}
                onChange={(event) => handleQueryChange(event.target.value)}
                onFocus={() => setSearchOpen(true)}
                placeholder="Digite o nome da cidade"
                autoComplete="off"
                className="h-13 w-full rounded-xl border border-white/20 bg-white pl-11 pr-12 text-sm font-semibold text-[#082e5d] outline-none transition placeholder:text-[#71849b] focus:border-[#ffc928] focus:ring-4 focus:ring-[#ffc928]/15"
              />
              {isLoading ? (
                <LoaderCircle
                  size={18}
                  aria-label="Atualizando cidades"
                  className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-[#0a5795]"
                />
              ) : null}
            </div>

            {searchOpen && query.trim().length >= 2 && !selectedCity ? (
              <div className="absolute left-0 right-0 top-[calc(100%+8px)] overflow-hidden rounded-xl border border-[#dbe7f1] bg-white py-1 text-[#082e5d] shadow-[0_18px_45px_rgba(0,23,55,0.28)]">
                {isLoading ? (
                  <p className="flex items-center gap-2 px-4 py-4 text-sm text-[#5e7289]">
                    <LoaderCircle size={16} className="animate-spin" />
                    Atualizando a relação de cidades...
                  </p>
                ) : cityResults.length ? (
                  cityResults.map((city) => (
                    <button
                      key={`${city.state}-${normalize(city.name)}`}
                      type="button"
                      onClick={() => chooseCity(city)}
                      className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition hover:bg-[#edf6fc] focus:bg-[#edf6fc] focus:outline-none"
                    >
                      <span>
                        <strong className="block text-sm font-extrabold">{city.name}</strong>
                        <span className="mt-0.5 block text-xs text-[#687b91]">{city.state}</span>
                      </span>
                      <span className="shrink-0 text-xs font-bold text-[#07508b]">
                        {city.stores} {city.stores === 1 ? "unidade" : "unidades"}
                      </span>
                    </button>
                  ))
                ) : data ? (
                  <p className="px-4 py-4 text-sm leading-6 text-[#5e7289]">
                    Essa cidade não aparece na lista oficial de unidades no momento.
                  </p>
                ) : (
                  <p className="px-4 py-4 text-sm leading-6 text-[#5e7289]">
                    Não foi possível consultar as cidades agora. Tente novamente em instantes.
                  </p>
                )}
              </div>
            ) : null}

            <div aria-live="polite" className="min-h-11 pt-3">
              {selectedCity ? (
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-[0_14px_35px_rgba(0,26,62,0.18)] backdrop-blur-sm">
                  <p className="flex items-center gap-2 text-sm font-extrabold text-white">
                    <span className="grid size-7 place-items-center rounded-full bg-[#ffc928] text-[#07396e]">
                      <Check size={15} strokeWidth={3} />
                    </span>
                    {selectedCity.stores === 1
                      ? `Encontramos uma unidade em ${selectedCity.name}.`
                      : `Encontramos ${selectedCity.stores} unidades em ${selectedCity.name}.`}
                  </p>

                  {selectedCity.locations.length > 1 ? (
                    <div className="mt-4">
                      <label
                        htmlFor="unishop-store-select"
                        className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.13em] text-white/60"
                      >
                        Escolha qual unidade ver no mapa
                      </label>
                      <div className="relative">
                        <Store
                          size={16}
                          aria-hidden="true"
                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#07508b]"
                        />
                        <select
                          id="unishop-store-select"
                          value={selectedStore?.id ?? ""}
                          onChange={(event) => {
                            const store = selectedCity.locations.find(
                              (location) => location.id === event.target.value,
                            );
                            setSelectedStore(store ?? selectedCity.locations[0] ?? null);
                          }}
                          className="h-11 w-full appearance-none rounded-xl border border-white/30 bg-white pl-10 pr-10 text-sm font-bold text-[#082e5d] outline-none transition focus:border-[#ffc928] focus:ring-4 focus:ring-[#ffc928]/15"
                        >
                          {selectedCity.locations.map((store, index) => (
                            <option key={store.id} value={store.id}>
                              {index + 1}. {store.name}
                            </option>
                          ))}
                        </select>
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#07508b]"
                        >
                          ▼
                        </span>
                      </div>
                    </div>
                  ) : null}

                  {selectedStore ? (
                    <a
                      href={getMapLinkUrl(selectedStore)}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#ffc928] px-4 py-2.5 text-sm font-extrabold text-[#07396e] transition hover:bg-[#ffd85c] focus:outline-none focus:ring-4 focus:ring-[#ffc928]/25"
                    >
                      <MapPin size={17} aria-hidden="true" />
                      Ver no Google Maps
                      <ExternalLink size={15} aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              ) : (
                <p className="text-xs text-white/50">Busca atualizada com a relação oficial da Rede Unishop.</p>
              )}
            </div>
          </div>

          <div className="mt-6 grid max-w-lg grid-cols-3 border-y border-white/15 py-5">
            <div className="border-r border-white/15 pr-4">
              <strong className="block text-2xl font-extrabold tracking-[-0.04em] text-[#ffc928] sm:text-3xl">
                {data?.totals.stores ?? "—"}
              </strong>
              <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.11em] text-white/55 sm:text-xs">
                unidades
              </span>
            </div>
            <div className="border-r border-white/15 px-4">
              <strong className="block text-2xl font-extrabold tracking-[-0.04em] text-[#ffc928] sm:text-3xl">
                {data?.totals.cities ?? "—"}
              </strong>
              <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.11em] text-white/55 sm:text-xs">
                cidades
              </span>
            </div>
            <div className="pl-4">
              <strong className="block text-2xl font-extrabold tracking-[-0.04em] text-[#ffc928] sm:text-3xl">
                {data?.totals.states ?? "—"}
              </strong>
              <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.11em] text-white/55 sm:text-xs">
                UFs
              </span>
            </div>
          </div>

          <div className="mt-7 flex min-h-20 items-center gap-4 border-l-2 border-[#ffc928] bg-white/8 px-5 py-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#ffc928] text-sm font-extrabold text-[#07396e]">
              {activeState?.id.toUpperCase() ?? "BR"}
            </span>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/50">
                {hoveredState ? "Estado em destaque" : "Estado selecionado"}
              </span>
              <p className="mt-1 text-lg font-extrabold">
                {activeState?.name ?? "Escolha um estado"}
                {activeState ? <span className="font-medium text-white/55"> · {activeRegion}</span> : null}
              </p>
              {activeState ? (
                <p className="mt-1 text-xs text-white/60">
                  {selectedStateCities} {selectedStateCities === 1 ? "cidade cadastrada" : "cidades cadastradas"}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[680px]">
          {selectedCity && selectedStore ? (
            <div className="overflow-hidden rounded-3xl border border-white/15 bg-white shadow-[0_28px_70px_rgba(0,19,51,0.32)]">
              <div className="flex items-start justify-between gap-4 px-5 py-4 text-[#082e5d] sm:px-6">
                <div className="min-w-0">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#1472aa]">
                    Unidade selecionada
                  </p>
                  <h3 className="mt-1 truncate text-base font-extrabold sm:text-lg">
                    {selectedStore.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#62778d] sm:text-sm">
                    {selectedStore.address}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={showBrazilMap}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#d8e6f0] px-3 py-2 text-xs font-extrabold text-[#07508b] transition hover:border-[#9fc7df] hover:bg-[#eff7fb] focus:outline-none focus:ring-4 focus:ring-[#0a5795]/10"
                >
                  <ArrowLeft size={14} aria-hidden="true" />
                  <span className="hidden sm:inline">Voltar ao Brasil</span>
                  <span className="sm:hidden">Voltar</span>
                </button>
              </div>

              <iframe
                key={selectedStore.id}
                src={getMapEmbedUrl(selectedStore)}
                title={`Mapa interativo da ${selectedStore.name} em ${selectedCity.name}`}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[390px] w-full border-0 sm:h-[460px]"
              />

              <div className="grid gap-2 bg-[#f4f8fb] p-3 sm:grid-cols-2 sm:p-4">
                <a
                  href={getMapLinkUrl(selectedStore)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#cddfea] bg-white px-4 py-2.5 text-sm font-extrabold text-[#07508b] transition hover:border-[#8ebbd6] hover:bg-[#f9fcfe] focus:outline-none focus:ring-4 focus:ring-[#0a5795]/10"
                >
                  <ExternalLink size={16} aria-hidden="true" />
                  Abrir mapa completo
                </a>
                <a
                  href={getDirectionsUrl(selectedStore)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#ffc928] px-4 py-2.5 text-sm font-extrabold text-[#07396e] transition hover:bg-[#ffd85c] focus:outline-none focus:ring-4 focus:ring-[#ffc928]/25"
                >
                  <Navigation size={16} aria-hidden="true" />
                  Como chegar
                </a>
              </div>
            </div>
          ) : (
            <>
              <div className="pointer-events-none absolute inset-10 rounded-full bg-[#37a0dc]/12 blur-3xl" />
              <svg
            ref={mapRef}
            viewBox={brazilMap.viewBox}
            role="img"
            aria-label="Mapa do Brasil; somente estados com unidades Unishop confirmadas podem ser selecionados"
            className="relative h-auto w-full overflow-visible drop-shadow-[0_22px_34px_rgba(0,18,52,0.24)]"
          >
            {brazilMap.locations.map((location) => {
              const hasStores = activeStateIds.has(location.id);
              const active = hasStores && activeState?.id === location.id;

              return (
                <path
                  key={location.id}
                  data-state-id={location.id}
                  d={location.path}
                  role={hasStores ? "button" : undefined}
                  tabIndex={hasStores ? 0 : undefined}
                  aria-label={
                    hasStores
                      ? `${location.name}, possui unidades Unishop cadastradas`
                      : `${location.name}, sem unidade na lista atual`
                  }
                  aria-disabled={!hasStores}
                  aria-pressed={hasStores ? selectedState?.id === location.id : undefined}
                  onPointerEnter={(event) => {
                    if (hasStores) {
                      setHoveredState(
                        getStateFocus(location.id, location.name, event.currentTarget),
                      );
                    }
                  }}
                  onPointerLeave={() => setHoveredState(null)}
                  onFocus={(event) => {
                    if (hasStores) {
                      setHoveredState(
                        getStateFocus(location.id, location.name, event.currentTarget),
                      );
                    }
                  }}
                  onBlur={() => setHoveredState(null)}
                  onClick={(event) => {
                    if (hasStores) {
                      setSelectedCity(null);
                      setSelectedStore(null);
                      setSelectedState(
                        getStateFocus(location.id, location.name, event.currentTarget),
                      );
                    }
                  }}
                  onKeyDown={(event) => {
                    if (hasStores && (event.key === "Enter" || event.key === " ")) {
                      event.preventDefault();
                      setSelectedCity(null);
                      setSelectedStore(null);
                      setSelectedState(
                        getStateFocus(location.id, location.name, event.currentTarget),
                      );
                    }
                  }}
                  className={`stroke-white transition-[fill,filter,opacity] duration-200 focus:outline-none ${
                    !hasStores
                      ? "cursor-default fill-[#082f5c] opacity-40"
                      : active
                        ? "cursor-pointer fill-[#ffc928] drop-shadow-[0_0_8px_rgba(255,201,40,0.5)]"
                        : "cursor-pointer fill-[#1170aa] hover:fill-[#ffc928] focus:fill-[#ffc928]"
                  }`}
                  strokeWidth={1.7}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}

            {activeState && activeStateIds.has(activeState.id) ? (
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

              <div className="relative mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] font-semibold text-white/60">
                <span className="inline-flex items-center gap-2">
                  <i className="size-2.5 rounded-full bg-[#1170aa]" /> Com unidade cadastrada
                </span>
                <span className="inline-flex items-center gap-2">
                  <i className="size-2.5 rounded-full bg-[#082f5c] opacity-60" /> Sem unidade na lista atual
                </span>
              </div>
              <p className="relative mt-3 text-center text-[10px] leading-4 text-white/35">
                Dados de unidades: Rede Unishop. Mapa adaptado de SVG Maps Brazil, CC BY 4.0.
              </p>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
