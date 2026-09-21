"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { pushEvent } from "@/lib/analytics";

/* ===========================================
   Model
   Two approved inputs only (client experience, founder decision 2026-09-21):
   between 40% and 60% of traffic doesn't accept cookies; of those who
   accept, 40% don't accept on the first pageview, so GA4 records the visit
   without the source it arrived with. No per-country rates, no ad-blocker,
   Safari/ITP or early-exit coefficients, no multipliers.

   This mirrors src/lib/calculators/consent-model.ts (added by the
   data-loss-calculator rework). Once that module is on main, import it here
   instead of keeping a local copy.
   =========================================== */

type Locale = "en" | "es";

const REJECTION_OPTIONS = [0.4, 0.5, 0.6] as const;
const REJECTION_MIN = 0.4;
const REJECTION_MAX = 0.6;
const REJECTION_DEFAULT = 0.5;
/** Share of consenting visitors who accept after the first pageview. */
const LATE_CONSENT_SHARE = 0.4;

function clampRejection(r: number): number {
  if (!Number.isFinite(r)) return REJECTION_DEFAULT;
  return Math.min(REJECTION_MAX, Math.max(REJECTION_MIN, r));
}

function consentShares(rejection: number) {
  const r = clampRejection(rejection);
  const seen = 1 - r;
  const attributed = seen * (1 - LATE_CONSENT_SHARE);
  return { rejection: r, attributed, seenWithoutSource: seen - attributed, unseen: r };
}

/* ===========================================
   Copy
   =========================================== */

