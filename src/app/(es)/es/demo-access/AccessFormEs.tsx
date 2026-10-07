"use client";

import { useEffect, useRef, useState } from "react";
import { pushEvent } from "@/lib/analytics";
import {
  SignupQualifier,
  EMPTY_QUALIFIER,
  type QualifierState,
} from "@/components/forms/SignupQualifier";
import { buildSignupPayload } from "@/lib/signup/payload";
import { submitFirstPartyForm } from "@/lib/forms/submit";
import { LeadTurnstile } from "@/components/forms/LeadTurnstile";

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com",
  "yahoo.com", "yahoo.es", "yahoo.co.uk", "yahoo.fr", "yahoo.de", "yahoo.it",
  "ymail.com", "rocketmail.com",
  "hotmail.com", "hotmail.es", "hotmail.co.uk", "hotmail.fr", "hotmail.de", "hotmail.it",
  "outlook.com", "outlook.es", "outlook.fr", "outlook.de", "outlook.it",
  "live.com", "live.es", "live.fr", "live.de", "live.co.uk",
  "msn.com", "aol.com",
  "icloud.com", "me.com", "mac.com",
  "protonmail.com", "proton.me", "pm.me",
  "gmx.com", "gmx.net", "gmx.de", "gmx.es",
  "mail.com", "mail.ru", "yandex.com", "yandex.ru",
  "zoho.com", "fastmail.com", "fastmail.fm",
  "tutanota.com", "tutanota.de", "tutamail.com", "tuta.io",
  "hey.com", "duck.com",
  "qq.com", "163.com", "126.com", "sina.com",
  "free.fr", "orange.fr", "wanadoo.fr", "laposte.net",
  "libero.it", "tiscali.it", "alice.it", "virgilio.it",
  "telefonica.net", "terra.es", "ya.com",
]);

