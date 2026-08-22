import { leadNormalizado, type Lead, type ResultadoDoDestino } from "./schema";
import { enviarEmailsDoLead } from "./emails";

export type { ResultadoDoDestino };

/**
 * Para onde o lead vai depois de validado.
 *
 * Cada destino é ligado por variável de ambiente e é opcional: o site funciona
 * sem nenhum deles configurado (útil em desenvolvimento e enquanto a empresa
 * decide o CRM). Os destinos rodam em paralelo, cada um com prazo próprio —
 * um CRM lento não pode segurar a resposta na tela de quem preencheu.
 *
 * Nada aqui derruba o envio sozinho: o resultado de cada destino volta para a
 * Server Action, que decide o que dizer para o visitante. E, aconteça o que
 * acontecer, o lead sai no log do servidor — é a última rede de segurança
 * contra perder um contato porque uma API de terceiro caiu.
 */


/** Prazo de cada chamada externa. Acima disso, o destino é dado como falho. */
const PRAZO = 8000;

export function destinosConfigurados() {
  const destinos: string[] = [];

  if (process.env.RD_STATION_API_KEY) destinos.push("rd-station");
  if (process.env.CRM_WEBHOOK_URL) destinos.push("crm-webhook");
  if (process.env.RESEND_API_KEY) destinos.push("email");

  return destinos;
}

async function comPrazo(url: string, opcoes: RequestInit) {
  return fetch(url, { ...opcoes, signal: AbortSignal.timeout(PRAZO) });
}

/**
 * RD Station Marketing — API de conversões.
 *
 * O `conversion_identifier` é o nome que aparece nos relatórios e nas
 * automações de lá, então ele identifica a origem do lead, não o formulário.
 */
async function enviarParaRdStation(lead: Lead): Promise<ResultadoDoDestino> {
  const chave = process.env.RD_STATION_API_KEY;
  if (!chave) return { destino: "rd-station", ok: false, detalhe: "sem chave" };

  const dados = leadNormalizado(lead);

  try {
    const resposta = await comPrazo(
      `https://api.rd.services/platform/conversions?api_key=${encodeURIComponent(chave)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_type: "CONVERSION",
          event_family: "CDP",
          payload: {
            conversion_identifier:
              process.env.RD_STATION_CONVERSION_ID ?? "site-seja-parceiro",
            name: dados.nome,
            email: dados.email,
            personal_phone: dados.telefone,
            city: dados.cidade,
            state: dados.estado,
            cf_ocupacao: dados.ocupacao,
            cf_cnpj: dados.cnpj,
            cf_capital_disponivel: dados.investimento,
            cf_prazo_para_abrir: dados.prazo,
            cf_mensagem: dados.mensagem,
            cf_origem: dados.origem,
            traffic_source: dados.origem,
          },
        }),
      },
    );

    if (!resposta.ok) {
      return {
        destino: "rd-station",
        ok: false,
        detalhe: `HTTP ${resposta.status}`,
      };
    }

    return { destino: "rd-station", ok: true };
  } catch (erro) {
    return { destino: "rd-station", ok: false, detalhe: mensagemDeErro(erro) };
  }
}

/**
 * Webhook genérico do CRM/ERP.
 *
 * É o caminho para Omie, Salesforce, Pipedrive, n8n, Make ou o que a Unishop
 * usar: quem recebe é um endpoint deles, e o corpo é o lead já normalizado.
 * Trocar de CRM não mexe em uma linha de código — mexe na variável.
 */
async function enviarParaWebhook(lead: Lead): Promise<ResultadoDoDestino> {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) return { destino: "crm-webhook", ok: false, detalhe: "sem URL" };

  const token = process.env.CRM_WEBHOOK_TOKEN;

  try {
    const resposta = await comPrazo(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        evento: "lead.seja-parceiro",
        lead: leadNormalizado(lead),
      }),
    });

    if (!resposta.ok) {
      return { destino: "crm-webhook", ok: false, detalhe: `HTTP ${resposta.status}` };
    }

    return { destino: "crm-webhook", ok: true };
  } catch (erro) {
    return { destino: "crm-webhook", ok: false, detalhe: mensagemDeErro(erro) };
  }
}

function mensagemDeErro(erro: unknown) {
  if (erro instanceof DOMException && erro.name === "TimeoutError") return "tempo esgotado";
  return erro instanceof Error ? erro.message : "falha desconhecida";
}

export async function entregarLead(lead: Lead): Promise<ResultadoDoDestino[]> {
  const tarefas: Promise<ResultadoDoDestino>[] = [];

  if (process.env.RD_STATION_API_KEY) tarefas.push(enviarParaRdStation(lead));
  if (process.env.CRM_WEBHOOK_URL) tarefas.push(enviarParaWebhook(lead));
  if (process.env.RESEND_API_KEY) tarefas.push(enviarEmailsDoLead(lead));

  const resultados = await Promise.all(tarefas);

  // O log estruturado sai sempre, com destino configurado ou não: é por ele
  // que um lead é recuperado se todas as integrações estiverem fora do ar.
  console.info(
    JSON.stringify({
      tag: "lead:seja-parceiro",
      lead: leadNormalizado(lead),
      destinos: resultados,
    }),
  );

  return resultados;
}
