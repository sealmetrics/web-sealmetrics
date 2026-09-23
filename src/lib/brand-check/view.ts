/**
 * "What do AIs say about…?" — the pure half of the page.
 *
 * Everything that turns the public brand-check body (Enroutia D-320, relayed by
 * the forms Worker at /api/brand-check) into what the page shows lives here, so
 * it can be tested with `node --test` without a browser and without a live API.
 * The React component only fetches, polls and renders what this returns.
 *
 * Self-contained on purpose: no imports. `tests/brand-check-view.test.mjs`
 * transpiles this file on its own and imports it from a data: URL, the same way
 * the analytics tests load `src/lib/analytics.ts`.
 */

export type Locale = "en" | "es";

export type CheckStatus = "queued" | "running" | "done" | "failed";
export type StateKey = "correct" | "partial" | "confused" | "none" | "unreviewed" | "pending";
export type AnswerStatus = "ok" | "empty" | "error";

export interface CheckAnswer {
  status: AnswerStatus;
  text: string;
}

export interface CheckModel {
  model: string;
  provider: string;
  closed: boolean;
  state: string | null;
  note: string | null;
  recommends: boolean | null;
  answers: Record<string, CheckAnswer>;
}

export interface CheckSummary {
  n_models: number;
  know: number;
  confuse: number;
  no_answer: number;
  recommend: number;
  card: string;
  agree: string[];
  disagree: string[];
}

export interface CheckBody {
  id: string;
  brand: string;
  language: Locale;
  country: string;
  status: CheckStatus;
  created_at: string;
  finished_at: string | null;
  expires_at: string;
  questions: { id: string; text: string }[];
  models: CheckModel[];
  progress: { answered: number; expected: number; judged: boolean };
  summary: CheckSummary | null;
  methodology: {
    date: string;
    models: number;
    questions: number;
    max_tokens: number;
    judge: string;
    automatic: boolean;
  } | null;
}

// ---------------------------------------------------------------------------
// Parsing. The body crosses two services before it reaches the page, so it is
// read defensively: a missing or mistyped field degrades to an empty value
// rather than throwing inside a render.
// ---------------------------------------------------------------------------

const STATUSES = new Set<CheckStatus>(["queued", "running", "done", "failed"]);

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}
function str(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}
function num(v: unknown, fallback = 0): number {
  return typeof v === "number" && Number.isFinite(v) ? v : fallback;
}
function strList(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string" && x.trim() !== "") : [];
}

/** Returns null when the body is not a check at all (a honeypot `{ok:true}`, an error body). */
export function parseCheckBody(raw: unknown): CheckBody | null {
  if (!isRecord(raw)) return null;
  const id = str(raw.id);
  const status = str(raw.status) as CheckStatus;
  if (!id || !STATUSES.has(status)) return null;

  const questions = Array.isArray(raw.questions)
    ? raw.questions.filter(isRecord).map((q) => ({ id: str(q.id), text: str(q.text) })).filter((q) => q.id)
    : [];

  const models: CheckModel[] = Array.isArray(raw.models)
    ? raw.models.filter(isRecord).map((m) => {
        const answers: Record<string, CheckAnswer> = {};
        if (isRecord(m.answers)) {
          for (const [qid, a] of Object.entries(m.answers)) {
            if (!isRecord(a)) continue;
            const s = str(a.status);
            answers[qid] = {
              status: s === "ok" || s === "empty" || s === "error" ? s : "error",
              text: str(a.text),
            };
          }
        }
        return {
          model: str(m.model, "?"),
          provider: str(m.provider),
          closed: m.closed === true,
          state: typeof m.state === "string" ? m.state : null,
          note: typeof m.note === "string" && m.note.trim() ? m.note : null,
          recommends: typeof m.recommends === "boolean" ? m.recommends : null,
          answers,
        };
      })
    : [];

  const p = isRecord(raw.progress) ? raw.progress : {};
  const s = isRecord(raw.summary) ? raw.summary : null;
  const meth = isRecord(raw.methodology) ? raw.methodology : null;

  return {
    id,
    brand: str(raw.brand),
    language: raw.language === "en" ? "en" : "es",
    country: str(raw.country),
    status,
    created_at: str(raw.created_at),
    finished_at: typeof raw.finished_at === "string" ? raw.finished_at : null,
    expires_at: str(raw.expires_at),
    questions,
    models,
    progress: { answered: num(p.answered), expected: num(p.expected), judged: p.judged === true },
    summary: s
      ? {
          n_models: num(s.n_models),
          know: num(s.know),
          confuse: num(s.confuse),
          no_answer: num(s.no_answer),
          recommend: num(s.recommend),
          card: str(s.card),
          agree: strList(s.agree),
          disagree: strList(s.disagree),
        }
      : null,
    methodology: meth
      ? {
          date: str(meth.date),
          models: num(meth.models),
          questions: num(meth.questions),
          max_tokens: num(meth.max_tokens),
          judge: str(meth.judge),
          automatic: meth.automatic !== false,
        }
      : null,
  };
}

