import Link from "next/link";
import { Camera, MapPin, MessageCircle, Network } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { navigation } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="bg-[#061a3a] text-white">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="max-w-md">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-white text-sm font-black text-[var(--brand-blue-950)]">
              U
            </span>
            <strong className="text-xl font-black tracking-[-0.05em]">
              UNI<span className="text-[var(--brand-yellow)]">SHOP</span>
            </strong>
          </div>
          <p className="mt-6 text-sm leading-7 text-white/65">
            Estrutura inicial demonstrativa para o novo site institucional da Rede Unishop.
            Substitua os conteúdos provisórios pelos materiais aprovados antes da publicação.
          </p>
          <div className="mt-6 flex gap-3">
            {[Camera, Network, MessageCircle].map((Icon, index) => (
              <a
                key={index}
                href="#"
                aria-label="Rede social"
                className="grid size-10 place-items-center rounded-full border border-white/15 text-white/75 transition hover:border-white/40 hover:text-white"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.18em] text-[var(--brand-yellow)]">
            Navegação
          </h3>
          <div className="mt-5 flex flex-col gap-3">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-white/65 hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.18em] text-[var(--brand-yellow)]">
            Contato
          </h3>
          <p className="mt-5 flex gap-3 text-sm leading-6 text-white/65">
            <MapPin className="mt-0.5 shrink-0" size={18} />
            Endereço oficial da empresa será inserido aqui.
          </p>
          <Link
            href="/seja-parceiro"
            className="mt-6 inline-flex min-h-11 items-center rounded-full bg-[var(--brand-yellow)] px-5 text-sm font-black text-[var(--brand-blue-950)]"
          >
            Falar com a equipe
          </Link>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Rede Unishop. Conteúdo demonstrativo.</p>
          <p>Desenvolvido em Next.js.</p>
        </Container>
      </div>
    </footer>
  );
}