function normalizeHostname(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  let candidate = trimmed;
  if (!/^https?:\/\//i.test(candidate)) candidate = `https://${candidate}`;
  try {
    const url = new URL(candidate);
    return url.hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return null;
  }
}

function emailDomain(email: string): string | null {
  const at = email.lastIndexOf("@");
  if (at === -1) return null;
  const domain = email.slice(at + 1).trim().toLowerCase();
  return domain || null;
}

function domainsMatch(emailDom: string, siteHost: string): boolean {
  if (emailDom === siteHost) return true;
  if (emailDom.endsWith(`.${siteHost}`)) return true;
  if (siteHost.endsWith(`.${emailDom}`)) return true;
  return false;
}

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export function AccessFormEs() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [gdpr, setGdpr] = useState(false);
  const [qualifier, setQualifier] = useState<QualifierState>(EMPTY_QUALIFIER);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const microFired = useRef(false);

  useEffect(() => {
    if (status.kind !== "success" || microFired.current) return;
    microFired.current = true;
    pushEvent({ event: "lead_demo_access", email, locale: "es" });
  }, [status.kind, email]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !company.trim() || !website.trim() || !email.trim()) {
      setStatus({ kind: "error", message: "Todos los campos son obligatorios." });
      return;
    }

    const host = normalizeHostname(website);
    if (!host) {
      setStatus({ kind: "error", message: "Introduce una URL válida." });
      return;
    }

    const dom = emailDomain(email);
    if (!dom) {
      setStatus({ kind: "error", message: "Introduce un email válido." });
      return;
    }

    if (FREE_EMAIL_DOMAINS.has(dom)) {
      setStatus({
        kind: "error",
        message: "Los proveedores de email personales no se aceptan. Usa tu email corporativo.",
      });
      return;
    }

    if (!domainsMatch(dom, host)) {
      setStatus({
        kind: "error",
        message: `El dominio de tu email (${dom}) debe coincidir con tu web (${host}).`,
      });
      return;
    }

    if (!gdpr) {
      setStatus({ kind: "error", message: "Acepta el aviso de privacidad para continuar." });
      return;
    }
    if (!turnstileToken) {
      setStatus({ kind: "error", message: "Completa la verificación de seguridad." });
      return;
    }

    setStatus({ kind: "submitting" });

    const signup = buildSignupPayload({
      email: email.trim(),
      name: name.trim(),
      company: company.trim(),
      site_url: qualifier.site_url || `https://${host}`,
      role: qualifier.role,
      sector: qualifier.sector,
      ads_spend_band: qualifier.ads_spend_band,
      pain_score: qualifier.pain_score,
      lost_tracking: qualifier.lost_tracking,
      stakeholders: qualifier.stakeholders,
      timeline: qualifier.timeline,
      source: "signup",
      extraMetadata: {
        form: "demo-access",
        locale: "es",
        email_domain: dom,
      },
    });

    const payload = {
      name: name.trim(),
      company: company.trim(),
      website: host,
      websiteRaw: website.trim(),
      email: email.trim().toLowerCase(),
      emailDomain: dom,
      locale: "es",
      source: typeof window !== "undefined" ? window.location.href : "",
      submittedAt: new Date().toISOString(),
      signup,
      gdpr,
    };

    pushEvent({ event: "demo_access_request", value: 1, email: payload.email });

    try {
      await submitFirstPartyForm("demo_access", payload, { turnstileToken });
      setStatus({ kind: "success" });
    } catch (err) {
      console.warn("Webhook delivery failed", err);
      setStatus({ kind: "error", message: "Algo ha fallado. Inténtalo en un minuto." });
      setTurnstileToken(null);
      setTurnstileResetKey((key) => key + 1);
    }
  };

  if (status.kind === "success") {
    return (
      <div className="bg-white border border-warm-100 rounded-xl p-8 md:p-9">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-brand">
          Solicitud recibida
        </span>
        <h2
          className="font-semibold text-ink leading-[1.15] tracking-[-0.02em] mt-3"
          style={{ fontSize: "clamp(22px, 2.4vw, 28px)" }}
        >
          Revisa tu inbox — <em className="italic-accent">credenciales en camino.</em>
        </h2>
        <p className="text-[15px] text-ink-soft leading-[1.6] mt-4">
          Si tu dominio pasa la validación, recibirás usuario y contraseña en{" "}
          <span className="text-ink font-semibold">{email}</span> en pocos minutos. Si no llega, revisa spam y busca &ldquo;Sealmetrics&rdquo;.
        </p>
        <p className="text-[13.5px] text-ink-soft leading-[1.55] mt-5">
          ¿Prefieres un tour guiado?{" "}
          <a
            href="/es/demo"
            className="text-ink underline hover:text-brand transition-colors"
          >
            Reserva un walkthrough de 30 minutos
          </a>
          .
        </p>
      </div>
    );
  }

  const submitting = status.kind === "submitting";
  const errorMsg = status.kind === "error" ? status.message : null;

  return (
    <form
      onSubmit={submit}
      className="bg-white border border-warm-100 rounded-xl p-8 md:p-9 space-y-5"
    >
      <div>
        <label htmlFor="es-name" className="block text-[12px] font-mono uppercase tracking-[0.08em] text-ink-soft font-semibold mb-1.5">
          Nombre completo
        </label>
        <input
          id="es-name"
          name="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 text-[15px] border border-warm-200 rounded-md bg-white focus:border-brand focus:outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="es-company" className="block text-[12px] font-mono uppercase tracking-[0.08em] text-ink-soft font-semibold mb-1.5">
          Empresa
        </label>
        <input
          id="es-company"
          name="company"
          type="text"
          required
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full px-4 py-3 text-[15px] border border-warm-200 rounded-md bg-white focus:border-brand focus:outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="es-website" className="block text-[12px] font-mono uppercase tracking-[0.08em] text-ink-soft font-semibold mb-1.5">
          Web de la empresa
        </label>
        <input
          id="es-website"
          name="website"
          type="url"
          required
          placeholder="https://tuempresa.com"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="w-full px-4 py-3 text-[15px] border border-warm-200 rounded-md bg-white focus:border-brand focus:outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="es-email" className="block text-[12px] font-mono uppercase tracking-[0.08em] text-ink-soft font-semibold mb-1.5">
          Email corporativo
        </label>
        <input
          id="es-email"
          name="email"
          type="email"
          required
          placeholder="tu@tuempresa.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 text-[15px] border border-warm-200 rounded-md bg-white focus:border-brand focus:outline-none transition-colors"
        />
        <p className="text-[12px] text-ink-soft leading-[1.5] mt-1.5">
          Debe coincidir con el dominio de la web. Gmail, Outlook, Yahoo, etc. no se aceptan.
        </p>
      </div>

      <div className="flex items-start gap-3">
        <input
          id="es-gdpr"
          type="checkbox"
          required
          checked={gdpr}
          onChange={(e) => setGdpr(e.target.checked)}
          className="mt-1 w-4 h-4 rounded border border-warm-200 accent-brand cursor-pointer flex-shrink-0"
        />
        <label htmlFor="es-gdpr" className="text-[12.5px] text-ink-soft leading-relaxed cursor-pointer">
          Acepto el{" "}
          <a
            href="/privacy/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink underline hover:text-brand transition-colors"
          >
            Aviso de Privacidad
          </a>{" "}
          y consiento que Sealmetrics procese mis datos para enviarme credenciales demo.
        </label>
      </div>

      <SignupQualifier
        value={qualifier}
        onChange={setQualifier}
        locale="es"
        idPrefix="es-access"
        hide={{ site_url: true }}
      />

      <LeadTurnstile
        onToken={setTurnstileToken}
        resetKey={turnstileResetKey}
        locale="es"
      />

      {errorMsg && (
        <p className="text-[13px] text-red-alert leading-[1.5]" role="alert">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting || !turnstileToken}
        className="w-full py-3.5 text-[15px] font-semibold text-white bg-ink rounded-md hover:bg-brand transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Enviando…" : "Enviarme credenciales demo →"}
      </button>
      <p className="text-[12px] text-ink-soft text-center font-mono tracking-[0.04em]">
        Las credenciales llegan por email en minutos.
      </p>
    </form>
  );
}
