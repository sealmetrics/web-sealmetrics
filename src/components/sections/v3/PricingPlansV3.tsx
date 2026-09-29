"use client";

import { useState } from "react";
import Link from "next/link";
import { PRICING, fmtPrice, annualTotal } from "@/lib/content/pricing";
import { AgenticPlanBand } from "@/components/sections/v3/AgenticPlanV3";

type Locale = "en" | "es";

interface Plan {
  name: string;
  desc: string;
  monthlyPrice: string;
  annualPrice: string;
  annualTotal: string;
  annualSave: string;
  events: string;
  roiContext: string;
  highlights: string[];
  cta: string;
  ctaNote: string;
  featured: boolean;
  href: string;
}

const plansEn: Plan[] = [
  {
    name: "Growth",
    desc: "For teams starting with full-stack data",
    monthlyPrice: fmtPrice(PRICING.growth.monthly, "en"),
    annualPrice: fmtPrice(PRICING.growth.annual, "en"),
    annualTotal: `${fmtPrice(annualTotal(PRICING.growth.annual), "en")} billed annually`,
    annualSave: `${fmtPrice(PRICING.growth.annual, "en")}/mo if billed annually`,
    events: `${PRICING.growth.eventsMillions}M human events/mo`,
    roiContext: "Less than the cost of one misattributed campaign decision.",
    highlights: [
      "5M human events / month",
      "Unlimited sites & users",
      "MCP + BigQuery + Full API",
      "LENS AI · bring your own key",
    ],
    cta: "Start free",
    ctaNote: "",
    featured: false,
    href: "https://my.sealmetrics.com/register",
  },
  {
    name: "Scale",
    desc: "For growing eCommerce with complete attribution",
    monthlyPrice: fmtPrice(PRICING.scale.monthly, "en"),
    annualPrice: fmtPrice(PRICING.scale.annual, "en"),
    annualTotal: `${fmtPrice(annualTotal(PRICING.scale.annual), "en")} billed annually`,
    annualSave: `${fmtPrice(PRICING.scale.annual, "en")}/mo if billed annually`,
    events: `${PRICING.scale.eventsMillions}M human events/mo`,
    roiContext: "Pays for itself if you recover one mis-attributed campaign per quarter.",
    highlights: [
      "15M human events / month",
      "LENS AI · no AI key needed",
      "Private AI · 5M tokens included",
      "Webhooks + priority support",
    ],
    cta: "Start free",
    ctaNote: "",
    featured: true,
    href: "https://my.sealmetrics.com/register",
  },
  {
    name: "Enterprise",
    desc: "For portfolio brands and regulated industries",
    roiContext: "Built around your volume, governance and residency requirements.",
    monthlyPrice: "Custom",
    annualPrice: "Custom",
    annualTotal: "Annual · tailored pricing",
    annualSave: "",
    events: "Unlimited human events/mo",
    highlights: [
      "Unlimited human events",
      "Private AI — exclusive, not shared",
      "Isolated processing · 99.9% SLA",
      "Dedicated account manager",
    ],
    cta: "Talk to sales",
    ctaNote: "White-glove onboarding",
    featured: false,
    href: "/demo",
  },
];

