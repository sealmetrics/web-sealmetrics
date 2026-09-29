import Link from "next/link";
import { ComparisonByline } from "./ComparisonByline";
import { ComparisonMethodology } from "./ComparisonMethodology";
import { FaqAccordionV3 } from "./FaqAccordionV3";
import { FinalCtaSharedV3 } from "./FinalCtaSharedV3";
import { TldrBlock } from "@/components/ui/TldrBlock";

type Locale = "en" | "es";

export interface VsCaseStudy {
  eyebrow: string;
  title: React.ReactNode;
  quote: string;
  quoteAuthor: string;
  body: string;
  href: string;
  linkLabel: string;
}

export interface VsData {
  /** Competitor name as shown in heading */
  competitor: string;
  /** Short label for H1 italic emphasis */
  hook: string;
  /** H1 wrapper (template: "Sealmetrics vs {competitor}. [italic hook]") */
  eyebrow: string;
  h1: React.ReactNode;
  lede: string;
  /** Optional TL;DR block, rendered between hero and gap stats. Citation-ready. */
  tldr?: { answer: React.ReactNode; bullets: React.ReactNode[] };
  /** 4 stat cards — competitor pain points */
  gapStats: { n: string; label: string; detail: string }[];
  /** Feature-by-feature comparison table. Optional `block` groups categories into anchored sections. */
  comparison: { category: string; block?: "technical" | "commercial" | "reporting"; rows: { feature: string; them: string; us: string }[] }[];
  /** Optional link to the full technical report on docs, rendered under the technical block. */
  techReportHref?: string;
  /** Optional override for the report link text. Defaults to wording that promises field
   *  measurements — set this for vendors the report covers on script weight only. */
  techReportLabel?: string;
  /** FAQ */
  faqs: { q: string; a: string }[];
  /** Optional case-study callout rendered before final CTA. */
  caseStudy?: VsCaseStudy;
  ctaTitle: React.ReactNode;
  ctaLede: string;
  locale: Locale;
}

type VsCategory = VsData["comparison"][number];

const VS_BLOCKS = [
  { id: "technical", en: "Technical & data capture", es: "Técnico y captura de datos" },
  { id: "commercial", en: "Pricing & customer success", es: "Precio y customer success" },
  { id: "reporting", en: "Reporting", es: "Reporting" },
] as const;

function VsTableCard({ cats, competitor, locale }: { cats: VsCategory[]; competitor: string; locale: Locale }) {
  return (
    <div className="bg-white border border-warm-100 rounded-xl overflow-hidden">
      <table className="w-full border-collapse table-fixed">
        <caption className="sr-only">
          {locale === "es"
            ? `Comparativa feature por feature: Sealmetrics vs ${competitor}`
            : `Feature-by-feature comparison: Sealmetrics vs ${competitor}`}
        </caption>
        <colgroup>
          <col style={{ width: "44%" }} />
          <col style={{ width: "28%" }} />
          <col style={{ width: "28%" }} />
        </colgroup>
        <thead>
          <tr className="border-b border-warm-100 bg-warm-50 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-soft font-bold">
            <th scope="col" className="p-5 text-left align-middle">
              {locale === "es" ? "Capacidad" : "Capability"}
            </th>
            <th scope="col" className="p-5 text-left align-middle">
              {competitor}
            </th>
            <th
              scope="col"
              className="p-5 text-left align-middle text-ink"
              style={{ background: "rgba(45,139,109,0.05)", borderLeft: "2px solid #2D8B6D" }}
            >
              Sealmetrics
            </th>
          </tr>
        </thead>
        {cats.map((section) => (
          <tbody key={section.category}>
            <tr>
              <th
                scope="rowgroup"
                colSpan={3}
                className="px-5 py-3 bg-warm-white border-b border-warm-100 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink font-bold text-left"
              >
                {section.category}
              </th>
            </tr>
            {section.rows.map((row, i) => {
              const isLastOverall =
                i === section.rows.length - 1 && section === cats[cats.length - 1];
              return (
                <tr
                  key={row.feature}
                  className={isLastOverall ? "" : "border-b border-warm-100"}
                >
                  <th scope="row" className="p-4 md:p-5 text-[14px] text-ink font-semibold leading-[1.4] text-left align-top">
                    {row.feature}
                  </th>
                  <td className="p-4 md:p-5 text-[13.5px] text-ink-soft leading-[1.5] align-top">
                    {row.them}
                  </td>
                  <td
                    className="p-4 md:p-5 text-[13.5px] text-ink leading-[1.5] font-medium align-top"
                    style={{
                      background: "rgba(45,139,109,0.04)",
                      borderLeft: "2px solid #2D8B6D",
                    }}
                  >
                    {row.us}
                  </td>
                </tr>
              );
            })}
          </tbody>
        ))}
      </table>
    </div>
  );
}

