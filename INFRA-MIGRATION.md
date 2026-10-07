# Infra Migration — SealMetrics Marketing Site

**Status:** Decision pending. Recommendation locked. DNS-flip window TBD.
**Date:** 1 June 2026
**Owner:** Rafa
**Companion:** `PRD-CONTENT-STRATEGY.md` §15b, `SEO-STRATEGY.md` v2.1 §4 W4

---

## Why this exists

The May 2026 SEO audit surfaced two infrastructure blockers GitHub Pages cannot solve from the repo:

- `Cache-Control` on `/_next/static/*` fixed at `max-age=600` by the GitHub-Pages CDN (Fastly, not under our control).
- Security headers (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, CSP) cannot be set from a static-export repo on GitHub Pages.

Combined impact: ~1.3s mobile LCP unrecoverable, full security-header credibility gap for a privacy-positioned vendor. Both blockers map directly to revenue: LCP affects rankings + bounce; missing security headers fail the DPO checklists buyers run before procurement.

---

## Recommendation

**Migrate the marketing site to Vercel.**

Why: headers and cache config live in `vercel.json` (in-repo, code-reviewed, reverts cleanly). Sole DNS change is the apex + `www` of `sealmetrics.com`. Pixel-pre / api / app / MX / SPF / TXT untouched. Preview URLs per PR unlock content QA before publish. Pricing under the Pro plan ($20/seat/mo) covers expected traffic and one teammate.

---

## Alternatives considered

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| **Vercel** | First-class Next.js. `vercel.json` headers/cache in-repo. Preview deploys per PR. Zero impact on pixel-pre/api/app DNS. Edge network EU-aware. | $20/seat/mo. Vercel-owned analytics tempting but redundant with SealMetrics. | **Recommended.** |
| **Netlify** | Similar feature set. Headers via `netlify.toml` or `_headers`. Same DNS scope. | Slightly behind on Next 16 support. No equivalent to Vercel's per-PR preview cookie/auth ergonomics. | Strong runner-up. |
| **Cloudflare Pages** | EU-hosted edge. Free tier viable. Same DNS scope. | Build-time limits at scale. Less mature Next 16 adapter. Would also pull DNS into Cloudflare (bigger blast radius). | Defer. |
| **Cloudflare in front of GitHub Pages** | No site move. Headers + cache via Cloudflare workers/page rules. | Pulls DNS into Cloudflare — touches `pixel-pre`, `api`, `app`, MX zone if we transfer NS. Operational complexity. Worker per-request cost at scale. | Reject — biggest blast radius for the same outcome. |

---

## Current DNS topology (snapshot 1 Jun 2026, matches PRD §15b)

| Record | Value | Provider | Touched by migration? |
|---|---|---|---|
| Nameservers | `pdns05.domaincontrol.com`, `pdns06.domaincontrol.com` | GoDaddy DNS | No |
| `sealmetrics.com` A | `185.199.108.153` | GitHub Pages | **YES — flip to Vercel** |
| `www.sealmetrics.com` CNAME | `rafa-sealmetrics.github.io` → 185.199.108-111.153 | GitHub Pages | **YES — flip to `cname.vercel-dns.com`** |
| `pixel-pre.sealmetrics.com` A | `91.242.131.41` | Bare-metal pixel host | No |
| `api.sealmetrics.com` A | `91.242.131.42` | Bare-metal API host (same network as pixel) | No |
| `app.sealmetrics.com` A | `45.148.1.221` | App host (separate network) | No |
| MX | `aspmx.l.google.com` + 4 backup | Google Workspace | No |
| TXT (SPF) | `v=spf1 include:dc-aa8e722993._spfm.sealmetrics.com include:resend.com ~all` | — | No |
| TXT (mailerlite) | `mailerlite-domain-verification=…` | MailerLite | No |
| TXT (google site verification) | `google-site-verification=-pZCOqo0w8IkFUedUKx3jfOYFT-V6-VJ6zm4FD4-O68` | Google Search Console | No |

**Two records change. Twelve records do not.** This is the smallest possible DNS surface for getting the headers/cache fix.

---

## Pre-flip checklist (locked from PRD §15b)

1. **Vercel account + project provisioned.** Connect to GitHub repo. Verify `out/` directory output works (current `next.config.ts` already exports static). DONE pre-flip: `vercel.json` drafted in-repo for review (1 Jun).
   - **CSP audit + correction — 31 Jul 2026.** The drafted CSP was checked against every origin the site actually loads a subresource from. Four were missing; all four are now allowlisted. Had the policy been promoted to enforcing as drafted, it would have blocked the analytics pixel, the entire lead-capture funnel and every video embed. See "CSP origin inventory" below.