const COPY = {
  en: {
    shareBase: "https://sealmetrics.com/growth-calculator/",
    demoHref: "/demo/",
    incaptoHref: "/case-studies/incapto/",
    yourNumbers: "Your numbers",
    threeFields: "Three fields. Instant estimate.",
    visitors: "Monthly website visitors",
    rejection: "Share of traffic that doesn't accept cookies",
    rejectionHint: "In our experience with clients, between 40% and 60%. Pick the end closest to your banner.",
    revenue: "Monthly online revenue (EUR)",
    refineShow: "+ Refine",
    refineHide: "- Hide",
    refineWord: "estimate",
    cr: "Conversion rate (%)",
    aov: "Average order value (EUR)",
    derived: "derived",
    calculate: "Reveal My Growth Potential",
    sourceNote:
      "In our experience with clients, between 40% and 60% of traffic doesn't accept cookies, and of those who do, 40% don't accept on the first pageview. No email required.",
    estimateNote: "This is an estimate from our client range. How much depends on the store and the channel — measure it on yours.",
    sideCta: "See the gap with your own data",
    sideCtaSub: "30 minutes. We use your actual traffic, not estimates.",
    emptyTitle: "What could you scale with the traffic GA4 can't credit?",
    emptyBody:
      "Enter your monthly visitors, how many reject cookies and your revenue. We estimate how much of it GA4 can tie to the source that brought it.",
    headlineLabel: "Estimate: GA4 would credit to their real source",
    ofVisits: "of your visits",
    visitsLine: (real: string, att: string, noSource: string, unseen: string) =>
      [`Of your `, real, ` monthly visits, about `, att, ` would reach GA4 with their source, `, noSource, ` without it, and `, unseen, ` not at all.`],
    rangeLine: (lo: string, hi: string) => `Across our client range (40–60% don't accept cookies): ${lo}–${hi} of visits credited to their real source.`,
    revenueTitle: "Revenue GA4 would not tie to its source",
    month: "This month",
    quarter: "This quarter",
    year: "This year",
    revenueNote:
      "Assumes the conversion rate is the same for traffic GA4 sees and traffic it doesn't. Once it is measured with its source, this is revenue you can steer and scale.",
    attrTitle: "Where your sales would land in GA4",
    attrBody:
      "Your payment system records every sale. GA4 only credits the ones it saw arrive, and without the landing pageview it can't tell which campaign brought the visitor.",
    yourSales: (n: string) => `Your ${n} monthly sales`,
    correct: "Right source",
    noSource: "Seen, no source",
    unseen: "Not seen",
    salesMonth: "sales/month",
    noSourceSub: (e: string) => `${e} without its source`,
    unseenSub: (e: string) => `${e} not recorded`,
    attrFoot: "Without a consent dependency, the sales hidden by rejection can be tied to a channel — which is what tells you where to scale.",
    funnelTitle: "Where the unmeasured traffic sits",
    fReal: "Real visitors",
    fConsent: "Accept cookies",
    fConsentNote: (r: string) => `${r} don't accept (our client range is 40–60%)`,
    fSource: "Recorded with their source",
    fSourceNote: "40% of those who accept do so after the first pageview",
    sealTitle: "Sealmetrics",
    sealValue: "no consent loss",
    sealLine: "Visits lost to consent rejection: none. No cookies, no sampling. How much it records depends on your implementation.",
    unlockTitle: "What measuring the gap would unlock",
    u1Title: "ROAS you could correct",
    u1Body: (n: string) =>
      `${n} sales/month would reach GA4 without their source. They inflate direct and make the channels that brought them look weaker — you may be cutting campaigns that work.`,
    u2Title: (n: string) => `${n} sales/month could be attributed`,
    u2Body: (e: string) =>
      `They happen — your payment system records them — but GA4 never sees the visit. That is ${e}/month with no attribution.`,
    u3Title: "Budget decisions on the full base",
    u3Body: (a: string, t: string) =>
      `With these inputs, only ${a} of your ${t} monthly sales would be credited to their source. Every scale-or-cut decision rests on that part.`,
    ctaTitle: "See the complete picture with your data",
    ctaBody: [
      "In a 30-minute demo, we show your real traffic alongside GA4. How far the two diverge depends on your store — at ",
      "Incapto",
      " (Shopify, Consent Mode), GA4 missed 29% of visits over 48 days.",
    ],
    ctaButton: "See the Traffic GA4 Misses",
    ctaFoot: "No commitment. Just your actual data.",
    share: "Share this estimate with your team",
    copied: "Link copied",
    copy: "Copy link",
  },
  es: {
    shareBase: "https://sealmetrics.com/es/growth-calculator/",
    demoHref: "/es/demo/",
    incaptoHref: "/es/case-studies/incapto/",
    yourNumbers: "Tus números",
    threeFields: "Tres campos. Estimación al momento.",
    visitors: "Visitas mensuales a tu web",
    rejection: "Parte del tráfico que no acepta cookies",
    rejectionHint: "En nuestra experiencia con clientes, entre el 40% y el 60%. Elige el extremo que más se parezca a tu banner.",
    revenue: "Ingresos online mensuales (EUR)",
    refineShow: "+ Afinar",
    refineHide: "- Ocultar",
    refineWord: "estimación",
    cr: "Tasa de conversión (%)",
    aov: "Ticket medio (EUR)",
    derived: "derivado",
    calculate: "Ver mi potencial de crecimiento",
    sourceNote:
      "En nuestra experiencia con clientes, entre el 40% y el 60% del tráfico no acepta cookies, y de quienes las aceptan, el 40% no lo hace en la primera página vista. Sin email.",
    estimateNote: "Es una estimación a partir de nuestro rango con clientes. Cuánto depende de la tienda y del canal: mídelo en la tuya.",
    sideCta: "Ver el hueco con tus propios datos",
    sideCtaSub: "30 minutos. Usamos tu tráfico real, no estimaciones.",
    emptyTitle: "¿Qué podrías escalar con el tráfico que GA4 no sabe atribuir?",
    emptyBody:
      "Introduce tus visitas mensuales, cuántas rechazan cookies y tus ingresos. Estimamos qué parte puede ligar GA4 a la fuente que la trajo.",
    headlineLabel: "Estimación: GA4 atribuiría a su fuente real",
    ofVisits: "de tus visitas",
    visitsLine: (real: string, att: string, noSource: string, unseen: string) =>
      [`De tus `, real, ` visitas mensuales, unas `, att, ` llegarían a GA4 con su fuente, `, noSource, ` sin ella y `, unseen, ` no llegarían.`],
    rangeLine: (lo: string, hi: string) =>
      `En nuestro rango con clientes (entre el 40% y el 60% no acepta cookies): entre el ${lo} y el ${hi} de las visitas, atribuidas a su fuente real.`,
    revenueTitle: "Ingresos que GA4 no ligaría a su fuente",
    month: "Este mes",
    quarter: "Este trimestre",
    year: "Este año",
    revenueNote:
      "Supone que la tasa de conversión es la misma en el tráfico que GA4 ve y en el que no. En cuanto se mide con su fuente, es ingreso que puedes dirigir y escalar.",
    attrTitle: "Dónde acabarían tus ventas en GA4",
    attrBody:
      "Tu sistema de pagos registra todas las ventas. GA4 solo acredita las que vio llegar, y sin la primera página vista no sabe qué campaña trajo al visitante.",
    yourSales: (n: string) => `Tus ${n} ventas mensuales`,
    correct: "Fuente correcta",
    noSource: "Vistas, sin fuente",
    unseen: "No vistas",
    salesMonth: "ventas/mes",
    noSourceSub: (e: string) => `${e} sin su fuente`,
    unseenSub: (e: string) => `${e} sin registrar`,
    attrFoot: "Sin depender del consentimiento, las ventas que oculta el rechazo se pueden ligar a un canal, y eso es lo que te dice dónde escalar.",
    funnelTitle: "Dónde está el tráfico sin medir",
    fReal: "Visitas reales",
    fConsent: "Aceptan cookies",
    fConsentNote: (r: string) => `El ${r} no acepta (nuestro rango con clientes es del 40–60%)`,
    fSource: "Registradas con su fuente",
    fSourceNote: "El 40% de quienes aceptan lo hace después de la primera página vista",
    sealTitle: "Sealmetrics",
    sealValue: "sin pérdida por consentimiento",
    sealLine: "Visitas perdidas por rechazo del consentimiento: ninguna. Sin cookies, sin muestreo. Cuánto registra depende de tu implementación.",
    unlockTitle: "Qué te daría medir el hueco",
    u1Title: "Un ROAS que puedes corregir",
    u1Body: (n: string) =>
      `${n} ventas/mes llegarían a GA4 sin su fuente. Inflan el directo y hacen que los canales que las trajeron parezcan más débiles: puedes estar recortando campañas que funcionan.`,
    u2Title: (n: string) => `${n} ventas/mes que se podrían atribuir`,
    u2Body: (e: string) =>
      `Ocurren —tu sistema de pagos las registra—, pero GA4 nunca ve la visita. Son ${e}/mes sin atribución.`,
    u3Title: "Decisiones de inversión sobre la base completa",
    u3Body: (a: string, t: string) =>
      `Con estos datos, solo ${a} de tus ${t} ventas mensuales se acreditarían a su fuente. Cada decisión de escalar o recortar se apoya en esa parte.`,
    ctaTitle: "Ve el cuadro completo con tus datos",
    ctaBody: [
      "En una demo de 30 minutos te enseñamos tu tráfico real junto a GA4. Cuánto se separan depende de tu tienda: en ",
      "Incapto",
      " (Shopify, con Consent Mode), GA4 no registró el 29% de las visitas en 48 días.",
    ],
    ctaButton: "Ver el tráfico que GA4 no ve",
    ctaFoot: "Sin compromiso. Solo tus datos reales.",
    share: "Comparte esta estimación con tu equipo",
    copied: "Enlace copiado",
    copy: "Copiar enlace",
  },
} as const;

