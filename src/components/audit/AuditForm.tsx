"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { pushEvent } from "@/lib/analytics";
import { submitFirstPartyForm } from "@/lib/forms/submit";
import { LeadTurnstile } from "@/components/forms/LeadTurnstile";
import {
  SignupQualifier,
  EMPTY_QUALIFIER,
  type QualifierState,
} from "@/components/forms/SignupQualifier";
import {
  buildSignupPayload,
  type AdsSpendEnum,
  type SectorEnum,
  type StakeholdersEnum,
} from "@/lib/signup/payload";

type Locale = "en" | "es";

function mapAuditBusinessToSector(value?: string): SectorEnum | "" {
  if (value === "ecommerce") return "ecom";
  if (value === "hotel") return "hotel";
  if (value === "travel" || value === "saas" || value === "other") return "other";
  return "";
}

function mapAuditPaidSpendToAdsBand(value?: string): AdsSpendEnum | "" {
  if (value === "gt100k") return "50k_200k";
  if (value === "20k-100k") return "50k_200k";
  if (value === "5k-20k") return "10k_50k";
  if (value === "0-5k") return "lt_10k";
  if (value === "no-paid") return "lt_10k";
  return "";
}

function mapAuditPressureToStakeholders(value?: string): StakeholdersEnum | "" {
  if (value === "nobody") return "solo";
  if (value === "me") return "solo";
  if (value === "team") return "marketing_team";
  if (value === "board") return "committee";
  if (value === "cfo-blocking") return "committee";
  return "";
}

interface Option {
  value: string;
  score: number;
  label: string;
}

interface Question {
  id: number;
  text: string;
  helper: string;
  numLabel: string;
  options: Option[];
}

interface Copy {
  eyebrow: string;
  duration: string;
  h1Lead: string;
  h1Italic: string;
  subtitle: string;
  questions: Question[];
  contact: {
    numLabel: string;
    text: string;
    helper: string;
    company: string;
    website: string;
    email: string;
    name: string;
  };
  back: string;
  next: string;
  submit: string;
  qOf: (n: number, total: number) => string;
  result: {
    title: string;
    high: string;
    mid: string;
    low: string;
    note: string;
  };
}