2. **Run side-by-side on a Vercel preview domain** (e.g., `sealmetrics-preview.vercel.app`). Smoke-test homepage, `/pricing`, `/vs-ga4`, `/blog/[any]`, `/glossary/[any]`, `/open/[any]`, `/case-studies/palladium-hotel-group`, `/demo`. Confirm headers + cache via curl. Confirm CSP-Report-Only emits no console errors on production-equivalent pages.
   - Smoke-test the four corrected origins explicitly, since a Report-Only violation is easy to miss in a console: `/demo` and `/demo-access` (n8n webhook), `/free-audit` (pixel-auditor), `/videos` and `/demo/thank-you` (mediadelivery iframe), and any page (pixel `t.js` loads). Each must produce **zero** `report-only` violations before step 7.
3. **Lower TTL on apex + www to 300 seconds** one week before the flip. GoDaddy DNS panel. Verify with `dig sealmetrics.com A` showing new TTL.
4. **Pick maintenance window**: Saturday morning EU time (06:00 CET), Q3 2026. Lowest paid-media activity, lowest organic Saturday traffic.
5. **Flip the two records** (apex A → Vercel IP `76.76.21.21`; `www` CNAME → `cname.vercel-dns.com`). Document the previous values for instant rollback.
6. **Monitor for 24 hours post-flip**:
   - `pixel-pre.sealmetrics.com` ingest rate — should be unchanged (different subdomain).
   - `api.sealmetrics.com` health — should be unchanged.
   - `app.sealmetrics.com` health — should be unchanged.
   - Google Workspace email delivery — should be unchanged (MX untouched).
   - GSC index coverage on the marketing site — should rise as Vercel cache headers improve crawl efficiency.
   - Lighthouse mobile score on three pillar pages — expected +~1.3s LCP improvement.
7. **Promote CSP-Report-Only to enforcing** after 7 days of clean telemetry. Edit `vercel.json` header key.
8. **Restore apex + www TTL to 3600s** after 48h of stability.

---

## CSP origin inventory (audited 31 Jul 2026)

Every origin the site loads a **subresource** from, and the directive that must cover it. Editorial links in copy (eur-lex, cnil.fr, matomo.org, cal.com…) are navigations, not subresources, and need no directive — the same is true of the `.mcpb` download on `/install`, which is an `<a download>`.

| Origin | Directive | Used by | Status before audit |
|---|---|---|---|
| `pixel-pre.sealmetrics.com` | `script-src` | `lib/analytics.ts` injects `t.js` | **MISSING** — was only in `connect-src`, which governs fetch/XHR, not script loading |
| `n8n.sealmetrics.com` | `connect-src` | `/demo`, `/demo-access` (EN+ES), data-loss calculator, audit form | **MISSING** |
| `pixel-auditor.sealmetrics.net` | `connect-src` | `/free-audit` via `NEXT_PUBLIC_PIXEL_AUDITOR_API` (note: `.net`, not `.com`) | **MISSING** |
| `iframe.mediadelivery.net` | `frame-src` | `/videos`, `/demo/thank-you` (EN+ES) | **MISSING** |
| `challenges.cloudflare.com` | `script-src`, `connect-src`, `frame-src` | Turnstile on forms | present |
| `api.sealmetrics.com` | `connect-src` | audit endpoint | present |

`form-action 'self'` is correct as drafted: every form submits via `onSubmit` + `fetch()`, so no native cross-origin form post exists. The `www.youtube.com` entries in `frame-src` are unused today (YouTube appears only as a `sameAs` in `lib/schema.ts`) and are left in place as harmless headroom.

**This inventory is enforced by `scripts/audit-csp.mjs`**, wired into `postbuild` alongside the `llms.txt` drift gate. `npm run build` fails if the source loads a subresource from an origin that is not allowlisted under the matching directive, naming the file, the line and the directive it belongs in. Run it standalone with `node scripts/audit-csp.mjs` — it reads source, so it needs no build.

The gate was verified against all four bugs above: removing any one of them from `vercel.json` fails the build and names the correct directive. It also catches a newly introduced origin, which is the case that actually matters going forward — the four bugs are already fixed, but the fifth one has not been written yet.

It resolves origins through module-level consts, template literals and `process.env` values read from `.env.production`, because the two origins that were actually broken (`pixel-pre` via `SEALMETRICS_PIXEL_HOST`, `pixel-auditor` via `API_BASE`) are both reached that way. A first cut that only matched literal URLs passed cleanly against the broken policy — worth remembering before trusting any future version of this check.

