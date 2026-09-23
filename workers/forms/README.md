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

`N8N_BRAND_REPORT_URL` points at the `sm-brand-report` webhook in n8n, the flow
behind the "what AI says about your brand" report form.

`ALLOWED_ORIGINS`, `TURNSTILE_HOSTNAMES`, `TURNSTILE_ACTION`, and
`REQUIRE_TURNSTILE` are non-secret settings in `wrangler.jsonc`. Turnstile is
required on every production lead flow. Origin validation and Cloudflare rate
limiting are also active.

The deployed endpoint is:

`https://sealmetrics-forms.sealmetrics-forms-worker.workers.dev/api/forms`

It is first-party application infrastructure in the sense that the browser
never sees or calls n8n, although the temporary public hostname is under
`workers.dev`. `forms.sealmetrics.com` cannot be attached while the
`sealmetrics.com` DNS zone remains at GoDaddy rather than in this Cloudflare
account.

## Deployment sequence

1. Run `npm ci` and `npm test` in this directory.
2. Confirm the target Cloudflare account with `npx wrangler whoami`.
3. Configure the five secrets above.
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