// ---------------------------------------------------------------------------
// Labels
// ---------------------------------------------------------------------------

/** The judge writes its verdict in Spanish (the report's pipeline); English is accepted too. */
export function stateKey(state: string | null): StateKey {
  if (state === null) return "pending";
  const s = state.trim().toLowerCase();
  if (s === "correcta" || s === "correct") return "correct";
  if (s === "parcial" || s === "partial") return "partial";
  if (s === "confunde" || s === "confused" || s === "confuses") return "confused";
  if (s === "sin respuesta" || s === "no answer") return "none";
  if (s === "sin revisar" || s === "unreviewed" || s === "not reviewed") return "unreviewed";
  return "unreviewed";
}

export const STATE_LABELS: Record<Locale, Record<StateKey, string>> = {
  es: {
    correct: "Correcta",
    partial: "Parcial",
    confused: "La confunde",
    none: "Sin respuesta",
    unreviewed: "Sin revisar",
    pending: "Clasificando",
  },
  en: {
    correct: "Correct",
    partial: "Partial",
    confused: "Confuses it",
    none: "No answer",
    unreviewed: "Not reviewed",
    pending: "Being classified",
  },
};

const QUESTION_LABELS: Record<Locale, Record<string, string>> = {
  es: { q1_que_es: "Qué es", q3_recomienda: "Si la recomienda" },
  en: { q1_que_es: "What it is", q3_recomienda: "Whether it recommends it" },
};

const ANSWER_FALLBACK: Record<Locale, Record<Exclude<AnswerStatus, "ok">, string>> = {
  es: { empty: "El modelo no contestó nada.", error: "El modelo no respondió a tiempo o dio un error." },
  en: { empty: "The model returned nothing.", error: "The model timed out or returned an error." },
};

// ---------------------------------------------------------------------------
// View
// ---------------------------------------------------------------------------

export interface ModelView {
  name: string;
  provider: string;
  closed: boolean;
  typeLabel: string;
  state: StateKey;
  stateLabel: string;
  note: string | null;
  recommends: boolean;
  answers: { id: string; label: string; question: string; status: AnswerStatus; text: string }[];
}

export interface CheckView {
  id: string;
  brand: string;
  status: CheckStatus;
  running: boolean;
  /** Models whose answers are in, and how many are expected. */
  answeredModels: number;
  expectedModels: number;
  /** 0–100, for the progress bar. */
  percent: number;
  progressLine: string;
  card: string | null;
  counts: { n: number; know: number; confuse: number; noAnswer: number; recommend: number } | null;
  agree: string[];
  disagree: string[];
  models: ModelView[];
  methodology: { label: string; value: string }[];
  automaticNote: string;
}

function plural(n: number, one: string, many: string): string {
  return n === 1 ? one : many;
}

export function progressLine(locale: Locale, answered: number, expected: number): string {
  if (locale === "es") {
    return expected > 0
      ? `${answered} de ${expected} ${plural(expected, "modelo ha", "modelos han")} contestado`
      : `${answered} ${plural(answered, "modelo ha", "modelos han")} contestado`;
  }
  return expected > 0
    ? `${answered} of ${expected} ${plural(expected, "model has", "models have")} answered`
    : `${answered} ${plural(answered, "model has", "models have")} answered`;
}

/** Closed references first (the names readers know), then open models; alphabetical within each. */
function byKind(a: CheckModel, b: CheckModel): number {
  if (a.closed !== b.closed) return a.closed ? -1 : 1;
  return a.model.localeCompare(b.model);
}