What it deliberately does not check: `img-src` (allowlisted as `https:`, so anything passes) and plain navigations — an `<a href>` or `<a download>` to another origin is not a subresource. Origins loaded by a dependency rather than our own source (Turnstile) or injected via env vars are listed in the script's `KEEP` map, each with a stated reason.

---

## Verified production header state (31 Jul 2026, GitHub Pages)

Measured with `curl -sI https://sealmetrics.com/`:

```
server: GitHub.com · via: 1.1 varnish
cache-control: max-age=600          ← including /_next/static/*.js, which are content-hashed and immutable
```

**Zero security headers are served.** No HSTS, no `X-Frame-Options`, no `X-Content-Type-Options`, no `Referrer-Policy`, no `Permissions-Policy`, no CSP. Everything in `vercel.json` is inert until the flip — the file is a staged artifact, not live config. This is the concrete evidence behind the "security-header credibility gap" named at the top of this doc.

---

## Risk register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| DNS misconfiguration flips wrong subdomain | Low | Catastrophic (pixel offline) | GoDaddy panel changes apex/www only. Both changes recorded with prior values. NS not touched. |
| CSP breaks an interactive feature | ~~Medium~~ **Was certain** | ~~Console errors, minor degradation~~ **Severe: analytics + lead capture + video all dead** | Impact was understated until the 31 Jul origin audit. The drafted policy omitted four origins the site loads from, so promoting it to enforcing would not have degraded a feature — it would have silently killed the pixel, every lead form and every video embed. Origins now allowlisted; step 2 smoke-tests each one. `Report-Only` for the first 7 days still applies as the backstop. |
| Vercel build differs from local `next build` | Low | Preview catches it | Side-by-side preview deploy validated before flip. |
| Email deliverability impact | Very low | High | MX, SPF, DKIM, DMARC are all on other records or other subdomains. Untouched by the apex A flip. |
| Vercel rate-limit / cost spike | Low | Cost | Pro plan covers ~1TB bandwidth/mo. Current marketing-site bandwidth well under. Set up usage alerting. |
| `pixel-pre` DNS resolver cache stale post-flip | Very low | Pixel data loss <5 min for some resolvers | Pixel uses its own subdomain — apex flip doesn't affect its A record at all. |

---

## What's in `vercel.json` today (drafted 1 Jun 2026)

Headers (apply to all paths):
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=(), usb=(), interest-cohort=()`
- `Content-Security-Policy-Report-Only` — broad allowlist for `self`, Turnstile (`challenges.cloudflare.com`), YouTube embeds, SealMetrics endpoints (`pixel-pre.sealmetrics.com`, `api.sealmetrics.com`)

Cache rules:
- `/_next/static/*` — `public, max-age=31536000, immutable`
- `/og/*`, `/logos/*`, and any `.png/.jpg/.webp/.avif/.svg/.ico/.woff2` — same 1y immutable
- `/sitemap.xml`, `/robots.txt`, `/llms.txt` — `public, max-age=3600`

`outputDirectory: "out"` and `trailingSlash: true` match `next.config.ts`. `cleanUrls: true` removes the `.html` suffix exposure.

---

## Open questions

1. **Maintenance window date.** Q3 2026 — pick a specific Saturday once the W4 decision is signed off.
2. **Vercel plan tier.** Pro ($20/seat/mo) is enough for now. Reassess at >100k sessions/mo.
3. **Analytics provider on Vercel.** Skip — would conflict with the "SealMetrics measures SealMetrics" principle. Set Vercel Analytics to off explicitly.
4. **Preview deploy domain.** Use a non-indexed subdomain (e.g., `staging-sealmetrics.vercel.app` with `robots: noindex` middleware) to avoid double indexing.
5. **CSP escalation timeline.** 7 days Report-Only → promote, vs. 14 days. Recommend 7 if telemetry is clean.

---

## What this document is not

- A go signal. The flip needs explicit owner approval and a scheduled window.
- A Cloudflare-in-front-of-GHPages plan. That option is rejected above.
- DNS work. No record has been changed.

---

## Decision needed by 30 Jun 2026

1. **Approve host pick (Vercel).** Y/N.
2. **Approve `vercel.json` draft.** Review the in-repo file. Y/N.
3. **Schedule the flip window.** Pick a Saturday in Q3 2026.

Once 1–3 are signed off, the work moves to "execution" status and the pre-flip checklist drives.
