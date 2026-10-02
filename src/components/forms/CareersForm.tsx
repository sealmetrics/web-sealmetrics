"use client";

import { useState } from "react";
import { submitFirstPartyForm } from "@/lib/forms/submit";
import { LeadTurnstile } from "@/components/forms/LeadTurnstile";
import { micro } from "@/lib/analytics";

type Locale = "en" | "es";

export const TEAM_IDS = [
  "engineering",
  "product",
  "growth",
  "sales",
  "customer-success",
  "open",
] as const;

type TeamId = (typeof TEAM_IDS)[number];

const COPY: Record<
  Locale,
  {
    teamLabel: string;
    teams: Record<TeamId, string>;
    linksTitle: string;
    linksHelper: string;
    linkedin: string;
    github: string;
    other: string;
    otherHelper: string;
    addLink: string;
    removeLink: string;
    maxLinks: string;
    consent: string;
    privacyLabel: string;
    submit: string;
    submitting: string;
    errorTeam: string;
    errorLinks: string;
    errorUrl: string;
    errorEmail: string;
    successTitle: string;
    successBody: string;
    footnote: string;
  }
> = {
  en: {
    teamLabel: "Which team are you applying to?",
    teams: {
      engineering: "Engineering",
      product: "Product & Design",
      growth: "Growth & Marketing",
      sales: "Sales & Partnerships",
      "customer-success": "Customer Success",
      open: "Open application",
    },
    linksTitle: "Your public work",
    linksHelper:
      "Share at least one link. Public profiles only — the more your work speaks for itself, the better.",
    linkedin: "LinkedIn profile",
    github: "GitHub profile",
    other: "Other public link",
    otherHelper:
      "Portfolio, personal site, a talk, published writing, X — anything public that shows how you work.",
    addLink: "Add another link",
    removeLink: "Remove this link",
    maxLinks: "That's plenty — 6 links is the maximum.",
    consent:
      "I agree that Sealmetrics reviews the public links I share to evaluate my application, as described in the",
    privacyLabel: "Privacy Notice",
    submit: "Send My Public Profile →",
    submitting: "Sending…",
    errorTeam: "Pick the team you're applying to.",
    errorLinks: "Share at least one public link — LinkedIn, GitHub or another.",
    errorUrl: "One of the links is not a valid URL. Include https://",
    errorEmail:
      "That looks like an email address. Links to public profiles only — no personal data.",
    successTitle: "Received.",
    successBody:
      "We review every application against the team you picked. If there's a fit, we reach out through the profile you shared — no automated rejection emails, no drip sequence.",
    footnote: "No CV upload. No forms asking for your life story. Links only.",
  },
  es: {
    teamLabel: "¿A qué equipo te presentas?",
    teams: {
      engineering: "Ingeniería",
      product: "Producto y Diseño",
      growth: "Growth y Marketing",
      sales: "Ventas y Partnerships",
      "customer-success": "Customer Success",
      open: "Candidatura abierta",
    },
    linksTitle: "Tu trabajo público",
    linksHelper:
      "Comparte al menos un enlace. Solo perfiles públicos — cuanto más hable tu trabajo por sí mismo, mejor.",
    linkedin: "Perfil de LinkedIn",
    github: "Perfil de GitHub",
    other: "Otro enlace público",
    otherHelper:
      "Portfolio, web personal, una charla, artículos publicados, X — cualquier cosa pública que muestre cómo trabajas.",
    addLink: "Añadir otro enlace",
    removeLink: "Quitar este enlace",
    maxLinks: "Con eso basta — el máximo son 6 enlaces.",
    consent:
      "Acepto que Sealmetrics revise los enlaces públicos que comparto para evaluar mi candidatura, según el",
    privacyLabel: "Aviso de Privacidad",
    submit: "Enviar mi perfil público →",
    submitting: "Enviando…",
    errorTeam: "Elige el equipo al que te presentas.",
    errorLinks:
      "Comparte al menos un enlace público — LinkedIn, GitHub u otro.",
    errorUrl: "Uno de los enlaces no es una URL válida. Incluye https://",
    errorEmail:
      "Eso parece un email. Solo enlaces a perfiles públicos — sin datos personales.",
    successTitle: "Recibido.",
    successBody:
      "Revisamos cada candidatura contra el equipo que has elegido. Si hay encaje, te contactamos a través del perfil que has compartido — sin emails automáticos de rechazo, sin secuencias.",
    footnote:
      "Sin subir CV. Sin formularios que piden tu vida entera. Solo enlaces.",
  },
};