/* ===========================================
   Formatting helpers
   =========================================== */

function formatEur(n: number, loc: Locale): string {
  if (loc === "es") {
    if (n >= 1_000_000) return `${(n / 1_000_000).toLocaleString("es", { maximumFractionDigits: 1 })} M€`;
    if (n >= 1_000) return `${Math.round(n / 1_000).toLocaleString("es")} k€`;
    return `${Math.round(n).toLocaleString("es")} €`;
  }
  if (n >= 1_000_000) return `€${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `€${Math.round(n / 1_000).toLocaleString("en")}K`;
  return `€${Math.round(n).toLocaleString("en")}`;
}

function formatNumber(n: number, loc: Locale): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toLocaleString(loc, { maximumFractionDigits: 1 })}M`;
  if (n >= 10_000) return `${Math.round(n / 1_000).toLocaleString(loc)}K`;
  return Math.round(n).toLocaleString(loc);
}

function formatPct(share: number): string {
  return `${Math.round(share * 100)}%`;
}

function formatInputNumber(value: string, loc: Locale): string {
  const digits = value.replace(/[^\d]/g, "");
  if (!digits) return "";
  return parseInt(digits, 10).toLocaleString(loc);
}

function parseInputNumber(value: string): number {
  return parseInt(value.replace(/[^\d]/g, ""), 10) || 0;
}

