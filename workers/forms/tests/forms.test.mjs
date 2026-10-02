import assert from "node:assert/strict";
import test from "node:test";
import worker from "../src/index.js";

const baseEnv = {
  ALLOWED_ORIGINS: "https://sealmetrics.com,https://www.sealmetrics.com",
  TURNSTILE_HOSTNAMES: "sealmetrics.com,www.sealmetrics.com",
  TURNSTILE_ACTION: "sealmetrics_lead",
  ALLOW_INSECURE_TESTING: "true",
};

function request(body, origin = "https://sealmetrics.com") {
  return new Request("https://forms.sealmetrics.com/api/forms", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: origin },
    body: JSON.stringify(body),
  });
}

test("rejects unknown origins", async () => {
  const response = await worker.fetch(
    request({ type: "demo", payload: {} }, "https://attacker.invalid"),
    baseEnv,
  );
  assert.equal(response.status, 403);
});

test("rejects invalid lead fields without contacting n8n", async () => {
  const response = await worker.fetch(
    request({ type: "demo", payload: { email: "invalid" } }),
    baseEnv,
  );
  assert.equal(response.status, 400);
});

test("keeps n8n private and forwards the accepted payload unchanged", async () => {
  const originalFetch = globalThis.fetch;
  let forwarded;
  globalThis.fetch = async (url, options) => {
    forwarded = { url: String(url), options };
    return new Response(null, { status: 204 });
  };

  const payload = {
    name: "Test Person",
    email: "test@example.com",
    website: "https://example.com",
    gdpr: true,
    source: "worker-test",
  };
  try {
    const response = await worker.fetch(
      request({ type: "demo", payload, company_fax: "" }),
      { ...baseEnv, N8N_WEBFORM_LEAD_URL: "https://automation.invalid/webform" },
    );
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
    assert.equal(forwarded.url, "https://automation.invalid/webform");
    assert.deepEqual(JSON.parse(forwarded.options.body), payload);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("a filled honeypot returns success without forwarding", async () => {
  const originalFetch = globalThis.fetch;
  let forwarded = false;
  globalThis.fetch = async () => {
    forwarded = true;
    return new Response(null, { status: 204 });
  };
  try {
    const response = await worker.fetch(
      request({ type: "demo", payload: {}, company_fax: "spam" }),
      baseEnv,
    );
    assert.equal(response.status, 200);
    assert.equal(forwarded, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("accepts a demo-access hostname when websiteRaw contains the URL", async () => {
  let forwarded = 0;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    forwarded += 1;
    return new Response(null, { status: 200 });
  };
  try {
    const response = await worker.fetch(
      request({
        type: "demo_access",
        payload: {
          name: "Test Lead",
          email: "test@sealmetrics.com",
          website: "sealmetrics.com",
          websiteRaw: "https://sealmetrics.com",
          gdpr: true,
        },
      }),
      { ...baseEnv, N8N_DEMO_ACCESS_URL: "https://automation.invalid/demo" },
    );
    assert.equal(response.status, 200);
    assert.equal(forwarded, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("requires a Turnstile token in production mode", async () => {
  const response = await worker.fetch(
    request({
      type: "demo",
      payload: {
        name: "Test Person",
        email: "test@example.com",
        website: "https://example.com",
        gdpr: true,
      },
    }),
    {
      ...baseEnv,
      ALLOW_INSECURE_TESTING: "false",
      REQUIRE_TURNSTILE: "true",
      TURNSTILE_SECRET: "test-secret",
      FORM_RATE_LIMITER: { limit: async () => ({ success: true }) },
      N8N_WEBFORM_LEAD_URL: "https://automation.invalid/webform",
    },
  );
  assert.equal(response.status, 403);
  assert.deepEqual(await response.json(), { ok: false, error: "challenge_failed" });
});

test("validates the Turnstile action and hostname before forwarding", async () => {
  const originalFetch = globalThis.fetch;
  const requests = [];
  globalThis.fetch = async (url) => {
    requests.push(String(url));
    if (String(url).includes("siteverify")) {
      return Response.json({
        success: true,
        action: "sealmetrics_lead",
        hostname: "sealmetrics.com",
      });
    }
    return new Response(null, { status: 204 });
  };

  try {
    const response = await worker.fetch(
      request({
        type: "demo",
        payload: {
          name: "Test Person",
          email: "test@example.com",
          website: "https://example.com",
          gdpr: true,
        },
        turnstileToken: "valid-test-token",
      }),
      {
        ...baseEnv,
        ALLOW_INSECURE_TESTING: "false",
        REQUIRE_TURNSTILE: "true",
        TURNSTILE_SECRET: "test-secret",
        FORM_RATE_LIMITER: { limit: async () => ({ success: true }) },
        N8N_WEBFORM_LEAD_URL: "https://automation.invalid/webform",
      },
    );
    assert.equal(response.status, 200);
    assert.equal(requests.length, 2);
    assert.match(requests[0], /siteverify/);
    assert.equal(requests[1], "https://automation.invalid/webform");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("routes every public form type through the private relay", async () => {
  const originalFetch = globalThis.fetch;
  const forwarded = [];
  globalThis.fetch = async (url) => {
    forwarded.push(String(url));
    return new Response(null, { status: 204 });
  };

  const env = {
    ...baseEnv,
    N8N_WEBFORM_LEAD_URL: "https://automation.invalid/webform",
    N8N_DEMO_ACCESS_URL: "https://automation.invalid/demo-access",
    N8N_CAREERS_URL: "https://automation.invalid/careers",
    N8N_BRAND_REPORT_URL: "https://automation.invalid/brand-report",
    N8N_STUDY_DOWNLOAD_URL: "https://automation.invalid/study-download",
  };
  const cases = [
    ["demo", { name: "Test Lead", email: "test@example.com", website: "https://example.com", gdpr: true }, env.N8N_WEBFORM_LEAD_URL],
    ["demo_access", { name: "Test Lead", email: "test@example.com", website: "https://example.com", gdpr: true }, env.N8N_DEMO_ACCESS_URL],
    ["audit", { name: "Test Lead", email: "test@example.com", website: "https://example.com" }, env.N8N_WEBFORM_LEAD_URL],
    ["careers", { team: "Engineering", linkedin: "https://www.linkedin.com/in/test" }, env.N8N_CAREERS_URL],
    ["calculator", { email: "test@example.com" }, env.N8N_WEBFORM_LEAD_URL],
    ["growth", { email: "test@example.com" }, env.N8N_WEBFORM_LEAD_URL],
    ["brand_report", { email: "test@example.com", brand: "Test Brand" }, env.N8N_BRAND_REPORT_URL],
    ["study_download", { email: "test@example.com", study: "hoteles-mallorca" }, env.N8N_STUDY_DOWNLOAD_URL],
  ];

  try {
    for (const [type, payload, endpoint] of cases) {
      const response = await worker.fetch(request({ type, payload }), env);
      assert.equal(response.status, 200, `${type} should be accepted`);
      assert.equal(forwarded.at(-1), endpoint, `${type} should use its configured relay`);
    }
    assert.equal(forwarded.length, cases.length);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("accepts a minimal brand report: a brand and a work email", async () => {
  const originalFetch = globalThis.fetch;
  let forwarded;
  globalThis.fetch = async (url, options) => {
    forwarded = { url: String(url), options };
    return new Response(null, { status: 204 });
  };

  const payload = { email: "cmo@example.com", brand: "Example" };
  try {
    const response = await worker.fetch(
      request({ type: "brand_report", payload }),
      { ...baseEnv, N8N_BRAND_REPORT_URL: "https://automation.invalid/brand-report" },
    );
    assert.equal(response.status, 200);
    assert.equal(forwarded.url, "https://automation.invalid/brand-report");
    assert.deepEqual(JSON.parse(forwarded.options.body), payload);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("a brand report needs neither name nor website", async () => {
  const originalFetch = globalThis.fetch;
  let forwarded = 0;
  globalThis.fetch = async () => {
    forwarded += 1;
    return new Response(null, { status: 204 });
  };
  try {
    const response = await worker.fetch(
      request({
        type: "brand_report",
        payload: {
          email: "cmo@example.com",
          brand: "Example",
          sector: "Retail",
          category: "Running shoes",
          country: "Spain",
          competitors: "Alpha, Beta, Gamma",
          language: "es",
          marketing_consent: true,
        },
      }),
      { ...baseEnv, N8N_BRAND_REPORT_URL: "https://automation.invalid/brand-report" },
    );
    assert.equal(response.status, 200);
    assert.equal(forwarded, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("rejects brand reports that fail their own field rules", async () => {
  const originalFetch = globalThis.fetch;
  let forwarded = 0;
  globalThis.fetch = async () => {
    forwarded += 1;
    return new Response(null, { status: 204 });
  };

  const env = {
    ...baseEnv,
    N8N_BRAND_REPORT_URL: "https://automation.invalid/brand-report",
  };
  const cases = [
    ["a personal email domain", { email: "someone@gmail.com", brand: "Example" }],
    // The list used to stop at the .com of each provider, so the addresses a
    // Spanish or European visitor actually types went straight through.
    ["a Microsoft country domain", { email: "someone@hotmail.es", brand: "Example" }],
    ["a Microsoft UK domain", { email: "someone@live.co.uk", brand: "Example" }],
    ["a Yahoo country domain", { email: "someone@yahoo.fr", brand: "Example" }],
    ["a Spanish telco address", { email: "someone@telefonica.net", brand: "Example" }],
    ["a German free provider", { email: "someone@web.de", brand: "Example" }],
    ["an Italian free provider", { email: "someone@libero.it", brand: "Example" }],
    ["a throwaway inbox", { email: "someone@yopmail.com", brand: "Example" }],
    ["a ten-minute inbox", { email: "someone@10minutemail.com", brand: "Example" }],
    ["a domain in a different case", { email: "Someone@Hotmail.CO.UK", brand: "Example" }],
    ["a missing email", { brand: "Example" }],
    ["an empty brand", { email: "cmo@example.com", brand: "   " }],
    ["a missing brand", { email: "cmo@example.com" }],
    ["a brand over 120 characters", { email: "cmo@example.com", brand: "B".repeat(121) }],
    ["a language outside en/es", { email: "cmo@example.com", brand: "Example", language: "fr" }],
    ["a sector over 120 characters", { email: "cmo@example.com", brand: "Example", sector: "S".repeat(121) }],
    ["a competitors list over 200 characters", { email: "cmo@example.com", brand: "Example", competitors: "C".repeat(201) }],
    // Consent must be an explicit boolean. A string "false" is truthy downstream.
    ["a marketing consent that is not a boolean", { email: "cmo@example.com", brand: "Example", marketing_consent: "false" }],
  ];

  try {
    for (const [label, payload] of cases) {
      const response = await worker.fetch(
        request({ type: "brand_report", payload }),
        env,
      );
      assert.equal(response.status, 400, `${label} should be rejected`);
      assert.deepEqual(await response.json(), { ok: false, error: "invalid_fields" });
    }
    assert.equal(forwarded, 0, "no rejected brand report should reach n8n");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("a study download accepts a personal address and forwards only the slug", async () => {
  const originalFetch = globalThis.fetch;
  let forwarded;
  globalThis.fetch = async (url, options) => {
    forwarded = { url: String(url), options };
    return new Response(null, { status: 204 });
  };
  const payload = { email: "someone@gmail.com", study: "hoteles-mallorca", marketing_consent: false };
  try {
    const response = await worker.fetch(
      request({ type: "study_download", payload }),
      { ...baseEnv, N8N_STUDY_DOWNLOAD_URL: "https://automation.invalid/study-download" },
    );
    assert.equal(response.status, 200);
    assert.equal(forwarded.url, "https://automation.invalid/study-download");
    assert.deepEqual(JSON.parse(forwarded.options.body), payload);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("a study download refuses anything that is not a plain slug", async () => {
  const originalFetch = globalThis.fetch;
  let forwarded = 0;
  globalThis.fetch = async () => {
    forwarded += 1;
    return new Response(null, { status: 204 });
  };
  const env = { ...baseEnv, N8N_STUDY_DOWNLOAD_URL: "https://automation.invalid/study-download" };
  try {
    for (const study of ["", "https://evil.example/x.pdf", "../etc", "Hoteles Mallorca", 42]) {
      const response = await worker.fetch(
        request({ type: "study_download", payload: { email: "a@example.com", study } }),
        env,
      );
      assert.equal(response.status, 400, `study ${JSON.stringify(study)} should be refused`);
    }
    const badConsent = await worker.fetch(
      request({ type: "study_download", payload: { email: "a@example.com", study: "hoteles-mallorca", marketing_consent: "yes" } }),
      env,
    );
    assert.equal(badConsent.status, 400);
    assert.equal(forwarded, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
