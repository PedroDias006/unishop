import { z } from "zod";
import { brazilianStates } from "@/data/contact";

/**
 * O contrato do lead — um só, usado nos dois lados.
 *
 * O navegador valida com este schema para dar erro na hora, e a Server Action
 * valida com o MESMO schema antes de mandar qualquer coisa para o CRM. Sem
 * isso, quem faz um POST direto na action passa por cima de toda a validação
 * do formulário e suja a base comercial.
 */

const ufs = brazilianStates.map((estado) => estado.uf) as [string, ...string[]];

export function apenasDigitos(valor: string) {
  return valor.replace(/\D/g, "");
}

/**
 * Dígitos verificadores do CNPJ. É o único campo que dá para conferir de
 * verdade sem chamar ninguém — e-mail e telefone só dá para checar o formato.
 */
export function cnpjValido(valor: string) {
  const digitos = apenasDigitos(valor);

  if (digitos.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(digitos)) return false;

  const calcular = (base: string) => {
    let peso = base.length - 7;
    let soma = 0;

    for (let indice = 0; indice < base.length; indice += 1) {
      soma += Number(base[indice]) * peso;
      peso -= 1;
      if (peso < 2) peso = 9;
    }

    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const primeiro = calcular(digitos.slice(0, 12));
  const segundo = calcular(digitos.slice(0, 13));

  return primeiro === Number(digitos[12]) && segundo === Number(digitos[13]);
}

const opcional = z.string().trim().max(120).optional().or(z.literal(""));

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Diga como podemos te chamar.")
    .max(120, "Nome muito longo."),

  email: z
    .string()
    .trim()
    .min(1, "Precisamos de um e-mail para enviar a apresentação.")
    .max(160)
    .regex(/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i, "Confira o e-mail: parece faltar algo."),

  phone: z
    .string()
    .trim()
    .min(1, "Informe um telefone com DDD.")
    .refine((valor) => {
      const digitos = apenasDigitos(valor);
      return digitos.length === 10 || digitos.length === 11;
    }, "Faltam dígitos — use DDD + número."),

  postalCode: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine(
      (valor) => !valor || apenasDigitos(valor).length === 8,
      "O CEP tem 8 dígitos.",
    ),

  city: z.string().trim().min(2, "Em qual cidade você quer abrir?").max(80),

  // String com verificação, e não `z.enum`: o campo nasce vazio no formulário,
  // e um enum não aceitaria "" nem como valor inicial.
  state: z
    .string()
    .trim()
    .refine((valor) => ufs.includes(valor), "Escolha o estado."),

  occupation: opcional,
  investment: opcional,
  timeline: opcional,

  /**
   * Só aparece para quem diz já ter empresa. Vazio passa; preenchido tem que
   * ser um CNPJ real — é o que separa o lead que já tem CNPJ para faturar do
   * que ainda vai abrir.
   */
  cnpj: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine((valor) => !valor || cnpjValido(valor), "Esse CNPJ não confere."),

  message: z.string().trim().max(600, "Mensagem muito longa.").optional().or(z.literal("")),

  consent: z
    .boolean()
    .refine(
      (valor) => valor === true,
      "Precisamos da sua autorização para entrar em contato.",
    ),

  /**
   * Campo isca: fica escondido na tela, então gente nenhuma preenche. Robô de
   * formulário preenche tudo o que encontra — se vier com conteúdo, o envio é
   * descartado sem alarde.
   */
  website: z.string().max(0).optional().or(z.literal("")),

  /** De onde o lead veio (utm_source, campanha, página). Preenchido sozinho. */
  origem: z.string().trim().max(300).optional().or(z.literal("")),
});

export type Lead = z.infer<typeof leadSchema>;

/** O que a Server Action devolve para o formulário. */
export type ResultadoDoEnvio =
  | { ok: true; destinos: string[] }
  | { ok: false; erro: string; campos?: Partial<Record<keyof Lead, string>> };

/** O telefone em E.164, que é como CRM e WhatsApp esperam receber. */
export function telefoneInternacional(telefone: string) {
  return `+55${apenasDigitos(telefone)}`;
}

export type ResultadoDoDestino = {
  destino: string;
  ok: boolean;
  detalhe?: string;
};

/** O lead em formato plano — é o que webhook, CRM e e-mail recebem. */
export function leadNormalizado(lead: Lead) {
  return {
    nome: lead.name,
    email: lead.email,
    telefone: telefoneInternacional(lead.phone),
    telefoneFormatado: lead.phone,
    cep: lead.postalCode ? apenasDigitos(lead.postalCode) : "",
    cidade: lead.city,
    estado: lead.state,
    ocupacao: lead.occupation ?? "",
    cnpj: lead.cnpj ? apenasDigitos(lead.cnpj) : "",
    investimento: lead.investment ?? "",
    prazo: lead.timeline ?? "",
    mensagem: lead.message ?? "",
    origem: lead.origem ?? "",
    recebidoEm: new Date().toISOString(),
  };
}

/**
 * Faixa de investimento → número, para o valor da conversão no Google Ads.
 *
 * Cada faixa vale o seu piso, não o teto: é o investimento que a rede pode
 * contar com segurança, e valor inflado no Ads distorce a otimização de
 * campanha. Sem resposta, vale o formato de loja mais barato (R$ 60 mil).
 */
const VALOR_POR_FAIXA: Record<string, number> = {
  "Até R$ 60 mil": 60000,
  "Entre R$ 60 mil e R$ 86 mil": 60000,
  "Entre R$ 86 mil e R$ 120 mil": 86000,
  "Acima de R$ 120 mil": 120000,
  "Ainda estou avaliando": 60000,
};

export function valorDoLead(investimento: string | undefined) {
  if (!investimento) return 60000;

  return VALOR_POR_FAIXA[investimento] ?? 60000;
}
