import assert from "node:assert/strict";
import test from "node:test";
import worker from "../src/index.js";

const TOKEN = "a".repeat(64);
const N8N = "https://n8n.invalid/webhook/report-share";
const REPORT = "<!doctype html><html><body><h1 id=\"top\">Acme Coffee en respuestas de IA</h1></body></html>";

function memoryKv(entries = {}) {
  const store = new Map(Object.entries(entries));
  return {
    store,
    async get(key) {
      return store.has(key) ? store.get(key) : null;
    },
    async put(key, value) {
      store.set(key, value);
    },
  };
}

function env(kv = memoryKv({ [TOKEN]: REPORT })) {
  return {
    ALLOWED_ORIGINS: "https://sealmetrics.com",
    ALLOW_INSECURE_TESTING: "true",
    N8N_REPORT_SHARE_URL: N8N,
    BRAND_REPORTS: kv,
  };
}

function share(payload) {
  return new Request("https://forms.sealmetrics.com/api/forms", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "https://sealmetrics.com" },
    body: JSON.stringify({ type: "report_share", payload, turnstileToken: "ok" }),
  });
}

const valid = {
  token: TOKEN,
  language: "es",
  recipients: ["ana@empresa.com", "Luis@Empresa.com "],
  sender_name: "Marta",
};

async function withFetch(fn) {
  const original = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url, options = {}) => {
    calls.push({ url: String(url), body: options.body ? JSON.parse(options.body) : null });
    return new Response("{}", { status: 200 });
  };
  try {
    await fn(calls);
  } finally {
    globalThis.fetch = original;
  }
}

test("a valid share reaches n8n with clean recipients and the report title, and is counted", async () => {
  await withFetch(async (calls) => {
    const e = env();
    const response = await worker.fetch(share(valid), e);
    assert.equal(response.status, 200);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, N8N);
    assert.deepEqual(calls[0].body, {
      token: TOKEN,
      language: "es",
      recipients: ["ana@empresa.com", "luis@empresa.com"],
      sender_name: "Marta",
      report_title: "Acme Coffee en respuestas de IA",
    });
    assert.equal(e.BRAND_REPORTS.store.get(`share-count:${TOKEN}`), "2");
  });
});

test("a report that does not exist cannot be shared", async () => {
  await withFetch(async (calls) => {
    const response = await worker.fetch(share(valid), env(memoryKv()));
    assert.equal(response.status, 404);
    assert.equal(calls.length, 0);
  });
});

test("one report reaches at most twenty people", async () => {
  await withFetch(async (calls) => {
    const kv = memoryKv({ [TOKEN]: REPORT, [`share-count:${TOKEN}`]: "19" });
    const response = await worker.fetch(share(valid), env(kv));
    assert.equal(response.status, 429);
    assert.equal((await response.json()).error, "share_limit");
    assert.equal(calls.length, 0);
  });
});

test("refuses more than five recipients, duplicates, free-mail and malformed addresses", async () => {
  const bad = [
    { recipients: [] },
    { recipients: ["a@x.com", "b@x.com", "c@x.com", "d@x.com", "e@x.com", "f@x.com"] },
    { recipients: ["ana@empresa.com", "ANA@empresa.com"] },
    { recipients: ["someone@gmail.com"] },
    { recipients: ["not-an-email"] },
  ];
  await withFetch(async (calls) => {
    for (const patch of bad) {
      const response = await worker.fetch(share({ ...valid, ...patch }), env());
      assert.equal(response.status, 400, JSON.stringify(patch));
    }
    assert.equal(calls.length, 0);
  });
});

test("the sender's name cannot carry a link or an address", async () => {
  await withFetch(async (calls) => {
    for (const sender_name of ["https://spam.example", "visit www.spam.com", "x@y.com", "<b>hi</b>", "z".repeat(61)]) {
      const response = await worker.fetch(share({ ...valid, sender_name }), env());
      assert.equal(response.status, 400, sender_name);
    }
    assert.equal(calls.length, 0);
  });
});

test("a malformed token or language is refused before any lookup", async () => {
  await withFetch(async (calls) => {
    for (const patch of [{ token: "short" }, { token: "../../x".padEnd(40, "a") }, { language: "fr" }]) {
      const response = await worker.fetch(share({ ...valid, ...patch }), env());
      assert.equal(response.status, 400, JSON.stringify(patch));
    }
    assert.equal(calls.length, 0);
  });
});