const plansEs: Plan[] = [
  {
    name: "Growth",
    desc: "Para equipos empezando con datos full-stack",
    monthlyPrice: fmtPrice(PRICING.growth.monthly, "es"),
    annualPrice: fmtPrice(PRICING.growth.annual, "es"),
    annualTotal: `${fmtPrice(annualTotal(PRICING.growth.annual), "es")} facturados anualmente`,
    annualSave: `${fmtPrice(PRICING.growth.annual, "es")}/mes con facturación anual`,
    events: `${PRICING.growth.eventsMillions}M eventos humanos/mes`,
    roiContext: "Menos que el coste de una decisión de campaña mal atribuida.",
    highlights: [
      "5M eventos humanos / mes",
      "Webs y usuarios ilimitados",
      "MCP + BigQuery + API completa",
      "LENS AI · con tu propia API key",
    ],
    cta: "Empieza gratis",
    ctaNote: "",
    featured: false,
    href: "https://my.sealmetrics.com/register",
  },
  {
    name: "Scale",
    desc: "Para eCommerce en crecimiento con atribución completa",
    monthlyPrice: fmtPrice(PRICING.scale.monthly, "es"),
    annualPrice: fmtPrice(PRICING.scale.annual, "es"),
    annualTotal: `${fmtPrice(annualTotal(PRICING.scale.annual), "es")} facturados anualmente`,
    annualSave: `${fmtPrice(PRICING.scale.annual, "es")}/mes con facturación anual`,
    events: `${PRICING.scale.eventsMillions}M eventos humanos/mes`,
    roiContext: "Se paga solo si recuperas una campaña mal atribuida al trimestre.",
    highlights: [
      "15M eventos humanos / mes",
      "LENS AI · sin API key",
      "Private AI · 5M tokens incluidos",
      "Webhooks + soporte prioritario",
    ],
    cta: "Empieza gratis",
    ctaNote: "",
    featured: true,
    href: "https://my.sealmetrics.com/register",
  },
  {
    name: "Enterprise",
    desc: "Para grupos multi-marca y sectores regulados",
    roiContext: "Construido alrededor de tu volumen, governance y residencia.",
    monthlyPrice: "A medida",
    annualPrice: "A medida",
    annualTotal: "Anual · precio personalizado",
    annualSave: "",
    events: "Eventos humanos ilimitados/mes",
    highlights: [
      "Eventos humanos ilimitados",
      "Private AI — exclusiva, no compartida",
      "Procesamiento aislado · SLA 99,9%",
      "Account manager dedicado",
    ],
    cta: "Hablar con ventas",
    ctaNote: "Onboarding white-glove",
    featured: false,
    href: "/es/demo",
  },
];

const copy = {
  en: {
    monthly: "Monthly",
    annual: "Annual",
    annualBadge: "2 months free",
    mostPopular: "Most chosen by eCommerce",
    perMonth: "/mo",
    aiAgents: "AI agents included",
    comingSoon: "Coming soon",
    events: "Human events",
  },
  es: {
    monthly: "Mensual",
    annual: "Anual",
    annualBadge: "2 meses gratis",
    mostPopular: "El más elegido por eCommerce",
    perMonth: "/mes",
    aiAgents: "Agentes IA incluidos",
    comingSoon: "Próximamente",
    events: "Eventos humanos",
  },
} as const;

