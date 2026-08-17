"use client";

import { ArrowRight, MapPin, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navigation = [
  { label: "Nossa história", href: "/sobre" },
  { label: "Produtos", href: "/produtos" },
  { label: "Faça parte da Unishop", href: "/modelo-de-negocio" },
  { label: "Blog", href: "/blog" },
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
      {/* 660x440 é a proporção real do arquivo: declarar 330x110 reservava
          metade da altura e causava um salto de layout ao carregar. */}
      <Image
        src="/images/logotipo.webp"
        alt="Rede Unishop"
        width={660}
        height={440}
        priority
        sizes="202px"
        className="relative h-auto w-[166px] select-none object-contain transition-transform duration-300 group-hover/logo:-translate-y-0.5 sm:w-[188px] lg:w-[202px]"
      />
      <Image
        src="/images/logotipo.webp"
        alt=""
        aria-hidden="true"
        width={660}
        height={440}
        sizes="202px"
        className="logo-spotlight-image pointer-events-none absolute inset-0 h-full w-full select-none object-contain transition-transform duration-300 group-hover/logo:-translate-y-0.5"
      />
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // A navbar tem apenas dois formatos (topo e flutuante). As medidas de cada
    // um vivem em CSS; aqui só marcamos qual está ativo. O listener é passivo,
    // não lê layout e só escreve no DOM quando o estado realmente muda.
    const root = document.documentElement;
    let scrolled: boolean | null = null;

    function sync() {
      const next = window.scrollY > 8;
      if (next === scrolled) return;
      scrolled = next;
      root.dataset.navScrolled = String(next);
    }

    sync();
    window.addEventListener("scroll", sync, { passive: true });

    return () => {
      window.removeEventListener("scroll", sync);
      delete root.dataset.navScrolled;
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className="nav-shell relative mx-auto flex items-center justify-between overflow-visible border border-x-0 border-t-0 border-[#8ec8ff]/20 bg-[linear-gradient(110deg,rgba(4,34,76,0.9),rgba(8,72,128,0.84))] font-[Manrope] text-white backdrop-saturate-150 sm:backdrop-blur-2xl"
        >
          <BrandLogo />

          <nav
            className="hidden items-center gap-0.5 xl:flex"
            aria-label="Navegação principal"
          >
            {navigation.map((item) => {
              const active = isActive(item.href);

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

          <div className="hidden items-center xl:flex">
            <Link
              href="/seja-parceiro"
              className="group/partner relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-full bg-[#ffc928] px-5 text-[14px] font-extrabold tracking-[-0.01em] text-[#07396e] shadow-[0_10px_25px_rgba(211,156,0,0.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ffd84d] hover:shadow-[0_14px_32px_rgba(211,156,0,0.28)]"
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