const EMAIL_LIKE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeUrl(value: string): string | null {
  const raw = value.trim();
  if (raw === "") return "";
  if (EMAIL_LIKE.test(raw)) return null;
  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const url = new URL(candidate);
    if (!url.hostname.includes(".")) return null;
    return url.href;
  } catch {
    return null;
  }
}

// Hard cap on extra-link rows: enough for a portfolio + talks + writing,
// low enough to keep the webhook payload bounded.
const MAX_OTHER_LINKS = 4;

const inputClass =
  "w-full px-4 py-3 text-[15px] border border-warm-200 rounded-md bg-white focus:border-brand focus:outline-none transition-colors";
const labelClass =
  "block text-[12px] font-mono uppercase tracking-[0.08em] text-ink-soft font-semibold mb-1.5";

export function CareersForm({ locale = "en" }: { locale?: Locale }) {
  const t = COPY[locale];
  const [team, setTeam] = useState<TeamId | null>(null);
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [others, setOthers] = useState<string[]>([""]);
  const [gdpr, setGdpr] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!team) {
      setError(t.errorTeam);
      return;
    }
    if (!gdpr) {
      setError(locale === "es" ? "Acepta el aviso de privacidad." : "Please accept the privacy notice.");
      return;
    }
    if (!turnstileToken) {
      setError(locale === "es" ? "Completa la verificación de seguridad." : "Please complete the security verification.");
      return;
    }

    const fields = [linkedin, github, ...others];
    if (fields.some((v) => EMAIL_LIKE.test(v.trim()))) {
      setError(t.errorEmail);
      return;
    }
    const normalized = fields.map(normalizeUrl);
    if (normalized.some((v) => v === null)) {
      setError(t.errorUrl);
      return;
    }
    const [linkedinUrl, githubUrl, ...otherUrls] = normalized as string[];
    const otherLinks = otherUrls.filter((v) => v !== "");
    if (!linkedinUrl && !githubUrl && otherLinks.length === 0) {
      setError(t.errorLinks);
      return;
    }

    setSubmitting(true);

    const payload = {
      form: "careers",
      locale,
      team,
      linkedin: linkedinUrl,
      github: githubUrl,
      other_links: otherLinks,
      source: typeof window !== "undefined" ? window.location.href : "",
    };

    micro("form_submit", { form: "careers", team });

    try {
      await submitFirstPartyForm("careers", payload, { turnstileToken });
    } catch (err) {
      console.warn("Form delivery failed", err);
      setError(locale === "es" ? "No hemos podido enviar la solicitud." : "We could not send the application.");
      setSubmitting(false);
      setTurnstileToken(null);
      setTurnstileResetKey((key) => key + 1);
      return;
    }

    setSubmitting(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="bg-white border border-warm-100 rounded-xl p-8 md:p-9">
        <h3
          className="font-semibold text-ink leading-[1.2] tracking-[-0.02em]"
          style={{ fontSize: "clamp(20px, 2.2vw, 26px)" }}
        >
          {t.successTitle}
        </h3>
        <p className="text-[15px] text-ink-soft leading-[1.6] mt-3">
          {t.successBody}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="bg-white border border-warm-100 rounded-xl p-8 md:p-9 space-y-6"
    >
      <fieldset>
        <legend className={labelClass}>{t.teamLabel}</legend>
        <div className="flex flex-wrap gap-2.5 mt-1">
          {TEAM_IDS.map((id) => {
            const selected = team === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={selected}
                onClick={() => setTeam(id)}
                className={`px-4 py-2.5 rounded-full border text-[14px] leading-none transition-all cursor-pointer ${
                  selected
                    ? "bg-brand text-ink border-brand"
                    : "bg-warm-50 border-warm-100 text-ink hover:border-brand hover:bg-white"
                }`}
              >
                {t.teams[id]}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <p className="text-[15px] font-semibold text-ink tracking-[-0.01em]">
          {t.linksTitle}
        </p>
        <p className="text-[13px] text-ink-soft leading-[1.55] mt-1">
          {t.linksHelper}
        </p>
      </div>

      <div>
        <label htmlFor="careers-linkedin" className={labelClass}>
          {t.linkedin}
        </label>
        <input
          id="careers-linkedin"
          name="linkedin"
          type="text"
          inputMode="url"
          placeholder="https://linkedin.com/in/…"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="careers-github" className={labelClass}>
          {t.github}
        </label>
        <input
          id="careers-github"
          name="github"
          type="text"
          inputMode="url"
          placeholder="https://github.com/…"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="careers-other-0" className={labelClass}>
          {t.other}
        </label>
        <div className="flex flex-col gap-2.5">
          {others.map((value, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <input
                id={`careers-other-${i}`}
                name={`other-${i}`}
                type="text"
                inputMode="url"
                placeholder="https://"
                aria-label={i > 0 ? `${t.other} ${i + 1}` : undefined}
                value={value}
                onChange={(e) =>
                  setOthers((prev) =>
                    prev.map((v, j) => (j === i ? e.target.value : v))
                  )
                }
                className={inputClass}
              />
              {i > 0 && (
                <button
                  type="button"
                  aria-label={t.removeLink}
                  title={t.removeLink}
                  onClick={() =>
                    setOthers((prev) => prev.filter((_, j) => j !== i))
                  }
                  className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-md border border-warm-200 text-ink-soft text-[18px] leading-none hover:border-red-alert hover:text-red-alert transition-colors cursor-pointer"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
        {others.length < MAX_OTHER_LINKS ? (
          <button
            type="button"
            onClick={() =>
              setOthers((prev) =>
                prev.length < MAX_OTHER_LINKS ? [...prev, ""] : prev
              )
            }
            className="mt-2.5 inline-flex items-center gap-2 px-3.5 py-2 rounded-md border border-dashed border-warm-200 text-[13px] font-semibold text-ink-soft hover:border-brand hover:text-brand transition-colors cursor-pointer bg-transparent"
          >
            <span aria-hidden className="text-[15px] leading-none">
              +
            </span>
            {t.addLink}
          </button>
        ) : (
          <p className="text-[12.5px] text-ink-soft leading-[1.55] mt-2.5">
            {t.maxLinks}
          </p>
        )}
        <p className="text-[12.5px] text-ink-soft leading-[1.55] mt-1.5">
          {t.otherHelper}
        </p>
      </div>

      <div className="flex items-start gap-3">
        <input
          id="careers-gdpr"
          type="checkbox"
          required
          checked={gdpr}
          onChange={(e) => setGdpr(e.target.checked)}
          className="mt-1 w-4 h-4 rounded border border-warm-200 accent-brand cursor-pointer flex-shrink-0"
        />
        <label
          htmlFor="careers-gdpr"
          className="text-[12.5px] text-ink-soft leading-relaxed cursor-pointer"
        >
          {t.consent}{" "}
          <a
            href="/privacy/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink underline hover:text-brand transition-colors"
          >
            {t.privacyLabel}
          </a>
          .
        </label>
      </div>

      <LeadTurnstile
        onToken={setTurnstileToken}
        resetKey={turnstileResetKey}
        locale={locale}
      />

      {error && <p className="text-[13px] text-red-alert">{error}</p>}

      <button
        type="submit"
        disabled={submitting || !turnstileToken}
        className="w-full py-3.5 text-[15px] font-semibold text-white bg-ink rounded-md hover:bg-brand transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? t.submitting : t.submit}
      </button>
      <p className="text-[12px] text-ink-soft text-center font-mono tracking-[0.04em]">
        {t.footnote}
      </p>
    </form>
  );
}
