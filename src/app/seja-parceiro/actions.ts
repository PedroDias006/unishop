"use server";

import { headers } from "next/headers";
import { destinosConfigurados, entregarLead } from "@/lib/leads/destinos";
import { leadSchema, type Lead, type ResultadoDoEnvio } from "@/lib/leads/schema";

/**
 * O que acontece quando alguém envia o formulário de parceria.
 *
 * A validação é feita de novo aqui, com o mesmo schema do navegador, porque a
 * validação do formulário serve ao visitante e esta serve à base de dados: uma
 * Server Action é um endpoint público, e sem revalidar bastava um POST à mão
 * para plantar lixo dentro do CRM da empresa.
 *
 * O que a tela recebe de volta é sempre uma resposta honesta: se nenhum
 * destino aceitou o lead, a pessoa é avisada e mandada para o WhatsApp, em vez
 * de ver "recebemos!" e ninguém retornar nunca.
 */

/**
 * Freio simples por IP. Não substitui um WAF, mas segura o caso comum — o
 * mesmo robô mandando o formulário em looping — sem depender de serviço
 * externo. A memória é do processo: reiniciou, zerou, e tudo bem.
 */
const ENVIOS_POR_IP = new Map<string, number[]>();
const JANELA = 10 * 60 * 1000;
const LIMITE = 5;

function excedeuOLimite(ip: string) {
  const agora = Date.now();
  const recentes = (ENVIOS_POR_IP.get(ip) ?? []).filter(
    (momento) => agora - momento < JANELA,
  );

  recentes.push(agora);
  ENVIOS_POR_IP.set(ip, recentes);

  // Faxina preguiçosa: sem isso o mapa cresceria para sempre num servidor
  // de longa duração.
  if (ENVIOS_POR_IP.size > 5000) {
    for (const [chave, momentos] of ENVIOS_POR_IP) {
      if (momentos.every((momento) => agora - momento > JANELA)) {
        ENVIOS_POR_IP.delete(chave);
      }
    }
  }

  return recentes.length > LIMITE;
}

export async function enviarLead(dados: unknown): Promise<ResultadoDoEnvio> {
  const validacao = leadSchema.safeParse(dados);

  if (!validacao.success) {
    const campos: Partial<Record<keyof Lead, string>> = {};

    for (const problema of validacao.error.issues) {
      const campo = problema.path[0] as keyof Lead | undefined;
      if (campo && !campos[campo]) campos[campo] = problema.message;
    }

    return { ok: false, erro: "Confira os campos destacados.", campos };
  }

  const lead = validacao.data;

  // A isca foi preenchida: só robô faz isso. Devolve sucesso para não ensinar
  // o robô a contornar, mas não entrega o lead a lugar nenhum.
  if (lead.website) return { ok: true, destinos: [] };

  const cabecalhos = await headers();
  const ip =
    cabecalhos.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    cabecalhos.get("cf-connecting-ip") ??
    "desconhecido";

  if (excedeuOLimite(ip)) {
    return {
      ok: false,
      erro: "Você já enviou algumas mensagens agora há pouco. Fale com a gente pelo WhatsApp.",
    };
  }

  const configurados = destinosConfigurados();
  const resultados = await entregarLead(lead);
  const aceitaram = resultados.filter((resultado) => resultado.ok);

  // Sem nenhuma integração ligada (desenvolvimento, ou antes de a empresa
  // escolher o CRM), o lead fica no log do servidor e a tela confirma o envio.
  if (configurados.length === 0) return { ok: true, destinos: [] };

  if (aceitaram.length === 0) {
    return {
      ok: false,
      erro: "Não conseguimos registrar seu contato agora. Tente pelo WhatsApp — respondemos por lá na hora.",
    };
  }

  return { ok: true, destinos: aceitaram.map((resultado) => resultado.destino) };
}
