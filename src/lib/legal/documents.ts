import { readFileSync } from "node:fs";
import { join } from "node:path";
import { prepareDocument } from "./markdown.mjs";

export type LegalLocale = "en" | "es";
export type LegalDocumentId = "privacy" | "dpa" | "terms" | "privacy-template";

/**
 * TODO(Rafa): the day the notice email to customers is sent + 30 days, as
 * "YYYY-MM-DD". It is when DPA v2.2 and Terms v2.1 bind existing customers
 * (Terms 17.1, DPA 5.1.b); new sign-ups are bound from publication. While it is
 * null the pages say "30 days after we notify you", and `tests/legal.test.mjs`
 * fails, so the pull request cannot go green without it.
 */
export const LEGAL_EFFECTIVE_DATE: string | null = null;

/** Version and date of each document, as its own header or history table states them.
 * `tests/legal.test.mjs` checks both against the synced Markdown. */
export const LEGAL_DOCUMENTS: Record<LegalDocumentId, { version: string; updated: string }> = {
  privacy: { version: "4.0", updated: "2026-09-24" },
  dpa: { version: "2.2", updated: "2026-09-24" },
  terms: { version: "2.1", updated: "2026-09-24" },
  "privacy-template": { version: "3.0", updated: "2026-09-24" },
};

export function formatLegalDate(iso: string, locale: LegalLocale): string {
  const date = new Date(`${iso}T12:00:00Z`);
  return new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/** The document as the page renders it: read at build time from `src/lib/content/legal`,
 * which `scripts/sync-legal.mjs` fills from sealmetrics2. */
export function loadLegalDocument(id: LegalDocumentId, locale: LegalLocale) {
  const path = join(process.cwd(), "src/lib/content/legal", `${id}.${locale}.md`);
  const markdown = readFileSync(path, "utf8");
  return prepareDocument(markdown, { extractMeta: id === "privacy" || id === "terms" }) as {
    title: string;
    meta: { updated?: string; version?: string; effective?: string };
    body: string;
  };
}

/** Where a link inside a document should go on this site. The documents link to
 * `/privacy` or `https://sealmetrics.com/dpa`; on the Spanish pages those are the
 * Spanish routes, and every internal route carries the trailing slash the static
 * export serves. */
const LOCALISED = new Set(["privacy", "dpa", "terms", "security", "pricing", "privacy-template"]);

export function localiseHref(href: string, locale: LegalLocale): string {
  if (href.startsWith("#") || href.startsWith("mailto:")) return href;
  const match = /^(?:https:\/\/(?:www\.)?sealmetrics\.com)?\/([a-z0-9-/]*?)\/?(#.*)?$/.exec(href);
  if (!match) return href;
  const [, path, hash = ""] = match;
  if (locale === "es" && LOCALISED.has(path)) return `/es/${path}/${hash}`;
  return `/${path}${path ? "/" : ""}${hash}`;
}
