"use client";

import Image from "next/image";
import { PieChart, TrendingUp } from "lucide-react";
import { useMemo, useRef, useState, type PointerEvent } from "react";

import { Container } from "@/components/ui/Container";

const investmentBreakdown = [
  { label: "Estrutura e reforma do ponto", value: 40, color: "#1150a4" },
  { label: "Estoque inicial de produtos", value: 35, color: "#3d8fd9" },
  { label: "Equipamentos e capital de giro", value: 25, color: "#d99b00" },
];

const growthCurve = [
  { month: 1, index: 100 },
  { month: 3, index: 128 },
  { month: 6, index: 158 },
  { month: 9, index: 183 },
  { month: 12, index: 205 },
  { month: 15, index: 222 },
  { month: 18, index: 236 },
  { month: 21, index: 246 },
  { month: 24, index: 254 },
];

const DONUT_RADIUS = 70;
const DONUT_STROKE = 30;
const DONUT_CIRCUMFERENCE = 2 * Math.PI * DONUT_RADIUS;
const DONUT_GAP = 6;

function DonutChart() {
  const [active, setActive] = useState<number | null>(null);
  const total = investmentBreakdown.reduce((sum, item) => sum + item.value, 0);

  let cumulative = 0;

  return (
    <div className="flex flex-col items-center gap-8 sm:flex-row">
      <div className="relative shrink-0">
        <svg viewBox="0 0 180 180" className="size-48 -rotate-90 sm:size-52">
          <circle
            cx="90"
            cy="90"
            r={DONUT_RADIUS}
            fill="none"
            stroke="#eef2f7"
            strokeWidth={DONUT_STROKE}
          />

          {investmentBreakdown.map((item, index) => {
            const segmentLength =
              (item.value / total) * DONUT_CIRCUMFERENCE - DONUT_GAP;
            const offset = -((cumulative / total) * DONUT_CIRCUMFERENCE);
            cumulative += item.value;
            const isActive = active === index;

            return (
              <circle
                key={item.label}
                cx="90"
                cy="90"
                r={DONUT_RADIUS}
                fill="none"
                stroke={item.color}
                strokeWidth={isActive ? DONUT_STROKE + 6 : DONUT_STROKE}
                strokeDasharray={`${segmentLength} ${DONUT_CIRCUMFERENCE - segmentLength}`}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
              />
            );
          })}
        </svg>

        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="text-center">
            {active === null ? (
              <>
                <strong className="block text-3xl font-black tracking-[-0.03em] text-[var(--brand-blue-950)]">
                  100%
                </strong>
                <span className="mt-1 block text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                  Investimento
                  <br />
                  total
                </span>
              </>
            ) : (
              <>
                <strong
                  className="block text-3xl font-black tracking-[-0.03em]"
                  style={{ color: investmentBreakdown[active].color }}
                >
                  {investmentBreakdown[active].value}%
                </strong>
                <span className="mt-1 block max-w-[110px] text-[10px] font-black uppercase leading-tight tracking-[0.1em] text-slate-400">
                  {investmentBreakdown[active].label}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <ul className="w-full space-y-2.5">
        {investmentBreakdown.map((item, index) => (
          <li
            key={item.label}
            onMouseEnter={() => setActive(index)}
            onMouseLeave={() => setActive(null)}
            className={`flex cursor-default items-center justify-between gap-4 rounded-xl border px-4 py-3 transition ${
              active === index
                ? "border-slate-200 bg-slate-50"
                : "border-transparent"
            }`}
          >
            <span className="flex items-center gap-3 text-sm font-semibold text-slate-600">
              <span
                className="size-3 shrink-0 rounded-full"
                style={{ background: item.color }}
              />
              {item.label}
            </span>

            <strong className="shrink-0 text-sm font-black text-[var(--brand-blue-950)]">
              {item.value}%
            </strong>
          </li>
        ))}
      </ul>

      <span className="sr-only">
        Distribuição do investimento inicial:{" "}
        {investmentBreakdown
          .map((item) => `${item.label} ${item.value}%`)
          .join(", ")}
        .
      </span>
    </div>
  );
}

const CHART_W = 640;
const CHART_H = 260;
const PAD_L = 8;
const PAD_R = 8;
const PAD_T = 20;
const PAD_B = 28;

function MountainChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const points = useMemo(() => {
    const values = growthCurve.map((item) => item.index);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const minMonth = growthCurve[0].month;
    const maxMonth = growthCurve[growthCurve.length - 1].month;

    return growthCurve.map((item) => {
      const x =
        PAD_L +
        ((item.month - minMonth) / (maxMonth - minMonth)) *
          (CHART_W - PAD_L - PAD_R);
      const y =
        PAD_T +
        (1 - (item.index - minValue) / (maxValue - minValue)) *
          (CHART_H - PAD_T - PAD_B);

      return { ...item, x, y };
    });
  }, []);

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${
    CHART_H - PAD_B
  } L ${points[0].x} ${CHART_H - PAD_B} Z`;

  function handlePointerMove(event: PointerEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const ratioX = (event.clientX - rect.left) / rect.width;
    const x = ratioX * CHART_W;

    let closestIndex = 0;
    let closestDistance = Infinity;

    points.forEach((point, index) => {
      const distance = Math.abs(point.x - x);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setHoverIndex(closestIndex);
  }

  const activePoint = hoverIndex !== null ? points[hoverIndex] : null;
  const gridSteps = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        className="w-full touch-none"
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setHoverIndex(null)}
        role="img"
        aria-label="Gráfico de área mostrando o índice de faturamento evoluindo de 100 no mês 1 para 254 no mês 24"
      >
        <defs>
          <linearGradient id="mountainFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1f66c4" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#1f66c4" stopOpacity="0" />
          </linearGradient>
        </defs>

        {gridSteps.map((step) => {
          const y = PAD_T + step * (CHART_H - PAD_T - PAD_B);
          return (
            <line
              key={step}
              x1={PAD_L}
              x2={CHART_W - PAD_R}
              y1={y}
              y2={y}
              stroke="#e2e8f0"
              strokeWidth={1}
            />
          );
        })}

        <path d={areaPath} fill="url(#mountainFill)" />
        <path
          d={linePath}
          fill="none"
          stroke="#0a3474"
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {points.map((point) => {
          const showLabel = point.month === 1 || point.month % 6 === 0;
          if (!showLabel) return null;

          return (
            <text
              key={point.month}
              x={point.x}
              y={CHART_H - 8}
              textAnchor={
                point.month === 1
                  ? "start"
                  : point.month === growthCurve[growthCurve.length - 1].month
                    ? "end"
                    : "middle"
              }
              className="fill-slate-400"
              fontSize={11}
              fontWeight={700}
            >
              {`Mês ${point.month}`}
            </text>
          );
        })}

        <text
          x={points[0].x}
          y={points[0].y - 12}
          textAnchor="start"
          className="fill-[var(--brand-blue-700)]"
          fontSize={12}
          fontWeight={800}
        >
          100
        </text>

        <text
          x={points[points.length - 1].x}
          y={points[points.length - 1].y - 12}
          textAnchor="end"
          className="fill-[var(--brand-yellow-dark)]"
          fontSize={12}
          fontWeight={800}
        >
          254
        </text>

        {activePoint && (
          <>
            <line
              x1={activePoint.x}
              x2={activePoint.x}
              y1={PAD_T}
              y2={CHART_H - PAD_B}
              stroke="#94a3b8"
              strokeWidth={1}
              strokeDasharray="4 4"
            />
            <circle
              cx={activePoint.x}
              cy={activePoint.y}
              r={5}
              fill="#ffc928"
              stroke="#0a3474"
              strokeWidth={2}
            />
          </>
        )}
      </svg>

      {activePoint && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-[calc(100%+10px)] whitespace-nowrap rounded-lg bg-[var(--brand-blue-950)] px-3 py-2 text-xs font-bold text-white shadow-lg"
          style={{
            left: `${(activePoint.x / CHART_W) * 100}%`,
            top: `${(activePoint.y / CHART_H) * 100}%`,
          }}
        >
          Mês {activePoint.month} · índice {activePoint.index}
        </div>
      )}
    </div>
  );
}

export function GrowthSection() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--brand-blue-800)]">
            Números que fazem sentido
          </p>

          <h2 className="mt-5 text-4xl font-black tracking-[-0.045em] text-[var(--brand-blue-950)] sm:text-5xl">
            Um investimento com direção clara.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500">
            Veja como o capital se organiza dentro da operação e o que esperar
            da curva de crescimento de uma unidade Unishop.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          {/* FOTO */}
          <div className="relative min-h-[420px] overflow-hidden rounded-[28px] bg-[#eaf0f6]">
            <Image
              src="/images/hero/empreendedora-unishop.webp"
              alt="Empreendedora parceira Unishop sorrindo dentro de sua loja"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-blue-950)]/85 via-[var(--brand-blue-950)]/10 to-transparent" />

            <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-white/95 px-5 py-4 shadow-[0_18px_50px_rgba(6,31,73,0.18)] backdrop-blur">
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                Crescimento médio em 24 meses*
              </span>

              <strong className="mt-1 block text-3xl font-black tracking-[-0.04em] text-[var(--brand-blue-950)]">
                +154%
                <span className="ml-2 text-sm font-bold text-slate-400">
                  no índice de faturamento
                </span>
              </strong>
            </div>
          </div>

          {/* DONUT */}
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#eef4fc] text-[var(--brand-blue-800)]">
                <PieChart size={18} />
              </span>

              <div>
                <h3 className="text-lg font-black text-[var(--brand-blue-950)]">
                  Para onde vai o investimento
                </h3>

                <p className="text-xs text-slate-400">
                  Distribuição média do capital inicial
                </p>
              </div>
            </div>

            <div className="mt-8">
              <DonutChart />
            </div>
          </div>
        </div>

        {/* MONTANHA */}
        <div className="mt-6 rounded-[28px] border border-slate-200 bg-white p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#eef4fc] text-[var(--brand-blue-800)]">
                <TrendingUp size={18} />
              </span>

              <div>
                <h3 className="text-lg font-black text-[var(--brand-blue-950)]">
                  Curva de maturação da operação
                </h3>

                <p className="text-xs text-slate-400">
                  Índice de faturamento mensal · mês 1 = 100
                </p>
              </div>
            </div>

            <span className="rounded-full bg-[var(--brand-yellow)]/15 px-4 py-1.5 text-xs font-black text-[var(--brand-blue-900)]">
              +154% em 24 meses
            </span>
          </div>

          <div className="mt-8">
            <MountainChart />
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-5 text-slate-400">
          *Dados ilustrativos de maturação de uma unidade padrão. Resultados
          variam conforme região, ponto comercial e gestão da operação.
        </p>
      </Container>
    </section>
  );
}
