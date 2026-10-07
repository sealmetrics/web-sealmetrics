"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { scoreAnswers, type DemoAnswers } from "@/lib/demo-scoring";
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
} from "@/lib/signup/payload";

// Map the existing demo qualification answers onto the /inbound/signup
// enums. Lossy by design — the canonical signup buckets are coarser than
// the demo ones, so we round to the closest match.
function mapBusinessToSector(business?: string): SectorEnum | "" {
  if (business === "ecommerce") return "ecom";
  if (business === "hotel") return "hotel";
  if (business === "travel" || business === "saas" || business === "other") return "other";
  return "";
}

function mapPaidSpendToAdsBand(spend?: string): AdsSpendEnum | "" {
  if (spend === "gt100k") return "50k_200k";
  if (spend === "20k-100k") return "50k_200k";
  if (spend === "5k-20k") return "10k_50k";
  if (spend === "lt5k") return "lt_10k";
  if (spend === "none") return "lt_10k";
  return "";
}

function roleLabel(role?: string): string {
  switch (role) {
    case "decisor":
      return "Decision-maker (CMO / CEO)";
    case "recommends":
      return "Recommender";
    case "implements":
      return "Implementer";
    case "other":
      return "Other";
    default:
      return "";
  }
}

interface Question {
  id: keyof DemoAnswers;
  label: string;
  helper?: string;
  options: { value: string; label: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: "ga4Gap",
    label: "How big is the gap between GA4 and your real backend revenue?",
    helper: "If you've never compared, that's an answer too.",
    options: [
      { value: "gt50", label: "More than 50%" },
      { value: "30-50", label: "30 to 50%" },
      { value: "10-30", label: "10 to 30%" },
      { value: "lt10", label: "Less than 10%" },
      { value: "never", label: "I've never compared" },
    ],
  },
  {
    id: "pressure",
    label: "Who's asking for clearer numbers above you?",
    options: [
      { value: "cfo", label: "The CFO is blocking decisions on this" },
      { value: "board", label: "Direction or board" },
      { value: "team", label: "My team" },
      { value: "me", label: "Just me" },
      { value: "nobody", label: "Nobody yet" },
    ],
  },
  {
    id: "paidSpend",
    label: "Monthly paid media spend?",
    options: [
      { value: "gt100k", label: "More than €100K" },
      { value: "20k-100k", label: "€20K to €100K" },
      { value: "5k-20k", label: "€5K to €20K" },
      { value: "lt5k", label: "Less than €5K" },
      { value: "none", label: "We don't run paid" },
    ],
  },
  {
    id: "revenue",
    label: "Annual revenue?",
    options: [
      { value: "1m-50m", label: "€1M to €50M" },
      { value: "gt50m", label: "More than €50M" },
      { value: "500k-1m", label: "€500K to €1M" },
      { value: "lt500k", label: "Less than €500K" },
    ],
  },
  {
    id: "business",
    label: "What kind of business?",
    options: [
      { value: "ecommerce", label: "eCommerce / DTC" },
      { value: "hotel", label: "Hotel group" },
      { value: "travel", label: "Travel" },
      { value: "saas", label: "SaaS" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: "role",
    label: "Your role in the decision?",
    helper: "We use this to tailor the conversation, not to disqualify you.",
    options: [
      { value: "decisor", label: "I decide (CMO / CEO)" },
      { value: "recommends", label: "I recommend" },
      { value: "implements", label: "I implement" },
      { value: "other", label: "Something else" },
    ],
  },
];

const TOTAL_STEPS = QUESTIONS.length + 1;

export function DemoForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<DemoAnswers>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [gdpr, setGdpr] = useState(false);
  const [qualifier, setQualifier] = useState<QualifierState>(EMPTY_QUALIFIER);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);

