import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

/**
 * O e-mail que o interessado recebe segundos depois de enviar o formulário.
 *
 * Ele existe por dois motivos: confirmar que a mensagem chegou (senão a pessoa
 * manda de novo, ou desiste) e ocupar as próximas horas — catálogo e modelo de
 * negócio — até a equipe comercial ligar.
 */

export type BoasVindasProps = {
  nome: string;
  site: string;
};

const azul = "#04224c";
const amarelo = "#ffc928";

export function BoasVindas({ nome, site }: BoasVindasProps) {
  const primeiroNome = nome.trim().split(" ")[0];

  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>Recebemos o seu interesse em abrir uma unidade Unishop.</Preview>
      <Body style={{ backgroundColor: "#f1f5f9", margin: 0, fontFamily: "Helvetica, Arial, sans-serif" }}>
        <Container style={{ maxWidth: "600px", margin: "24px auto", padding: "0 16px" }}>
          <Section style={{ backgroundColor: azul, borderRadius: "20px 20px 0 0", padding: "32px 28px" }}>
            <Text style={{ margin: 0, color: amarelo, fontSize: "11px", fontWeight: 800, letterSpacing: "2px" }}>
              REDE UNISHOP
            </Text>
            <Heading style={{ margin: "14px 0 0", color: "#ffffff", fontSize: "28px", lineHeight: "1.2" }}>
              Olá, {primeiroNome}. Recebemos o seu interesse.
            </Heading>
          </Section>

          <Section style={{ backgroundColor: "#ffffff", padding: "28px" }}>
            <Text style={{ margin: 0, color: "#334155", fontSize: "16px", lineHeight: "26px" }}>
              Nossa equipe comercial entra em contato em até um dia útil para
              apresentar o modelo, os formatos de loja e o passo a passo da
              implantação — sem compromisso.
            </Text>

            <Text style={{ margin: "20px 0 0", color: "#334155", fontSize: "16px", lineHeight: "26px" }}>
              Enquanto isso, dois atalhos que respondem a maior parte das dúvidas:
            </Text>

            <Section style={{ marginTop: "24px" }}>
              <Link
                href={`${site}/produtos/catalogo`}
                style={{
                  display: "block",
                  backgroundColor: amarelo,
                  color: azul,
                  borderRadius: "999px",
                  padding: "14px 24px",
                  fontSize: "15px",
                  fontWeight: 800,
                  textAlign: "center",
                  textDecoration: "none",
                }}
              >
                Ver o catálogo de produtos
              </Link>

              <Link
                href={`${site}/modelo-de-negocio`}
                style={{
                  display: "block",
                  marginTop: "12px",
                  color: azul,
                  border: "1px solid #cbd5e1",
                  borderRadius: "999px",
                  padding: "13px 24px",
                  fontSize: "15px",
                  fontWeight: 700,
                  textAlign: "center",
                  textDecoration: "none",
                }}
              >
                Entender o modelo de negócio
              </Link>
            </Section>

            <Hr style={{ borderColor: "#e2e8f0", margin: "28px 0 20px" }} />

            <Text style={{ margin: 0, color: "#64748b", fontSize: "14px", lineHeight: "22px" }}>
              Sem royalties, sem taxa de franquia e com a indústria do grupo
              abastecendo a loja. É esse o modelo que vamos te apresentar.
            </Text>
          </Section>

          <Section style={{ backgroundColor: "#ffffff", borderRadius: "0 0 20px 20px", borderTop: "1px solid #e2e8f0", padding: "18px 28px" }}>
            <Text style={{ margin: 0, color: "#94a3b8", fontSize: "12px", lineHeight: "20px" }}>
              Você recebeu este e-mail porque preencheu o formulário de parceria
              em {site.replace(/^https?:\/\//, "")}. Se não foi você, é só
              ignorar esta mensagem.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default BoasVindas;
