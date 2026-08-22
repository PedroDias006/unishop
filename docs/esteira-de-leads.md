# Esteira de leads — do formulário ao CRM

O formulário de `/seja-parceiro` não é um "enviar e-mail e torcer". O caminho de
um lead é este:

```text
navegador                servidor                        fora daqui
─────────                ────────                        ──────────
React Hook Form
  + Zod (schema)  ──▶  Server Action `enviarLead`
                        │  1. valida com o MESMO schema Zod
                        │  2. descarta se a isca foi preenchida (robô)
                        │  3. freia 5 envios por IP a cada 10 min
                        │
                        ├──▶ RD Station (API de conversões)
                        ├──▶ Webhook do CRM/ERP (JSON)
                        ├──▶ Resend ──▶ e-mail para o comercial
                        │              e-mail de boas-vindas para o lead
                        └──▶ log estruturado (sempre)
                        │
   generate_lead  ◀─────┘ (só depois do servidor confirmar)
   no dataLayer → GTM → Google Ads / GA4
```

## Arquivos

| Onde | O quê |
| --- | --- |
| `src/lib/leads/schema.ts` | O contrato do lead: campos, mensagens em pt-BR, validação de CNPJ, normalização e valor da conversão |
| `src/app/seja-parceiro/actions.ts` | A Server Action: revalida, filtra robô, freia por IP e decide a resposta |
| `src/lib/leads/destinos.ts` | Para onde o lead vai (RD Station, webhook), com prazo e tolerância a falha |
| `src/lib/leads/emails.tsx` | Os dois envios pelo Resend |
| `src/emails/*.tsx` | Os dois layouts em React Email |
| `src/lib/analytics.ts` | Os eventos que vão para o `dataLayer` |
| `src/components/analytics/GoogleTagManager.tsx` | O contêiner do GTM |

## Por que o schema é um só

`leadSchema` roda no navegador (dá o erro na hora, campo a campo) e roda de novo
dentro da Server Action. A segunda vez não é paranoia: **Server Action é
endpoint público**. Sem revalidar, bastava um POST à mão para plantar lixo
dentro do CRM da empresa.

## Configuração

Copie `.env.example` para `.env.local`. Nada é obrigatório — sem variável
nenhuma o formulário continua funcionando e o lead fica no log do servidor.

- **E-mail**: `RESEND_API_KEY`, `LEADS_EMAIL_FROM`, `LEADS_EMAIL_TO`.
  O domínio do remetente precisa estar verificado no Resend.
- **RD Station**: `RD_STATION_API_KEY` (chave pública, em Integrações > API) e
  `RD_STATION_CONVERSION_ID`.
- **Qualquer outro CRM** (Omie, Salesforce, Pipedrive, n8n, Make): aponte
  `CRM_WEBHOOK_URL` para o endpoint deles. O corpo é
  `{ evento: "lead.seja-parceiro", lead: { … } }` com os campos já normalizados
  (telefone em E.164, CEP e CNPJ só com dígitos). `CRM_WEBHOOK_TOKEN` vira
  `Authorization: Bearer`.
- **GTM**: `NEXT_PUBLIC_GTM_ID`. Vazio, nenhum script de análise carrega — que é
  o certo em desenvolvimento e nos previews, para não sujar o relatório da
  empresa com tráfego de teste.

Os dois caminhos de CRM convivem: se as duas variáveis estiverem preenchidas, o
lead vai para os dois.

## O que a tela responde

- **Algum destino aceitou** → confirmação, com o primeiro nome de quem enviou.
- **Nenhum destino configurado** → confirmação também (o lead está no log).
- **Todos os destinos configurados falharam** → a pessoa é avisada e mandada
  para o WhatsApp. É mais honesto do que dizer "recebemos!" e ninguém retornar.

## Eventos no dataLayer

O site não instala pixel: empurra evento e o GTM distribui. Assim a agência liga
Google Ads, Meta ou o que for pelo painel, sem depender de deploy.

| Evento | Quando | Campos |
| --- | --- | --- |
| `form_start` | primeira digitação no formulário | `form_id` |
| `generate_lead` | **depois** de o servidor confirmar | `value`, `currency`, `lead_city`, `lead_state`, `lead_timeline` |
| `view_item` | abriu a ficha de um produto | `items[]` com id, nome, marca e categoria |
| `select_content` | usou um filtro da vitrine | `content_type`, `item_id` |

O `value` é o piso da faixa de investimento declarada (R$ 60/86/120 mil). Piso e
não teto: valor inflado distorce a otimização de campanha do Google Ads.

O `generate_lead` só dispara depois do `ok` do servidor — assim o Ads otimiza
por lead que entrou na esteira, e não por formulário preenchido.

## Origem do lead

O campo oculto `origem` junta caminho da página, UTMs e referrer, e vai junto
para o CRM. É por ele que a agência descobre qual campanha traz parceiro de
verdade.

## Anti-spam

1. **Isca** (`website`): campo fora da tela e fora da tabulação. Robô preenche,
   gente não. Se vier preenchido, o envio é descartado — e a tela responde
   sucesso, para não ensinar o robô a contornar.
2. **Freio por IP**: 5 envios a cada 10 minutos, em memória do processo. Não
   substitui WAF; segura o caso comum sem depender de serviço externo.

## Testar sem chave nenhuma

`npm run dev`, preencha o formulário e olhe o terminal: sai uma linha
`{"tag":"lead:seja-parceiro", …}` com o lead inteiro e o resultado de cada
destino. É essa linha que salva um contato se todas as integrações caírem.