  const select = (id: keyof DemoAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setStep(step + 1);
    }
  };

  const back = () => setStep(Math.max(0, step - 1));

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (
      !answers.business ||
      !answers.revenue ||
      !answers.role ||
      !answers.paidSpend ||
      !answers.ga4Gap ||
      !answers.pressure
    ) {
      setError("Please complete all questions before submitting.");
      setSubmitting(false);
      return;
    }
    if (!turnstileToken) {
      setError("Please complete the security verification.");
      setSubmitting(false);
      return;
    }

    const { raw, normalized, tier } = scoreAnswers(answers as DemoAnswers);

    const signup = buildSignupPayload({
      email,
      name,
      site_url: website,
      role: qualifier.role || roleLabel(answers.role),
      sector: qualifier.sector || mapBusinessToSector(answers.business),
      ads_spend_band:
        qualifier.ads_spend_band || mapPaidSpendToAdsBand(answers.paidSpend),
      pain_score: qualifier.pain_score,
      lost_tracking: qualifier.lost_tracking,
      stakeholders: qualifier.stakeholders,
      timeline: qualifier.timeline,
      source: "signup",
      extraMetadata: {
        form: "demo",
        locale: "en",
        demo_tier: tier,
        demo_score_raw: raw,
        demo_score_normalized: normalized,
        ga4_gap: answers.ga4Gap,
        pressure: answers.pressure,
        revenue: answers.revenue,
        business: answers.business,
        role_internal: answers.role,
      },
    });

    const payload = {
      name,
      email,
      website,
      locale: "en",
      source: typeof window !== "undefined" ? window.location.href : "",
      answers,
      score: { raw, normalized, tier },
      signup,
      gdpr,
    };

    pushEvent({ event: "demo_request", value: 1, email });

    try {
      await submitFirstPartyForm("demo", payload, { turnstileToken });
    } catch (err) {
      console.warn("Form delivery failed", err);
      setError("We could not send your request. Please try again.");
      setSubmitting(false);
      setTurnstileToken(null);
      setTurnstileResetKey((key) => key + 1);
      return;
    }

    router.push(`/demo/thank-you?tier=${tier}`);
  };

  const progressPct = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="bg-white border border-warm-100 rounded-xl p-8 md:p-9">
      {/* Progress */}
      <div className="mb-7">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft font-semibold">
            Step {step + 1} of {TOTAL_STEPS}
          </span>
          {step > 0 && step <= QUESTIONS.length && (
            <button
              type="button"
              onClick={back}
              className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft hover:text-ink transition-colors"
            >
              ← Back
            </button>
          )}
        </div>
        <div className="h-1 bg-warm-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Question steps */}
      {step < QUESTIONS.length && (
        <div>
          <h2
            className="font-semibold text-ink leading-[1.2] tracking-[-0.02em]"
            style={{ fontSize: "clamp(20px, 2.2vw, 26px)" }}
          >
            {QUESTIONS[step].label}
          </h2>
          {QUESTIONS[step].helper && (
            <p className="text-[13.5px] text-ink-soft leading-[1.55] mt-2">
              {QUESTIONS[step].helper}
            </p>
          )}
          <div className="flex flex-col gap-2.5 mt-6">
            {QUESTIONS[step].options.map((opt) => {
              const selected = answers[QUESTIONS[step].id] === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => select(QUESTIONS[step].id, opt.value)}
                  className={`text-left px-5 py-4 rounded-lg border text-[15px] leading-[1.4] transition-all ${
                    selected
                      ? "bg-brand text-ink border-brand"
                      : "bg-warm-50 border-warm-100 text-ink hover:border-brand hover:bg-white"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Final step: contact */}
      {step === QUESTIONS.length && (
        <form onSubmit={submit} className="space-y-5">
          <div>
            <h2
              className="font-semibold text-ink leading-[1.2] tracking-[-0.02em]"
              style={{ fontSize: "clamp(20px, 2.2vw, 26px)" }}
            >
              One last thing — where do we send your audit?
            </h2>
            <p className="text-[13.5px] text-ink-soft leading-[1.55] mt-2">
              Human-written, delivered within 24h. No drip sequence.
            </p>
          </div>

          <div>
            <label htmlFor="name" className="block text-[12px] font-mono uppercase tracking-[0.08em] text-ink-soft font-semibold mb-1.5">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 text-[15px] border border-warm-200 rounded-md bg-white focus:border-brand focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-[12px] font-mono uppercase tracking-[0.08em] text-ink-soft font-semibold mb-1.5">
              Work email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-[15px] border border-warm-200 rounded-md bg-white focus:border-brand focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="website" className="block text-[12px] font-mono uppercase tracking-[0.08em] text-ink-soft font-semibold mb-1.5">
              Your website
            </label>
            <input
              id="website"
              name="website"
              type="url"
              required
              placeholder="https://"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full px-4 py-3 text-[15px] border border-warm-200 rounded-md bg-white focus:border-brand focus:outline-none transition-colors"
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              id="gdpr"
              type="checkbox"
              required
              checked={gdpr}
              onChange={(e) => setGdpr(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border border-warm-200 accent-brand cursor-pointer flex-shrink-0"
            />
            <label htmlFor="gdpr" className="text-[12.5px] text-ink-soft leading-relaxed cursor-pointer">
              I agree to the{" "}
              <a
                href="/privacy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline hover:text-brand transition-colors"
              >
                Privacy Notice
              </a>{" "}
              and consent to Sealmetrics processing my data to respond to my request.
            </label>
          </div>

          <SignupQualifier
            value={qualifier}
            onChange={setQualifier}
            locale="en"
            idPrefix="demo"
            hide={{
              site_url: true,
              role: true,
              sector: true,
              ads_spend_band: true,
            }}
          />

          <LeadTurnstile onToken={setTurnstileToken} resetKey={turnstileResetKey} />

          {error && <p className="text-[13px] text-red-alert">{error}</p>}

          <button
            type="submit"
            disabled={submitting || !turnstileToken}
            className="w-full py-3.5 text-[15px] font-semibold text-white bg-ink rounded-md hover:bg-brand transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Sending…" : "Talk with a Privacy-Analytics Specialist →"}
          </button>
          <p className="text-[12px] text-ink-soft text-center font-mono tracking-[0.04em]">
            We respond within one business day.
          </p>
        </form>
      )}
    </div>
  );
}
