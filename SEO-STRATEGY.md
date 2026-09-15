# SEO Strategy — SealMetrics Marketing Website

**Version:** 2.2
**Date:** 7 July 2026 (v2.1 body unchanged; adds §9b GEO prompt playbook after the July SOV audit + content batch)
**Supersedes:** v1.0 (28 Feb 2026), v2.0 (1 Jun 2026 morning), v2.1 (1 Jun 2026)
**Companion docs:** `PRD-CONTENT-STRATEGY.md` (May 2026 — 12-month roadmap, partially stale post-May audit; see §0), `CLAUDE.md`, `.seo-audit/` (May 2026)

---

## 0. What changed since v1 (Feb 2026)

- **Positioning** shifted from "cookieless" to **"complete data for eCommerce"** (March 2026). Three message pillars: 70% complete data, 20% investment decisions, 10% compliance.
- **Pillars** went from 4 → 7. Three new positioning pillars now live: `/complete-data`, `/cookieless-analytics`, `/consentless-analytics`.
- **Banned claims:** multi-touch attribution, session reconstruction, customer journeys, individual user tracking. SealMetrics is **last-click on 100% of data** and aggregate/anonymous event measurement only. See `feedback_banned_claims.md`.
- **Competitive set** clarified: GA360, Adobe Analytics, Piwik PRO, GA4. **Never** compare with Plausible/Fathom/Simple/Umami/Cabin/Mixpanel/Amplitude (different category, commoditises us).
- **Three new clusters** opened: `/gdpr-analytics/[country]`, `/platforms/[stack]`, `/use-cases/[task]`.
- **/open** transparency hub launched (4 of 11 chapters live).
- **Case studies de-anonymized:** Palladium Hotel Group named (Toni Andújar, 40%/35%/+165% from April 2026 PDF).

## 0b. What changed since v2.0 (same-day revision, 1 Jun 2026)

A 1 Jun verification pass against the codebase surfaced that several items the v2.0 plan and the May PRD-CONTENT-STRATEGY had scheduled for Q3 work were **already shipped post-audit**. The plan was carrying stale assumptions. Corrections:

- **`/vs/*` gold-standard rewrites are DONE.** `VsComparisonV3` + `VsData.tsx` were both filled in post-audit. All 4 sibling pages (`/vs/ga360`, `/vs/adobe-analytics`, `/vs/piwik-pro`, `/vs/matomo`) now render the same 9 sections as `/vs-ga4`: Hero + Byline + TLDR + Gap Stats + Comparison Table + FAQ + Palladium case study + Final CTA + Methodology. Audit M7 finding closed. Only remaining delta: sibling pages carry 4 FAQs vs `/vs-ga4`'s 7 — material polish, not a structural gap.
- **QuickAnswer retrofits are DONE.** All 4 audit-flagged glossary terms (CMP, FPD, ITP, server-side-tracking) carry QuickAnswer blocks. Established convention is QuickAnswer-at-bottom across every glossary term — not "lead with" as v2.0 §9 implied. v2.0 spec line corrected.
- **`/vs/*` `criteria[]` schema is DONE** (shipped 1 Jun 2026 morning). Audit Schema MED-3 closed.
- **`llms.txt` is DONE** (shipped 1 Jun 2026 morning). 7 pillars, 5 clusters, 20 glossary terms, 27 blog posts, banned-claim disclosure.
- **PRD-CONTENT-STRATEGY.md is partially stale.** §4.2 ("vs/* scaffold rewrites P1") and §10 ("retrofit 4 glossary QuickAnswers") describe completed work. Next PRD pass should mark these done and re-pick Q3 priorities. Same applies to audit `.seo-audit/ACTION-PLAN.md` items M7 and H7.

What's still **genuinely open** (verified 1 Jun against the codebase) and now drives the June W2–W4 plan in §4:

- Homepage `FAQPage` schema (CRIT-1, policy violation since Aug 2023)
- Homepage Dreamplace quote attribution anonymous (L5) — case study already names Eduardo Martin
- Anonymous DTC card on `/case-studies/` index with no detail page (HIGH-3, L5)
- `Organization` schema missing `legalName`, `numberOfEmployees`, `vatID` (MED-1)
- `/open` metadata claims "Eleven chapters" but only 4 are published (L7)
- Price contradiction across `SoftwareApplication.offers` (€599/€1079 monthly) vs `Product.offers` (€499/€899 annual) (HIGH-1)
- Trailing-slash inconsistency in self-referential `url` properties (CRIT-3)
- Vercel infra-migration decision blocking Q3 §15b — needs host pick by 30 Jun

---

## 1. Positioning (canonical messaging)

