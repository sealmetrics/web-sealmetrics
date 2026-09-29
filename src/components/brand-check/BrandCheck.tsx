"use client";

import { useEffect, useRef, useState } from "react";
import { LeadTurnstile } from "@/components/forms/LeadTurnstile";
import { pushEvent } from "@/lib/analytics";
import { FORMS_WORKER_BASE } from "@/lib/forms/submit";
import {
  type BrandProblem,
  type CheckBody,
  type CheckError,
  type CheckView,
  type Locale,
  backoffAfter429,
  brandProblem,
  buildSearch,
  compareRows,
  errorFromResponse,
  isRunning,
  nextPoll,
  parseCheckBody,
  readParams,
  shareLinks,
  shareUrl,
  slugify,
  takedownMailto,
  toView,
} from "@/lib/brand-check/view";

/**
 * "What do AIs say about…?" — the live half of /what-ai-says and
 * /es/que-dicen-las-ia. The pages are static; everything here runs in the
 * browser against the forms Worker, which relays Enroutia's public brand-check
 * API (D-320). The Worker holds the token that pays for a check; this file
 * never talks to Enroutia directly.
 *
 * All the shaping of the API body lives in `src/lib/brand-check/view.ts`, which
 * is tested on its own. This file fetches, polls and renders.
 */

const ENDPOINT = `${FORMS_WORKER_BASE}/api/brand-check`;
/** Reads that fail for reasons other than 429 before the page stops and says so. */
const MAX_READ_FAILURES = 4;

type Slot =
  | { phase: "idle" }
  | { phase: "loading"; brand: string }
  | { phase: "missing"; brand: string }
  | { phase: "submitting"; brand: string }
  | { phase: "live"; brand: string; body: CheckBody; stalled: boolean; readError: CheckError | null }
  | { phase: "error"; brand: string; error: CheckError };

