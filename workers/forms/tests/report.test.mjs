import assert from "node:assert/strict";
import test from "node:test";
import worker from "../src/index.js";

const SECRET = "test_upload_secret";
const TOKEN = "Zk3q9V0b7yT2mP4xL8cN1rW6sH5jD0gA3uE7iO9kQ2f";
const HTML = "<!doctype html><html><body><h1>Informe</h1></body></html>";

// In-memory stand-in for the KV namespace, recording the options of each put.
function memoryKv() {
  const store = new Map();
  const puts = [];
  return {
    puts,
    async put(key, value, options) {
      puts.push({ key, options });
      store.set(key, value);
    },
    async get(key) {
      return store.has(key) ? store.get(key) : null;
    },
  };
}

function env(extra = {}) {
  return {
    ALLOWED_ORIGINS: "https://sealmetrics.com,https://www.sealmetrics.com",
    ALLOW_INSECURE_TESTING: "true",
    REPORT_UPLOAD_SECRET: SECRET,
    BRAND_REPORTS: memoryKv(),
    ...extra,
  };
}

function put(token, body, { secret = SECRET, type = "text/html; charset=utf-8" } = {}) {
  const headers = { "Content-Type": type };
  if (secret !== null) headers.Authorization = `Bearer ${secret}`;
  return new Request(`https://forms.sealmetrics.com/api/report/${token}`, {
    method: "PUT",
    headers,
    body,
  });
}

function get(token, origin = "https://sealmetrics.com") {
  const headers = {};
  if (origin) headers.Origin = origin;
  return new Request(`https://forms.sealmetrics.com/api/report/${token}`, {
    method: "GET",
    headers,
  });
}

test("PUT with the secret stores the report for 30 days", async () => {
  const e = env();
  const response = await worker.fetch(put(TOKEN, HTML), e);
  assert.equal(response.status, 201);
  const body = await response.json();
  assert.equal(body.ok, true);
  assert.ok(Date.parse(body.expires_at) > Date.now());
  assert.equal(e.BRAND_REPORTS.puts.length, 1);
  assert.equal(e.BRAND_REPORTS.puts[0].key, TOKEN);
  assert.equal(e.BRAND_REPORTS.puts[0].options.expirationTtl, 30 * 24 * 60 * 60);
});

test("PUT without the secret, or with the wrong one, is refused and stores nothing", async () => {
  for (const secret of [null, "wrong", ""]) {
    const e = env();
    const response = await worker.fetch(put(TOKEN, HTML, { secret }), e);
    assert.equal(response.status, 401);
    assert.equal(e.BRAND_REPORTS.puts.length, 0);
  }
});

test("PUT is refused when the Worker has no upload secret configured", async () => {
  const e = env({ REPORT_UPLOAD_SECRET: undefined });
  const response = await worker.fetch(put(TOKEN, HTML, { secret: "" }), e);
  assert.equal(response.status, 401);
});

test("PUT refuses anything that is not HTML, and an empty body", async () => {
  const e = env();
  assert.equal((await worker.fetch(put(TOKEN, HTML, { type: "application/json" }), e)).status, 415);
  assert.equal((await worker.fetch(put(TOKEN, "   "), e)).status, 413);
  assert.equal(e.BRAND_REPORTS.puts.length, 0);
});

test("GET from sealmetrics.com returns the stored HTML, not indexable", async () => {
  const e = env();
  await worker.fetch(put(TOKEN, HTML), e);
  const response = await worker.fetch(get(TOKEN), e);
  assert.equal(response.status, 200);
  assert.equal(await response.text(), HTML);
  assert.equal(response.headers.get("Content-Type"), "text/html; charset=utf-8");
  assert.equal(response.headers.get("Access-Control-Allow-Origin"), "https://sealmetrics.com");
  assert.equal(response.headers.get("X-Robots-Tag"), "noindex, nofollow");
});

test("GET of an unknown or expired token is a 404", async () => {
  const response = await worker.fetch(get(TOKEN), env());
  assert.equal(response.status, 404);
  assert.equal((await response.json()).error, "not_found");
});

test("GET from another origin is refused", async () => {
  const e = env();
  await worker.fetch(put(TOKEN, HTML), e);
  const response = await worker.fetch(get(TOKEN, "https://evil.example"), e);
  assert.equal(response.status, 403);
});

test("a token that is too short, or has other characters, is not a report route", async () => {
  for (const token of ["short", `${TOKEN.slice(0, 20)}.x`, "../../etc"]) {
    const response = await worker.fetch(get(token), env());
    assert.equal(response.status, 404);
    assert.equal((await response.json()).error, "not_found");
  }
});

test("without the KV binding the route answers 503, never 500", async () => {
  const e = env({ BRAND_REPORTS: undefined });
  assert.equal((await worker.fetch(put(TOKEN, HTML), e)).status, 503);
  assert.equal((await worker.fetch(get(TOKEN), e)).status, 503);
});