SealMetrics is **complete-data analytics for eCommerce** — captures 100% of traffic and 100% of revenue events, attributes last-click on the full dataset, EU-hosted in Dublin, GDPR by architecture. Competes with GA360 and Adobe Analytics at a fraction of the price; replaces the 13% of data GA4 reports in the EU.

Entity definition (must appear consistently on home, /product, /about, llms.txt, Organization JSON-LD):

> "SealMetrics is a cookieless, consentless web analytics platform for eCommerce that captures 100% of traffic and attributes revenue using last-click on the full dataset. GDPR-compliant by architecture, hosted exclusively in the EU."

---

## 2. Topic clusters (current state)

Seven pillars. Spokes link up to pillars; pillars push to `/demo`. Spokes never link directly to `/demo`.

### Pillar — `/complete-data` (positioning head term)
- Spokes (live): `/blog/why-ga4-shows-13pct-eu-traffic`, `/blog/ga4-data-sampling-problem`, `/blog/what-is-data-loss-in-analytics`, `/blog/analytics-scripts-costing-you-sales`, `/data-loss-calculator`, `/growth-calculator`
- Cross-links to: `/vs-ga4`, `/product`, `/demo`

### Pillar — `/cookieless-analytics`
- Spokes (live): `/blog/cookieless-analytics-explained`, `/blog/cookieless-analytics-for-ecommerce`, `/blog/cookieless-analytics-for-hotels`, `/blog/cookieless-analytics-for-saas`, `/blog/consentless-analytics-for-dtc`, `/blog/what-is-cookieless-tracking`, `/glossary/cookieless-analytics`
- Cross-links to: `/how-it-works`, `/product`, `/vs-ga4`, `/demo`

### Pillar — `/consentless-analytics`
- Spokes (live): `/blog/gdpr-analytics-without-consent`, `/blog/consent-banner-impact-on-analytics`, `/blog/cnil-self-assessment-published`, `/blog/uk-pecr-analytics-exemption`, `/blog/eu-digital-omnibus-cookie-banners-analytics`, `/blog/eu-digital-omnibus-marketer-guide-2026`, `/gdpr-analytics/france`, `/gdpr-analytics/germany`, `/gdpr-analytics/spain`
- Cross-links to: `/security`, `/glossary/gdpr-analytics-compliance`, `/glossary/eprivacy-directive`, `/demo`

### Pillar — `/product`
- Spokes: `/features`, `/integrations`, `/changelog`, all `/for/*`, all `/vs/*`
- Cross-links to: `/how-it-works`, `/demo`, `/pricing`

### Pillar — `/how-it-works`
- Spokes: `/glossary/server-side-tracking`, `/glossary/first-party-data-collection`, `/glossary/intelligent-tracking-prevention`, `/blog/analytics-tools-*` measurement series
- Cross-links to: `/product`, `/security`, `/demo`

### Pillar — `/security`
- Spokes: `/dpa`, `/privacy`, `/terms`, `/glossary/analytics-data-residency`, `/glossary/gdpr-analytics-compliance`, `/for/dpo`
- Cross-links to: `/consentless-analytics`, `/demo`

### Pillar — `/pricing`
- Spokes: `/pricing-plans`, `/free-audit`, `/audit`
- Cross-links to: `/vs/ga360`, `/vs/adobe-analytics`, `/product`, `/demo`

### Comparison cluster — pillar `/vs-ga4` (note: canonical stays `/vs-ga4`, NOT `/vs/ga4`)
- `/vs-ga4` (gold-standard, pillar)
- `/vs/ga360` (P1 — gold-standard rewrite owed)
- `/vs/adobe-analytics` (P1 — gold-standard rewrite owed)
- `/vs/piwik-pro` (P1 — gold-standard rewrite owed)
- `/vs/matomo` (P1 — gold-standard rewrite owed)
- `/alternatives/google-analytics` (alt-intent capture)
- All `/vs/*` cross-link via "Other comparisons" footer

**URL note:** v1 of this doc and the May PRD both proposed moving `/vs-ga4` → `/vs/ga4`. Implementation went the other way — `/vs/ga4` now 301-redirects to `/vs-ga4`. Treat `/vs-ga4` as the canonical pillar URL. Update PRD §4.1 to match.

---

## 3. Current inventory (1 June 2026)

| Cluster | Pages live | Q3 target | Status |
|---|---:|---:|---|
| Pillars | 7 | 7 | DONE |
| `/vs/*` (incl. `/vs-ga4`) | 5 | 5 (depth, not count) | **DONE** — all 5 emit populated `criteria[]`, all 5 render TLDR/byline/case study/methodology via `VsComparisonV3`. Optional polish: 4→6/7 FAQs on siblings. |
| `/for/*` | 11 | 11 | Depth uneven — see §6 |
| `/platforms/*` | 2 (Shopify, WooCommerce) + hub | 3 | 1 to go (Magento or headless) |
| `/gdpr-analytics/*` | 3 (FR, DE, ES) | 3 (Q3) → 4 (+IT, July) | On track |
| `/use-cases/*` | 3 (rev-attribution, conversion-tracking, ga4-migration) | 3 | DONE |
| `/case-studies/*` | 3 (all hotels) | 5 | 2 to go (DTC + marketplace) — July W1–W2 |
| Glossary | 20 | 25 | 5 to go — July W4 + August W2 |
| Blog | 27 | 35 | 8 to go |
| `/open` chapters published | 4 of 11 | 8 of 11 | 4 to go |
| Tools | 5 | 5 | DONE |

