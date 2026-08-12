"use client";

import { 
  ArrowUpRight, 
  Sparkles, 
  ShieldCheck, 
  Droplet, 
  CheckCircle2,
  Package,
  Leaf,
  Heart
} from "lucide-react";
import Image from "next/image";

// Dados focados na Linha Completa
const lines = [
  {
    brand: "Tuff",
    eyebrow: "CUIDADO COMPLETO PARA SUAS ROUPAS",
    titlePrefix: "A Linha Definitiva",
    titleSuffix: "de",
    titleHighlight: "Limpeza e Cuidado",
    subtitle: "FAMÍLIA DE PRODUTOS TUFF",
    description: "A combinação perfeita para roupas impecáveis. Do lava-roupas em pó ao amaciante concentrado e tira-manchas, tenha o poder máximo de limpeza e perfume na sua rotina.",
    image: "/images/produtos-showcase/tuff-linha.webp", // Coloque o caminho dessa imagem com os vários produtos aqui
    logo: "/images/marcas/tuff.webp",
    href: "https://www.startquimica.com.br/pt-BR/nossas-marcas/tuff",
    
    accentColor: "#0756c9", // Azul Tuff
    badge: "Solução Completa",
    
    // Benefícios da Linha
    features: [
      { icon: Sparkles, text: "Limpeza\nProfunda" },
      { icon: ShieldCheck, text: "Proteção\ndas Fibras" },
      { icon: Droplet, text: "Fórmulas\nConcentradas" },
      { icon: Package, text: "Rendimento\nMáximo" },
    ],
    
    // Stats flutuantes para a família de produtos
    stats: [
      { value: "+ Eficiência", label: "NA REMOÇÃO DE MANCHAS" },
      { value: "100%", label: "CUIDADO COM AS CORES" },
      { text: "PERFUME\nDURADOURO" },
    ],
    
    // Selos de confiança no rodapé
    footerChecks: [
      { icon: CheckCircle2, text: "ALTA PERFORMANCE" },
      { icon: Leaf, text: "FÓRMULAS EFICIENTES" },
      { icon: Heart, text: "CUIDA DAS SUAS ROUPAS" },
    ]
  },
  // Pode adicionar as outras famílias de produtos (Azulim, etc) aqui depois
];