const COPY: Record<Locale, Copy> = {
  en: {
    eyebrow: "Free measurement audit",
    duration: "3 minutes · no install",
    h1Lead: "See how much revenue your analytics is",
    h1Italic: "hiding from you.",
    subtitle:
      "Answer 7 questions. We send you a personalised analysis of the gap between what GA4 measures and what your eCommerce actually sells.",
    qOf: (n, total) => `Question ${n} of ${total}`,
    questions: [
      {
        id: 1,
        numLabel: "",
        text: "What's your primary business model?",
        helper: "We use this to calibrate the gap calculation for your industry.",
        options: [
          { value: "ecommerce", score: 3, label: "eCommerce / DTC" },
          { value: "hotel", score: 2, label: "Hotel / hospitality" },
          { value: "travel", score: 2, label: "Travel / tourism" },
          { value: "saas", score: 1, label: "SaaS / B2B" },
          { value: "other", score: 0, label: "Other" },
        ],
      },
      {
        id: 2,
        numLabel: "",
        text: "What's your approximate annual revenue?",
        helper: "Not published anywhere. We use it only to calibrate the audit.",
        options: [
          { value: "lt500k", score: 0, label: "Less than €500K" },
          { value: "500k-1m", score: 2, label: "€500K — €1M" },
          { value: "1m-10m", score: 3, label: "€1M — €10M" },
          { value: "10m-50m", score: 3, label: "€10M — €50M" },
          { value: "gt50m", score: 2, label: "More than €50M" },
        ],
      },
      {
        id: 3,
        numLabel: "",
        text: "What's your role in the analytics decision?",
        helper:
          "Be honest. If you need to convince someone else, we'll factor that into the report.",
        options: [
          { value: "cmo", score: 3, label: "CMO / Head of Marketing — I decide" },
          { value: "ceo", score: 3, label: "CEO / Founder — I decide" },
          {
            value: "performance",
            score: 2,
            label: "Performance / Growth manager — I recommend",
          },
          { value: "analyst", score: 1, label: "Analyst / Data — I implement" },
          { value: "other-role", score: 0, label: "Other" },
        ],
      },
      {
        id: 4,
        numLabel: "",
        text: "How much do you spend monthly on paid media (Google, Meta, TikTok)?",
        helper: "The higher the spend, the more expensive the data gap.",
        options: [
          { value: "0-5k", score: 0, label: "Less than €5K" },
          { value: "5k-20k", score: 2, label: "€5K — €20K" },
          { value: "20k-100k", score: 3, label: "€20K — €100K" },
          { value: "gt100k", score: 3, label: "More than €100K" },
          { value: "no-paid", score: 0, label: "We don't run paid" },
        ],
      },
      {
        id: 5,
        numLabel: "the important one",
        text: "When you compare GA4 with Shopify, Magento or your backend… how much do they diverge?",
        helper:
          "This is where most teams realise the problem is bigger than they thought.",
        options: [
          { value: "never-checked", score: 0, label: "We've never compared them" },
          {
            value: "lt10",
            score: 1,
            label: "Pretty close (gap under 10%)",
          },
          { value: "10-30", score: 2, label: "There's a difference (10–30%)" },
          {
            value: "30-50",
            score: 3,
            label: "Material difference (30–50%)",
          },
          { value: "gt50", score: 4, label: "Huge difference (more than 50%)" },
        ],
      },
      {
        id: 6,
        numLabel: "the most important one",
        text: "Who in the org asks about these numbers, and what happens when you can't explain them?",
        helper:
          "This separates a technical problem from a real business problem.",
        options: [
          { value: "nobody", score: 0, label: "Nobody asks — it's not an active topic" },
          { value: "me", score: 1, label: "Only I see it, I manage it internally" },
          { value: "team", score: 2, label: "My team notices it in weekly reports" },
          {
            value: "board",
            score: 3,
            label: "Management asks and sometimes it doesn't match the board view",
          },
          {
            value: "cfo-blocking",
            score: 4,
            label: "The CFO/CEO is questioning marketing spend because of this",
          },
        ],
      },
    ],
    contact: {
      numLabel: "",
      text: "Last thing — where do we send the audit?",
      helper:
        "Takes 24h. It's a human analysis, not an auto-generated PDF.",
      company: "Company name",
      website: "Website URL (e.g. yourdomain.com)",
      email: "Work email",
      name: "Your name",
    },
    back: "← Back",
    next: "Next →",
    submit: "Send my audit",
    result: {
      title: "Got it. We'll send your audit within 24h.",
      high: "Your case looks especially relevant. We'll send the audit with priority and propose a 30-min call this week to review it together.",
      mid: "We've assigned a team member to review your case. You'll receive the audit within 24–48h with a summary of the key findings.",
      low: "You'll receive a structured report within 48h. If after reading it you want to go deeper, you can reply to the email to schedule a call.",
      note: "No automated sequences. We won't call you four times this week.",
    },
  },
  es: {
    eyebrow: "Auditoría gratuita de medición",
    duration: "3 minutos · sin instalar nada",
    h1Lead: "Descubre cuánto revenue oculta",
    h1Italic: "tu analytics.",
    subtitle:
      "Responde 7 preguntas y te enviamos un análisis personalizado del gap entre lo que mide GA4 y lo que realmente vende tu eCommerce.",
    qOf: (n, total) => `Pregunta ${n} de ${total}`,
    questions: [
      {
        id: 1,
        numLabel: "",
        text: "¿Cuál es tu modelo de negocio principal?",
        helper: "Esto nos ayuda a calcular el gap específico de tu industria.",
        options: [
          { value: "ecommerce", score: 3, label: "eCommerce / DTC" },
          { value: "hotel", score: 2, label: "Hotel / hospitality" },
          { value: "travel", score: 2, label: "Travel / turismo" },
          { value: "saas", score: 1, label: "SaaS / B2B" },
          { value: "other", score: 0, label: "Otro" },
        ],
      },
      {
        id: 2,
        numLabel: "",
        text: "¿Cuál es el revenue anual aproximado del negocio?",
        helper:
          "Este dato no se publica en ningún sitio. Lo usamos solo para calibrar la auditoría.",
        options: [
          { value: "lt500k", score: 0, label: "Menos de €500K" },
          { value: "500k-1m", score: 2, label: "€500K — €1M" },
          { value: "1m-10m", score: 3, label: "€1M — €10M" },
          { value: "10m-50m", score: 3, label: "€10M — €50M" },
          { value: "gt50m", score: 2, label: "Más de €50M" },
        ],
      },
      {
        id: 3,
        numLabel: "",
        text: "¿Cuál es tu rol en la decisión de herramientas de analytics?",
        helper:
          "Sé honesto. Si necesitas convencer a otra persona, lo tendremos en cuenta en el informe.",
        options: [
          { value: "cmo", score: 3, label: "CMO / Head of Marketing — decido yo" },
          { value: "ceo", score: 3, label: "CEO / Founder — decido yo" },
          {
            value: "performance",
            score: 2,
            label: "Performance / Growth manager — recomiendo",
          },
          { value: "analyst", score: 1, label: "Analista / Data — implemento" },
          { value: "other-role", score: 0, label: "Otro" },
        ],
      },
      {
        id: 4,
        numLabel: "",
        text: "¿Cuánto invertís al mes en paid media (Google, Meta, TikTok)?",
        helper: "Mientras más alto el spend, más caro te sale el gap de datos.",
        options: [
          { value: "0-5k", score: 0, label: "Menos de €5K" },
          { value: "5k-20k", score: 2, label: "€5K — €20K" },
          { value: "20k-100k", score: 3, label: "€20K — €100K" },
          { value: "gt100k", score: 3, label: "Más de €100K" },
          { value: "no-paid", score: 0, label: "No usamos paid" },
        ],
      },
      {
        id: 5,
        numLabel: "la importante",
        text: "Cuando comparas lo que dice GA4 con lo que dice Shopify, Magento o tu backend… ¿cuánto se desvían?",
        helper:
          "Esta es la pregunta donde la mayoría descubre que el problema es mayor de lo que pensaba.",
        options: [
          { value: "never-checked", score: 0, label: "Nunca lo hemos comparado" },
          { value: "lt10", score: 1, label: "Coinciden bastante (gap menor al 10%)" },
          { value: "10-30", score: 2, label: "Hay diferencia (10–30%)" },
          { value: "30-50", score: 3, label: "Diferencia importante (30–50%)" },
          { value: "gt50", score: 4, label: "Diferencia enorme (más del 50%)" },
        ],
      },
      {
        id: 6,
        numLabel: "la más importante",
        text: "¿Quién en tu organización pregunta por estos números, y qué pasa cuando no los puedes explicar?",
        helper:
          "Esta es la pregunta que separa «problema técnico» de «dolor de negocio real».",
        options: [
          { value: "nobody", score: 0, label: "Nadie pregunta — no es un tema activo" },
          { value: "me", score: 1, label: "Solo yo lo veo, lo gestiono internamente" },
          { value: "team", score: 2, label: "Mi equipo lo nota en reportes semanales" },
          {
            value: "board",
            score: 3,
            label: "Pregunta dirección y a veces no cuadra con el board",
          },
          {
            value: "cfo-blocking",
            score: 4,
            label: "El CFO/CEO está cuestionando el spend de marketing por esto",
          },
        ],
      },
    ],
    contact: {
      numLabel: "",
      text: "Última cosa — ¿dónde te enviamos la auditoría?",
      helper: "Tarda 24h. Es un análisis humano, no un PDF automatizado.",
      company: "Nombre de la empresa",
      website: "URL del sitio web (ej: tudominio.com)",
      email: "Email de trabajo",
      name: "Tu nombre",
    },
    back: "← Atrás",
    next: "Siguiente →",
    submit: "Enviar auditoría",
    result: {
      title: "Recibido. Te enviamos la auditoría en 24h.",
      high: "Tu caso parece especialmente relevante. Te enviaremos la auditoría con prioridad y te propondremos una llamada esta misma semana para revisarla juntos.",
      mid: "Hemos asignado a una persona del equipo para revisar tu caso. Recibirás la auditoría en 24–48h con un resumen de los hallazgos principales.",
      low: "Recibirás un informe estructurado en 48h. Si después de leerlo quieres profundizar, puedes responder al email para coordinar una llamada.",
      note: "No usamos secuencias automatizadas. No vamos a llamarte cuatro veces esta semana.",
    },
  },
};

