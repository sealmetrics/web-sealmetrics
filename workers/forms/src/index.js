const FORM_TYPES = new Set([
  "demo",
  "demo_access",
  "audit",
  "careers",
  "calculator",
  "growth",
  "brand_report",
]);

// Free-mail, ISP and throwaway domains. Used by `brand_report` (which refuses
// them outright — the report costs real inference per request) and by
// `demo_access`, which also requires the email domain to match the website.
//
// DUPLICATED, DELIBERATELY, in `src/components/forms/BrandReportForm.tsx` as
// `PERSONAL_DOMAINS`. This Worker is a separate JavaScript package with its own
// lockfile, deployed to Cloudflare; the site is TypeScript bundled by Next.
// Neither can import from the other without inventing a shared package to sit
// between them, so the list is written twice and
// `tests/free-mail-domains.test.mjs` (at the repository root) asserts the two
// copies stay identical. Change one, change the other, or that test fails.
//
// This copy is the one that decides. The browser copy only exists so the form
// can explain the refusal.
const PERSONAL_EMAIL_DOMAINS = new Set([
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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BODY_BYTES = 64 * 1024;
const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

function csvSet(value) {
  return new Set(
    String(value || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  );
}

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function corsHeaders(origin, env) {
  const headers = {
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    "Referrer-Policy": "no-referrer",
    "X-Content-Type-Options": "nosniff",
  };
  if (origin && csvSet(env.ALLOWED_ORIGINS).has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = "POST, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type";
    headers.Vary = "Origin";
  }
  return headers;
}

function json(request, env, data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: corsHeaders(request.headers.get("Origin"), env),
  });
}

function originAllowed(request, env) {
  const origin = request.headers.get("Origin");
  return Boolean(origin) && csvSet(env.ALLOWED_ORIGINS).has(origin);
}

function validUrl(value) {
  if (typeof value !== "string" || value.length > 500) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

// Optional free-text field: absent or empty is fine, anything present must be a
// string within the given length.
function optionalText(value, maxLength) {
  if (value === undefined || value === null || value === "") return true;
  return typeof value === "string" && value.trim().length <= maxLength;
}

function validatePayload(type, payload) {
  if (type === "careers") {
    const links = Array.isArray(payload.other_links) ? payload.other_links : [];
    if (
      typeof payload.team !== "string" ||
      !payload.team.trim() ||
      payload.team.length > 80
    ) {
      return false;
    }
    if (!payload.linkedin && !payload.github && links.length === 0) return false;
    if (payload.linkedin && !validUrl(payload.linkedin)) return false;
    if (payload.github && !validUrl(payload.github)) return false;
    return links.length <= 6 && links.every(validUrl);
  }

  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  if (!EMAIL_RE.test(email) || email.length > 254) return false;
  if (type === "calculator" || type === "growth") return true;

  // The brand report form is deliberately short — a brand and a work email — so
  // it returns before the name/website/gdpr checks the other lead types share.
  if (type === "brand_report") {
    if (PERSONAL_EMAIL_DOMAINS.has(email.toLowerCase().split("@")[1])) {
      return false;
    }
    const brand = typeof payload.brand === "string" ? payload.brand.trim() : "";
    if (!brand || brand.length > 120) return false;
    // Optional, but when it is sent it selects the report language, so only the
    // two locales the site publishes are accepted.
    const language = payload.language;
    const languageOmitted =
      language === undefined || language === null || language === "";
    if (!languageOmitted && language !== "en" && language !== "es") return false;
    // The separate, optional consent to occasional emails. Absent means no: the
    // report itself never depends on it, and n8n must only subscribe on `true`.
    const consent = payload.marketing_consent;
    if (consent !== undefined && typeof consent !== "boolean") return false;
    return (
      optionalText(payload.sector, 120) &&
      optionalText(payload.category, 120) &&
      optionalText(payload.country, 120) &&
      optionalText(payload.competitors, 200)
    );
  }

  const websiteValue = payload.websiteRaw || payload.website;

  if (
    typeof payload.name !== "string" ||
    payload.name.trim().length < 2 ||
    payload.name.length > 160 ||
    !validUrl(websiteValue) ||
    ((type === "demo" || type === "demo_access") && payload.gdpr !== true)
  ) {
    return false;
  }

  if (type === "demo_access") {
    const emailDomain = email.toLowerCase().split("@")[1];
    const webDomain = new URL(websiteValue)
      .hostname.toLowerCase()
      .replace(/^www\./, "");
    if (
      PERSONAL_EMAIL_DOMAINS.has(emailDomain) ||
      !(
        emailDomain === webDomain ||
        emailDomain.endsWith(`.${webDomain}`) ||
        webDomain.endsWith(`.${emailDomain}`)
      )
    ) {
      return false;
    }
  }

  return true;
}

function endpointFor(type, env) {
  if (type === "demo_access") return env.N8N_DEMO_ACCESS_URL;
  if (type === "careers") return env.N8N_CAREERS_URL;
  if (type === "brand_report") return env.N8N_BRAND_REPORT_URL;
  return env.N8N_WEBFORM_LEAD_URL;
}

async function verifyTurnstile(request, env, token) {
  if (env.ALLOW_INSECURE_TESTING === "true") return true;
  if (env.REQUIRE_TURNSTILE !== "true") return true;
  if (
    !env.TURNSTILE_SECRET ||
    typeof token !== "string" ||
    token.length < 1 ||
    token.length > 2048
  ) {
    return false;
  }

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET,
        response: token,
        remoteip: request.headers.get("CF-Connecting-IP") || "",
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return false;
    const result = await response.json();
    return (
      result.success === true &&
      result.action === env.TURNSTILE_ACTION &&
      csvSet(env.TURNSTILE_HOSTNAMES).has(result.hostname)
    );
  } catch {
    return false;
  }
}

async function rateLimit(request, env) {
  if (env.ALLOW_INSECURE_TESTING === "true") return true;
  if (!env.FORM_RATE_LIMITER?.limit) return false;
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const result = await env.FORM_RATE_LIMITER.limit({ key: ip });
  return result.success === true;
}

async function handleSubmission(request, env) {
  if (!originAllowed(request, env)) {
    return json(request, env, { ok: false, error: "origin_not_allowed" }, 403);
  }
  if (!(await rateLimit(request, env))) {
    return json(request, env, { ok: false, error: "rate_limited" }, 429);
  }
  if (!(request.headers.get("Content-Type") || "").includes("application/json")) {
    return json(request, env, { ok: false, error: "invalid_content_type" }, 415);
  }
  const declaredSize = Number(request.headers.get("Content-Length") || "0");
  if (declaredSize > MAX_BODY_BYTES) {
    return json(request, env, { ok: false, error: "payload_too_large" }, 413);
  }

  let body;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
      return json(request, env, { ok: false, error: "payload_too_large" }, 413);
    }
    body = JSON.parse(raw);
  } catch {
    return json(request, env, { ok: false, error: "invalid_json" }, 400);
  }

  if (!isRecord(body)) {
    return json(request, env, { ok: false, error: "invalid_request" }, 400);
  }
  if (typeof body.company_fax === "string" && body.company_fax.trim()) {
    return json(request, env, { ok: true });
  }
  if (
    typeof body.type !== "string" ||
    !FORM_TYPES.has(body.type) ||
    !isRecord(body.payload) ||
    !validatePayload(body.type, body.payload)
  ) {
    return json(request, env, { ok: false, error: "invalid_fields" }, 400);
  }
  if (!(await verifyTurnstile(request, env, body.turnstileToken))) {
    return json(request, env, { ok: false, error: "challenge_failed" }, 403);
  }

  const endpoint = endpointFor(body.type, env);
  if (!endpoint) {
    return json(request, env, { ok: false, error: "service_unavailable" }, 503);
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Sealmetrics-Forms/1.0",
      },
      body: JSON.stringify(body.payload),
      signal: AbortSignal.timeout(12_000),
    });
    if (!response.ok) {
      return json(request, env, { ok: false, error: "upstream_rejected" }, 502);
    }
    return json(request, env, { ok: true });
  } catch {
    return json(request, env, { ok: false, error: "upstream_unavailable" }, 502);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/health" && request.method === "GET") {
      return json(request, env, { ok: true });
    }
    if (url.pathname !== "/api/forms") {
      return json(request, env, { ok: false, error: "not_found" }, 404);
    }
    if (request.method === "OPTIONS") {
      if (!originAllowed(request, env)) {
        return json(request, env, { ok: false, error: "origin_not_allowed" }, 403);
      }
      return new Response(null, {
        status: 204,
        headers: corsHeaders(request.headers.get("Origin"), env),
      });
    }
    if (request.method !== "POST") {
      return json(request, env, { ok: false, error: "method_not_allowed" }, 405);
    }
    return handleSubmission(request, env);
  },
};
