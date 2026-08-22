import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

/**
 * O e-mail que a equipe comercial recebe.
 *
 * Ele é lido no celular, entre uma visita e outra, então a ordem é a da
 * decisão: quem é, de onde é, quanto tem para investir e para quando —
 * e os botões de ligar e chamar no WhatsApp antes de qualquer outra coisa.
 */

export type LeadInternoProps = {
  nome: string;
  email: string;
  telefone: string;
  telefoneFormatado: string;
  cidade: string;
  estado: string;
  cep: string;
  ocupacao: string;
  cnpj: string;
  investimento: string;
  prazo: string;
  mensagem: string;
  origem: string;
  recebidoEm: string;
};

const azul = "#04224c";
const amarelo = "#ffc928";

export function LeadInterno(lead: LeadInternoProps) {
  const linhas: [string, string][] = [
    ["E-mail", lead.email],
    ["Telefone", lead.telefoneFormatado],
    ["Cidade", `${lead.cidade} — ${lead.estado}`],
    ["CEP", lead.cep],
    ["Ocupação", lead.ocupacao],
    ["CNPJ", lead.cnpj],
    ["Capital disponível", lead.investimento],
    ["Prazo para abrir", lead.prazo],
    ["Origem", lead.origem],
  ].filter(([, valor]) => Boolean(valor)) as [string, string][];

  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>{`Novo lead: ${lead.nome} — ${lead.cidade}/${lead.estado}`}</Preview>
      <Body style={{ backgroundColor: "#f1f5f9", margin: 0, fontFamily: "Helvetica, Arial, sans-serif" }}>
        <Container style={{ maxWidth: "600px", margin: "24px auto", padding: "0 16px" }}>
          <Section style={{ backgroundColor: azul, borderRadius: "20px 20px 0 0", padding: "28px 28px 24px" }}>
            <Text style={{ margin: 0, color: amarelo, fontSize: "11px", fontWeight: 800, letterSpacing: "2px" }}>
              NOVO LEAD · SEJA UM PARCEIRO
            </Text>
            <Heading style={{ margin: "12px 0 0", color: "#ffffff", fontSize: "26px", lineHeight: "1.2" }}>
              {lead.nome}
            </Heading>
            <Text style={{ margin: "8px 0 0", color: "rgba(255,255,255,0.72)", fontSize: "14px" }}>
              {lead.cidade} — {lead.estado}
              {lead.investimento ? ` · ${lead.investimento}` : ""}
            </Text>
          </Section>

          <Section style={{ backgroundColor: "#ffffff", padding: "24px 28px" }}>
            <Row>
              <Column>
                <Link
                  href={`https://wa.me/${lead.telefone.replace(/\D/g, "")}`}
                  style={{
                    display: "inline-block",
                    backgroundColor: amarelo,
                    color: azul,
                    borderRadius: "999px",
                    padding: "12px 22px",
                    fontSize: "14px",
                    fontWeight: 800,
                    textDecoration: "none",
                  }}
                >
                  Chamar no WhatsApp
                </Link>
              </Column>
              <Column>
                <Link
                  href={`tel:${lead.telefone}`}
                  style={{
                    display: "inline-block",
                    color: azul,
                    borderRadius: "999px",
                    border: "1px solid #cbd5e1",
                    padding: "11px 22px",
                    fontSize: "14px",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Ligar agora
                </Link>
              </Column>
            </Row>

            <Hr style={{ borderColor: "#e2e8f0", margin: "24px 0" }} />

            {linhas.map(([rotulo, valor]) => (
              <Row key={rotulo} style={{ marginBottom: "10px" }}>
                <Column style={{ width: "42%", verticalAlign: "top" }}>
                  <Text style={{ margin: 0, color: "#94a3b8", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>
                    {rotulo}
                  </Text>
                </Column>
                <Column>
                  <Text style={{ margin: 0, color: "#0f172a", fontSize: "15px", fontWeight: 600 }}>
                    {valor}
                  </Text>
                </Column>
              </Row>
            ))}

            {lead.mensagem && (
              <>
                <Hr style={{ borderColor: "#e2e8f0", margin: "24px 0" }} />
                <Text style={{ margin: 0, color: "#94a3b8", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>
                  Mensagem
                </Text>
                <Text style={{ margin: "8px 0 0", color: "#334155", fontSize: "15px", lineHeight: "24px" }}>
                  {lead.mensagem}
                </Text>
              </>
            )}
          </Section>

          <Section style={{ backgroundColor: "#ffffff", borderRadius: "0 0 20px 20px", borderTop: "1px solid #e2e8f0", padding: "16px 28px" }}>
            <Text style={{ margin: 0, color: "#94a3b8", fontSize: "12px" }}>
              Recebido em {new Date(lead.recebidoEm).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}
              {" · "}
              formulário do site
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default LeadInterno;
