import {
  depoimentosDoCms,
  faqDoCms,
  numerosDoCms,
  pilaresDoCms,
} from "@/sanity/lib/queries";
import { businessNumbers, faq, networkNumbers, partnershipPillars } from "./network";

/**
 * O conteúdo editorial das páginas, com o CMS na frente e o repositório atrás.
 *
 * Cada função tenta o Sanity e, se ele não estiver configurado ou não tiver
 * aquele tipo de conteúdo cadastrado, devolve o que está versionado em
 * `network.ts`. Duas consequências práticas:
 *
 * - o site nunca fica sem conteúdo, nem no primeiro deploy, nem se o CMS cair;
 * - a migração pode ser feita aos poucos: cadastrou os números no painel, os
 *   números passam a vir de lá; o resto continua como está.
 */

export type NumeroEditorial = {
  value: string;
  unit: string;
  label: string;
  detail: string;
};

export type PerguntaEditorial = { question: string; answer: string };

export type PilarEditorial = { id: string; title: string; text: string };

export type DepoimentoEditorial = {
  nome: string;
  unidade: string | null;
  texto: string;
  foto: string | null;
};

export async function obterNumerosDaRede(): Promise<NumeroEditorial[]> {
  const doCms = await numerosDoCms("rede");

  return (
    doCms ??
    networkNumbers.map((numero) => ({
      value: numero.value,
      unit: numero.unit,
      label: numero.label,
      detail: "",
    }))
  );
}

export async function obterNumerosDoNegocio(): Promise<NumeroEditorial[]> {
  const doCms = await numerosDoCms("negocio");

  return (
    doCms ??
    businessNumbers.map((numero) => ({
      value: numero.value,
      unit: "",
      label: numero.label,
      detail: numero.detail,
    }))
  );
}

export async function obterFaq(): Promise<PerguntaEditorial[]> {
  const doCms = await faqDoCms();

  return doCms ?? faq.map((item) => ({ question: item.question, answer: item.answer }));
}

export async function obterPilares(): Promise<PilarEditorial[]> {
  const doCms = await pilaresDoCms();

  return (
    doCms ??
    partnershipPillars.map((pilar) => ({
      id: pilar.id,
      title: pilar.title,
      text: pilar.text,
    }))
  );
}

/**
 * Depoimentos.
 *
 * Aqui não há reserva no `network.ts`: os depoimentos que estão no site hoje
 * vivem dentro dos próprios componentes. Quem chama recebe `null` e mantém a
 * lista que já tinha — quando o painel receber o primeiro depoimento, ele
 * passa a mandar.
 */
export async function obterDepoimentos(): Promise<DepoimentoEditorial[] | null> {
  return depoimentosDoCms();
}
