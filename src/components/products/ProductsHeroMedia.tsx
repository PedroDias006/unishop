"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const POSTER = "/images/produtos/hero-poster.webp";

/**
 * O vídeo do topo tem ~4,8 MB. O poster (17 KB) é o quadro inicial dele e
 * aparece na hora; o vídeo entra por cima quando dá.
 *
 * Antes havia uma trava de largura mínima (1024px) que deixava o telefone
 * sempre na imagem parada — no aparelho o topo simplesmente não tinha vídeo.
 * A trava agora é a conexão, não o tamanho da tela: quem está em modo
 * econômico ou em rede lenta continua só com o poster.
 */
export function ProductsHeroMedia() {
  const [playVideo, setPlayVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  /**
   * `onCanPlay` sozinho não bastava: quando o quadro já estava decodificado
   * antes de o React pendurar o listener, o evento passava batido e o vídeo
   * ficava rodando com opacity 0 — tocando, mas invisível. Aqui o próprio
   * elemento é consultado assim que aparece, e os eventos são só um reforço.
   */
  const attachVideo = useCallback((node: HTMLVideoElement | null) => {
    videoRef.current = node;
    if (node && node.readyState >= 3) setVideoReady(true);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    type Connection = { saveData?: boolean; effectiveType?: string };
    const connection = (navigator as Navigator & { connection?: Connection }).connection;
    const frugalConnection =
      connection?.saveData === true ||
      /(^|-)(2g|3g)$/.test(connection?.effectiveType ?? "");

    function evaluate() {
      setPlayVideo(!reducedMotion.matches && !frugalConnection);
    }

    evaluate();
    reducedMotion.addEventListener("change", evaluate);

    return () => reducedMotion.removeEventListener("change", evaluate);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!playVideo || !video || videoReady) return;

    if (video.readyState >= 3) {
      setVideoReady(true);
      return;
    }

    const markReady = () => setVideoReady(true);
    video.addEventListener("loadeddata", markReady);
    video.addEventListener("canplay", markReady);

    return () => {
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("canplay", markReady);
    };
  }, [playVideo, videoReady]);

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
          ref={attachVideo}
          src="/videos/produtos-hero.mp4"
          // Sem `poster`: o <Image> abaixo já mostra o mesmo quadro em webp, e o
          // atributo só faria o navegador baixar a versão jpg de novo.
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
