/**
 * The pure half of /what-ai-says and /es/que-dicen-las-ia: API body → view.
 *
 * There is no live brand-check API to render against yet (Enroutia D-320), and
 * a fixture path in production code is not allowed, so the rendering decisions
 * are tested here instead, on bodies shaped exactly like the contract's public
 * body. Loaded the same way as the analytics tests: transpiled on its own and
 * imported from a data: URL.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

const source = readFileSync("src/lib/brand-check/view.ts", "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const v = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);

const QUESTIONS = [
  { id: "q1_que_es", text: "¿Qué es Vueling?" },
  { id: "q3_recomienda", text: "Recomiéndame una aerolínea de bajo coste en España." },
];

function model(name, over = {}) {
  return {
    model: name,
    provider: "openai",
    closed: false,
    state: null,
    note: null,
    recommends: null,
    answers: {
      q1_que_es: { status: "ok", text: `${name} dice que es una aerolínea.` },
      q3_recomienda: { status: "ok", text: "Vueling o Iberia Express." },
    },
    ...over,
  };
}

function body(over = {}) {
  return {
    id: "3f1c2a4e-9b7d-4c1a-8e2f-0a1b2c3d4e5f",
    brand: "Vueling",
    language: "es",
    country: "España",
    status: "running",
    created_at: "2026-09-23T10:00:00Z",
    finished_at: null,
    expires_at: "2026-10-23T10:00:00Z",
    questions: QUESTIONS,
    models: [],
    progress: { answered: 0, expected: 38, judged: false },
    summary: null,
    methodology: {
      date: "23 de septiembre de 2026",
      models: 19,
      questions: 2,
      max_tokens: 700,
      judge: "qwen3-235b",
      automatic: true,
    },
    ...over,
  };
}

const DONE = body({
  status: "done",
  finished_at: "2026-09-23T10:03:00Z",
  progress: { answered: 38, expected: 38, judged: true },
  models: [
    model("qwen3-235b", { state: "Correcta", recommends: true }),
    model("gpt-6-astra", { closed: true, state: "Parcial", note: "Dice que tiene sede en Madrid." }),
    model("mistral-large", { state: "Confunde", note: "La confunde con Volotea." }),
    model("llama-4", { state: "Sin respuesta", answers: { q1_que_es: { status: "empty", text: "" }, q3_recomienda: { status: "error", text: "" } } }),
    model("gemma-3", { state: "Sin revisar" }),
  ],
  summary: {
    n_models: 19,
    know: 7,
    confuse: 5,
    no_answer: 4,
    recommend: 2,
    card: "Preguntamos a 19 IA por Vueling. 7 la conocen. 5 la confunden. 2 la recomiendan.",
    agree: ["La describen como aerolínea de bajo coste."],
    disagree: ["No coinciden en dónde tiene la sede."],
  },
});

test("a honeypot or error body is not a check", () => {
  assert.equal(v.parseCheckBody({ ok: true }), null);
  assert.equal(v.parseCheckBody({ ok: false, error: "quota" }), null);
  assert.equal(v.parseCheckBody(null), null);
  assert.equal(v.parseCheckBody({ id: "x", status: "weird" }), null);
});

test("a running check shows live counts and no card yet", () => {
  const b = v.parseCheckBody(body({ models: [model("a"), model("b"), model("c")], progress: { answered: 6, expected: 38, judged: false } }));
  const view = v.toView(b, "es");
  assert.equal(view.running, true);
  assert.equal(view.card, null);
  assert.equal(view.counts, null);
  assert.equal(view.answeredModels, 3);
  assert.equal(view.expectedModels, 19);
  assert.equal(view.progressLine, "3 de 19 modelos han contestado");
  assert.ok(view.percent > 0 && view.percent < 100);
  // No verdict yet: every arrived model is "being classified", not "not reviewed".
  assert.ok(view.models.every((m) => m.state === "pending"));
});

test("expected models fall back to progress.expected over the question count", () => {
  const b = v.parseCheckBody(body({ methodology: null, models: [model("a")], progress: { answered: 2, expected: 38, judged: false } }));
  const view = v.toView(b, "en");
  assert.equal(view.expectedModels, 19);
  assert.equal(view.progressLine, "1 of 19 models have answered");
  assert.deepEqual(view.methodology, []);
});

test("a finished check renders the card, consensus, states and methodology", () => {
  const view = v.toView(v.parseCheckBody(DONE), "es");
  assert.equal(view.running, false);
  assert.equal(view.percent, 100);
  assert.equal(view.card, DONE.summary.card);
  assert.deepEqual(view.agree, DONE.summary.agree);
  assert.deepEqual(view.disagree, DONE.summary.disagree);
  assert.deepEqual(view.counts, { n: 19, know: 7, confuse: 5, noAnswer: 4, recommend: 2 });

  // Closed references first, then open models alphabetically.
  assert.deepEqual(
    view.models.map((m) => m.name),
    ["gpt-6-astra", "gemma-3", "llama-4", "mistral-large", "qwen3-235b"],
  );
  const byName = Object.fromEntries(view.models.map((m) => [m.name, m]));
  assert.equal(byName["gpt-6-astra"].typeLabel, "Cerrado");
  assert.equal(byName["gpt-6-astra"].state, "partial");
  assert.equal(byName["gpt-6-astra"].note, "Dice que tiene sede en Madrid.");
  assert.equal(byName["qwen3-235b"].state, "correct");
  assert.equal(byName["qwen3-235b"].recommends, true);
  assert.equal(byName["mistral-large"].stateLabel, "La confunde");
  assert.equal(byName["llama-4"].state, "none");
  assert.equal(byName["gemma-3"].state, "unreviewed");
  assert.equal(byName["gemma-3"].stateLabel, "Sin revisar");

  // Both answers, in question order, with the question text; empty ones explained.
  assert.deepEqual(byName["qwen3-235b"].answers.map((a) => a.id), ["q1_que_es", "q3_recomienda"]);
  assert.equal(byName["qwen3-235b"].answers[0].question, "¿Qué es Vueling?");
  assert.equal(byName["llama-4"].answers[0].text, "El modelo no contestó nada.");
  assert.equal(byName["llama-4"].answers[1].text, "El modelo no respondió a tiempo o dio un error.");

  const method = Object.fromEntries(view.methodology.map((r) => [r.label, r.value]));
  assert.equal(method.Fecha, "23 de septiembre de 2026");
  assert.equal(method.Modelos, "19");
  assert.equal(method.Preguntas, "2");
  assert.equal(method["Respuesta máxima"], "700 tokens por pregunta");
  assert.equal(method.Juez, "qwen3-235b");
  assert.equal(view.automaticNote, "Clasificación automática, sin revisión humana.");
});

test("English labels are native, not the Spanish verdict strings", () => {
  const view = v.toView(v.parseCheckBody(DONE), "en");
  const labels = Object.fromEntries(view.models.map((m) => [m.name, m.stateLabel]));
  assert.equal(labels["qwen3-235b"], "Correct");
  assert.equal(labels["mistral-large"], "Confuses it");
  assert.equal(labels["gemma-3"], "Not reviewed");
  assert.equal(view.automaticNote, "Classified automatically, with no human review.");
});

test("singular progress line", () => {
  assert.equal(v.progressLine("es", 1, 1), "1 de 1 modelo ha contestado");
  assert.equal(v.progressLine("en", 0, 1), "0 of 1 model has answered");
});

test("a missing or malformed field degrades instead of throwing", () => {
  const b = v.parseCheckBody({
    id: "abc",
    status: "done",
    models: [{ model: "m", answers: { q1_que_es: { status: "weird", text: 3 } } }],
    summary: { card: "x", agree: "not a list" },
  });
  const view = v.toView(b, "es");
  assert.equal(view.models[0].answers[0].status, "error");
  assert.deepEqual(view.agree, []);
  assert.equal(view.card, "x");
});

test("comparison rows use each check's own denominator", () => {
  const a = v.toView(v.parseCheckBody(DONE), "es");
  const bBody = structuredClone(DONE);
  bBody.brand = "Iberia";
  bBody.summary = { ...bBody.summary, n_models: 18, know: 12, confuse: 1, no_answer: 5, recommend: 2 };
  const b = v.toView(v.parseCheckBody(bBody), "es");
  const rows = v.compareRows(a, b, "es");
  assert.deepEqual(rows[0], { label: "La conocen", a: "7 de 19", b: "12 de 18", lead: "b" });
  assert.equal(rows[1].lead, "a"); // 5/19 confuse vs 1/18
  // 2/19 vs 2/18: same count, different share, so the smaller panel leads.
  assert.equal(rows[3].lead, "b");
  assert.deepEqual(v.compareRows(a, v.toView(v.parseCheckBody(body()), "es"), "es"), []);
});

test("URLs use the native parameter per language and survive round trips", () => {
  assert.equal(v.buildSearch("es", "Vueling", "Iberia"), "?marca=Vueling&vs=Iberia");
  assert.equal(v.buildSearch("en", "Monzo"), "?brand=Monzo");
  assert.equal(v.buildSearch("en", ""), "");
  assert.deepEqual(v.readParams("?marca=Caf%C3%A9+Nuevo&vs=Iberia", "es"), { brand: "Café Nuevo", vs: "Iberia" });
  // The other language's parameter is accepted, and vs equal to the brand is dropped.
  assert.deepEqual(v.readParams("?brand=Monzo&vs=monzo", "es"), { brand: "Monzo", vs: "" });
  assert.equal(v.shareUrl("es", "Vueling"), "https://sealmetrics.com/es/que-dicen-las-ia/?marca=Vueling");
  assert.equal(v.shareUrl("en", "Monzo", "Revolut"), "https://sealmetrics.com/what-ai-says/?brand=Monzo&vs=Revolut");
});

test("share intents carry the card line and the URL", () => {
  const url = "https://sealmetrics.com/es/que-dicen-las-ia/?marca=Vueling";
  const links = v.shareLinks("7 la conocen.", url);
  assert.ok(links.linkedin.startsWith("https://www.linkedin.com/sharing/share-offsite/?url="));
  assert.ok(links.linkedin.includes(encodeURIComponent(url)));
  assert.ok(links.x.includes(encodeURIComponent("7 la conocen.")));
  assert.equal(links.whatsapp, `https://wa.me/?text=${encodeURIComponent(`7 la conocen. ${url}`)}`);
});

test("takedown mailto goes to privacy@ with the brand prefilled", () => {
  const m = v.takedownMailto("es", "Vueling", "https://sealmetrics.com/es/que-dicen-las-ia/?marca=Vueling");
  assert.ok(m.startsWith("mailto:privacy@sealmetrics.com?subject="));
  assert.ok(decodeURIComponent(m).includes("Retirar el resultado de Vueling"));
  assert.ok(decodeURIComponent(m).includes("?marca=Vueling"));
});

test("brand validation mirrors the Worker", () => {
  assert.equal(v.brandProblem("  "), "empty");
  assert.equal(v.brandProblem("x".repeat(121)), "too_long");
  assert.equal(v.brandProblem("ana@empresa.com"), "invalid");
  assert.equal(v.brandProblem("https://booking.com"), "invalid");
  assert.equal(v.brandProblem("www.booking.com"), "invalid");
  assert.equal(v.brandProblem("booking.com/es"), "invalid");
  assert.equal(v.brandProblem("Booking.com"), null);
  assert.equal(v.brandProblem("El Corte Inglés"), null);
  assert.equal(v.slugify("El Corte Inglés"), "el-corte-ingles");
});

test("Worker errors map to what the page says", () => {
  assert.equal(v.errorFromResponse(429, { ok: false, error: "quota" }), "quota");
  assert.equal(v.errorFromResponse(429, { ok: false, error: "rate_limited" }), "rate_limited");
  assert.equal(v.errorFromResponse(400, { ok: false, error: "invalid_fields" }), "invalid");
  assert.equal(v.errorFromResponse(403, { ok: false, error: "challenge_failed" }), "challenge");
  assert.equal(v.errorFromResponse(404, { detail: "not_found" }), "not_found");
  assert.equal(v.errorFromResponse(503, { ok: false, error: "unavailable" }), "unavailable");
  assert.equal(v.errorFromResponse(502, null), "unavailable");
});

test("polling: 2 s alone, 3 s when comparing, backs off on 429, stops at 4 minutes", () => {
  assert.equal(v.nextPoll({ status: "running", elapsedMs: 0, compare: false, backoffMs: 0 }), 2000);
  assert.equal(v.nextPoll({ status: "queued", elapsedMs: 0, compare: true, backoffMs: 0 }), 3000);
  assert.equal(v.nextPoll({ status: "done", elapsedMs: 0, compare: false, backoffMs: 0 }), null);
  assert.equal(v.nextPoll({ status: "failed", elapsedMs: 0, compare: false, backoffMs: 0 }), null);
  assert.equal(v.nextPoll({ status: "running", elapsedMs: 4 * 60_000, compare: false, backoffMs: 0 }), null);

  let backoff = 0;
  const seen = [];
  for (let i = 0; i < 5; i++) {
    backoff = v.backoffAfter429(backoff, false);
    seen.push(v.nextPoll({ status: "running", elapsedMs: 0, compare: false, backoffMs: backoff }));
  }
  assert.deepEqual(seen, [4000, 8000, 16000, 16000, 16000]);
});
