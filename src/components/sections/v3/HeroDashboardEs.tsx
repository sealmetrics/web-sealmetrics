"use client";

import { useState } from "react";
import { Picture } from "@/components/ui/Picture";

type ViewId =
  | "source"
  | "attribution"
  | "funnels"
  | "channels"
  | "lens"
  | "audit"
  | "api";

interface ViewConfig {
  id: ViewId;
  label: string;
  group: "measure" | "optimise";
  title: string;
  kpis: { l: string; v: string; d: string; hl?: boolean }[];
  chart: React.ReactNode;
}

const VIEWS: Record<ViewId, ViewConfig> = {
  source: {
    id: "source",
    label: "Fuente de verdad",
    group: "measure",
    title: "Atribución de ingresos",
    kpis: [
      { l: "Tráfico observado", v: "+30%", d: "▲ vs GA" },
      { l: "Delta atribución", v: "+17%", d: "▲ más cerca del CRM" },
      { l: "Ingresos recuperados", v: "€342K", d: "▲ antes invisibles", hl: true },
      { l: "Fuentes alineadas", v: "4 / 4", d: "marca · finanzas · agencias" },
    ],
    chart: <ChartThreeLines />,
  },
  attribution: {
    id: "attribution",
    label: "Atribución",
    group: "measure",
    title: "Ingresos por canal",
    kpis: [
      { l: "Orgánico", v: "€124K", d: "▲ +38% vs GA4" },
      { l: "Paid · Meta", v: "€98K", d: "▲ +52% recuperado", hl: true },
      { l: "Paid · Google", v: "€76K", d: "▲ +29% recuperado" },
      { l: "Directo (corregido)", v: "€44K", d: "▼ −38% reasignado" },
    ],
    chart: <ChartChannelBars />,
  },
  funnels: {
    id: "funnels",
    label: "Embudos",
    group: "measure",
    title: "Embudo de checkout",
    kpis: [
      { l: "Visitantes web", v: "124,8K", d: "▲ +30% vs GA" },
      { l: "Añadir al carrito", v: "16.380", d: "▲ +60% capturado" },
      { l: "Inicia checkout", v: "9.828", d: "40% abandono carrito" },
      { l: "Compra", v: "5.897", d: "▲ 99% match CRM", hl: true },
    ],
    chart: <ChartFunnel />,
  },
  channels: {
    id: "channels",
    label: "Canales",
    group: "measure",
    title: "ROAS por canal",
    kpis: [
      { l: "Orgánico", v: "8,1×", d: "▲ Mejor ROAS" },
      { l: "Paid · Google", v: "4,2×", d: "▲ +0,8 vs GA" },
      { l: "Paid · Meta", v: "3,8×", d: "▲ era 1,1× en GA", hl: true },
      { l: "Afiliación", v: "2,3×", d: "◆ Bajo objetivo" },
    ],
    chart: <ChartRoasBars />,
  },
  lens: {
    id: "lens",
    label: "LENS AI",
    group: "optimise",
    title: "Pregunta a tus datos",
    kpis: [
      { l: "Preguntas resueltas", v: "34", d: "Últimos 7 días" },
      { l: "Tiempo de respuesta", v: "24 s", d: "▼ desde 14 h" },
      { l: "Ingresos explicados", v: "€48K", d: "▲ caída vista a las 03:14", hl: true },
      { l: "Informes creados", v: "6", d: "✓ en lenguaje natural" },
    ],
    chart: <ChartAnomaly />,
  },
  audit: {
    id: "audit",
    label: "Auditoría publishers",
    group: "optimise",
    title: "Calidad de publishers DV360",
    kpis: [
      { l: "Publishers auditados", v: "24", d: "3 campañas" },
      { l: "Alta calidad", v: "8", d: "Escalar presupuesto" },
      { l: "Baja calidad", v: "6", d: "▼ presupuesto cortado" },
      { l: "Presupuesto rebalanceado", v: "32%", d: "▲ mismo gasto", hl: true },
    ],
    chart: <ChartPublishers />,
  },
  api: {
    id: "api",
    label: "SuperAPI",
    group: "optimise",
    title: "Datos crudos · acceso API",
    kpis: [
      { l: "Eventos / segundo", v: "1,2K", d: "Stream en vivo" },
      { l: "Latencia export", v: "< 2s", d: "Sync BigQuery" },
      { l: "Rate limit", v: "240/min", d: "480/min en Scale", hl: true },
      { l: "Muestreo", v: "0%", d: "todo evento" },
    ],
    chart: <ChartApiCode />,
  },
};