**Indexed URLs (EN-only):** ~75 today → ~100 by end Q3.

---

## 4. 90-day plan (1 Jun – 31 Aug 2026)

Focused tactical roadmap, sequenced by SEO leverage. Each item maps to a `/command` in `.claude/commands/`.

### June — schema hygiene + attribution + infra prep

**Why now:** v2.0 scheduled `/vs/*` gold-standard rewrites for W1–W4. Verified 1 Jun: that work has already shipped (see §0b). The remaining audit items that materially affect SEO and credibility — Google policy violation, named-customer credibility on the homepage, EU-vendor trust signals (legalName/vatID), and the Vercel migration prep blocking the Q3 infra fix — become June's real priorities.

- **W1 (Jun 1–7) — DONE same day:**
  - llms.txt rewrite (7 pillars + 5 clusters + 20 glossary + 27 blog + banned-claim disclosure)
  - `/vs/*` `criteria[]` schema population (EN + ES `/vs-ga4`; other 8 already had it)
  - SEO-STRATEGY refresh v1 → v2.1
  - QuickAnswer retrofit work verified already shipped post-audit

- **W2 (Jun 8–14) — schema CRIT/HIGH cleanup:**
  - **CRIT-1:** Remove `FAQPage` JSON-LD from homepage (`src/app/(en)/page.tsx` line 53). Policy violation since Google's Aug 2023 restriction to gov/health-authority sites only. Migrate the Q/A pairs to (a) a `WebPage.mainEntity` array of `Question` items on `/pricing` or `/security`, or (b) inline `<details>`/`<summary>` parsed by AIO without schema. → `/generate-schema /`
  - **HIGH-1:** Fix price contradiction between `softwareApplicationSchema()` offers (€599/€1079 monthly) and `pricingSchema()` (€499/€899 annual). Recommended: drop `offers[]` from `softwareApplicationSchema()` entirely; keep `Product`/`AggregateOffer` on `/pricing` only. Edit: `src/lib/schema.ts` lines 189–210.
  - **HIGH-3 / L5 part 1:** Resolve anonymous DTC coffee brand entry. Either (a) kill the third `cases[]` entry on `src/app/(en)/case-studies/page.tsx` line 39–46 until the DTC case ships, or (b) move it to `Quotation` only and remove from `ItemList`. Recommendation (a) — the July plan adds the named DTC case.
  - **L5 part 2:** Replace anonymous "Head of eCommerce · Hotel chain · Spain" homepage `quotationSchema` (`src/app/(en)/page.tsx` line 94–99) with named Eduardo Martin attribution — the Dreamplace case study already names him. Apply to ES homepage too.
  - Deliverable: zero Google policy-violation flags in Search Console; price schema internally consistent; named-customer attribution on homepage; broken phantom DTC entity removed.

