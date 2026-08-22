import type { Metadata, Viewport } from "next";
import { cmsAtivo } from "@/sanity/env";
import { Studio } from "./Studio";

/**
 * O painel de conteúdo, dentro do próprio site.
 *
 * A rota é `catch-all` porque o Studio faz o próprio roteamento interno
 * (`/studio/structure/post;xyz`, `/studio/vision`, …) e precisa receber
 * qualquer caminho abaixo de `/studio`.
 *
 * Sem `NEXT_PUBLIC_SANITY_PROJECT_ID` a rota não tenta abrir o painel: mostra o
 * que falta configurar. Painel quebrando com erro de credencial não ajuda
 * ninguém a descobrir o que fazer.
 */

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Painel de conteúdo",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-content",
};

export default function StudioPage() {
  if (!cmsAtivo) return <ComoConfigurar />;

  return <Studio />;
}

function ComoConfigurar() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24">
      <h1 className="text-3xl font-black tracking-[-0.04em] text-[var(--brand-blue-950)]">
        O painel ainda não está conectado.
      </h1>
      <p className="mt-5 text-base leading-7 text-slate-600">
        Falta apontar este site para um projeto do Sanity. São três passos:
      </p>

      <ol className="mt-8 grid gap-5 text-[15px] leading-7 text-slate-600">
        <li>
          <strong className="text-slate-900">1.</strong> Crie um projeto em{" "}
          <a
            href="https://www.sanity.io/manage"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[var(--brand-blue-800)] underline underline-offset-4"
          >
            sanity.io/manage
          </a>{" "}
          e copie o <em>Project ID</em>.
        </li>
        <li>
          <strong className="text-slate-900">2.</strong> Em{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px]">.env.local</code>,
          preencha{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px]">
            NEXT_PUBLIC_SANITY_PROJECT_ID
          </code>{" "}
          e{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px]">
            NEXT_PUBLIC_SANITY_DATASET
          </code>
          .
        </li>
        <li>
          <strong className="text-slate-900">3.</strong> No painel do Sanity, libere{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px]">
            http://localhost:3000
          </code>{" "}
          e o domínio de produção em <em>API &gt; CORS origins</em>, com credenciais
          permitidas.
        </li>
      </ol>

      <p className="mt-8 rounded-2xl bg-slate-50 p-5 text-sm leading-6 text-slate-500">
        Enquanto isso, o site funciona normalmente: blog, números, depoimentos,
        pilares e FAQ continuam vindo do conteúdo versionado no repositório.
      </p>
    </div>
  );
}
