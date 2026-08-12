"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Container } from "@/components/ui/Container";

export default function SejaParceiroPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <section className="bg-slate-50 py-16 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="rounded-[32px] bg-[var(--brand-blue-950)] p-7 text-white sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--brand-yellow)]">Seja um parceiro</p>
          <h1 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-5xl">Vamos conversar sobre sua futura unidade.</h1>
          <p className="mt-5 text-base leading-7 text-white/68">Formulário demonstrativo. Na etapa final, conectaremos os dados ao e-mail, CRM ou sistema escolhido pela empresa.</p>
          <div className="mt-8 grid gap-4">
            {["Receba uma apresentação do modelo", "Converse com a equipe comercial", "Entenda investimento e implantação"].map((item) => (
              <div key={item} className="flex gap-3 text-sm font-semibold text-white/85"><CheckCircle2 className="shrink-0 text-[var(--brand-yellow)]" size={19} /> {item}</div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5 sm:p-10">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-slate-700">Nome<input required name="name" className="min-h-12 rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-[var(--brand-blue-700)]" placeholder="Seu nome" /></label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">Telefone<input required name="phone" className="min-h-12 rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-[var(--brand-blue-700)]" placeholder="(00) 00000-0000" /></label>
            <label className="grid gap-2 text-sm font-bold text-slate-700 sm:col-span-2">E-mail<input required type="email" name="email" className="min-h-12 rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-[var(--brand-blue-700)]" placeholder="voce@exemplo.com" /></label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">Cidade<input required name="city" className="min-h-12 rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-[var(--brand-blue-700)]" placeholder="Sua cidade" /></label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">Estado<select required name="state" defaultValue="" className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 outline-none transition focus:border-[var(--brand-blue-700)]"><option value="" disabled>Selecione</option><option>MG</option><option>SP</option><option>RJ</option><option>PR</option><option>Outro</option></select></label>
            <label className="grid gap-2 text-sm font-bold text-slate-700 sm:col-span-2">Mensagem<textarea name="message" rows={5} className="rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-[var(--brand-blue-700)]" placeholder="Conte um pouco sobre seu interesse." /></label>
          </div>
          <button type="submit" className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--brand-yellow)] px-6 text-sm font-black text-[var(--brand-blue-950)] transition hover:-translate-y-0.5 sm:w-auto"><Send size={17} /> Enviar interesse</button>
          {sent && <p className="mt-5 rounded-2xl bg-emerald-50 p-4 text-sm font-bold text-emerald-700">Demonstração concluída. Nenhum dado foi enviado porque o backend ainda não foi conectado.</p>}
        </form>
      </Container>
    </section>
  );
}
