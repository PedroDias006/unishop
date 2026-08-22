"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Send,
} from "lucide-react";
import { ReactNode, useEffect, useId, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  brazilianStates,
  investmentOptions,
  occupationOptions,
  timelineOptions,
  whatsappUrl,
} from "@/data/contact";
import { eventoInicioDeFormulario, eventoLeadGerado } from "@/lib/analytics";
import { apenasDigitos, leadSchema, valorDoLead, type Lead } from "@/lib/leads/schema";
import { enviarLead } from "./actions";

/**
 * O formulário de parceria.
 *
 * A régua é a do visitante, não a do CRM: obrigatório é só o que a equipe
 * comercial precisa para retornar a conversa (nome, telefone, e-mail, cidade,
 * estado e o aceite de contato). Perfil, capital e prazo qualificam a conversa,
 * mas são opcionais — quem não quer responder envia mesmo assim.
 *
 * A validação vem do mesmo schema Zod que a Server Action usa no servidor, o
 * que evita o clássico "passa no navegador e explode no back-end". Aqui ela
 * roda no blur e some assim que o campo fica válido.
 *
 * O que acelera o preenchimento:
 * - telefone, CEP e CNPJ se formatam sozinhos enquanto a pessoa digita;
 * - o CEP busca cidade e estado no ViaCEP e preenche os dois campos;
 * - `autoComplete` em todos os campos, para o navegador completar de uma vez.
 */

/** A ocupação que faz o campo de CNPJ aparecer. */
const OCUPACAO_COM_EMPRESA = "Já tenho um negócio próprio";

const valoresIniciais: Lead = {
  name: "",
  email: "",
  phone: "",
  postalCode: "",
  city: "",
  state: "",
  occupation: "",
  investment: "",
  timeline: "",
  cnpj: "",
  message: "",
  consent: false,
  website: "",
  origem: "",
};

/** Campos sem os quais a equipe não consegue retornar o contato. */
const camposObrigatorios = ["name", "email", "phone", "city", "state"] as const;