export function toView(body: CheckBody, locale: Locale): CheckView {
  const nq = Math.max(1, body.questions.length || body.methodology?.questions || 2);
  const expectedModels =
    body.methodology?.models ||
    body.summary?.n_models ||
    (body.progress.expected > 0 ? Math.ceil(body.progress.expected / nq) : 0);
  // A model's row is inserted once its answers are in (contract: one row per
  // model, not per question), so the rows present are the models that answered.
  const answeredModels = Math.min(body.models.length, expectedModels || body.models.length);
  const done = body.status === "done";
  const percent = done
    ? 100
    : expectedModels > 0
      ? Math.min(99, Math.round((answeredModels / expectedModels) * 100))
      : 0;

  const questionText = new Map(body.questions.map((q) => [q.id, q.text]));
  const order = body.questions.length ? body.questions.map((q) => q.id) : ["q1_que_es", "q3_recomienda"];
  const labels = STATE_LABELS[locale];

  const models: ModelView[] = [...body.models].sort(byKind).map((m) => {
    const key = stateKey(m.state);
    const ids = [...order, ...Object.keys(m.answers).filter((id) => !order.includes(id))];
    return {
      name: m.model,
      provider: m.provider,
      closed: m.closed,
      typeLabel: m.closed
        ? locale === "es" ? "Cerrado" : "Closed"
        : locale === "es" ? "Abierto" : "Open",
      state: key,
      stateLabel: labels[key],
      note: m.note,
      recommends: m.recommends === true,
      answers: ids
        .filter((id) => m.answers[id])
        .map((id) => {
          const a = m.answers[id];
          return {
            id,
            label: QUESTION_LABELS[locale][id] ?? id,
            question: questionText.get(id) ?? "",
            status: a.status,
            text: a.text.trim()
              ? a.text
              : ANSWER_FALLBACK[locale][a.status === "error" ? "error" : "empty"],
          };
        }),
    };
  });

  const s = body.summary;
  const m = body.methodology;
  const methodology: { label: string; value: string }[] = [];
  if (m) {
    const es = locale === "es";
    if (m.date) methodology.push({ label: es ? "Fecha" : "Date", value: m.date });
    methodology.push({ label: es ? "Modelos" : "Models", value: String(m.models) });
    methodology.push({ label: es ? "Preguntas" : "Questions", value: String(m.questions) });
    methodology.push({
      label: es ? "Respuesta máxima" : "Answer cap",
      value: es ? `${m.max_tokens} tokens por pregunta` : `${m.max_tokens} tokens per question`,
    });
    methodology.push({ label: es ? "Búsqueda web" : "Web search", value: es ? "Apagada" : "Off" });
    if (m.judge) methodology.push({ label: es ? "Juez" : "Judge", value: m.judge });
  }

  return {
    id: body.id,
    brand: body.brand,
    status: body.status,
    running: body.status === "queued" || body.status === "running",
    answeredModels,
    expectedModels,
    percent,
    progressLine: progressLine(locale, answeredModels, expectedModels),
    card: s && s.card.trim() ? s.card : null,
    counts: s
      ? { n: s.n_models, know: s.know, confuse: s.confuse, noAnswer: s.no_answer, recommend: s.recommend }
      : null,
    agree: s?.agree ?? [],
    disagree: s?.disagree ?? [],
    models,
    methodology,
    automaticNote:
      locale === "es"
        ? "Clasificación automática, sin revisión humana."
        : "Classified automatically, with no human review.",
  };
}

// ---------------------------------------------------------------------------
// Comparison
// ---------------------------------------------------------------------------

export interface CompareRow {
  label: string;
  a: string;
  b: string;
  /** Which side has the higher share, for emphasis; null on a tie or when not comparable. */
  lead: "a" | "b" | null;
}

export function compareRows(a: CheckView, b: CheckView, locale: Locale): CompareRow[] {
  if (!a.counts || !b.counts) return [];
  const ca = a.counts;
  const cb = b.counts;
  const of = locale === "es" ? "de" : "of";
  const rows: [string, number, number][] =
    locale === "es"
      ? [
          ["La conocen", ca.know, cb.know],
          ["La confunden", ca.confuse, cb.confuse],
          ["No contestan", ca.noAnswer, cb.noAnswer],
          ["La recomiendan", ca.recommend, cb.recommend],
        ]
      : [
          ["Know it", ca.know, cb.know],
          ["Confuse it", ca.confuse, cb.confuse],
          ["Give no answer", ca.noAnswer, cb.noAnswer],
          ["Recommend it", ca.recommend, cb.recommend],
        ];
  return rows.map(([label, x, y]) => {
    const sx = ca.n > 0 ? x / ca.n : 0;
    const sy = cb.n > 0 ? y / cb.n : 0;
    return {
      label,
      a: `${x} ${of} ${ca.n}`,
      b: `${y} ${of} ${cb.n}`,
      lead: sx === sy ? null : sx > sy ? "a" : "b",
    };
  });
}

// ---------------------------------------------------------------------------
// URLs, sharing, validation
// ---------------------------------------------------------------------------

export const SITE = "https://sealmetrics.com";
export const PAGE_PATH: Record<Locale, string> = {
  es: "/es/que-dicen-las-ia/",
  en: "/what-ai-says/",
};
/** The query parameter that carries the brand: native per page. */
export const BRAND_PARAM: Record<Locale, string> = { es: "marca", en: "brand" };

export function readParams(search: string, locale: Locale): { brand: string; vs: string } {
  const q = new URLSearchParams(search);
  const other = locale === "es" ? "brand" : "marca";
  const brand = (q.get(BRAND_PARAM[locale]) ?? q.get(other) ?? "").trim().slice(0, 120);
  const vs = (q.get("vs") ?? "").trim().slice(0, 120);
  return { brand, vs: vs && vs.toLowerCase() !== brand.toLowerCase() ? vs : "" };
}

