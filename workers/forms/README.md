# Sealmetrics forms proxy

First-party Cloudflare Worker for the static marketing website. Browsers submit
to `/api/forms`; the Worker validates the request and forwards the existing
payload to n8n without exposing n8n webhook URLs in the frontend or in Git.

## Runtime configuration

The following values must be stored with `wrangler secret put` and must never
be committed:

- `N8N_WEBFORM_LEAD_URL`
- `N8N_DEMO_ACCESS_URL`
- `N8N_CAREERS_URL`
- `N8N_BRAND_REPORT_URL`
- `N8N_STUDY_DOWNLOAD_URL`
- `TURNSTILE_SECRET`
- `ENROUTIA_BRAND_CHECK_TOKEN`

`N8N_BRAND_REPORT_URL` points at the `sm-brand-report` webhook in n8n, the flow
behind the "what AI says about your brand" report form.

`ENROUTIA_BRAND_CHECK_TOKEN` is the Enroutia `pat_` key (scope `inference`)
that pays for "what do AIs say about…?" checks. Set it with
`npx wrangler secret put ENROUTIA_BRAND_CHECK_TOKEN`. Without it,
`POST /api/brand-check` answers 503 `unavailable`; the public reads keep working,
anonymously and limited per IP by Enroutia.

`ALLOWED_ORIGINS`, `TURNSTILE_HOSTNAMES`, `TURNSTILE_ACTION`, and
`REQUIRE_TURNSTILE` and `ENROUTIA_API_BASE` are non-secret settings in `wrangler.jsonc`. Turnstile is
required on every production lead flow. Origin validation and Cloudflare rate
limiting are also active.

The deployed endpoint is:

`https://sealmetrics-forms.sealmetrics-forms-worker.workers.dev/api/forms`

It is first-party application infrastructure in the sense that the browser
never sees or calls n8n, although the temporary public hostname is under
`workers.dev`. `forms.sealmetrics.com` cannot be attached while the
`sealmetrics.com` DNS zone remains at GoDaddy rather than in this Cloudflare
account.

## Brand check (`/api/brand-check`)

The page at `/que-dicen-las-ia/` and `/what-ai-says/` talks only to this
Worker; the Enroutia token never reaches the browser.

- `POST /api/brand-check` with JSON
  `{brand, language, country?, turnstileToken, company_fax?}`. `brand` is
  1–120 characters and must not be an email or URL; `language` is `es` or `en`;
  `country` is optional, at most 60 characters. Same protections as
  `/api/forms` (allowed origin, `FORM_RATE_LIMITER`, JSON, honeypot,
  Turnstile). Forwarded to `POST ${ENROUTIA_API_BASE}/api/brand-checks` with
  the bearer token, 15 s timeout. Enroutia's 200/202 body is returned as is;
  429 becomes 429 `quota`; 400/422 become 400 `invalid_fields`; anything else
  (401/402/403/409/5xx/timeout, or a missing token) becomes 503 `unavailable`.
  Upstream error bodies are never relayed.
- `GET /api/brand-check?brand=…&language=…` or `GET /api/brand-check?id=<uuid>`
  proxies Enroutia's public read (`/api/brand-checks/public…`). No Turnstile,
  its own limiter (`BRAND_CHECK_READ_LIMITER`, 120/60 s per IP, enough for a
  two-brand comparison polling every 2 s). When `ENROUTIA_BRAND_CHECK_TOKEN` is
  set it is sent as a bearer token, so Enroutia rate-limits per project rather
  than per IP (every visitor shares the Worker's IP); without it the read still
  works anonymously. The token is never returned to the browser. A foreign
  `Origin` is refused; no `Origin` (a shared link opened directly) is allowed.
  200 and 404 are relayed with Enroutia's `Cache-Control`; 429 stays 429;
  anything else becomes 503 `unavailable`.

## Deployment sequence

1. Run `npm ci` and `npm test` in this directory.
2. Confirm the target Cloudflare account with `npx wrangler whoami`.
3. Configure the six secrets above.
4. Deploy to the generated `workers.dev` hostname and run synthetic tests.
5. Point the static forms at the deployed endpoint above.
6. Confirm the Turnstile widget allows only `sealmetrics.com` and
   `www.sealmetrics.com`, then keep `REQUIRE_TURNSTILE` set to `true`.
7. Confirm all seven flows reach the expected mailbox before merging to `main`.
8. Rotate the n8n webhook paths that were previously present in frontend code.

If the DNS zone is moved to this Cloudflare account later, add
`forms.sealmetrics.com` as a Worker custom domain, update
`NEXT_PUBLIC_FORMS_ENDPOINT` and the CSP allowlist, rebuild, test all flows,
and only then retire the `workers.dev` endpoint.

Do not enable `ALLOW_INSECURE_TESTING` outside the automated unit tests.
