"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { pushEvent } from "@/lib/analytics";
import { submitFirstPartyForm } from "@/lib/forms/submit";
import { LeadTurnstile } from "@/components/forms/LeadTurnstile";
import {
  REJECTION_DEFAULT,
  REJECTION_MAX,
  REJECTION_MIN,
  clampRejection,
  consentRange,
  consentShares,
} from "@/lib/calculators/consent-model";

/* ===========================================
   Model — see src/lib/calculators/consent-model.ts
   Two approved inputs only (client experience, founder decision 2026-09-21):
   40–60% of traffic doesn't accept cookies; of those who accept, 40% don't
   accept on the first pageview. No per-country figures, no ad-blocker,
   sampling or early-exit defaults: those are optional user inputs at 0.
   =========================================== */

type Locale = "en" | "es";
type CountryCode = "DE" | "FR" | "NL" | "ES" | "IT" | "UK" | "EU" | "US";
const COUNTRY_CODES: CountryCode[] = ["DE", "FR", "NL", "ES", "IT", "UK", "EU", "US"];

const COPY = {
  en: {
    numLocale: "en",
    countries: { DE: "Germany", FR: "France", NL: "Netherlands", ES: "Spain", IT: "Italy", UK: "United Kingdom", EU: "Other EU country", US: "United States" } as Record<CountryCode, string>,
    yourNumbers: "Your numbers",
    fourFields: "Four fields. Instant estimate.",
    visitors: "Monthly website visitors",
    visitorsHint: "All visits, not only what GA4 reports.",
    market: "Primary market",
    marketNote: "Rejection varies by country and by banner design; in our experience with clients the overall range is 40–60%. The market does not change the numbers.",
    rejection: "Share of traffic that doesn't accept cookies",
    rejectionHint: "Set within our client range, 40–60%. Default 50%.",
    revenue: "Monthly online revenue (EUR)",
    refineShow: "+ Refine",
    refineHide: "- Hide",
    refineWord: "estimate",
    cr: "Conversion rate (%)",
    aov: "Average order value (EUR)",
    derived: "derived",
    adBlockers: "Ad blockers (% of consenting visitors, optional)",
    earlyExits: "Visitors who leave before the tag fires (%, optional)",
    optionalNote: "Not included by default — no figure we can stand behind. Add your own if you have measured it.",
    calculate: "Estimate your data loss",
    noEmail: "No email required.",
    estimateNote: "Estimate based on what we see across our clients (40–60% don't accept cookies; 40% of those who do, not on the first pageview). Measure your own store to know.",
    freeCta: "Open my free account — measure your own gap",
    freeHref: "/free-account/",
    freeSub: "First 1M events free · run it next to GA4 on your own traffic.",
    reportPrompt: "Want this estimate by email?",
    reportSent: "Report sent. Check your inbox.",
    sendReport: "Send report",
    reportError: "We could not send the report. Please try again.",
    emptyTitle: "How much are you not seeing?",
    emptyBody: "Enter your monthly visitors, primary market and revenue. We estimate what GA4 would see with our client range of consent rejection.",
    withInputs: "With these inputs, GA4 would credit to their real source",
    ofVisits: "of your visits",
    breakdown: (noSource: string, unseen: string) => `The rest: ${noSource} seen without their source, ${unseen} not seen at all.`,
    rangeLine: (attHi: string, attLo: string) =>
      `Across our client range (40–60% rejection): ${attHi}–${attLo} of visits credited to their real source.`,
    visitsLine: (att: string, real: string, noSource: string, unseen: string) => [`Of your `, real, ` monthly visits, about `, att, ` would reach GA4 with their source, `, noSource, ` without it, and `, unseen, ` not at all.`],
    incapto: "At Incapto (Shopify, Consent Mode), measured: GA4 missed 29% of visits — Consent Mode and your setup change the number. Measure your own store.",
    incaptoHref: "/case-studies/incapto/",
    revenueTitle: "Revenue GA4 would not tie to its source",
    month: "This month",
    quarter: "This quarter",
    year: "This year",
    revenueNote: (att: string) => `Assumes the conversion rate is the same for traffic GA4 sees and traffic it doesn't. With these inputs, channel decisions rest on the ${att} of revenue GA4 can attribute.`,
    attrTitle: "Where your sales would land in GA4",
    attrBody: "Your payment system records every sale. GA4 only credits the ones it saw arrive, and without the landing pageview it can't tell which campaign brought the visitor.",
    yourSales: (n: string) => `Your ${n} monthly sales`,
    correct: "Right source",
    noSource: "Seen, no source",
    invisible: "Not seen",
    salesMonth: "sales/month",
    noSourceSub: (e: string) => `${e} without its source`,
    invisibleSub: (e: string) => `${e} not recorded`,
    attrFoot: (p: string, q: string) => [`With these inputs, you would be steering spend on the `, p, ` of sales GA4 attributes to their source. The other `, q, ` are credited to the wrong channel or not recorded.`],
    funnelTitle: "Where the data disappears",
    funnelBody: "Consent is the part we can size from client experience. Ad blockers, browser restrictions and exits before a heavy tag fires cut further, but we have no figure we can stand behind, so they only count if you enter your own.",
    fReal: "Real visitors",
    fConsent: "Accept cookies",
    fConsentNote: (r: string) => `${r} don't accept (our client range is 40–60%)`,
    fAdBlock: "After ad blockers (your input)",
    fExit: "After early exits (your input)",
    fSource: "Recorded with their source",
    fSourceNote: "40% of those who accept do so after the first pageview",
    sealTitle: "Sealmetrics",
    sealLine: "Visits lost to consent rejection: none. No cookies, no consent dependency, no sampling. How much it records depends on your implementation.",
    meansTitle: "What this means for your decisions",
    m1Title: "Your ROAS is built on part of your sales",
    m1Body: (n: string) => `${n} sales/month would reach GA4 without their source. They inflate direct and make the channels that brought them look weaker.`,
    m2Title: (n: string) => `${n} sales/month would not appear in GA4 at all`,
    m2Body: (e: string) => `They happen — your payment system records them — but analytics can't tell you what drove them. That is ${e}/month with no attribution.`,
    m3Title: (p: string) => `Budget decisions on ${p} of your sales`,
    m3Body: (a: string, t: string) => `Only ${a} of your ${t} monthly sales would be attributed to their source. This is an estimate; your own store will land somewhere else.`,
    ctaTitle: "Stop estimating. Measure your own gap.",
    ctaBody: "Open a free account, run Sealmetrics next to GA4 for a few weeks and compare both against the orders your store recorded.",
    ctaButton: "Open my free account",
    ctaFoot: "First 1M events free. No card to start.",
    share: "Share this estimate with your team",
    copied: "Link copied",
    copy: "Copy link",
  },
  es: {
    numLocale: "es",
    countries: { DE: "Alemania", FR: "Francia", NL: "Países Bajos", ES: "España", IT: "Italia", UK: "Reino Unido", EU: "Otro país de la UE", US: "Estados Unidos" } as Record<CountryCode, string>,
    yourNumbers: "Tus números",
    fourFields: "Cuatro campos. Estimación al momento.",
    visitors: "Visitas mensuales a tu web",
    visitorsHint: "Todas las visitas, no solo las que reporta GA4.",
    market: "Mercado principal",
    marketNote: "El rechazo varía según el país y el diseño del banner; en nuestra experiencia con clientes, el rango global es del 40–60%. El mercado no cambia las cifras.",
    rejection: "Parte del tráfico que no acepta cookies",
    rejectionHint: "Dentro de nuestro rango con clientes, 40–60%. Por defecto, 50%.",
    revenue: "Ingresos online mensuales (EUR)",
    refineShow: "+ Afinar",
    refineHide: "- Ocultar",
    refineWord: "estimación",
    cr: "Tasa de conversión (%)",
    aov: "Ticket medio (EUR)",
    derived: "derivado",
    adBlockers: "Bloqueadores (% de quienes aceptan, opcional)",
    earlyExits: "Visitas que se van antes de que cargue la etiqueta (%, opcional)",
    optionalNote: "No se incluye por defecto: no tenemos una cifra que podamos defender. Añade la tuya si la has medido.",
    calculate: "Estima tu pérdida de datos",
    noEmail: "Sin email.",
    estimateNote: "Estimación basada en lo que vemos en nuestros clientes (entre el 40% y el 60% no acepta cookies; de quienes las aceptan, el 40% no lo hace en la primera página vista). Mide tu propia tienda para saberlo.",
    freeCta: "Abrir mi cuenta gratis — mide tu propio hueco",
    freeHref: "/es/cuenta-gratis/",
    freeSub: "El primer millón de eventos gratis · ponlo junto a GA4 sobre tu propio tráfico.",
    reportPrompt: "¿Quieres esta estimación por email?",
    reportSent: "Informe enviado. Revisa tu bandeja.",
    sendReport: "Enviar informe",
    reportError: "No hemos podido enviar el informe. Inténtalo de nuevo.",
    emptyTitle: "¿Cuánto no estás viendo?",
    emptyBody: "Introduce tus visitas mensuales, tu mercado y tus ingresos. Estimamos lo que vería GA4 con nuestro rango de rechazo del consentimiento en clientes.",
    withInputs: "Con estos datos, GA4 atribuiría a su fuente real",
    ofVisits: "de tus visitas",
    breakdown: (noSource: string, unseen: string) => `El resto: el ${noSource} lo vería sin su fuente y el ${unseen} no lo vería.`,
    rangeLine: (attHi: string, attLo: string) =>
      `En nuestro rango con clientes (40–60% de rechazo): entre el ${attHi} y el ${attLo} de las visitas, atribuidas a su fuente real.`,
    visitsLine: (att: string, real: string, noSource: string, unseen: string) => [`De tus `, real, ` visitas mensuales, unas `, att, ` llegarían a GA4 con su fuente, `, noSource, ` sin ella y `, unseen, ` no llegarían.`],
    incapto: "En Incapto (Shopify, con Consent Mode), medido: GA4 no registró el 29% de las visitas — Consent Mode y tu configuración cambian la cifra. Mide tu propia tienda.",
    incaptoHref: "/es/case-studies/incapto/",
    revenueTitle: "Ingresos que GA4 no ligaría a su fuente",
    month: "Este mes",
    quarter: "Este trimestre",
    year: "Este año",
    revenueNote: (att: string) => `Supone que la tasa de conversión es la misma en el tráfico que GA4 ve y en el que no. Con estos datos, las decisiones por canal se apoyan en el ${att} de los ingresos que GA4 puede atribuir.`,
    attrTitle: "Dónde acabarían tus ventas en GA4",
    attrBody: "Tu sistema de pagos registra todas las ventas. GA4 solo acredita las que vio llegar, y sin la primera página vista no sabe qué campaña trajo al visitante.",
    yourSales: (n: string) => `Tus ${n} ventas mensuales`,
    correct: "Fuente correcta",
    noSource: "Vistas, sin fuente",
    invisible: "No vistas",
    salesMonth: "ventas/mes",
    noSourceSub: (e: string) => `${e} sin su fuente`,
    invisibleSub: (e: string) => `${e} sin registrar`,
    attrFoot: (p: string, q: string) => [`Con estos datos, estarías dirigiendo la inversión con el `, p, ` de las ventas que GA4 atribuye a su fuente. El otro `, q, ` se acredita al canal equivocado o no se registra.`],
    funnelTitle: "Dónde desaparece el dato",
    funnelBody: "El consentimiento es la parte que podemos dimensionar con la experiencia de clientes. Los bloqueadores, las restricciones del navegador y las salidas antes de que cargue una etiqueta pesada recortan más, pero no tenemos una cifra que podamos defender, así que solo cuentan si introduces la tuya.",
    fReal: "Visitas reales",
    fConsent: "Aceptan cookies",
    fConsentNote: (r: string) => `El ${r} no acepta (nuestro rango con clientes es del 40–60%)`,
    fAdBlock: "Tras bloqueadores (tu dato)",
    fExit: "Tras salidas tempranas (tu dato)",
    fSource: "Registradas con su fuente",
    fSourceNote: "El 40% de quienes aceptan lo hace después de la primera página vista",
    sealTitle: "Sealmetrics",
    sealLine: "Visitas perdidas por rechazo del consentimiento: ninguna. Sin cookies, sin depender del consentimiento, sin muestreo. Cuánto registra depende de tu implementación.",
    meansTitle: "Qué significa para tus decisiones",
    m1Title: "Tu ROAS se calcula sobre parte de tus ventas",
    m1Body: (n: string) => `${n} ventas/mes llegarían a GA4 sin su fuente. Inflan el directo y hacen que los canales que las trajeron parezcan más débiles.`,
    m2Title: (n: string) => `${n} ventas/mes no aparecerían en GA4`,
    m2Body: (e: string) => `Ocurren — tu sistema de pagos las registra —, pero la analítica no te dice qué las generó. Son ${e}/mes sin atribución.`,
    m3Title: (p: string) => `Decisiones de inversión sobre el ${p} de tus ventas`,
    m3Body: (a: string, t: string) => `Solo ${a} de tus ${t} ventas mensuales se atribuirían a su fuente. Es una estimación; tu tienda caerá en otro punto.`,
    ctaTitle: "Deja de estimar. Mide tu propio hueco.",
    ctaBody: "Abre una cuenta gratis, pon Sealmetrics junto a GA4 unas semanas y compara ambos con los pedidos que registró tu tienda.",
    ctaButton: "Abrir mi cuenta gratis",
    ctaFoot: "El primer millón de eventos, gratis. Sin tarjeta para empezar.",
    share: "Comparte esta estimación con tu equipo",
    copied: "Enlace copiado",
    copy: "Copiar enlace",
  },
} as const;