export function buildSearch(locale: Locale, brand: string, vs = ""): string {
  const q = new URLSearchParams();
  if (brand) q.set(BRAND_PARAM[locale], brand);
  if (brand && vs) q.set("vs", vs);
  const s = q.toString();
  return s ? `?${s}` : "";
}

export function shareUrl(locale: Locale, brand: string, vs = ""): string {
  return `${SITE}${PAGE_PATH[locale]}${buildSearch(locale, brand, vs)}`;
}

export function shareLinks(text: string, url: string): { linkedin: string; x: string; whatsapp: string } {
  const e = encodeURIComponent;
  return {
    // LinkedIn's share-offsite endpoint takes only the URL; the text comes from
    // the page's Open Graph tags, so the card line goes in the other two.
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${e(url)}`,
    x: `https://twitter.com/intent/tweet?text=${e(text)}&url=${e(url)}`,
    whatsapp: `https://wa.me/?text=${e(`${text} ${url}`)}`,
  };
}

export function takedownMailto(locale: Locale, brand: string, url: string): string {
  const subject = locale === "es" ? `Retirar el resultado de ${brand}` : `Remove the result for ${brand}`;
  const body =
    locale === "es"
      ? `Hola:\n\nRepresento a ${brand} y pido que retiréis este resultado:\n${url}\n\nMotivo:\n`
      : `Hello,\n\nI represent ${brand} and ask you to remove this result:\n${url}\n\nReason:\n`;
  return `mailto:privacy@sealmetrics.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** File-name-safe slug for the downloaded card. */
export function slugify(brand: string): string {
  return (
    brand
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "marca"
  );
}

export type BrandProblem = "empty" | "too_long" | "invalid";

/**
 * Mirrors the Worker's `normalizeBrand` (workers/forms/src/index.js), so the
 * page can say why a brand is refused before spending a Turnstile token. The
 * Worker still decides; this only explains.
 */
export function brandProblem(input: string): BrandProblem | null {
  const brand = input.trim();
  if (!brand) return "empty";
  if (brand.length > 120) return "too_long";
  const reject = [
    /[\u0000-\u001f\u007f]/,
    /[^\s@]+@[^\s@]+\.[^\s@]+/,
    /[a-z][a-z0-9+.-]*:\/\//i,
    /(^|\s)www\./i,
    /[^\s/]+\.[a-z]{2,}\/\S*/i,
  ];
  return reject.some((re) => re.test(brand)) ? "invalid" : null;
}

// ---------------------------------------------------------------------------
// Errors and polling
// ---------------------------------------------------------------------------

export type CheckError =
  | "quota"
  | "rate_limited"
  | "invalid"
  | "challenge"
  | "unavailable"
  | "network"
  | "not_found"
  | "failed";

/** Maps a Worker answer that is not a check body to what the page should say. */
export function errorFromResponse(status: number, body: unknown): CheckError {
  const code = isRecord(body) ? str(body.error) : "";
  if (status === 404) return "not_found";
  if (status === 429) return code === "quota" ? "quota" : "rate_limited";
  if (status === 400 || status === 422 || code === "invalid_fields") return "invalid";
  if (status === 403 && code === "challenge_failed") return "challenge";
  return "unavailable";
}

export const POLL_INTERVAL_MS = 2_000;
/** Two brands on screen: each polls less often, so both stay under the Worker's 60 reads/min. */
export const POLL_INTERVAL_COMPARE_MS = 3_000;
export const POLL_MAX_BACKOFF_MS = 16_000;
export const POLL_GIVE_UP_MS = 4 * 60_000;

export function isRunning(status: CheckStatus): boolean {
  return status === "queued" || status === "running";
}

/**
 * The next delay, or null to stop. `backoff` is the current extra delay after
 * a 429 (0 when the last read succeeded).
 */
export function nextPoll(opts: {
  status: CheckStatus;
  elapsedMs: number;
  compare: boolean;
  backoffMs: number;
}): number | null {
  if (!isRunning(opts.status)) return null;
  if (opts.elapsedMs >= POLL_GIVE_UP_MS) return null;
  const base = opts.compare ? POLL_INTERVAL_COMPARE_MS : POLL_INTERVAL_MS;
  return Math.max(base, Math.min(POLL_MAX_BACKOFF_MS, opts.backoffMs));
}

/** Doubles the delay after a 429, starting from the base interval. */
export function backoffAfter429(currentMs: number, compare: boolean): number {
  const base = compare ? POLL_INTERVAL_COMPARE_MS : POLL_INTERVAL_MS;
  return Math.min(POLL_MAX_BACKOFF_MS, Math.max(base, currentMs) * 2);
}
