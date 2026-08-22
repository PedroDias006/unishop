import { Resend } from "resend";
import { BoasVindas } from "@/emails/BoasVindas";
import { LeadInterno } from "@/emails/LeadInterno";
import { siteUrl } from "@/data/site";
import { leadNormalizado, type Lead, type ResultadoDoDestino } from "./schema";

/**
 * Os dois e-mails que saem quando um lead chega: um para a equipe comercial,
 * com tudo o que ela precisa para ligar, e um para quem preencheu, dizendo que
 * a mensagem chegou e o que acontece agora.
 *
 * Os dois vão juntos, em paralelo. Se o de boas-vindas falhar (caixa cheia,
 * endereço inexistente), o interno ainda vale: o lead não se perde por causa
 * do e-mail do próprio lead.
 */
export async function enviarEmailsDoLead(lead: Lead): Promise<ResultadoDoDestino> {
  const chave = process.env.RESEND_API_KEY;
  const remetente = process.env.LEADS_EMAIL_FROM;
  const destinatario = process.env.LEADS_EMAIL_TO;

  if (!chave || !remetente || !destinatario) {
    return {
      destino: "email",
      ok: false,
      detalhe: "faltam RESEND_API_KEY, LEADS_EMAIL_FROM ou LEADS_EMAIL_TO",
    };
  }

  const resend = new Resend(chave);
  const dados = leadNormalizado(lead);

  const [interno, boasVindas] = await Promise.allSettled([
    resend.emails.send({
      from: remetente,
      to: destinatario.split(",").map((endereco) => endereco.trim()),
      replyTo: dados.email,
      subject: `Novo lead: ${dados.nome} — ${dados.cidade}/${dados.estado}`,
      react: <LeadInterno {...dados} />,
    }),
    resend.emails.send({
      from: remetente,
      to: dados.email,
      subject: "Recebemos o seu interesse na Rede Unishop",
      react: <BoasVindas nome={dados.nome} site={siteUrl} />,
    }),
  ]);

  const falhaInterna =
    interno.status === "rejected"
      ? String(interno.reason)
      : interno.value.error
        ? interno.value.error.message
        : null;

  const falhaBoasVindas =
    boasVindas.status === "rejected"
      ? String(boasVindas.reason)
      : boasVindas.value.error
        ? boasVindas.value.error.message
        : null;

  if (falhaInterna) {
    return { destino: "email", ok: false, detalhe: `interno: ${falhaInterna}` };
  }

  return {
    destino: "email",
    ok: true,
    detalhe: falhaBoasVindas ? `boas-vindas falhou: ${falhaBoasVindas}` : undefined,
  };
}
