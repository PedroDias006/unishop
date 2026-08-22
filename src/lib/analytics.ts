/**
 * A camada de dados do Google Tag Manager.
 *
 * O site não instala pixel nenhum direto no código: ele empurra eventos para o
 * `dataLayer` e o GTM decide o que fazer com cada um. Assim a agência de mídia
 * liga Google Ads, Meta ou o que for pelo painel do GTM, sem depender de um
 * deploy para cada tag nova.
 *
 * Os nomes seguem o padrão do Google Analytics 4 (`generate_lead`,
 * `view_item`), porque é o que o GA4 e o Google Ads já entendem sem tradução.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function enviarEvento(evento: string, dados: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: evento, ...dados });
}

/** Alguém começou a preencher o formulário de parceria. */
export function eventoInicioDeFormulario(formulario: string) {
  enviarEvento("form_start", { form_id: formulario });
}

/**
 * Lead enviado com sucesso.
 *
 * O `value` é o investimento declarado: é ele que permite ao Google Ads
 * comparar campanhas por valor de negócio, e não por volume de formulário.
 */
export function eventoLeadGerado(dados: {
  valor: number;
  cidade: string;
  estado: string;
  prazo?: string;
}) {
  enviarEvento("generate_lead", {
    currency: "BRL",
    value: dados.valor,
    lead_city: dados.cidade,
    lead_state: dados.estado,
    lead_timeline: dados.prazo ?? "",
  });
}

/** Alguém abriu a ficha de um produto do catálogo. */
export function eventoProdutoVisto(dados: {
  slug: string;
  nome: string;
  marca: string | null;
  categoria?: string;
}) {
  enviarEvento("view_item", {
    items: [
      {
        item_id: dados.slug,
        item_name: dados.nome,
        item_brand: dados.marca ?? "",
        item_category: dados.categoria ?? "",
      },
    ],
  });
}

/** Filtro usado na vitrine — mostra o que o público procura no catálogo. */
export function eventoFiltroDaVitrine(filtro: string, valor: string) {
  if (!valor) return;
  enviarEvento("select_content", { content_type: filtro, item_id: valor });
}