- **W3 (Jun 15–21) — credibility + transparency polish:**
  - **MED-1:** Add `legalName`, `numberOfEmployees`, `vatID` to `organizationSchema()` (`src/lib/schema.ts` line 13). Verify actual Spanish VAT before merging. EU-vendor trust signal — non-trivial for DPO buyers.
  - **L7:** Fix `/open` metadata "Eleven chapters" claim. Two options: (a) soften to *"Eleven planned, four published"* in title/description/H1, or (b) demote to *"An open document on how we measure, comply and build SealMetrics."* Recommendation (a) — preserves the editorial ambition while matching reality. Edit `src/app/(en)/open/page.tsx` lines 16, 20, 37, 65.
  - **L6:** CTA-verb consolidation pass. Audit current CTAs ("Book a Demo", "Talk to the founder", "Run both for 30 days", "30-minute walkthrough") and pick one primary verb. Recommendation: **"Book a walkthrough"** (preserves the founder-led signal without "demo" overload). Audit: `grep` for CTA strings, swap 70% to the primary verb, keep situation-specific variants at 30%.
  - **Parallel:** /vs/* FAQ depth — bump sibling pages from 4 → 6 FAQs each, EN + ES (8 total). Lower-priority polish; do only if W2 finishes early.

- **W4 (Jun 22–28) — infra migration prep:**
  - Pick host: **Vercel** (recommended in PRD §15b), Netlify, CF Pages, or Cloudflare-in-front-of-GHPages. Decision document in repo. Deadline: 30 Jun. Blocks Q3 infra fix on Cache-Control + security headers.
  - DNS inventory snapshot (verify nothing has drifted since 2026-05-28 snapshot in PRD §15b). Confirm `pixel-pre.sealmetrics.com`, `api.sealmetrics.com`, `app.sealmetrics.com`, and Google Workspace MX records are isolated from apex/`www`.
  - Draft `vercel.json` (headers + cache rules) and review without deploying. Include HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, CSP, and `_next/static/*` cache TTL.
  - Pre-flip checklist locked: TTL reduction window, side-by-side preview domain, monitoring plan for `pixel-pre` ingest rate during DNS propagation.

**End-of-June deliverable check:** zero Google policy-violation flags; named attribution on homepage; price schema consistent; Organization schema EU-trust-complete; `/open` claim matches reality; host decision merged; `vercel.json` ready for Q3 W1 deploy window.

### July — case studies + 4 glossary terms + GDPR Italy

**Why now:** social proof is the biggest unblock for the comparison pages — `/vs/*` pages without a customer story under-convert. Hotels-only concentration is the audit's #1 conversion risk.

- **W1 (Jul 1–7):** `/case-studies/dtc-fashion` — DTC eCommerce case (named or specific revenue+region+delta vs GA4). One chart, one named quote. Links up to `/for/ecommerce` + `/vs-ga4`.
- **W2 (Jul 8–14):** `/case-studies/marketplace` — eCommerce marketplace case (same bar). Decision required by Jul 7: kill or build the audit-flagged third `/case-studies/` card. Recommendation: build the DTC card here.
- **W3 (Jul 15–21):** `/gdpr-analytics/italy` — Garante GA4-ban angle. Cites Garante guidance. Links up to `/consentless-analytics`. → `/generate-page gdpr-analytics/italy`
- **W4 (Jul 22–28):** 4 glossary terms — `attribution-window`, `last-click-attribution` (must say last-click on 100% data — banned to say multi-touch), `pixel-tracking`, `pseudonymization`. → `/generate-glossary [term]` x4

**Parallel (July):** rewire 6 existing cookieless blog posts as explicit spokes of `/cookieless-analytics` (first mention of "cookieless analytics" in body → link to pillar). → `/interlinking-audit cookieless-analytics`

### August — third platform + 4 more glossary + blog refresh

- **W1 (Aug 1–7):** `/platforms/magento` (or `/platforms/headless`, depending on Q3 sales pipeline signal). 1,200–1,800 words, install steps, dataLayer pattern.
- **W2 (Aug 8–14):** 4 glossary terms — `gdpr-article-6`, `schrems-ii`, `dpa-data-processing-agreement`, `consent-mode-v2`.
- **W3 (Aug 15–21):** `/blog` refresh — pick 4 oldest cookieless posts, add 2026 updates, add explicit pillar link, add QuickAnswer block at top for AI citation. → `/optimize-page blog/[slug]`
- **W4 (Aug 22–31):** Search-Console-driven audit — pull GSC data, identify 5 pages with high impressions + low CTR, rewrite title + description + H1. → `/seo-audit`

**End-of-Q3 deliverable check:**
- All Q3 P1 items from PRD §14 shipped.
- 5 `/vs/*` pages all gold-standard with populated comparison schema.
- 5 case studies live (3 hotels, 2 eCommerce).
- 24+ glossary terms (target 25).
- All 11 pillars/cluster heads cross-link via homepage nav or footer dropdown.

---

## 5. Interlinking law (updated)

Three changes from v1:

1. **Pillars are seven, not four.** Homepage links to all 7 in the "Why SealMetrics" nav dropdown.
2. **First mention of any pillar term in any spoke MUST link to the pillar.** Lint candidate: `scripts/check-interlinks.ts` (P2 in Q3).
3. **Comparison pages cross-link** via "Other comparisons" footer (enforce on all 5 `/vs/*`).

### By page type (delta from v1)

- **Homepage:** now links to 7 pillars (was 5). Drop direct links to comparisons except `/vs-ga4`.
- **Pillar pages:** must include 1-2 cross-pillar inline links (e.g., `/cookieless-analytics` body mentions consent → links `/consentless-analytics`).
- **Blog posts:** unchanged — never link directly to `/demo`. Flow is blog → pillar → demo.
- **Country pages (`/gdpr-analytics/*`):** link up to `/consentless-analytics`, sideways to sibling countries (3-up footer block), down to authority's actual guidance URL.
- **Platform pages (`/platforms/*`):** link up to `/cookieless-analytics`, sideways to sibling platforms, down to `/integrations`.
- **Use-case pages (`/use-cases/*`):** link up to whichever pillar matches the task, sideways to sibling use-cases, down to `/demo`.

---

## 6. Verticals (`/for/*`) — re-prioritise decision pending

Today: 11 verticals, depth uneven. Audit flagged thin scaffolds on Finance/Healthcare/Education.

**Decision required by 30 Jun 2026:** if no client signal in Finance/Healthcare/Education by end of Q3, consolidate into `/for/regulated-industries`. Pending sales input.

**Keep + deepen** (we sell here): eCommerce, Hotels, SaaS, Agencies, Media. Bar per page: 1,800 words, named quote, mini-case, GA4+CDP-combo comparison table, FAQ block, `/demo` CTA with vertical pre-filled.

**Roles:** CMO, CTO, DPO live. Consider `/for/cfo` (Q4 — strong budget-defence angle).

---

## 7. Keyword map (current state — supersedes v1 §5)

### High-intent (conversion-ready)

| Page | Primary keyword | Status |
|---|---|---|
| `/vs-ga4` | sealmetrics vs google analytics, ga4 alternative | LIVE — gold |
| `/vs/ga360` | sealmetrics vs ga360, ga360 alternative eu | LIVE — rewrite owed |
| `/vs/adobe-analytics` | adobe analytics alternative eu | LIVE — rewrite owed |
| `/vs/piwik-pro` | piwik pro alternative | LIVE — rewrite owed |
| `/vs/matomo` | matomo alternative managed | LIVE — rewrite owed |
| `/pricing` | enterprise analytics pricing, ga360 alternative cost | LIVE |
| `/use-cases/revenue-attribution` | last-click revenue attribution, cookieless attribution | LIVE |
| `/use-cases/conversion-tracking` | conversion tracking without cookies | LIVE |
| `/use-cases/ga4-migration` | ga4 alternative migration | LIVE |
| `/data-loss-calculator` | analytics data loss calculator | LIVE |

### Educational pillars + spokes

| Page | Primary keyword | Volume est. |
|---|---|---|
| `/complete-data` | 100% data capture analytics | 500–1K |
| `/cookieless-analytics` | cookieless analytics | 5K–10K |
| `/consentless-analytics` | consentless analytics, analytics without consent | 1K–2K |
| `/how-it-works` | cookieless analytics how it works | 500–1K |
| `/security` | gdpr web analytics | 1K–2K |
| `/platforms/shopify` | shopify cookieless analytics, shopify gdpr analytics | 500–1K |
| `/platforms/woocommerce` | woocommerce analytics gdpr | 500–1K |
| `/gdpr-analytics/france` | analytics sans consentement france, cnil analytics | 500–1K |
| `/gdpr-analytics/germany` | analytics ohne einwilligung | 500–1K |
| `/gdpr-analytics/spain` | analítica web sin consentimiento | 200–500 |

### Long-tail (glossary — 20 live, target 25 Q3, 40 Q4)

Live, all have target keywords assigned. Missing high-volume terms to add Q3–Q4: `attribution-window`, `last-click-attribution`, `cookieless-conversion`, `pixel-tracking`, `pseudonymization`, `dpa-data-processing-agreement`, `tpsr`, `gdpr-article-6`, `schrems-ii`, `standard-contractual-clauses`.

---

## 8. JSON-LD structured data (unchanged from v1 except)

| Page type | Schema | Notes |
|---|---|---|
| Homepage | `Organization` + `WebSite` | Entity definition must match §1 |
| Pillar pages | `WebPage` + `BreadcrumbList` | `/cookieless-analytics`, `/consentless-analytics`, `/complete-data` need this added if missing |
| `/vs/*` | `WebPage` + `ItemList` of comparison criteria | **DONE 2026-06-01** — all 5 EN + 5 ES `/vs/*` and `/alternatives/google-analytics` emit populated `criteria[]` via `comparisonPageSchema()` helper. Audit Schema High closed. |
| `/gdpr-analytics/*` | `WebPage` + `BreadcrumbList` + `FAQPage` | Cite authority guidance URL in `mentions` |
| `/platforms/*` | `WebPage` + `BreadcrumbList` + `HowTo` (install steps) | |
| `/use-cases/*` | `WebPage` + `BreadcrumbList` + `FAQPage` | |
| Case studies | `Article` + `Organization` | Palladium: cite Toni Andújar as author/subject |
| Glossary | `DefinedTerm` + `BreadcrumbList` | QuickAnswer block must precede definition |
| Pricing | `Product` + `Offer` per plan + `FAQPage` | |
| All pages | `BreadcrumbList` | |

---

## 9. LLM discoverability

### llms.txt

`/public/llms.txt` updated 2026-06-01: positioning paragraph aligned with v2 entity definition, three new pillars added to Pages, new sections for `/gdpr-analytics/*`, `/platforms/*`, `/use-cases/*`, `/open` cluster head, `/vs/matomo` added to Comparisons, glossary list expanded 15 → 20 terms with 5 missing terms added, blog list extended to 27 posts, explicit "SealMetrics does NOT do multi-touch, session-stitching, or customer-journey reconstruction" disclosure under Enterprise positioning.

Refreshed 2026-07-07 (GEO batch): added `/ai-analytics` + `/reg-gap-analysis` (EN+ES), legal-assessment + self-service blog posts, rebuilt Blog (ES) list (1 stale draft → 8 live posts), removed dead `/gdpr-analytics` hub line (URL has no page — only country sub-pages exist). → next refresh after July case-study + Italy country page work ships.

### Citation readiness

- Every glossary term must lead with a 40–60-word `QuickAnswer` block. Audit flagged 4 terms missing this — fix in June W1–W4 alongside `/vs/*` rewrites.
- Every FAQ answer must be self-contained (no "contact us" / "it depends").
- `/open` chapters are the authority engine for AI citation — continue publishing per `plan_open_editorial.md`.

---

## 9b. GEO prompt playbook — LLM share of voice (added 7 Jul 2026)

Operational playbook for the answer-engine SOV program: which prompts we track, which asset answers each one, how we measure, and what "winning" means. Drives the monthly GEO check. Source baseline: July 2026 SOV audit (external tracking run across Perplexity, OpenAI, Anthropic).

### Baseline — July 2026 audit

| Engine | SealMetrics SOV | Trend | Notes |
|---|---:|---|---|
| Perplexity | 16.7% | best engine | strongest citation surface; growth opportunity via privacy keywords |
| OpenAI (ChatGPT) | 10% | flat | cited domains for AI-analytics prompts: flowsery.com, bootstrap.build, zenovay.com |
| Anthropic (Claude) | 10% | flat | same gap as OpenAI |
| Tier 1 + Tier 2 prompts | **0%** | — | competitors strong, SealMetrics absent — the priority gap |
| Tier 5 prompts | — | **+8.3% delta** | niche long-tail growing; feed it micro-FAQs |

Competitor mention counts (all engines, July run): **Matomo 45** (top cited: `matomo.org/gdpr-analytics`, `matomo.org/cookie-consent-banners`) · **Plausible 23** (`plausible.io/blog/legal-assessment-gdpr-eprivacy` cited 3× by Perplexity) · **Umami + Fathom + Plausible combined 48** citations in Tier 3/5 · `posthog.com/blog/ga4-alternatives` generates recurring citations on GA4-alternative prompts · ES market: `trustedshops.es` article holds 2 mentions on "analítica RGPD" prompts — beatable.

### Tier definitions (working set)

- **Tier 1** — category head prompts ("best web analytics", "alternatives to Google Analytics"). Highest volume, hardest to enter.
- **Tier 2** — compliance-qualified prompts ("GDPR-compliant analytics", "analytics without cookie banner"). Our natural terrain.
- **Tier 3** — comparison/competitor prompts ("Matomo alternatives", "is GA4 legal in the EU").
- **Tier 4** — AI-analytics prompts ("AI analytics tools", "connect ChatGPT to analytics").
- **Tier 5** — niche long-tail ("CNIL-exempt analytics", "analytics RGPD para pequeños negocios").

### Prompt tracking list → target asset

Run each prompt monthly on Perplexity, ChatGPT (search on), and Claude. EN and ES where listed. A prompt is **won** when SealMetrics is named; **cited** when a sealmetrics.com URL appears as a source.

| # | Tier | Prompt (EN / ES) | Target asset | Status Jul 2026 |
|---|---|---|---|---|
| 1 | 1 | best GA4 alternatives for eCommerce / alternativas a Google Analytics | `/blog/ga4-alternatives-enterprise` (EN+ES) + `/alternatives/google-analytics` | shipped 7 Jul |
| 2 | 1 | best web analytics platforms 2026 | `/blog/best-enterprise-analytics-platforms` | live |
| 3 | 2 | GDPR-compliant analytics tools / herramientas de analítica RGPD | `/blog/gdpr-eprivacy-analytics-legal-assessment` (EN+ES) | shipped 7 Jul |
| 4 | 2 | web analytics without cookie banner / analítica web sin banner de cookies | `/blog/gdpr-analytics-without-consent` (EN+ES) + `/consentless-analytics` | live |
| 5 | 2 | privacy-first analytics for enterprise | `/blog/gdpr-eprivacy-analytics-legal-assessment` + `/cookieless-analytics` | shipped 7 Jul |
| 6 | 3 | Matomo alternatives / is Matomo GDPR compliant | `/vs/matomo` + legal-assessment post FAQ | live |
| 7 | 3 | is Google Analytics legal in the EU | `/blog/why-ga4-shows-13pct-eu-traffic` + legal-assessment post | live |
| 8 | 3 | Plausible alternatives for eCommerce | legal-assessment post ("different category" framing — **no /vs/plausible page, ever**) | shipped 7 Jul |
| 9 | 4 | AI analytics tools GDPR / analítica con IA RGPD | `/ai-analytics` (EN+ES) | shipped 7 Jul |
| 10 | 4 | connect ChatGPT/Claude to my analytics · MCP analytics | `/ai-analytics` FAQ + `/blog/self-service-analytics-lens-ai` | live |
| 11 | 5 | CNIL-exempt analytics / analytics AEPD España | `/gdpr-analytics/france` + `/gdpr-analytics/spain` + CNIL post | live |
| 12 | 5 | analytics compliance audit / análisis de brechas RGPD analítica | `/reg-gap-analysis` (EN+ES) | shipped 7 Jul |
| 13 | 5 | analytics without consent for small business (ES focus — beat trustedshops.es) | `/blog/gdpr-analytics-spain-faq` (EN+ES) + `/es/reg-gap-analysis` | shipped 7 Jul |
| 14 | 5 | why does GA4 show so much direct / none traffic / por qué GA4 muestra tanto tráfico directo | `/blog/why-ga4-shows-direct-none` (EN+ES) + `/complete-data` | shipped 14 Sep |
| 15 | 2 | how to measure ROAS after cookie consent / cómo medir el ROAS con el consentimiento de cookies | `/blog/measure-roas-after-cookie-consent` (EN+ES) + `/use-cases/revenue-attribution` | shipped 14 Sep |
| 16 | 5 | why don't Meta Ads conversions match my CRM / por qué no cuadran las conversiones de Meta Ads con el CRM | `/blog/meta-ads-conversions-vs-crm` (EN+ES) + `/use-cases/single-source-of-truth` | shipped 14 Sep |
| 17 | 2 | what does GA4 consent mode model / qué modela Consent Mode en GA4 | `/blog/consent-mode-measured-vs-modelled` (EN+ES) + `/glossary/consent-mode-v2` | shipped 14 Sep |
| 18 | 5 | last-click vs data-driven attribution / último clic frente a atribución basada en datos | `/blog/last-click-vs-modelled-attribution` (EN+ES) + `/blog/multi-touch-attribution-complete-data` | shipped 14 Sep |
| 19 | 3 | GA4 vs Piwik PRO vs Sealmetrics / GA4 o Piwik PRO | `/blog/ga4-vs-piwik-pro-vs-sealmetrics` (EN+ES) + `/vs-ga4` + `/vs/piwik-pro` | shipped 14 Sep |
| 20 | 2 | is server-side tracking GDPR compliant / server-side tracking y RGPD | `/blog/server-side-tracking-gdpr` (EN+ES) + `/glossary/server-side-tracking` | shipped 14 Sep |
| 21 | 5 | cookieless analytics for Magento / analítica sin cookies para Magento | `/platforms/magento` (EN+ES) | shipped 14 Sep |
| 22 | 4 | export analytics to BigQuery without GA4 / exportar analítica a BigQuery | `/integrations/bigquery` (EN+ES) | shipped 14 Sep |
| 23 | 5 | track Google Ads revenue without GA4 / medir ingresos de Google Ads sin GA4 | `/integrations/google-ads` (EN+ES) | shipped 15 Sep |

### Method (monthly, first week)

1. Run each prompt 3× per engine (fresh sessions), EN and ES variants.
2. Score per prompt-engine pair: `0` not named · `1` named · `2` named + sealmetrics.com cited.
3. Log competitor mentions + cited URLs (watch Matomo/Plausible URL patterns — they show which page *formats* engines reward).
4. Compute SOV per engine and per tier; append one row to the log below.
5. Gap analysis: any prompt scored 0 for 2 consecutive months → content action (new FAQ, schema fix, or new spoke) into the monthly plan.

**Log** (append monthly):

| Date | Perplexity SOV | OpenAI SOV | Anthropic SOV | Tier 1–2 SOV | Won / 13 | Notes |
|---|---:|---:|---:|---:|---|---|
| Jul 2026 (baseline) | 16.7% | 10% | 10% | 0% | — | pre-content-batch audit |

### What the engines reward (from competitor citation analysis)

- **Legal-assessment format wins Tier 2** — Plausible's single legal page out-cites their whole blog. Ours shipped 7 Jul (EN+ES) with FAQPage schema; expect first citations in 4–8 weeks post-index.
- **Listicle-with-table wins Tier 1** — PostHog's ga4-alternatives page is the cited pattern. Ours carries `ItemList` schema; theirs doesn't.
- **Country/regulator specificity wins Tier 5** — Matomo's gdpr-analytics page cites CNIL directly. Our `/gdpr-analytics/*` country pages + published self-assessments are the same play with more primary evidence.
- **FAQ answers phrased as the prompt** are the extractable unit — keep writing FAQ questions as literal user prompts ("Is Matomo GDPR-compliant?").

### Targets

| Metric | Jul 2026 | End Q3 (Aug 31) | End Q4 |
|---|---:|---:|---:|
| Perplexity SOV | 16.7% | 25% | 35% |
| OpenAI / Anthropic SOV | 10% / 10% | 15% / 15% | 25% / 25% |
| Tier 1–2 SOV | 0% | ≥10% | ≥25% |
| Prompts won (of 13) | — | 5 | 9 |
| sealmetrics.com URLs cited by Perplexity | 0 known | ≥2 | ≥5 |

### Backlog (next actions, priority order)

1. ~~**ES Tier-5 micro-FAQs**~~ — DONE 7 Jul: `/blog/gdpr-analytics-spain-faq` (EN+ES) — 7 FAQs phrased as the literal Tier-5 prompts (banner necessity, AEPD guidance, GA4 legality, small-business tooling, cookieless conversions, LSSI fines, banner data loss), FAQPage schema, interlinked with `/gdpr-analytics/spain`. One post instead of 3–5 separate micro-pages to avoid thin-content risk; each FAQ is independently extractable.
2. ~~**`llms.txt` refresh**~~ — DONE 7 Jul: 4 new assets added, Blog (ES) list rebuilt, dead `/gdpr-analytics` hub line removed.
3. **Tier-4 citation seeding** — the OpenAI/Anthropic gap is domain-diversity: flowsery/bootstrap/zenovay are thin content. `/ai-analytics` + MCP docs should displace them once indexed; re-check Sept run.
4. **Rule reminder** — competitor coverage is done inside posts with "different category" framing. Never a `/vs/plausible|fathom|umami` page (CLAUDE.md competitive positioning).

---

## 10. Technical SEO (unchanged from v1 except)

Performance targets, canonical rules, heading hierarchy, robots.txt — unchanged.

**New infrastructure note:** GitHub Pages cannot set Cache-Control or security headers from-repo. The May 2026 audit estimated ~1.3s mobile LCP recoverable + full security-header credibility gap. **Migration to Vercel** planned for Q3 2026 alongside the new-pillar batch deploy. See `PRD-CONTENT-STRATEGY.md` §15b for pre-migration checklist. **Do not bundle DNS changes into a quick win** — the pixel endpoint shares the zone.

---

## 11. Risks + open decisions

1. **Infra migration host** (Jun 30, BLOCKING) — Vercel / Netlify / CF Pages / Cloudflare-in-front-of-GHPages. Blocks June W4 `vercel.json` draft and Q3 infra fix on Cache-Control + security headers. Recommendation: Vercel per PRD §15b. Must resolve before any DNS work.
2. **Vertical sunsetting decision** (Jun 30) — Finance/Healthcare/Education stay or consolidate into `/for/regulated-industries`? Pending sales input.
3. **ES parity policy** — ~75 EN pages × full ES parity = ~150 builds. Current default is full parity. PRD §17 suggests considering EN-first + ES translation 30-day lag. Decide in Q3 planning.
4. **PRD-CONTENT-STRATEGY.md staleness** — §4.2 (`/vs/*` rewrites) and §10 (glossary QuickAnswer retrofit) describe work that has already shipped. Update the PRD at the next planning pass to mark Done and re-pick Q3 priorities. Same applies to `.seo-audit/ACTION-PLAN.md` items M7 and H7.
5. **Pricing primary nav** — `/complete-data` vs `/cookieless-analytics` as dominant homepage CTA. Both are head-pillars; A/B test in Q3.
6. **Sales pipeline signal for August W1** — Magento vs Headless as 3rd platform page depends on which inbound is louder. Sales-team check-in by 25 Jul.

---

## Appendix — KPI targets

| Metric | May 2026 baseline | End Q3 2026 (Aug 31) | End Q4 2026 |
|---|---:|---:|---:|
| Indexed URLs (EN sitemap) | ~75 | ~100 | ~130 |
| Pillars live | 7 | 7 | 7 |
| `/vs/*` gold-standard | 5 (closed 1 Jun) | 5 | 5 |
| Country compliance pages | 3 | 4 (+Italy) | 5 |
| Platform pages | 2 | 3 | 6 |
| Use-case pages | 3 | 3 | 6 |
| Case studies | 3 | 5 | 7 |
| Glossary terms | 20 | 25 | 30 |
| Blog posts | 27 | 35 | 42 |
| `/open` chapters published | 4 | 8 | 11 |
| Organic sessions (GSC) | TBD baseline | +25% vs baseline | +60% |
| Demo requests from organic | TBD baseline | +15% | +40% |
