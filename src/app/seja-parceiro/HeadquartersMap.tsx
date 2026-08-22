import { ExternalLink, MapPin, Navigation } from "lucide-react";
import { Container } from "@/components/ui/Container";
import {
  headquarters,
  headquartersAddress,
  mapDirectionsUrl,
  mapEmbedUrl,
  mapLinkUrl,
} from "@/data/contact";

/**
 * O mapa da sede, logo abaixo do formulário.
 *
 * Serve para duas coisas: mostrar que existe uma empresa de verdade atrás do
 * formulário e dar o caminho para quem quer visitar. O `iframe` é `lazy` — o
 * mapa só é baixado quando o visitante chega perto dele, então não pesa no
 * carregamento da página nem no primeiro contato com o formulário.
 */
export function HeadquartersMap() {
  return (
    <section id="sede" className="scroll-mt-28 bg-white py-16 sm:py-24">
      <Container>
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl shadow-slate-950/5">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            <div className="order-2 p-7 sm:p-10 lg:order-1">
              <div className="flex items-center gap-3">
                <span className="h-px w-9 bg-[var(--brand-yellow)]" aria-hidden="true" />
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--brand-blue-800)]">
                  Onde a gente fica
                </p>
              </div>

              <h2 className="mt-5 text-balance text-3xl font-black tracking-[-0.045em] text-[var(--brand-blue-950)] sm:text-4xl">
                {headquarters.label} em {headquarters.city}.
              </h2>

              <p className="mt-5 max-w-md text-base leading-7 text-slate-600">
                É de {headquarters.city}, no Triângulo Mineiro, que a rede
                acompanha as lojas de todo o país — na mesma cidade onde a
                indústria que abastece a Unishop começou, em 1987.
              </p>

              <div className="mt-8 flex gap-4">
                <span className="mt-0.5 grid size-11 shrink-0 place-items-center rounded-full bg-[var(--brand-blue-950)]/6 text-[var(--brand-blue-800)]">
                  <MapPin size={19} />
                </span>
                <address className="not-italic">
                  <span className="block text-[15px] font-extrabold leading-6 text-slate-900">
                    {headquarters.street}
                  </span>
                  <span className="mt-1 block text-[15px] leading-6 text-slate-600">
                    {headquarters.complement} · {headquarters.district}
                    <br />
                    {headquarters.city} — {headquarters.state}, CEP{" "}
                    {headquarters.postalCode}
                  </span>
                </address>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--brand-blue-900)] px-6 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[var(--brand-blue-950)]"
                >
                  <Navigation size={16} /> Traçar rota
                </a>
                <a
                  href={mapLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-200 px-6 text-sm font-bold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                >
                  Abrir no Google Maps <ExternalLink size={15} />
                </a>
              </div>
            </div>

            <div className="order-1 min-h-[280px] bg-slate-100 lg:order-2 lg:min-h-[460px]">
              <iframe
                src={mapEmbedUrl}
                title={`Mapa com a localização da Rede Unishop: ${headquartersAddress}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[280px] w-full border-0 lg:min-h-[460px]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
