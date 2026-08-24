import type { NextConfig } from "next";

const oneYear = 60 * 60 * 24 * 365;

const isDev = process.env.NODE_ENV !== "production";

/**
 * Em produção os arquivos estáticos são imutáveis: o navegador guarda por um
 * ano e nunca revalida. Em desenvolvimento isso é veneno — trocar uma imagem
 * mantendo o mesmo nome não aparecia na tela, porque `immutable` faz o
 * navegador nem perguntar ao servidor se mudou. No `next dev` a resposta passa
 * a ser `no-store`, e a troca aparece no primeiro F5.
 */
const assetCacheControl = isDev
  ? "no-store, must-revalidate"
  : `public, max-age=${oneYear}, immutable`;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  turbopack: {
    root: process.cwd(),
  },

  images: {
    formats: ["image/avif", "image/webp"],

    // A partir do Next 16 o `quality` do componente só vale se o valor estiver
    // declarado aqui — fora da lista, ele cai calado para o padrão 75. O 82 é
    // para as fotos do hero de telefone: elas já saem do
    // `scripts/recortar-fotos-telefone.mjs` com máscara de nitidez, e em 75 o
    // otimizador devolvia por compressão o borrão que o script tinha tirado.
    qualities: [75, 82],

    // Breakpoints alinhados aos tamanhos que o layout realmente usa.
    deviceSizes: [360, 420, 640, 750, 828, 1080, 1200, 1440, 1920, 2172],
    imageSizes: [16, 32, 48, 64, 96, 128, 180, 256, 384],

    // Quanto tempo o otimizador guarda a versão já convertida de cada imagem.
    // A chave desse cache é a URL de origem, não o conteúdo do arquivo: com um
    // ano, sobrescrever `foo.webp` continuava servindo os bytes antigos até o
    // prazo vencer. Em desenvolvimento cai para zero, em produção segue longo,
    // porque lá a troca de imagem vem junto com um deploy novo.
    minimumCacheTTL: isDev ? 0 : oneYear,
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons/fa6"],
  },

  async headers() {
    return [
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: assetCacheControl,
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: assetCacheControl,
          },
        ],
      },
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: assetCacheControl,
          },
        ],
      },
    ];
  },
};

export default nextConfig;