export function VsComparisonV3({ data, dateModified }: { data: VsData; dateModified: string }) {
  const { locale, competitor } = data;
  const demoHref = locale === "es" ? "/es/demo" : "/demo";

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-16">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 text-center">
          <span
            className="eyebrow mb-5"
            style={{ display: "inline-flex", justifyContent: "center" }}
          >
            {data.eyebrow}
          </span>
          <h1 className="h-display mx-auto mt-5" style={{ maxWidth: "22ch" }}>
            {data.h1}
          </h1>
          <ComparisonByline dateModified={dateModified} locale={locale} />
          <p
            className="text-ink-soft mt-8 mx-auto max-w-[62ch] leading-[1.55]"
            style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}
          >
            {data.lede}
          </p>
          <div data-md="skip" className="flex flex-wrap justify-center gap-3 mt-9">
            <Link
              href={demoHref}
              className="inline-flex items-center gap-2 px-7 py-4 bg-ink text-white rounded-md text-[15px] font-semibold no-underline hover:bg-brand transition-colors"
            >
              {locale === "es" ? "Reserva una demo" : "Book a demo"} →
            </Link>
            <a
              href="https://my.sealmetrics.com/register"
              className="inline-flex items-center gap-2 px-7 py-4 border border-warm-200 text-ink rounded-md text-[15px] font-semibold no-underline hover:bg-warm-50 transition-colors"
            >
              {locale === "es" ? "Empieza gratis" : "Start free"}
            </a>
          </div>
          <p className="mt-4 font-mono text-[12px] text-ink-soft uppercase tracking-[0.06em]">
            {locale === "es"
              ? "Sin migración · Corre en paralelo · Decides tú"
              : "No migration · Run in parallel · You decide"}
          </p>
        </div>
      </section>

      {/* TL;DR (optional) */}
      {data.tldr ? (
        <TldrBlock answer={data.tldr.answer} bullets={data.tldr.bullets} />
      ) : null}

      {/* GAP STATS */}
      <section className="py-28 bg-warm-50 border-t border-warm-100">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-12">
            <div>
              <span className="eyebrow mb-5">
                {locale === "es" ? "El hueco" : "The gap"}
              </span>
              <h2 className="h-section mt-5">
                {locale === "es" ? (
                  <>Lo que <em>{competitor}</em> no cubre.</>
                ) : (
                  <>Where <em>{competitor}</em> falls short.</>
                )}
              </h2>
            </div>
            <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
              {data.hook}
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {data.gapStats.map((s) => (
              <article
                key={s.label}
                className="bg-white border border-warm-100 rounded-xl p-6"
              >
                <div
                  className="font-semibold tracking-[-0.025em] leading-none tabular-nums mb-2"
                  style={{ fontSize: "clamp(26px, 3vw, 36px)", color: "#B5423B" }}
                >
                  {s.n}
                </div>
                <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-ink-soft mb-2">
                  {s.label}
                </div>
                <p className="text-[13.5px] leading-[1.55] text-ink-2">{s.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-28 bg-white border-t border-warm-100">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-12">
            <div>
              <span className="eyebrow mb-5">
                {locale === "es" ? "Comparativa" : "Comparison"}
              </span>
              <h2 className="h-section mt-5">
                {locale === "es"
                  ? <>Feature a feature. <em>Sin rodeos.</em></>
                  : <>Feature by feature. <em>No spin.</em></>}
              </h2>
            </div>
            <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
              {locale === "es"
                ? `La comparación honesta contra ${competitor}. Acepta sus fortalezas; destaca dónde queda corto para el eCommerce europeo moderno.`
                : `The honest comparison against ${competitor}. Acknowledges its strengths; clear about where it falls short for modern European eCommerce.`}
            </p>
          </div>

          {data.comparison.some((c) => c.block) ? (
            <>
              <nav
                aria-label={locale === "es" ? "Secciones de la comparativa" : "Comparison sections"}
                className="flex flex-wrap gap-2 mb-10"
              >
                {VS_BLOCKS.filter((b) => data.comparison.some((c) => c.block === b.id)).map((b) => (
                  <a
                    key={b.id}
                    href={`#${b.id}`}
                    className="px-4 py-2 rounded-full border border-warm-200 bg-warm-50 font-mono text-[11px] uppercase tracking-[0.1em] font-semibold text-ink no-underline hover:border-ink transition-colors"
                  >
                    {locale === "es" ? b.es : b.en}
                  </a>
                ))}
              </nav>
              {VS_BLOCKS.map((b) => {
                const cats = data.comparison.filter((c) => c.block === b.id);
                if (cats.length === 0) return null;
                return (
                  <div key={b.id} id={b.id} className="scroll-mt-28 mb-14 last:mb-0">
                    <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-ink mb-5">
                      {locale === "es" ? b.es : b.en}
                    </h3>
                    <VsTableCard cats={cats} competitor={competitor} locale={locale} />
                    {b.id === "technical" && data.techReportHref ? (
                      <p className="mt-4 text-[14px] text-ink-2">
                        <a
                          href={data.techReportHref}
                          className="text-ink font-semibold no-underline border-b border-warm-200 pb-px hover:border-ink"
                        >
                          {data.techReportLabel ??
                            (locale === "es"
                              ? "Lee el informe técnico completo (mediciones de campo) →"
                              : "Read the full technical report (field measurements) →")}
                        </a>
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </>
          ) : (
            <VsTableCard cats={data.comparison} competitor={competitor} locale={locale} />
          )}

          <div className="mt-6 p-6 bg-warm-50 border border-warm-100 rounded-xl text-center text-[15px] text-ink-2 leading-[1.55]">
            <b className="text-ink font-semibold">
              {locale === "es"
                ? `No es "${competitor} está roto".`
                : `Not "${competitor} is broken".`}
            </b>{" "}
            {locale === "es"
              ? "Funciona para su caso de uso original. Para decidir con datos completos en el contexto europeo actual, se queda corto. "
              : "It works for its original use case. For deciding with complete data in today's European context, it falls short. "}
            <em className="italic-accent">
              {locale === "es" ? "Corre ambos 30 días y decide." : "Run both 30 days and decide."}
            </em>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqAccordionV3
        locale={locale}
        items={data.faqs}
        eyebrow="FAQ"
        titleEn={<>The <em>objections</em>, answered.</>}
        titleEs={<>Las <em>objeciones</em>, respondidas.</>}
        ledeEn={`What CMOs and CTOs ask before switching from ${competitor}.`}
        ledeEs={`Lo que CMOs y CTOs preguntan antes de cambiar desde ${competitor}.`}
      />

      {/* CASE STUDY (optional) */}
      {data.caseStudy ? (
        <section className="py-20 bg-warm-white border-t border-warm-100">
          <div className="max-w-[860px] mx-auto px-5 sm:px-8">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-brand font-semibold">
              {data.caseStudy.eyebrow}
            </span>
            <h2 className="text-[26px] sm:text-[32px] font-semibold tracking-[-0.02em] text-ink mt-3 mb-6 leading-[1.15]">
              {data.caseStudy.title}
            </h2>
            <blockquote
              className="border-l-[3px] pl-6 py-1 italic"
              style={{ borderColor: "#2E5C8A", color: "#0E0E0C" }}
            >
              <p className="text-[20px] leading-[1.45] tracking-[-0.01em] font-medium">
                &ldquo;{data.caseStudy.quote}&rdquo;
              </p>
              <cite className="block mt-4 not-italic font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft font-semibold">
                {data.caseStudy.quoteAuthor}
              </cite>
            </blockquote>
            <p className="mt-6 text-[15.5px] leading-[1.65] text-ink-2">
              {data.caseStudy.body}
            </p>
            <Link
              href={data.caseStudy.href}
              className="inline-flex items-center gap-2 mt-6 text-ink font-semibold no-underline border-b border-warm-200 pb-px hover:border-ink"
            >
              {data.caseStudy.linkLabel} →
            </Link>
          </div>
        </section>
      ) : null}

      {/* FINAL CTA */}
      <FinalCtaSharedV3
        locale={locale}
        titleEn={data.ctaTitle}
        titleEs={data.ctaTitle}
        ledeEn={data.ctaLede}
        ledeEs={data.ctaLede}
      />

      {/* METHODOLOGY */}
      <ComparisonMethodology
        locale={locale}
        competitor={competitor}
        dateModified={dateModified}
      />
    </>
  );
}