const copy = {
  es: {
    label: "Empresa o marca",
    placeholder: "Vueling",
    submit: "Preguntar a las IA",
    submitting: "Preguntando…",
    hint: "Si alguien ya preguntó por esta marca esta semana, el resultado sale al momento. Si no, las respuestas van apareciendo según llegan.",
    problems: {
      empty: "Escribe el nombre de una empresa o una marca.",
      too_long: "Ese nombre es demasiado largo: 120 caracteres como mucho.",
      invalid: "Escribe el nombre, no una dirección web ni un correo. «Booking.com» vale; «https://booking.com», no.",
    } satisfies Record<BrandProblem, string>,
    errors: {
      quota: "Hoy se han agotado las consultas gratuitas. Vuelve mañana, o pide el informe completo, que llega por correo.",
      rate_limited: "Demasiadas consultas seguidas desde tu conexión. Espera un minuto y vuelve a probar.",
      invalid: "Ese nombre no se puede consultar. Escribe el de una empresa o una marca, sin dirección web ni correo.",
      challenge: "La verificación de seguridad ha caducado. Márcala otra vez y vuelve a pulsar.",
      unavailable: "El servicio no responde ahora mismo. Prueba de nuevo en unos minutos.",
      network: "No hemos podido conectar. Revisa tu conexión y vuelve a probar.",
      not_found: "Todavía no hay resultado para esta marca.",
      failed: "La consulta ha fallado por nuestra parte. Vuelve a lanzarla: no te cuesta nada.",
    } satisfies Record<CheckError, string>,
    loading: (b: string) => `Buscando si ya hay un resultado para ${b}…`,
    missing: (b: string) =>
      `Nadie ha preguntado por ${b} en los últimos siete días. Pulsa «Preguntar a las IA» para lanzar la consulta.`,
    missingVs: (b: string) =>
      `Nadie ha preguntado por ${b} en los últimos siete días. Pulsa «Comparar» para lanzar la consulta.`,
    sending: (b: string) => `Enviando la pregunta sobre ${b}…`,
    eyebrow: "¿Qué dicen las IA de…?",
    asking: (b: string) => `Preguntando a las IA por ${b}…`,
    doneNoCard: "Consulta terminada.",
    stalled: "Está tardando más de lo normal. El resultado seguirá en esta dirección cuando termine.",
    keepWaiting: "Seguir esperando",
    readError: "Se ha cortado la conexión con el resultado. Lo que ves puede estar incompleto.",
    retry: "Volver a intentarlo",
    agree: "En qué coinciden",
    disagree: "En qué discrepan",
    byModel: "Modelo a modelo",
    recommends: "La recomienda",
    methodology: "Cómo se ha hecho",
    takedown: (b: string) => (
      <>
        ¿Representas a {b} y quieres que retiremos este resultado? Escríbenos a{" "}
      </>
    ),
    share: "Compártelo",
    copy: "Copiar enlace",
    copied: "Enlace copiado",
    copyFailed: "No se ha podido copiar. El enlace es:",
    png: "Descargar la tarjeta (PNG)",
    compareTitle: "Compara con otra marca",
    compareLabel: "Otra empresa o marca",
    comparePlaceholder: "Iberia",
    compareSubmit: "Comparar",
    compareRemove: "Quitar la comparación",
    versus: (a: string, b: string) => `${a} frente a ${b}`,
    compareCaption: "Cuántos modelos de cada consulta",
    progressLabel: "Progreso de la consulta",
    security: "Verificación de seguridad",
  },
  en: {
    label: "Company or brand",
    placeholder: "Monzo",
    submit: "Ask the models",
    submitting: "Asking…",
    hint: "If someone asked about this brand in the past week, the result appears at once. If not, answers appear as each model replies.",
    problems: {
      empty: "Type the name of a company or a brand.",
      too_long: "That name is too long: 120 characters at most.",
      invalid: "Type the name, not a web address or an email. “Booking.com” works; “https://booking.com” does not.",
    } satisfies Record<BrandProblem, string>,
    errors: {
      quota: "Today's free checks have run out. Come back tomorrow, or request the full report, which arrives by email.",
      rate_limited: "Too many checks in a row from your connection. Wait a minute and try again.",
      invalid: "That name cannot be checked. Type a company or brand name, without a web address or an email.",
      challenge: "The security check expired. Tick it again and press once more.",
      unavailable: "The service is not responding right now. Try again in a few minutes.",
      network: "We could not connect. Check your connection and try again.",
      not_found: "There is no result for this brand yet.",
      failed: "The check failed on our side. Run it again: it costs you nothing.",
    } satisfies Record<CheckError, string>,
    loading: (b: string) => `Looking for an existing result for ${b}…`,
    missing: (b: string) =>
      `Nobody has asked about ${b} in the past seven days. Press “Ask the models” to run the check.`,
    missingVs: (b: string) =>
      `Nobody has asked about ${b} in the past seven days. Press “Compare” to run the check.`,
    sending: (b: string) => `Sending the question about ${b}…`,
    eyebrow: "What do AIs say about…?",
    asking: (b: string) => `Asking the models about ${b}…`,
    doneNoCard: "Check finished.",
    stalled: "This is taking longer than usual. The result will stay at this address when it finishes.",
    keepWaiting: "Keep waiting",
    readError: "The connection to the result dropped. What you see may be incomplete.",
    retry: "Try again",
    agree: "Where they agree",
    disagree: "Where they disagree",
    byModel: "Model by model",
    recommends: "Recommends it",
    methodology: "How this was run",
    takedown: (b: string) => <>Do you represent {b} and want this result removed? Write to </>,
    share: "Share it",
    copy: "Copy link",
    copied: "Link copied",
    copyFailed: "Could not copy. The link is:",
    png: "Download the card (PNG)",
    compareTitle: "Compare with another brand",
    compareLabel: "Another company or brand",
    comparePlaceholder: "Revolut",
    compareSubmit: "Compare",
    compareRemove: "Remove the comparison",
    versus: (a: string, b: string) => `${a} vs ${b}`,
    compareCaption: "How many models in each check",
    progressLabel: "Check progress",
    security: "Security check",
  },
} as const;

type Copy = (typeof copy)[Locale];

