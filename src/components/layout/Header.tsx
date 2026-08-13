"use client";

import {
  ArrowRight,
  ChevronDown,
  MapPin,
  Menu,
  Search,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navigation = [
  { label: "A Unishop", href: "/sobre" },
  {
    label: "Produtos",
    href: "/produtos",
    children: [
      { label: "Limpeza doméstica", href: "/produtos#domestica" },
      { label: "Limpeza profissional", href: "/produtos#profissional" },
      { label: "Linha automotiva", href: "/produtos#automotiva" },
      { label: "Cuidados com roupas", href: "/produtos#roupas" },
    ],
  },
  { label: "Modelo de negócio", href: "/modelo-de-negocio" },
  { label: "Encontre uma loja", href: "/lojas" },
  { label: "Conteúdos", href: "/conteudos" },
];

function BrandLogo() {
  return (
    <Link
      href="/"
      aria-label="Página inicial da Rede Unishop"
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty(
          "--logo-x",
          `${event.clientX - bounds.left}px`,
        );
        event.currentTarget.style.setProperty(
          "--logo-y",
          `${event.clientY - bounds.top}px`,
        );
      }}
      className="logo-spotlight group/logo relative flex shrink-0 items-center"
    >
      <Image
        src="/images/logotipo.webp"
        alt="Rede Unishop"
        width={330}
        height={110}
        priority
        className="relative h-auto w-[166px] select-none object-contain transition-transform duration-300 group-hover/logo:-translate-y-0.5 sm:w-[188px] lg:w-[202px]"
      />
      <Image
        src="/images/logotipo.webp"
        alt=""
        aria-hidden="true"
        width={330}
        height={110}
        className="logo-spotlight-image pointer-events-none absolute inset-0 h-full w-full select-none object-contain transition-transform duration-300 group-hover/logo:-translate-y-0.5"
      />
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const searchPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const shell = shellRef.current;
    const searchPanel = searchPanelRef.current;

    if (!header || !shell || !searchPanel) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrame = 0;
    let targetProgress = window.scrollY > 8 ? 1 : 0;
    let currentProgress = targetProgress;

    function paint(progress: number) {
      // clientWidth desconta a barra de rolagem; window.innerWidth fazia a
      // faixa ultrapassar alguns pixels no lado direito em navegadores desktop.
      const viewportWidth = document.documentElement.clientWidth;
      const mobile = viewportWidth < 640;
      const desktop = viewportWidth >= 1024;
      const endGutter = mobile ? 12 : 20;
      const endTop = 0;
      const startHeight = mobile ? 88 : 96;
      const endHeight = mobile ? 64 : desktop ? 80 : 72;
      const startPadding = mobile ? 20 : desktop ? 56 : 32;
      const endPadding = mobile ? 16 : desktop ? 32 : 24;
      const endWidth = Math.min(
        viewportWidth - endGutter * 2,
        desktop ? 1540 : 1280,
      );
      const width = viewportWidth + (endWidth - viewportWidth) * progress;
      const height = startHeight + (endHeight - startHeight) * progress;
      const padding = startPadding + (endPadding - startPadding) * progress;
      const top = endTop * progress;
      const radius = 20 * progress;

      header!.style.paddingTop = `${top}px`;
      shell!.style.width = `${width}px`;
      shell!.style.height = `${height}px`;
      shell!.style.paddingInline = `${padding}px`;
      shell!.style.borderRadius = `${radius}px`;
      shell!.style.boxShadow = `0 ${10 + progress * 8}px ${40 + progress * 20}px rgba(0, 18, 52, ${0.18 + progress * 0.08})`;
      searchPanel!.style.top = `${top + height + 12}px`;
    }

    function animate() {
      currentProgress = reducedMotion
        ? targetProgress
        : currentProgress + (targetProgress - currentProgress) * 0.16;

      if (Math.abs(targetProgress - currentProgress) < 0.001) {
        currentProgress = targetProgress;
      }

      paint(currentProgress);

      if (currentProgress !== targetProgress) {
        animationFrame = window.requestAnimationFrame(animate);
      } else {
        animationFrame = 0;
      }
    }

    function requestSync() {
      // A navbar possui somente dois tamanhos. Depois que a página começa a
      // rolar, ela anima até o formato flutuante e não continua encolhendo.
      targetProgress = window.scrollY > 8 ? 1 : 0;

      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    }

    function handleResize() {
      currentProgress = targetProgress;
      paint(currentProgress);
    }

    paint(currentProgress);
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileProductsOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  function isActive(href: string) {
    const route = href.split("#")[0];
    return route === "/" ? pathname === "/" : pathname.startsWith(route);
  }

  return (
    <>
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
        <div
          ref={shellRef}
          className="relative mx-auto flex h-[88px] w-full items-center justify-between overflow-visible rounded-none border border-x-0 border-t-0 border-[#8ec8ff]/20 bg-[linear-gradient(110deg,rgba(4,34,76,0.9),rgba(8,72,128,0.84))] px-5 font-[Manrope] text-white shadow-[0_10px_40px_rgba(0,18,52,0.18)] backdrop-blur-2xl backdrop-saturate-150 [will-change:width,height,border-radius,box-shadow] sm:h-[96px] sm:px-8 lg:px-10"
        >
          <BrandLogo />

          <nav
            className="hidden items-center gap-0.5 xl:flex"
            aria-label="Navegação principal"
          >
            {navigation.map((item) => {
              const active = isActive(item.href);

              if (item.children) {
                return (
                  <div key={item.label} className="group/products relative">
                    <Link
                      href={item.href}
                      className={`relative flex h-11 items-center gap-1.5 rounded-full px-3 text-[14px] font-semibold tracking-[-0.01em] transition-colors duration-200 2xl:px-3.5 2xl:text-[15px] ${
                        active
                          ? "text-[#ffd34c]"
                          : "text-white/78 hover:text-white"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        strokeWidth={2.5}
                        className="transition-transform duration-300 group-hover/products:rotate-180 group-focus-within/products:rotate-180"
                      />
                      <span
                        className={`absolute inset-x-4 bottom-0 h-0.5 origin-center rounded-full bg-[#f0b900] transition-transform duration-300 ${
                          active
                            ? "scale-x-100"
                            : "scale-x-0 group-hover/products:scale-x-100 group-focus-within/products:scale-x-100"
                        }`}
                      />
                    </Link>

                    <div className="pointer-events-none invisible absolute left-1/2 top-full w-[390px] -translate-x-1/2 translate-y-3 pt-4 opacity-0 transition-all duration-300 group-hover/products:pointer-events-auto group-hover/products:visible group-hover/products:translate-y-0 group-hover/products:opacity-100 group-focus-within/products:pointer-events-auto group-focus-within/products:visible group-focus-within/products:translate-y-0 group-focus-within/products:opacity-100">
                      <div className="rounded-[24px] border border-white/80 bg-[rgba(248,250,252,0.96)] p-2.5 shadow-[0_28px_80px_rgba(4,35,75,0.22)] backdrop-blur-2xl">
                        <div className="px-4 pb-3 pt-3">
                          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#ba8700]">
                            Produtos Unishop
                          </p>
                          <p className="mt-1.5 text-sm font-semibold text-[#23486f]/60">
                            A solução certa para cada ambiente.
                          </p>
                        </div>

                        <div className="space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="group/item flex min-h-12 items-center justify-between rounded-[15px] px-4 text-sm font-bold text-[#173c67] transition duration-200 hover:bg-[#e9f1fa] hover:text-[#0751a2]"
                            >
                              {child.label}
                              <ArrowRight
                                size={15}
                                className="text-[#d8a000] transition-transform duration-200 group-hover/item:translate-x-1"
                              />
                            </Link>
                          ))}
                        </div>

                        <Link
                          href="/produtos"
                          className="group/all mt-2 flex min-h-12 items-center justify-between rounded-[15px] bg-[#083b79] px-4 text-sm font-black text-white transition duration-200 hover:bg-[#0b4d98]"
                        >
                          Ver todos os produtos
                          <ArrowRight
                            size={16}
                            className="text-[#ffc928] transition-transform duration-200 group-hover/all:translate-x-1"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`group/link relative flex h-11 items-center rounded-full px-3 text-[14px] font-semibold tracking-[-0.01em] transition-colors duration-200 2xl:px-3.5 2xl:text-[15px] ${
                    active
                      ? "text-[#ffd34c]"
                      : "text-white/78 hover:text-white"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-4 bottom-0 h-0.5 origin-center rounded-full bg-[#f0b900] transition-transform duration-300 ${
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover/link:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-1.5 xl:flex">
            <button
              type="button"
              onClick={() => setSearchOpen((current) => !current)}
              className={`grid size-10 place-items-center rounded-full border transition duration-300 ${
                searchOpen
                  ? "border-[#ffc928] bg-[#ffc928] text-[#07396e]"
                  : "border-white/15 bg-white/8 text-white/82 hover:border-white/30 hover:bg-white/16 hover:text-white"
              }`}
              aria-label={searchOpen ? "Fechar pesquisa" : "Abrir pesquisa"}
              aria-expanded={searchOpen}
            >
              {searchOpen ? <X size={17} /> : <Search size={17} />}
            </button>

            <Link
              href="/lojas"
              className="group/location grid size-10 place-items-center rounded-full border border-white/15 bg-white/8 text-white/82 transition duration-300 hover:border-white/30 hover:bg-white/16 hover:text-white"
              aria-label="Encontrar uma loja"
            >
              <MapPin
                size={17}
                className="transition-transform duration-300 group-hover/location:-translate-y-0.5"
              />
            </Link>

            <Link
              href="/seja-parceiro"
              className="group/partner relative ml-1 inline-flex min-h-11 items-center justify-center overflow-hidden rounded-full bg-[#ffc928] px-5 text-[14px] font-extrabold tracking-[-0.01em] text-[#07396e] shadow-[0_10px_25px_rgba(211,156,0,0.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ffd84d] hover:shadow-[0_14px_32px_rgba(211,156,0,0.28)]"
            >
              <span className="absolute -left-10 top-0 h-full w-7 -skew-x-12 bg-white/55 blur-sm transition-transform duration-700 group-hover/partner:translate-x-[230px]" />
              <span className="relative flex items-center gap-2">
                Seja um parceiro
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover/partner:translate-x-1"
                />
              </span>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((current) => !current)}
            className="relative z-10 grid size-10 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition hover:border-white/30 hover:bg-white/18 xl:hidden"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <div
        ref={searchPanelRef}
        className={`fixed inset-x-3 top-[100px] z-40 mx-auto max-w-[1000px] rounded-[24px] border border-white/75 bg-[rgba(248,250,252,0.94)] text-[#0a376a] shadow-[0_28px_80px_rgba(0,30,70,0.22)] backdrop-blur-2xl transition-[opacity,transform,visibility] duration-300 sm:inset-x-5 sm:top-[108px] ${
          searchOpen
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-3 opacity-0"
        }`}
      >
        <div className="p-3 sm:p-4">
          <form action="/produtos" className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b98700]"
            />
            <input
              type="search"
              name="busca"
              placeholder="Busque por produtos ou soluções"
              autoComplete="off"
              className="h-14 w-full rounded-[17px] border border-[#123f6d]/10 bg-white/75 pl-12 pr-24 text-sm font-semibold text-[#0b3768] outline-none transition placeholder:text-[#23486f]/45 focus:border-[#d6a100]/60 focus:bg-white sm:pr-32"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 flex h-11 items-center rounded-[13px] bg-[#083b79] px-4 text-xs font-black text-white transition hover:bg-[#0b4d98] sm:px-6"
            >
              Buscar
            </button>
          </form>
        </div>
      </div>

      <button
        type="button"
        aria-label="Fechar pesquisa"
        onClick={() => setSearchOpen(false)}
        className={`fixed inset-0 z-30 bg-[#06284f]/28 backdrop-blur-[3px] transition-opacity duration-300 ${
          searchOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <div
        className={`fixed inset-0 z-40 overflow-y-auto bg-[rgba(239,244,249,0.97)] text-[#0a376a] backdrop-blur-2xl transition-all duration-400 xl:hidden ${
          mobileMenuOpen
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        <div className="pointer-events-none absolute -right-24 top-16 size-80 rounded-full bg-[#b8d9f5]/55 blur-3xl" />
        <div className="relative min-h-full px-5 pb-10 pt-[110px] sm:px-8 sm:pt-[126px]">
          <div className="mx-auto flex min-h-[calc(100vh-150px)] max-w-2xl flex-col">
            <p className="mb-5 text-[10px] font-black uppercase tracking-[0.25em] text-[#a87900]">
              Navegação
            </p>

            <nav className="border-t border-[#0a376a]/12">
              {navigation.map((item, index) => {
                const active = isActive(item.href);

                if (item.children) {
                  return (
                    <div key={item.label} className="border-b border-[#0a376a]/12">
                      <button
                        type="button"
                        onClick={() => setMobileProductsOpen((current) => !current)}
                        className={`flex w-full items-center justify-between py-5 text-left text-xl font-black ${
                          active ? "text-[#0751a2]" : "text-[#0a376a]"
                        }`}
                      >
                        <span className="flex items-center gap-4">
                          <span className="text-[10px] text-[#0a376a]/35">
                            0{index + 1}
                          </span>
                          {item.label}
                        </span>
                        <ChevronDown
                          size={20}
                          className={`transition-transform duration-300 ${
                            mobileProductsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <div
                        className={`grid overflow-hidden transition-all duration-300 ${
                          mobileProductsOpen
                            ? "grid-rows-[1fr] pb-5"
                            : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="min-h-0">
                          <div className="ml-9 space-y-1 border-l-2 border-[#e9b500] pl-5">
                            <Link
                              href="/produtos"
                              className="block py-2 text-sm font-black text-[#0751a2]"
                            >
                              Todos os produtos
                            </Link>
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                className="block py-2 text-sm font-bold text-[#173c67]/65 transition hover:text-[#0751a2]"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-4 border-b border-[#0a376a]/12 py-5 text-xl font-black ${
                      active ? "text-[#0751a2]" : "text-[#0a376a]"
                    }`}
                  >
                    <span className="text-[10px] text-[#0a376a]/35">
                      0{index + 1}
                    </span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Link
                href="/lojas"
                className="flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#0a376a]/12 bg-white/55 px-6 text-sm font-black"
              >
                <MapPin size={17} />
                Encontrar uma loja
              </Link>
              <Link
                href="/seja-parceiro"
                className="flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#ffc928] px-6 text-sm font-black text-[#07396e] shadow-[0_12px_28px_rgba(189,138,0,0.2)]"
              >
                Seja um parceiro
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
