import { CheckCircle2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";
import { contactChannels, headquarters, whatsappUrl } from "@/data/contact";

/**
 * A abertura da página e a lista de canais diretos.
 *
 * São dois componentes porque a ordem muda com a largura da tela: no desktop
 * os dois ficam na coluna da esquerda, ao lado do formulário; no celular, onde
 * não existe "coluna da esquerda", a lista completa de canais desceria na
 * frente do formulário e empurraria ele para longe — então lá ela vai para
 * depois, e a abertura fica só com o atalho do WhatsApp.
 */

const channelIcons = {
  whatsapp: MessageCircle,
  email: Mail,
  "telefone-uberlandia": Phone,
  "telefone-goiania": Phone,
} as const;

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/unishop.oficial/",
    Icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/unishop.oficial/",
    Icon: FaFacebookF,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/showcase/redeunishop/",
    Icon: FaLinkedinIn,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@unishopoficial",
    Icon: FaYoutube,
  },
  { label: "TikTok", href: "https://www.tiktok.com/@redeunishop", Icon: FaTiktok },
] as const;

const promises = [
  "Apresentação completa do modelo",
  "Conversa com a equipe comercial",
  "Investimento e implantação, sem rodeio",
];

export function PartnerIntro() {
  return (
    <div className="rounded-[32px] bg-[var(--brand-blue-950)] p-7 text-white sm:p-9 lg:col-start-1 lg:row-start-1">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--brand-yellow)]">
        Seja um parceiro
      </p>
      <h1 className="mt-5 text-balance text-4xl font-black leading-[1.05] tracking-[-0.05em] sm:text-[44px]">
        Vamos conversar sobre a sua futura unidade.
      </h1>
      <p className="mt-5 text-base leading-7 text-white/70">
        Preencha o formulário ou fale direto pelo canal que você preferir — o
        retorno é o mesmo.
      </p>

      <div className="mt-8 grid gap-4">
        {promises.map((item) => (
          <div key={item} className="flex gap-3 text-sm font-semibold text-white/85">
            <CheckCircle2 className="shrink-0 text-[var(--brand-yellow)]" size={19} />
            {item}
          </div>
        ))}
      </div>

      {/* No celular o bloco de canais só aparece depois do formulário; este
          atalho garante que quem quer resposta imediata não precise rolar. */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white/10 px-6 text-sm font-black text-white ring-1 ring-inset ring-white/20 transition hover:bg-white/16 lg:hidden"
      >
        <MessageCircle size={17} /> Chamar no WhatsApp
      </a>
    </div>
  );
}

export function ContactChannels() {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-950/5 sm:p-8 lg:sticky lg:top-28 lg:col-start-1 lg:row-start-2 lg:self-start">
      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--brand-blue-800)]">
        Canais diretos
      </p>

      <ul className="mt-6 grid gap-2">
        {contactChannels.map((channel) => {
          const Icon = channelIcons[channel.id as keyof typeof channelIcons] ?? Phone;

          return (
            <li key={channel.id}>
              <a
                href={channel.href}
                {...(channel.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group -mx-3 flex gap-4 rounded-2xl px-3 py-3 transition hover:bg-slate-50"
              >
                <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-full bg-[var(--brand-blue-950)]/6 text-[var(--brand-blue-800)] transition group-hover:bg-[var(--brand-yellow)] group-hover:text-[var(--brand-blue-950)]">
                  <Icon size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-black uppercase tracking-[0.14em] text-slate-400">
                    {channel.label}
                  </span>
                  <span className="mt-1 block text-[15px] font-extrabold text-slate-900 [overflow-wrap:anywhere]">
                    {channel.value}
                  </span>
                  <span className="mt-0.5 block text-[12px] leading-5 text-slate-500">
                    {channel.note}
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 flex gap-4 border-t border-slate-100 pt-6">
        <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-full bg-[var(--brand-blue-950)]/6 text-[var(--brand-blue-800)]">
          <MapPin size={18} />
        </span>
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-400">
            {headquarters.label}
          </p>
          <p className="mt-1 text-[15px] font-bold leading-6 text-slate-900">
            {headquarters.street}
            <span className="block font-semibold text-slate-500">
              {headquarters.district} · {headquarters.city} — {headquarters.state}
            </span>
          </p>
          <a
            href="#sede"
            className="mt-2 inline-block text-[13px] font-bold text-[var(--brand-blue-800)] underline underline-offset-4 transition hover:text-[var(--brand-blue-950)]"
          >
            Ver no mapa
          </a>
        </div>
      </div>

      <div className="mt-7 border-t border-slate-100 pt-6">
        <p className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-400">
          Acompanhe a rede
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} da Rede Unishop`}
              title={label}
              className="grid size-10 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:-translate-y-0.5 hover:border-[var(--brand-blue-800)] hover:text-[var(--brand-blue-800)]"
            >
              <Icon size={16} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