const ORDER: { group: "measure" | "optimise"; label: string; items: ViewId[] }[] = [
  { group: "measure", label: "Medir", items: ["source", "attribution", "funnels", "channels"] },
  { group: "optimise", label: "Optimizar", items: ["lens", "audit", "api"] },
];

export function HeroDashboardEs() {
  const [active, setActive] = useState<ViewId>("source");
  const view = VIEWS[active];

  return (
    <div
      className="relative bg-warm-50 border border-warm-100 rounded-[14px] pt-3.5 px-3.5 pb-0"
      style={{
        boxShadow:
          "0 24px 60px -20px rgba(15,16,24,0.18), 0 2px 8px rgba(15,16,24,0.05)",
      }}
    >
      <div className="bg-white border border-warm-100 border-b-0 rounded-t-[10px] grid grid-cols-1 md:grid-cols-[260px_1fr] min-h-[520px] overflow-hidden">
        <aside className="hidden md:flex flex-col gap-1 border-r border-warm-100 bg-warm-50 p-5">
          <div className="flex items-center justify-between mb-3 px-1">
            <Picture
              src="/logos/logo-sealmetrics.svg"
              alt="Sealmetrics"
              width={101}
              height={18}
              className="h-[18px] w-auto"
            />
          </div>

          <div
            className="flex items-center gap-2 mb-3 px-2.5 py-2 rounded-md border border-dashed"
            style={{ borderColor: "#2D8B6D", background: "rgba(45,139,109,0.06)" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
              style={{ background: "#2D8B6D" }}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-brand font-semibold">
              Haz click para explorar →
            </span>
          </div>

          {ORDER.map((group) => (
            <div key={group.group}>
              <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft font-semibold mt-3 mb-1.5 px-3">
                {group.label}
              </div>
              {group.items.map((id) => {
                const isActive = active === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActive(id)}
                    className={`group flex items-center gap-3 px-3 py-2.5 rounded-md text-[14px] font-medium text-left transition-all w-full cursor-pointer border ${
                      isActive
                        ? "bg-white text-ink border-warm-100 shadow-[0_2px_6px_rgba(15,16,24,0.08)]"
                        : "text-ink-2 border-transparent hover:bg-white hover:border-warm-100 hover:shadow-[0_1px_3px_rgba(15,16,24,0.04)]"
                    }`}
                    aria-pressed={isActive}
                  >
                    <span
                      className={`w-4 h-4 rounded-sm shrink-0 transition-colors ${
                        isActive
                          ? "bg-brand"
                          : "bg-warm-200 group-hover:bg-warm-300"
                      }`}
                    />
                    <span className="flex-1">{VIEWS[id].label}</span>
                    <span
                      className={`text-[12px] font-mono transition-all shrink-0 ${
                        isActive
                          ? "text-brand translate-x-0 opacity-100"
                          : "text-ink-soft -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      }`}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </aside>

        <div className="p-6 md:p-7 flex flex-col gap-[18px]">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-[17px] font-semibold tracking-[-0.02em]">
              {view.title}{" "}
              <span className="text-ink-soft font-medium">· últimos 30 días</span>
            </h2>
            <div className="flex gap-1.5">
              <span className="px-2.5 py-1 bg-white border border-brand-soft rounded text-[10px] font-mono font-semibold uppercase tracking-[0.04em] text-brand">
                ● alojado en UE
              </span>
              <span className="px-2.5 py-1 bg-ink text-white rounded text-[10px] font-mono font-semibold uppercase tracking-[0.04em] flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "#00FF7F", boxShadow: "0 0 6px #00FF7F" }}
                />
                En vivo
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {view.kpis.map((k, i) => (
              <div
                key={i}
                className={`p-4 rounded-lg border transition-all ${
                  k.hl
                    ? "bg-brand border-brand text-white"
                    : "bg-warm-50 border-warm-100"
                }`}
              >
                <div
                  className={`font-mono text-[10px] uppercase tracking-[0.1em] font-semibold ${
                    k.hl ? "text-white/75" : "text-ink-soft"
                  }`}
                >
                  {k.l}
                </div>
                <div className="text-2xl font-semibold mt-1.5 tracking-[-0.02em] tabular-nums">
                  {k.v}
                </div>
                <div
                  className={`text-[11px] font-mono font-semibold mt-1 ${
                    k.hl ? "text-amber" : "text-brand"
                  }`}
                  style={
                    k.d.startsWith("▼")
                      ? { color: k.hl ? "#F5E8C7" : "#B5423B" }
                      : undefined
                  }
                >
                  {k.d}
                </div>
              </div>
            ))}
          </div>

          <div className="flex-1 min-h-[240px] border border-warm-100 rounded-lg p-[18px] bg-white flex flex-col">
            {view.chart}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChartThreeLines() {
  return (
    <>
      <div className="flex justify-between items-center mb-3.5">
        <div className="text-[12px] font-semibold">
          Tráfico por fuente{" "}
          <span className="text-ink-soft font-medium">· ingresos atribuidos</span>
        </div>
        <div className="hidden md:flex gap-3.5 text-[10px] text-ink-soft font-mono tracking-[0.04em]">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-ink" />Sealmetrics</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-brand" />CRM · realidad</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-warm-300" />GA4 · muestreado</span>
        </div>
      </div>
      <svg viewBox="0 0 760 220" preserveAspectRatio="none" className="flex-1 w-full" aria-hidden="true">
        <g stroke="#D4D4C8" strokeWidth="1">
          <line x1="0" y1="220" x2="760" y2="220" />
          <line x1="0" y1="165" x2="760" y2="165" strokeDasharray="2 4" />
          <line x1="0" y1="110" x2="760" y2="110" strokeDasharray="2 4" />
          <line x1="0" y1="55" x2="760" y2="55" strokeDasharray="2 4" />
        </g>
        <defs>
          <linearGradient id="g1es" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#2D8B6D" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#2D8B6D" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,170 L60,155 L120,140 L180,115 L240,100 L300,80 L360,88 L420,55 L480,62 L540,38 L600,45 L660,22 L720,28 L760,18 L760,220 L0,220 Z" fill="url(#g1es)" />
        <path d="M0,170 L60,155 L120,140 L180,115 L240,100 L300,80 L360,88 L420,55 L480,62 L540,38 L600,45 L660,22 L720,28 L760,18" fill="none" stroke="#0E0E0C" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M0,175 L60,160 L120,145 L180,120 L240,105 L300,86 L360,94 L420,62 L480,68 L540,44 L600,50 L660,28 L720,34 L760,24" fill="none" stroke="#2D8B6D" strokeWidth="1.8" strokeDasharray="2 3" strokeLinejoin="round" />
        <path d="M0,200 L60,192 L120,188 L180,175 L240,170 L300,160 L360,164 L420,148 L480,152 L540,138 L600,144 L660,128 L720,134 L760,128" fill="none" stroke="#A3A396" strokeWidth="2" strokeDasharray="5 4" strokeLinejoin="round" />
        <circle cx="720" cy="28" r="5" fill="#0E0E0C" />
        <circle cx="720" cy="28" r="10" fill="#0E0E0C" opacity="0.1" />
      </svg>
    </>
  );
}

function ChartChannelBars() {
  const bars = [
    { label: "Orgánico", seal: 92, ga: 58 },
    { label: "Paid Meta", seal: 78, ga: 38 },
    { label: "Paid Google", seal: 68, ga: 47 },
    { label: "Email", seal: 42, ga: 36 },
    { label: "Afiliación", seal: 28, ga: 18 },
    { label: "Directo", seal: 34, ga: 72 },
  ];
  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <div className="text-[12px] font-semibold">
          Ingresos por canal <span className="text-ink-soft font-medium">· Sealmetrics vs GA4</span>
        </div>
        <div className="flex gap-3.5 text-[10px] text-ink-soft font-mono tracking-[0.04em]">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-ink" />Sealmetrics</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-warm-200" />GA4</span>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-3 justify-center">
        {bars.map((b) => (
          <div key={b.label} className="grid grid-cols-[90px_1fr] items-center gap-4">
            <div className="text-[12px] font-medium text-ink-2">{b.label}</div>
            <div className="flex flex-col gap-1">
              <div className="h-4 bg-ink rounded-sm flex items-center justify-end pr-2 text-[10px] text-white font-mono font-semibold" style={{ width: `${b.seal}%` }}>{b.seal}%</div>
              <div className="h-4 bg-warm-200 rounded-sm flex items-center justify-end pr-2 text-[10px] text-ink-soft font-mono" style={{ width: `${b.ga}%` }}>{b.ga}%</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function ChartFunnel() {
  const steps = [
    { label: "Visitantes web", v: "124.800", pct: 100 },
    { label: "Vistas de categoría", v: "87.360", pct: 70 },
    { label: "Vistas de producto", v: "54.600", pct: 44 },
    { label: "Añadir al carrito", v: "16.380", pct: 14 },
    { label: "Inicia checkout", v: "9.828", pct: 8 },
    { label: "Compra", v: "5.897", pct: 5, hl: true },
  ];
  return (
    <>
      <div className="text-[12px] font-semibold mb-4">
        Embudo · 124.800 visitantes mes <span className="text-ink-soft font-medium">· sin pérdida por el banner</span>
      </div>
      <div className="flex-1 flex flex-col gap-2 justify-center">
        {steps.map((s) => (
          <div key={s.label} className="grid grid-cols-[130px_1fr_70px] items-center gap-3">
            <div className="text-[12px] font-medium text-ink-2">{s.label}</div>
            <div className="h-7 bg-warm-50 rounded-sm relative overflow-hidden">
              <div className={`h-full rounded-sm ${s.hl ? "bg-brand" : "bg-ink"}`} style={{ width: `${s.pct}%` }} />
            </div>
            <div className="text-[11px] font-mono font-semibold text-ink text-right tabular-nums">{s.v}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function ChartRoasBars() {
  const roas = [
    { label: "Orgánico", x: 8.1 },
    { label: "Google Ads", x: 4.2 },
    { label: "Meta Ads", x: 3.8, hl: true },
    { label: "Email", x: 5.6 },
    { label: "Afiliación", x: 2.3 },
  ];
  const max = 10;
  return (
    <>
      <div className="text-[12px] font-semibold mb-4">
        ROAS por canal <span className="text-ink-soft font-medium">· atribuido sobre datos observados</span>
      </div>
      <div className="flex-1 flex items-end gap-4 justify-around pt-6">
        {roas.map((r) => (
          <div key={r.label} className="flex flex-col items-center gap-2 flex-1 max-w-[80px]">
            <div className="text-[11px] font-mono font-semibold text-ink tabular-nums">{r.x}×</div>
            <div className={`w-full rounded-t-md ${r.hl ? "bg-brand" : "bg-ink"}`} style={{ height: `${(r.x / max) * 160}px` }} />
            <div className="text-[11px] text-ink-soft font-medium">{r.label}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function ChartAnomaly() {
  return (
    <>
      <div className="text-[12px] font-semibold mb-4">
        Conversiones · ventana 48h <span className="text-ink-soft font-medium">· caída a las 03:14</span>
      </div>
      <svg viewBox="0 0 760 220" preserveAspectRatio="none" className="flex-1 w-full" aria-hidden="true">
        <defs>
          <linearGradient id="pulse-es" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#2D8B6D" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#2D8B6D" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g stroke="#D4D4C8" strokeWidth="1">
          <line x1="0" y1="200" x2="760" y2="200" />
          <line x1="0" y1="140" x2="760" y2="140" strokeDasharray="2 4" />
          <line x1="0" y1="80" x2="760" y2="80" strokeDasharray="2 4" />
        </g>
        <path d="M0,90 L50,85 L100,88 L150,82 L200,80 L250,75 L300,78 L350,70 L400,185 L430,178 L460,172 L500,48 L550,50 L600,44 L650,40 L700,38 L760,35 L760,220 L0,220 Z" fill="url(#pulse-es)" />
        <path d="M0,90 L50,85 L100,88 L150,82 L200,80 L250,75 L300,78 L350,70 L400,185 L430,178 L460,172 L500,48 L550,50 L600,44 L650,40 L700,38 L760,35" fill="none" stroke="#0E0E0C" strokeWidth="2.2" strokeLinejoin="round" />
        <line x1="400" y1="0" x2="400" y2="200" stroke="#B5423B" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="400" cy="185" r="6" fill="#B5423B" />
        <text x="410" y="178" fontFamily="JetBrains Mono" fontSize="11" fill="#B5423B" fontWeight="600">03:14 · CAÍDA</text>
        <line x1="500" y1="0" x2="500" y2="200" stroke="#2D8B6D" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="500" cy="48" r="6" fill="#2D8B6D" />
        <text x="510" y="42" fontFamily="JetBrains Mono" fontSize="11" fill="#2D8B6D" fontWeight="600">03:38 · RESUELTA</text>
      </svg>
    </>
  );
}

function ChartPublishers() {
  const pubs = [
    { name: "publisher-a.com", quality: 92, hl: true },
    { name: "publisher-b.tv", quality: 85 },
    { name: "publisher-c.fm", quality: 78 },
    { name: "publisher-d.io", quality: 64 },
    { name: "publisher-e.net", quality: 42 },
    { name: "publisher-f.co", quality: 28 },
    { name: "publisher-g.site", quality: 18 },
  ];
  return (
    <>
      <div className="text-[12px] font-semibold mb-4">
        Puntuación de calidad <span className="text-ink-soft font-medium">· inventario DV360, últimos 30 días</span>
      </div>
      <div className="flex-1 flex flex-col gap-2 justify-center">
        {pubs.map((p) => (
          <div key={p.name} className="grid grid-cols-[150px_1fr_40px] items-center gap-3">
            <div className="text-[11px] font-mono text-ink-2">{p.name}</div>
            <div className="h-5 bg-warm-50 rounded-sm relative overflow-hidden">
              <div className={`h-full rounded-sm ${p.quality > 60 ? "bg-brand" : p.quality > 40 ? "bg-warm-300" : "bg-red-alert"}`} style={{ width: `${p.quality}%` }} />
            </div>
            <div className="text-[11px] font-mono font-semibold text-ink text-right tabular-nums">{p.quality}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function ChartApiCode() {
  return (
    <>
      <div className="text-[12px] font-semibold mb-4">
        Endpoints SuperAPI <span className="text-ink-soft font-medium">· sin muestreo, sin umbrales</span>
      </div>
      <div className="flex-1 bg-ink text-white rounded-lg p-5 font-mono text-[12.5px] leading-[1.9] relative">
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#FF6058]" />
          <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
          <span className="w-2 h-2 rounded-full bg-[#28CA42]" />
        </div>
        <div className="mt-5">
          <div><span className="text-amber">GET</span> <span className="text-white">/api/v1/conversions</span> <span className="text-white/40">→ 5.897 eventos</span></div>
          <div><span className="text-amber">GET</span> <span className="text-white">/api/v1/sources</span> <span className="text-white/40">→ 124.800 visitantes</span></div>
          <div><span className="text-amber">GET</span> <span className="text-white">/api/v1/journeys</span> <span className="text-white/40">→ cada sesión</span></div>
          <div><span className="text-amber">POST</span> <span className="text-white">/api/v1/bigquery/sync</span> <span className="text-white/40">→ 200 OK · 1,4s</span></div>
          <div className="text-white/40 mt-2">// exporta eventos crudos a cualquier warehouse</div>
          <div className="text-white/40">// sin rate limits, sin exports muestreados</div>
        </div>
      </div>
    </>
  );
}
