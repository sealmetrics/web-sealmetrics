"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { pushEvent } from "@/lib/analytics";
import { submitFirstPartyForm } from "@/lib/forms/submit";
import { LeadTurnstile } from "@/components/forms/LeadTurnstile";

type Locale = "en" | "es";

/**
 * Free-mail, ISP and throwaway domains that cannot request the report.
 *
 * DUPLICATED, DELIBERATELY, in `workers/forms/src/index.js` as
 * `PERSONAL_EMAIL_DOMAINS`. The two run in different runtimes — this one is
 * TypeScript bundled into the page, that one is JavaScript deployed to
 * Cloudflare from its own package with its own lockfile — and neither can
 * import from the other without inventing a shared package to sit between
 * them. So the list is written twice and `tests/free-mail-domains.test.mjs`
 * asserts the two copies stay identical; that test is the real link.
 *
 * The check exists twice for a second reason: the Worker is the one that
 * decides, but it can only answer yes or no. The browser copy is what lets the
 * form say *why* an address was refused, before the request is even made.
 *
 * The report costs real inference money per request, and a company address is
 * the cheapest signal that there is a company behind the request.
 */
export const PERSONAL_DOMAINS = new Set([
  // Google.
  "gmail.com",
  "googlemail.com",

  // Microsoft — one consumer mailbox, sold under four names and thirty country domains.
  "outlook.com",
  "outlook.es",
  "outlook.fr",
  "outlook.de",
  "outlook.it",
  "outlook.pt",
  "outlook.be",
  "outlook.dk",
  "outlook.ie",
  "outlook.co.uk",
  "outlook.com.br",
  "hotmail.com",
  "hotmail.es",
  "hotmail.co.uk",
  "hotmail.fr",
  "hotmail.de",
  "hotmail.it",
  "hotmail.be",
  "hotmail.nl",
  "hotmail.se",
  "hotmail.com.br",
  "live.com",
  "live.es",
  "live.co.uk",
  "live.fr",
  "live.de",
  "live.it",
  "live.nl",
  "live.be",
  "live.se",
  "live.dk",
  "live.ie",
  "live.com.pt",
  "msn.com",
  "windowslive.com",

  // Yahoo, plus the two brands it absorbed.
  "yahoo.com",
  "yahoo.es",
  "yahoo.co.uk",
  "yahoo.fr",
  "yahoo.de",
  "yahoo.it",
  "yahoo.nl",
  "yahoo.be",
  "yahoo.ie",
  "yahoo.pt",
  "yahoo.se",
  "yahoo.dk",
  "yahoo.gr",
  "yahoo.ca",
  "yahoo.in",
  "yahoo.co.jp",
  "yahoo.com.br",
  "yahoo.com.mx",
  "yahoo.com.ar",
  "ymail.com",
  "rocketmail.com",

  // Apple.
  "icloud.com",
  "me.com",
  "mac.com",

  // Privacy-branded consumer mailboxes. Free, personal, and not a company domain.
  "proton.me",
  "protonmail.com",
  "protonmail.ch",
  "pm.me",
  "tutanota.com",
  "tutanota.de",
  "tuta.io",
  "hushmail.com",
  "fastmail.com",
  "hey.com",
  "mailfence.com",
  "posteo.de",
  "disroot.org",

  // The rest of the global free providers.
  "aol.com",
  "gmx.com",
  "gmx.de",
  "gmx.net",
  "gmx.es",
  "gmx.at",
  "gmx.ch",
  "yandex.com",
  "yandex.ru",
  "ya.ru",
  "mail.com",
  "email.com",
  "usa.com",
  "mail.ru",
  "inbox.ru",
  "list.ru",
  "bk.ru",
  "zoho.com",
  "zohomail.com",
  "rediffmail.com",
  "lycos.com",
  "excite.com",

  // Spain — telco and portal addresses, still the personal inbox of a lot of people.
  "orange.es",
  "telefonica.net",
  "terra.es",
  "wanadoo.es",
  "ya.com",
  "movistar.es",
  "mixmail.com",
  "euskaltel.net",
  "jazzfree.com",
  "telecable.es",

  // France.
  "free.fr",
  "orange.fr",
  "wanadoo.fr",
  "laposte.net",
  "sfr.fr",
  "neuf.fr",
  "bbox.fr",
  "aliceadsl.fr",
  "club-internet.fr",
  "voila.fr",

  // Germany and Austria.
  "web.de",
  "t-online.de",
  "freenet.de",
  "arcor.de",
  "aol.de",
  "aon.at",
  "chello.at",
  "a1.net",

  // Italy.
  "libero.it",
  "virgilio.it",
  "alice.it",
  "tiscali.it",
  "tin.it",
  "email.it",
  "inwind.it",
  "fastwebnet.it",

  // Portugal, Greece, Poland, Czechia and the Nordics.
  "sapo.pt",
  "clix.pt",
  "in.gr",
  "otenet.gr",
  "wp.pl",
  "o2.pl",
  "onet.pl",
  "interia.pl",
  "seznam.cz",
  "centrum.cz",
  "email.cz",
  "volny.cz",
  "telia.com",
  "bredband.net",
  "spray.se",
  "online.no",
  "sol.dk",
  "luukku.com",

  // United Kingdom, Ireland, Benelux and Switzerland.
  "btinternet.com",
  "sky.com",
  "virginmedia.com",
  "talktalk.net",
  "blueyonder.co.uk",
  "ntlworld.com",
  "eircom.net",
  "ziggo.nl",
  "kpnmail.nl",
  "home.nl",
  "planet.nl",
  "telenet.be",
  "skynet.be",
  "bluewin.ch",
  "sunrise.ch",

  // Disposable and throwaway. These exist to receive one message and vanish.
  "mailinator.com",
  "yopmail.com",
  "yopmail.fr",
  "yopmail.net",
  "guerrillamail.com",
  "guerrillamail.net",
  "guerrillamail.org",
  "sharklasers.com",
  "grr.la",
  "10minutemail.com",
  "10minutemail.net",
  "temp-mail.org",
  "tempmail.com",
  "tempmailo.com",
  "getnada.com",
  "nada.email",
  "trashmail.com",
  "trashmail.de",
  "trashmail.net",
  "throwawaymail.com",
  "maildrop.cc",
  "dispostable.com",
  "mailnesia.com",
  "fakeinbox.com",
  "spam4.me",
  "mytemp.email",
  "moakt.com",
  "discard.email",
  "emailondeck.com",
  "tempr.email",
  "mohmal.com",
  "getairmail.com",
  "spamgourmet.com",
  "mailcatch.com",
  "inboxkitten.com",
]);