function parseDecimal(value: string): number {
  return parseFloat(value.replace(",", "."));
}

/* ===========================================
   Calculator component
   =========================================== */

export function Calculator({ locale = "en" }: { locale?: Locale }) {
  const t = COPY[locale];

  // Primary inputs
  const [visitorsRaw, setVisitorsRaw] = useState("");
  const [rejection, setRejection] = useState<number>(REJECTION_DEFAULT);
  const [revenueRaw, setRevenueRaw] = useState("");

  // Advanced inputs (optional refinement)
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [conversionRate, setConversionRate] = useState(locale === "es" ? "2,0" : "2.0");
  const [avgOrderValue, setAvgOrderValue] = useState("");

  // UI state
  const [hasCalculated, setHasCalculated] = useState(false);
  const [copied, setCopied] = useState(false);

  // Parse inputs
  const visitors = parseInputNumber(visitorsRaw);
  const monthlyRevenue = parseInputNumber(revenueRaw);

  const crRate = parseDecimal(conversionRate) / 100 || 0.02;
  const derivedAov = visitors > 0 && crRate > 0 ? monthlyRevenue / (visitors * crRate) : 0;
  const aov = showAdvanced && avgOrderValue ? parseDecimal(avgOrderValue) || derivedAov : derivedAov;

  // Model shares
  const shares = consentShares(rejection);
  const low = consentShares(REJECTION_MAX);
  const high = consentShares(REJECTION_MIN);

  // Visits
  const attributedVisits = Math.round(visitors * shares.attributed);
  const noSourceVisits = Math.round(visitors * shares.seenWithoutSource);
  const unseenVisits = visitors - attributedVisits - noSourceVisits;
  const acceptVisits = attributedVisits + noSourceVisits;

  // Revenue GA4 would not tie to its source (same conversion rate assumed)
  const untiedMonthly = monthlyRevenue * (1 - shares.attributed);

  // Sales
  const realConversions = Math.round(visitors * crRate);
  const correctSales = Math.round(realConversions * shares.attributed);
  const noSourceSales = Math.round(realConversions * shares.seenWithoutSource);
  const unseenSales = realConversions - correctSales - noSourceSales;
  const noSourceRevenue = noSourceSales * aov;
  const unseenRevenue = unseenSales * aov;

  const buildShareUrl = useCallback(() => {
    const params = new URLSearchParams({
      v: String(visitors),
      j: String(Math.round(rejection * 100)),
      r: String(monthlyRevenue),
    });
    return `${t.shareBase}?${params.toString()}`;
  }, [visitors, rejection, monthlyRevenue, t.shareBase]);

  // Read URL params on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const v = params.get("v");
    const j = params.get("j");
    const r = params.get("r");
    if (v && parseInt(v, 10) > 0) {
      setVisitorsRaw(parseInt(v, 10).toLocaleString(locale));
      if (j && parseInt(j, 10) > 0) setRejection(clampRejection(parseInt(j, 10) / 100));
      if (r) setRevenueRaw(parseInt(r, 10).toLocaleString(locale));
      setHasCalculated(true);
    }
  }, [locale]);

  const handleCalculate = () => {
    if (visitors > 0 && monthlyRevenue > 0) {
      setHasCalculated(true);
      pushEvent({
        event: "growth_calculator_used",
        rejection: String(Math.round(rejection * 100)),
        visitors: String(visitors),
      });
      const url = new URL(window.location.href);
      url.searchParams.delete("c");
      url.searchParams.set("v", String(visitors));
      url.searchParams.set("j", String(Math.round(rejection * 100)));
      url.searchParams.set("r", String(monthlyRevenue));
      window.history.replaceState({}, "", url.toString());
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(buildShareUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputClasses =
    "w-full px-4 py-3 text-[0.95rem] border border-warm-200 rounded-[4px] bg-white text-text-primary focus:border-text-body focus:outline-none focus-visible:outline-2 focus-visible:outline-blue-accent focus-visible:outline-offset-2 transition-colors";
  const labelClasses = "block text-[0.8rem] font-medium text-text-body mb-1.5";

  const funnelSteps = [
    { label: t.fReal, value: visitors, pct: 100, note: null as string | null },
    { label: t.fConsent, value: acceptVisits, pct: (1 - shares.rejection) * 100, note: t.fConsentNote(formatPct(shares.rejection)) },
    { label: t.fSource, value: attributedVisits, pct: shares.attributed * 100, note: t.fSourceNote },
  ];

  const mono = (s: string, cls = "text-text-primary") => (
    <span className={`font-mono font-medium ${cls}`}>{s}</span>
  );
  const visitsLine = t.visitsLine(
    formatNumber(visitors, locale),
    formatNumber(attributedVisits, locale),
    formatNumber(noSourceVisits, locale),
    formatNumber(unseenVisits, locale),
  );

  return (
    <div>
      {/* Two-column layout: inputs left, results right */}
      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-12 lg:gap-16 items-start">
        {/* ========== INPUTS ========== */}
        <div className="lg:sticky lg:top-32">
          <div className="bg-warm-white border border-warm-100 rounded-[4px] p-8 sm:p-10">
            <h2 className="font-serif text-[1.35rem] text-text-primary mb-1">{t.yourNumbers}</h2>
            <p className="text-[0.8rem] text-text-tertiary mb-8">{t.threeFields}</p>

            <div className="space-y-5">
              {/* Monthly visitors */}
              <div>
                <label htmlFor="calc-visitors" className={labelClasses}>{t.visitors}</label>
                <input
                  id="calc-visitors"
                  type="text"
                  inputMode="numeric"
                  value={visitorsRaw}
                  onChange={(e) => {
                    setVisitorsRaw(formatInputNumber(e.target.value, locale));
                    setHasCalculated(false);
                  }}
                  placeholder={locale === "es" ? "p. ej. 500.000" : "e.g. 500,000"}
                  className={inputClasses}
                />
              </div>

              {/* Consent rejection */}
              <div>
                <label htmlFor="calc-rejection" className={labelClasses}>{t.rejection}</label>
                <select
                  id="calc-rejection"
                  value={String(rejection)}
                  onChange={(e) => {
                    setRejection(clampRejection(parseFloat(e.target.value)));
                    setHasCalculated(false);
                  }}
                  className={inputClasses}
                >
                  {REJECTION_OPTIONS.map((r) => (
                    <option key={r} value={String(r)}>
                      {formatPct(r)}
                    </option>
                  ))}
                </select>
                <p className="text-[0.7rem] text-text-tertiary mt-1.5 leading-relaxed">{t.rejectionHint}</p>
              </div>

              {/* Monthly revenue */}
              <div>
                <label htmlFor="calc-revenue" className={labelClasses}>{t.revenue}</label>
                <input
                  id="calc-revenue"
                  type="text"
                  inputMode="numeric"
                  value={revenueRaw}
                  onChange={(e) => {
                    setRevenueRaw(formatInputNumber(e.target.value, locale));
                    setHasCalculated(false);
                  }}
                  placeholder={locale === "es" ? "p. ej. 2.000.000" : "e.g. 2,000,000"}
                  className={inputClasses}
                />
              </div>

              {/* Advanced toggle */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-[0.8rem] text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                >
                  {showAdvanced ? t.refineHide : t.refineShow} {t.refineWord}
                </button>
                {showAdvanced && (
                  <div className="mt-4 space-y-4 pt-4 border-t border-warm-100">
                    <div>
                      <label htmlFor="calc-cr" className={labelClasses}>{t.cr}</label>
                      <input
                        id="calc-cr"
                        type="text"
                        inputMode="decimal"
                        value={conversionRate}
                        onChange={(e) => {
                          setConversionRate(e.target.value);
                          setHasCalculated(false);
                        }}
                        placeholder={locale === "es" ? "2,0" : "2.0"}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="calc-aov" className={labelClasses}>{t.aov}</label>
                      <input
                        id="calc-aov"
                        type="text"
                        inputMode="decimal"
                        value={avgOrderValue}
                        onChange={(e) => {
                          setAvgOrderValue(e.target.value);
                          setHasCalculated(false);
                        }}
                        placeholder={derivedAov > 0 ? `${Math.round(derivedAov)} (${t.derived})` : "80"}
                        className={inputClasses}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Calculate button */}
              <button
                type="button"
                onClick={handleCalculate}
                disabled={visitors === 0 || monthlyRevenue === 0}
                className="w-full py-3.5 text-[0.95rem] font-medium text-white bg-text-primary rounded-[4px] hover:bg-[#333] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t.calculate}
              </button>

              <p className="text-[0.7rem] text-text-tertiary text-center leading-relaxed">{t.sourceNote}</p>

              {hasCalculated && (
                <div className="mt-6 pt-6 border-t border-warm-100">
                  <p className="text-[0.8rem] text-text-tertiary mb-3">{t.estimateNote}</p>
                  <a
                    href={t.demoHref}
                    className="block w-full py-3 text-center text-[0.9rem] font-medium text-white bg-text-primary rounded-[4px] no-underline hover:bg-[#333] transition-colors mb-2"
                  >
                    {t.sideCta}
                  </a>
                  <p className="text-[0.72rem] text-text-tertiary text-center">{t.sideCtaSub}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========== RESULTS ========== */}
        <div>
          {!hasCalculated ? (
            <div className="p-12 sm:p-16 border border-warm-100 rounded-[4px] text-center bg-warm-white">
              <div className="max-w-[320px] mx-auto">
                <p className="font-serif text-[1.5rem] text-text-primary mb-3">{t.emptyTitle}</p>
                <p className="text-[0.85rem] text-text-tertiary leading-relaxed">{t.emptyBody}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Primary result card */}
              <div className="p-8 sm:p-10 border border-warm-100 rounded-[4px] bg-warm-white">
                <p className="text-[0.8rem] text-text-tertiary mb-3">{t.headlineLabel}</p>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-mono text-[4rem] sm:text-[5rem] font-medium text-red-alert leading-none tracking-tight">
                    {formatPct(shares.attributed)}
                  </span>
                  <span className="text-[1.1rem] text-text-secondary">{t.ofVisits}</span>
                </div>
                <p className="text-[0.9rem] text-text-secondary leading-relaxed">
                  {visitsLine[0]}
                  {mono(visitsLine[1])}
                  {visitsLine[2]}
                  {mono(visitsLine[3], "text-green-muted")}
                  {visitsLine[4]}
                  {mono(visitsLine[5])}
                  {visitsLine[6]}
                  {mono(visitsLine[7])}
                  {visitsLine[8]}
                </p>
                <p className="text-[0.75rem] text-text-tertiary mt-3 leading-relaxed">
                  {t.rangeLine(formatPct(low.attributed), formatPct(high.attributed))}
                </p>
              </div>

              {/* Revenue impact */}
              <div className="p-8 sm:p-10 border-2 border-green-muted/30 rounded-[4px] bg-white">
                <p className="text-[0.75rem] font-medium tracking-[0.06em] uppercase text-green-muted mb-5">
                  {t.revenueTitle}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { l: t.month, v: untiedMonthly, c: "text-text-primary" },
                    { l: t.quarter, v: untiedMonthly * 3, c: "text-text-primary" },
                    { l: t.year, v: untiedMonthly * 12, c: "text-green-muted" },
                  ].map((x) => (
                    <div key={x.l}>
                      <p className="text-[0.75rem] text-text-tertiary uppercase tracking-wider mb-1">{x.l}</p>
                      <p className={`font-mono text-[1.6rem] sm:text-[1.8rem] font-medium leading-tight ${x.c}`}>
                        {formatEur(x.v, locale)}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-[0.8rem] text-text-secondary mt-5 leading-relaxed">{t.revenueNote}</p>
              </div>

              {/* Attribution */}
              <div className="p-8 sm:p-10 border border-warm-100 rounded-[4px] bg-warm-white">
                <h3 className="font-serif text-[1.15rem] text-text-primary mb-2">{t.attrTitle}</h3>
                <p className="text-[0.8rem] text-text-secondary mb-6 leading-relaxed">{t.attrBody}</p>

                <div className="mb-6">
                  <div className="flex justify-between text-[0.75rem] text-text-tertiary uppercase tracking-wider mb-2">
                    <span>{t.yourSales(formatNumber(realConversions, locale))}</span>
                    <span>100%</span>
                  </div>
                  <div className="h-10 flex rounded-[2px] overflow-hidden">
                    <div className="bg-green-muted transition-all duration-700" style={{ width: `${shares.attributed * 100}%` }} title={t.correct} />
                    <div className="bg-[#E8B84B] transition-all duration-700" style={{ width: `${shares.seenWithoutSource * 100}%` }} title={t.noSource} />
                    <div className="bg-warm-300 transition-all duration-700" style={{ width: `${shares.unseen * 100}%` }} title={t.unseen} />
                  </div>
                  <div className="flex flex-wrap gap-5 mt-3">
                    {[
                      { c: "bg-green-muted", l: t.correct, p: shares.attributed },
                      { c: "bg-[#E8B84B]", l: t.noSource, p: shares.seenWithoutSource },
                      { c: "bg-warm-300", l: t.unseen, p: shares.unseen },
                    ].map((x) => (
                      <div key={x.l} className="flex items-center gap-1.5">
                        <div className={`w-2.5 h-2.5 rounded-[1px] ${x.c}`} />
                        <span className="text-[0.7rem] text-text-secondary">
                          {x.l} — {formatPct(x.p)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 border border-warm-100 rounded-[4px] bg-white">
                    <p className="text-[0.7rem] text-text-tertiary uppercase tracking-wider mb-1">{t.correct}</p>
                    <p className="font-mono text-[1.4rem] font-medium text-green-muted leading-tight">
                      {formatNumber(correctSales, locale)}
                    </p>
                    <p className="text-[0.7rem] text-text-tertiary mt-0.5">{t.salesMonth}</p>
                  </div>
                  <div className="p-4 border border-warm-100 rounded-[4px] bg-white">
                    <p className="text-[0.7rem] text-text-tertiary uppercase tracking-wider mb-1">{t.noSource}</p>
                    <p className="font-mono text-[1.4rem] font-medium text-[#C8960A] leading-tight">
                      {formatNumber(noSourceSales, locale)}
                    </p>
                    <p className="text-[0.7rem] text-text-tertiary mt-0.5">{t.noSourceSub(formatEur(noSourceRevenue, locale))}</p>
                  </div>
                  <div className="p-4 border border-warm-100 rounded-[4px] bg-white">
                    <p className="text-[0.7rem] text-text-tertiary uppercase tracking-wider mb-1">{t.unseen}</p>
                    <p className="font-mono text-[1.4rem] font-medium text-warm-400 leading-tight">
                      {formatNumber(unseenSales, locale)}
                    </p>
                    <p className="text-[0.7rem] text-text-tertiary mt-0.5">{t.unseenSub(formatEur(unseenRevenue, locale))}</p>
                  </div>
                </div>

                <p className="text-[0.8rem] text-text-secondary mt-5 leading-relaxed">{t.attrFoot}</p>
              </div>

              {/* Funnel breakdown */}
              <div className="p-8 sm:p-10 border border-warm-100 rounded-[4px] bg-warm-white">
                <h3 className="font-serif text-[1.15rem] text-text-primary mb-6">{t.funnelTitle}</h3>
                <div className="space-y-5">
                  {funnelSteps.map((step, i) => {
                    const isLast = i === funnelSteps.length - 1;
                    return (
                      <div key={step.label}>
                        <div className="flex justify-between text-[0.8rem] mb-1.5">
                          <span className="text-text-secondary">{step.label}</span>
                          <span className="font-mono text-text-primary font-medium">
                            {formatNumber(step.value, locale)}
                            <span className="text-text-tertiary ml-1.5">({Math.round(step.pct)}%)</span>
                          </span>
                        </div>
                        <div className="h-6 bg-warm-100 rounded-[2px] overflow-hidden">
                          <div
                            className={`h-full rounded-[2px] transition-all duration-700 ease-out ${
                              isLast ? "bg-warm-300" : i === 0 ? "bg-text-primary" : "bg-text-tertiary"
                            }`}
                            style={{ width: `${Math.max(step.pct, 1)}%` }}
                          />
                        </div>
                        {step.note && <p className="text-[0.7rem] text-text-tertiary mt-1">{step.note}</p>}
                      </div>
                    );
                  })}

                  {/* Sealmetrics bar */}
                  <div className="pt-3 mt-3 border-t border-warm-200">
                    <div className="flex justify-between text-[0.8rem] mb-1.5">
                      <span className="text-text-secondary font-medium">{t.sealTitle}</span>
                      <span className="font-mono text-green-muted font-medium">{t.sealValue}</span>
                    </div>
                    <div className="h-6 bg-warm-100 rounded-[2px] overflow-hidden">
                      <div className="h-full bg-green-muted rounded-[2px] w-full" />
                    </div>
                    <p className="text-[0.7rem] text-text-tertiary mt-1">{t.sealLine}</p>
                  </div>
                </div>
              </div>

              {/* What measuring the gap would unlock */}
              <div className="p-8 sm:p-10 border border-warm-100 rounded-[4px] bg-white">
                <h3 className="font-serif text-[1.15rem] text-text-primary mb-5">{t.unlockTitle}</h3>
                <div className="space-y-4">
                  {[
                    { h: t.u1Title, b: t.u1Body(formatNumber(noSourceSales, locale)) },
                    { h: t.u2Title(formatNumber(unseenSales, locale)), b: t.u2Body(formatEur(unseenRevenue, locale)) },
                    { h: t.u3Title, b: t.u3Body(formatNumber(correctSales, locale), formatNumber(realConversions, locale)) },
                  ].map((x) => (
                    <div key={x.h} className="flex gap-4">
                      <div className="w-1 bg-green-muted/40 rounded-full flex-shrink-0" />
                      <div>
                        <p className="text-[0.85rem] text-text-primary font-medium">{x.h}</p>
                        <p className="text-[0.8rem] text-text-secondary mt-0.5">{x.b}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="p-8 sm:p-10 border border-warm-100 rounded-[4px] bg-warm-white text-center">
                <p className="font-serif text-[1.4rem] text-text-primary mb-2">{t.ctaTitle}</p>
                <p className="text-[0.85rem] text-text-secondary mb-6 max-w-[480px] mx-auto">
                  {t.ctaBody[0]}
                  <Link href={t.incaptoHref} className="underline underline-offset-2">
                    {t.ctaBody[1]}
                  </Link>
                  {t.ctaBody[2]}
                </p>
                <Link
                  href={t.demoHref}
                  className="inline-flex items-center px-10 py-4 text-[1rem] font-medium text-white bg-text-primary rounded-[4px] no-underline hover:bg-[#333] transition-colors"
                >
                  {t.ctaButton}
                </Link>
                <p className="mt-4 text-[0.75rem] text-text-tertiary">{t.ctaFoot}</p>
              </div>

              {/* Share bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border border-warm-100 rounded-[4px] bg-warm-50">
                <p className="text-[0.8rem] text-text-secondary">{t.share}</p>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-[0.8rem] font-medium text-text-primary border border-warm-200 rounded-[4px] bg-white hover:bg-warm-white transition-colors cursor-pointer"
                >
                  {copied ? (
                    t.copied
                  ) : (
                    <>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                      {t.copy}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
