"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const POSTER = "/images/produtos/hero-poster.webp";

/**
 * O vídeo do topo tem ~4,8 MB. Ele só entra quando o aparelho tem tela larga,
 * o usuário não pediu menos animação e a conexão não está em modo econômico.
 * Nos demais casos fica só o poster, que pesa 17 KB e já é o quadro inicial
 * do próprio vídeo.
 */
export function ProductsHeroMedia() {
  const [playVideo, setPlayVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const wideScreen = window.matchMedia("(min-width: 1024px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    type Connection = { saveData?: boolean; effectiveType?: string };
    const connection = (navigator as Navigator & { connection?: Connection }).connection;
    const frugalConnection =
      connection?.saveData === true ||
      /2g/.test(connection?.effectiveType ?? "");

    function evaluate() {
      setPlayVideo(wideScreen.matches && !reducedMotion.matches && !frugalConnection);
    }

    evaluate();
    wideScreen.addEventListener("change", evaluate);
    reducedMotion.addEventListener("change", evaluate);

    return () => {
      wideScreen.removeEventListener("change", evaluate);
      reducedMotion.removeEventListener("change", evaluate);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <Image
        src={POSTER}
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {playVideo ? (
        <video
          src="/videos/produtos-hero.mp4"
          poster="/images/produtos/hero-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          aria-hidden="true"
          onCanPlay={() => setVideoReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : null}

      <div className="absolute inset-0 bg-gradient-to-r from-[#092b4c]/80 via-[#092b4c]/50 to-transparent" />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}
