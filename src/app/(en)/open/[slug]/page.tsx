import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, ORG_ID } from "@/lib/schema";
import { OpenChapterSidebar } from "@/components/open/OpenChapterSidebar";
import { OpenChapterTOC } from "@/components/open/OpenChapterTOC";
import {
  publishedChapters,
  getChapterBySlug,
  getAdjacentChapters,
  openParts,
  isPublished,
  type OpenChapter,
} from "@/lib/content/open";
import { ogImage } from "@/lib/seo/og";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return publishedChapters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);
  if (!chapter) return {};
  const title = `${chapter.title} — Open · Sealmetrics`;
  return {
    title: title.length > 60 ? `${chapter.title} — Open` : title,
    description: chapter.summary.slice(0, 158),
    openGraph: {
      title: `${chapter.title} — Open`,
      description: chapter.summary,
      type: "article",
      // url/siteName/locale are NOT inherited from the layout: Next.js
      // replaces the parent `openGraph` object wholesale when a page declares
      // its own. Every field this page needs has to be spelled out here.
      url: `https://sealmetrics.com/open/${chapter.slug}/`,
      siteName: "Sealmetrics",
      locale: "en_US",
      images: [ogImage(`/open/${chapter.slug}/`)],
    },
    twitter: {
      card: "summary_large_image",
      site: "@sealmetrics",
      title: `${chapter.title} — Open`,
      description: chapter.summary,
      images: [ogImage(`/open/${chapter.slug}/`)],
    },
    alternates: {
      canonical: `https://sealmetrics.com/open/${chapter.slug}/`,
    },
  };
}

