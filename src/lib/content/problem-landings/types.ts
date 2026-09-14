import type { ReactNode } from "react";

/**
 * Content contract for a problem landing (Phase 2 of
 * CONTENT-PLAN-PROBLEM-POSITIONING.md): a page a buyer reaches through the
 * problem they have, not through a feature list.
 *
 * The order of the fields is the order of the page, and it is deliberate:
 * pain before solution, method before proof, limits before the call to action.
 *
 * Two fields are plain strings on purpose. `faq` answers and `steps` feed
 * `faqPageSchema()` and `howToSchema()` from the same array that renders, so the
 * schema can never claim a question or a step the reader cannot see
 * (`faq-schema-not-visible`, `howto-schema-not-visible`).
 */
export type ProblemLandingContent = {
  /** Route without locale prefix or trailing slash, e.g. "/use-cases/single-source-of-truth". */
  route: string;
  breadcrumbs: { label: string; href?: string }[];
  eyebrow: string;
  h1: ReactNode;
  heroBody: string;
  heroPrimary: { label: string; href: string };
  heroSecondary: { label: string; href: string };
  heroMicro: string;
  /**
   * Visible byline for pages whose schema is an Article. When `dateModified`
   * differs from `datePublished`, `date-modified-not-visible` requires the date
   * to be rendered in a `<time dateTime>`; this is where it lives.
   */
  byline?: {
    byLabel: string;
    authorName: string;
    authorHref: string;
    updatedLabel: string;
    /** ISO day, identical to the schema's dateModified. */
    date: string;
    dateDisplay: string;
  };
  module: { title: string; status: string; rows: [string, string][]; foot: string };

  answerLabel: string;
  /** 134–167 words, definitional first sentence, closes on a limit — see SignalAnswer. */
  answer: ReactNode;

  divergence: {
    tag: string;
    title: ReactNode;
    body: string;
    headers: string[];
    rows: string[][];
    note: ReactNode;
  };

  costs: { tag: string; title: ReactNode; body: string; items: [string, string, ReactNode][] };

  method: {
    id: string;
    tag: string;
    title: ReactNode;
    body: ReactNode;
    howToName: string;
    howToDescription: string;
    steps: { name: string; text: string }[];
  };

  /**
   * Optional worked examples rendered after the method, for integration pages
   * whose most citable content is code (SQL, API calls). Code is shown as
   * written; keep it identical to the vendor documentation it comes from.
   */
  examples?: {
    tag: string;
    title: ReactNode;
    body: ReactNode;
    items: { name: string; description: string; code: string }[];
  };

  roles: {
    tag: string;
    title: ReactNode;
    body: string;
    items: { role: string; need: string; how: string; link: { label: string; href: string } }[];
  };

  proof: {
    tag: string;
    /**
     * Optional: only an approved, attributable client quote goes here. A page
     * with no such quote (compliance has none) shows documents instead — never
     * a paraphrase dressed as a quote.
     */
    quote?: { text: string; cite: string; person: string; role: string };
    body: string;
    figures: { value: string; label: string; client: string; href: string }[];
    readCase: string;
  };

  limits: { tag: string; title: ReactNode; body: ReactNode; items: [string, string][] };

  faqTag: string;
  faqTitle: ReactNode;
  faq: { question: string; answer: string }[];

  final: {
    tag: string;
    title: ReactNode;
    body: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
};