/** (34) 3292-6100 para fixo, (34) 99136-1508 para celular. */
function mascaraTelefone(valor: string) {
  const digitos = apenasDigitos(valor).slice(0, 11);

  if (digitos.length <= 2) return digitos;
  if (digitos.length <= 6) return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
  if (digitos.length <= 10) {
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`;
  }

  return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
}

function mascaraCep(valor: string) {
  const digitos = apenasDigitos(valor).slice(0, 8);

  return digitos.length <= 5 ? digitos : `${digitos.slice(0, 5)}-${digitos.slice(5)}`;
}

function mascaraCnpj(valor: string) {
  const d = apenasDigitos(valor).slice(0, 14);

  if (d.length <= 2) return d;
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;

  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
}

const baseCampo =
  "min-h-12 w-full min-w-0 rounded-2xl border bg-white px-4 text-[15px] text-slate-900 outline-none transition placeholder:text-slate-400";

function classeCampo(temErro: boolean, extra = "") {
  const estado = temErro
    ? "border-rose-300 bg-rose-50/40 focus:border-rose-500"
    : "border-slate-200 focus:border-[var(--brand-blue-700)]";

  return `${baseCampo} ${estado} ${extra}`;
}

export function PartnerForm() {
  const idBase = useId();
  const [cepStatus, setCepStatus] = useState<"idle" | "loading" | "found" | "failed">(
    "idle",
  );
  const [enviado, setEnviado] = useState<Lead | null>(null);
  const [erroGeral, setErroGeral] = useState("");
  const consultaCep = useRef<AbortController | null>(null);
  const jaComecou = useRef(false);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Lead>({
    resolver: zodResolver(leadSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: valoresIniciais,
  });

  // `useWatch` no lugar do `watch()` do formulário: só estes campos redesenham
  // a barra de progresso e o campo condicional de CNPJ, e não o formulário
  // inteiro a cada tecla.
  const [name, email, phone, city, state, consent, occupation] = useWatch({
    control,
    name: ["name", "email", "phone", "city", "state", "consent", "occupation"],
  });

  const obrigatoriosPreenchidos = [name, email, phone, city, state].filter(
    (valor) => String(valor ?? "").trim() !== "",
  ).length;
  const progresso = Math.round(
    ((obrigatoriosPreenchidos + (consent ? 1 : 0)) / (camposObrigatorios.length + 1)) *
      100,
  );

  /**
   * De onde veio quem está preenchendo. Sai daqui direto para o CRM, que é
   * onde a agência de mídia vai conferir qual campanha traz parceiro de
   * verdade — e não só formulário preenchido.
   */
  useEffect(() => {
    const parametros = new URLSearchParams(window.location.search);
    const utms = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]
      .map((chave) => {
        const valor = parametros.get(chave);
        return valor ? `${chave}=${valor}` : null;
      })
      .filter(Boolean);

    const origem = [
      window.location.pathname,
      ...utms,
      document.referrer ? `referrer=${document.referrer}` : null,
    ]
      .filter(Boolean)
      .join(" | ")
      .slice(0, 300);

    setValue("origem", origem);
  }, [setValue]);

  function marcarInicio() {
    if (jaComecou.current) return;
    jaComecou.current = true;
    eventoInicioDeFormulario("seja-parceiro");
  }

  /**
   * O ViaCEP é público e não pede chave. Se falhar — offline, CEP novo, serviço
   * fora do ar — o formulário não trava: cidade e estado continuam editáveis na
   * mão e nada aparece como se fosse erro do visitante.
   */
  async function buscarCep(digitos: string) {
    consultaCep.current?.abort();

    const controlador = new AbortController();
    consultaCep.current = controlador;
    setCepStatus("loading");

    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${digitos}/json/`, {
        signal: controlador.signal,
      });
      const dados: { localidade?: string; uf?: string; erro?: boolean | string } =
        await resposta.json();

      if (dados.erro || !dados.localidade || !dados.uf) {
        setCepStatus("failed");
        return;
      }

      setCepStatus("found");
      setValue("city", dados.localidade, { shouldValidate: true });
      setValue("state", dados.uf, { shouldValidate: true });
    } catch (erro: unknown) {
      if (erro instanceof DOMException && erro.name === "AbortError") return;
      setCepStatus("failed");
    }
  }

  // Os campos com máscara ficam registrados aqui e o `onChange` deles é escrito
  // direto no JSX: a máscara precisa reescrever o valor ANTES de o React Hook
  // Form ler o evento, e o formato só existe na tela — o que vai para o
  // servidor é sempre normalizado no schema.
  const campoTelefone = register("phone");
  const campoCep = register("postalCode");
  const campoCnpj = register("cnpj");

  const aoEnviar = handleSubmit(async (dados) => {
    setErroGeral("");

    const resposta = await enviarLead(dados);

    if (!resposta.ok) {
      if (resposta.campos) {
        for (const [campo, mensagem] of Object.entries(resposta.campos)) {
          setError(campo as keyof Lead, { message: mensagem });
        }
      }
      setErroGeral(resposta.erro);
      return;
    }

    // A conversão só é contada depois que o servidor confirmou: assim o Google
    // Ads otimiza por lead que realmente entrou na esteira comercial.
    eventoLeadGerado({
      valor: valorDoLead(dados.investment),
      cidade: dados.city,
      estado: dados.state,
      prazo: dados.timeline,
    });

    setEnviado(dados);
  });

  if (enviado) {
    return (
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-950/5 sm:p-12">
        <span className="grid size-14 place-items-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 size={28} />
        </span>
        <h2 className="mt-6 text-balance text-3xl font-black tracking-[-0.04em] text-slate-950">
          Recebemos o seu interesse, {enviado.name.trim().split(" ")[0]}.
        </h2>
        <p className="mt-4 max-w-lg text-base leading-7 text-slate-600">
          A equipe comercial retorna pelo telefone {enviado.phone} ou pelo e-mail{" "}
          {enviado.email} em até um dia útil. Confira também a caixa de entrada:
          acabamos de mandar uma confirmação.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--brand-blue-900)] px-6 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[var(--brand-blue-950)]"
          >
            <MessageCircle size={17} /> Falar agora no WhatsApp
          </a>
          <button
            type="button"
            onClick={() => {
              reset(valoresIniciais);
              setEnviado(null);
              setCepStatus("idle");
            }}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-200 px-6 text-sm font-bold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          >
            Enviar outro contato
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={aoEnviar}
      noValidate
      id="formulario"
      onChange={marcarInicio}
      className="scroll-mt-28 rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5 sm:p-9 lg:p-10"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-[-0.04em] text-slate-950">
            Fale com a equipe comercial
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Leva menos de dois minutos. O retorno acontece em até um dia útil.
          </p>
        </div>

        <div className="w-full sm:w-40">
          <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
            <span>Preenchido</span>
            <span className="text-[var(--brand-blue-800)]">{progresso}%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-[var(--brand-yellow)] transition-[width] duration-500"
              style={{ width: `${progresso}%` }}
            />
          </div>
        </div>
      </div>

      {/* Isca para robô: fica fora da tela e fora da ordem de tabulação, então
          pessoa nenhuma esbarra nele. Se vier preenchido, o envio é descartado
          no servidor. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${idBase}-website`}>Não preencha este campo</label>
        <input
          id={`${idBase}-website`}
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <input type="hidden" {...register("origem")} />

      <fieldset className="mt-9 border-0 p-0">
        <legend className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--brand-blue-800)]">
          1. Quem é você
        </legend>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Campo id={`${idBase}-name`} rotulo="Nome completo" erro={errors.name?.message}>
            <input
              id={`${idBase}-name`}
              autoComplete="name"
              placeholder="Como podemos te chamar"
              aria-invalid={Boolean(errors.name)}
              className={classeCampo(Boolean(errors.name))}
              {...register("name")}
            />
          </Campo>

          <Campo
            id={`${idBase}-phone`}
            rotulo="Telefone / WhatsApp"
            dica="com DDD"
            erro={errors.phone?.message}
          >
            <input
              id={`${idBase}-phone`}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="(00) 00000-0000"
              aria-invalid={Boolean(errors.phone)}
              className={classeCampo(Boolean(errors.phone))}
              {...campoTelefone}
              onChange={(evento) => {
                evento.target.value = mascaraTelefone(evento.target.value);
                void campoTelefone.onChange(evento);
              }}
            />
          </Campo>

          <Campo
            id={`${idBase}-email`}
            rotulo="E-mail"
            erro={errors.email?.message}
            className="sm:col-span-2"
          >
            <input
              id={`${idBase}-email`}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="voce@exemplo.com"
              aria-invalid={Boolean(errors.email)}
              className={classeCampo(Boolean(errors.email))}
              {...register("email")}
            />
          </Campo>

          <Campo
            id={`${idBase}-occupation`}
            rotulo="O que você faz hoje"
            opcional
            className={occupation === OCUPACAO_COM_EMPRESA ? "" : "sm:col-span-2"}
          >
            <select
              id={`${idBase}-occupation`}
              className={classeCampo(false, "pr-10")}
              {...register("occupation")}
            >
              <option value="">Prefiro não dizer agora</option>
              {occupationOptions.map((opcao) => (
                <option key={opcao} value={opcao}>
                  {opcao}
                </option>
              ))}
            </select>
          </Campo>

          {/* Só para quem já tem empresa: o CNPJ é o único dado do formulário
              que dá para conferir de verdade, e é ele que separa o lead que já
              pode faturar do que ainda vai abrir. */}
          {occupation === OCUPACAO_COM_EMPRESA && (
            <Campo id={`${idBase}-cnpj`} rotulo="CNPJ" opcional erro={errors.cnpj?.message}>
              <input
                id={`${idBase}-cnpj`}
                inputMode="numeric"
                placeholder="00.000.000/0000-00"
                aria-invalid={Boolean(errors.cnpj)}
                className={classeCampo(Boolean(errors.cnpj))}
                {...campoCnpj}
                onChange={(evento) => {
                  evento.target.value = mascaraCnpj(evento.target.value);
                  void campoCnpj.onChange(evento);
                }}
              />
            </Campo>
          )}
        </div>
      </fieldset>

      <fieldset className="mt-10 border-0 p-0">
        <legend className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--brand-blue-800)]">
          2. Onde a loja ficaria
        </legend>

        <div className="mt-5 grid gap-5 sm:grid-cols-[0.7fr_1.3fr] lg:grid-cols-[0.6fr_1fr_0.6fr]">
          <Campo
            id={`${idBase}-postalCode`}
            rotulo="CEP"
            opcional
            dica="preenche cidade e estado"
            erro={errors.postalCode?.message}
          >
            <input
              id={`${idBase}-postalCode`}
              inputMode="numeric"
              autoComplete="postal-code"
              placeholder="00000-000"
              aria-invalid={Boolean(errors.postalCode)}
              className={classeCampo(Boolean(errors.postalCode))}
              {...campoCep}
              onChange={(evento) => {
                evento.target.value = mascaraCep(evento.target.value);
                void campoCep.onChange(evento);

                const digitos = apenasDigitos(evento.target.value);

                if (digitos.length === 8) {
                  void buscarCep(digitos);
                } else {
                  consultaCep.current?.abort();
                  setCepStatus("idle");
                }
              }}
            />
          </Campo>

          <Campo id={`${idBase}-city`} rotulo="Cidade" erro={errors.city?.message}>
            <input
              id={`${idBase}-city`}
              autoComplete="address-level2"
              placeholder="Sua cidade"
              aria-invalid={Boolean(errors.city)}
              className={classeCampo(Boolean(errors.city))}
              {...register("city")}
            />
          </Campo>

          <Campo id={`${idBase}-state`} rotulo="Estado" erro={errors.state?.message}>
            <select
              id={`${idBase}-state`}
              autoComplete="address-level1"
              aria-invalid={Boolean(errors.state)}
              className={classeCampo(Boolean(errors.state), "pr-10")}
              {...register("state")}
            >
              <option value="">UF</option>
              {brazilianStates.map((estado) => (
                <option key={estado.uf} value={estado.uf}>
                  {estado.uf} — {estado.name}
                </option>
              ))}
            </select>
          </Campo>
        </div>

        <p aria-live="polite" className="mt-3 min-h-5 text-[13px] font-semibold">
          {cepStatus === "loading" && (
            <span className="inline-flex items-center gap-2 text-slate-500">
              <Loader2 size={14} className="animate-spin" /> Buscando endereço…
            </span>
          )}
          {cepStatus === "found" && (
            <span className="inline-flex items-center gap-2 text-emerald-600">
              <CheckCircle2 size={14} /> Cidade e estado preenchidos pelo CEP.
            </span>
          )}
          {cepStatus === "failed" && (
            <span className="text-slate-500">
              Não localizamos esse CEP — pode preencher cidade e estado na mão.
            </span>
          )}
        </p>
      </fieldset>

      <fieldset className="mt-8 border-0 p-0">
        <legend className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--brand-blue-800)]">
          3. Seu plano{" "}
          <span className="tracking-normal text-slate-400">(ajuda na conversa)</span>
        </legend>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Campo id={`${idBase}-investment`} rotulo="Capital disponível" opcional>
            <select
              id={`${idBase}-investment`}
              className={classeCampo(false, "pr-10")}
              {...register("investment")}
            >
              <option value="">Selecione uma faixa</option>
              {investmentOptions.map((opcao) => (
                <option key={opcao} value={opcao}>
                  {opcao}
                </option>
              ))}
            </select>
          </Campo>

          <Campo id={`${idBase}-timeline`} rotulo="Quando pretende abrir" opcional>
            <select
              id={`${idBase}-timeline`}
              className={classeCampo(false, "pr-10")}
              {...register("timeline")}
            >
              <option value="">Selecione um prazo</option>
              {timelineOptions.map((opcao) => (
                <option key={opcao} value={opcao}>
                  {opcao}
                </option>
              ))}
            </select>
          </Campo>

          <Campo
            id={`${idBase}-message`}
            rotulo="Quer contar mais alguma coisa?"
            opcional
            className="sm:col-span-2"
            erro={errors.message?.message}
          >
            <textarea
              id={`${idBase}-message`}
              rows={4}
              maxLength={600}
              placeholder="Ponto comercial em vista, experiência no varejo, dúvidas sobre o modelo…"
              className={`${classeCampo(Boolean(errors.message))} min-h-32 py-3 leading-6`}
              {...register("message")}
            />
          </Campo>
        </div>
      </fieldset>

      <label
        className={`mt-8 flex cursor-pointer gap-3 rounded-2xl border p-4 transition ${
          errors.consent ? "border-rose-300 bg-rose-50/50" : "border-slate-200 bg-slate-50/70"
        }`}
      >
        <input
          type="checkbox"
          aria-invalid={Boolean(errors.consent)}
          className="mt-0.5 size-5 shrink-0 accent-[var(--brand-blue-800)]"
          {...register("consent")}
        />
        <span className="text-[13px] leading-6 text-slate-600">
          Autorizo a Rede Unishop a usar meus dados para falar comigo sobre a
          abertura de uma unidade. Os dados não são compartilhados com terceiros e
          o contato pode ser encerrado quando eu quiser.
        </span>
      </label>

      {errors.consent && (
        <p className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-bold text-rose-600">
          <AlertCircle size={14} /> {errors.consent.message}
        </p>
      )}

      {erroGeral && (
        <p
          role="alert"
          className="mt-5 flex items-start gap-2 rounded-2xl bg-rose-50 p-4 text-[13px] font-bold leading-6 text-rose-700"
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" /> {erroGeral}
        </p>
      )}

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-yellow)] px-8 py-4 text-sm font-black text-[var(--brand-blue-950)] shadow-[0_14px_30px_rgba(211,156,0,0.28)] transition hover:-translate-y-0.5 hover:bg-[#ffd84d] disabled:cursor-progress disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={17} className="animate-spin" /> Enviando…
            </>
          ) : (
            <>
              <Send size={17} /> Enviar interesse
            </>
          )}
        </button>
        <p className="text-[13px] leading-6 text-slate-500">
          Prefere conversar agora?{" "}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[var(--brand-blue-800)] underline underline-offset-4 transition hover:text-[var(--brand-blue-950)]"
          >
            chame no WhatsApp
          </a>
          .
        </p>
      </div>
    </form>
  );
}

type CampoProps = {
  id: string;
  rotulo: string;
  children: ReactNode;
  erro?: string;
  dica?: string;
  opcional?: boolean;
  className?: string;
};

function Campo({
  id,
  rotulo,
  children,
  erro,
  dica,
  opcional = false,
  className = "",
}: CampoProps) {
  return (
    <div className={`grid min-w-0 content-start gap-2 ${className}`}>
      <label
        htmlFor={id}
        className="flex flex-wrap items-baseline gap-x-2 text-sm font-bold text-slate-700"
      >
        {rotulo}
        {opcional ? (
          <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            opcional
          </span>
        ) : (
          <span aria-hidden="true" className="text-[var(--brand-blue-700)]">
            *
          </span>
        )}
        {dica && <span className="text-[11px] font-semibold text-slate-400">{dica}</span>}
      </label>

      {children}

      {erro && (
        <p className="inline-flex items-center gap-1.5 text-[13px] font-bold text-rose-600">
          <AlertCircle size={14} className="shrink-0" /> {erro}
        </p>
      )}
    </div>
  );
}
