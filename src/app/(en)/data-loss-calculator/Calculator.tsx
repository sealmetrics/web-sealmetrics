"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { pushEvent } from "@/lib/analytics";
import { submitFirstPartyForm } from "@/lib/forms/submit";
import { LeadTurnstile } from "@/components/forms/LeadTurnstile";

/* ===========================================
   Country-specific loss rates
   Sources: Advance Metrics (5yr GDPR study),
   CookieYes 2026, SEOSandwitch, Stape (ITP)
   =========================================== */

type CountryCode = "DE" | "FR" | "NL" | "ES" | "IT" | "UK" | "EU" | "US";

interface CountryData {
  label: string;
  consentRejection: number;
  adBlockerRate: number;
  safariShare: number;
  safariItpDegradation: number;
}

const COUNTRY_DATA: Record<CountryCode, CountryData> = {
  DE: {
    label: "Germany",
    consentRejection: 0.55,
    adBlockerRate: 0.49,
    safariShare: 0.18,
    safariItpDegradation: 0.15,
  },
  FR: {
    label: "France",
    consentRejection: 0.50,
    adBlockerRate: 0.44,
    safariShare: 0.22,
    safariItpDegradation: 0.15,
  },
  NL: {
    label: "Netherlands",
    consentRejection: 0.65,
    adBlockerRate: 0.38,
    safariShare: 0.19,
    safariItpDegradation: 0.15,
  },
  ES: {
    label: "Spain",
    consentRejection: 0.40,
    adBlockerRate: 0.35,
    safariShare: 0.20,
    safariItpDegradation: 0.15,
  },
  IT: {
    label: "Italy",
    consentRejection: 0.42,
    adBlockerRate: 0.33,
    safariShare: 0.21,
    safariItpDegradation: 0.15,
  },
  UK: {
    label: "United Kingdom",
    consentRejection: 0.38,
    adBlockerRate: 0.39,
    safariShare: 0.31,
    safariItpDegradation: 0.15,
  },
  EU: {
    label: "EU average",
    consentRejection: 0.48,
    adBlockerRate: 0.40,
    safariShare: 0.20,
    safariItpDegradation: 0.15,
  },
  US: {
    label: "United States",
    consentRejection: 0.12,
    adBlockerRate: 0.37,
    safariShare: 0.27,
    safariItpDegradation: 0.15,
  },
};

/* ===========================================
   Heavy-pixel abandonment
   Weighty measurement tags (GA4, Adobe Analytics) load megabytes of
   JavaScript and fire late in the page lifecycle. A share of visitors
   leaves before the tag executes, so the hit is never sent — this loss
   is independent of consent, ad blockers or Safari ITP, and it is the
   same regardless of country because it is a property of the tag, not
   the market. Grounded in page-speed abandonment research (Google/
   Deloitte, "Milliseconds Make Millions"). Sealmetrics ships a
   lightweight first-party pixel that fires immediately, so it does not
   pay this tax.
   =========================================== */

const HEAVY_PIXEL_ABANDON = 0.15;

/* ===========================================
   Formatting helpers
   =========================================== */

