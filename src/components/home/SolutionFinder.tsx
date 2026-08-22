"use client";

import Image from "next/image";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Search,
  X,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Container } from "@/components/ui/Container";

type SolutionCatalog = Record<
  string,
  Record<string, string[]>
>;

type SolutionSelection = {
  local: string;
  surface: string;
  problem: string;
};

type SolutionFinderProps = {
  onSubmit?: (selection: SolutionSelection) => void;
};

/*
  Você pode adicionar quantos locais, superfícies
  e problemas quiser sem alterar o componente.
*/

const solutionCatalog: SolutionCatalog = {
  Academias: {
    Equipamentos: [
      "Suor",
      "Gordura corporal",
      "Odor",
      "Sujidade geral",
      "Desinfecção",
    ],
    Pisos: [
      "Marcas de calçados",
      "Sujidade pesada",
      "Manutenção diária",
    ],
    "Vestiários e banheiros": [
      "Odor",
      "Resíduos orgânicos",
      "Incrustações",
      "Desinfecção",
    ],
    "Objetos compartilhados": [
      "Suor",
      "Desinfecção",
      "Sujidade geral",
    ],
  },

  Açougues: {
    Bancadas: [
      "Proteínas",
      "Sangue",
      "Sujidades gordurosas",
      "Desinfecção",
    ],
    "Caixas plásticas": [
      "Proteínas",
      "Sangue",
      "Gordura",
      "Sujidade pesada",
    ],
    Equipamentos: [
      "Proteínas",
      "Sangue",
      "Sujidades gordurosas",
      "Resíduos orgânicos",
    ],
    Paredes: [
      "Proteínas",
      "Sangue",
      "Sujidades gordurosas",
    ],
    "Pisos frios laváveis": [
      "Sangue",
      "Gordura",
      "Proteínas",
      "Sujidade pesada",
    ],
    "Tanques de expansão": [
      "Proteínas",
      "Gordura",
      "Desinfecção",
    ],
    "Tanques de transporte": [
      "Proteínas",
      "Gordura",
      "Desinfecção",
    ],
    "Bancadas de inox": [
      "Proteínas",
      "Sangue",
      "Gordura",
      "Manchas",
    ],
    "Equipamentos em aço inox": [
      "Proteínas",
      "Gordura",
      "Manchas",
      "Desinfecção",
    ],
    Balanças: [
      "Sujidade geral",
      "Gordura",
      "Desinfecção",
    ],
    Computadores: [
      "Sujidade geral",
      "Desinfecção",
    ],
    Corrimões: [
      "Sujidade geral",
      "Desinfecção",
    ],
    Interruptores: [
      "Sujidade geral",
      "Desinfecção",
    ],
    Maçanetas: [
      "Sujidade geral",
      "Desinfecção",
    ],
    "Objetos compartilhados": [
      "Sujidade geral",
      "Desinfecção",
    ],
    "Câmara fria": [
      "Proteínas",
      "Sangue",
      "Gordura",
      "Odor",
    ],
    Serra: [
      "Proteínas",
      "Sangue",
      "Gordura",
    ],
    Termômetros: [
      "Sujidade geral",
      "Desinfecção",
    ],
    Utensílios: [
      "Proteínas",
      "Sangue",
      "Gordura",
      "Desinfecção",
    ],
  },

  Ambulatórios: {
    Pisos: [
      "Sujidade geral",
      "Desinfecção",
      "Manutenção diária",
    ],
    Paredes: [
      "Sujidade geral",
      "Desinfecção",
    ],
    Macas: [
      "Desinfecção",
      "Sujidade geral",
    ],
    Bancadas: [
      "Desinfecção",
      "Sujidade geral",
    ],
    "Objetos compartilhados": [
      "Desinfecção",
    ],
  },

  "Área Gourmet": {
    Bancadas: [
      "Gordura",
      "Alimentos",
      "Sujidade geral",
    ],
    Churrasqueiras: [
      "Gordura carbonizada",
      "Fuligem",
      "Sujidade pesada",
    ],
    Pisos: [
      "Gordura",
      "Manchas",
      "Sujidade geral",
    ],
    Paredes: [
      "Gordura",
      "Resíduos de alimentos",
    ],
    Utensílios: [
      "Gordura",
      "Alimentos",
      "Manchas",
    ],
  },

  Autopeças: {
    Pisos: [
      "Óleo",
      "Graxa",
      "Sujidade pesada",
      "Marcas de pneus",
    ],
    Equipamentos: [
      "Óleo",
      "Graxa",
      "Sujidade pesada",
    ],
    Bancadas: [
      "Óleo",
      "Graxa",
      "Sujidade geral",
    ],
  },

  Banheiros: {
    Vasos: [
      "Incrustações",
      "Odor",
      "Desinfecção",
    ],
    Pisos: [
      "Sujidade geral",
      "Odor",
      "Desinfecção",
    ],
    Pias: [
      "Manchas",
      "Incrustações",
      "Desinfecção",
    ],
    Espelhos: [
      "Marcas",
      "Manchas",
      "Limpeza diária",
    ],
  },

  "Bares e restaurantes": {
    Cozinhas: [
      "Gordura",
      "Alimentos",
      "Sujidade pesada",
    ],
    Pisos: [
      "Gordura",
      "Sujidade geral",
      "Manchas",
    ],
    Mesas: [
      "Gordura",
      "Alimentos",
      "Desinfecção",
    ],
    Banheiros: [
      "Odor",
      "Incrustações",
      "Desinfecção",
    ],
  },

  "Casas e residências": {
    Pisos: [
      "Sujidade geral",
      "Manchas",
      "Uso diário",
    ],
    Banheiros: [
      "Incrustações",
      "Odor",
      "Desinfecção",
    ],
    Cozinhas: [
      "Gordura",
      "Alimentos",
      "Uso diário",
    ],
    Vidros: [
      "Manchas",
      "Marcas",
      "Poeira",
    ],
    Tecidos: [
      "Manchas",
      "Odor",
      "Sujidade geral",
    ],
  },

  Churrascarias: {
    Churrasqueiras: [
      "Gordura carbonizada",
      "Fuligem",
      "Sujidade pesada",
    ],
    Cozinhas: [
      "Gordura",
      "Alimentos",
      "Sujidade pesada",
    ],
    Pisos: [
      "Gordura",
      "Sujidade geral",
      "Manchas",
    ],
  },

  Comércios: {
    Pisos: [
      "Sujidade geral",
      "Marcas",
      "Uso diário",
    ],
    Vidros: [
      "Manchas",
      "Marcas",
      "Poeira",
    ],
    Balcões: [
      "Sujidade geral",
      "Desinfecção",
    ],
  },

  Condomínios: {
    Pisos: [
      "Sujidade geral",
      "Manchas",
      "Uso diário",
    ],
    Elevadores: [
      "Marcas",
      "Desinfecção",
      "Sujidade geral",
    ],
    Corrimões: [
      "Desinfecção",
      "Sujidade geral",
    ],
    Garagens: [
      "Óleo",
      "Marcas de pneus",
      "Sujidade pesada",
    ],
  },

  Construções: {
    Pisos: [
      "Resíduos de obra",
      "Cimento",
      "Sujidade pesada",
    ],
    Paredes: [
      "Resíduos de obra",
      "Poeira",
      "Manchas",
    ],
    Vidros: [
      "Resíduos de obra",
      "Manchas",
      "Poeira",
    ],
  },

  "Cozinhas industriais": {
    Equipamentos: [
      "Gordura pesada",
      "Alimentos",
      "Carbonização",
    ],
    Pisos: [
      "Gordura",
      "Sujidade pesada",
      "Alimentos",
    ],
    Paredes: [
      "Gordura",
      "Alimentos",
    ],
    Bancadas: [
      "Gordura",
      "Alimentos",
      "Desinfecção",
    ],
  },

  Escritórios: {
    Pisos: [
      "Sujidade geral",
      "Manutenção diária",
    ],
    Mesas: [
      "Sujidade geral",
      "Desinfecção",
    ],
    Computadores: [
      "Poeira",
      "Sujidade geral",
    ],
    "Objetos compartilhados": [
      "Desinfecção",
    ],
  },
};

