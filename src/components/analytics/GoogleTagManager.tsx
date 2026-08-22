import Script from "next/script";

/**
 * O contêiner do Google Tag Manager.
 *
 * Sai do ar sozinho quando `NEXT_PUBLIC_GTM_ID` não está definido — em
 * desenvolvimento e nos previews ninguém quer sujar os relatórios da empresa
 * com o próprio tráfego de teste.
 *
 * A estratégia é `afterInteractive`: o GTM carrega depois que a página já está
 * de pé, para não disputar banda com a fonte, o hero e as imagens. Evento
 * disparado antes disso não se perde — tanto o próprio snippet quanto o
 * `enviarEvento` criam o `dataLayer` se ele ainda não existir, e o GTM
 * processa a fila inteira assim que sobe.
 */
export function GoogleTagManager() {
  const id = process.env.NEXT_PUBLIC_GTM_ID;

  if (!id) return null;

  return (
    <Script id="gtm" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${id}');`}
    </Script>
  );
}

/** O `<noscript>` do GTM, que precisa ser o primeiro elemento do `<body>`. */
export function GoogleTagManagerNoScript() {
  const id = process.env.NEXT_PUBLIC_GTM_ID;

  if (!id) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${id}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