// ---------------------------------------------------------------------------
// One brand: fetch, create, poll.
// ---------------------------------------------------------------------------

async function readJson(res: Response): Promise<unknown> {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

function useCheckSlot(locale: Locale, compareMode: boolean) {
  const [slot, setSlotState] = useState<Slot>({ phase: "idle" });
  // Polling runs in timers that outlive a render, so everything they read is a
  // ref. `generation` invalidates any in-flight read when a new one starts.
  const slotRef = useRef<Slot>(slot);
  const generation = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const compareRef = useRef(compareMode);
  const doneReported = useRef(new Set<string>());

  useEffect(() => {
    compareRef.current = compareMode;
  }, [compareMode]);

  function setSlot(next: Slot | ((s: Slot) => Slot)) {
    const value = typeof next === "function" ? next(slotRef.current) : next;
    slotRef.current = value;
    setSlotState(value);
  }

  function stop() {
    generation.current += 1;
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }

  useEffect(() => stop, []);

  function accept(brand: string, body: CheckBody, startedAt: number, gen: number) {
    if (gen !== generation.current) return;
    setSlot({ phase: "live", brand, body, stalled: false, readError: null });
    if (body.status === "done" && !doneReported.current.has(body.id)) {
      doneReported.current.add(body.id);
      pushEvent({ event: "brand_check_done", language: locale });
    }
    schedule(brand, body, startedAt, 0, 0, gen);
  }

  function schedule(
    brand: string,
    body: CheckBody,
    startedAt: number,
    backoffMs: number,
    failures: number,
    gen: number,
  ) {
    const delay = nextPoll({
      status: body.status,
      elapsedMs: Date.now() - startedAt,
      compare: compareRef.current,
      backoffMs,
    });
    if (delay === null) {
      if (isRunning(body.status)) {
        setSlot((s) => (s.phase === "live" && s.body.id === body.id ? { ...s, stalled: true } : s));
      }
      return;
    }

    const retry = (error: CheckError) => {
      if (failures + 1 >= MAX_READ_FAILURES) {
        setSlot((s) => (s.phase === "live" ? { ...s, readError: error } : s));
        return;
      }
      schedule(brand, body, startedAt, backoffAfter429(backoffMs, compareRef.current), failures + 1, gen);
    };

    timer.current = setTimeout(async () => {
      if (gen !== generation.current) return;
      let res: Response;
      try {
        res = await fetch(`${ENDPOINT}?${new URLSearchParams({ id: body.id })}`, {
          headers: { Accept: "application/json" },
          cache: "no-store",
        });
      } catch {
        if (gen === generation.current) retry("network");
        return;
      }
      if (gen !== generation.current) return;
      if (res.status === 429) {
        schedule(brand, body, startedAt, backoffAfter429(backoffMs, compareRef.current), failures, gen);
        return;
      }
      const json = await readJson(res);
      if (gen !== generation.current) return;
      const next = res.ok ? parseCheckBody(json) : null;
      if (!next) {
        retry(res.ok ? "unavailable" : errorFromResponse(res.status, json));
        return;
      }
      accept(brand, next, startedAt, gen);
    }, delay);
  }

  /** Reads an existing result (a shared link). Free: no Turnstile, no charge. */
  async function load(brand: string) {
    stop();
    const gen = generation.current;
    setSlot({ phase: "loading", brand });
    let res: Response;
    try {
      res = await fetch(`${ENDPOINT}?${new URLSearchParams({ brand, language: locale })}`, {
        headers: { Accept: "application/json" },
        cache: "no-store",
      });
    } catch {
      if (gen === generation.current) setSlot({ phase: "error", brand, error: "network" });
      return;
    }
    const json = await readJson(res);
    if (gen !== generation.current) return;
    if (res.status === 404) {
      setSlot({ phase: "missing", brand });
      return;
    }
    const body = res.ok ? parseCheckBody(json) : null;
    if (!body) {
      setSlot({ phase: "error", brand, error: res.ok ? "unavailable" : errorFromResponse(res.status, json) });
      return;
    }
    accept(brand, body, Date.now(), gen);
  }

  /** Creates a check, or gets this week's cached one back. Needs a Turnstile token. */
  async function create(brand: string, turnstileToken: string, companyFax: string): Promise<boolean> {
    stop();
    const gen = generation.current;
    setSlot({ phase: "submitting", brand });
    let res: Response;
    try {
      res = await fetch(ENDPOINT, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ brand, language: locale, turnstileToken, company_fax: companyFax }),
      });
    } catch {
      if (gen === generation.current) setSlot({ phase: "error", brand, error: "network" });
      return false;
    }
    const json = await readJson(res);
    if (gen !== generation.current) return false;
    // A honeypot hit comes back 202 `{ok:true}` with no id: nothing to poll.
    const body = res.ok ? parseCheckBody(json) : null;
    if (!body) {
      setSlot({ phase: "error", brand, error: res.ok ? "unavailable" : errorFromResponse(res.status, json) });
      return false;
    }
    pushEvent({ event: "brand_check_start", language: locale, cached: res.status === 200 });
    accept(brand, body, Date.now(), gen);
    return true;
  }

  /** Restarts polling after the four-minute limit or a dropped connection. */
  function resume() {
    const current = slotRef.current;
    if (current.phase !== "live") return;
    stop();
    const gen = generation.current;
    setSlot({ ...current, stalled: false, readError: null });
    schedule(current.brand, current.body, Date.now(), 0, 0, gen);
  }

  function reset() {
    stop();
    setSlot({ phase: "idle" });
  }

  return { slot, load, create, resume, reset };
}