export function PricingPlansV3({ locale = "en" }: { locale?: Locale }) {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");
  const plans = locale === "es" ? plansEs : plansEn;
  const t = copy[locale];

  return (
    <section className="py-20 bg-white border-t border-warm-100">
      {/* Free, LLM-provisioned entry tier */}
      <AgenticPlanBand locale={locale} />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        {/* Billing toggle */}
        <div className="flex justify-center mb-14">
          <div
            role="group"
            aria-label="Billing period"
            className="inline-flex items-center p-1 bg-warm-50 border border-warm-100 rounded-full"
          >
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2 text-[14px] font-medium rounded-full transition-colors ${
                billing === "monthly"
                  ? "bg-ink text-white"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              {t.monthly}
            </button>
            <button
              type="button"
              onClick={() => setBilling("annual")}
              className={`px-5 py-2 text-[14px] font-medium rounded-full transition-colors flex items-center gap-2 ${
                billing === "annual"
                  ? "bg-ink text-white"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              {t.annual}
              <span
                className={`font-mono text-[10px] font-semibold uppercase tracking-[0.08em] px-1.5 py-0.5 rounded ${
                  billing === "annual"
                    ? "bg-amber text-ink"
                    : "bg-brand text-ink"
                }`}
                style={
                  billing === "annual" ? { backgroundColor: "#E8B84B" } : undefined
                }
              >
                {t.annualBadge}
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 items-stretch">
          {plans.map((plan) => {
            const isCustom =
              plan.monthlyPrice === "Custom" || plan.monthlyPrice === "A medida";
            const displayPrice =
              billing === "monthly" ? plan.monthlyPrice : plan.annualPrice;
            const subPrice =
              billing === "monthly" ? plan.annualSave : plan.annualTotal;

            return (
              <article
                key={plan.name}
                className={`relative rounded-xl p-8 md:p-9 flex flex-col bg-white ${
                  plan.featured
                    ? "border-2 border-brand shadow-[0_4px_24px_-8px_rgba(45,139,109,0.2)]"
                    : "border border-warm-100"
                }`}
              >
                {plan.featured && (
                  <span
                    className="absolute -top-3 left-6 bg-brand text-ink font-mono text-[10.5px] font-bold uppercase tracking-[0.08em] px-3 py-1 rounded-md"
                  >
                    {t.mostPopular}
                  </span>
                )}
                <header className="pb-6 border-b border-warm-100 mb-6">
                  <h3 className="text-[22px] font-semibold tracking-[-0.015em] text-ink mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-[13.5px] leading-[1.5] text-ink-soft min-h-[2.6rem]">
                    {plan.desc}
                  </p>
                </header>

                <div className="mb-1">
                  <div className="flex items-baseline gap-1">
                    <span
                      className="font-semibold tracking-[-0.035em] leading-none tabular-nums text-ink"
                      style={{ fontSize: "clamp(40px, 4.4vw, 52px)" }}
                    >
                      {displayPrice}
                    </span>
                    {!isCustom && (
                      <span className="text-[16px] text-ink-soft font-medium">
                        {t.perMonth}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-[11.5px] font-mono font-semibold uppercase tracking-[0.06em] min-h-[1.2rem] mb-2">
                  {isCustom ? (
                    <span className="text-ink-soft">{plan.annualTotal}</span>
                  ) : subPrice ? (
                    <span className="text-brand">{subPrice}</span>
                  ) : null}
                </div>
                {plan.roiContext && (
                  <p className="text-[12.5px] italic text-ink-soft leading-[1.5] mb-5 min-h-[2.2rem]">
                    {plan.roiContext}
                  </p>
                )}

                <ul className="flex flex-col gap-2.5 mb-7 flex-1">
                  {plan.highlights.map((h, i) => (
                    <li
                      key={i}
                      className={`relative pl-5 text-[14px] leading-[1.5] ${
                        i === 0 ? "text-ink font-semibold" : "text-ink-soft"
                      }`}
                    >
                      <span
                        className={`absolute left-0 top-[9px] w-2 h-2 rounded-full shrink-0 ${
                          i === 0 ? "bg-brand" : "bg-warm-200"
                        }`}
                      />
                      {h}
                    </li>
                  ))}
                </ul>

                {plan.href.startsWith("http") ? (
                  <a
                    href={plan.href}
                    target="_blank"
                    rel="noopener"
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md text-[14.5px] font-semibold no-underline w-full transition-colors ${
                      plan.featured
                        ? "bg-ink text-white hover:bg-brand"
                        : "border border-warm-200 text-ink hover:bg-warm-50"
                    }`}
                  >
                    {plan.cta} →
                  </a>
                ) : (
                  <Link
                    href={plan.href}
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md text-[14.5px] font-semibold no-underline w-full transition-colors ${
                      plan.featured
                        ? "bg-ink text-white hover:bg-brand"
                        : "border border-warm-200 text-ink hover:bg-warm-50"
                    }`}
                  >
                    {plan.cta} →
                  </Link>
                )}
                {plan.ctaNote && (
                  <p className="text-[11.5px] text-ink-soft text-center mt-3 font-mono tracking-[0.04em]">
                    {plan.ctaNote}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
