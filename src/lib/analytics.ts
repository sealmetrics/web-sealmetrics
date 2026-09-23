// Sealmetrics — cookieless, consentless analytics. Replaces Google Tag Manager.
//
// The site is DUAL-TAGGED: every pageview and event is sent to both the preprod
// account (`pixel-pre`, kept as-is) and the production one (`t.sealmetrics.com`).
// Both trackers are loaded ONCE per document in fully manual mode
// (`auto=0&spa=0`) and every hit is fired by us — see `dispatch()` below.
//
// Do NOT go back to re-injecting a script per route change. Removing the
// <script> element does not unload the code it already ran: the tracker's
// History API listeners stay alive, so every re-injection leaves one more live
// instance behind and each of them fires its own pageview on the next
// navigation (1, 2, 3, 4 … hits per route change, each with a fresh token, so
// the backend counts them as new entrances). `auto=0` alone does not prevent
// this — it only gates the initial pageview; `spa=0` is what silences the
// tracker's own SPA navigation listener.
//
// PRIVACY — Sealmetrics is cookieless and designed for GDPR from the architecture up.
// Never send personal data (email, name, phone), order/transaction IDs, or
// user/customer IDs to the pixel. PII keys are stripped centrally below; the
// raw email flows only through the server-side forms relay, never to the pixel
// or directly from the browser to n8n.

// Hosts are module-level string consts on purpose: `scripts/audit-csp.mjs`
// resolves them from source to lint the drafted CSP. Inlining them into the
// array below would make the origins invisible to that gate.
const PIXEL_HOST_PRE = "https://pixel-pre.sealmetrics.com";
const PIXEL_HOST_PROD = "https://t.sealmetrics.com";

// Preprod — the original tag for the marketing site (by design, not a bug).
export const SEALMETRICS_ID =
  process.env.NEXT_PUBLIC_SEALMETRICS_ID ?? "sealmetrics2";

// Production.
export const SEALMETRICS_ID_PROD =
  process.env.NEXT_PUBLIC_SEALMETRICS_ID_PROD ?? "sealmetricsv2";

export interface PixelTarget {
  /** Short name, also the DOM id suffix of its <script>. */
  readonly label: string;
  readonly host: string;
  readonly id: string;
}

export const SEALMETRICS_PIXELS: readonly PixelTarget[] = [
  { label: "pre", host: PIXEL_HOST_PRE, id: SEALMETRICS_ID },
  { label: "prod", host: PIXEL_HOST_PROD, id: SEALMETRICS_ID_PROD },
];

type EventProps = Record<string, string | number | boolean>;

// The global is callable — `sealmetrics({ group })` IS a complete pageview hit
// — and also carries the event helpers.
interface SealmetricsApi {
  (options?: { group?: string }): void;
  micro?: (event: string, props?: EventProps) => void;
  conv?: (event: string, value?: number, props?: EventProps) => void;
}

declare global {
  interface Window {
    sealmetrics?: SealmetricsApi;
  }
}

// ---------------------------------------------------------------------------
// Pixel loading + fan-out.
//
// Each t.js ends with `window.sealmetrics = <its own instance>`, unconditionally
// — so with two tags loaded the global only ever points at whichever finished
// last, and the other account would receive nothing (with auto=0&spa=0 it fires
// nothing on its own). We therefore capture each instance inside its OWN
// `onload`, the one moment it is guaranteed to be the global, and every call is
// fanned out to all captured instances. Calls made before a tracker is ready are
// queued per target, so nothing is dropped and per-target order is preserved.
// ---------------------------------------------------------------------------

const PIXEL_SCRIPT_ID = "sealmetrics-pixel";

type Call = (api: SealmetricsApi) => void;

const instances: Array<SealmetricsApi | null> = SEALMETRICS_PIXELS.map(() => null);
const queues: Call[][] = SEALMETRICS_PIXELS.map(() => []);

function capture(index: number): void {
  const api = window.sealmetrics;
  // If a tag 404s or throws midway its onload may still fire while the global
  // holds another target's instance. Capturing that twice would double-count
  // every hit on one account, so only ever adopt an instance we haven't seen.
  if (!api || instances.includes(api)) return;

  instances[index] = api;
  const queued = queues[index];
  while (queued.length) queued.shift()?.(api);
}

function dispatch(call: Call): void {
  if (typeof window === "undefined") return;
  instances.forEach((api, index) => {
    if (api) call(api);
    else queues[index].push(call);
  });
}

let pixelsRequested = false;

/** `?id=…&auto=0&spa=0` — manual mode, see the header comment. */
function query(id: string): string {
  return new URLSearchParams({ id, auto: "0", spa: "0" }).toString();
}