const EMAIL_RE = /^[^@\s]+@[^@\s.]+\.[^@\s]+$/;

const copy = {
  en: {
    brand: "Brand or company",
    brandPlaceholder: "Acme Analytics",
    email: "Work email",
    emailPlaceholder: "you@yourcompany.com",
    sector: "Sector",
    sectorPlaceholder: "web analytics",
    sectorHint: "Optional. Helps the models place you in a category.",
    competitors: "Competitors",
    competitorsPlaceholder: "Two or three names, separated by commas",
    competitorsHint:
      "Optional. Without them, the report finds who the models name instead of you.",
    optional: "Add sector and competitors",
    optionalNote: "Optional · a sharper report",
    submit: "Send me the report",
    submitting: "Requesting the report",
    errorBrand: "Tell us which brand to ask about.",
    errorEmail: "That address does not look valid.",
    errorPersonal: "Use your company address, not a personal one.",
    errorGeneric: "We could not request it right now. Try again in a moment.",
    marketing:
      "Also send me Sealmetrics' occasional reports and product news. Optional: unsubscribe in one click, and the report arrives either way.",
    notice: {
      summary:
        "Sealmetrics S.L. uses your email to send you the report you asked for, and for occasional emails only if you tick the box. Enroutia and the AI models never see it. Access, erasure and your other rights: privacy@sealmetrics.com.",
      title: "Data protection in detail",
      rows: [
        ["Controller", "Sealmetrics S.L."],
        [
          "Purpose",
          "Generate this report and email it to you. If you tick the box above, occasional emails from Sealmetrics too, including a short follow-up about your report.",
        ],
        [
          "Legal basis",
          "Your request for the report (art. 6.1.b GDPR). For the occasional emails, your consent (art. 6.1.a), which you can withdraw at any time.",
        ],
        [
          "Recipients",
          "Resend (USA, Standard Contractual Clauses) delivers the report and Cloudflare runs the anti-bot check and keeps the full report for 30 days behind the private link in the email. Enroutia, which generates the report, and the AI models receive only the brand, sector and competitors you enter, never your email. Only if you tick the box: lemlist (France) sends the follow-up about your report, and Airtable (USA, Standard Contractual Clauses) holds the list of those who asked for it.",
        ],
        [
          "Your rights",
          "Access, rectification, erasure, objection and portability, at privacy@sealmetrics.com.",
        ],
      ],
      more: "Full privacy policy",
    },
  },
  es: {
    brand: "Marca o empresa",
    brandPlaceholder: "Acme Analytics",
    email: "Correo de empresa",
    emailPlaceholder: "tu@tuempresa.com",
    sector: "Sector",
    sectorPlaceholder: "analítica web",
    sectorHint: "Opcional. Ayuda a los modelos a situarte en una categoría.",
    competitors: "Competidores",
    competitorsPlaceholder: "Dos o tres nombres, separados por comas",
    competitorsHint:
      "Opcional. Sin ellos, el informe descubre a quién nombran los modelos en tu lugar.",
    optional: "Añadir sector y competidores",
    optionalNote: "Opcional · un informe más afinado",
    submit: "Enviadme el informe",
    submitting: "Pidiendo el informe",
    errorBrand: "Dinos por qué marca preguntamos.",
    errorEmail: "Ese correo no parece válido.",
    errorPersonal: "Usa el correo de tu empresa, no uno personal.",
    errorGeneric: "Ahora mismo no hemos podido pedirlo. Prueba en un momento.",
    marketing:
      "Enviadme también, de vez en cuando, informes y novedades de Sealmetrics. Es opcional: te das de baja en un clic, y el informe te llega igual.",
    notice: {
      summary:
        "Sealmetrics S.L. usa tu correo para enviarte el informe que pides, y para correos ocasionales sólo si marcas la casilla. Ni Enroutia ni los modelos de IA lo ven. Acceso, supresión y demás derechos: privacy@sealmetrics.com.",
      title: "Protección de datos en detalle",
      rows: [
        ["Responsable", "Sealmetrics S.L."],
        [
          "Finalidad",
          "Generar este informe y enviártelo por correo. Si marcas la casilla de arriba, también correos ocasionales de Sealmetrics, entre ellos un breve seguimiento sobre tu informe.",
        ],
        [
          "Legitimación",
          "Tu solicitud del informe (art. 6.1.b RGPD). Para los correos ocasionales, tu consentimiento (art. 6.1.a), que puedes retirar cuando quieras.",
        ],
        [
          "Destinatarios",
          "Resend (EE. UU., cláusulas contractuales tipo) entrega el informe y Cloudflare hace la comprobación antibots y guarda el informe completo 30 días tras el enlace privado del correo. Enroutia, que genera el informe, y los modelos de IA reciben sólo la marca, el sector y los competidores que escribas, nunca tu correo. Sólo si marcas la casilla: lemlist (Francia) envía el seguimiento sobre tu informe y Airtable (EE. UU., cláusulas contractuales tipo) guarda la lista de quienes lo pidieron.",
        ],
        [
          "Derechos",
          "Acceso, rectificación, supresión, oposición y portabilidad, en privacy@sealmetrics.com.",
        ],
      ],
      more: "Política de privacidad completa",
    },
  },
} as const;

