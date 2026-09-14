import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { CareersForm } from "@/components/forms/CareersForm";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Work With Us — Sealmetrics",
  description:
    "Apply with public links — LinkedIn, GitHub, your published work. No CV uploads, no personal data forms. Pick a team and show us what you've shipped.",
  openGraph: {
    title: "Work With Us — Sealmetrics",
    description:
      "Apply with public links — LinkedIn, GitHub, your published work. No CV uploads, no personal data forms.",
    type: "website",
    images: [ogImage("/careers/")],
    url: "https://sealmetrics.com/careers/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Work With Us — Sealmetrics",
    description: "Apply with public links — LinkedIn, GitHub, your published work. No CV uploads, no personal data forms.",
    images: [ogImage("/careers/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/careers/",
    languages: getAlternates("/careers"),
  },
};

const TEAMS = [
  {
    name: "Engineering",
    desc: "The tracking pixel, the ingestion pipeline and the dashboard. A small surface that measures traffic for 2,000+ customers without depending on consent — or a single cookie.",
  },
  {
    name: "Product & Design",
    desc: "Turning aggregate, anonymous data into decisions a CMO signs off on. Editorial interfaces, dense data, no dark patterns.",
  },
  {
    name: "Growth & Marketing",
    desc: "This site, the blog, SEO and the demand engine. We educate before we sell — the writing has to hold up on its own.",
  },
  {
    name: "Sales & Partnerships",
    desc: "Demos with CMOs and eCommerce managers of European companies, plus the agency channel. Consultative, no drip sequences.",
  },
  {
    name: "Customer Success",
    desc: "Onboarding, instrumentation and keeping customers measuring correctly. You'll live between marketing teams and tag setups.",
  },
  {
    name: "Open application",
    desc: "Don't see your discipline? If your public work makes the case for a role we haven't opened yet, we want to see it.",
  },
];

const SIGNALS = [
  {
    label: "LinkedIn",
    desc: "Trajectory, scope of what you owned, how you describe your own results. Specific numbers beat titles.",
  },
  {
    label: "GitHub",
    desc: "Shipped repos, commit history on real projects, how you write issues and reviews. Green squares alone are not signal.",
  },
  {
    label: "Writing and talks",
    desc: "A blog post, a conference talk, a documented side project. Anything that shows how you think through a problem in public.",
  },
  {
    label: "Work with numbers attached",
    desc: "A campaign, a migration, a launch — described with the outcome, not the adjectives.",
  },
];

const FAQ = [
  {
    question: "Why don't you accept CVs or PDFs?",
    answer:
      "Sealmetrics doesn't collect personal data from website visitors — that discipline extends to hiring. A CV tells us what you claim; public work shows what you actually do. We also keep the personal data we hold about candidates to the minimum: the links you chose to share, nothing else.",
  },
  {
    question: "What if I don't have GitHub or much public work?",
    answer:
      "One link is enough. For most non-engineering roles a LinkedIn profile is a complete application. GitHub matters for engineering candidates, but a talk, a portfolio or published writing works for any team.",
  },
  {
    question: "How will you contact me if there's a fit?",
    answer:
      "Through the profile you shared — typically a LinkedIn message. We don't ask for your email or phone in the application, so we can't add you to any list. If there's no fit, your links are simply not kept.",
  },
  {
    question: "Can I see the product before applying?",
    answer:
      "Yes. The demo account gives you the real dashboard with real anonymized data, credentials sent to your email — see /demo-access. The /open section documents how we work, in public.",
  },
];

export default function CareersPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Work with us" }]} />
      <JsonLd data={breadcrumbSchema([{ name: "Work with us", url: "/careers" }])} />
      <JsonLd data={faqPageSchema(FAQ, "/careers")} />

      {/* Hero */}
      <section className="bg-warm-white pt-24 md:pt-28 pb-16">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 text-center">
          <span className="eyebrow mb-5" style={{ display: "inline-flex" }}>
            Work with us
          </span>
          <h1 className="h-display mx-auto mt-5" style={{ maxWidth: "20ch" }}>
            Show us your work, <em>not your CV.</em>
          </h1>
          <p
            className="text-ink-soft mt-8 mx-auto max-w-[62ch] leading-[1.55]"
            style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}
          >
            No PDF uploads. No cover letters. No forms asking for your address
            and your salary history. Pick the team you want to join and share
            the public links that make your case — LinkedIn, GitHub, a talk,
            a portfolio.
          </p>
          <div className="mt-9">
            <a
              href="#apply"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-[15px] font-semibold text-white bg-ink no-underline hover:bg-brand transition-colors"
            >
              Apply With Public Links →
            </a>
          </div>
        </div>
      </section>

      {/* Why no CVs */}
      <section className="bg-white border-t border-warm-100 py-24">
        <div className="max-w-[900px] mx-auto px-5 sm:px-8">
          <span className="eyebrow mb-5" style={{ display: "inline-flex" }}>
            Why we hire this way
          </span>
          <h2 className="h-section mt-5" style={{ maxWidth: "24ch" }}>
            The standard hiring funnel collects data <em>it never needed.</em>
          </h2>
          <div className="mt-8 space-y-6 text-[17px] leading-[1.7] text-ink-2">
            <p>
              A typical application asks for a PDF with your address, your
              photo, your full employment history — then stores it in an ATS
              for years. Most of that data never influences the decision. It
              just sits there as risk.
            </p>
            <p>
              Sealmetrics measures website traffic without depending on consent
              or collecting personal data — that is the whole product. Applying the opposite
              logic to the people who want to build it with us would be
              incoherent. So the application is three optional link fields and
              a team selector. The links you share are the application,
              evaluated by a person against the team you picked.
            </p>
            <p>
              If you want to know who you would be working with before
              sharing anything, read{" "}
              <Link href="/about" className="text-brand">
                who is behind Sealmetrics
              </Link>{" "}
              or{" "}
              <Link href="/open" className="text-brand">
                Open — how we work, documented in public
              </Link>
              . Founded in 2024, headquartered in Barcelona, EU-hosted in
              Dublin.
            </p>
          </div>
        </div>
      </section>

      {/* Teams */}
      <section className="bg-warm-white border-t border-warm-100 py-24">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <span className="eyebrow mb-5" style={{ display: "inline-flex" }}>
            The teams
          </span>
          <h2 className="h-section mt-5" style={{ maxWidth: "22ch" }}>
            Six doors in. <em>Pick yours.</em>
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAMS.map((team) => (
              <div
                key={team.name}
                className="bg-white border border-warm-100 rounded-xl p-7"
              >
                <h3 className="text-[17px] font-semibold text-ink tracking-[-0.01em]">
                  {team.name}
                </h3>
                <p className="text-[14.5px] text-ink-soft leading-[1.6] mt-2.5">
                  {team.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What counts as signal */}
      <section className="bg-white border-t border-warm-100 py-24">
        <div className="max-w-[900px] mx-auto px-5 sm:px-8">
          <span className="eyebrow mb-5" style={{ display: "inline-flex" }}>
            What we look at
          </span>
          <h2 className="h-section mt-5" style={{ maxWidth: "24ch" }}>
            What a <em>strong link</em> looks like
          </h2>
          <div className="mt-10 flex flex-col gap-6">
            {SIGNALS.map((s) => (
              <div
                key={s.label}
                className="flex gap-5 pb-6 border-b border-warm-100 last:border-0 last:pb-0"
              >
                <span className="text-ink-soft select-none" aria-hidden>
                  —
                </span>
                <div>
                  <h3 className="text-[16px] font-semibold text-ink tracking-[-0.01em]">
                    {s.label}
                  </h3>
                  <p className="text-[15px] text-ink-soft leading-[1.6] mt-1">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply */}
      <section id="apply" className="bg-warm-white border-t border-warm-100 py-24">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-20 items-start">
            <div>
              <span className="eyebrow mb-5" style={{ display: "inline-flex" }}>
                Apply
              </span>
              <h2 className="h-section mt-5" style={{ maxWidth: "18ch" }}>
                Two minutes. <em>Zero paperwork.</em>
              </h2>
              <div className="mt-9 flex flex-col gap-6">
                {[
                  {
                    n: "01",
                    t: "Pick your team",
                    d: "One of the five teams, or an open application if your discipline isn't listed.",
                  },
                  {
                    n: "02",
                    t: "Share at least one public link",
                    d: "LinkedIn, GitHub, or anything else public. No PDFs, no email address, no phone number.",
                  },
                  {
                    n: "03",
                    t: "We review, then reach out through your profile",
                    d: "A person reads every application. If there's a fit, the first message arrives where you chose to be visible.",
                  },
                ].map((step) => (
                  <div key={step.n} className="flex gap-5">
                    <span className="font-mono text-[12px] font-semibold text-brand tracking-[0.08em] pt-1">
                      {step.n}
                    </span>
                    <div>
                      <h3 className="text-[16px] font-semibold text-ink tracking-[-0.01em]">
                        {step.t}
                      </h3>
                      <p className="text-[14.5px] text-ink-soft leading-[1.6] mt-1">
                        {step.d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:sticky lg:top-24">
              <CareersForm locale="en" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white border-t border-warm-100 py-24">
        <div className="max-w-[900px] mx-auto px-5 sm:px-8">
          <span className="eyebrow mb-5" style={{ display: "inline-flex" }}>
            Questions
          </span>
          <h2 className="h-section mt-5" style={{ maxWidth: "22ch" }}>
            Before you ask
          </h2>
          <div data-md="skip" className="mt-10 flex flex-col gap-8">
            {FAQ.map((item) => (
              <div
                key={item.question}
                className="pb-8 border-b border-warm-100 last:border-0 last:pb-0"
              >
                <h3 className="text-[17px] font-semibold text-ink tracking-[-0.01em]">
                  {item.question}
                </h3>
                <p className="text-[15px] text-ink-soft leading-[1.65] mt-2.5">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[15px] text-ink-soft leading-[1.65] mt-10">
            Curious about the product itself? Get the dashboard with the{" "}
            <Link href="/demo-access" className="text-brand">
              demo account
            </Link>{" "}
            or{" "}
            <Link href="/demo" className="text-brand">
              book a demo
            </Link>{" "}
            and see what your future team ships.
          </p>
        </div>
      </section>
    </>
  );
}
