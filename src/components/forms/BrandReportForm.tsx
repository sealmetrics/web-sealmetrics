"use client";

import { useState } from "react";
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
const PERSONAL_DOMAINS = new Set([
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
    submit: "Send me the report",
    submitting: "Requesting the report",
    errorBrand: "Tell us which brand to ask about.",
    errorEmail: "That address does not look valid.",
    errorPersonal: "Use your company address, not a personal one.",
    errorGeneric: "We could not request it right now. Try again in a moment.",
    marketing:
      "Also send me Sealmetrics' occasional reports and product news. Optional: unsubscribe in one click, and the report arrives either way.",
    notice: {
      title: "Data protection, the short version",
      rows: [
        ["Controller", "Sealmetrics S.L."],
        [
          "Purpose",
          "Generate this report and email it to you. If you tick the box above, occasional emails from Sealmetrics too.",
        ],
        [
          "Legal basis",
          "Your request for the report (art. 6.1.b GDPR). For the occasional emails, your consent (art. 6.1.a), which you can withdraw at any time.",
        ],
        [
          "Recipients",
          "Enroutia generates the report and Resend (USA, Standard Contractual Clauses) delivers it. Cloudflare runs the anti-bot check. The AI models receive the brand, sector and competitors you enter, never your email.",
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
    submit: "Enviadme el informe",
    submitting: "Pidiendo el informe",
    errorBrand: "Dinos por qué marca preguntamos.",
    errorEmail: "Ese correo no parece válido.",
    errorPersonal: "Usa el correo de tu empresa, no uno personal.",
    errorGeneric: "Ahora mismo no hemos podido pedirlo. Prueba en un momento.",
    marketing:
      "Enviadme también, de vez en cuando, informes y novedades de Sealmetrics. Es opcional: te das de baja en un clic, y el informe te llega igual.",
    notice: {
      title: "Protección de datos, lo básico",
      rows: [
        ["Responsable", "Sealmetrics S.L."],
        [
          "Finalidad",
          "Generar este informe y enviártelo por correo. Si marcas la casilla de arriba, también correos ocasionales de Sealmetrics.",
        ],
        [
          "Legitimación",
          "Tu solicitud del informe (art. 6.1.b RGPD). Para los correos ocasionales, tu consentimiento (art. 6.1.a), que puedes retirar cuando quieras.",
        ],
        [
          "Destinatarios",
          "Enroutia genera el informe y Resend (EE. UU., cláusulas contractuales tipo) lo entrega. Cloudflare hace la comprobación antibots. Los modelos de IA reciben la marca, el sector y los competidores que escribas, nunca tu correo.",
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
  // the newsletter is a separate consent (GDPR art. 7.2, LSSI art. 21). Bundling
  // the two into one submit is what this box exists to undo.
  const [marketingConsent, setMarketingConsent] = useState(false);
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
    <form className="sig-brand-form" onSubmit={handleSubmit} noValidate>
      <div className="sig-brand-row">
        <label className="sig-brand-field">
          <span>{t.brand}</span>
          <input
            type="text"
            name="brand"
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
            placeholder={t.brandPlaceholder}
            maxLength={120}
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
            required
          />
        </label>

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

      <div className="sig-brand-foot">
        <div className="sig-brand-foot-left">
          <LeadTurnstile
            onToken={setTurnstileToken}
            resetKey={turnstileResetKey}
            locale={locale}
          />
        </div>
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
          collection, in the AEPD's layered format. The second layer is the
          brand-report section of the privacy policy, which the link targets. */}
      <div className="sig-brand-notice">
        <p className="sig-brand-notice-title">{t.notice.title}</p>
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
      </div>
    </form>
  );
}
