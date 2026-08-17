import type { NextConfig } from "next";

const oneYear = 60 * 60 * 24 * 365;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  distDir: process.env.NEXT_DIST_DIR ?? ".next-local",
  poweredByHeader: false,
  turbopack: {
    root: process.cwd(),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Breakpoints alinhados aos tamanhos que o layout realmente usa.
    deviceSizes: [360, 420, 640, 750, 828, 1080, 1200, 1440, 1920, 2172],
    imageSizes: [16, 32, 48, 64, 96, 128, 180, 256, 384],
    // As imagens são versionadas pelo nome do arquivo, então o cache pode ser longo.
    minimumCacheTTL: oneYear,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons/fa6"],
  },
  async headers() {
    return [
      {
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: `public, max-age=${oneYear}, immutable` },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: `public, max-age=${oneYear}, immutable` },
        ],
      },
      {
        source: "/videos/:path*",
        headers: [
          { key: "Cache-Control", value: `public, max-age=${oneYear}, immutable` },
        ],
      },
    ];
  },
};

export default nextConfig;
