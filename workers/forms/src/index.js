const FORM_TYPES = new Set([
  "demo",
  "demo_access",
  "audit",
  "careers",
  "calculator",
  "growth",
  "brand_report",
  "study_download",
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

const FORMS_METHODS = "POST, OPTIONS";
const BRAND_CHECK_METHODS = "GET, POST, OPTIONS";

function corsHeaders(origin, env, methods = FORMS_METHODS) {
  const headers = {
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    "Referrer-Policy": "no-referrer",
    "X-Content-Type-Options": "nosniff",
  };
  if (origin && csvSet(env.ALLOWED_ORIGINS).has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = methods;
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

  // A sector study sent by email. Only the study's slug travels: which PDF goes out is
  // decided by n8n from a closed list, never by the form. Personal addresses are allowed
  // here — a PDF costs nothing to send — and n8n marks them in the CRM instead.
  if (type === "study_download") {
    if (typeof payload.study !== "string" || !/^[a-z0-9-]{1,60}$/.test(payload.study)) {
      return false;
    }
    const consent = payload.marketing_consent;
    return consent === undefined || typeof consent === "boolean";
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
  if (type === "study_download") return env.N8N_STUDY_DOWNLOAD_URL;
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

async function rateLimit(request, env, binding = "FORM_RATE_LIMITER") {
  if (env.ALLOW_INSECURE_TESTING === "true") return true;
  const limiter = env[binding];
  if (!limiter?.limit) return false;
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const result = await limiter.limit({ key: ip });
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

// ---------------------------------------------------------------------------
// "What do AIs say about…?" brand check (Enroutia D-320).
//
// The page at /que-dicen-las-ia/ and /what-ai-says/ never talks to Enroutia
// directly: the bearer token that pays for a check lives only here, as the
// `ENROUTIA_BRAND_CHECK_TOKEN` secret.
//
// - POST /api/brand-check creates (or reuses from Enroutia's 7-day cache) a
//   check. Same protections as /api/forms: allowed origin, FORM_RATE_LIMITER,
//   JSON body, honeypot, Turnstile.
// - GET /api/brand-check?brand=…&language=… and GET /api/brand-check?id=<uuid>
//   read a public result. No Turnstile — the page polls every 2 s and a result
//   URL must open from a shared link — so it has its own, looser limiter.
//   The token goes along when set, so Enroutia limits per project, not per IP.
//
// Upstream bodies are only ever relayed on success (and 404 on reads). Every
// other upstream answer collapses into a fixed error so Enroutia internals
// (balance, key state, stack traces) never reach the browser.
// ---------------------------------------------------------------------------

const BRAND_CHECK_PATH = "/api/brand-check";
const BRAND_CHECK_CREATE_TIMEOUT_MS = 15_000;
const BRAND_CHECK_READ_TIMEOUT_MS = 10_000;
const BRAND_CHECK_LANGUAGES = new Set(["es", "en"]);
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// A brand is a name, not an address. Enroutia answers 422 `brand_invalid` for
// emails and URLs; refusing them here saves the round trip and the Turnstile
// token. A bare domain-like brand ("Booking.com") is a real brand name and is
// allowed; a scheme, a leading "www.", a path or an email address is not.
const BRAND_REJECT_PATTERNS = [
  /[\u0000-\u001f\u007f]/, // control characters
  /[^\s@]+@[^\s@]+\.[^\s@]+/, // email address
  /[a-z][a-z0-9+.-]*:\/\//i, // any scheme://
  /(^|\s)www\./i, // www.example
  /[^\s/]+\.[a-z]{2,}\/\S*/i, // example.com/path
];

function normalizeBrand(value) {
  if (typeof value !== "string") return null;
  const brand = value.trim();
  if (!brand || brand.length > 120) return null;
  if (BRAND_REJECT_PATTERNS.some((re) => re.test(brand))) return null;
  return brand;
}

function brandCheckJson(request, env, data, status, extraHeaders = {}) {
  const headers = corsHeaders(
    request.headers.get("Origin"),
    env,
    BRAND_CHECK_METHODS,
  );
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...headers, ...extraHeaders },
  });
}

function brandCheckUnavailable(request, env) {
  return brandCheckJson(request, env, { ok: false, error: "unavailable" }, 503);
}

function enroutiaBase(env) {
  const base = typeof env.ENROUTIA_API_BASE === "string"
    ? env.ENROUTIA_API_BASE.trim().replace(/\/+$/, "")
    : "";
  return base || null;
}

// Reads an upstream body that must be JSON. Anything else is treated as an
// upstream failure, so a proxy error page can never be relayed as a result.
async function readUpstreamJson(response) {
  try {
    const text = await response.text();
    JSON.parse(text);
    return text;
  } catch {
    return null;
  }
}

async function handleBrandCheckCreate(request, env) {
  if (!originAllowed(request, env)) {
    return brandCheckJson(request, env, { ok: false, error: "origin_not_allowed" }, 403);
  }
  if (!(await rateLimit(request, env, "FORM_RATE_LIMITER"))) {
    return brandCheckJson(request, env, { ok: false, error: "rate_limited" }, 429);
  }
  if (!(request.headers.get("Content-Type") || "").includes("application/json")) {
    return brandCheckJson(request, env, { ok: false, error: "invalid_content_type" }, 415);
  }
  const declaredSize = Number(request.headers.get("Content-Length") || "0");
  if (declaredSize > MAX_BODY_BYTES) {
    return brandCheckJson(request, env, { ok: false, error: "payload_too_large" }, 413);
  }

  let body;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
      return brandCheckJson(request, env, { ok: false, error: "payload_too_large" }, 413);
    }
    body = JSON.parse(raw);
  } catch {
    return brandCheckJson(request, env, { ok: false, error: "invalid_json" }, 400);
  }
  if (!isRecord(body)) {
    return brandCheckJson(request, env, { ok: false, error: "invalid_request" }, 400);
  }
  // Honeypot: a bot that fills it gets a quiet 202 and nothing is created or
  // charged. The shape is minimal on purpose — there is no check to poll.
  if (typeof body.company_fax === "string" && body.company_fax.trim()) {
    return brandCheckJson(request, env, { ok: true }, 202);
  }

  const brand = normalizeBrand(body.brand);
  const language = body.language;
  const country = body.country;
  const countryValid =
    country === undefined ||
    country === null ||
    (typeof country === "string" && country.trim().length <= 60);
  if (!brand || !BRAND_CHECK_LANGUAGES.has(language) || !countryValid) {
    return brandCheckJson(request, env, { ok: false, error: "invalid_fields" }, 400);
  }

  const base = enroutiaBase(env);
  if (!base || !env.ENROUTIA_BRAND_CHECK_TOKEN) {
    return brandCheckUnavailable(request, env);
  }
  if (!(await verifyTurnstile(request, env, body.turnstileToken))) {
    return brandCheckJson(request, env, { ok: false, error: "challenge_failed" }, 403);
  }

  // `country` is optional upstream (it defaults per language), so it is only
  // sent when the visitor actually typed one.
  const upstreamBody = { brand, language };
  if (typeof country === "string" && country.trim()) {
    upstreamBody.country = country.trim();
  }

  let response;
  try {
    response = await fetch(`${base}/api/brand-checks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.ENROUTIA_BRAND_CHECK_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "Sealmetrics-Forms/1.0",
      },
      body: JSON.stringify(upstreamBody),
      signal: AbortSignal.timeout(BRAND_CHECK_CREATE_TIMEOUT_MS),
    });
  } catch {
    return brandCheckUnavailable(request, env);
  }

  if (response.status === 200 || response.status === 202) {
    const text = await readUpstreamJson(response);
    if (text === null) return brandCheckUnavailable(request, env);
    return new Response(text, {
      status: response.status,
      headers: corsHeaders(request.headers.get("Origin"), env, BRAND_CHECK_METHODS),
    });
  }
  if (response.status === 429) {
    return brandCheckJson(request, env, { ok: false, error: "quota" }, 429);
  }
  // Our validation mirrors Enroutia's; a 422 still means the brand was refused
  // (its normaliser is the one that decides), and the visitor can fix that.
  if (response.status === 400 || response.status === 422) {
    return brandCheckJson(request, env, { ok: false, error: "invalid_fields" }, 400);
  }
  // 401/403 (token), 402/409 (balance, key state), 404 and 5xx: none of them is
  // something the visitor can act on, and none of their bodies leaves here.
  return brandCheckUnavailable(request, env);
}

async function handleBrandCheckRead(request, env, url) {
  // A browser always sends Origin on a cross-origin fetch. A direct
  // navigation (a shared result link opened in a tab) sends none, and is let
  // through without CORS headers.
  const origin = request.headers.get("Origin");
  if (origin && !csvSet(env.ALLOWED_ORIGINS).has(origin)) {
    return brandCheckJson(request, env, { ok: false, error: "origin_not_allowed" }, 403);
  }
  if (!(await rateLimit(request, env, "BRAND_CHECK_READ_LIMITER"))) {
    return brandCheckJson(request, env, { ok: false, error: "rate_limited" }, 429);
  }

  let upstreamPath;
  const id = url.searchParams.get("id");
  if (id !== null) {
    if (!UUID_RE.test(id)) {
      return brandCheckJson(request, env, { ok: false, error: "invalid_fields" }, 400);
    }
    upstreamPath = `/api/brand-checks/public/${id.toLowerCase()}`;
  } else {
    const brand = normalizeBrand(url.searchParams.get("brand"));
    const language = url.searchParams.get("language");
    if (!brand || !BRAND_CHECK_LANGUAGES.has(language)) {
      return brandCheckJson(request, env, { ok: false, error: "invalid_fields" }, 400);
    }
    upstreamPath = `/api/brand-checks/public?${new URLSearchParams({ brand, language })}`;
  }

  const base = enroutiaBase(env);
  if (!base) return brandCheckUnavailable(request, env);

  // The public read works anonymously, but with the token Enroutia limits per
  // project instead of per IP — and every visitor shares this Worker's IP.
  const headers = {
    Accept: "application/json",
    "User-Agent": "Sealmetrics-Forms/1.0",
  };
  if (env.ENROUTIA_BRAND_CHECK_TOKEN) {
    headers.Authorization = `Bearer ${env.ENROUTIA_BRAND_CHECK_TOKEN}`;
  }

  let response;
  try {
    response = await fetch(`${base}${upstreamPath}`, {
      method: "GET",
      headers,
      signal: AbortSignal.timeout(BRAND_CHECK_READ_TIMEOUT_MS),
    });
  } catch {
    return brandCheckUnavailable(request, env);
  }

  if (response.status === 200 || response.status === 404) {
    const text = await readUpstreamJson(response);
    if (text === null) return brandCheckUnavailable(request, env);
    const out = corsHeaders(origin, env, BRAND_CHECK_METHODS);
    // Enroutia decides freshness: max-age=5 while running, 300 when done.
    out["Cache-Control"] = response.headers.get("Cache-Control") || "no-store";
    out["X-Robots-Tag"] = "noindex";
    out.Vary = "Origin";
    return new Response(text, { status: response.status, headers: out });
  }
  if (response.status === 429) {
    return brandCheckJson(request, env, { ok: false, error: "rate_limited" }, 429);
  }
  return brandCheckUnavailable(request, env);
}

async function handleBrandCheckRoute(request, env, url) {
  if (request.method === "OPTIONS") {
    if (!originAllowed(request, env)) {
      return brandCheckJson(request, env, { ok: false, error: "origin_not_allowed" }, 403);
    }
    return new Response(null, {
      status: 204,
      headers: corsHeaders(request.headers.get("Origin"), env, BRAND_CHECK_METHODS),
    });
  }
  if (request.method === "POST") return handleBrandCheckCreate(request, env);
  if (request.method === "GET") return handleBrandCheckRead(request, env, url);
  return brandCheckJson(request, env, { ok: false, error: "method_not_allowed" }, 405);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/health" && request.method === "GET") {
      return json(request, env, { ok: true });
    }
    if (url.pathname === BRAND_CHECK_PATH) {
      return handleBrandCheckRoute(request, env, url);
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