/* ===========================================
   Formatting helpers
   =========================================== */

function formatEur(n: number, l: string): string {
  if (n >= 1_000_000) return `€${(n / 1_000_000).toLocaleString(l, { maximumFractionDigits: 1, minimumFractionDigits: 1 })}M`;
  if (n >= 1_000) return `€${Math.round(n / 1_000).toLocaleString(l)}K`;
  return `€${Math.round(n).toLocaleString(l)}`;
}

function formatNumber(n: number, l: string): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toLocaleString(l, { maximumFractionDigits: 1, minimumFractionDigits: 1 })}M`;
  if (n >= 10_000) return `${Math.round(n / 1_000).toLocaleString(l)}K`;
  return Math.round(n).toLocaleString(l);
}

const pct = (x: number) => `${Math.round(x * 100)}%`;

function formatInputNumber(value: string): string {
  const digits = value.replace(/[^\d]/g, "");
  if (!digits) return "";
  return parseInt(digits, 10).toLocaleString("en");
}

function parseInputNumber(value: string): number {
  return parseInt(value.replace(/[^\d]/g, ""), 10) || 0;
}

const parsePct = (v: string) => {
  const n = parseFloat(v.replace(",", "."));
  return Number.isFinite(n) && n > 0 ? Math.min(n, 100) / 100 : 0;
};

/* ===========================================
   Calculator component
   =========================================== */

export function Calculator({ locale = "en" }: { locale?: Locale }) {
  const t = COPY[locale];
  const L = t.numLocale;
  const fmtN = (n: number) => formatNumber(n, L);
  const fmtE = (n: number) => formatEur(n, L);

  const [visitorsRaw, setVisitorsRaw] = useState("");
  const [country, setCountry] = useState<CountryCode>("DE");
  const [revenueRaw, setRevenueRaw] = useState("");
  const [rejectionPct, setRejectionPct] = useState(Math.round(REJECTION_DEFAULT * 100));

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [conversionRate, setConversionRate] = useState("2.0");
  const [avgOrderValue, setAvgOrderValue] = useState("");
  const [adBlockersRaw, setAdBlockersRaw] = useState("0");
  const [earlyExitsRaw, setEarlyExitsRaw] = useState("0");

  const [hasCalculated, setHasCalculated] = useState(false);

  const visitors = parseInputNumber(visitorsRaw);
  const monthlyRevenue = parseInputNumber(revenueRaw);
  const rejection = clampRejection(rejectionPct / 100);
  const adBlockers = parsePct(adBlockersRaw);
  const earlyExits = parsePct(earlyExitsRaw);

  const crRate = parseFloat(conversionRate) / 100 || 0.02;
  const derivedAov = visitors > 0 && crRate > 0 ? monthlyRevenue / (visitors * crRate) : 0;
  const aov = showAdvanced && avgOrderValue ? parseFloat(avgOrderValue) || derivedAov : derivedAov;

  // Shares of real traffic (see consent-model.ts)
  const s = consentShares({ rejection, adBlockers, earlyExits });
  const range = consentRange({ adBlockers, earlyExits });

  const afterConsent = visitors * (1 - rejection);
  const afterAdBlock = afterConsent * (1 - adBlockers);
  const ga4Seen = Math.round(visitors * s.seen);
  const ga4Attributed = Math.round(visitors * s.attributed);
  const unseenVisitors = visitors - ga4Seen;

  // Revenue — assumes equal conversion rate across seen and unseen traffic
  const notAttributedRevenueMonthly = monthlyRevenue * (1 - s.attributed);

  // Sales — same assumption
  const realConversions = Math.round(visitors * crRate);
  const correctlyAttributed = Math.round(realConversions * s.attributed);
  const withoutSourceSales = Math.round(realConversions * s.seenWithoutSource);
  const invisibleSales = Math.max(0, realConversions - correctlyAttributed - withoutSourceSales);
  const correctAttributionRate = realConversions > 0 ? correctlyAttributed / realConversions : 0;
  const withoutSourceRevenue = withoutSourceSales * aov;
  const invisibleSalesRevenue = invisibleSales * aov;

  const buildShareUrl = useCallback(() => {
    const params = new URLSearchParams({
      v: String(visitors),
      c: country,
      r: String(monthlyRevenue),
      j: String(rejectionPct),
    });
    const base = locale === "es" ? "https://sealmetrics.com/es/data-loss-calculator/" : "https://sealmetrics.com/data-loss-calculator/";
    return `${base}?${params.toString()}`;
  }, [visitors, country, monthlyRevenue, rejectionPct, locale]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const v = params.get("v");
    const c = params.get("c");
    const r = params.get("r");
    const j = params.get("j");
    if (v && parseInt(v, 10) > 0) {
      setVisitorsRaw(parseInt(v, 10).toLocaleString("en"));
      if (c && (COUNTRY_CODES as string[]).includes(c)) setCountry(c as CountryCode);
      if (r) setRevenueRaw(parseInt(r, 10).toLocaleString("en"));
      if (j) setRejectionPct(Math.round(clampRejection(parseInt(j, 10) / 100) * 100));
      setHasCalculated(true);
    }
  }, []);

  const handleCalculate = () => {
    if (visitors > 0 && monthlyRevenue > 0) {
      setHasCalculated(true);
      pushEvent({
        event: "calculator_used",
        country,
        visitors: String(visitors),
      });
      const url = new URL(window.location.href);
      url.searchParams.set("v", String(visitors));
      url.searchParams.set("c", country);
      url.searchParams.set("r", String(monthlyRevenue));
      url.searchParams.set("j", String(rejectionPct));
      window.history.replaceState({}, "", url.toString());
    }
  };

  const [copied, setCopied] = useState(false);
  const handleCopyLink = () => {
    navigator.clipboard.writeText(buildShareUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const [reportEmail, setReportEmail] = useState("");
  const [reportSent, setReportSent] = useState(false);
  const [reportTurnstileToken, setReportTurnstileToken] = useState<string | null>(null);
  const [reportTurnstileResetKey, setReportTurnstileResetKey] = useState(0);
  const [reportError, setReportError] = useState(false);

  const inputClasses =
    "w-full px-4 py-3 text-[0.95rem] border border-warm-200 rounded-[4px] bg-white text-text-primary focus:border-text-body focus:outline-none focus-visible:outline-2 focus-visible:outline-blue-accent focus-visible:outline-offset-2 transition-colors";
  const labelClasses = "block text-[0.8rem] font-medium text-text-body mb-1.5";

  const funnelSteps: { label: string; value: number; pct: number; note: string | null }[] = [
    { label: t.fReal, value: visitors, pct: 100, note: null },
    {
      label: t.fConsent,
      value: Math.round(afterConsent),
      pct: visitors > 0 ? (afterConsent / visitors) * 100 : 0,
      note: t.fConsentNote(pct(rejection)),
    },
    ...(adBlockers > 0
      ? [{ label: t.fAdBlock, value: Math.round(afterAdBlock), pct: visitors > 0 ? (afterAdBlock / visitors) * 100 : 0, note: null }]
      : []),
    ...(earlyExits > 0
      ? [{ label: t.fExit, value: ga4Seen, pct: s.seen * 100, note: null }]
      : []),
    { label: t.fSource, value: ga4Attributed, pct: s.attributed * 100, note: t.fSourceNote },
  ];

  const visitsLine = t.visitsLine(fmtN(ga4Attributed), fmtN(visitors), fmtN(ga4Seen - ga4Attributed), fmtN(unseenVisitors));
  const attrFoot = t.attrFoot(pct(correctAttributionRate), pct(1 - correctAttributionRate));

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-12 lg:gap-16 items-start">
        {/* ========== INPUTS ========== */}
        <div className="lg:sticky lg:top-32">
          <div className="bg-warm-white border border-warm-100 rounded-[4px] p-8 sm:p-10">
            <h2 className="font-serif text-[1.35rem] text-text-primary mb-1">{t.yourNumbers}</h2>
            <p className="text-[0.8rem] text-text-tertiary mb-8">{t.fourFields}</p>

            <div className="space-y-5">
              <div>
                <label htmlFor="calc-visitors" className={labelClasses}>{t.visitors}</label>
                <input
                  id="calc-visitors"
                  type="text"
                  inputMode="numeric"
                  value={visitorsRaw}
                  onChange={(e) => {
                    setVisitorsRaw(formatInputNumber(e.target.value));
                    setHasCalculated(false);
                  }}
                  placeholder="500,000"
                  className={inputClasses}
                />
                <p className="text-[0.7rem] text-text-tertiary mt-1">{t.visitorsHint}</p>
              </div>

              <div>
                <label htmlFor="calc-country" className={labelClasses}>{t.market}</label>
                <select
                  id="calc-country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value as CountryCode)}
                  className={inputClasses}
                >
                  {COUNTRY_CODES.map((code) => (
                    <option key={code} value={code}>{t.countries[code]}</option>
                  ))}
                </select>
                <p className="text-[0.7rem] text-text-tertiary mt-1 leading-relaxed">{t.marketNote}</p>
              </div>

              <div>
                <label htmlFor="calc-rejection" className={labelClasses}>
                  {t.rejection}: <span className="font-mono">{rejectionPct}%</span>
                </label>
                <input
                  id="calc-rejection"
                  type="range"
                  min={REJECTION_MIN * 100}
                  max={REJECTION_MAX * 100}
                  step={1}
                  value={rejectionPct}
                  onChange={(e) => setRejectionPct(parseInt(e.target.value, 10))}
                  className="w-full"
                />
                <p className="text-[0.7rem] text-text-tertiary mt-1">{t.rejectionHint}</p>
              </div>

              <div>
                <label htmlFor="calc-revenue" className={labelClasses}>{t.revenue}</label>
                <input
                  id="calc-revenue"
                  type="text"
                  inputMode="numeric"
                  value={revenueRaw}
                  onChange={(e) => {
                    setRevenueRaw(formatInputNumber(e.target.value));
                    setHasCalculated(false);
                  }}
                  placeholder="2,000,000"
                  className={inputClasses}
                />
              </div>

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
                        onChange={(e) => setConversionRate(e.target.value)}
                        placeholder="2.0"
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
                        onChange={(e) => setAvgOrderValue(e.target.value)}
                        placeholder={derivedAov > 0 ? `${Math.round(derivedAov)} (${t.derived})` : "80"}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="calc-adblock" className={labelClasses}>{t.adBlockers}</label>
                      <input
                        id="calc-adblock"
                        type="text"
                        inputMode="decimal"
                        value={adBlockersRaw}
                        onChange={(e) => setAdBlockersRaw(e.target.value)}
                        placeholder="0"
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="calc-exits" className={labelClasses}>{t.earlyExits}</label>
                      <input
                        id="calc-exits"
                        type="text"
                        inputMode="decimal"
                        value={earlyExitsRaw}
                        onChange={(e) => setEarlyExitsRaw(e.target.value)}
                        placeholder="0"
                        className={inputClasses}
                      />
                      <p className="text-[0.7rem] text-text-tertiary mt-1 leading-relaxed">{t.optionalNote}</p>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleCalculate}
                disabled={visitors === 0 || monthlyRevenue === 0}
                className="w-full py-3.5 text-[0.95rem] font-medium text-white bg-text-primary rounded-[4px] hover:bg-[#333] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t.calculate}
              </button>

              <p className="text-[0.7rem] text-text-tertiary text-center leading-relaxed">
                {t.estimateNote} {t.noEmail}
              </p>

              {hasCalculated && (
                <div className="mt-6 pt-6 border-t border-warm-100">
                  <a
                    href={t.freeHref}
                    className="block w-full py-3 text-center text-[0.9rem] font-medium text-white bg-text-primary rounded-[4px] no-underline hover:bg-[#333] transition-colors mb-2"
                  >
                    {t.freeCta}
                  </a>
                  <p className="text-[0.72rem] text-text-tertiary text-center">{t.freeSub}</p>
                  <div className="mt-4 pt-4 border-t border-warm-100">
                    <p className="text-[0.75rem] text-text-tertiary text-center mb-3">{t.reportPrompt}</p>
                    {reportSent ? (
                      <p className="text-[0.8rem] text-green-muted text-center">{t.reportSent}</p>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <input
                            type="email"
                            placeholder="your@email.com"
                            value={reportEmail}
                            onChange={(e) => setReportEmail(e.target.value)}
                            className="flex-1 px-3 py-2 text-[0.85rem] border border-warm-200 rounded-[4px] bg-white text-text-primary focus:border-text-body focus:outline-none transition-colors"
                          />
                          <button
                            type="button"
                            className="px-4 py-2 text-[0.85rem] font-medium text-text-primary border border-warm-200 rounded-[4px] hover:border-text-body transition-colors whitespace-nowrap cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                            disabled={!reportEmail || !reportTurnstileToken}
                            onClick={async () => {
                              try {
                                pushEvent({ event: "calculator_report_email", email: reportEmail });
                                setReportError(false);
                                await submitFirstPartyForm(
                                  "calculator",
                                  {
                                    email: reportEmail,
                                    source: "calculator-report",
                                    visitors: String(visitors),
                                    country,
                                    revenue: String(monthlyRevenue),
                                    rejection: `${rejectionPct}%`,
                                    dataLoss: `${Math.round(s.unseen * 100)}%`,
                                  },
                                  { turnstileToken: reportTurnstileToken ?? "" }
                                );
                                setReportSent(true);
                              } catch {
                                setReportError(true);
                                setReportTurnstileToken(null);
                                setReportTurnstileResetKey((key) => key + 1);
                              }
                            }}
                          >
                            {t.sendReport}
                          </button>
                        </div>
                        <LeadTurnstile onToken={setReportTurnstileToken} resetKey={reportTurnstileResetKey} />
                        {reportError && <p role="alert" className="text-[0.75rem] text-red-alert">{t.reportError}</p>}
                      </div>
                    )}
                  </div>
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
              {/* Headline estimate */}
              <div className="p-8 sm:p-10 border border-warm-100 rounded-[4px] bg-warm-white">
                <p className="text-[0.8rem] text-text-tertiary mb-3">{t.withInputs}</p>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-mono text-[4rem] sm:text-[5rem] font-medium text-red-alert leading-none tracking-tight">
                    {pct(s.attributed)}
                  </span>
                  <span className="text-[1.1rem] text-text-secondary">{t.ofVisits}</span>
                </div>
                <p className="text-[0.95rem] text-text-primary mb-3">{t.breakdown(pct(s.seenWithoutSource), pct(s.unseen))}</p>
                <p className="text-[0.9rem] text-text-secondary leading-relaxed">
                  {visitsLine[0]}
                  <span className="font-mono font-medium text-text-primary">{visitsLine[1]}</span>
                  {visitsLine[2]}
                  <span className="font-mono font-medium text-green-muted">{visitsLine[3]}</span>
                  {visitsLine[4]}
                  <span className="font-mono font-medium text-text-primary">{visitsLine[5]}</span>
                  {visitsLine[6]}
                  <span className="font-mono font-medium text-red-alert">{visitsLine[7]}</span>
                  {visitsLine[8]}
                </p>
                <p className="text-[0.8rem] text-text-secondary mt-3 leading-relaxed">
                  {t.rangeLine(pct(range.high.attributed), pct(range.low.attributed))}
                </p>
                <p className="text-[0.75rem] text-text-tertiary mt-3 leading-relaxed">{t.estimateNote}</p>
                <p className="text-[0.75rem] text-text-tertiary mt-2 leading-relaxed">
                  <Link href={t.incaptoHref} className="underline decoration-1 underline-offset-2">{t.incapto}</Link>
                </p>
              </div>

              {/* Revenue */}
              <div className="p-8 sm:p-10 border-2 border-red-alert/20 rounded-[4px] bg-white">
                <p className="text-[0.75rem] font-medium tracking-[0.06em] uppercase text-red-alert mb-5">{t.revenueTitle}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {(
                    [
                      [t.month, notAttributedRevenueMonthly, false],
                      [t.quarter, notAttributedRevenueMonthly * 3, false],
                      [t.year, notAttributedRevenueMonthly * 12, true],
                    ] as [string, number, boolean][]
                  ).map(([label, value, strong]) => (
                    <div key={label}>
                      <p className="text-[0.75rem] text-text-tertiary uppercase tracking-wider mb-1">{label}</p>
                      <p className={`font-mono text-[1.6rem] sm:text-[1.8rem] font-medium leading-tight ${strong ? "text-red-alert" : "text-text-primary"}`}>
                        {fmtE(value)}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-[0.8rem] text-text-secondary mt-5 leading-relaxed">{t.revenueNote(pct(s.attributed))}</p>
                <p className="text-[0.75rem] text-text-tertiary mt-2 leading-relaxed">
                  <Link href={t.incaptoHref} className="underline decoration-1 underline-offset-2">{t.incapto}</Link>
                </p>
              </div>

              {/* Attribution */}
              <div className="p-8 sm:p-10 border border-warm-100 rounded-[4px] bg-warm-white">
                <h3 className="font-serif text-[1.15rem] text-text-primary mb-2">{t.attrTitle}</h3>
                <p className="text-[0.8rem] text-text-secondary mb-6 leading-relaxed">{t.attrBody}</p>

                <div className="mb-6">
                  <div className="flex justify-between text-[0.75rem] text-text-tertiary uppercase tracking-wider mb-2">
                    <span>{t.yourSales(fmtN(realConversions))}</span>
                  </div>
                  <div className="h-10 flex rounded-[2px] overflow-hidden">
                    <div className="bg-green-muted transition-all duration-700" style={{ width: `${s.attributed * 100}%` }} title={t.correct} />
                    <div className="bg-[#E8B84B] transition-all duration-700" style={{ width: `${s.seenWithoutSource * 100}%` }} title={t.noSource} />
                    <div className="bg-red-alert transition-all duration-700" style={{ width: `${s.unseen * 100}%` }} title={t.invisible} />
                  </div>
                  <div className="flex flex-wrap gap-5 mt-3">
                    {(
                      [
                        ["bg-green-muted", t.correct, s.attributed],
                        ["bg-[#E8B84B]", t.noSource, s.seenWithoutSource],
                        ["bg-red-alert", t.invisible, s.unseen],
                      ] as [string, string, number][]
                    ).map(([cls, label, share]) => (
                      <div key={label} className="flex items-center gap-1.5">
                        <div className={`w-2.5 h-2.5 rounded-[1px] ${cls}`} />
                        <span className="text-[0.7rem] text-text-secondary">
                          {label} — {pct(share)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 border border-warm-100 rounded-[4px] bg-white">
                    <p className="text-[0.7rem] text-text-tertiary uppercase tracking-wider mb-1">{t.correct}</p>
                    <p className="font-mono text-[1.4rem] font-medium text-green-muted leading-tight">{fmtN(correctlyAttributed)}</p>
                    <p className="text-[0.7rem] text-text-tertiary mt-0.5">{t.salesMonth}</p>
                  </div>
                  <div className="p-4 border border-warm-100 rounded-[4px] bg-white">
                    <p className="text-[0.7rem] text-text-tertiary uppercase tracking-wider mb-1">{t.noSource}</p>
                    <p className="font-mono text-[1.4rem] font-medium text-[#C8960A] leading-tight">{fmtN(withoutSourceSales)}</p>
                    <p className="text-[0.7rem] text-text-tertiary mt-0.5">{t.noSourceSub(fmtE(withoutSourceRevenue))}</p>
                  </div>
                  <div className="p-4 border border-warm-100 rounded-[4px] bg-white">
                    <p className="text-[0.7rem] text-text-tertiary uppercase tracking-wider mb-1">{t.invisible}</p>
                    <p className="font-mono text-[1.4rem] font-medium text-red-alert leading-tight">{fmtN(invisibleSales)}</p>
                    <p className="text-[0.7rem] text-text-tertiary mt-0.5">{t.invisibleSub(fmtE(invisibleSalesRevenue))}</p>
                  </div>
                </div>

                <p className="text-[0.8rem] text-text-secondary mt-5 leading-relaxed">
                  {attrFoot[0]}
                  <span className="font-mono font-medium text-text-primary">{attrFoot[1]}</span>
                  {attrFoot[2]}
                  {attrFoot[3]}
                  {attrFoot[4]}
                </p>
              </div>

              {/* Funnel */}
              <div className="p-8 sm:p-10 border border-warm-100 rounded-[4px] bg-warm-white">
                <h3 className="font-serif text-[1.15rem] text-text-primary mb-3">{t.funnelTitle}</h3>
                <p className="text-[0.8rem] text-text-secondary mb-6 leading-relaxed max-w-[62ch]">{t.funnelBody}</p>
                <div className="space-y-5">
                  {funnelSteps.map((step, i) => {
                    const isLast = i === funnelSteps.length - 1;
                    return (
                      <div key={step.label}>
                        <div className="flex justify-between text-[0.8rem] mb-1.5">
                          <span className="text-text-secondary">{step.label}</span>
                          <span className="font-mono text-text-primary font-medium">
                            {fmtN(step.value)}
                            <span className="text-text-tertiary ml-1.5">({Math.round(step.pct)}%)</span>
                          </span>
                        </div>
                        <div className="h-6 bg-warm-100 rounded-[2px] overflow-hidden">
                          <div
                            className={`h-full rounded-[2px] transition-all duration-700 ease-out ${
                              isLast ? "bg-red-alert" : i === 0 ? "bg-text-primary" : "bg-text-tertiary"
                            }`}
                            style={{ width: `${Math.max(step.pct, 1)}%` }}
                          />
                        </div>
                        {step.note && <p className="text-[0.7rem] text-text-tertiary mt-1">{step.note}</p>}
                      </div>
                    );
                  })}

                  <div className="pt-3 mt-3 border-t border-warm-200">
                    <p className="text-[0.8rem] text-text-secondary font-medium mb-1">{t.sealTitle}</p>
                    <p className="text-[0.75rem] text-text-tertiary leading-relaxed">{t.sealLine}</p>
                  </div>
                </div>
              </div>

              {/* What this means */}
              <div className="p-8 sm:p-10 border border-warm-100 rounded-[4px] bg-white">
                <h3 className="font-serif text-[1.15rem] text-text-primary mb-5">{t.meansTitle}</h3>
                <div className="space-y-4">
                  {[
                    [t.m1Title, t.m1Body(fmtN(withoutSourceSales))],
                    [t.m2Title(fmtN(invisibleSales)), t.m2Body(fmtE(invisibleSalesRevenue))],
                    [t.m3Title(pct(correctAttributionRate)), t.m3Body(fmtN(correctlyAttributed), fmtN(realConversions))],
                  ].map(([title, body]) => (
                    <div key={title} className="flex gap-4">
                      <div className="w-1 bg-red-alert/30 rounded-full flex-shrink-0" />
                      <div>
                        <p className="text-[0.85rem] text-text-primary font-medium">{title}</p>
                        <p className="text-[0.8rem] text-text-secondary mt-0.5">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="p-8 sm:p-10 border border-warm-100 rounded-[4px] bg-warm-white text-center">
                <p className="font-serif text-[1.4rem] text-text-primary mb-2">{t.ctaTitle}</p>
                <p className="text-[0.85rem] text-text-secondary mb-6 max-w-[480px] mx-auto">{t.ctaBody}</p>
                <Link
                  href={t.freeHref}
                  className="inline-flex items-center px-10 py-4 text-[1rem] font-medium text-white bg-text-primary rounded-[4px] no-underline hover:bg-[#333] transition-colors"
                >
                  {t.ctaButton}
                </Link>
                <p className="mt-4 text-[0.75rem] text-text-tertiary">{t.ctaFoot}</p>
              </div>

              {/* Share */}
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
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