// ---------------------------------------------------------------------------
// The card as a PNG, drawn with the Canvas 2D API in the site's style: paper,
// ink rule, hard acid offset shadow, square corners. No library.
// ---------------------------------------------------------------------------

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (ctx.measureText(candidate).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

async function drawCard(view: CheckView, t: Copy, url: string, fontFamily: string, monoFamily: string) {
  if (document.fonts?.ready) await document.fonts.ready;
  const W = 1200;
  const H = 630;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const INK = "#111412";
  const ACID = "#CBFF3D";
  const PAPER = "#F4F1E8";
  const WHITE = "#FFFDF7";
  const MUTED = "#5D625A";

  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, W, H);

  // Card with a hard offset shadow.
  const x = 56;
  const y = 48;
  const w = W - 2 * x - 20;
  const h = H - 2 * y - 20;
  ctx.fillStyle = ACID;
  ctx.fillRect(x + 20, y + 20, w, h);
  ctx.fillStyle = WHITE;
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  ctx.strokeRect(x + 1, y + 1, w - 2, h - 2);

  // Eyebrow chip: ink with acid text.
  ctx.font = `650 18px ${monoFamily}`;
  const eyebrow = t.eyebrow.toUpperCase();
  const chipW = ctx.measureText(eyebrow).width + 32;
  ctx.fillStyle = INK;
  ctx.fillRect(x + 48, y + 44, chipW, 38);
  ctx.fillStyle = ACID;
  ctx.textBaseline = "middle";
  ctx.fillText(eyebrow, x + 64, y + 64);

  // Brand.
  ctx.fillStyle = INK;
  ctx.textBaseline = "alphabetic";
  let size = 76;
  ctx.font = `790 ${size}px ${fontFamily}`;
  while (ctx.measureText(view.brand).width > w - 96 && size > 40) {
    size -= 4;
    ctx.font = `790 ${size}px ${fontFamily}`;
  }
  ctx.fillText(view.brand, x + 48, y + 90 + size);

  // The card line.
  ctx.font = `500 34px ${fontFamily}`;
  const text = view.card ?? view.progressLine;
  const lines = wrap(ctx, text, w - 96).slice(0, 5);
  let ly = y + 90 + size + 64;
  for (const line of lines) {
    ctx.fillText(line, x + 48, ly);
    ly += 44;
  }

  // Footer rule and address.
  const fy = y + h - 64;
  ctx.fillStyle = INK;
  ctx.fillRect(x + 48, fy, w - 96, 1);
  ctx.font = `650 17px ${monoFamily}`;
  ctx.fillStyle = MUTED;
  ctx.fillText(url.replace(/^https:\/\//, "").split("?")[0].replace(/\/$/, ""), x + 48, fy + 36);
  ctx.font = `790 22px ${fontFamily}`;
  ctx.fillStyle = INK;
  const brandMark = "Sealmetrics";
  ctx.fillText(brandMark, x + w - 48 - ctx.measureText(brandMark).width, fy + 38);

  return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function ShareBar({
  view,
  locale,
  t,
  url,
}: {
  view: CheckView;
  locale: Locale;
  t: Copy;
  url: string;
}) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const rootRef = useRef<HTMLDivElement>(null);
  const text = view.card ?? "";
  const links = shareLinks(text, url);

  const track = (channel: string) => pushEvent({ event: "brand_check_share", channel, language: locale });

  async function copyLink() {
    track("copy");
    try {
      await navigator.clipboard.writeText(url);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  async function downloadPng() {
    track("png");
    const el = rootRef.current ?? document.body;
    const style = getComputedStyle(el);
    const sans = style.fontFamily || "sans-serif";
    const mono = style.getPropertyValue("--font-mono").trim() || "monospace";
    const blob = await drawCard(view, t, url, sans, mono);
    if (!blob) return;
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = `${locale === "es" ? "que-dicen-las-ia" : "what-ai-says"}-${slugify(view.brand)}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(href), 1000);
  }

  return (
    <div ref={rootRef} className="sig-check-share" data-md="skip">
      <p className="sig-brand-tag">{t.share}</p>
      <div className="sig-check-share-row">
        <a href={links.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => track("linkedin")}>
          LinkedIn
        </a>
        <a href={links.x} target="_blank" rel="noopener noreferrer" onClick={() => track("x")}>
          X
        </a>
        <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp")}>
          WhatsApp
        </a>
        <button type="button" onClick={copyLink}>
          {copyState === "copied" ? t.copied : t.copy}
        </button>
        <button type="button" onClick={downloadPng}>
          {t.png}
        </button>
      </div>
      <p className="sig-check-share-status" aria-live="polite">
        {copyState === "failed" ? (
          <>
            {t.copyFailed} <span className="sig-check-url">{url}</span>
          </>
        ) : null}
      </p>
    </div>
  );
}

function ModelCard({ model, t }: { model: CheckView["models"][number]; t: Copy }) {
  return (
    <article className={`sig-check-model is-${model.state}`}>
      <header className="sig-check-model-top">
        <div>
          <h4>{model.name}</h4>
          {model.provider ? <p>{model.provider}</p> : null}
        </div>
        <div className="sig-check-model-badges">
          <span className={`sig-check-kind ${model.closed ? "is-closed" : "is-open"}`}>{model.typeLabel}</span>
          {model.recommends ? <span className="sig-check-recommends">{t.recommends}</span> : null}
        </div>
      </header>
      <p className={`sig-check-state is-${model.state}`}>{model.stateLabel}</p>
      {model.note ? <p className="sig-check-note">{model.note}</p> : null}
      <div className="sig-check-answers">
        {model.answers.map((a) => (
          <details key={a.id}>
            <summary>
              <span>{a.label}</span>
            </summary>
            {a.question ? <p className="sig-check-question">{a.question}</p> : null}
            <blockquote className={a.status === "ok" ? undefined : "is-missing"}>{a.text}</blockquote>
          </details>
        ))}
      </div>
    </article>
  );
}

function Result({
  slot,
  view,
  locale,
  t,
  url,
  isVs,
  onRetry,
  onResume,
}: {
  slot: Slot;
  view: CheckView | null;
  locale: Locale;
  t: Copy;
  url: string;
  isVs: boolean;
  onRetry: () => void;
  onResume: () => void;
}) {
  if (slot.phase === "idle") return null;
  if (slot.phase === "loading" || slot.phase === "submitting") {
    return (
      <p className="sig-check-status" role="status">
        {slot.phase === "loading" ? t.loading(slot.brand) : t.sending(slot.brand)}
      </p>
    );
  }
  if (slot.phase === "missing") {
    return (
      <p className="sig-check-status" role="status">
        {isVs ? t.missingVs(slot.brand) : t.missing(slot.brand)}
      </p>
    );
  }
  if (slot.phase === "error") {
    return (
      <div className="sig-check-alert" role="alert">
        <p>{t.errors[slot.error]}</p>
        {slot.error === "network" || slot.error === "unavailable" ? (
          <button type="button" className="sig-check-link-button" onClick={onRetry}>
            {t.retry}
          </button>
        ) : null}
      </div>
    );
  }
  if (!view) return null;

  const failed = view.status === "failed";
  const done = view.status === "done";

  return (
    <div className="sig-check-result">
      <section className="sig-check-card" aria-label={view.brand}>
        <p className="sig-check-card-eyebrow">
          <span>{t.eyebrow}</span>
        </p>
        <h2 className="sig-check-card-brand">{view.brand}</h2>
        {done && view.card ? (
          <p className="sig-check-card-line">{view.card}</p>
        ) : failed ? (
          <p className="sig-check-card-line is-failed">{t.errors.failed}</p>
        ) : done ? (
          <p className="sig-check-card-line">{t.doneNoCard}</p>
        ) : (
          <p className="sig-check-card-line is-running">{t.asking(view.brand)}</p>
        )}
        {!failed ? (
          <div className="sig-check-progress">
            <p aria-live="polite" aria-atomic="true">
              {view.progressLine}
            </p>
            {!done ? (
              <div
                className="sig-check-bar"
                role="progressbar"
                aria-label={t.progressLabel}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={view.percent}
              >
                <span style={{ width: `${view.percent}%` }} />
              </div>
            ) : null}
          </div>
        ) : null}
      </section>

      {slot.phase === "live" && slot.stalled ? (
        <div className="sig-check-alert" role="status">
          <p>{t.stalled}</p>
          <button type="button" className="sig-check-link-button" onClick={onResume}>
            {t.keepWaiting}
          </button>
        </div>
      ) : null}
      {slot.phase === "live" && slot.readError ? (
        <div className="sig-check-alert" role="alert">
          <p>{t.readError}</p>
          <button type="button" className="sig-check-link-button" onClick={onResume}>
            {t.retry}
          </button>
        </div>
      ) : null}

      {view.agree.length || view.disagree.length ? (
        <div className="sig-check-consensus">
          {view.agree.length ? (
            <section>
              <h3>{t.agree}</h3>
              {view.agree.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </section>
          ) : null}
          {view.disagree.length ? (
            <section>
              <h3>{t.disagree}</h3>
              {view.disagree.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </section>
          ) : null}
        </div>
      ) : null}

      {view.models.length ? (
        <section className="sig-check-models">
          <h3>{t.byModel}</h3>
          <div className="sig-check-model-grid">
            {view.models.map((m) => (
              <ModelCard key={m.name} model={m} t={t} />
            ))}
          </div>
        </section>
      ) : null}

      {view.methodology.length ? (
        <section className="sig-check-method">
          <h3>{t.methodology}</h3>
          <dl>
            {view.methodology.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
          <p>{view.automaticNote}</p>
        </section>
      ) : null}

      {done && view.card ? <ShareBar view={view} locale={locale} t={t} url={url} /> : null}

      <p className="sig-check-takedown">
        {t.takedown(view.brand)}
        <a href={takedownMailto(locale, view.brand, url)}>privacy@sealmetrics.com</a>.
      </p>
    </div>
  );
}

function viewOf(slot: Slot, locale: Locale): CheckView | null {
  return slot.phase === "live" ? toView(slot.body, locale) : null;
}

function brandOf(slot: Slot): string {
  if (slot.phase === "idle") return "";
  return slot.phase === "live" ? slot.body.brand || slot.brand : slot.brand;
}

export function BrandCheck({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [brand, setBrand] = useState("");
  const [vsInput, setVsInput] = useState("");
  const [problem, setProblem] = useState<BrandProblem | null>(null);
  const [vsProblem, setVsProblem] = useState<BrandProblem | null>(null);
  const [companyFax, setCompanyFax] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [tokenKey, setTokenKey] = useState(0);
  const [vsToken, setVsToken] = useState<string | null>(null);
  const [vsTokenKey, setVsTokenKey] = useState(0);
  const [compareOpen, setCompareOpen] = useState(false);

  const [comparing, setComparing] = useState(false);
  const primary = useCheckSlot(locale, comparing);
  const secondary = useCheckSlot(locale, comparing);

  useEffect(() => {
    setComparing(secondary.slot.phase !== "idle");
  }, [secondary.slot.phase]);

  // A shared link: ?marca=… (ES) / ?brand=… (EN), optionally &vs=… Read once,
  // on mount; after that the URL follows the page, never the other way round.
  const initialised = useRef(false);
  useEffect(() => {
    if (initialised.current) return;
    initialised.current = true;
    const { brand: b, vs } = readParams(window.location.search, locale);
    if (!b) return;
    setBrand(b);
    void primary.load(b);
    if (vs) {
      setVsInput(vs);
      setCompareOpen(true);
      void secondary.load(vs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const primaryBrand = brandOf(primary.slot);
  const secondaryBrand = brandOf(secondary.slot);
  const url = shareUrl(locale, primaryBrand, secondaryBrand);

  function setUrl(a: string, b: string) {
    try {
      window.history.replaceState(window.history.state, "", `${window.location.pathname}${buildSearch(locale, a, b)}`);
    } catch {
      // Some embedded browsers refuse replaceState; the result still renders.
    }
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const clean = brand.trim();
    const p = brandProblem(clean);
    setProblem(p);
    if (p || !token) return;
    secondary.reset();
    setCompareOpen(false);
    setUrl(clean, "");
    await primary.create(clean, token, companyFax);
    // Turnstile tokens are single-use: fetch a fresh one for the next check.
    setToken(null);
    setTokenKey((k) => k + 1);
  }

  async function onCompare(event: React.FormEvent) {
    event.preventDefault();
    const clean = vsInput.trim();
    const p = brandProblem(clean);
    setVsProblem(p);
    if (p || !vsToken || !primaryBrand) return;
    pushEvent({ event: "brand_check_compare", language: locale });
    setUrl(primaryBrand, clean);
    await secondary.create(clean, vsToken, companyFax);
    setVsToken(null);
    setVsTokenKey((k) => k + 1);
  }

  function removeCompare() {
    secondary.reset();
    setVsInput("");
    setCompareOpen(false);
    setUrl(primaryBrand, "");
  }

  const pView = viewOf(primary.slot, locale);
  const sView = viewOf(secondary.slot, locale);
  const rows = pView && sView ? compareRows(pView, sView, locale) : [];
  const busy = primary.slot.phase === "submitting" || primary.slot.phase === "loading";
  const canCompare = primary.slot.phase === "live";

  return (
    <div className="sig-check-app">
      <form className="sig-brand-form sig-check-form" onSubmit={onSubmit} noValidate>
        <div className="sig-check-form-row">
          <label className="sig-brand-field">
            <span>{t.label}</span>
            <input
              type="text"
              name="brand"
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
                if (problem) setProblem(null);
              }}
              placeholder={t.placeholder}
              maxLength={120}
              autoComplete="organization"
              aria-invalid={problem ? true : undefined}
              aria-describedby="brand-check-hint"
              required
            />
          </label>
          <button type="submit" className="sig-brand-submit" disabled={!token || busy}>
            {busy ? t.submitting : t.submit}
            {busy ? null : <Arrow />}
          </button>
        </div>
        {/* Honeypot: hidden from people, filled by bots that read the markup. */}
        <input
          type="text"
          name="company_fax"
          value={companyFax}
          onChange={(e) => setCompanyFax(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="sig-brand-honeypot"
        />
        <div className="sig-check-form-foot">
          <p id="brand-check-hint" className="sig-check-hint">
            {t.hint}
          </p>
          <div className="sig-check-turnstile" aria-label={t.security}>
            <LeadTurnstile onToken={setToken} resetKey={tokenKey} locale={locale} />
          </div>
        </div>
        {problem ? (
          <p className="sig-brand-error" role="alert">
            {t.problems[problem]}
          </p>
        ) : null}
      </form>

      {secondary.slot.phase === "idle" ? (
        <div className="sig-check-single">
          <Result
            slot={primary.slot}
            view={pView}
            locale={locale}
            t={t}
            url={url}
            isVs={false}
            onRetry={() => primaryBrand && primary.load(primaryBrand)}
            onResume={primary.resume}
          />
        </div>
      ) : (
        <div className="sig-check-compare">
          <div className="sig-check-compare-head">
            <h2>{t.versus(primaryBrand, secondaryBrand)}</h2>
            <button type="button" className="sig-check-link-button" onClick={removeCompare}>
              {t.compareRemove}
            </button>
          </div>
          {pView?.card || sView?.card ? (
            <div className="sig-check-compare-cards">
              <p>
                <strong>{primaryBrand}</strong> {pView?.card ?? pView?.progressLine ?? ""}
              </p>
              <p>
                <strong>{secondaryBrand}</strong> {sView?.card ?? sView?.progressLine ?? ""}
              </p>
            </div>
          ) : null}
          {rows.length ? (
            <table className="sig-check-compare-table">
              <caption>{t.compareCaption}</caption>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sig-check-sr">{t.compareCaption}</span>
                  </th>
                  <th scope="col">{primaryBrand}</th>
                  <th scope="col">{secondaryBrand}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row">{r.label}</th>
                    <td className={r.lead === "a" ? "is-lead" : undefined}>{r.a}</td>
                    <td className={r.lead === "b" ? "is-lead" : undefined}>{r.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
          <div className="sig-check-columns">
            <div>
              <Result
                slot={primary.slot}
                view={pView}
                locale={locale}
                t={t}
                url={url}
                isVs={false}
                onRetry={() => primaryBrand && primary.load(primaryBrand)}
                onResume={primary.resume}
              />
            </div>
            <div>
              <Result
                slot={secondary.slot}
                view={sView}
                locale={locale}
                t={t}
                url={url}
                isVs
                onRetry={() => secondaryBrand && secondary.load(secondaryBrand)}
                onResume={secondary.resume}
              />
            </div>
          </div>
        </div>
      )}

      {canCompare ? (
        <section className="sig-check-compare-form" aria-labelledby="brand-check-compare-title">
          {compareOpen || secondary.slot.phase !== "idle" ? (
            <form onSubmit={onCompare} noValidate>
              <h2 id="brand-check-compare-title">{t.compareTitle}</h2>
              <div className="sig-check-form-row">
                <label className="sig-brand-field">
                  <span>{t.compareLabel}</span>
                  <input
                    type="text"
                    name="vs"
                    value={vsInput}
                    onChange={(e) => {
                      setVsInput(e.target.value);
                      if (vsProblem) setVsProblem(null);
                    }}
                    placeholder={t.comparePlaceholder}
                    maxLength={120}
                    aria-invalid={vsProblem ? true : undefined}
                  />
                </label>
                <button
                  type="submit"
                  className="sig-brand-submit"
                  disabled={!vsToken || secondary.slot.phase === "submitting"}
                >
                  {t.compareSubmit}
                  <Arrow />
                </button>
              </div>
              <div className="sig-check-turnstile" aria-label={t.security}>
                <LeadTurnstile onToken={setVsToken} resetKey={vsTokenKey} locale={locale} />
              </div>
              {vsProblem ? (
                <p className="sig-brand-error" role="alert">
                  {t.problems[vsProblem]}
                </p>
              ) : null}
            </form>
          ) : (
            <button
              type="button"
              id="brand-check-compare-title"
              className="sig-check-open-compare"
              onClick={() => setCompareOpen(true)}
              aria-expanded={false}
            >
              {t.compareTitle} <Arrow />
            </button>
          )}
        </section>
      ) : null}
    </div>
  );
}
