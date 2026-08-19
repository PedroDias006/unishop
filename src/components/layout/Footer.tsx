import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";
import { Container } from "@/components/ui/Container";

const footerNavigation = [
  { label: "Nossa história", href: "/sobre" },
  { label: "Produtos", href: "/produtos" },
  { label: "Faça parte da Unishop", href: "/modelo-de-negocio" },
  { label: "Blog", href: "/blog" },
  { label: "Encontre uma loja", href: "/lojas" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/unishop.oficial/",
    Icon: FaFacebookF,
    className: "bg-[#1877F2] hover:bg-[#2b84f4]",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@unishopoficial",
    Icon: FaYoutube,
    className: "bg-[#FF0000] hover:bg-[#ff2929]",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/unishop.oficial/",
    Icon: FaInstagram,
    className:
      "bg-[linear-gradient(135deg,#833AB4_0%,#E1306C_48%,#FCAF45_100%)] hover:brightness-110",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/showcase/redeunishop/",
    Icon: FaLinkedinIn,
    className: "bg-[#0A66C2] hover:bg-[#1674d0]",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@redeunishop",
    Icon: FaTiktok,
    className: "bg-[#111111] hover:bg-[#292929]",
  },
] as const;

export function Footer() {
  return (
    <footer className="overflow-hidden bg-[linear-gradient(110deg,#04224c_0%,#084880_100%)] font-[Manrope] text-white">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.8fr_1fr] lg:gap-16">
          <div className="max-w-md">
            <Link href="/" aria-label="Página inicial da Rede Unishop" className="inline-flex">
              <Image
                src="/images/logotipo.webp"
                alt="Rede Unishop"
                width={660}
                height={440}
                sizes="200px"
                loading="lazy"
                className="h-auto w-[180px] object-contain sm:w-[200px]"
              />
            </Link>
            <p className="mt-6 text-base leading-7 text-white/70">
              Soluções para limpeza, higiene e cuidado, com orientação especializada e uma rede presente em todo o Brasil.
            </p>
            <Link
              href="/seja-parceiro"
              className="group mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#ffc928] px-6 text-sm font-extrabold text-[#07396e] shadow-[0_12px_28px_rgba(211,156,0,0.2)] transition hover:-translate-y-0.5 hover:bg-[#ffd84d]"
            >
              Seja um parceiro
              <ArrowRight size={17} className="transition group-hover:translate-x-1" />
            </Link>
          </div>

          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#ffd34c]">
              Navegação
            </p>
            <nav className="mt-6 flex flex-col items-start gap-1" aria-label="Navegação do rodapé">
              {footerNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative py-2 text-[15px] font-semibold text-white/72 transition hover:text-white"
                >
                  {item.label}
                  <span className="absolute inset-x-0 bottom-1 h-px origin-left scale-x-0 bg-[#f0b900] transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#ffd34c]">
              Acompanhe a Unishop
            </p>
            <p className="mt-6 max-w-sm text-sm leading-6 text-white/65">
              Novidades, produtos, histórias da rede e conteúdos para o seu negócio.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map(({ label, href, Icon, className }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Acessar ${label} da Rede Unishop`}
                  title={label}
                  className={`grid size-11 place-items-center rounded-full text-white shadow-[0_8px_20px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.24)] ${className}`}
                >
                  <Icon size={19} aria-hidden="true" />
                </a>
              ))}
            </div>

            <Link
              href="/lojas"
              className="group mt-8 inline-flex items-center gap-3 text-sm font-bold text-white/75 transition hover:text-white"
            >
              <span className="grid size-9 place-items-center rounded-full border border-white/15 bg-white/8 transition group-hover:border-white/30 group-hover:bg-white/14">
                <MapPin size={16} />
              </span>
              Encontrar a loja mais próxima
            </Link>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/12 bg-[#031b3c]/30">
        <Container className="flex flex-col gap-3 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Rede Unishop. Todos os direitos reservados.</p>
          <div className="flex gap-5">
            <Link href="/sobre" className="transition hover:text-white/85">
              Nossa história
            </Link>
            <Link href="/blog" className="transition hover:text-white/85">
              Blog
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