type ModalSelectProps = {
  step: number;
  label: string;
  placeholder: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  disabled?: boolean;
};

function ModalSelect({
  step,
  label,
  placeholder,
  value,
  options,
  onChange,
  disabled = false,
}: ModalSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLocaleLowerCase("pt-BR");

    if (!normalizedSearch) {
      return options;
    }

    return options.filter((option) =>
      option
        .toLocaleLowerCase("pt-BR")
        .includes(normalizedSearch),
    );
  }, [options, search]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );
    };
  }, []);

  function handleSelect(option: string) {
    onChange(option);
    setOpen(false);
    setSearch("");
  }

  return (
    <div
      ref={selectRef}
      className={open ? "relative z-30" : "relative"}
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#FFD200] text-xs font-black text-[#0A4A84]">
          {step}
        </span>

        <label className="text-sm font-black text-[#16324A]">
          {label}
        </label>
      </div>

      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            setOpen((current) => !current);
          }
        }}
        className={[
          "flex min-h-14 w-full items-center justify-between gap-4 rounded-xl border px-4 text-left transition",
          disabled
            ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
            : open
              ? "border-[#0A4A84] bg-white text-[#16324A] shadow-[0_8px_24px_rgba(10,74,132,0.12)]"
              : "border-slate-200 bg-white text-[#16324A] hover:border-[#0A4A84]",
        ].join(" ")}
      >
        <span
          className={
            value
              ? "truncate text-sm font-bold"
              : "truncate text-sm font-medium text-slate-400"
          }
        >
          {value || placeholder}
        </span>

        <ChevronDown
          size={18}
          className={[
            "shrink-0 transition-transform",
            open ? "rotate-180 text-[#0A4A84]" : "",
          ].join(" ")}
        />
      </button>

      {open && !disabled && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-[0_18px_50px_rgba(15,23,42,0.18)]">
          {options.length > 6 && (
            <div className="relative mb-2">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                autoFocus
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Buscar opção..."
                className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm font-medium text-[#16324A] outline-none transition focus:border-[#0A4A84] focus:bg-white"
              />
            </div>
          )}

          <div className="max-h-64 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const active = option === value;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={[
                      "flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-bold transition",
                      active
                        ? "bg-[#0A4A84] text-white"
                        : "text-slate-600 hover:bg-[#EAF2F8] hover:text-[#0A4A84]",
                    ].join(" ")}
                  >
                    <span>{option}</span>

                    {active && (
                      <Check
                        size={16}
                        strokeWidth={3}
                        className="text-[#FFD200]"
                      />
                    )}
                  </button>
                );
              })
            ) : (
              <p className="px-4 py-8 text-center text-sm font-medium text-slate-400">
                Nenhuma opção encontrada.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function SolutionFinder({
  onSubmit,
}: SolutionFinderProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [local, setLocal] = useState("");
  const [surface, setSurface] = useState("");
  const [problem, setProblem] = useState("");

  const places = useMemo(
    () =>
      Object.keys(solutionCatalog).sort((a, b) =>
        a.localeCompare(b, "pt-BR"),
      ),
    [],
  );

  const surfaces = useMemo(() => {
    if (!local) {
      return [];
    }

    return Object.keys(
      solutionCatalog[local] ?? {},
    ).sort((a, b) => a.localeCompare(b, "pt-BR"));
  }, [local]);

  const problems = useMemo(() => {
    if (!local || !surface) {
      return [];
    }

    return solutionCatalog[local]?.[surface] ?? [];
  }, [local, surface]);

  const completed = Boolean(
    local && surface && problem,
  );

  useEffect(() => {
    if (!modalOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setModalOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [modalOpen]);

  function handleLocalChange(value: string) {
    setLocal(value);
    setSurface("");
    setProblem("");
  }

  function handleSurfaceChange(value: string) {
    setSurface(value);
    setProblem("");
  }

  function handleSubmit() {
    if (!completed) {
      return;
    }

    const selection: SolutionSelection = {
      local,
      surface,
      problem,
    };

    if (onSubmit) {
      onSubmit(selection);
    } else {
      /*
        Coloque aqui a ação final.

        Exemplo de navegação:

        const params = new URLSearchParams({
          local,
          superficie: surface,
          problema: problem,
        });

        window.location.href =
          `/produtos?${params.toString()}`;
      */

      console.log("Solução selecionada:", selection);
    }

    setModalOpen(false);
  }

  return (
    <>
      <section
        id="solucoes"
        className="relative scroll-mt-28 overflow-hidden bg-[var(--background)]"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#0a4a84_28%,#ffd200_52%,transparent_82%)] opacity-18" />
        <div className="pointer-events-none absolute -left-40 top-1/2 size-[520px] -translate-y-1/2 rounded-full bg-[#0a4a84]/6 blur-3xl" />
        <div className="pointer-events-none absolute right-[16%] top-[12%] size-64 rounded-full bg-[#ffd200]/10 blur-3xl" />

        <div className="absolute inset-x-0 bottom-0 top-[48%] sm:right-[36%] sm:top-[24%] lg:right-[46%] lg:top-0">
          <Image
            src="/images/home/consultora-crie-sua-solucao-v1.webp"
            alt="Consultora Unishop apresentando o criador de soluções"
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 64vw, 54vw"
            className="select-none object-contain object-left-bottom"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(270deg,#f5f5f7_0%,rgba(245,245,247,0.72)_10%,transparent_32%)]" />
        </div>

        <Container>
          <div className="relative z-10 flex min-h-[940px] items-start py-16 sm:min-h-[800px] sm:py-20 lg:min-h-[700px] lg:items-center lg:py-24">
            <div className="max-w-[650px] font-[Manrope] lg:ml-auto lg:w-[48%]">
              <div className="mb-7 flex items-center gap-4">
                <span className="h-px w-12 bg-[#d9a700]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#315b80] sm:text-xs">
                  Sua necessidade, nossa orientação
                </span>
              </div>

              <h2 className="max-w-[650px] text-[clamp(2.75rem,4.25vw,4.9rem)] font-[650] leading-[0.98] tracking-[-0.047em] text-[#092f5b]">
                A solução certa começa pela
                <span className="relative ml-2 inline-block text-[#e0a100] sm:ml-3">
                  sua rotina.
                  <span className="absolute inset-x-0 -bottom-2 h-px bg-[linear-gradient(90deg,#f0b400,transparent)]" />
                </span>
              </h2>

              <p className="mt-8 max-w-[570px] text-base font-[450] leading-7 text-[#4b6680] sm:text-lg sm:leading-8">
                Conte onde você precisa limpar e qual é o desafio. Em poucos passos, nossa curadoria encontra a alternativa mais adequada para você.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold text-[#315b80] sm:text-sm">
                {["Orientação rápida", "Escolha personalizada", "Sem complicação"].map((item, index) => (
                  <span key={item} className="inline-flex items-center gap-2.5">
                    <span className="grid size-5 place-items-center rounded-full bg-[#0a4a84] text-white">
                      <Check size={11} strokeWidth={3} />
                    </span>
                    {item}
                    {index < 2 ? <span className="ml-3 hidden h-4 w-px bg-[#0a4a84]/18 sm:block" /> : null}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="group mt-10 inline-flex min-h-15 items-center justify-center gap-5 rounded-full bg-[#07396e] px-8 text-sm font-bold tracking-[-0.01em] text-white shadow-[0_16px_34px_rgba(7,57,110,0.2)] transition duration-300 hover:-translate-y-1 hover:bg-[#0b4f91] hover:shadow-[0_20px_44px_rgba(7,57,110,0.27)] sm:text-base"
              >
                Criar minha solução
                <span className="grid size-8 place-items-center rounded-full bg-[#ffd200] text-[#07396e] transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight size={17} strokeWidth={2.7} />
                </span>
              </button>

              <p className="mt-4 text-xs font-medium tracking-[0.01em] text-[#607991]">
                Uma recomendação inicial em menos de um minuto.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="solution-modal-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setModalOpen(false);
            }
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/65 p-4 sm:p-6"
        >
          <div className="my-auto w-full max-w-2xl overflow-visible rounded-[26px] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.3)]">
            <header className="relative flex items-center justify-between rounded-t-[26px] bg-[#0A4A84] px-6 py-5 sm:px-8">
              <Image
                src="/images/logotipo.webp"
                alt="Logotipo"
                width={660}
                height={440}
                sizes="125px"
                className="h-auto w-[105px] object-contain sm:w-[125px]"
              />

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Fechar modal"
                className="grid size-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
              >
                <X size={20} />
              </button>
            </header>

            <div className="p-6 sm:p-8">
              <div className="mb-8">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0A4A84]">
                  Busca de soluções
                </p>

                <h3
                  id="solution-modal-title"
                  className="mt-2 text-2xl font-black tracking-[-0.035em] text-[#16324A] sm:text-3xl"
                >
                  O que você precisa limpar?
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                  Preencha as três etapas para
                  encontrarmos a indicação mais adequada
                  para sua necessidade.
                </p>
              </div>

              <div className="grid gap-7">
                <ModalSelect
                  step={1}
                  label="Onde o produto será utilizado?"
                  placeholder="Selecione o local"
                  value={local}
                  options={places}
                  onChange={handleLocalChange}
                />

                <ModalSelect
                  step={2}
                  label="Qual superfície será limpa?"
                  placeholder={
                    local
                      ? "Selecione a superfície"
                      : "Escolha primeiro o local"
                  }
                  value={surface}
                  options={surfaces}
                  onChange={handleSurfaceChange}
                  disabled={!local}
                />

                <ModalSelect
                  step={3}
                  label="Qual é a necessidade ou problema?"
                  placeholder={
                    surface
                      ? "Selecione o problema"
                      : "Escolha primeiro a superfície"
                  }
                  value={problem}
                  options={problems}
                  onChange={setProblem}
                  disabled={!surface}
                />
              </div>

              <div className="mt-8 rounded-2xl border border-[#C9DBEA] bg-[#EAF2F8] p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#0A4A84]">
                  Seleção atual
                </p>

                {completed ? (
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-sm font-black text-[#16324A]">
                    <span>{local}</span>

                    <ArrowRight
                      size={14}
                      className="text-[#7890A4]"
                    />

                    <span>{surface}</span>

                    <ArrowRight
                      size={14}
                      className="text-[#7890A4]"
                    />

                    <span className="text-[#0A4A84]">
                      {problem}
                    </span>
                  </div>
                ) : (
                  <p className="mt-2 text-sm font-medium text-[#607A8F]">
                    Complete as etapas acima para
                    encontrar a solução.
                  </p>
                )}
              </div>

              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="min-h-12 rounded-full border border-slate-200 px-6 text-sm font-black text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  disabled={!completed}
                  onClick={handleSubmit}
                  className={[
                    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-black transition",
                    completed
                      ? "bg-[#FFD200] text-[#0A4A84] hover:bg-[#F2C700]"
                      : "cursor-not-allowed bg-slate-200 text-slate-400",
                  ].join(" ")}
                >
                  Ver solução recomendada
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
