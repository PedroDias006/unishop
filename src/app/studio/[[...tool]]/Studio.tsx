"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

/**
 * O Studio roda inteiro no navegador, então precisa ser componente de cliente.
 * Fica isolado neste arquivo para que a página continue sendo servidor e possa
 * decidir, antes de carregar 2 MB de painel, se o CMS está configurado.
 */
export function Studio() {
  return <NextStudio config={config} />;
}