const TOTAL_QUESTIONS = 7;
const MAX_RAW_SCORE = 20;

interface ContactState {
  company: string;
  website: string;
  email: string;
  name: string;
}

interface AnswerState {
  [questionId: number]: { value: string; score: number };
}

export function AuditForm({ locale = "en" }: { locale?: Locale }) {
  const t = COPY[locale];
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<AnswerState>({});
  const [contact, setContact] = useState<ContactState>({
    company: "",
    website: "",
    email: "",
    name: "",
  });
  const [qualifier, setQualifier] = useState<QualifierState>(EMPTY_QUALIFIER);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [scoreTier, setScoreTier] = useState<"high" | "mid" | "low">("mid");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const [deliveryError, setDeliveryError] = useState<string | null>(null);
  const microFired = useRef(false);

  useEffect(() => {
    if (!submitted || microFired.current) return;
    microFired.current = true;
    pushEvent({
      event: "lead_audit_submitted",
      tier: scoreTier,
      locale,
      email: contact.email,
    });
  }, [submitted, scoreTier, locale, contact.email]);

  const isContactStep = step === TOTAL_QUESTIONS;
  const currentQuestion = !isContactStep
    ? t.questions.find((q) => q.id === step)
    : null;

  const canAdvance = useMemo(() => {
    if (isContactStep) {
      return Boolean(
        contact.company.trim() &&
          contact.website.trim() &&
          contact.email.trim() &&
          contact.name.trim() &&
          turnstileToken
      );
    }
    return Boolean(answers[step]);
  }, [step, answers, contact, isContactStep, turnstileToken]);

  const progressPct = ((step - 1) / TOTAL_QUESTIONS) * 100;

  function selectOption(qId: number, opt: Option) {
    setAnswers((prev) => ({
      ...prev,
      [qId]: { value: opt.value, score: opt.score },
    }));
  }

  function handleNext() {
    if (!canAdvance) return;
    if (step < TOTAL_QUESTIONS) {
      setStep(step + 1);
    } else {
      void handleSubmit();
    }
  }

  function handleBack() {
    if (step > 1) setStep(step - 1);
  }

  async function handleSubmit() {
    setSubmitting(true);
    setDeliveryError(null);
    if (!turnstileToken) {
      setDeliveryError(locale === "es" ? "Completa la verificación de seguridad." : "Please complete the security verification.");
      setSubmitting(false);
      return;
    }
    const raw = Object.values(answers).reduce((sum, a) => sum + a.score, 0);
    const normalized = Math.max(
      1,
      Math.min(10, Math.round((raw / MAX_RAW_SCORE) * 10))
    );
    const tier: "high" | "mid" | "low" =
      normalized >= 8 ? "high" : normalized >= 5 ? "mid" : "low";

    const businessAnswer = answers[1]?.value;
    const paidSpendAnswer = answers[4]?.value;
    const pressureAnswer = answers[6]?.value;
    const roleAnswer = answers[3]?.value;

    const signup = buildSignupPayload({
      email: contact.email,
      name: contact.name,
      company: contact.company,
      site_url: qualifier.site_url || contact.website,
      role: qualifier.role || roleAnswer || "",
      sector: qualifier.sector || mapAuditBusinessToSector(businessAnswer),
      ads_spend_band:
        qualifier.ads_spend_band || mapAuditPaidSpendToAdsBand(paidSpendAnswer),
      pain_score: qualifier.pain_score,
      lost_tracking: qualifier.lost_tracking,
      stakeholders:
        qualifier.stakeholders || mapAuditPressureToStakeholders(pressureAnswer),
      timeline: qualifier.timeline,
      source: "signup",
      extraMetadata: {
        form: "audit",
        locale,
        audit_tier: tier,
        audit_score_raw: raw,
        audit_score_normalized: normalized,
        ga4_gap: answers[5]?.value,
        revenue: answers[2]?.value,
        role_internal: roleAnswer,
      },
    });

    const payload = {
      ...contact,
      answers,
      morando_score: normalized,
      raw_score: raw,
      tier,
      locale,
      submitted_at: new Date().toISOString(),
      signup,
    };

    try {
      await submitFirstPartyForm("audit", payload, { turnstileToken });
    } catch {
      setDeliveryError(locale === "es" ? "No hemos podido enviar la auditoría. Inténtalo de nuevo." : "We could not send the audit. Please try again.");
      setTurnstileToken(null);
      setTurnstileResetKey((key) => key + 1);
      setSubmitting(false);
      return;
    }

    setScoreTier(tier);
    setSubmitted(true);
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div className="bg-white border border-warm-100 rounded-[16px] p-10 md:p-14 text-center">
        <div className="w-14 h-14 rounded-full bg-ink mx-auto flex items-center justify-center mb-6">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2
          className="font-semibold text-ink leading-[1.2] tracking-[-0.02em] max-w-[28ch] mx-auto"
          style={{ fontSize: "clamp(22px, 2.4vw, 28px)" }}
        >
          {t.result.title}
        </h2>
        <p className="text-ink-2 text-[16px] leading-[1.6] max-w-[52ch] mx-auto mt-5">
          {t.result[scoreTier]}
        </p>
        <p className="font-mono text-[11px] text-ink-soft uppercase tracking-[0.1em] font-semibold mt-8">
          {t.result.note}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-warm-100 rounded-[16px] p-7 md:p-10">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-8">
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft font-semibold tabular-nums">
          {Math.round(progressPct)}%
        </div>
        <div className="flex-1 h-[3px] bg-warm-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-ink transition-all duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft font-semibold tabular-nums">
          {step}/{TOTAL_QUESTIONS}
        </div>
      </div>

      {/* Question */}
      {currentQuestion && (
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft font-semibold mb-2.5">
            {t.qOf(currentQuestion.id, TOTAL_QUESTIONS)}
            {currentQuestion.numLabel ? ` — ${currentQuestion.numLabel}` : ""}
          </div>
          <h2
            className="font-semibold text-ink leading-[1.3] tracking-[-0.015em] mb-2"
            style={{ fontSize: "clamp(19px, 1.8vw, 23px)" }}
          >
            {currentQuestion.text}
          </h2>
          <p className="text-[14px] text-ink-soft leading-[1.55] mb-6">
            {currentQuestion.helper}
          </p>
          <div className="flex flex-col gap-2.5">
            {currentQuestion.options.map((opt) => {
              const selected = answers[currentQuestion.id]?.value === opt.value;
              return (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => selectOption(currentQuestion.id, opt)}
                  className={`text-left rounded-[10px] px-5 py-4 text-[15px] leading-[1.4] border transition-colors ${
                    selected
                      ? "bg-ink text-white border-ink"
                      : "bg-warm-50 border-warm-100 text-ink hover:border-warm-200 hover:bg-white"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Contact step */}
      {isContactStep && (
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft font-semibold mb-2.5">
            {t.qOf(TOTAL_QUESTIONS, TOTAL_QUESTIONS)}
          </div>
          <h3
            className="font-semibold text-ink leading-[1.3] tracking-[-0.015em] mb-2"
            style={{ fontSize: "clamp(19px, 1.8vw, 23px)" }}
          >
            {t.contact.text}
          </h3>
          <p className="text-[14px] text-ink-soft leading-[1.55] mb-6">
            {t.contact.helper}
          </p>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={contact.company}
              onChange={(e) =>
                setContact({ ...contact, company: e.target.value })
              }
              placeholder={t.contact.company}
              className="w-full px-4 py-3.5 rounded-[10px] border border-warm-100 bg-warm-50 text-[15px] text-ink placeholder:text-ink-soft focus:outline-none focus:border-ink focus:bg-white"
              autoComplete="organization"
              required
            />
            <input
              type="url"
              value={contact.website}
              onChange={(e) =>
                setContact({ ...contact, website: e.target.value })
              }
              placeholder={t.contact.website}
              className="w-full px-4 py-3.5 rounded-[10px] border border-warm-100 bg-warm-50 text-[15px] text-ink placeholder:text-ink-soft focus:outline-none focus:border-ink focus:bg-white"
              autoComplete="url"
              required
            />
            <input
              type="email"
              value={contact.email}
              onChange={(e) =>
                setContact({ ...contact, email: e.target.value })
              }
              placeholder={t.contact.email}
              className="w-full px-4 py-3.5 rounded-[10px] border border-warm-100 bg-warm-50 text-[15px] text-ink placeholder:text-ink-soft focus:outline-none focus:border-ink focus:bg-white"
              autoComplete="email"
              required
            />
            <input
              type="text"
              value={contact.name}
              onChange={(e) => setContact({ ...contact, name: e.target.value })}
              placeholder={t.contact.name}
              className="w-full px-4 py-3.5 rounded-[10px] border border-warm-100 bg-warm-50 text-[15px] text-ink placeholder:text-ink-soft focus:outline-none focus:border-ink focus:bg-white"
              autoComplete="name"
              required
            />
          </div>

          <div className="mt-5">
            <SignupQualifier
              value={qualifier}
              onChange={setQualifier}
              locale={locale}
              idPrefix="audit"
              hide={{
                site_url: true,
                role: true,
                sector: true,
                ads_spend_band: true,
              }}
            />
          </div>
          <div className="mt-5">
            <LeadTurnstile
              onToken={setTurnstileToken}
              resetKey={turnstileResetKey}
              locale={locale}
            />
          </div>
          {deliveryError && <p role="alert" className="mt-3 text-[13px] text-red-alert">{deliveryError}</p>}
        </div>
      )}

      {/* Nav */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-warm-100">
        <button
          type="button"
          onClick={handleBack}
          className={`text-[14px] font-medium text-ink-soft hover:text-ink transition-colors ${
            step === 1 ? "invisible" : ""
          }`}
        >
          {t.back}
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!canAdvance || submitting}
          className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-white rounded-md text-[14px] font-semibold no-underline hover:bg-brand transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-ink"
        >
          {isContactStep ? t.submit : t.next}
        </button>
      </div>
    </div>
  );
}