function formatEur(n: number): string {
  if (n >= 1_000_000) return `\u20AC${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `\u20AC${Math.round(n / 1_000).toLocaleString("en")}K`;
  return `\u20AC${Math.round(n).toLocaleString("en")}`;
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 10_000) return `${Math.round(n / 1_000).toLocaleString("en")}K`;
  return Math.round(n).toLocaleString("en");
}

function formatInputNumber(value: string): string {
  const digits = value.replace(/[^\d]/g, "");
  if (!digits) return "";
  return parseInt(digits, 10).toLocaleString("en");
}

function parseInputNumber(value: string): number {
  return parseInt(value.replace(/[^\d]/g, ""), 10) || 0;
}

/* ===========================================
   Calculator component
   =========================================== */

export function Calculator() {
  // Primary inputs (3 fields for first reveal)
  const [visitorsRaw, setVisitorsRaw] = useState("");
  const [country, setCountry] = useState<CountryCode>("DE");
  const [revenueRaw, setRevenueRaw] = useState("");

  // Advanced inputs (optional refinement)
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [conversionRate, setConversionRate] = useState("2.0");
  const [avgOrderValue, setAvgOrderValue] = useState("");

  // UI state
  const [hasCalculated, setHasCalculated] = useState(false);

  // Parse inputs
  const visitors = parseInputNumber(visitorsRaw);
  const monthlyRevenue = parseInputNumber(revenueRaw);

  // Derive conversion rate and AOV from revenue if advanced not used
  const crRate = parseFloat(conversionRate) / 100 || 0.02;
  const derivedAov = visitors > 0 && crRate > 0
    ? monthlyRevenue / (visitors * crRate)
    : 0;
  const aov = showAdvanced && avgOrderValue
    ? parseFloat(avgOrderValue) || derivedAov
    : derivedAov;

  // Country data
  const cd = COUNTRY_DATA[country];

  // Cascade of losses
  const afterConsent = visitors * (1 - cd.consentRejection);
  const afterAdBlock = afterConsent * (1 - cd.adBlockerRate);
  const safariLoss = afterAdBlock * cd.safariShare * cd.safariItpDegradation;
  const afterSafari = afterAdBlock - safariLoss;
  // Heavy measurement tag fires late — a share of visitors leaves first.
  const pixelWeightLoss = afterSafari * HEAVY_PIXEL_ABANDON;
  const ga4Visible = Math.round(afterSafari - pixelWeightLoss);
  const invisibleVisitors = visitors - ga4Visible;
  const visibilityRate = visitors > 0 ? ga4Visible / visitors : 0;

  // Revenue impact
  const revenuePerVisitor = visitors > 0 ? monthlyRevenue / visitors : 0;
  const invisibleRevenueMonthly = invisibleVisitors * revenuePerVisitor;
  const invisibleRevenueQuarterly = invisibleRevenueMonthly * 3;
  const invisibleRevenueYearly = invisibleRevenueMonthly * 12;

  // Conversion impact
  const realConversions = Math.round(visitors * crRate);
  const ga4Conversions = Math.round(ga4Visible * crRate);
  const lostConversions = realConversions - ga4Conversions;

  // Attribution quality — even visible sales are misattributed
  const SALES_VISIBILITY = 0.80;
  const MISATTRIBUTION_RATE = 0.60;
  const visibleSales = Math.round(realConversions * SALES_VISIBILITY);
  const invisibleSales = realConversions - visibleSales;
  const misattributedSales = Math.round(visibleSales * MISATTRIBUTION_RATE);
  const correctlyAttributed = visibleSales - misattributedSales;
  const correctAttributionRate = realConversions > 0
    ? correctlyAttributed / realConversions
    : 0;
  const misattributedRevenue = misattributedSales * aov;
  const invisibleSalesRevenue = invisibleSales * aov;

  // Shareable URL
  const buildShareUrl = useCallback(() => {
    const params = new URLSearchParams({
      v: String(visitors),
      c: country,
      r: String(monthlyRevenue),
    });
    return `https://sealmetrics.com/data-loss-calculator?${params.toString()}`;
  }, [visitors, country, monthlyRevenue]);

  // Read URL params on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const v = params.get("v");
    const c = params.get("c");
    const r = params.get("r");
    if (v && parseInt(v, 10) > 0) {
      setVisitorsRaw(parseInt(v, 10).toLocaleString("en"));
      if (c && c in COUNTRY_DATA) setCountry(c as CountryCode);
      if (r) setRevenueRaw(parseInt(r, 10).toLocaleString("en"));
      setHasCalculated(true);
    }
  }, []);

  const handleCalculate = () => {
    if (visitors > 0 && monthlyRevenue > 0) {
      setHasCalculated(true);
      // Fire micro-conversion
      pushEvent({
        event: "calculator_used",
        country,
        visitors: String(visitors),
      });
      // Update URL without reload for shareability
      const url = new URL(window.location.href);
      url.searchParams.set("v", String(visitors));
      url.searchParams.set("c", country);
      url.searchParams.set("r", String(monthlyRevenue));
      window.history.replaceState({}, "", url.toString());
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(buildShareUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const [copied, setCopied] = useState(false);
  const [reportEmail, setReportEmail] = useState("");
  const [reportSent, setReportSent] = useState(false);
  const [reportTurnstileToken, setReportTurnstileToken] = useState<string | null>(null);
  const [reportTurnstileResetKey, setReportTurnstileResetKey] = useState(0);
  const [reportError, setReportError] = useState(false);

  const inputClasses =
    "w-full px-4 py-3 text-[0.95rem] border border-warm-200 rounded-[4px] bg-white text-text-primary focus:border-text-body focus:outline-none focus-visible:outline-2 focus-visible:outline-blue-accent focus-visible:outline-offset-2 transition-colors";
  const labelClasses = "block text-[0.8rem] font-medium text-text-body mb-1.5";

  // Funnel data for visualization
  const funnelSteps = [
    {
      label: "Real visitors",
      value: visitors,
      pct: 100,
      note: null,
    },
    {
      label: "After consent banner",
      value: Math.round(afterConsent),
      pct: visitors > 0 ? (afterConsent / visitors) * 100 : 0,
      note: `${Math.round(cd.consentRejection * 100)}% reject tracking in ${cd.label}`,
    },
    {
      label: "After ad blockers",
      value: Math.round(afterAdBlock),
      pct: visitors > 0 ? (afterAdBlock / visitors) * 100 : 0,
      note: `${Math.round(cd.adBlockerRate * 100)}% use ad blockers`,
    },
    {
      label: "After Safari ITP",
      value: Math.round(afterSafari),
      pct: visitors > 0 ? (afterSafari / visitors) * 100 : 0,
      note: `${Math.round(cd.safariShare * 100)}% Safari share, 7-day cookie cap`,
    },
    {
      label: "After tag load",
      value: ga4Visible,
      pct: visitors > 0 ? visibilityRate * 100 : 0,
      note: `${Math.round(HEAVY_PIXEL_ABANDON * 100)}% leave before GA4/Adobe's heavy pixel fires`,
    },
  ];

  return (
    <div>
      {/* Two-column layout: inputs left, results right */}
      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-12 lg:gap-16 items-start">
        {/* ========== INPUTS ========== */}
        <div className="lg:sticky lg:top-32">
          <div className="bg-warm-white border border-warm-100 rounded-[4px] p-8 sm:p-10">
            <h2 className="font-serif text-[1.35rem] text-text-primary mb-1">
              Your numbers
            </h2>
            <p className="text-[0.8rem] text-text-tertiary mb-8">
              Three fields. Instant results.
            </p>

            <div className="space-y-5">
              {/* Monthly visitors */}
              <div>
                <label htmlFor="calc-visitors" className={labelClasses}>Monthly website visitors</label>
                <input
                  id="calc-visitors"
                  type="text"
                  inputMode="numeric"
                  value={visitorsRaw}
                  onChange={(e) => {
                    setVisitorsRaw(formatInputNumber(e.target.value));
                    setHasCalculated(false);
                  }}
                  placeholder="e.g. 500,000"
                  className={inputClasses}
                />
              </div>

              {/* Country */}
              <div>
                <label htmlFor="calc-country" className={labelClasses}>Primary market</label>
                <select
                  id="calc-country"
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value as CountryCode);
                    setHasCalculated(false);
                  }}
                  className={inputClasses}
                >
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="NL">Netherlands</option>
                  <option value="ES">Spain</option>
                  <option value="IT">Italy</option>
                  <option value="UK">United Kingdom</option>
                  <option value="EU">Other EU country</option>
                  <option value="US">United States</option>
                </select>
              </div>

              {/* Monthly revenue */}
              <div>
                <label htmlFor="calc-revenue" className={labelClasses}>
                  Monthly online revenue (EUR)
                </label>
                <input
                  id="calc-revenue"
                  type="text"
                  inputMode="numeric"
                  value={revenueRaw}
                  onChange={(e) => {
                    setRevenueRaw(formatInputNumber(e.target.value));
                    setHasCalculated(false);
                  }}
                  placeholder="e.g. 2,000,000"
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
                  {showAdvanced ? "- Hide" : "+ Refine"} estimate
                </button>
                {showAdvanced && (
                  <div className="mt-4 space-y-4 pt-4 border-t border-warm-100">
                    <div>
                      <label htmlFor="calc-cr" className={labelClasses}>
                        Conversion rate (%)
                      </label>
                      <input
                        id="calc-cr"
                        type="text"
                        inputMode="decimal"
                        value={conversionRate}
                        onChange={(e) => {
                          setConversionRate(e.target.value);
                          setHasCalculated(false);
                        }}
                        placeholder="2.0"
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="calc-aov" className={labelClasses}>
                        Average order value (EUR)
                      </label>
                      <input
                        id="calc-aov"
                        type="text"
                        inputMode="decimal"
                        value={avgOrderValue}
                        onChange={(e) => {
                          setAvgOrderValue(e.target.value);
                          setHasCalculated(false);
                        }}
                        placeholder={derivedAov > 0 ? `${Math.round(derivedAov)} (derived)` : "80"}
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
                Calculate Your Data Loss
              </button>

              <p className="text-[0.7rem] text-text-tertiary text-center leading-relaxed">
                Loss rates from published research: Advance Metrics, CookieYes,
                SEOSandwitch, Stape, Google/Deloitte page-speed. No email required.
              </p>

              {hasCalculated && (
                <div className="mt-6 pt-6 border-t border-warm-100">
                  <p className="text-[0.8rem] text-text-tertiary mb-3">
                    These are estimates based on EU consent averages. Your real
                    numbers may be higher.
                  </p>
                  <a
                    href="https://my.sealmetrics.com/register"
                    className="block w-full py-3 text-center text-[0.9rem] font-medium text-white bg-text-primary rounded-[4px] no-underline hover:bg-[#333] transition-colors mb-2"
                  >
                    Start 14-day trial &mdash; see your exact numbers
                  </a>
                  <p className="text-[0.72rem] text-text-tertiary text-center">
                    14-day trial · Cancel before day 14, pay nothing · 5–30 min setup by platform.
                  </p>
                  <div className="mt-4 pt-4 border-t border-warm-100">
                    <p className="text-[0.75rem] text-text-tertiary text-center mb-3">
                      Not ready for a demo? Get this report by email.
                    </p>
                    {reportSent ? (
                      <p className="text-[0.8rem] text-green-muted text-center">
                        Report sent. Check your inbox.
                      </p>
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
                              pushEvent({
                                event: "calculator_report_email",
                                email: reportEmail,
                              });
                              setReportError(false);
                              await submitFirstPartyForm(
                                "calculator",
                                {
                                  email: reportEmail,
                                  source: "calculator-report",
                                  visitors: String(visitors),
                                  country,
                                  revenue: String(monthlyRevenue),
                                  dataLoss: `${Math.round((1 - visibilityRate) * 100)}%`,
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
                          Send report
                          </button>
                        </div>
                        <LeadTurnstile
                          onToken={setReportTurnstileToken}
                          resetKey={reportTurnstileResetKey}
                        />
                        {reportError && <p role="alert" className="text-[0.75rem] text-red-alert">We could not send the report. Please try again.</p>}
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
            /* Empty state */
            <div className="p-12 sm:p-16 border border-warm-100 rounded-[4px] text-center bg-warm-white">
              <div className="max-w-[320px] mx-auto">
                <p className="font-serif text-[1.5rem] text-text-primary mb-3">
                  How much are you not seeing?
                </p>
                <p className="text-[0.85rem] text-text-tertiary leading-relaxed">
                  Enter your monthly visitors, primary market, and revenue. We
                  will calculate exactly how much data your analytics are
                  missing.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* ===== THE AHA MOMENT ===== */}
              {/* Primary shock number */}
              <div className="p-8 sm:p-10 border border-warm-100 rounded-[4px] bg-warm-white">
                <p className="text-[0.8rem] text-text-tertiary mb-3">
                  Your analytics decisions are based on
                </p>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-mono text-[4rem] sm:text-[5rem] font-medium text-red-alert leading-none tracking-tight">
                    {Math.round(visibilityRate * 100)}%
                  </span>
                  <span className="text-[1.1rem] text-text-secondary">
                    of your real data
                  </span>
                </div>
                <p className="text-[0.9rem] text-text-secondary leading-relaxed">
                  GA4 reports{" "}
                  <span className="font-mono font-medium text-text-primary">
                    {formatNumber(ga4Visible)}
                  </span>{" "}
                  visitors. In reality,{" "}
                  <span className="font-mono font-medium text-text-primary">
                    {formatNumber(visitors)}
                  </span>{" "}
                  people visit your site every month.{" "}
                  <span className="font-mono font-medium text-red-alert">
                    {formatNumber(invisibleVisitors)}
                  </span>{" "}
                  are invisible.
                </p>
              </div>

              {/* Revenue impact — the gut punch */}
              <div className="p-8 sm:p-10 border-2 border-red-alert/20 rounded-[4px] bg-white">
                <p className="text-[0.75rem] font-medium tracking-[0.06em] uppercase text-red-alert mb-5">
                  Revenue you cannot attribute, optimize, or learn from
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <p className="text-[0.75rem] text-text-tertiary uppercase tracking-wider mb-1">
                      This month
                    </p>
                    <p className="font-mono text-[1.6rem] sm:text-[1.8rem] font-medium text-text-primary leading-tight">
                      {formatEur(invisibleRevenueMonthly)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.75rem] text-text-tertiary uppercase tracking-wider mb-1">
                      This quarter
                    </p>
                    <p className="font-mono text-[1.6rem] sm:text-[1.8rem] font-medium text-text-primary leading-tight">
                      {formatEur(invisibleRevenueQuarterly)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.75rem] text-text-tertiary uppercase tracking-wider mb-1">
                      This year
                    </p>
                    <p className="font-mono text-[1.6rem] sm:text-[1.8rem] font-medium text-red-alert leading-tight">
                      {formatEur(invisibleRevenueYearly)}
                    </p>
                  </div>
                </div>
                <p className="text-[0.8rem] text-text-secondary mt-5 leading-relaxed">
                  Every campaign optimization, every ROAS calculation, every
                  board report — based on{" "}
                  <span className="font-medium text-text-primary">
                    {Math.round(visibilityRate * 100)}%
                  </span>{" "}
                  of what is actually happening.
                </p>
              </div>

              {/* ===== ATTRIBUTION QUALITY — second shock ===== */}
              <div className="p-8 sm:p-10 border border-warm-100 rounded-[4px] bg-warm-white">
                <h3 className="font-serif text-[1.15rem] text-text-primary mb-2">
                  It gets worse. The sales you do see are misattributed.
                </h3>
                <p className="text-[0.8rem] text-text-secondary mb-6 leading-relaxed">
                  Your payment system records the sale, but analytics cannot
                  trace which channel, campaign, or touchpoint drove it. The
                  result: budget goes to the wrong channels.
                </p>

                {/* Attribution funnel — horizontal stacked bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-[0.75rem] text-text-tertiary uppercase tracking-wider mb-2">
                    <span>Your {formatNumber(realConversions)} monthly sales</span>
                    <span>100%</span>
                  </div>
                  <div className="h-10 flex rounded-[2px] overflow-hidden">
                    <div
                      className="bg-green-muted transition-all duration-700"
                      style={{ width: `${correctAttributionRate * 100}%` }}
                      title="Correctly attributed"
                    />
                    <div
                      className="bg-[#E8B84B] transition-all duration-700"
                      style={{ width: `${(misattributedSales / realConversions) * 100}%` }}
                      title="Misattributed"
                    />
                    <div
                      className="bg-red-alert transition-all duration-700"
                      style={{ width: `${(invisibleSales / realConversions) * 100}%` }}
                      title="Invisible"
                    />
                  </div>
                  <div className="flex gap-5 mt-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-[1px] bg-green-muted" />
                      <span className="text-[0.7rem] text-text-secondary">
                        Correct — {Math.round(correctAttributionRate * 100)}%
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-[1px] bg-[#E8B84B]" />
                      <span className="text-[0.7rem] text-text-secondary">
                        Wrong source — {Math.round((misattributedSales / realConversions) * 100)}%
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-[1px] bg-red-alert" />
                      <span className="text-[0.7rem] text-text-secondary">
                        Invisible — {Math.round((invisibleSales / realConversions) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Attribution numbers */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 border border-warm-100 rounded-[4px] bg-white">
                    <p className="text-[0.7rem] text-text-tertiary uppercase tracking-wider mb-1">
                      Correctly attributed
                    </p>
                    <p className="font-mono text-[1.4rem] font-medium text-green-muted leading-tight">
                      {formatNumber(correctlyAttributed)}
                    </p>
                    <p className="text-[0.7rem] text-text-tertiary mt-0.5">
                      sales/month
                    </p>
                  </div>
                  <div className="p-4 border border-warm-100 rounded-[4px] bg-white">
                    <p className="text-[0.7rem] text-text-tertiary uppercase tracking-wider mb-1">
                      Wrong source
                    </p>
                    <p className="font-mono text-[1.4rem] font-medium text-[#C8960A] leading-tight">
                      {formatNumber(misattributedSales)}
                    </p>
                    <p className="text-[0.7rem] text-text-tertiary mt-0.5">
                      {formatEur(misattributedRevenue)} misallocated
                    </p>
                  </div>
                  <div className="p-4 border border-warm-100 rounded-[4px] bg-white">
                    <p className="text-[0.7rem] text-text-tertiary uppercase tracking-wider mb-1">
                      Completely invisible
                    </p>
                    <p className="font-mono text-[1.4rem] font-medium text-red-alert leading-tight">
                      {formatNumber(invisibleSales)}
                    </p>
                    <p className="text-[0.7rem] text-text-tertiary mt-0.5">
                      {formatEur(invisibleSalesRevenue)} untracked
                    </p>
                  </div>
                </div>

                <p className="text-[0.8rem] text-text-secondary mt-5 leading-relaxed">
                  You are optimizing ad spend based on{" "}
                  <span className="font-mono font-medium text-text-primary">
                    {Math.round(correctAttributionRate * 100)}%
                  </span>{" "}
                  correctly attributed sales. The other{" "}
                  {Math.round((1 - correctAttributionRate) * 100)}% are either
                  credited to the wrong channel or not tracked at all.
                </p>
              </div>

              {/* Funnel breakdown */}
              <div className="p-8 sm:p-10 border border-warm-100 rounded-[4px] bg-warm-white">
                <h3 className="font-serif text-[1.15rem] text-text-primary mb-3">
                  Where the data disappears
                </h3>
                <p className="text-[0.8rem] text-text-secondary mb-6 leading-relaxed max-w-[62ch]">
                  Consent, ad blockers and Safari ITP are only part of it. The
                  last cut is technical: GA4 and Adobe Analytics load a heavy
                  measurement tag that fires late in the page, so another{" "}
                  <span className="font-medium text-text-primary">
                    {Math.round(HEAVY_PIXEL_ABANDON * 100)}%
                  </span>{" "}
                  of visitors leave before the hit is ever sent. Sealmetrics
                  uses a lightweight first-party pixel that fires immediately —
                  it never pays this tax.
                </p>
                <div className="space-y-5">
                  {funnelSteps.map((step, i) => {
                    const isLast = i === funnelSteps.length - 1;
                    return (
                      <div key={step.label}>
                        <div className="flex justify-between text-[0.8rem] mb-1.5">
                          <span className="text-text-secondary">
                            {step.label}
                          </span>
                          <span className="font-mono text-text-primary font-medium">
                            {formatNumber(step.value)}
                            <span className="text-text-tertiary ml-1.5">
                              ({Math.round(step.pct)}%)
                            </span>
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
                        {step.note && (
                          <p className="text-[0.7rem] text-text-tertiary mt-1">
                            {step.note}
                          </p>
                        )}
                      </div>
                    );
                  })}

                  {/* Sealmetrics bar */}
                  <div className="pt-3 mt-3 border-t border-warm-200">
                    <div className="flex justify-between text-[0.8rem] mb-1.5">
                      <span className="text-text-secondary font-medium">
                        Sealmetrics captures
                      </span>
                      <span className="font-mono text-green-muted font-medium">
                        {formatNumber(visitors)}
                        <span className="ml-1.5">(100%)</span>
                      </span>
                    </div>
                    <div className="h-6 bg-warm-100 rounded-[2px] overflow-hidden">
                      <div className="h-full bg-green-muted rounded-[2px] w-full" />
                    </div>
                    <p className="text-[0.7rem] text-text-tertiary mt-1">
                      No cookies. No consent dependency. No sampling.
                    </p>
                  </div>
                </div>
              </div>

              {/* What this means for your team */}
              <div className="p-8 sm:p-10 border border-warm-100 rounded-[4px] bg-white">
                <h3 className="font-serif text-[1.15rem] text-text-primary mb-5">
                  What this means for your decisions
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-1 bg-red-alert/30 rounded-full flex-shrink-0" />
                    <div>
                      <p className="text-[0.85rem] text-text-primary font-medium">
                        Your ROAS is wrong
                      </p>
                      <p className="text-[0.8rem] text-text-secondary mt-0.5">
                        {formatNumber(misattributedSales)} sales/month are
                        credited to the wrong channel. You may be scaling
                        campaigns that are not working and cutting campaigns
                        that are.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1 bg-red-alert/30 rounded-full flex-shrink-0" />
                    <div>
                      <p className="text-[0.85rem] text-text-primary font-medium">
                        {formatNumber(invisibleSales)} sales/month have no source at all
                      </p>
                      <p className="text-[0.8rem] text-text-secondary mt-0.5">
                        These conversions happen — your payment system records
                        them — but analytics cannot tell you what drove them.
                        That is {formatEur(invisibleSalesRevenue)}/month with
                        zero attribution.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1 bg-red-alert/30 rounded-full flex-shrink-0" />
                    <div>
                      <p className="text-[0.85rem] text-text-primary font-medium">
                        Budget allocation is based on {Math.round(correctAttributionRate * 100)}% accurate data
                      </p>
                      <p className="text-[0.8rem] text-text-secondary mt-0.5">
                        Only {formatNumber(correctlyAttributed)} of your{" "}
                        {formatNumber(realConversions)} monthly sales are
                        correctly attributed. Every budget decision — which
                        channels to scale, which to cut — is informed by{" "}
                        {Math.round((1 - correctAttributionRate) * 100)}%
                        incorrect or missing data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="p-8 sm:p-10 border border-warm-100 rounded-[4px] bg-warm-white text-center">
                <p className="font-serif text-[1.4rem] text-text-primary mb-2">
                  See what {Math.round(visibilityRate * 100)}% looks like
                  next to 100%
                </p>
                <p className="text-[0.85rem] text-text-secondary mb-6 max-w-[480px] mx-auto">
                  In a 30-minute demo, we show your real traffic alongside GA4.
                  Most teams see 3-8x more visitors and conversions.
                </p>
                <Link
                  href="/demo"
                  className="inline-flex items-center px-10 py-4 text-[1rem] font-medium text-white bg-text-primary rounded-[4px] no-underline hover:bg-[#333] transition-colors"
                >
                  See Your Real Numbers
                </Link>
                <p className="mt-4 text-[0.75rem] text-text-tertiary">
                  No commitment. Just your actual data.
                </p>
              </div>

              {/* Share bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border border-warm-100 rounded-[4px] bg-warm-50">
                <p className="text-[0.8rem] text-text-secondary">
                  Share this result with your team
                </p>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-[0.8rem] font-medium text-text-primary border border-warm-200 rounded-[4px] bg-white hover:bg-warm-white transition-colors cursor-pointer"
                >
                  {copied ? (
                    "Link copied"
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
                      Copy link
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
