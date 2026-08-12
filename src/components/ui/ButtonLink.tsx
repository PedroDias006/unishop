import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
  className?: string;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonLinkProps) {
  const variants = {
    primary:
      "bg-[var(--brand-yellow)] text-[var(--brand-blue-950)] hover:-translate-y-0.5 hover:bg-[#ffd333]",
    secondary:
      "border border-white/25 bg-white/10 text-white hover:-translate-y-0.5 hover:bg-white/16",
    light:
      "border border-slate-200 bg-white text-[var(--brand-blue-900)] hover:-translate-y-0.5 hover:border-[var(--brand-blue-700)]",
  };

  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-bold transition ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
