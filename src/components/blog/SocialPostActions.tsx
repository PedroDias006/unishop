"use client";

import { Bookmark, Check, Heart, Share2 } from "lucide-react";
import { useState } from "react";

type SocialPostActionsProps = {
  titulo: string;
  url: string;
};

export function SocialPostActions({ titulo, url }: SocialPostActionsProps) {
  const [curtido, setCurtido] = useState(false);
  const [salvo, setSalvo] = useState(false);
  const [retorno, setRetorno] = useState("Compartilhar");

  async function compartilhar() {
    const endereco = new URL(url, window.location.origin).href;

    try {
      if (navigator.share) {
        await navigator.share({ title: titulo, url: endereco });
        setRetorno("Compartilhado");
      } else {
        await navigator.clipboard.writeText(endereco);
        setRetorno("Link copiado");
      }

      window.setTimeout(() => setRetorno("Compartilhar"), 2400);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setRetorno("Não foi possível");
      window.setTimeout(() => setRetorno("Compartilhar"), 2400);
    }
  }

  return (
    <div className="mt-5 flex flex-wrap items-center gap-1 border-t border-slate-100 pt-4">
      <button
        type="button"
        aria-pressed={curtido}
        onClick={() => setCurtido((valor) => !valor)}
        className={`inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-xs font-extrabold transition ${
          curtido
            ? "bg-rose-50 text-rose-600"
            : "text-slate-500 hover:bg-slate-100 hover:text-[var(--brand-blue-900)]"
        }`}
      >
        <Heart
          size={18}
          aria-hidden="true"
          className={curtido ? "fill-current" : ""}
        />
        {curtido ? "Curtido" : "Curtir"}
      </button>

      <button
        type="button"
        aria-pressed={salvo}
        onClick={() => setSalvo((valor) => !valor)}
        className={`inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-xs font-extrabold transition ${
          salvo
            ? "bg-[#fff8d9] text-[#9a6d00]"
            : "text-slate-500 hover:bg-slate-100 hover:text-[var(--brand-blue-900)]"
        }`}
      >
        <Bookmark
          size={18}
          aria-hidden="true"
          className={salvo ? "fill-current" : ""}
        />
        {salvo ? "Salvo" : "Salvar"}
      </button>

      <button
        type="button"
        onClick={compartilhar}
        className="ml-auto inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-xs font-extrabold text-slate-500 transition hover:bg-slate-100 hover:text-[var(--brand-blue-900)]"
      >
        {retorno === "Compartilhado" || retorno === "Link copiado" ? (
          <Check size={18} aria-hidden="true" />
        ) : (
          <Share2 size={18} aria-hidden="true" />
        )}
        {retorno}
      </button>
    </div>
  );
}