export function BrandReportForm({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const prefix = locale === "es" ? "/es" : "";
  const router = useRouter();
  const [brand, setBrand] = useState("");
  const [email, setEmail] = useState("");
  const [sector, setSector] = useState("");
  const [competitors, setCompetitors] = useState("");
  // Unticked by default and never required: the report is the service asked for,
  // the newsletter is a separate consent
  // (GDPR art. 7.2, LSSI art. 21). n8n subscribes only on an explicit `true`.
  const [marketingConsent, setMarketingConsent] = useState(false);
  // Funnel microconversions, each sent at most once per page: somebody started the
  // form, and Cloudflare refused to verify them. With `brand_report_request` on the
  // accepted submission, the three show where requests are lost — a real person
  // stuck on the anti-bot check left no trace before.
  const started = useRef(false);
  const verificationFailed = useRef(false);

  function noteStart(event: React.FormEvent<HTMLFormElement>) {
    const field = (event.target as HTMLInputElement).name;
    // The honeypot is filled by bots, not people; it must not count as a start.
    if (started.current || !field || field === "company_fax") return;
    started.current = true;
    pushEvent({ event: "brand_report_start", language: locale });
  }

  function noteVerificationFailed() {
    if (verificationFailed.current) return;
    verificationFailed.current = true;
    pushEvent({ event: "brand_report_verification_failed", language: locale });
  }
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [message, setMessage] = useState("");
  const [companyFax, setCompanyFax] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);

  const canSubmit =
    Boolean(brand.trim() && email.trim() && turnstileToken) &&
    status !== "submitting";

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canSubmit) return;

    const cleanBrand = brand.trim();
    const cleanEmail = email.trim().toLowerCase();
    const domain = cleanEmail.split("@")[1] ?? "";

    if (!cleanBrand) return fail(t.errorBrand);
    if (!EMAIL_RE.test(cleanEmail)) return fail(t.errorEmail);
    if (PERSONAL_DOMAINS.has(domain)) return fail(t.errorPersonal);

    setStatus("submitting");
    setMessage("");

    const trimmedSector = sector.trim();
    try {
      await submitFirstPartyForm(
        "brand_report",
        {
          email: cleanEmail,
          brand: cleanBrand,
          sector: trimmedSector,
          // The purchase question asks for a recommendation without naming anyone, so it
          // needs a category rather than a sector: "recommend me a {category}".
          category: trimmedSector ? `${trimmedSector} tool` : "",
          country: locale === "es" ? "España" : "Europe",
          competitors: competitors.trim(),
          language: locale,
          marketing_consent: marketingConsent,
        },
        { companyFax, turnstileToken: turnstileToken ?? "" },
      );
      // Fired on the submission the relay accepted, not on the thank-you page:
      // what is being counted is the request itself, and a static confirmation
      // URL can be reloaded, bookmarked or reached with the back button. The
      // email is not passed at all: `sanitize()` would strip it, but data the
      // pixel never needed should not depend on a filter to stay out of it.
      pushEvent({ event: "lead_brand_report" });
      // `status` stays "submitting" so the button remains disabled while the
      // client-side navigation runs.
      router.push(`${prefix}/ai-brand-monitoring/thank-you/`);
    } catch {
      setStatus("error");
      setMessage(t.errorGeneric);
      setTurnstileToken(null);
      setTurnstileResetKey((key) => key + 1);
    }
  }

  function fail(text: string) {
    setStatus("error");
    setMessage(text);
  }

  return (
    <form
      className="sig-brand-form sig-report-form"
      onSubmit={handleSubmit}
      onChange={noteStart}
      noValidate
    >
      {/* One column, the two required fields first. Sector and competitors sharpen
          the report but are optional, so they wait behind a disclosure instead of
          doubling the height of the form for everyone. */}
      <div className="sig-report-fields">
        <label className="sig-brand-field">
          <span>{t.brand}</span>
          <input
            type="text"
            name="brand"
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
            placeholder={t.brandPlaceholder}
            maxLength={120}
            autoComplete="organization"
            required
          />
        </label>

        <label className="sig-brand-field">
          <span>{t.email}</span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t.emailPlaceholder}
            maxLength={254}
            autoComplete="email"
            required
          />
        </label>

        <details className="sig-report-optional">
          <summary>
            <span>{t.optional}</span>
            <small>{t.optionalNote}</small>
          </summary>
          <div className="sig-report-fields">
            <label className="sig-brand-field">
              <span>{t.sector}</span>
              <input
                type="text"
                name="sector"
                value={sector}
                onChange={(event) => setSector(event.target.value)}
                placeholder={t.sectorPlaceholder}
                maxLength={120}
              />
              <small>{t.sectorHint}</small>
            </label>

            <label className="sig-brand-field">
              <span>{t.competitors}</span>
              <input
                type="text"
                name="competitors"
                value={competitors}
                onChange={(event) => setCompetitors(event.target.value)}
                placeholder={t.competitorsPlaceholder}
                maxLength={200}
              />
              <small>{t.competitorsHint}</small>
            </label>
          </div>
        </details>

        {/* Honeypot: hidden from people, filled by the bots that read the markup. */}
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
      </div>

      <label className="sig-brand-consent">
        <input
          type="checkbox"
          name="marketing_consent"
          checked={marketingConsent}
          onChange={(event) => setMarketingConsent(event.target.checked)}
        />
        <span>{t.marketing}</span>
      </label>

      <div className="sig-report-submit">
        <LeadTurnstile
          onToken={setTurnstileToken}
          onFail={noteVerificationFailed}
          resetKey={turnstileResetKey}
          locale={locale}
        />
        <button
          type="submit"
          className="sig-brand-submit"
          disabled={!canSubmit}
        >
          {status === "submitting" ? t.submitting : t.submit}
        </button>
      </div>

      {status === "error" && message ? (
        <p role="alert" className="sig-brand-error">
          {message}
        </p>
      ) : null}

      {/* First layer of the information GDPR art. 13 requires at the point of
          collection, in the AEPD's layered format. The one-sentence summary stays
          visible — controller, purpose, who never sees the email, where to exercise
          rights — so the essentials are read before submitting; the full table sits
          behind a disclosure (it is in the static HTML either way). The second
          layer is the brand-report section of the privacy policy. */}
      <div className="sig-brand-notice">
        <p className="sig-brand-notice-summary">{t.notice.summary}</p>
        <details className="sig-brand-notice-details">
          <summary>{t.notice.title}</summary>
          <dl>
            {t.notice.rows.map(([term, detail]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{detail}</dd>
              </div>
            ))}
          </dl>
          <p>
            <a href={`${prefix}/privacy/#${locale === "es" ? "informe-de-marca" : "brand-report"}`}>
              {t.notice.more}
            </a>
          </p>
        </details>
      </div>
    </form>
  );
}
