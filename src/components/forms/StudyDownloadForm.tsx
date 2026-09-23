"use client";

import { useState } from "react";
import { pushEvent } from "@/lib/analytics";
import { submitFirstPartyForm } from "@/lib/forms/submit";
import { LeadTurnstile } from "@/components/forms/LeadTurnstile";

/**
 * Asks for an email and sends a sector study to it (n8n `sm-study-download`, through
 * the forms Worker as `study_download`). Only the study's slug travels: which PDF goes
 * out is decided by n8n from a closed list.
 *
 * Unlike the brand report, a personal address is accepted. Sending a PDF costs nothing,
 * so there is no cost to gate; n8n marks personal addresses in the CRM instead. Spanish
 * only, like the studies themselves for now.
 */

const EMAIL_RE = /^[^@\s]+@[^@\s.]+\.[^@\s]+$/;

export function StudyDownloadForm({ study }: { study: string }) {
  const [email, setEmail] = useState("");
  // Unticked and optional: the study is what was asked for, the newsletter is a
  // separate consent (GDPR art. 7.2, LSSI art. 21).
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const [companyFax, setCompanyFax] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);

  const canSubmit = Boolean(email.trim() && turnstileToken) && status !== "submitting";

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canSubmit) return;
    const cleanEmail = email.trim().toLowerCase();
    if (!EMAIL_RE.test(cleanEmail)) {
      setStatus("error");
      setMessage("Ese correo no parece válido.");
      return;
    }
    setStatus("submitting");
    setMessage("");
    try {
      await submitFirstPartyForm(
        "study_download",
        { email: cleanEmail, study, marketing_consent: marketingConsent },
        { companyFax, turnstileToken: turnstileToken ?? "" },
      );
      // Counted on the request the relay accepted. The email never goes to the pixel.
      pushEvent({ event: "lead_study_download", study });
      setStatus("sent");
    } catch {
      setStatus("error");
      setMessage("Ahora mismo no hemos podido enviarlo. Prueba en un momento.");
      setTurnstileToken(null);
      setTurnstileResetKey((key) => key + 1);
    }
  }

  if (status === "sent") {
    return (
      <div className="sig-brand-form sig-study-sent" role="status">
        <p>
          <strong>Te lo hemos enviado.</strong> Mira tu correo en un par de minutos; si no está,
          revisa la carpeta de promociones.
        </p>
      </div>
    );
  }

  return (
    <form className="sig-brand-form" onSubmit={handleSubmit} noValidate>
      <div className="sig-study-row">
        <label className="sig-brand-field">
          <span>Tu correo</span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="tu@tuhotel.com"
            maxLength={254}
            required
          />
        </label>
        <input
          type="text"
          name="company_fax"
          value={companyFax}
          onChange={(event) => setCompanyFax(event.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="sig-brand-honeypot"
        />
        <button type="submit" className="sig-brand-submit" disabled={!canSubmit}>
          {status === "submitting" ? "Enviando" : "Envíamelo"}
        </button>
      </div>

      <label className="sig-brand-consent">
        <input
          type="checkbox"
          name="marketing_consent"
          checked={marketingConsent}
          onChange={(event) => setMarketingConsent(event.target.checked)}
        />
        <span>
          Enviadme también, de vez en cuando, estudios y novedades de Sealmetrics. Es opcional: te
          das de baja en un clic, y el informe te llega igual.
        </span>
      </label>

      <div className="sig-brand-foot">
        <div className="sig-brand-foot-left">
          <LeadTurnstile onToken={setTurnstileToken} resetKey={turnstileResetKey} locale="es" />
        </div>
      </div>

      {status === "error" && message ? (
        <p role="alert" className="sig-brand-error">
          {message}
        </p>
      ) : null}

      {/* First layer of the GDPR art. 13 information at the point of collection. */}
      <div className="sig-brand-notice">
        <p className="sig-brand-notice-title">Protección de datos, lo básico</p>
        <dl>
          <div>
            <dt>Responsable</dt>
            <dd>Sealmetrics S.L.</dd>
          </div>
          <div>
            <dt>Finalidad</dt>
            <dd>
              Enviarte este estudio por correo. Si marcas la casilla, también correos ocasionales de
              Sealmetrics.
            </dd>
          </div>
          <div>
            <dt>Legitimación</dt>
            <dd>
              Tu solicitud del estudio (art. 6.1.b RGPD). Para los correos ocasionales, tu
              consentimiento (art. 6.1.a), que puedes retirar cuando quieras.
            </dd>
          </div>
          <div>
            <dt>Destinatarios</dt>
            <dd>
              Resend (EE. UU., cláusulas contractuales tipo) entrega el correo y Cloudflare hace la
              comprobación antibots.
            </dd>
          </div>
          <div>
            <dt>Derechos</dt>
            <dd>Acceso, rectificación, supresión, oposición y portabilidad, en privacy@sealmetrics.com.</dd>
          </div>
        </dl>
        <p>
          <a href="/es/privacy/">Política de privacidad completa</a>
        </p>
      </div>
    </form>
  );
}