function newScript(index: number): HTMLScriptElement {
  const script = document.createElement("script");
  script.id = `${PIXEL_SCRIPT_ID}-${SEALMETRICS_PIXELS[index].label}`;
  script.defer = true;
  script.onload = () => capture(index);
  return script;
}

// Each tag is injected explicitly rather than in a loop over SEALMETRICS_PIXELS:
// `scripts/audit-csp.mjs` reads the literal right-hand side of `.src =` to lint
// the drafted CSP, and `${target.host}` inside a loop resolves to nothing — it
// would blind the gate to BOTH origins, including the one it already covers.
// Adding a third account means adding another three lines here, on purpose.
function loadPixels(): void {
  if (pixelsRequested) return;
  pixelsRequested = true;

  const pre = newScript(0);
  pre.src = `${PIXEL_HOST_PRE}/t.js?${query(SEALMETRICS_ID)}`;
  document.head.appendChild(pre);

  const prod = newScript(1);
  prod.src = `${PIXEL_HOST_PROD}/t.js?${query(SEALMETRICS_ID_PROD)}`;
  document.head.appendChild(prod);
}

// The pixels live on their own origins, so the first hit costs a DNS + TCP + TLS
// handshake each. Racing that against the initial render pushes LCP out for no
// gain: nothing above the fold depends on it. So the script requests wait for
// `load` (already fired = request now); later route changes reuse the loaded
// trackers.
let firstPageviewSent = false;

// Registers exactly one pageview per account for `group`. Called on every route
// change by SealmetricsTracker, first load included. Queued until t.js is ready.
export function pageview(group?: string): void {
  if (typeof document === "undefined") return;

  dispatch((api) => api(group ? { group } : undefined));

  if (firstPageviewSent || document.readyState === "complete") {
    firstPageviewSent = true;
    loadPixels();
    return;
  }

  firstPageviewSent = true;
  window.addEventListener("load", loadPixels, { once: true });
}

// ---------------------------------------------------------------------------
// Event taxonomy. Keep call sites unchanged: they still call pushEvent() with
// the legacy event names; this table maps each to the Sealmetrics closed
// taxonomy (conv: lead/signup/purchase/subscription/booking · micro: the rest).
// ---------------------------------------------------------------------------

const PII_KEYS = new Set([
  "email",
  "name",
  "first_name",
  "last_name",
  "fullname",
  "phone",
]);

type Mapping =
  | { kind: "conv"; name: string; value?: number }
  | { kind: "micro"; name: string };

const EVENT_MAP: Record<string, Mapping> = {
  // ── Conversions (business outcomes) ───────────────────────────────────
  demo_request: { kind: "conv", name: "lead", value: 0 }, // demo form submit
  lead_demo_access: { kind: "conv", name: "lead", value: 0 }, // demo-access granted
  lead_diagnostic_demo_access: { kind: "conv", name: "lead", value: 0 },
  lead_audit_submitted: { kind: "conv", name: "lead", value: 0 }, // free audit

  // ── Microconversions (engagement) ─────────────────────────────────────
  demo_access_request: { kind: "micro", name: "form_submit" }, // submit attempt
  lead_book_demo: { kind: "micro", name: "book_demo_cta" }, // thank-you reached
  calculator_used: { kind: "micro", name: "calculator_used" },
  growth_calculator_used: { kind: "micro", name: "calculator_used" },
  calculator_report_email: { kind: "micro", name: "report_request" },
  // The free AI brand report. A microconversion, not a lead: it costs us real
  // inference and buys intent, but nobody in it has asked to be sold to. The
  // name was absent from this table until now, so every request since the page
  // shipped was silently dropped by the `!mapping` guard below.
  lead_brand_report: { kind: "micro", name: "brand_report_request" },
  // A sector study sent to the visitor's inbox. Registered here on the day the form
  // shipped: an unmapped name is dropped without a trace by the guard below.
  lead_study_download: { kind: "micro", name: "study_download" },
  // "What do AIs say about…?" (/what-ai-says, /es/que-dicen-las-ia). The brand
  // typed is never sent: it is free text, and a visitor can type a person's
  // name however clearly the page says not to.
  brand_check_start: { kind: "micro", name: "brand_check_request" }, // check accepted by the relay
  brand_check_done: { kind: "micro", name: "brand_check_result" }, // a result finished on screen
  brand_check_share: { kind: "micro", name: "brand_check_share" }, // share button, copy or PNG
  brand_check_compare: { kind: "micro", name: "brand_check_compare" }, // second brand requested
  video_play: { kind: "micro", name: "video_play" },
  "404": { kind: "micro", name: "404_error" },
};

