import assert from "node:assert/strict";
import test from "node:test";
import worker from "../src/index.js";

const ENROUTIA = "https://enroutia.invalid";
const TOKEN = "pat_test_token";
const CHECK_ID = "3f2b8c1e-9a4d-4e6f-8b21-0c5d7e9f1a2b";

const baseEnv = {
  ALLOWED_ORIGINS: "https://sealmetrics.com,https://www.sealmetrics.com",
  TURNSTILE_HOSTNAMES: "sealmetrics.com,www.sealmetrics.com",
  TURNSTILE_ACTION: "sealmetrics_lead",
  ALLOW_INSECURE_TESTING: "true",
  ENROUTIA_API_BASE: ENROUTIA,
  ENROUTIA_BRAND_CHECK_TOKEN: TOKEN,
};

const publicCheck = {
  id: CHECK_ID,
  brand: "Vueling",
  language: "es",
  country: "España",
  status: "running",
  models: [],
  progress: { answered: 3, expected: 38, judged: false },
  summary: null,
};

function post(body, origin = "https://sealmetrics.com") {
  const headers = { "Content-Type": "application/json" };
  if (origin) headers.Origin = origin;
  return new Request("https://forms.sealmetrics.com/api/brand-check", {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
}

function get(query, origin = "https://sealmetrics.com") {
  const headers = {};
  if (origin) headers.Origin = origin;
  return new Request(`https://forms.sealmetrics.com/api/brand-check?${query}`, {
    method: "GET",
    headers,
  });
}

// Replaces global fetch for one test and records every call.
async function withFetch(handler, fn) {
  const originalFetch = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url, options = {}) => {
    calls.push({ url: String(url), options });
    return handler(String(url), options);
  };
  try {
    await fn(calls);
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test("POST forwards brand, language and country with the bearer token", async () => {
  await withFetch(
    () => Response.json(publicCheck, { status: 202 }),
    async (calls) => {
      const response = await worker.fetch(
        post({ brand: "  Vueling ", language: "es", country: "España", company_fax: "" }),
        baseEnv,
      );
      assert.equal(response.status, 202);
      assert.deepEqual(await response.json(), publicCheck);
      assert.equal(response.headers.get("Access-Control-Allow-Origin"), "https://sealmetrics.com");
      assert.equal(response.headers.get("Access-Control-Allow-Methods"), "GET, POST, OPTIONS");
      assert.equal(calls.length, 1);
      assert.equal(calls[0].url, `${ENROUTIA}/api/brand-checks`);
      assert.equal(calls[0].options.method, "POST");
      assert.equal(calls[0].options.headers.Authorization, `Bearer ${TOKEN}`);
      assert.deepEqual(JSON.parse(calls[0].options.body), {
        brand: "Vueling",
        language: "es",
        country: "España",
      });
    },
  );
});

test("POST relays a cached 200 and omits an absent country", async () => {
  await withFetch(
    () => Response.json({ ...publicCheck, status: "done" }, { status: 200 }),
    async (calls) => {
      const response = await worker.fetch(post({ brand: "Booking.com", language: "en" }), baseEnv);
      assert.equal(response.status, 200);
      assert.equal((await response.json()).status, "done");
      assert.deepEqual(JSON.parse(calls[0].options.body), { brand: "Booking.com", language: "en" });
    },
  );
});

test("POST rejects invalid fields without contacting Enroutia", async () => {
  const cases = [
    ["a missing brand", { language: "es" }],
    ["an empty brand", { brand: "   ", language: "es" }],
    ["a brand over 120 characters", { brand: "B".repeat(121), language: "es" }],
    ["a brand that is not a string", { brand: 42, language: "es" }],
    ["an email as brand", { brand: "cmo@vueling.com", language: "es" }],
    ["a URL as brand", { brand: "https://vueling.com", language: "es" }],
    ["a www address as brand", { brand: "www.vueling.com", language: "es" }],
    ["a domain with a path as brand", { brand: "vueling.com/es", language: "es" }],
    ["a missing language", { brand: "Vueling" }],
    ["a language outside es/en", { brand: "Vueling", language: "fr" }],
    ["a country over 60 characters", { brand: "Vueling", language: "es", country: "C".repeat(61) }],
    ["a country that is not a string", { brand: "Vueling", language: "es", country: 7 }],
  ];
  await withFetch(
    () => Response.json(publicCheck, { status: 202 }),
    async (calls) => {
      for (const [label, body] of cases) {
        const response = await worker.fetch(post(body), baseEnv);
        assert.equal(response.status, 400, `${label} should be rejected`);
        assert.deepEqual(await response.json(), { ok: false, error: "invalid_fields" });
      }
      assert.equal(calls.length, 0);
    },
  );
});

test("POST with a filled honeypot succeeds quietly without forwarding", async () => {
  await withFetch(
    () => Response.json(publicCheck, { status: 202 }),
    async (calls) => {
      const response = await worker.fetch(
        post({ brand: "Vueling", language: "es", company_fax: "spam" }),
        baseEnv,
      );
      assert.equal(response.status, 202);
      assert.equal(calls.length, 0);
    },
  );
});

test("POST refuses unknown and missing origins", async () => {
  for (const origin of ["https://attacker.invalid", null]) {
    const response = await worker.fetch(post({ brand: "Vueling", language: "es" }, origin), baseEnv);
    assert.equal(response.status, 403);
    assert.equal(response.headers.get("Access-Control-Allow-Origin"), null);
  }
});

test("POST without the Enroutia token answers 503", async () => {
  await withFetch(
    () => Response.json(publicCheck, { status: 202 }),
    async (calls) => {
      const env = { ...baseEnv };
      delete env.ENROUTIA_BRAND_CHECK_TOKEN;
      const response = await worker.fetch(post({ brand: "Vueling", language: "es" }), env);
      assert.equal(response.status, 503);
      assert.deepEqual(await response.json(), { ok: false, error: "unavailable" });
      assert.equal(calls.length, 0);
    },
  );
});

test("POST requires Turnstile and uses the form rate limiter in production mode", async () => {
  let limiterKey;
  const env = {
    ...baseEnv,
    ALLOW_INSECURE_TESTING: "false",
    REQUIRE_TURNSTILE: "true",
    TURNSTILE_SECRET: "test-secret",
    FORM_RATE_LIMITER: {
      limit: async ({ key }) => {
        limiterKey = key;
        return { success: true };
      },
    },
  };
  await withFetch(
    (url) =>
      url.includes("siteverify")
        ? Response.json({ success: true, action: "sealmetrics_lead", hostname: "sealmetrics.com" })
        : Response.json(publicCheck, { status: 202 }),
    async (calls) => {
      const missing = await worker.fetch(post({ brand: "Vueling", language: "es" }), env);
      assert.equal(missing.status, 403);
      assert.deepEqual(await missing.json(), { ok: false, error: "challenge_failed" });
      assert.equal(calls.length, 0);

      const ok = await worker.fetch(
        post({ brand: "Vueling", language: "es", turnstileToken: "valid-token" }),
        env,
      );
      assert.equal(ok.status, 202);
      assert.equal(calls.length, 2);
      assert.match(calls[0].url, /siteverify/);
      assert.equal(calls[1].url, `${ENROUTIA}/api/brand-checks`);
      assert.equal(limiterKey, "unknown");
    },
  );

  const limited = await worker.fetch(
    post({ brand: "Vueling", language: "es", turnstileToken: "t" }),
    { ...env, FORM_RATE_LIMITER: { limit: async () => ({ success: false }) } },
  );
  assert.equal(limited.status, 429);
});

test("POST maps upstream errors without leaking their bodies", async () => {
  const secret = "balance 0.00 EUR key pat_leaky project 1234 Traceback";
  const cases = [
    [429, 429, "quota"],
    [402, 503, "unavailable"],
    [409, 503, "unavailable"],
    [401, 503, "unavailable"],
    [403, 503, "unavailable"],
    [404, 503, "unavailable"],
    [500, 503, "unavailable"],
    [502, 503, "unavailable"],
    [503, 503, "unavailable"],
    [422, 400, "invalid_fields"],
  ];
  for (const [upstream, status, error] of cases) {
    await withFetch(
      () => Response.json({ detail: secret }, { status: upstream }),
      async () => {
        const response = await worker.fetch(post({ brand: "Vueling", language: "es" }), baseEnv);
        const text = await response.text();
        assert.equal(response.status, status, `upstream ${upstream}`);
        assert.deepEqual(JSON.parse(text), { ok: false, error });
        assert.ok(!text.includes("pat_leaky"), `upstream ${upstream} body leaked`);
      },
    );
  }
});

test("POST maps timeouts, network errors and non-JSON success to 503", async () => {
  const handlers = [
    () => {
      throw new DOMException("The operation timed out.", "TimeoutError");
    },
    () => {
      throw new TypeError("fetch failed");
    },
    () => new Response("<html>gateway</html>", { status: 200 }),
  ];
  for (const handler of handlers) {
    await withFetch(handler, async () => {
      const response = await worker.fetch(post({ brand: "Vueling", language: "es" }), baseEnv);
      assert.equal(response.status, 503);
      assert.deepEqual(await response.json(), { ok: false, error: "unavailable" });
    });
  }
});

test("GET by brand proxies the public read and relays Cache-Control", async () => {
  await withFetch(
    () =>
      Response.json(publicCheck, {
        status: 200,
        headers: { "Cache-Control": "public, max-age=5" },
      }),
    async (calls) => {
      const response = await worker.fetch(get("brand=Vueling%20Airlines&language=es"), baseEnv);
      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), publicCheck);
      assert.equal(response.headers.get("Cache-Control"), "public, max-age=5");
      assert.equal(response.headers.get("X-Robots-Tag"), "noindex");
      assert.equal(response.headers.get("Access-Control-Allow-Origin"), "https://sealmetrics.com");
      assert.equal(response.headers.get("Access-Control-Allow-Methods"), "GET, POST, OPTIONS");
      assert.equal(calls.length, 1);
      const upstream = new URL(calls[0].url);
      assert.equal(upstream.origin + upstream.pathname, `${ENROUTIA}/api/brand-checks/public`);
      assert.equal(upstream.searchParams.get("brand"), "Vueling Airlines");
      assert.equal(upstream.searchParams.get("language"), "es");
      assert.equal(calls[0].options.headers.Authorization, `Bearer ${TOKEN}`);
      const echoed = JSON.stringify([...response.headers]);
      assert.ok(!echoed.includes(TOKEN), "token must not be echoed in headers");
    },
  );
});

test("GET by id proxies the public read by uuid", async () => {
  await withFetch(
    () =>
      Response.json(publicCheck, {
        status: 200,
        headers: { "Cache-Control": "public, max-age=300" },
      }),
    async (calls) => {
      const response = await worker.fetch(get(`id=${CHECK_ID.toUpperCase()}`), baseEnv);
      assert.equal(response.status, 200);
      assert.equal(response.headers.get("Cache-Control"), "public, max-age=300");
      assert.equal(calls[0].url, `${ENROUTIA}/api/brand-checks/public/${CHECK_ID}`);
    },
  );
});

test("GET relays a 404 not_found", async () => {
  await withFetch(
    () => Response.json({ detail: "not_found" }, { status: 404 }),
    async () => {
      const response = await worker.fetch(get("brand=Nadie&language=en"), baseEnv);
      assert.equal(response.status, 404);
      assert.deepEqual(await response.json(), { detail: "not_found" });
      assert.equal(response.headers.get("Cache-Control"), "no-store");
    },
  );
});

test("GET rejects malformed ids and queries without contacting Enroutia", async () => {
  const queries = [
    "id=not-a-uuid",
    `id=${CHECK_ID}x`,
    "id=../../admin",
    `id=${CHECK_ID.replace(/-/g, "")}`,
    "id=",
    "brand=Vueling",
    "brand=Vueling&language=de",
    "language=es",
    "brand=https%3A%2F%2Fvueling.com&language=es",
    "brand=a%40b.com&language=es",
    `brand=${"B".repeat(121)}&language=es`,
    "",
  ];
  await withFetch(
    () => Response.json(publicCheck),
    async (calls) => {
      for (const query of queries) {
        const response = await worker.fetch(get(query), baseEnv);
        assert.equal(response.status, 400, `?${query} should be rejected`);
      }
      assert.equal(calls.length, 0);
    },
  );
});

test("GET allows a direct navigation without Origin, and refuses a foreign one", async () => {
  await withFetch(
    () => Response.json(publicCheck, { headers: { "Cache-Control": "public, max-age=300" } }),
    async (calls) => {
      const direct = await worker.fetch(get(`id=${CHECK_ID}`, null), baseEnv);
      assert.equal(direct.status, 200);
      assert.equal(direct.headers.get("Access-Control-Allow-Origin"), null);

      const foreign = await worker.fetch(get(`id=${CHECK_ID}`, "https://attacker.invalid"), baseEnv);
      assert.equal(foreign.status, 403);
      assert.equal(foreign.headers.get("Access-Control-Allow-Origin"), null);
      assert.equal(calls.length, 1);
    },
  );
});

test("GET uses its own rate limiter, not the form one", async () => {
  const env = {
    ...baseEnv,
    ALLOW_INSECURE_TESTING: "false",
    FORM_RATE_LIMITER: { limit: async () => ({ success: false }) },
    BRAND_CHECK_READ_LIMITER: { limit: async () => ({ success: true }) },
  };
  await withFetch(
    () => Response.json(publicCheck),
    async () => {
      const ok = await worker.fetch(get(`id=${CHECK_ID}`), env);
      assert.equal(ok.status, 200);
      const limited = await worker.fetch(get(`id=${CHECK_ID}`), {
        ...env,
        BRAND_CHECK_READ_LIMITER: { limit: async () => ({ success: false }) },
      });
      assert.equal(limited.status, 429);
      const unbound = { ...env };
      delete unbound.BRAND_CHECK_READ_LIMITER;
      assert.equal((await worker.fetch(get(`id=${CHECK_ID}`), unbound)).status, 429);
    },
  );
});

test("GET maps upstream failures to 503 without leaking bodies", async () => {
  const handlers = [
    () => new Response("Traceback pat_leaky", { status: 500 }),
    () => Response.json({ detail: "pat_leaky" }, { status: 502 }),
    () => Response.json({ detail: "pat_leaky" }, { status: 422 }),
    () => {
      throw new DOMException("The operation timed out.", "TimeoutError");
    },
  ];
  for (const handler of handlers) {
    await withFetch(handler, async () => {
      const response = await worker.fetch(get(`id=${CHECK_ID}`), baseEnv);
      const text = await response.text();
      assert.equal(response.status, 503);
      assert.deepEqual(JSON.parse(text), { ok: false, error: "unavailable" });
      assert.ok(!text.includes("pat_leaky"));
    });
  }
});

test("OPTIONS on the brand check allows GET for allowed origins only", async () => {
  const preflight = (origin) =>
    new Request("https://forms.sealmetrics.com/api/brand-check", {
      method: "OPTIONS",
      headers: { Origin: origin, "Access-Control-Request-Method": "GET" },
    });
  const ok = await worker.fetch(preflight("https://www.sealmetrics.com"), baseEnv);
  assert.equal(ok.status, 204);
  assert.equal(ok.headers.get("Access-Control-Allow-Origin"), "https://www.sealmetrics.com");
  assert.equal(ok.headers.get("Access-Control-Allow-Methods"), "GET, POST, OPTIONS");

  const bad = await worker.fetch(preflight("https://attacker.invalid"), baseEnv);
  assert.equal(bad.status, 403);
  assert.equal(bad.headers.get("Access-Control-Allow-Origin"), null);
});

test("/api/forms keeps advertising POST only, and other methods are refused", async () => {
  const forms = await worker.fetch(
    new Request("https://forms.sealmetrics.com/api/forms", {
      method: "OPTIONS",
      headers: { Origin: "https://sealmetrics.com" },
    }),
    baseEnv,
  );
  assert.equal(forms.headers.get("Access-Control-Allow-Methods"), "POST, OPTIONS");

  const del = await worker.fetch(
    new Request("https://forms.sealmetrics.com/api/brand-check", {
      method: "DELETE",
      headers: { Origin: "https://sealmetrics.com" },
    }),
    baseEnv,
  );
  assert.equal(del.status, 405);
});

test("GET still works anonymously when the token is not set", async () => {
  const env = { ...baseEnv };
  delete env.ENROUTIA_BRAND_CHECK_TOKEN;
  await withFetch(
    () => Response.json(publicCheck, { headers: { "Cache-Control": "public, max-age=5" } }),
    async (calls) => {
      const response = await worker.fetch(get(`id=${CHECK_ID}`), env);
      assert.equal(response.status, 200);
      assert.equal(calls.length, 1);
      assert.equal(calls[0].options.headers.Authorization, undefined);
    },
  );
});

test("the token never reaches the browser, whatever Enroutia answers", async () => {
  const handlers = [
    () => Response.json({ echo: `Bearer ${TOKEN}` }, { status: 401 }),
    () => Response.json({ echo: TOKEN }, { status: 500 }),
    () => new Response(`Authorization: Bearer ${TOKEN}`, { status: 403 }),
  ];
  for (const handler of handlers) {
    for (const req of [
      () => get(`id=${CHECK_ID}`),
      () => post({ brand: "Vueling", language: "es" }),
    ]) {
      await withFetch(handler, async () => {
        const response = await worker.fetch(req(), baseEnv);
        const text = await response.text();
        assert.equal(response.status, 503);
        assert.ok(!text.includes(TOKEN), "token leaked in body");
        assert.ok(!JSON.stringify([...response.headers]).includes(TOKEN), "token leaked in headers");
      });
    }
  }
});