export function ProductShowcase() {
  return (
    <div className="flex w-full flex-col bg-white">
      {lines.map((product, index) => (
        <section
          key={`line-section-${index}`}
          className="relative flex min-h-screen w-full flex-col overflow-hidden bg-white py-16 lg:py-24"
        >
          <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col items-center justify-between gap-16 px-6 lg:flex-row lg:gap-12 lg:px-12">
            
            {/* ---------------------------------------------------
                LADO ESQUERDO (LOGO GIGANTE, TEXTOS E CTA)
            --------------------------------------------------- */}
            <div className="flex w-full flex-col lg:w-[45%] xl:w-[40%]">
              
              {/* Logo da Marca (Agora bem maior) */}
              <div className="relative mb-10 h-20 w-full max-w-[280px] sm:h-28 sm:max-w-[320px]">
                <Image
                  src={product.logo}
                  alt={`Logo ${product.brand}`}
                  fill
                  className="object-contain object-left"
                />
              </div>

              {/* Eyebrow / Tag */}
              <div className="mb-4 flex items-center gap-4">
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0756c9]">
                  {product.eyebrow}
                </span>
              </div>

              {/* Título Principal */}
              <h2 className="text-[40px] font-black leading-[1.05] tracking-tight text-[#092b4c] sm:text-[48px] xl:text-[56px]">
                {product.titlePrefix} <br />
                {product.titleSuffix}{" "}
                <span style={{ color: product.accentColor }}>{product.titleHighlight}</span>
              </h2>

              {/* Descrição */}
              <p className="mt-6 max-w-[480px] text-[16px] leading-relaxed text-[#596977] sm:text-[18px]">
                {product.description}
              </p>

              {/* Ícones de Benefícios (Design Clean para Fundo Branco) */}
              <div className="mt-10 flex flex-wrap gap-6 sm:gap-8">
                {product.features.map((feature, i) => (
                  <div key={i} className="flex flex-col items-start gap-3">
                    <div className="grid size-12 place-items-center rounded-full bg-[#f0f5ff] text-[#0756c9] shadow-sm">
                      <feature.icon size={22} strokeWidth={1.5} />
                    </div>
                    <span className="whitespace-pre-line text-[13px] font-bold leading-tight text-[#092b4c]">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Botão Call-to-Action (Focado em Vendas) */}
              <div className="mt-12">
                <a
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[56px] items-center gap-5 rounded-full py-2 pl-8 pr-2 text-[15px] font-bold text-white shadow-[0_12px_24px_rgba(7,86,201,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(7,86,201,0.35)]"
                  style={{ backgroundColor: product.accentColor }}
                >
                  Comprar a Linha Completa
                  <span className="grid size-11 place-items-center rounded-full bg-white/20 text-white transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight size={18} />
                  </span>
                </a>
              </div>
            </div>

            {/* ---------------------------------------------------
                LADO DIREITO (IMAGEM COM VÁRIOS PRODUTOS E STATS)
            --------------------------------------------------- */}
            <div className="relative flex w-full flex-col items-center justify-center lg:w-[55%] xl:w-[60%]">
              
              {/* Badge Superior Direito Flutuante */}
              {product.badge && (
                <div className="absolute right-[5%] top-0 z-30 flex items-center gap-2 rounded-full border border-gray-100 bg-white px-5 py-3 shadow-[0_15px_35px_rgba(0,0,0,0.08)] animate-[float_4s_ease-in-out_infinite]">
                  <Sparkles size={18} style={{ color: product.accentColor }} />
                  <span className="text-[12px] font-black uppercase tracking-wider text-[#092b4c]">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Contêiner da Imagem (Ajustado para imagens mais largas com vários produtos) */}
              <div className="relative z-20 flex h-[400px] w-full max-w-[800px] items-center justify-center sm:h-[500px] lg:h-[600px]">
                {/* Sombra de chão muito difusa para assentar os produtos */}
                <div className="absolute bottom-[5%] left-1/2 h-[30px] w-[70%] -translate-x-1/2 rounded-[100%] bg-black/15 blur-[25px]" />
                
                <Image
                  src={product.image}
                  alt={`Linha completa ${product.brand}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] z-10"
                  priority
                />
              </div>

              {/* Cartão Branco Flutuante Inferior (Stats) - Traz muita autoridade */}
              <div className="relative z-30 mt-[-20px] flex w-full max-w-[650px] items-center justify-between rounded-2xl border border-gray-100 bg-white px-6 py-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)] sm:px-10 lg:mt-[-40px]">
                {product.stats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex flex-col">
                      {stat.value && (
                        <span className="text-[24px] font-black leading-none text-[#092b4c] sm:text-[32px]">
                          {stat.value}
                        </span>
                      )}
                      <span className="mt-1 whitespace-pre-line text-[10px] font-bold uppercase tracking-wider text-[#697b8b] sm:text-[11px]">
                        {stat.label || stat.text}
                      </span>
                    </div>
                    {/* Separador */}
                    {i < product.stats.length - 1 && (
                      <div className="ml-4 hidden h-10 w-px bg-gray-200 sm:ml-6 sm:block" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===================================================
              RODAPÉ DO PRODUTO (LINHA FINAL DE CONFIANÇA)
          =================================================== */}
          <div className="relative z-20 mt-20 w-full border-t border-gray-100 bg-[#fafcfd] py-6">
            <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-center gap-x-12 gap-y-4 px-6 lg:px-12">
              {product.footerChecks.map((check, i) => (
                <div key={i} className="flex items-center gap-3">
                  <check.icon size={18} className="text-[#0756c9]" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#596977]">
                    {check.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
        </section>
      ))}

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}