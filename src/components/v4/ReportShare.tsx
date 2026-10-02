"use client";

import { useState } from "react";
import { PERSONAL_DOMAINS } from "@/components/forms/BrandReportForm";
import { LeadTurnstile } from "@/components/forms/LeadTurnstile";
import { pushEvent } from "@/lib/analytics";
import { FORMS_WORKER_BASE } from "@/lib/forms/submit";

type Locale = "en" | "es";

// Same limits the forms Worker enforces; checked here only to explain a refusal.
const MAX_RECIPIENTS = 5;
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const copy = {
  en: {
    open: "Share the report",
    title: "Share this report",
    recipients: "Work emails",
    recipientsHint: "Up to five, separated by commas.",
    recipientsPlaceholder: "ana@company.com, luis@company.com",
    name: "Your name",
    nameHint: "Optional. It tells them who sent it.",
    submit: "Send",
    sending: "Sending",
    cancel: "Close",
    done: (n: number) => `Sent to ${n} ${n === 1 ? "person" : "people"}. Each gets the link once.`,
    errorEmpty: "Write at least one email.",
    errorTooMany: "Five emails at most.",
    errorInvalid: (e: string) => `«${e}» does not look like an email.`,
    errorPersonal: (e: string) => `«${e}» is a personal address. Use work emails.`,
    errorRepeated: "An email is repeated.",
    errorName: "The name cannot include links or addresses.",
    errorLimit: "This report has already been shared with as many people as it can be.",
    errorExpired: "This report has expired and can no longer be shared.",
    errorGeneric: "It could not be sent right now. Try again in a moment.",
    notice:
      "We send each address one email with the link and do not keep it, add it to any list or write to it again. Sealmetrics S.L. · privacy@sealmetrics.com",
  },
  es: {
    open: "Compartir el informe",
    title: "Compartir este informe",
    recipients: "Correos de empresa",
    recipientsHint: "Hasta cinco, separados por comas.",
    recipientsPlaceholder: "ana@empresa.com, luis@empresa.com",
    name: "Tu nombre",
    nameHint: "Opcional. Así saben quién se lo manda.",
    submit: "Enviar",
    sending: "Enviando",
    cancel: "Cerrar",
    done: (n: number) => `Enviado a ${n} ${n === 1 ? "persona" : "personas"}. Cada una recibe el enlace una vez.`,
    errorEmpty: "Escribe al menos un correo.",
    errorTooMany: "Cinco correos como máximo.",
    errorInvalid: (e: string) => `«${e}» no parece un correo.`,
    errorPersonal: (e: string) => `«${e}» es un correo personal. Usa correos de empresa.`,
    errorRepeated: "Hay un correo repetido.",
    errorName: "El nombre no puede llevar enlaces ni direcciones.",
    errorLimit: "Este informe ya se ha compartido con todas las personas posibles.",
    errorExpired: "Este informe ha caducado y ya no se puede compartir.",
    errorGeneric: "Ahora mismo no se ha podido enviar. Prueba en un momento.",
    notice:
      "Enviamos a cada dirección un correo con el enlace y no la guardamos, ni la añadimos a ninguna lista, ni volvemos a escribirle. Sealmetrics S.L. · privacy@sealmetrics.com",
  },
} as const;

export function ReportShare({ locale, token }: { locale: Locale; token: string }) {
  const t = copy[locale];
  const [open, setOpen] = useState(false);
  const [recipients, setRecipients] = useState("");
  const [name, setName] = useState("");
  const [companyFax, setCompanyFax] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  function check(list: string[]): string | null {
    if (list.length === 0) return t.errorEmpty;
    if (list.length > MAX_RECIPIENTS) return t.errorTooMany;
    if (new Set(list).size !== list.length) return t.errorRepeated;
    for (const email of list) {
      if (!EMAIL_RE.test(email)) return t.errorInvalid(email);
      if (PERSONAL_DOMAINS.has(email.split("@")[1])) return t.errorPersonal(email);
    }
    if (/https?:|www\.|@|<|>/i.test(name)) return t.errorName;
    return null;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const list = recipients
      .split(/[,;\s]+/)
      .map((r) => r.trim().toLowerCase())
      .filter(Boolean);
    const problem = check(list);
    if (problem) {
      setStatus("error");
      setMessage(problem);
      return;
    }
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch(`${FORMS_WORKER_BASE}/api/forms`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "report_share",
          payload: { token, language: locale, recipients: list, sender_name: name.trim() },
          company_fax: companyFax,
          turnstileToken: turnstileToken ?? "",
        }),
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!response.ok || result.ok !== true) {
        setStatus("error");
        setMessage(
          result.error === "share_limit"
            ? t.errorLimit
            : result.error === "report_not_found"
              ? t.errorExpired
              : t.errorGeneric,
        );
        setTurnstileResetKey((k) => k + 1);
        return;
      }
      // Counted as one share action, with how many people it went to; never the addresses.
      pushEvent({ event: "brand_report_share", language: locale, recipients: list.length });
      setStatus("done");
      setMessage(t.done(list.length));
      setRecipients("");
    } catch {
      setStatus("error");
      setMessage(t.errorGeneric);
      setTurnstileResetKey((k) => k + 1);
    }
  }

  if (!open) {
    return (
      <button type="button" className="sig-report-viewer-share-open" onClick={() => setOpen(true)}>
        {t.open}
      </button>
    );
  }

  return (
    <form className="sig-report-share" onSubmit={handleSubmit} noValidate aria-label={t.title}>
      <p className="sig-report-share-title">{t.title}</p>
      <label>
        <span>{t.recipients}</span>
        <input
          type="text"
          inputMode="email"
          autoComplete="off"
          value={recipients}
          onChange={(event) => setRecipients(event.target.value)}
          placeholder={t.recipientsPlaceholder}
          maxLength={600}
          required
        />
        <small>{t.recipientsHint}</small>
      </label>
      <label>
        <span>{t.name}</span>
        <input
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={60}
        />
        <small>{t.nameHint}</small>
      </label>
      <input
        type="text"
        name="company_fax"
        value={companyFax}
        onChange={(event) => setCompanyFax(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sig-report-share-honeypot"
      />
      <LeadTurnstile onToken={setTurnstileToken} resetKey={turnstileResetKey} locale={locale} />
      <div className="sig-report-share-actions">
        <button type="submit" disabled={status === "sending" || !turnstileToken}>
          {status === "sending" ? t.sending : t.submit}
        </button>
        <button type="button" className="is-secondary" onClick={() => setOpen(false)}>
          {t.cancel}
        </button>
      </div>
      {message ? (
        <p className={`sig-report-share-message is-${status}`} role={status === "error" ? "alert" : "status"}>
          {message}
        </p>
      ) : null}
      <p className="sig-report-share-notice">{t.notice}</p>
    </form>
  );
}
