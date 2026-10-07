# Signal v4 migration map

This file is the operational record for porting the current website to the Signal design system. Coverage has two explicit levels: **Native Signal** for a route-specific v4 composition and **Signal adapted** for an existing structured React page that inherits the shared v4 system without flattening or replacing its content.

## Definition of done

- Signal v4 visual language: paper, ink, acid, square geometry and hard shadows.
- No scraped or flattened page content; tables, reports, forms and interactive elements keep their semantic structure.
- Exactly one H1, correct heading order and visible breadcrumbs outside the homepage.
- Complete page metadata, Twitter metadata, canonical/hreflang and appropriate JSON-LD.
- Contextual internal links follow `SEO-STRATEGY.md`.
- Desktop and mobile review with no horizontal overflow or console errors.
- `npm run build` passes every post-build audit.
- Every exported route, including `noindex` campaign and utility pages, carries the `signal-v4` marker and the repository brand asset; the build fails on drift.

## Route status

| Block | English | Spanish | Status | Notes |
| --- | --- | --- | --- | --- |
| Global shell | Shared | Shared | Complete | Signal header/footer and common layout are in place; the repository logo requested by the user is restored. |
| Forms security | Shared | Shared | Complete | First-party proxy, Turnstile and tracking protections are on `main`. |
| Homepage | `/` | `/es/` | Covered | English is Native Signal; Spanish is Signal adapted with the shared v4 layer. |
| Product | `/product/` | `/es/product/` | Complete in PR | Real bilingual React component, Signal styling, metadata and schemas validated. |
| How it works | `/how-it-works/` | `/es/how-it-works/` | Complete in PR | Signal path, semantic data-contract table, implementation sequence and visible FAQ. |
| Pricing | `/pricing/` | `/es/pricing/` | Complete in PR | Interactive billing, four plan cards, traffic table, semantic comparison table, overage policy and visible FAQ. |
| Security | `/security/` | `/es/security/` | Complete in PR | Data boundary, controls and retention remain inspectable; Dublin-only and no unearned certifications. |
| Comparison pages | `/vs/*` | `/es/vs/*` | Signal adapted | Existing semantic comparison tables and interlinking are preserved under the shared v4 system. |
| Hotel case studies | Palladium + Dreamplace | Palladium + Dreamplace | Complete in PR | Named clients, approved quotes and published figures preserved in a bilingual Signal family. |
| Case-study indexes | `/case-studies/` | `/es/case-studies/` | Complete in PR | Named-client index; the legacy European hotel URL remains a noindex redirect to Palladium. |
| Solution/platform pages | Multiple | Multiple | Signal adapted | Existing reusable React families remain structured and receive the shared v4 system. |
| Editorial content | Blog and glossary | Blog and glossary | Signal adapted | Article/DefinedTerm schemas, tables and content hierarchy remain intact. |
| Conversion routes | Demo, audit, calculators | Spanish counterparts | Signal adapted | Working form logic is unchanged; only the shared visual system applies. |
| Trust and legal | Privacy, DPA, terms, trust | Spanish counterparts | Signal adapted | Long-form legal structure is preserved; Security is Native Signal. |

## Recommended sequence

1. Product — complete in the redesign PR.
2. How it works — complete in the redesign PR.
3. Pricing — complete in the redesign PR.
4. Security — complete in the redesign PR.
5. Hotel case studies and indexes — complete in the redesign PR.
6. Shared Signal adaptation — applied to every remaining structured React route.
7. Full route, asset, metadata, schema and link audits — complete.
8. Manual stakeholder review before any production cutover — pending; deployment is explicitly blocked.