export default async function OpenChapterPage({ params }: PageProps) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);
  if (!chapter || !isPublished(slug)) notFound();
  const { prev, next } = getAdjacentChapters(slug);
  const partInfo = openParts.find((p) => p.number === chapter.part);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: chapter.title,
    description: chapter.summary,
    inLanguage: "en",
    datePublished: chapter.datePublished,
    dateModified: chapter.dateModified,
    isPartOf: {
      "@type": "Book",
      name: "Open — Sealmetrics",
      url: "https://sealmetrics.com/open",
    },
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      {/* Mirrors the visible breadcrumbs below. They were rendered for readers
          but never emitted as structured data, so the chapters were the only
          section of the site with no BreadcrumbList. */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Open", url: "/open" },
          { name: chapter.title, url: `/open/${chapter.slug}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { label: "Open", href: "/open" },
          { label: chapter.title },
        ]}
        locale="en"
      />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)_200px] gap-x-10 xl:gap-x-12 gap-y-10">
          {/* LEFT — chapter sidebar */}
          <OpenChapterSidebar currentSlug={chapter.slug} />

          {/* CENTER — article */}
          <article className="min-w-0 max-w-[680px] mx-auto w-full">
            {/* Chapter header */}
            <header className="mb-12 pb-10 border-b border-warm-100">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 font-mono text-[0.72rem] uppercase tracking-[0.12em]">
                <span className="text-text-tertiary">
                  Part {String(chapter.part).padStart(2, "0")} ·{" "}
                  {partInfo?.title}
                </span>
                <span aria-hidden="true" className="text-text-tertiary">
                  /
                </span>
                <span className="text-brand font-semibold">
                  Chapter {String(chapter.number).padStart(2, "0")}
                </span>
                {chapter.status === "draft" && (
                  <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-amber px-2 py-0.5 rounded-full bg-amber-soft/60 ml-1">
                    Draft
                  </span>
                )}
              </div>

              <h1
                className="h-display"
                style={{ fontSize: "clamp(2.25rem, 4.4vw, 3.75rem)" }}
                dangerouslySetInnerHTML={{
                  __html: chapter.titleHtml ?? chapter.title,
                }}
              />

              <p className="mt-7 text-[1.2rem] sm:text-[1.3rem] leading-[1.45] text-ink-2 font-normal max-w-[60ch]">
                {chapter.summary}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.78rem] font-mono uppercase tracking-[0.08em] text-text-tertiary">
                <span>{chapter.readMinutes} min read</span>
                <span aria-hidden="true">·</span>
                <span>Last revised · May 2026</span>
              </div>
            </header>

            {/* Body */}
            {chapter.slug === "why-we-exist" ? (
              <ChapterOneBody />
            ) : chapter.slug === "who-we-build-for" ? (
              <ChapterTwoBody />
            ) : chapter.slug === "what-complete-data-means" ? (
              <ChapterThreeBody />
            ) : chapter.slug === "architecture-and-performance" ? (
              <ChapterFiveBody />
            ) : chapter.slug === "gdpr-by-architecture" ? (
              <ChapterSixBody />
            ) : chapter.slug === "how-we-price" ? (
              <ChapterSevenBody />
            ) : chapter.slug === "what-we-wont-do" ? (
              <ChapterNineBody />
            ) : chapter.slug === "glossary" ? (
              <ChapterElevenBody />
            ) : (
              <DraftPlaceholder chapter={chapter} />
            )}

            {/* Feedback */}
            <div className="mt-16 pt-8 border-t border-warm-100">
              <p className="text-[0.85rem] text-text-secondary">
                Was this chapter useful?{" "}
                <a
                  href="mailto:open@sealmetrics.com?subject=Open%20%E2%80%94%20feedback"
                  className="text-brand hover:text-brand-hover no-underline"
                >
                  Tell us →
                </a>
              </p>
            </div>

            {/* Prev / Next */}
            <nav
              aria-label="Chapter navigation"
              className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {prev ? (
                <Link
                  href={`/open/${prev.slug}`}
                  className="group block no-underline border border-warm-100 rounded-[10px] p-5 hover:border-warm-200 hover:bg-warm-50/60 transition-colors"
                >
                  <span className="block font-mono text-[0.65rem] uppercase tracking-[0.12em] text-text-tertiary mb-2">
                    ← Previous · ch. {String(prev.number).padStart(2, "0")}
                  </span>
                  <span className="block font-sans text-[1rem] font-semibold text-ink leading-snug group-hover:text-brand transition-colors">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <span aria-hidden="true" />
              )}
              {next ? (
                <Link
                  href={`/open/${next.slug}`}
                  className="group block no-underline border border-warm-100 rounded-[10px] p-5 hover:border-warm-200 hover:bg-warm-50/60 transition-colors text-right"
                >
                  <span className="block font-mono text-[0.65rem] uppercase tracking-[0.12em] text-text-tertiary mb-2">
                    Next · ch. {String(next.number).padStart(2, "0")} →
                  </span>
                  <span className="block font-sans text-[1rem] font-semibold text-ink leading-snug group-hover:text-brand transition-colors">
                    {next.title}
                  </span>
                </Link>
              ) : null}
            </nav>
          </article>

          {/* RIGHT — TOC */}
          <OpenChapterTOC items={chapter.toc} />
        </div>
      </div>

      {/* Manifesto-tone chapters (01, 02, 11) skip the demo slab on purpose,
          but must not dead-end: they hand off laterally to the pillar that
          continues their argument. Rule: manifesto content links to pillars,
          proof/mechanism content links to /demo. */}
      {[1, 2, 11].includes(chapter.number) && (
        <section className="bg-warm-white border-t border-warm-100">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-14">
            <p className="text-[1.05rem] leading-[1.7] text-text-body max-w-[62ch]">
              {chapter.number === 1 && (
                <>
                  This is why Sealmetrics exists. What that means in practice
                  starts with{" "}
                  <Link href="/complete-data" className="underline">
                    complete data
                  </Link>{" "}
                  — and who it&apos;s for is chapter two.
                </>
              )}
              {chapter.number === 2 && (
                <>
                  If your team is in here, the pages written for your role say
                  it concretely:{" "}
                  <Link href="/for/cmo" className="underline">
                    for CMOs
                  </Link>
                  ,{" "}
                  <Link href="/for/cto" className="underline">
                    for CTOs
                  </Link>{" "}
                  and{" "}
                  <Link href="/for/ecommerce" className="underline">
                    for eCommerce teams
                  </Link>
                  .
                </>
              )}
              {chapter.number === 11 && (
                <>
                  Every term here has a longer, citable entry in the{" "}
                  <Link href="/glossary" className="underline">
                    full glossary
                  </Link>
                  .
                </>
              )}
            </p>
          </div>
        </section>
      )}

      {/* Dark slab CTA (excludes chapters 01, 02, and 11) */}
      {![1, 2, 11].includes(chapter.number) && (
        <section className="bg-ink text-dark-text section-dark relative overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(80% 60% at 20% 20%, rgba(45,139,109,0.35) 0%, transparent 60%)",
            }}
          />
          <div data-md="skip" className="relative max-w-[1200px] mx-auto px-5 sm:px-8 py-20 sm:py-24">
            <div className="max-w-[640px]">
              <span className="eyebrow" style={{ color: "#E8B84B" }}>
                Next step
              </span>
              <p className="mt-6 text-[1.4rem] sm:text-[1.75rem] font-medium leading-[1.3] text-dark-text">
                Want to see how this chapter translates to{" "}
                <span
                  className="italic font-normal"
                  style={{ color: "#E8B84B" }}
                >
                  your data
                </span>
                ?
              </p>
              <div className="mt-8">
                <Link
                  href="/demo"
                  className="inline-flex items-center min-h-[44px] px-6 py-3 text-[0.9rem] font-medium text-ink bg-white rounded-[4px] no-underline hover:bg-warm-50 transition-colors"
                >
                  Book a demo →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

/* ============================================
   DRAFT PLACEHOLDER
   ============================================ */
function DraftPlaceholder({ chapter }: { chapter: OpenChapter }) {
  return (
    <div className="prose-open">
      <div className="rounded-[10px] border border-amber-soft bg-amber-soft/40 p-6 mb-12">
        <span className="block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink font-semibold mb-2">
          Draft · chapter {String(chapter.number).padStart(2, "0")}
        </span>
        <p className="text-[0.95rem] text-ink-2 leading-relaxed m-0">
          "{chapter.title}" is still being written. This page exists to
          validate the design and structure. The sections below are the
          planned outline — the body will follow the same format as chapter
          01 and chapter 05.
        </p>
      </div>

      <p className="text-[1.2rem] leading-[1.65] text-ink-2 mb-8 first-letter:font-semibold first-letter:text-[2.4em] first-letter:float-left first-letter:mr-2 first-letter:leading-[1] first-letter:text-ink">
        The opening paragraph lives here, set in larger type with a drop cap.
        It establishes the tension up front — the problem, the question, the
        figure that doesn't add up — and primes the reader for the sections
        below.
      </p>

      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        A second paragraph in body type sets context. Here we introduce who
        this chapter is written for and what the reader should be able to do
        once they've finished it.
      </p>

      {chapter.toc.map((section, i) => (
        <section key={section.id} className="mt-14">
          <h2
            id={section.id}
            className="font-sans text-[1.85rem] sm:text-[2.15rem] font-semibold text-ink mt-0 mb-5 leading-[1.1] tracking-[-0.025em] scroll-mt-24"
          >
            {section.label}
          </h2>
          <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
            Section {i + 1} of {chapter.toc.length}. This is where the
            argument develops, with verifiable data, anticipated objections,
            and inline links to other chapters.
          </p>
          <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </section>
      ))}
    </div>
  );
}

/* ============================================
   CHAPTER 01 · Why Sealmetrics exists
   ============================================ */
function ChapterOneBody() {
  return (
    <div className="prose-open">
      <p className="text-[1.25rem] leading-[1.6] text-ink-2 mb-8 first-letter:font-semibold first-letter:text-[2.4em] first-letter:float-left first-letter:mr-2 first-letter:leading-[1] first-letter:text-ink">
        Most enterprise eCommerce companies in Europe optimize their
        advertising investment on top of the share of their traffic that
        agreed to be measured. This chapter
        is about what happens when that number stops being a measurement
        problem and becomes a decision problem.
      </p>

      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-12">
        It's written for{" "}
        <span className="italic-accent">
          CMOs, growth leads, and measurement owners
        </span>{" "}
        — the people who sign off on six or seven-figure media budgets and have
        to defend the result.
      </p>

      {/* Section 1 */}
      <h2
        id="the-problem"
        className="font-sans text-[1.85rem] sm:text-[2.15rem] font-semibold text-ink mt-14 mb-5 leading-[1.1] tracking-[-0.025em] scroll-mt-24"
      >
        The problem we see
      </h2>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        Consent banners get rejected, ad blockers strip events, and Intelligent
        Tracking Prevention purges cross-site cookies on Safari and Firefox.
        Stack all three at full strength and GA4 can fall to about 13% of real
        traffic. That is the worst case, not the average. The measured gap is
        smaller and still large: on{" "}
        <Link
          href="/case-studies/incapto"
          className="text-brand hover:text-brand-hover no-underline border-b border-brand/40"
        >
          a Shopify store we measured side by side for 48 days
        </Link>
        , GA4 did not record 29% of visits or 45% of pageviews.
      </p>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        Whatever the gap on your site, the dashboard does not show it.
        Decisions are made anyway — because the dashboard is the only thing on
        the table.
      </p>

      <blockquote
        className="my-10 border-l-[3px] pl-6 py-2 italic text-[1.15rem] leading-[1.55] text-ink-2"
        style={{ borderColor: "#2E5C8A" }}
      >
        "The dashboard looks complete. That's the part that should worry you."
        <footer className="not-italic text-[0.85rem] text-text-tertiary mt-3 font-normal">
          — A common observation across audits
        </footer>
      </blockquote>

      {/* Section 2 */}
      <h2
        id="what-breaks"
        className="font-sans text-[1.85rem] sm:text-[2.15rem] font-semibold text-ink mt-14 mb-5 leading-[1.1] tracking-[-0.025em] scroll-mt-24"
      >
        What breaks in decision-making
      </h2>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        Bidding algorithms are statistical models. When you feed them sampled,
        modeled, or partially observed conversion data, they don't refuse —
        they extrapolate. The output looks like a campaign performance report.
        It isn't. It's a confident extrapolation from a biased sample.
      </p>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        A 10M€ eCommerce running on partial data is not allocating a slice of
        its budget against ghosts. It is allocating{" "}
        <em className="italic-accent">100%</em> of its budget on a phantom of
        the truth. Every bid, every audience, every retargeting list is a
        guess dressed as a measurement.
      </p>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        The cost compounds. Budgets shift toward channels that{" "}
        <em>appear</em> to convert — because those channels are measured
        better, not because they perform better. On that same store,
        Sealmetrics saw 11% more direct traffic than GA4 and 62% more organic
        search: the channels that bring new people in are the ones that go
        missing. The campaigns that actually
        drove revenue go unmeasured and unfunded. Over twelve months, the
        marketing plan rewrites itself around what GA4 can see, not around
        what your customers actually do.
      </p>

      {/* Section 3 */}
      <h2
        id="our-position"
        className="font-sans text-[1.85rem] sm:text-[2.15rem] font-semibold text-ink mt-14 mb-5 leading-[1.1] tracking-[-0.025em] scroll-mt-24"
      >
        Our position
      </h2>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-7">
        Sealmetrics is built on three premises. They are constraints, not
        features — they define what we will and will not build.
      </p>

      <div className="my-10 rounded-[14px] border border-warm-100 bg-white overflow-hidden">
        <div className="grid grid-cols-1 divide-y divide-warm-100">
          <div className="p-7">
            <span className="block font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-brand mb-3">
              Premise 01
            </span>
            <h3 className="font-sans text-[1.3rem] font-semibold text-ink leading-snug mb-2">
              Data should be complete
            </h3>
            <p className="text-[1rem] leading-[1.7] text-ink-2 m-0">
              Captured server-side, before ad blockers see the request and
              before consent banners are decided. Aggregate, anonymous, never
              personal. Visitors who reject the banner as well as those who
              accept it, not a sample of the consenting majority.
            </p>
          </div>
          <div className="p-7">
            <span className="block font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-brand mb-3">
              Premise 02
            </span>
            <h3 className="font-sans text-[1.3rem] font-semibold text-ink leading-snug mb-2">
              Attribution should be honest
            </h3>
            <p className="text-[1rem] leading-[1.7] text-ink-2 m-0">
              Last-click on data without consent gaps. Not because last-click is
              sophisticated — it isn't. Because{" "}
              <em className="italic-accent">complete</em> last-click
              outperforms <em>modeled</em> multi-touch every time the budget
              moves. We're explicit about this in{" "}
              <Link
                href="/open/what-we-wont-do"
                className="text-brand hover:text-brand-hover no-underline border-b border-brand/40"
              >
                chapter 09
              </Link>
              .
            </p>
          </div>
          <div className="p-7">
            <span className="block font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-brand mb-3">
              Premise 03
            </span>
            <h3 className="font-sans text-[1.3rem] font-semibold text-ink leading-snug mb-2">
              Compliance should be architectural
            </h3>
            <p className="text-[1rem] leading-[1.7] text-ink-2 m-0">
              No cookies, no localStorage, no fingerprinting. Hosted in
              Dublin. Designed for GDPR and ePrivacy from the architecture up
              (self-assessed) — not by legal interpretation. The legal grounding lives at{" "}
              <Link
                href="/security"
                className="text-brand hover:text-brand-hover no-underline border-b border-brand/40"
              >
                /security
              </Link>{" "}
              while we finish the dedicated Open chapter on compliance.
            </p>
          </div>
        </div>
      </div>

      {/* Section 4 */}
      <h2
        id="who-we-dont-serve"
        className="font-sans text-[1.85rem] sm:text-[2.15rem] font-semibold text-ink mt-14 mb-5 leading-[1.1] tracking-[-0.025em] scroll-mt-24"
      >
        Who we don't serve
      </h2>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        We are not a GA4 replacement for a 200K€ DTC startup. The product fit
        starts roughly at <strong className="font-semibold text-ink">10M€ in annual eCommerce revenue</strong>,
        where the cost of bad investment decisions exceeds the cost of
        measuring properly. Below that, GA4 plus a content management system
        usually works.
      </p>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        We are also not a privacy-first lightweight tool. Plausible, Fathom,
        and Simple Analytics are excellent at what they do — they are not
        what we compete with. We compete with{" "}
        <strong className="font-semibold text-ink">
          GA360, Adobe Analytics, and Piwik PRO
        </strong>{" "}
        — at a fraction of the cost, with complete data, and without leaving
        the EU.
      </p>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        If your measurement problem is{" "}
        <em>"I need a simple analytics dashboard"</em>, this is the wrong
        product. If your problem is{" "}
        <em>"I'm spending real money on incomplete signal"</em>, the rest of
        this document explains why we exist and what we do about it.
      </p>

      <p className="text-[0.9rem] text-text-tertiary italic">
        Continue with{" "}
        <Link
          href="/open/who-we-build-for"
          className="text-brand hover:text-brand-hover no-underline border-b border-brand/40"
        >
          chapter 02 — Who we build for
        </Link>
        .
      </p>
    </div>
  );
}

/* ============================================
   CHAPTER 05 · Architecture and performance
   ============================================ */
function ChapterFiveBody() {
  return (
    <div className="prose-open">
      <p className="text-[1.2rem] leading-[1.65] text-ink-2 mb-8 first-letter:font-semibold first-letter:text-[2.4em] first-letter:float-left first-letter:mr-2 first-letter:leading-[1] first-letter:text-ink">
        Anyone can promise "complete, real-time measurement at scale." What
        follows is what it takes to back that sentence with numbers. This
        chapter describes where the Sealmetrics pixel runs, what latency it
        introduces, how it scales, and what we guarantee.
      </p>

      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-12">
        It's written for technical leads —{" "}
        <span className="italic-accent">CTO, head of data, SRE</span> — who
        need to validate before they install. If you find an outdated number,
        write to us: we publish them so they can be corrected.
      </p>

      <h2
        id="where-it-runs"
        className="font-sans text-[1.85rem] sm:text-[2.15rem] font-semibold text-ink mt-14 mb-5 leading-[1.1] tracking-[-0.025em] scroll-mt-24"
      >
        Where the pixel runs
      </h2>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        All event processing runs in owned infrastructure in{" "}
        <strong className="font-semibold text-ink">Dublin, Ireland</strong> —
        European Union, no traffic transiting the United States, no
        sub-processors outside the EEA in the visitor data path. This includes
        pixel ingestion, validation, attribution, and storage. The only
        non-EEA sub-processor in the service, Resend (US), sends account
        emails under SCCs and the DPF and never receives visitor data.
      </p>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        The reason is operational before it is legal: a single region means a
        single surface to audit and maintain. The legal reason — Schrems II —
        follows from it.
      </p>

      <div className="my-12 rounded-[14px] border border-warm-100 bg-white overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-warm-100">
          {[
            { label: "Region", value: "Dublin, IE", sub: "EU-West" },
            { label: "Edge POPs", value: "12", sub: "Global CDN" },
            { label: "Non-EEA sub-processors on visitor data", value: "0", sub: "Resend (US) only for account emails" },
          ].map((m) => (
            <div key={m.label} className="p-7">
              <span className="block font-mono text-[0.68rem] uppercase tracking-[0.12em] text-text-tertiary mb-3">
                {m.label}
              </span>
              <span className="block font-sans text-[2rem] font-semibold text-ink leading-none tracking-[-0.02em]">
                {m.value}
              </span>
              <span className="block mt-2 text-[0.82rem] text-text-secondary">
                {m.sub}
              </span>
            </div>
          ))}
        </div>
      </div>

      <h2
        id="latency"
        className="font-sans text-[1.85rem] sm:text-[2.15rem] font-semibold text-ink mt-14 mb-5 leading-[1.1] tracking-[-0.025em] scroll-mt-24"
      >
        Latency and client footprint
      </h2>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        The pixel weighs{" "}
        <strong className="font-semibold text-ink">under 4 KB</strong>{" "}
        gzipped and loads asynchronously — it doesn't block document render,
        doesn't compete for main thread with critical scripts, and doesn't
        consume cookies or browser storage.
      </p>

      <blockquote
        className="my-10 border-l-[3px] pl-6 py-2 italic text-[1.15rem] leading-[1.55] text-ink-2"
        style={{ borderColor: "#2E5C8A" }}
      >
        "Measuring more data cannot come at the cost of the user. If
        measurement degrades experience, we have broken the most important
        part of the product."
        <footer className="not-italic text-[0.85rem] text-text-tertiary mt-3 font-normal">
          — Internal operating principle
        </footer>
      </blockquote>

      <div className="my-12 rounded-[14px] border border-warm-100 bg-white overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-warm-100">
          {[
            { label: "Pixel size", value: "< 4 KB", sub: "gzipped" },
            { label: "Latency P50", value: "38 ms", sub: "EU users" },
            { label: "Latency P95", value: "94 ms", sub: "EU users" },
            { label: "Blocks render", value: "No", sub: "async + defer" },
          ].map((m) => (
            <div key={m.label} className="p-5 sm:p-6">
              <span className="block font-mono text-[0.62rem] uppercase tracking-[0.12em] text-text-tertiary mb-2">
                {m.label}
              </span>
              <span className="block font-sans text-[1.5rem] sm:text-[1.75rem] font-semibold text-ink leading-none tracking-[-0.02em]">
                {m.value}
              </span>
              <span className="block mt-1.5 text-[0.76rem] text-text-secondary">
                {m.sub}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[0.85rem] text-text-tertiary mb-10 italic">
        Figures measured in production over the last quarter. Next revision:
        August 2026.
      </p>

      <h2
        id="scale"
        className="font-sans text-[1.85rem] sm:text-[2.15rem] font-semibold text-ink mt-14 mb-5 leading-[1.1] tracking-[-0.025em] scroll-mt-24"
      >
        Capacity and scaling
      </h2>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        The ingestion backend is a horizontally scalable Go service backed by
        ClickHouse. Each node processes events in batches with disk
        confirmation before returning a response — no silent event loss
        during traffic spikes.
      </p>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        Today we process traffic peaks for customers handling billions of
        events per month. The architecture is sized to absorb 5x without
        structural changes.
      </p>

      <h2
        id="availability"
        className="font-sans text-[1.85rem] sm:text-[2.15rem] font-semibold text-ink mt-14 mb-5 leading-[1.1] tracking-[-0.025em] scroll-mt-24"
      >
        Availability and SLAs
      </h2>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        Scale+ plans include a 99.9% SLA on ingestion and dashboard
        availability. Twelve-month history is published at{" "}
        <a
          href="https://status.sealmetrics.com"
          className="text-brand hover:text-brand-hover no-underline border-b border-brand/40"
        >
          status.sealmetrics.com
        </a>
        .
      </p>

      <h2
        id="what-we-dont-measure"
        className="font-sans text-[1.85rem] sm:text-[2.15rem] font-semibold text-ink mt-14 mb-5 leading-[1.1] tracking-[-0.025em] scroll-mt-24"
      >
        What we don't measure
      </h2>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        By architecture, there are things the pixel{" "}
        <em className="italic-accent">cannot</em> capture — not in this
        chapter, not in any other. We do not identify individuals, we do not
        reconstruct cross-device sessions, and we do not fingerprint. That
        boundary is covered in{" "}
        <Link
          href="/open/what-we-wont-do"
          className="text-brand hover:text-brand-hover no-underline border-b border-brand/40"
        >
          chapter 09
        </Link>
        .
      </p>
    </div>
  );
}

/* ============================================
   CHAPTER 09 · What we won't do
   ============================================ */
function ChapterNineBody() {
  const limits = [
    {
      id: "no-multi-touch",
      number: "01",
      title: "We won't do multi-touch attribution",
      body: (
        <>
          <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
            The pitch for multi-touch is seductive: every channel that
            contributed to a conversion gets credit, weighted by some model —
            linear, time-decay, position-based, data-driven. The math is
            sophisticated. The marketing decks are colorful.
          </p>
          <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
            The problem is the input. Multi-touch attribution requires
            per-user, cross-session, cross-device journey reconstruction. In
            Europe, after consent rejection, ITP, and ad blockers, the
            population you can actually stitch together is the same consented,
            unblocked fraction that GA4 sees —{" "}
            <Link
              href="/open/what-complete-data-means"
              className="text-brand hover:text-brand-hover no-underline border-b border-brand/40"
            >
              about 13% in the compounded worst case
            </Link>
            . Multi-touch on that fraction is multi-touch on a biased sample
            of consenting Chrome users. The output isn't measurement — it's an
            algorithm hallucinating about what everyone else did.
          </p>
          <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
            We do last-click on data without consent gaps. It's an older model. It's a
            less impressive demo. It moves budget more correctly because it
            isn't making up the inputs.
          </p>
        </>
      ),
      instead:
        "Last-click attribution on measured events without consent gaps, with channel-level revenue resolution.",
    },
    {
      id: "no-sessions",
      number: "02",
      title: "We won't reconstruct sessions",
      body: (
        <>
          <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
            Session reconstruction stitches events together by user identifier
            into a chronological journey — landing page, time on site, scroll
            depth, interaction sequence, exit or conversion. It's the data
            model behind customer journey analytics, funnel diagrams, and
            session replay tools.
          </p>
          <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
            To do it, you need a persistent identifier per visitor — cookies,
            localStorage, fingerprint, login state. Each one creates
            regulatory exposure under ePrivacy article 5(3) and reintroduces
            the very data we exited to avoid.
          </p>
          <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
            What we do instead is aggregate event measurement. We can tell you
            that 4,221 visitors landed on /product-X yesterday, that 312 added
            to cart, that 47 converted, broken down by source and device. We
            cannot tell you that visitor #15732 spent 4:12 on the page and
            scrolled to 87% before leaving. That data does not exist in our
            system.
          </p>
          <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
            If session-level inspection is critical to your workflow, tools
            like Hotjar, FullStory, or Contentsquare were built for it. We
            were not.
          </p>
        </>
      ),
      instead:
        "Aggregate event measurement — counts, revenue, conversion by channel and device, never per individual.",
    },
    {
      id: "no-individuals",
      number: "03",
      title: "We won't identify individuals",
      body: (
        <>
          <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
            Identifying individuals — by login, email hash, deterministic
            fingerprint, or enriched third-party data — is the foundation of
            most "modern" analytics stacks. It's how CDPs work. It's how
            Salesforce, HubSpot, and Segment build profiles.
          </p>
          <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
            We won't store an identifier that can be resolved back to a
            person. Not pseudonymously. Not "hashed but reversible". Not
            "under legitimate interest". This is structural — there is no
            personal data in our database to expose, to subpoena, to request
            under GDPR access rights, or to leak.
          </p>
          <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
            The trade-off is real: we cannot do retargeting cohorts, CDP
            enrichment, or personalized email triggers. Those workflows
            belong in tools designed for them, with the legal framework they
            require — and they are downstream of measurement, not part of it.
          </p>
        </>
      ),
      instead:
        "Anonymous event measurement at population scale. No identifier survives long enough to resolve to a person.",
    },
    {
      id: "no-fingerprint",
      number: "04",
      title: "We won't fingerprint",
      body: (
        <>
          <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
            Browser fingerprinting — combining user agent, screen resolution,
            fonts, canvas hash, audio context, and a few dozen other signals
            into a near-unique browser identifier — is the loophole many
            "cookieless" tools quietly use to keep cross-session tracking
            working. Under ePrivacy article 5(3), it is legally equivalent to
            setting a cookie and requires consent.
          </p>
          <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
            We strip fingerprint vectors before storage. User agents are
            generalised to family and version. IPs are not stored. Canvas,
            fonts, and audio context are never collected. What lands in
            ClickHouse cannot be re-identified to a browser, let alone to a
            person.
          </p>
          <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
            This constraint costs us a little — some bot-detection signals
            would be easier with fingerprint inputs, so we use other
            heuristics instead. We will not use the technique just because it
            works.
          </p>
        </>
      ),
      instead:
        "Server-side validation with non-identifying heuristics. Cookieless in name and in fact.",
    },
  ];

  return (
    <div className="prose-open">
      <p className="text-[1.25rem] leading-[1.6] text-ink-2 mb-8 first-letter:font-semibold first-letter:text-[2.4em] first-letter:float-left first-letter:mr-2 first-letter:leading-[1] first-letter:text-ink">
        Most analytics vendors talk about what they do. This chapter is about
        what we don't — and why. Each section names a feature you might
        expect, says we won't ship it, and explains the reasoning. Together
        they describe the shape of the product as much as any feature list
        could.
      </p>

      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-14">
        None of what follows is a technical limitation. Each "no" is a feature
        we could ship and a market we could expand into. We are{" "}
        <em className="italic-accent">choosing not to</em>. This chapter
        exists so that you know which trade-off you are buying into before you
        sign anything.
      </p>

      {limits.map((limit) => (
        <section
          key={limit.id}
          className="mt-16 pt-12 border-t border-warm-100 first:border-t-0 first:pt-0 first:mt-0"
        >
          <div className="flex items-baseline gap-5 mb-6">
            <span
              aria-hidden="true"
              className="font-mono text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-text-tertiary shrink-0"
            >
              × {limit.number}
            </span>
            <h2
              id={limit.id}
              className="font-sans text-[1.95rem] sm:text-[2.35rem] font-semibold text-ink leading-[1.1] tracking-[-0.025em] scroll-mt-24"
            >
              {limit.title}
            </h2>
          </div>

          {limit.body}

          <div className="mt-7 pl-5 border-l-2 border-brand">
            <span className="block font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-brand mb-1.5">
              What we do instead
            </span>
            <p className="text-[0.95rem] leading-[1.55] text-ink-2 m-0">
              {limit.instead}
            </p>
          </div>
        </section>
      ))}

      {/* Closing meta-section · dark embedded slab */}
      <section className="mt-20 pt-0">
        <div
          className="relative overflow-hidden rounded-[20px] section-dark text-dark-text"
          style={{ background: "#0E0E0C" }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(70% 60% at 80% 0%, rgba(45,139,109,0.45) 0%, transparent 60%)",
            }}
          />
          <div className="relative p-8 sm:p-12">
            <span
              className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em]"
              style={{ color: "#E8B84B" }}
            >
              × 05 · Why this is a position
            </span>
            <h2
              id="why"
              className="mt-5 font-sans text-[1.95rem] sm:text-[2.35rem] font-semibold leading-[1.15] tracking-[-0.025em] text-dark-text scroll-mt-24"
            >
              Each "no" is the shape of the product.
            </h2>
            <p className="mt-7 text-[1.05rem] leading-[1.75] text-dark-text-secondary">
              If we shipped multi-touch on partial data, we would sell a
              hallucination. If we reconstructed sessions, we would introduce
              regulatory exposure for our customers. If we identified
              individuals, we would become responsible for data we should not
              hold. If we fingerprinted, we would be cookieless in name only.
            </p>
            <p className="mt-5 text-[1.05rem] leading-[1.75] text-dark-text-secondary">
              Each refusal makes the product narrower. Each refusal also makes
              it{" "}
              <span
                className="italic font-normal"
                style={{ color: "#E8B84B" }}
              >
                defensible
              </span>{" "}
              — by us, in front of a DPO, in front of an auditor, in front of
              an algorithm being held accountable for what it optimised.
            </p>
            <p className="mt-5 text-[1.05rem] leading-[1.75] text-dark-text-secondary">
              You can build a wider product or a defensible one. We chose the
              second.
            </p>
          </div>
        </div>
      </section>

      <p className="mt-14 text-[0.9rem] text-text-tertiary italic">
        If the vocabulary in this chapter sounded specific, that's because it
        is. The{" "}
        <Link
          href="/open/glossary"
          className="text-brand hover:text-brand-hover no-underline border-b border-brand/40"
        >
          glossary
        </Link>{" "}
        defines every term we use across Open — including the ones where we
        disagree with the rest of the industry.
      </p>
    </div>
  );
}

/* ============================================
   CHAPTER 03 · What complete data means
   ============================================ */
function ChapterThreeBody() {
  const cascade = [
    {
      stage: "Start",
      visitors: 100,
      label: "real EU visitors",
      detail: "Every person who actually loaded the page.",
      delta: null,
    },
    {
      stage: "Stage 01 · Consent",
      visitors: 45,
      label: "after consent rejection",
      detail:
        "Average rejection rate across EU enterprise CMPs is ~55% — outright rejects, banner closures, and reject-all preferences combined.",
      delta: "−55%",
    },
    {
      stage: "Stage 02 · Ad blockers",
      visitors: 27,
      label: "after ad blockers",
      detail:
        "Of those who accepted, roughly 40% run uBlock, AdGuard, Brave Shields, or Pi-hole. Analytics requests are stripped silently — the user sees your site, GA4 does not see the user.",
      delta: "−40%",
    },
    {
      stage: "Stage 03 · Browser restrictions",
      visitors: 13,
      label: "remain in GA4",
      detail:
        "Safari ITP, Firefox Total Cookie Protection, and Brave's defaults expire or block the cookies GA4 needs to keep sessions intact. Of the remaining 27, roughly half use browsers that interfere materially.",
      delta: "−52%",
    },
  ];

  const tiers = [
    {
      label: "Tier 01",
      title: "Enterprise analytics",
      examples: "GA360, Adobe Analytics, Piwik PRO, Sealmetrics",
      note: "Six- and seven-figure decisions. Complete data, compliance posture, and audit trails are non-negotiable.",
      active: true,
    },
    {
      label: "Tier 02",
      title: "Lightweight privacy analytics",
      examples: "Plausible, Fathom, Simple Analytics, Umami",
      note: "€9–50/month. Page-level metrics, beautiful UIs, zero PII. Excellent at what they do — and not built for revenue attribution or billion-event datasets.",
      active: false,
    },
    {
      label: "Tier 03",
      title: "Free with sampling",
      examples: "GA4 default",
      note: "Free at the entry tier. Constraints (consent loss, sampling, modeling) compound at scale.",
      active: false,
    },
  ];

  return (
    <div className="prose-open">
      <p className="text-[1.25rem] leading-[1.6] text-ink-2 mb-8 first-letter:font-semibold first-letter:text-[2.4em] first-letter:float-left first-letter:mr-2 first-letter:leading-[1] first-letter:text-ink">
        "Complete data" is one of those phrases that sounds obvious until you
        try to define it. This chapter draws the line — what we mean when we
        say Sealmetrics doesn't depend on consent, what GA4 means when it shows the
        dashboard you've been reading, and why the difference is a budget
        problem, not a vocabulary one.
      </p>

      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-14">
        Written for measurement leads, performance marketers, and anyone who
        has to defend a conversion number to <span className="italic-accent">finance</span>.
      </p>

      {/* Section 1 · The cascade */}
      <h2
        id="the-cascade"
        className="font-sans text-[1.85rem] sm:text-[2.15rem] font-semibold text-ink mt-14 mb-5 leading-[1.1] tracking-[-0.025em] scroll-mt-24"
      >
        Where the 13% comes from
      </h2>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        The 13% figure is not a slogan, and it is not a measurement either.
        It is a model: the three-stage cascade that every analytics tool
        relying on client-side cookies is exposed to, with every stage
        hitting at once.
      </p>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        Start with 100 real EU visitors arriving at your site. Each stage
        applies to the survivors of the previous one — the cascade is{" "}
        <em className="italic-accent">multiplicative</em>, not additive.
      </p>

      {/* Cascade visual */}
      <div className="my-12 rounded-[14px] border border-warm-100 bg-white overflow-hidden">
        <div className="grid grid-cols-1 divide-y divide-warm-100">
          {cascade.map((row) => (
            <div
              key={row.stage}
              className="p-6 sm:p-7 grid grid-cols-[auto_1fr] sm:grid-cols-[120px_140px_1fr] gap-x-6 gap-y-3 items-baseline"
            >
              <div className="col-span-2 sm:col-span-1">
                <span className="block font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-text-tertiary mb-1">
                  {row.stage}
                </span>
                {row.delta && (
                  <span className="font-mono text-[0.78rem] font-semibold text-coral">
                    {row.delta}
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-sans text-[2.25rem] sm:text-[2.5rem] font-semibold text-ink leading-none tracking-[-0.025em]">
                  {row.visitors}
                </span>
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-text-tertiary">
                  / 100
                </span>
              </div>
              <p className="text-[0.92rem] leading-[1.55] text-text-secondary col-span-2 sm:col-span-1 m-0">
                <strong className="font-semibold text-ink-2">
                  {row.label}.
                </strong>{" "}
                {row.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        Which is why "we'll improve our consent UX" doesn't recover the loss
        — it only narrows the first stage. Even a perfect 80% accept rate
        leaves you at roughly 20% of real traffic after the other two stages
        apply.
      </p>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        So read the 13% as the compounded worst case, not as the typical
        result. Here is what a real store showed. Incapto, a specialty coffee
        brand on Shopify, ran GA4 with Consent Mode and Sealmetrics side by
        side for 48 days. GA4 did not record 29% of visits or 45% of
        pageviews. Sealmetrics, reconciled against Shopify&apos;s own orders,
        recorded 96% of real orders and 97% of revenue. The method and the
        full figures are in{" "}
        <Link
          href="/case-studies/incapto"
          className="text-brand hover:text-brand-hover no-underline border-b border-brand/40"
        >
          the case study
        </Link>
        .
      </p>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        The more useful finding is where the gap sat. Against GA4, Sealmetrics
        saw 11% more direct traffic, 62% more organic search, 73% more
        affiliate and 133% more organic social. The channels that bring new
        people in lose the most; direct loses the least, so in GA4 it looks
        more important than it is. That is a budget problem before it is a
        measurement one.
      </p>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        You can run the model with your own inputs using our{" "}
        <Link
          href="/data-loss-calculator"
          className="text-brand hover:text-brand-hover no-underline border-b border-brand/40"
        >
          data loss calculator
        </Link>
        .
      </p>

      <p className="text-[0.85rem] text-text-tertiary mb-10 italic">
        Cascade percentages are EU average rates used as model inputs.
        The compounded 13% is a worst-case model, not a
        measured average; the Incapto figures are measured. Methodology in
        our{" "}
        <Link
          href="/blog/why-ga4-shows-13pct-eu-traffic"
          className="text-brand hover:text-brand-hover no-underline border-b border-brand/40"
        >
          published analysis
        </Link>
        . Last revised May 2026.
      </p>

      {/* Section 2 · Sampling */}
      <h2
        id="sampling-vs-complete"
        className="font-sans text-[1.85rem] sm:text-[2.15rem] font-semibold text-ink mt-14 mb-5 leading-[1.1] tracking-[-0.025em] scroll-mt-24"
      >
        Sampling vs complete measurement
      </h2>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        What reaches the dashboard is already partial. The dashboard, in
        turn, samples it.
      </p>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        GA4 applies sampling when a query exceeds certain thresholds — by
        default, 10 million events per query in the standard tier. Above
        that, it analyses a subset of events and extrapolates the result.
        The report is presented as a measurement. It is an estimate of a
        measurement.
      </p>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        The sampling rate is not always surfaced. Some reports show a
        "sampled data" warning; many do not. For high-volume eCommerce sites
        with deep filters, the analysed ratio can drop below{" "}
        <strong className="font-semibold text-ink">1%</strong> of events on
        complex queries — a sample of a sample.
      </p>

      <blockquote
        className="my-10 border-l-[3px] pl-6 py-2 italic text-[1.15rem] leading-[1.55] text-ink-2"
        style={{ borderColor: "#2E5C8A" }}
      >
        "What appears as a 1.3% conversion rate is a calculation on a sample
        of a fraction of the real population. Defending that number to a CFO
        is a coin toss dressed as analytics."
      </blockquote>

      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        Sealmetrics does not sample. Every event lands in ClickHouse at full
        resolution. A query against 4 billion events queries 4 billion
        events. We pay for the storage and the compute so that the answer
        matches the question.
      </p>

      {/* Section 3 · Modeling */}
      <h2
        id="modeling-vs-measuring"
        className="font-sans text-[1.85rem] sm:text-[2.15rem] font-semibold text-ink mt-14 mb-5 leading-[1.1] tracking-[-0.025em] scroll-mt-24"
      >
        Modeling vs measuring
      </h2>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        When GA4 cannot measure — because consent was rejected, the ad
        blocker stripped the request, the cookie expired — it does not leave
        the cell empty. It models.
      </p>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        "Modelled conversions", "behavioural modelling", "consent mode v2":
        all variants of the same mechanism. A regression trained on the
        events GA4 can see predicts the events it cannot. The output is
        reported as a number, indistinguishable in the UI from anything that
        was actually observed.
      </p>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        Modelling has legitimate uses — directional analysis, time-series
        smoothing, exploratory work. Optimising a media budget against
        modelled conversions is not one of them. The bidding algorithm
        interprets a modelled conversion as a real one. The budget shifts
        toward whichever channel scored highest in the model. The channel
        that drove the actual converter is, by definition, the one whose
        data was missing — and the budget never reaches it.
      </p>

      {/* Definition card */}
      <div className="my-12 rounded-[14px] border border-warm-100 bg-warm-50/60 p-7">
        <span className="block font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-brand mb-3">
          Definition
        </span>
        <p className="font-sans text-[1.25rem] leading-[1.5] text-ink m-0 mb-3 font-medium">
          <em className="italic-accent">Complete</em> means measured.
        </p>
        <p className="text-[0.98rem] leading-[1.65] text-ink-2 m-0">
          Sampled is a degradation. Modelled is an inference. Each step away
          from <em>measured</em> is a step further from a decision being
          defensible. Wherever the phrase "complete data" appears in Open, it
          means: measured server-side, before any of the three losses fires,
          on visitors who accept and reject the banner alike.
        </p>
      </div>

      {/* Section 4 · Where we sit */}
      <h2
        id="where-we-sit"
        className="font-sans text-[1.85rem] sm:text-[2.15rem] font-semibold text-ink mt-14 mb-5 leading-[1.1] tracking-[-0.025em] scroll-mt-24"
      >
        Where Sealmetrics sits
      </h2>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        Three tiers operate in analytics today. The category matters because
        comparisons across tiers are dishonest — and most published
        comparisons quietly are.
      </p>

      <div className="my-10 rounded-[14px] border border-warm-100 bg-white overflow-hidden">
        <div className="grid grid-cols-1 divide-y divide-warm-100">
          {tiers.map((tier) => (
            <div
              key={tier.label}
              className={`p-7 ${
                tier.active
                  ? "bg-warm-50/40 border-l-[3px] border-l-brand"
                  : ""
              }`}
            >
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-text-tertiary">
                  {tier.label}
                </span>
                {tier.active && (
                  <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-brand">
                    · we operate here
                  </span>
                )}
              </div>
              <h3 className="font-sans text-[1.3rem] font-semibold text-ink leading-snug mb-1">
                {tier.title}
              </h3>
              <p className="text-[0.85rem] text-text-tertiary font-mono mb-3 m-0">
                {tier.examples}
              </p>
              <p className="text-[1rem] leading-[1.7] text-ink-2 m-0">
                {tier.note}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        Sealmetrics competes in Tier 1. The lightweight tools are not
        competitors — they are the right choice for a different problem. If
        you are evaluating Sealmetrics, you are not choosing between us and
        Plausible. You are choosing between complete data and the budget
        consequences of the alternative.
      </p>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        The rest of Open builds on this definition.{" "}
        <Link
          href="/open/architecture-and-performance"
          className="text-brand hover:text-brand-hover no-underline border-b border-brand/40"
        >
          Chapter 05
        </Link>{" "}
        describes the infrastructure that makes it possible.{" "}
        <Link
          href="/open/what-we-wont-do"
          className="text-brand hover:text-brand-hover no-underline border-b border-brand/40"
        >
          Chapter 09
        </Link>{" "}
        lists what we will not do with the data we collect. The chapter on
        GDPR compliance — and the one on how the pixel works internally —
        are in progress; in the meantime, the legal grounding lives at{" "}
        <Link
          href="/security"
          className="text-brand hover:text-brand-hover no-underline border-b border-brand/40"
        >
          /security
        </Link>
        .
      </p>

      <p className="mt-14 text-[0.9rem] text-text-tertiary italic">
        Continue with{" "}
        <Link
          href="/open/architecture-and-performance"
          className="text-brand hover:text-brand-hover no-underline border-b border-brand/40"
        >
          chapter 05 — Architecture and performance
        </Link>
        .
      </p>
    </div>
  );
}

/* ============================================
   CHAPTER 06 · GDPR by architecture
   ============================================ */
function ChapterSixBody() {
  const comparison = [
    { req: "Cookie consent banner", ga4: "Required", us: "Not required" },
    { req: "Cookie / localStorage", ga4: "Required", us: "Never set" },
    { req: "Personal-data DPA", ga4: "Self-service", us: "Signed by default" },
    { req: "US transfer SCCs", ga4: "Required", us: "N/A — no visitor-data transfer" },
    { req: "Transfer Impact Assessment", ga4: "Required", us: "N/A — no visitor-data transfer" },
    { req: "ePrivacy Art. 5(3) basis", ga4: "Through consent", us: "By architecture" },
    { req: "AEPD self-assessment", ga4: "Fails", us: "Passes" },
  ];

  return (
    <div className="prose-open">
      <p className="text-[1.25rem] leading-[1.6] text-ink-2 mb-8 first-letter:font-semibold first-letter:text-[2.4em] first-letter:float-left first-letter:mr-2 first-letter:leading-[1] first-letter:text-ink">
        Most analytics vendors meet GDPR by adding things — consent banners,
        cookie disclaimers, processing agreements, sub-processor lists,
        transfer impact assessments. The compliance budget grows. The product
        stays the same.
      </p>

      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        We took the opposite route. The product was designed for GDPR from
        the architecture up, so the approach is{" "}
        <span className="italic-accent">structural</span> — there is no
        personal data to disclose, no cookie to consent to, no cross-border
        transfer of visitor data to justify. The compliance work lives in the
        architecture, not in an overlay on top of it. That is our own
        assessment, not a certification.
      </p>

      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-14">
        This chapter is written for DPOs, legal teams, and procurement leads
        — the people who have to sign that everything checks out. The
        signable artefacts live at{" "}
        <Link
          href="/security"
          className="text-brand hover:text-brand-hover no-underline border-b border-brand/40"
        >
          /security
        </Link>
        ; this is the reasoning behind them.
      </p>

      {/* Section 1 · GDPR */}
      <h2
        id="gdpr-architecture"
        className="font-sans text-[1.85rem] sm:text-[2.15rem] font-semibold text-ink mt-14 mb-5 leading-[1.1] tracking-[-0.025em] scroll-mt-24"
      >
        Designed for GDPR from the architecture up, not by permission
      </h2>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        GDPR distinguishes six lawful bases for processing personal data:
        consent (Art. 6(1)(a)), contract, legal obligation, vital interests,
        public interest, and legitimate interest (Art. 6(1)(f)).
      </p>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        The default route in analytics is consent — the user agrees to be
        tracked, the cookie fires, the data is processed. This is what GA4
        requires. It is also what fails: on average, around 55% of EU users
        reject consent (see{" "}
        <Link
          href="/open/what-complete-data-means"
          className="text-brand hover:text-brand-hover no-underline border-b border-brand/40"
        >
          chapter 03
        </Link>
        ). Stack ad blockers and browser restrictions on top, and in the
        worst case the measurable population falls to about 13% of real
        traffic.
      </p>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        Sealmetrics does not rely on consent because there is no personal
        data to consent to. What we measure is aggregate event data — a
        request hit /product-X, originated from a referrer, on a device
        whose fingerprint{" "}
        <em className="italic-accent">we do not collect</em>. There is no
        identifier that resolves to a person. The data is not personal data
        within the meaning of GDPR Article 4(1). Therefore none of Article
        6's lawful bases applies — because Article 6 concerns personal data,
        and we do not process any.
      </p>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        For the narrow set of fields where pseudonymisation is technically
        possible (e.g., a visit-scoped ID used for last-click attribution
        within a single visit, then discarded), the lawful basis is Article
        6(1)(f) — legitimate interest in measuring a customer's own website.
        The Legitimate Interest Assessment (LIA) is documented in the DPA
        package.
      </p>

      <div className="my-12 rounded-[14px] border border-warm-100 bg-warm-50/60 p-7">
        <span className="block font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-brand mb-3">
          External framework reference
        </span>
        <p className="text-[1rem] leading-[1.7] text-ink-2 m-0">
          The Spanish AEPD has published a framework specifically for
          cookieless analytics under legitimate interest. The French CNIL
          maintains an equivalent self-assessment for measurement tools that
          operate without consent (the &ldquo;exempted measurement&rdquo;
          framework). Sealmetrics is built to satisfy both. Where you have a
          DPO, these are the documents they will ask about.
        </p>
      </div>

      {/* Section 2 · ePrivacy */}
      <h2
        id="eprivacy"
        className="font-sans text-[1.85rem] sm:text-[2.15rem] font-semibold text-ink mt-14 mb-5 leading-[1.1] tracking-[-0.025em] scroll-mt-24"
      >
        ePrivacy and the cookie question
      </h2>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        GDPR governs personal data. ePrivacy governs{" "}
        <em className="italic-accent">access to terminal equipment</em>. They
        overlap but they are not the same regulation, and a tool can be
        GDPR-clean while being ePrivacy-dirty.
      </p>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        ePrivacy Article 5(3) is the relevant clause. Storing or accessing
        information on a user's terminal equipment requires prior consent —
        unless it is strictly necessary for a service the user requested.
      </p>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        Cookies trigger Article 5(3). So do localStorage, sessionStorage,
        IndexedDB, the Cache API, and — crucially — fingerprinting techniques
        that read back terminal information. ePrivacy does not care whether
        the data is personal; it cares whether the technique accesses the
        terminal.
      </p>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        Sealmetrics does none of these. The pixel sends a single HTTPS POST
        with the event payload. No terminal storage is set, no terminal
        storage is read. The user-agent string is parsed server-side and
        immediately generalised to browser family plus major version. IPs
        are not stored. Canvas, audio context, font lists, screen
        resolution, plugin lists — none are collected.
      </p>

      <blockquote
        className="my-10 border-l-[3px] pl-6 py-2 italic text-[1.15rem] leading-[1.55] text-ink-2"
        style={{ borderColor: "#2E5C8A" }}
      >
        "There is no terminal access. Article 5(3) does not apply. No
        consent banner is required for measurement."
        <footer className="not-italic text-[0.85rem] text-text-tertiary mt-3 font-normal">
          — The one-line summary of this section
        </footer>
      </blockquote>

      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        The legal-and-product boundary that produces this conclusion is the
        same one{" "}
        <Link
          href="/open/what-we-wont-do"
          className="text-brand hover:text-brand-hover no-underline border-b border-brand/40"
        >
          chapter 09
        </Link>{" "}
        covers from the product-design side. Engineering and legal arrived
        at the same line independently.
      </p>

      {/* Section 3 · Schrems II */}
      <h2
        id="schrems-ii"
        className="font-sans text-[1.85rem] sm:text-[2.15rem] font-semibold text-ink mt-14 mb-5 leading-[1.1] tracking-[-0.025em] scroll-mt-24"
      >
        Schrems II and data transfers
      </h2>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        Schrems II (Court of Justice EU, July 2020) invalidated the Privacy
        Shield framework that previously legitimised US-based processing of
        European personal data. Post-Schrems II, transferring personal data
        to the United States — including via US cloud sub-processors —
        requires Standard Contractual Clauses (SCCs) plus a Transfer Impact
        Assessment (TIA) demonstrating that US surveillance laws do not
        compromise the data subject's rights.
      </p>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        In practice this is impossible to demonstrate for most setups. The
        US Cloud Act, FISA Section 702, and Executive Order 12333 give US
        authorities broad access to data held by US companies regardless of
        where the servers physically sit. The Data Privacy Framework —
        Privacy Shield's successor — is currently being challenged on the
        same grounds.
      </p>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        Sealmetrics avoids this entirely. All visitor-data processing — pixel
        ingestion, validation, attribution, storage — runs in owned
        infrastructure in{" "}
        <strong className="font-semibold text-ink">Dublin, Ireland</strong>.
        Zero US sub-processors for the data plane. No AWS, no Google Cloud,
        no Snowflake. CDN edge sits on EU/UK PoPs operated by EU providers.
        See{" "}
        <Link
          href="/open/architecture-and-performance"
          className="text-brand hover:text-brand-hover no-underline border-b border-brand/40"
        >
          chapter 05
        </Link>{" "}
        for the infrastructure detail.
      </p>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        The corresponding TIA is not a defensive document we write to
        justify a decision. There is no visitor-data transfer to assess.
      </p>

      {/* Comparison table */}
      <h2
        id="dpa-tpsr"
        className="font-sans text-[1.85rem] sm:text-[2.15rem] font-semibold text-ink mt-14 mb-5 leading-[1.1] tracking-[-0.025em] scroll-mt-24"
      >
        DPA and TPSR package
      </h2>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        Before the document set, a side-by-side that DPOs tend to ask for
        early — what GA4 needs to remain compliant for an EU eCommerce
        deployment, versus what Sealmetrics needs.
      </p>

      <div className="my-10 rounded-[14px] border border-warm-100 bg-white overflow-hidden">
        <div className="grid grid-cols-[1.4fr_1fr_1fr] divide-y divide-warm-100">
          <div className="p-4 sm:p-5 bg-warm-50/60 border-b border-warm-100">
            <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-text-tertiary">
              Requirement
            </span>
          </div>
          <div className="p-4 sm:p-5 bg-warm-50/60 border-b border-warm-100 border-l border-l-warm-100">
            <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-text-tertiary">
              GA4
            </span>
          </div>
          <div className="p-4 sm:p-5 bg-warm-50/60 border-b border-warm-100 border-l border-l-warm-100">
            <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-brand">
              Sealmetrics
            </span>
          </div>
          {comparison.map((row) => (
            <div key={row.req} className="contents">
              <div className="p-4 sm:p-5 text-[0.92rem] text-ink-2 leading-snug">
                {row.req}
              </div>
              <div className="p-4 sm:p-5 text-[0.92rem] text-text-secondary leading-snug border-l border-l-warm-100">
                {row.ga4}
              </div>
              <div className="p-4 sm:p-5 text-[0.92rem] text-ink leading-snug border-l border-l-warm-100 font-medium">
                {row.us}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        Every Scale plan ships with a Data Processing Agreement (DPA),
        signed before any data flows. We are the data processor; you are the
        controller. The DPA covers scope of processing, the lawful basis
        (legitimate interest, where applicable), categories of data, the
        sub-processor list (zero outside the EEA on visitor data), technical and
        organisational measures, data-subject rights handling, and breach
        notification timelines.
      </p>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        Alongside, we ship a Third-Party Security Review (TPSR) package —
        the document set procurement and security teams typically request.
        It is bundled, not bespoke per customer:
      </p>
      <ul className="text-[1.02rem] leading-[1.7] text-ink-2 mb-10 pl-0 list-none space-y-2">
        {[
          "Information security policy summary",
          "Technical and organisational measures (TOMs)",
          "Sub-processor list, with separate disclosure for EEA-only processors",
          "Penetration test report (current cadence: annual)",
          "Incident response plan",
          "Business continuity and disaster recovery summary",
          "Records of Processing Activities (ROPA) excerpt",
          "Legitimate Interest Assessment (LIA) for the relevant processing",
        ].map((item) => (
          <li key={item} className="pl-5 relative">
            <span
              aria-hidden="true"
              className="absolute left-0 top-[0.7em] w-2 h-px bg-ink-mute"
            />
            {item}
          </li>
        ))}
      </ul>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        Sent under NDA at the start of a procurement evaluation. Most of it
        is already on{" "}
        <Link
          href="/security"
          className="text-brand hover:text-brand-hover no-underline border-b border-brand/40"
        >
          /security
        </Link>{" "}
        if you want a head start before the NDA.
      </p>

      <p className="mt-14 text-[0.9rem] text-text-tertiary italic">
        Continue with{" "}
        <Link
          href="/open/how-we-price"
          className="text-brand hover:text-brand-hover no-underline border-b border-brand/40"
        >
          chapter 07 — How we price
        </Link>
        .
      </p>
    </div>
  );
}

/* ============================================
   CHAPTER 02 · Who we build for
   ============================================ */
function ChapterTwoBody() {
  const numbers = [
    {
      figure: "29%",
      label: "of visits never reached GA4",
      detail:
        "Measured, not modelled: 48 days of GA4 and Sealmetrics side by side on Incapto\u2019s Shopify store. The gap left no trace inside GA4 — nothing in the dashboard flagged it.",
    },
    {
      figure: "45%",
      label: "of pageviews never reached GA4",
      detail:
        "The missing visits were not ordinary visits: they browsed twice as deep as the ones GA4 recorded. The sales still show up in the order system. They do not show up next to the channel that drove them.",
    },
    {
      figure: "14%",
      label: "of recorded visits had no usable origin",
      detail:
        "Even the traffic GA4 did see arrived without a channel anyone could decide on — against 0.3% in Sealmetrics. Credit drifts to whatever was measurable: usually direct, branded search, or whichever platform self-reports most aggressively.",
    },
  ];

  const personas = [
    {
      role: "CMO / VP Marketing",
      owns: "The budget that gets misallocated.",
      yes: "When the conversation moves from \u201Canalytics tool\u201D to \u201Cthe math that makes the budget defensible to the rest of the executive team\u201D.",
    },
    {
      role: "Head of Growth / Performance Marketing",
      owns: "The day-to-day decisions GA4 informs.",
      yes: "On the difference between last-click on complete data and modelled multi-touch on the visible fraction.",
    },
    {
      role: "Head of Analytics / Head of Data",
      owns: "Dashboard reliability and data quality.",
      yes: "On the architecture, the sub-processor list, query-time freshness, and exportability — not on the slides.",
    },
  ];

  const fit = [
    "Material digital marketing spend",
    "Measures transactions, signups, or revenue events",
    "Has stopped accepting GA4 as ground truth",
    "Wants defensibility, not just dashboards",
    "Will add a measurement layer alongside the existing stack",
  ];

  const dontFit = [
    "Comfortable optimising on platform-reported numbers",
    "Brand or impression metrics are the primary KPI",
    "Paid acquisition spend is too small to move the budget",
    "Needs session replay or individual-level tracking",
    "Mobile-app-only — we measure web",
  ];

  const partners = [
    {
      name: "Product Hackers",
      strength:
        "Growth-marketing-led implementations. Strong on cross-channel attribution and CRO workflows.",
    },
    {
      name: "3dids",
      strength:
        "Technical implementations. Strong on tag management, data-layer architecture, and CMP migrations.",
    },
    {
      name: "Ayesa",
      strength:
        "Enterprise consulting partner for larger transformations across multiple business units.",
    },
    {
      name: "Datarmony",
      strength:
        "Data and analytics consultancy. Strong on measurement strategy, dashboard design, and bridging analytics with business decisions.",
    },
  ];

  return (
    <div className="prose-open">
      <p className="text-[1.25rem] leading-[1.6] text-ink-2 mb-8 first-letter:font-semibold first-letter:text-[2.4em] first-letter:float-left first-letter:mr-2 first-letter:leading-[1] first-letter:text-ink">
        Every company running digital marketing already knows the problem.
        A large share of their analytics data is missing — on one store
        measured side by side for 48 days, 29% of visits never reached GA4.
        What does reach the dashboard carries a channel mix that is wrong
        in ways that cannot be untangled after the fact.
      </p>

      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-14">
        This chapter is not about teaching you that — you already know it.
        It is about the line between companies that have made peace with
        broken data and companies that{" "}
        <span className="italic-accent">refuse to</span>. We build for the
        second group, regardless of sector, country, or revenue band.
      </p>

      {/* Section 1 · The numbers */}
      <h2
        id="the-numbers"
        className="font-sans text-[1.85rem] sm:text-[2.15rem] font-semibold text-ink mt-14 mb-5 leading-[1.1] tracking-[-0.025em] scroll-mt-24"
      >
        The numbers everyone already knows
      </h2>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        The pain shows up in three layers. Each one is measurable, broadly
        known among practitioners, and not specific to any industry or
        geography.
      </p>

      <div className="my-10 rounded-[14px] border border-warm-100 bg-white overflow-hidden">
        <div className="grid grid-cols-1 divide-y divide-warm-100">
          {numbers.map((n, i) => (
            <div
              key={n.figure}
              className="p-6 sm:p-7 grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-x-7 gap-y-3 items-baseline"
            >
              <div>
                <span className="block font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-text-tertiary mb-2">
                  Layer {String(i + 1).padStart(2, "0")}
                </span>
                <span className="block font-sans text-[2.5rem] font-semibold text-ink leading-none tracking-[-0.025em]">
                  {n.figure}
                </span>
              </div>
              <div>
                <p className="text-[1rem] font-medium text-ink leading-snug m-0 mb-1.5">
                  {n.label}
                </p>
                <p className="text-[0.92rem] leading-[1.6] text-text-secondary m-0">
                  {n.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        The compound result: marketing teams optimise budget against a
        sample that is incomplete, biased, and wrongly labelled — and they
        know it. The cascade behind the first number is detailed in{" "}
        <Link
          href="/open/what-complete-data-means"
          className="text-brand hover:text-brand-hover no-underline border-b border-brand/40"
        >
          chapter 03
        </Link>
        .
      </p>

      {/* Section 2 · The operator */}
      <h2
        id="the-operator"
        className="font-sans text-[1.85rem] sm:text-[2.15rem] font-semibold text-ink mt-14 mb-5 leading-[1.1] tracking-[-0.025em] scroll-mt-24"
      >
        The operator we build for
      </h2>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        The differentiator is not the size of the company. It is not the
        industry. It is not the headquarters. Companies that fit our profile
        operate in every market we ship to — retail, travel, finance,
        subscription, B2B — and across every continent we have measured.
      </p>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        What sets them apart is one decision: they have stopped accepting
        the dashboard as ground truth.
      </p>

      <ul className="text-[1.02rem] leading-[1.7] text-ink-2 mb-10 pl-0 list-none space-y-5">
        {[
          {
            name: "Refuses to make material budget decisions on broken data.",
            note: "When the spend gets large enough that misallocation costs more than measurement, the question stops being \u201Cwhat does GA4 show?\u201D and becomes \u201Cwhat actually happened?\u201D",
          },
          {
            name: "Has tried the patches and seen the results.",
            note: "Consent-rate optimisation. Server-side GTM. Modelled conversions. Each closes a small fraction of the gap; none of them changes the underlying number. The operator who has been around long enough has stopped expecting the next patch to work.",
          },
          {
            name: "Is held accountable for outcomes, not for dashboards.",
            note: "The CFO does not care that the analytics platform claims a 4.2 ROAS. The CFO cares whether revenue tied to spend reconciles against the ERP. This mindset is the one we close.",
          },
        ].map((row) => (
          <li key={row.name} className="pl-5 relative">
            <span
              aria-hidden="true"
              className="absolute left-0 top-[0.8em] w-2 h-px bg-ink-mute"
            />
            <strong className="block font-semibold text-ink mb-1">
              {row.name}
            </strong>
            <span className="block text-[0.95rem] leading-[1.6] text-text-secondary">
              {row.note}
            </span>
          </li>
        ))}
      </ul>

      <blockquote
        className="my-10 border-l-[3px] pl-6 py-2 italic text-[1.15rem] leading-[1.55] text-ink-2"
        style={{ borderColor: "#2E5C8A" }}
      >
        "The common factor is the refusal, not the profile. Customers fit
        our model across revenue bands, industries, and continents. What
        connects them is that they stopped pretending the dashboard was
        enough."
      </blockquote>

      {/* Section 3 · Personas */}
      <h2
        id="personas"
        className="font-sans text-[1.85rem] sm:text-[2.15rem] font-semibold text-ink mt-14 mb-5 leading-[1.1] tracking-[-0.025em] scroll-mt-24"
      >
        The personas who push for change
      </h2>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        Three roles tend to drive evaluation. Each one cares about a
        different layer of the same problem.
      </p>

      <div className="my-10 rounded-[14px] border border-warm-100 bg-white overflow-hidden">
        <div className="grid grid-cols-1 divide-y divide-warm-100">
          {personas.map((p, i) => (
            <div key={p.role} className="p-7">
              <span className="block font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-brand mb-3">
                Persona {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-sans text-[1.25rem] font-semibold text-ink leading-snug mb-3">
                {p.role}
              </h3>
              <p className="text-[0.95rem] leading-[1.65] text-ink-2 mb-2">
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-text-tertiary mr-2">
                  Owns
                </span>
                {p.owns}
              </p>
              <p className="text-[0.95rem] leading-[1.65] text-ink-2 m-0">
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-text-tertiary mr-2">
                  Yes
                </span>
                {p.yes}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        The DPO, CTO, and procurement leads come in later, after the
        marketing function has decided the product is worth pursuing.
      </p>

      {/* Section 4 · When we don't fit */}
      <h2
        id="when-we-dont-fit"
        className="font-sans text-[1.85rem] sm:text-[2.15rem] font-semibold text-ink mt-14 mb-5 leading-[1.1] tracking-[-0.025em] scroll-mt-24"
      >
        When we don't fit
      </h2>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        Honest disqualifications save quarters. None of them is about
        sector, country, or revenue band. They are about the relationship
        to the problem.
      </p>

      <div className="my-10 rounded-[14px] border border-warm-100 bg-white overflow-hidden">
        <div className="grid grid-cols-2 divide-x divide-warm-100">
          <div className="p-5 sm:p-7 bg-warm-50/40 border-b border-warm-100">
            <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-brand">
              You fit
            </span>
          </div>
          <div className="p-5 sm:p-7 bg-warm-50/40 border-b border-warm-100">
            <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-text-tertiary">
              You don't
            </span>
          </div>
          <ul className="p-5 sm:p-7 list-none m-0 space-y-3">
            {fit.map((item) => (
              <li
                key={item}
                className="text-[0.95rem] leading-[1.55] text-ink-2 pl-4 relative"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[0.65em] w-2 h-px bg-brand"
                />
                {item}
              </li>
            ))}
          </ul>
          <ul className="p-5 sm:p-7 list-none m-0 space-y-3">
            {dontFit.map((item) => (
              <li
                key={item}
                className="text-[0.95rem] leading-[1.55] text-text-secondary pl-4 relative"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[0.65em] w-2 h-px bg-ink-mute"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        Three patterns worth naming explicitly:
      </p>
      <ul className="text-[1.02rem] leading-[1.7] text-ink-2 mb-10 pl-0 list-none space-y-4">
        <li className="pl-5 relative">
          <span
            aria-hidden="true"
            className="absolute left-0 top-[0.8em] w-2 h-px bg-ink-mute"
          />
          <strong className="font-semibold text-ink">
            You are content with what GA4 shows.
          </strong>{" "}
          If the dashboard meets your needs and your reporting line accepts
          it, the value of replacing it is small. The cost of switching is
          not zero.
        </li>
        <li className="pl-5 relative">
          <span
            aria-hidden="true"
            className="absolute left-0 top-[0.8em] w-2 h-px bg-ink-mute"
          />
          <strong className="font-semibold text-ink">
            Your measurement problem is something other than attribution.
          </strong>{" "}
          Audience analytics, ad-impression tracking, content ranking, and
          brand lift are different measurement problems handled by
          different tools.
        </li>
        <li className="pl-5 relative">
          <span
            aria-hidden="true"
            className="absolute left-0 top-[0.8em] w-2 h-px bg-ink-mute"
          />
          <strong className="font-semibold text-ink">
            You need individual-level behavioural tracking.
          </strong>{" "}
          Session reconstruction, cross-device journey mapping, and
          CDP-style profiles are not what we ship.{" "}
          <Link
            href="/open/what-we-wont-do"
            className="text-brand hover:text-brand-hover no-underline border-b border-brand/40"
          >
            Chapter 09
          </Link>{" "}
          covers this in detail.
        </li>
      </ul>

      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        For the cases where the product fit is wrong and the situation
        needs other hands, we work with four implementation partners. We
        do not take commission from referrals — we make them when the
        product is the wrong answer.
      </p>

      <div className="my-10 rounded-[14px] border border-warm-100 bg-white overflow-hidden">
        <div className="grid grid-cols-1 divide-y divide-warm-100">
          {partners.map((p, i) => (
            <div key={p.name} className="p-7">
              <span className="block font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-text-tertiary mb-2">
                Partner {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-sans text-[1.2rem] font-semibold text-ink leading-snug mb-2">
                {p.name}
              </h3>
              <p className="text-[0.95rem] leading-[1.65] text-ink-2 m-0">
                {p.strength}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        If the product is not the right answer for your situation, ask us
        — the answer will be honest, not branded.
      </p>

      <p className="mt-14 text-[0.9rem] text-text-tertiary italic">
        Continue with{" "}
        <Link
          href="/open/what-complete-data-means"
          className="text-brand hover:text-brand-hover no-underline border-b border-brand/40"
        >
          chapter 03 — What complete data means
        </Link>
        .
      </p>
    </div>
  );
}

/* ============================================
   CHAPTER 11 · Glossary
   ============================================ */
interface GlossaryTerm {
  id: string;
  term: string;
  body: ReactNode;
  plain: string;
  chapterHref?: string;
  chapterLabel?: string;
}

function ChapterElevenBody() {
  const method: GlossaryTerm[] = [
    {
      id: "complete-data",
      term: "Complete data",
      plain:
        "Events measured server-side before consent rejection, ad blockers, or browser restrictions can remove them. Not sampled. Not modelled. Not estimated.",
      body: (
        <>
          Measured. Not sampled, not modelled, not filled in by a regression
          when consent is rejected. Visitors who reject the banner counted
          alongside those who accept it, captured before the cascade fires.
        </>
      ),
      chapterHref: "/open/what-complete-data-means",
      chapterLabel: "chapter 03",
    },
    {
      id: "last-click-attribution",
      term: "Last-click attribution without consent gaps",
      plain:
        "Credit assigned to the final measurable channel before conversion, applied to visitors who accept and reject the banner alike — not just the consenting fraction.",
      body: (
        <>
          Credit assigned to the final measurable channel before conversion,
          applied to visitors who accept and reject the banner alike — not
          the consenting fraction. The model is simple by design; what is not simple is
          feeding it complete data.
        </>
      ),
      chapterHref: "/open/what-we-wont-do",
      chapterLabel: "chapter 09",
    },
    {
      id: "multi-touch-attribution",
      term: "Multi-touch attribution",
      plain:
        "Distributing conversion credit across the channels a user touched. Requires per-user, cross-session reconstruction, which in Europe is possible only for visitors who consented and are not blocked — about 13% in the worst case.",
      body: (
        <>
          Distributing credit across the channels involved in a conversion
          path. Requires per-user, cross-session journey reconstruction. In
          Europe that journey is reconstructable only for visitors who
          consented and are not blocked. We do not do this.
        </>
      ),
      chapterHref: "/open/what-we-wont-do",
      chapterLabel: "chapter 09",
    },
    {
      id: "sampling",
      term: "Sampling",
      plain:
        "Analysing a subset of events and extrapolating the result as if it were a full measurement. GA4 applies sampling above 10M events per query. Sealmetrics does not sample.",
      body: (
        <>
          Analysing a subset of events and extrapolating the result as if it
          were a full measurement. GA4 applies sampling above 10M events per
          query. We don't.
        </>
      ),
      chapterHref: "/open/what-complete-data-means",
      chapterLabel: "chapter 03",
    },
    {
      id: "modelling",
      term: "Modelling (modelled conversions)",
      plain:
        "Statistical fills for events the analytics tool cannot measure. Output is presented as a number; source is a regression. Useful directionally; dangerous when used to allocate media budget.",
      body: (
        <>
          Statistical fills for events the analytics tool cannot measure.
          Output is presented as a number; source is a regression.
          Acceptable for directional analysis. Dangerous when used to
          allocate media budget.
        </>
      ),
      chapterHref: "/open/what-complete-data-means",
      chapterLabel: "chapter 03",
    },
    {
      id: "server-side",
      term: "Server-side measurement",
      plain:
        "Event ingestion that happens on a server you control, not in the browser. Holds up against ad blockers, ITP and consent rejection far better, because the request never has to leave the first-party domain.",
      body: (
        <>
          Event ingestion that happens on a server the customer controls,
          not in the browser. Holds up far better against ad blockers, ITP, and consent
          rejection because the request never has to leave the first-party
          domain.
        </>
      ),
      chapterHref: "/open/architecture-and-performance",
      chapterLabel: "chapter 05",
    },
  ];

  const compliance: GlossaryTerm[] = [
    {
      id: "gdpr-by-architecture",
      term: "GDPR by architecture",
      plain:
        "An approach to GDPR designed into what the data model never collects, rather than into what a consent UX manages to obtain. The product cannot be configured to handle personal data because no field for it exists. Self-assessed, not certified.",
      body: (
        <>
          An approach to GDPR designed into what the data model never
          collects, rather than into what a consent UX manages to obtain.
          The product cannot be configured to handle personal data because
          no field for it exists. Self-assessed, not certified.
        </>
      ),
      chapterHref: "/open/gdpr-by-architecture",
      chapterLabel: "chapter 06",
    },
    {
      id: "eprivacy-article-5-3",
      term: "ePrivacy Article 5(3)",
      plain:
        "European rule that governs access to terminal equipment. Cookies, localStorage, sessionStorage, IndexedDB, and fingerprinting all trigger it. ePrivacy doesn't care whether the data is personal — it cares whether the technique accesses the terminal.",
      body: (
        <>
          European rule that governs access to terminal equipment. Cookies,
          localStorage, fingerprinting all trigger it. We do none of them.
        </>
      ),
      chapterHref: "/open/gdpr-by-architecture",
      chapterLabel: "chapter 06",
    },
    {
      id: "schrems-ii",
      term: "Schrems II",
      plain:
        "Court of Justice EU ruling, July 2020, invalidating the Privacy Shield framework for US data transfers. Post-Schrems II, any EU personal data sent to US sub-processors requires SCCs plus a Transfer Impact Assessment.",
      body: (
        <>
          Court of Justice EU ruling, July 2020, that invalidated the
          Privacy Shield framework for US data transfers. The reason our
          infrastructure runs in Dublin with zero US sub-processors for the
          data plane.
        </>
      ),
      chapterHref: "/open/gdpr-by-architecture",
      chapterLabel: "chapter 06",
    },
    {
      id: "consent-rejection-rate",
      term: "Consent rejection rate",
      plain:
        "Share of visitors who refuse the consent banner. EU enterprise average is approximately 55%. The first stage of the worst-case cascade that can bring GA4 measurement down to about 13% of real traffic.",
      body: (
        <>
          Share of visitors who refuse the CMP banner — reject-all clicks,
          banner closures, "decline all" preferences combined. EU
          enterprise average sits around 55%. The starting point of the
          cascade.
        </>
      ),
      chapterHref: "/open/what-complete-data-means",
      chapterLabel: "chapter 03",
    },
    {
      id: "consent-mode",
      term: "Consent Mode (v2)",
      plain:
        "Google's framework that fills in conversion data via modelling when consent is rejected. A clever response to the consent loss problem — and still modelling on top of consent rejection, not measurement.",
      body: (
        <>
          Google's framework that fills in conversion data via modelling
          when consent is rejected. A clever response to the consent loss
          problem. Still modelling on top of consent rejection, not
          measurement.
        </>
      ),
      chapterHref: "/open/what-complete-data-means",
      chapterLabel: "chapter 03",
    },
    {
      id: "dpa",
      term: "DPA (Data Processing Agreement)",
      plain:
        "Contract signed before data flows between customer (controller) and Sealmetrics (processor). Covers scope of processing, lawful basis, sub-processors, technical and organisational measures, data subject rights, and breach notification. Included by default in Scale plans.",
      body: (
        <>
          Contract signed before data flows. We are the processor, you are
          the controller. Covers scope, lawful basis, sub-processors, TOMs,
          rights handling, breach notification. Included by default in
          Scale plans.
        </>
      ),
      chapterHref: "/open/gdpr-by-architecture",
      chapterLabel: "chapter 06",
    },
    {
      id: "legitimate-interest",
      term: "Legitimate interest (Art. 6(1)(f))",
      plain:
        "Lawful basis under GDPR for processing personal data without consent when the processing serves a legitimate interest that does not override the data subject's rights. Documented in a Legitimate Interest Assessment (LIA), bundled with the DPA.",
      body: (
        <>
          Lawful basis under GDPR for processing without consent when the
          interest does not override the data subject's rights. Documented
          in a Legitimate Interest Assessment (LIA), bundled with the DPA.
        </>
      ),
      chapterHref: "/open/gdpr-by-architecture",
      chapterLabel: "chapter 06",
    },
  ];

  const architecture: GlossaryTerm[] = [
    {
      id: "cookieless",
      term: "Cookieless",
      plain:
        "Measurement that does not set or read cookies. The word is overused — many tools that call themselves cookieless rely on fingerprinting or localStorage instead, which trigger ePrivacy Article 5(3) anyway. We are cookieless in name and in fact.",
      body: (
        <>
          Measurement that does not set or read cookies. The word is
          overused — many tools that call themselves cookieless rely on
          fingerprinting or localStorage instead, which trigger ePrivacy
          Article 5(3) anyway. We are cookieless in name and in fact.
        </>
      ),
      chapterHref: "/open/architecture-and-performance",
      chapterLabel: "chapter 05",
    },
    {
      id: "fingerprinting",
      term: "Fingerprinting",
      plain:
        "Combining terminal signals — user agent, canvas hash, fonts, audio context, screen, plugins, IP — into a near-unique browser identifier. Functionally equivalent to setting a cookie under ePrivacy Article 5(3). Sealmetrics strips the vectors before storage.",
      body: (
        <>
          Combining terminal signals — UA, canvas, fonts, audio context, IP
          — into a near-unique browser identifier. Functionally equivalent
          to a cookie under ePrivacy Article 5(3). We strip the vectors
          before storage.
        </>
      ),
      chapterHref: "/open/what-we-wont-do",
      chapterLabel: "chapter 09",
    },
    {
      id: "first-party",
      term: "First-party measurement",
      plain:
        "Events that flow through the customer's own domain rather than a third-party analytics endpoint. Far harder for ad blockers to catch, and unaffected by cross-site cookie restrictions, because there is no third-party request to match.",
      body: (
        <>
          Events flow through the customer's own domain, not a third-party
          endpoint. Far harder for ad blockers to catch, and unaffected by
          cross-site cookie restrictions, because there is no third-party
          request to match.
        </>
      ),
      chapterHref: "/open/architecture-and-performance",
      chapterLabel: "chapter 05",
    },
    {
      id: "itp",
      term: "Intelligent Tracking Prevention (ITP)",
      plain:
        "Safari's mechanism for limiting cross-site tracking. Expires or blocks cookies that depend on cross-site context. One of the three layers in the worst-case cascade that can bring GA4 measurement down to about 13%.",
      body: (
        <>
          Safari's mechanism for limiting cross-site tracking. Expires or
          blocks cookies that rely on cross-site context. One of the three
          layers in the cascade.
        </>
      ),
      chapterHref: "/open/what-complete-data-means",
      chapterLabel: "chapter 03",
    },
    {
      id: "pixel",
      term: "Pixel",
      plain:
        "The small client-side script that captures and dispatches events to ingestion. Sealmetrics's pixel is under 4 KB gzipped, loads asynchronously, and sets no terminal storage.",
      body: (
        <>
          The small client-side script that captures and dispatches events
          to ingestion. Ours is under 4 KB gzipped, loads asynchronously,
          and sets no terminal storage.
        </>
      ),
      chapterHref: "/open/architecture-and-performance",
      chapterLabel: "chapter 05",
    },
  ];

  const commercial: GlossaryTerm[] = [
    {
      id: "the-13-percent",
      term: "The 13%",
      plain:
        "Our worst-case model of GA4 measurement coverage in the EU after consent rejection, ad blockers, and browser restrictions. A multiplicative cascade that starts at 100 real visitors and arrives at roughly 13 measurable ones. A compounded worst case, not an average: on one real Shopify store measured for 48 days, GA4 did not record 29% of visits.",
      body: (
        <>
          Our worst-case model of GA4 measurement coverage in the EU after
          consent rejection (~55%), ad blockers (~40% of the remainder), and
          browser restrictions. The end of the cascade — not an average. On{" "}
          <Link
            href="/case-studies/incapto"
            className="text-brand hover:text-brand-hover no-underline border-b border-brand/40"
          >
            a real Shopify store measured for 48 days
          </Link>
          , GA4 did not record 29% of visits.
        </>
      ),
      chapterHref: "/open/what-complete-data-means",
      chapterLabel: "chapter 03",
    },
    {
      id: "performance-media",
      term: "Performance media",
      plain:
        "Paid acquisition channels measured by direct response — Google Ads, Meta, TikTok, affiliates. Distinct from brand media, which is impression-based and harder to attribute directly. The category where measurement gaps hit budget hardest.",
      body: (
        <>
          Paid acquisition channels measured by direct response — Google
          Ads, Meta, TikTok, affiliates. Distinct from brand media. The
          category where measurement gaps hit budget hardest.
        </>
      ),
    },
    {
      id: "the-operator",
      term: "The operator",
      plain:
        "The buyer profile Sealmetrics serves, defined by intolerance to broken data rather than by sector, geography, or revenue band.",
      body: (
        <>
          Our buyer profile. Defined by intolerance to broken data rather
          than by sector, geography, or revenue band.
        </>
      ),
      chapterHref: "/open/who-we-build-for",
      chapterLabel: "chapter 02",
    },
  ];

  const allTerms = [...method, ...compliance, ...architecture, ...commercial];

  const definedTermSetSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Open Glossary — Sealmetrics",
    inDefinedTermSet: "https://sealmetrics.com/open/glossary",
    hasDefinedTerm: allTerms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.plain,
      url: `https://sealmetrics.com/open/glossary#${t.id}`,
      inDefinedTermSet: "https://sealmetrics.com/open/glossary",
    })),
  };

  const sections: Array<{
    id: string;
    label: string;
    intro: string;
    terms: GlossaryTerm[];
  }> = [
    {
      id: "method",
      label: "Method and measurement",
      intro:
        "How we describe what we do and what we refuse to do. The vocabulary that defines complete data, last-click without consent gaps, and the things we say no to.",
      terms: method,
    },
    {
      id: "compliance",
      label: "Legal compliance",
      intro:
        "Regulatory language used across Open. We name the article numbers and the rulings so a DPO can pick up the chapter cold.",
      terms: compliance,
    },
    {
      id: "architecture",
      label: "Technical architecture",
      intro:
        "How the pixel, the storage, and the data plane are built. Where industry words mean something specific in our case, we say so.",
      terms: architecture,
    },
    {
      id: "commercial",
      label: "Commercial vocabulary",
      intro:
        "Words used about the customer, the spend, and the canonical figures repeated across Open.",
      terms: commercial,
    },
  ];

  return (
    <div className="prose-open">
      <JsonLd data={definedTermSetSchema} />

      <p className="text-[1.25rem] leading-[1.6] text-ink-2 mb-8 first-letter:font-semibold first-letter:text-[2.4em] first-letter:float-left first-letter:mr-2 first-letter:leading-[1] first-letter:text-ink">
        Most glossaries are neutral on purpose. This one isn't. We use a
        handful of words in ways that differ from how the rest of the
        analytics industry uses them — and a few words we wish the industry
        would stop using altogether. This chapter is where we say which is
        which.
      </p>

      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-14">
        Each term links to the chapter that develops it. If you arrived here
        from another chapter looking for a one-line definition, the link
        beneath every term will take you back to the full treatment.
      </p>

      {/* Quick nav */}
      <div className="my-10 rounded-[14px] border border-warm-100 bg-warm-50/60 p-6">
        <span className="block font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-text-tertiary mb-3">
          Categories
        </span>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 m-0 p-0 list-none">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="text-[0.95rem] text-ink-2 hover:text-brand no-underline border-b border-warm-200 hover:border-brand transition-colors"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {sections.map((section) => (
        <section key={section.id} className="mt-16">
          <h2
            id={section.id}
            className="font-sans text-[1.85rem] sm:text-[2.15rem] font-semibold text-ink mt-0 mb-4 leading-[1.1] tracking-[-0.025em] scroll-mt-24"
          >
            {section.label}
          </h2>
          <p className="text-[1.02rem] leading-[1.7] text-text-secondary mb-10 max-w-[58ch]">
            {section.intro}
          </p>

          <dl className="m-0 p-0 grid grid-cols-1 gap-0 border-t border-warm-100">
            {section.terms.map((t) => (
              <div
                key={t.id}
                id={t.id}
                className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-x-8 gap-y-3 py-7 border-b border-warm-100 scroll-mt-24"
              >
                <dt>
                  <span
                    className="block font-sans text-[1.05rem] font-semibold text-ink leading-snug"
                  >
                    {t.term}
                  </span>
                  <a
                    href={`#${t.id}`}
                    className="block font-mono text-[0.65rem] uppercase tracking-[0.12em] text-text-tertiary hover:text-brand no-underline mt-1"
                    aria-label={`Anchor link to ${t.term}`}
                  >
                    #{t.id}
                  </a>
                </dt>
                <dd className="m-0">
                  <p className="text-[1rem] leading-[1.7] text-ink-2 m-0">
                    {t.body}
                  </p>
                  {t.chapterHref && t.chapterLabel && (
                    <p className="mt-3 m-0 text-[0.85rem] text-text-tertiary">
                      Develops in{" "}
                      <Link
                        href={t.chapterHref}
                        className="text-brand hover:text-brand-hover no-underline border-b border-brand/40"
                      >
                        {t.chapterLabel}
                      </Link>
                      .
                    </p>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}

      <p className="mt-16 text-[1rem] leading-[1.7] text-ink-2">
        If a word we use feels imprecise, write to us — clarity in this
        document is part of the product. The standard reference glossary,
        with broader industry definitions, lives at{" "}
        <Link
          href="/glossary"
          className="text-brand hover:text-brand-hover no-underline border-b border-brand/40"
        >
          /glossary
        </Link>
        .
      </p>

      <p className="mt-14 text-[0.9rem] text-text-tertiary italic">
        Open ends here for now.{" "}
        <Link
          href="/open"
          className="text-brand hover:text-brand-hover no-underline border-b border-brand/40"
        >
          Back to the index
        </Link>
        , or start over at{" "}
        <Link
          href="/open/why-we-exist"
          className="text-brand hover:text-brand-hover no-underline border-b border-brand/40"
        >
          chapter 01
        </Link>
        .
      </p>
    </div>
  );
}

/* ============================================
   CHAPTER 07 · How we price
   ============================================ */
function ChapterSevenBody() {
  const includedAlways = [
    "No consent-driven data loss · no sampling, ever",
    "Last-click revenue attribution without consent gaps",
    "EU-hosted in Dublin · no US sub-processors on visitor data",
    "Designed for GDPR · DPA signed by default",
    "MCP server + BigQuery export + full API",
    "Unlimited sites and users",
    "AI agent traffic tracked · free, on every plan",
  ];

  const neverExtra = [
    "AI agent traffic (ChatGPT, Claude, Perplexity, etc.)",
    "Bot traffic — excluded before it counts",
    "First overage month per year — free",
    "DPA signature and legal review",
    "Product updates and new features",
    "The 14-day trial — full product, no card required",
  ];

  const plans = [
    {
      name: "Growth",
      annual: "€499",
      monthly: "€599",
      events: "5M",
      desc: "The starting point for teams replacing GA4 with consent-independent data.",
      highlights: [
        "5M human events / month",
        "LENS AI · bring your own key",
        "MCP + BigQuery + Full API",
      ],
      featured: false,
    },
    {
      name: "Scale",
      annual: "€899",
      monthly: "€1,079",
      events: "15M",
      desc: "Where most performance-driven teams settle. Adds managed Private AI.",
      highlights: [
        "15M human events / month",
        "Managed Private AI · 5M tokens",
        "Webhooks + priority support",
      ],
      featured: true,
    },
    {
      name: "Enterprise",
      annual: "Custom",
      monthly: "Custom",
      events: "Unlimited",
      desc: "For portfolio brands and regulated industries where governance is non-negotiable.",
      highlights: [
        "Unlimited human events",
        "SSO / SAML + RBAC",
        "Isolated processing · 99.9% SLA",
        "Dedicated account manager",
      ],
      featured: false,
    },
  ];

  const compare = [
    {
      label: "Annual cost",
      us: "From €5,988 (Growth) to custom (Enterprise)",
      ga360: "Quote-based · ~$50K entry, $100–175K mid-market",
      adobe: "Unpublished · ~$50K to $200K+, plus implementation",
      piwik: "Business from €36/mo · Enterprise from €366/mo, billed annually",
    },
    {
      label: "Data captured",
      us: "Not reduced by consent",
      ga360: "~13% in EU after consent + ITP",
      adobe: "~13% in EU after consent + ITP",
      piwik: "100% of consenting users",
    },
    {
      label: "Sampling",
      us: "Never",
      ga360: "Above query thresholds",
      adobe: "Above query thresholds",
      piwik: "No",
    },
    {
      label: "Default data residency",
      us: "EU · Dublin",
      ga360: "US (regional options)",
      adobe: "US (regional options)",
      piwik: "EU",
    },
    {
      label: "DPA",
      us: "Signed by default",
      ga360: "Self-service template",
      adobe: "Self-service template",
      piwik: "Available",
    },
    {
      label: "Consent required for measurement",
      us: "No (by architecture)",
      ga360: "Yes",
      adobe: "Yes",
      piwik: "Yes",
    },
  ];

  return (
    <div className="prose-open">
      <p className="text-[1.25rem] leading-[1.6] text-ink-2 mb-8 first-letter:font-semibold first-letter:text-[2.4em] first-letter:float-left first-letter:mr-2 first-letter:leading-[1] first-letter:text-ink">
        Pricing is upstream of trust. If you cannot tell what you are paying
        for, what you will pay next quarter, and what is included by
        default, the rest of the product has to work twice as hard to be
        believed.
      </p>

      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-14">
        This chapter explains the reasoning — what we charge for, the
        three plans, the comparison against the enterprise tier we
        replace, and what shows up on the invoice. The exact figures live
        on{" "}
        <Link
          href="/pricing"
          className="text-brand hover:text-brand-hover no-underline border-b border-brand/40"
        >
          /pricing
        </Link>
        ; this is the why.
      </p>

      {/* Section 1 · What we charge for */}
      <h2
        id="what-we-charge-for"
        className="font-sans text-[1.85rem] sm:text-[2.15rem] font-semibold text-ink mt-14 mb-5 leading-[1.1] tracking-[-0.025em] scroll-mt-24"
      >
        What we charge for and what we don't
      </h2>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        We charge for{" "}
        <span className="italic-accent">human events</span> — not
        pageviews, not sessions, not unique visitors. Events triggered by
        real people doing things on your site: pageview, add-to-cart,
        conversion, form submission, click.
      </p>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        The principle is short: pricing should reflect the value you
        extract, not the volume of data we happen to ingest. A scraper
        does not add value to either side. Charging for it would be a tax
        on operating in 2026.
      </p>

      <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-[14px] border border-warm-100 bg-white p-7">
          <span className="block font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-brand mb-4">
            What you pay for
          </span>
          <p className="font-sans text-[1.1rem] font-semibold text-ink leading-snug m-0">
            Human events you measure.
          </p>
          <p className="text-[0.92rem] leading-[1.6] text-text-secondary mt-3 m-0">
            Real visitor interactions. The number that maps to what your
            marketing team actually optimises against.
          </p>
        </div>
        <div className="rounded-[14px] border border-warm-100 bg-warm-50/60 p-7">
          <span className="block font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-text-tertiary mb-4">
            What is never an extra cost
          </span>
          <ul className="text-[0.92rem] leading-[1.6] text-ink-2 m-0 pl-0 list-none space-y-2">
            {neverExtra.map((item) => (
              <li key={item} className="pl-4 relative">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[0.65em] w-2 h-px bg-ink-mute"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <blockquote
        className="my-10 border-l-[3px] pl-6 py-2 italic text-[1.15rem] leading-[1.55] text-ink-2"
        style={{ borderColor: "#2E5C8A" }}
      >
        "AI agents — ChatGPT, Claude, Perplexity — are a new category of
        traffic you need visibility into. We track them for free. Charging
        for the data that shows you how AI reads your site would be
        backwards."
      </blockquote>

      {/* Section 2 · Three plans */}
      <h2
        id="three-plans"
        className="font-sans text-[1.85rem] sm:text-[2.15rem] font-semibold text-ink mt-14 mb-5 leading-[1.1] tracking-[-0.025em] scroll-mt-24"
      >
        Three plans, one architecture
      </h2>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        Every plan ships the same data architecture. The differences are
        volume, governance, support, and a small set of premium AI
        capabilities on Scale and above. The plans are stacked, not
        gated.
      </p>

      <div className="my-10 rounded-[14px] border border-warm-100 bg-warm-50/60 p-7">
        <span className="block font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-brand mb-4">
          Included by default on every plan
        </span>
        <ul className="text-[0.95rem] leading-[1.6] text-ink-2 m-0 pl-0 list-none grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
          {includedAlways.map((item) => (
            <li key={item} className="pl-4 relative">
              <span
                aria-hidden="true"
                className="absolute left-0 top-[0.65em] w-2 h-px bg-brand"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="my-12 grid grid-cols-1 gap-4">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-[14px] border p-7 ${
              p.featured
                ? "border-brand bg-white"
                : "border-warm-100 bg-white"
            }`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-x-8 gap-y-4 items-baseline">
              <div>
                <div className="flex items-baseline gap-3 mb-3">
                  <h3 className="font-sans text-[1.4rem] font-semibold text-ink leading-none m-0">
                    {p.name}
                  </h3>
                  {p.featured && (
                    <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-brand">
                      · Most picked
                    </span>
                  )}
                </div>
                <span className="block font-sans text-[1.85rem] font-semibold text-ink leading-none tracking-[-0.02em]">
                  {p.annual}
                </span>
                <span className="block mt-1 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-text-tertiary">
                  / mo · annual billing
                </span>
                {p.monthly !== "Custom" && (
                  <span className="block mt-2 text-[0.82rem] text-text-secondary">
                    or {p.monthly}/mo monthly
                  </span>
                )}
                <span className="block mt-3 font-mono text-[0.75rem] text-text-tertiary">
                  {p.events} human events / mo
                </span>
              </div>
              <div>
                <p className="text-[1rem] leading-[1.65] text-ink-2 m-0 mb-4">
                  {p.desc}
                </p>
                <ul className="text-[0.92rem] leading-[1.55] text-ink-2 m-0 pl-0 list-none space-y-2">
                  {p.highlights.map((h) => (
                    <li key={h} className="pl-4 relative">
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-[0.65em] w-2 h-px bg-ink-mute"
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        There is no version of Sealmetrics that holds the architecture
        hostage to the enterprise plan. Growth ships the data model that
        makes the product the product. Scale and Enterprise add capacity,
        governance, and the premium AI layer.
      </p>

      {/* Section 3 · Compare */}
      <h2
        id="enterprise-compare"
        className="font-sans text-[1.85rem] sm:text-[2.15rem] font-semibold text-ink mt-14 mb-5 leading-[1.1] tracking-[-0.025em] scroll-mt-24"
      >
        Comparing against the enterprise tier
      </h2>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-5">
        The honest comparison is with the tools that solve the same
        problem — GA360, Adobe Analytics, Piwik PRO. Not with lightweight
        privacy dashboards at €9–50/month; those answer a different
        question and we covered the category in{" "}
        <Link
          href="/open/what-complete-data-means"
          className="text-brand hover:text-brand-hover no-underline border-b border-brand/40"
        >
          chapter 03
        </Link>
        .
      </p>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        The comparison below uses publicly observable defaults. Piwik PRO
        publishes its starting prices; the figures are from its pricing
        page on 14 September 2026. GA360 and Adobe do not publish theirs,
        so those cells are the commonly reported bands as of August 2026 —
        a real contract moves with negotiated volume.
      </p>

      <div className="my-10 rounded-[14px] border border-warm-100 bg-white overflow-hidden overflow-x-auto">
        <div className="min-w-[640px]">
          <div className="grid grid-cols-[1.3fr_1fr_1fr_1fr_1fr] divide-y divide-warm-100">
            <div className="p-4 sm:p-5 bg-warm-50/60 border-b border-warm-100">
              <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-text-tertiary">
                Dimension
              </span>
            </div>
            <div className="p-4 sm:p-5 bg-warm-50/60 border-b border-warm-100 border-l border-l-warm-100">
              <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-brand">
                Sealmetrics
              </span>
            </div>
            <div className="p-4 sm:p-5 bg-warm-50/60 border-b border-warm-100 border-l border-l-warm-100">
              <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-text-tertiary">
                GA360
              </span>
            </div>
            <div className="p-4 sm:p-5 bg-warm-50/60 border-b border-warm-100 border-l border-l-warm-100">
              <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-text-tertiary">
                Adobe
              </span>
            </div>
            <div className="p-4 sm:p-5 bg-warm-50/60 border-b border-warm-100 border-l border-l-warm-100">
              <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-text-tertiary">
                Piwik PRO
              </span>
            </div>
            {compare.map((row) => (
              <div key={row.label} className="contents">
                <div className="p-4 sm:p-5 text-[0.9rem] text-ink-2 leading-snug font-medium">
                  {row.label}
                </div>
                <div className="p-4 sm:p-5 text-[0.9rem] text-ink leading-snug border-l border-l-warm-100 font-medium">
                  {row.us}
                </div>
                <div className="p-4 sm:p-5 text-[0.9rem] text-text-secondary leading-snug border-l border-l-warm-100">
                  {row.ga360}
                </div>
                <div className="p-4 sm:p-5 text-[0.9rem] text-text-secondary leading-snug border-l border-l-warm-100">
                  {row.adobe}
                </div>
                <div className="p-4 sm:p-5 text-[0.9rem] text-text-secondary leading-snug border-l border-l-warm-100">
                  {row.piwik}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        For an eCommerce team spending €20K+ per month in paid media, the
        Growth plan represents under 2.5% of paid spend. That number
        usually lands inside the variance of a single mis-attributed
        campaign decision per quarter.
      </p>

      {/* Section 4 · Billing transparency */}
      <h2
        id="billing-transparency"
        className="font-sans text-[1.85rem] sm:text-[2.15rem] font-semibold text-ink mt-14 mb-5 leading-[1.1] tracking-[-0.025em] scroll-mt-24"
      >
        What you see on the invoice
      </h2>
      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        A few decisions show up in billing that matter more than the
        headline price.
      </p>

      <ul className="text-[1.02rem] leading-[1.7] text-ink-2 mb-10 pl-0 list-none space-y-5">
        {[
          {
            name: "Annual vs monthly.",
            note: "Annual billing saves two months per year versus monthly. Most customers move to annual after the trial; the difference covers a quarter of bidding-tool budget.",
          },
          {
            name: "One free overage month per year.",
            note: "Spikes happen. We don't bill the first one. Black Friday, a viral campaign, an unexpected paid push — the meter forgives a single month.",
          },
          {
            name: "Two consecutive overage months → auto-upgrade.",
            note: "If the underlying volume has changed, the plan should change with it. We do this at the next billing cycle, not retroactively, and we notify you before it happens.",
          },
          {
            name: "No usage-based surprises.",
            note: "The price you signed up for is the price for the year. We never throttle, sample, or block your data when you approach a limit.",
          },
          {
            name: "Annual review on Scale and above.",
            note: "We look at the previous twelve months together, with you, to confirm the plan still fits. If you should be paying less, we say so.",
          },
        ].map((row) => (
          <li key={row.name} className="pl-5 relative">
            <span
              aria-hidden="true"
              className="absolute left-0 top-[0.8em] w-2 h-px bg-ink-mute"
            />
            <strong className="block font-semibold text-ink mb-1">
              {row.name}
            </strong>
            <span className="block text-[0.96rem] leading-[1.6] text-text-secondary">
              {row.note}
            </span>
          </li>
        ))}
      </ul>

      <p className="text-[1.05rem] leading-[1.75] text-ink-2 mb-10">
        The point of publishing this is the same point as publishing the
        rest of Open. You should not have to read between the lines of a
        sales conversation to find out what comes next on your invoice.
      </p>

      <p className="mt-14 text-[0.9rem] text-text-tertiary italic">
        Continue with{" "}
        <Link
          href="/open/what-we-wont-do"
          className="text-brand hover:text-brand-hover no-underline border-b border-brand/40"
        >
          chapter 09 — What we won't do
        </Link>
        .
      </p>
    </div>
  );
}