function sanitize(payload: Record<string, unknown>): EventProps {
  const props: EventProps = {};
  for (const [key, value] of Object.entries(payload)) {
    if (key === "event" || key === "value") continue;
    if (PII_KEYS.has(key)) continue;
    if (value === undefined || value === null) continue;
    props[key] = typeof value === "boolean" ? value : String(value);
  }
  return props;
}

// Legacy entry point kept so existing call sites don't change. Dispatches to
// the Sealmetrics pixel via the taxonomy table above, stripping any PII.
export function pushEvent(
  payload: { event: string; value?: number } & Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;
  const mapping = EVENT_MAP[payload.event];
  if (!mapping) return; // unmapped legacy event → ignored
  const props = sanitize(payload);
  dispatch((api) => {
    if (mapping.kind === "conv") {
      const value =
        mapping.value ??
        (typeof payload.value === "number" ? payload.value : 0);
      api.conv?.(mapping.name, value, props);
    } else {
      api.micro?.(mapping.name, props);
    }
  });
}

// Direct helpers for new instrumentation that doesn't go through pushEvent.
export function micro(event: string, props?: EventProps): void {
  dispatch((api) => api.micro?.(event, props));
}

export function conv(event: string, value = 0, props?: EventProps): void {
  dispatch((api) => api.conv?.(event, value, props));
}

// ---------------------------------------------------------------------------
// Content grouping + view-micros (unchanged taxonomy).
// ---------------------------------------------------------------------------

export function stripLocale(pathname: string): string {
  if (pathname === "/es") return "/";
  if (pathname.startsWith("/es/")) return pathname.slice(3);
  return pathname;
}

export function getContentGroup(pathname: string): string {
  const path = stripLocale(pathname).replace(/\/$/, "") || "/";
  if (path === "/") return "home";
  if (path === "/product") return "product";
  if (path === "/pricing") return "pricing";
  if (path === "/how-it-works") return "how-it-works";
  if (path === "/security") return "security";
  if (path === "/integrations") return "integrations";
  if (path === "/about") return "about";
  if (path === "/demo" || path.startsWith("/demo/")) return "demo";
  if (path === "/audit" || path.startsWith("/audit/")) return "audit";
  if (path === "/data-loss-calculator") return "calculator";
  if (path === "/growth-calculator") return "calculator";
  if (path === "/modern-analytics") return "modern-analytics";
  if (path.startsWith("/case-studies")) return "case-studies";
  if (path.startsWith("/vs")) return "vs";
  if (path.startsWith("/for/")) return "for";
  if (path.startsWith("/blog")) return "blog";
  if (path.startsWith("/glossary")) return "glossary";
  if (path === "/videos") return "videos";
  if (path === "/changelog") return "changelog";
  if (path === "/privacy" || path === "/terms") return "legal";
  // Landings de campaña (tráfico de pago). Agrupadas para poder aislar su
  // embudo del resto del site sin tocar esto por cada landing nueva.
  if (path.startsWith("/roas-real") || path.startsWith("/real-roas")) return "landing";
  return "other";
}

const MICRO_CONVERSIONS: Record<string, string> = {
  "/pricing": "pricing_view",
  "/demo": "contact_view",
  "/audit": "audit_view",
  "/data-loss-calculator": "calculator_view",
  "/growth-calculator": "calculator_view",
};

export function getMicroConversion(pathname: string): string | undefined {
  // Routes export with a trailing slash (e.g. "/demo/"), so normalise before
  // the exact-match lookup.
  const path = stripLocale(pathname).replace(/\/$/, "") || "/";
  return MICRO_CONVERSIONS[path];
}

// Competitor slug for comparison pages. Handles both URL shapes in use:
// "/vs/ga360" -> "ga360" and the legacy "/vs-ga4" -> "ga4".
// Returns undefined for the /vs index and non-comparison pages.
export function getComparisonCompetitor(pathname: string): string | undefined {
  const path = stripLocale(pathname);
  const match = path.match(/^\/vs[/-]([^/]+)\/?$/);
  return match ? match[1] : undefined;
}

// Booking / external app links count as a near-conversion intent signal.
export function isBookingHref(href: string): boolean {
  return /cal\.com|app\.sealmetrics|\/book(?:ing)?\b/i.test(href);
}

// Primary lead-driving destinations — clicks toward these are CTA intent.
const CTA_DESTINATIONS =
  /^\/(demo|demo-access|audit|free-audit|pricing|data-loss-calculator|growth-calculator)\b/;

export function isCtaHref(href: string): boolean {
  if (!href.startsWith("/")) return false;
  return CTA_DESTINATIONS.test(stripLocale(href));
}
