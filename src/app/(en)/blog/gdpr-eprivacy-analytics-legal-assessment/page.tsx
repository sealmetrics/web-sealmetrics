import type { Metadata } from "next";
import { postDates } from "@/lib/content/blog";
import { PostByline } from "@/components/ui/PostByline";
import Link from "next/link";
import { getAlternates } from "@/lib/i18n/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { RelatedReading } from "@/components/ui/RelatedReading";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Is Your Analytics GDPR-Compliant? A Legal Assessment",
  description:
    "A plain-language legal assessment of web analytics under GDPR and ePrivacy — with a per-tool verdict for GA4, Matomo, Plausible, Piwik PRO and Sealmetrics.",
  openGraph: {
    title: "Is Your Analytics GDPR-Compliant? A Legal Assessment of GA4, Matomo, Plausible and Sealmetrics",
    description:
      "GDPR and ePrivacy are two different laws. Analytics has to clear both to run without a consent banner. Here is the legal test, and where each major tool lands.",
    type: "article",
    images: [ogImage("/blog/gdpr-eprivacy-analytics-legal-assessment/")],
    url: "https://sealmetrics.com/blog/gdpr-eprivacy-analytics-legal-assessment/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Is Your Analytics GDPR-Compliant? A Legal Assessment of GA4, Matomo, Plausible and Sealmetrics",
    description: "GDPR and ePrivacy are two different laws. Analytics has to clear both to run without a consent banner. Here is the legal test, and where each major tool lands.",
    images: [ogImage("/blog/gdpr-eprivacy-analytics-legal-assessment/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/blog/gdpr-eprivacy-analytics-legal-assessment/",
    languages: getAlternates("/blog/gdpr-eprivacy-analytics-legal-assessment"),
  },
};

const lawSplit = [
  {
    n: "ePrivacy",
    label: "ePrivacy Directive — Article 5(3)",
    body: "Governs storing or reading information on a visitor's device. Any cookie, localStorage entry or fingerprint that isn't strictly necessary needs prior consent. This is the “cookie law,” and it applies whether or not the data is personal.",
    accent: "amber",
  },
  {
    n: "GDPR",
    label: "GDPR — the personal-data law",
    body: "Governs the processing of personal data, including IP addresses and online identifiers. Touch personal data and you need a lawful basis plus the full set of GDPR obligations. Process none, and GDPR simply does not apply.",
    accent: "brand",
  },
];

// Tool | cookies by default | consent banner in EU | personal data | data location | category
const matrix = [
  {
    tool: "GA4 (Google Analytics 4)",
    cookies: "Yes (_ga, client ID)",
    banner: "Required for full data",
    pii: "Yes — IP, client ID",
    location: "US company; EU options via Consent Mode",
    category: "Enterprise incumbent",
    tone: "warn",
  },
  {
    tool: "Adobe Analytics",
    cookies: "Yes",
    banner: "Required",
    pii: "Yes",
    location: "US company",
    category: "Enterprise legacy",
    tone: "warn",
  },
  {
    tool: "Piwik PRO",
    cookies: "Configurable",
    banner: "Consent-based by default",
    pii: "Configurable",
    location: "EU (Germany) or private",
    category: "EU enterprise privacy",
    tone: "mid",
  },
  {
    tool: "Matomo (cookieless + self-hosted)",
    cookies: "No, in that config",
    banner: "Not required in exempted config",
    pii: "Minimised / anonymised",
    location: "Wherever you host it",
    category: "Open-source, self-managed",
    tone: "mid",
  },
  {
    tool: "Plausible · Fathom · Umami",
    cookies: "No",
    banner: "Not required",
    pii: "None / minimal",
    location: "EU options",
    category: "Lightweight privacy-first (€9–50/mo)",
    tone: "good",
  },
  {
    tool: "Sealmetrics",
    cookies: "No — cookieless by architecture",
    banner: "Not required",
    pii: "None — 0 PII, aggregate only",
    location: "EU — Dublin, Ireland",
    category: "Enterprise, complete-data",
    tone: "best",
  },
];

const toneCell: Record<string, string> = {
  warn: "text-red-alert",
  mid: "text-text-secondary",
  good: "text-text-primary",
  best: "text-brand",
};

const faqs = [
  {
    question: "Does web analytics require a cookie consent banner?",
    answer:
      "Not always. A consent banner is legally required only when your analytics does something that triggers consent under one of two laws. Under the ePrivacy Directive (Article 5(3)), consent is needed to store or read information on a visitor's device — a cookie, a localStorage entry, a fingerprint. Under GDPR, a lawful basis is needed to process personal data such as an IP address or an online identifier. Analytics that stores nothing on the device and processes no personal data clears both bars, and no banner is required for it.",
  },
  {
    question: "Is Google Analytics (GA4) GDPR-compliant?",
    answer:
      "GA4 can be operated under GDPR with consent, but it is not consent-free. It sets first-party cookies and processes personal data (IP-derived location, client ID), so in the EU it requires a consent banner for full measurement — and consent rejection is why GA4 typically reports a fraction of real EU traffic. Google is a US company; between 2022 and 2023 several EU regulators (Austria, France, Italy) found specific GA deployments unlawful under the Schrems II ruling on US data transfers. Google has since added EU-based data options and Consent Mode, but the tool remains cookie-based and consent-dependent.",
  },
  {
    question: "Is Matomo GDPR-compliant?",
    answer:
      "Matomo can be. In its cookieless configuration — no cookies, anonymised IP, respecting Do Not Track — Matomo can run without consent, and France's CNIL has listed compliant Matomo configurations among analytics that may be used consent-free. Self-hosting also keeps data on infrastructure you control. The trade-offs are operational: you either self-host and maintain it, or use Matomo Cloud, and the cookieless configuration sacrifices some measurement accuracy. It is a credible privacy-focused tool; the question is whether it gives an enterprise eCommerce team complete data and revenue attribution without an engineering burden.",
  },
  {
    question: "Is Plausible GDPR-compliant?",
    answer:
      "Yes. Plausible, along with Fathom and Umami, is cookieless by default, processes little or no personal data, and can be hosted in the EU, so it generally runs without a consent banner. These are lightweight, privacy-first analytics tools in a different category from enterprise platforms — priced around €9–50/month and built for simple traffic reporting rather than eCommerce revenue attribution, funnels, or the data depth an enterprise marketing team needs. They are a good fit for a blog or a small site; they are not designed for a 10M€+ eCommerce operation.",
  },
  {
    question: "What is the most complete GDPR-compliant analytics platform?",
    answer:
      "Most tools force a trade-off: enterprise platforms like GA4 and Adobe are deep but consent-dependent, so they lose EU data at the banner; lightweight privacy tools are compliant but shallow. Sealmetrics is built to remove the trade-off — cookieless by architecture, zero PII, aggregate-only, and EU-hosted in Dublin, so it needs no consent banner and does not lose traffic to consent rejection, while still providing last-click revenue attribution and eCommerce depth. It is designed for GDPR from the architecture up (self-assessed) rather than by configuration, with a DPA included and a clean Schrems II posture.",
  },
  {
    question: "What makes Sealmetrics consent-free by design?",
    answer:
      "Sealmetrics stores nothing on the visitor's device and processes no personal data. There are no cookies, no localStorage, no fingerprinting, and no IP retention or personal identifiers — measurement is aggregate and anonymous at the event level. Because it clears both the ePrivacy device test and the GDPR personal-data test, no consent banner is legally required for it. Data is hosted in Dublin, Ireland, a DPA is included, and attribution is last-click on data without consent gaps. Note Sealmetrics does not claim ISO 27001 or SOC 2 certification; its compliance case rests on architecture — designed for GDPR (self-assessed), ePrivacy, and Schrems II-clean EU hosting.",
  },
];

const accentBar: Record<string, string> = {
  amber: "before:bg-amber",
  brand: "before:bg-brand",
  neutral: "before:bg-warm-200",
};

export default function Page() {
  const dates = postDates("gdpr-eprivacy-analytics-legal-assessment");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "Is Your Analytics GDPR-Compliant?" }]} />
      <JsonLd
        data={articleSchema({
          headline: "Is Your Analytics Actually GDPR-Compliant? A Legal Assessment",
          description:
            "GDPR and ePrivacy are two different laws. Analytics has to clear both to run without a consent banner. Here is the legal test, and where GA4, Matomo, Plausible, Piwik PRO and Sealmetrics each land.",
          ...dates,
          url: "/blog/gdpr-eprivacy-analytics-legal-assessment",
          category: "Regulation",
          author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/blog" }, { name: "Is Your Analytics GDPR-Compliant?", url: "/blog/gdpr-eprivacy-analytics-legal-assessment" }])} />
      <JsonLd data={faqPageSchema(faqs, "/blog/gdpr-eprivacy-analytics-legal-assessment")} />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              Regulation
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.15] mb-5">
              Is Your Analytics <em>Actually</em> GDPR-Compliant?
            </h1>
            <p className="text-[1.2rem] leading-[1.6] text-text-secondary mb-6 max-w-[52ch]">
              &ldquo;GDPR-compliant&rdquo; is printed on almost every analytics homepage. Two different laws decide whether it&apos;s true — and most tools only clear one of them. Here is the legal test, and where GA4, Matomo, Plausible, Piwik PRO and Sealmetrics each land.
            </p>
            <PostByline
              {...dates}
              readTime="9 min read"
              authorName="Rafa Jiménez"
              authorUrl="/authors/rafa-jimenez"
            />
          </header>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              Every analytics vendor calls itself GDPR-compliant. The claim is nearly meaningless on its own, because compliance isn&apos;t a badge a tool either has or doesn&apos;t — it&apos;s a function of what the tool does on the page, what it stores, and what it can legally do without asking the visitor first. The gap that matters to a marketing team is narrow and expensive: whether your analytics needs a consent banner. If it does, roughly a third of your EU visitors will reject it, and those visitors vanish from your data before you can measure a single conversion.
            </p>
            <p>
              So the practical question isn&apos;t &ldquo;is this tool GDPR-compliant.&rdquo; It&apos;s &ldquo;can this tool measure my traffic <em>without</em> a consent banner, lawfully.&rdquo; Answering that requires separating two laws that get collapsed into one in everyday conversation — because a tool can satisfy one and still fail the other.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              Two laws, not one
            </h2>
            <p>
              &ldquo;The GDPR&rdquo; is doing too much work in most privacy conversations. Consent-free analytics has to clear two separate legal bars, set by two separate instruments:
            </p>

            {/* ── The two laws ── */}
            <figure className="my-10 not-prose">
              <div className="rounded-[16px] border border-warm-100 bg-warm-white overflow-hidden">
                {lawSplit.map((layer, i) => (
                  <div
                    key={layer.n}
                    className={`relative flex gap-5 items-start p-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] ${accentBar[layer.accent]} ${i !== 0 ? "border-t border-warm-100" : ""}`}
                  >
                    <span className="font-mono text-[0.8rem] font-semibold text-text-tertiary pt-1 w-[64px] shrink-0">{layer.n}</span>
                    <div>
                      <div className="font-serif text-[1.05rem] font-medium text-text-primary mb-1">{layer.label}</div>
                      <div className="text-[0.9rem] leading-[1.6] text-text-secondary">{layer.body}</div>
                    </div>
                  </div>
                ))}
              </div>
              <figcaption className="mt-3 text-[0.8rem] text-text-tertiary text-center">
                ePrivacy asks &ldquo;did you touch the device?&rdquo; GDPR asks &ldquo;did you process personal data?&rdquo; They are answered independently.
              </figcaption>
            </figure>

            <p>
              This is the distinction most &ldquo;GDPR-compliant analytics&rdquo; copy blurs. A tool can be perfectly clean under GDPR — anonymising everything it processes — and still trip Article 5(3) of ePrivacy because it drops a cookie. Conversely, a tool could avoid cookies yet still process an IP address in a way that needs a GDPR lawful basis. Both bars have to clear before you can drop the banner. The concept has a name and a longer treatment on our <Link href="/glossary/gdpr-analytics-compliance" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">GDPR analytics compliance</Link> glossary entry; the two-part test below is the operational version of it.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              The consent-free test
            </h2>
            <p>
              Reduced to its working form, analytics can run without a consent banner when it passes both of these — and only when it passes both:
            </p>

            {/* ── The two locks: dark slab ── */}
            <figure className="my-10 not-prose">
              <div className="relative rounded-[20px] bg-ink text-warm-50 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.30] pointer-events-none"
                  style={{ background: "radial-gradient(120% 90% at 85% 0%, rgba(45,139,109,0.5), transparent 60%)" }}
                />
                <div className="relative p-7 sm:p-9 space-y-6">
                  <div>
                    <div className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-amber mb-2">Test 1 · the device</div>
                    <p className="text-[0.98rem] leading-[1.65]">
                      Nothing is stored on or read from the visitor&apos;s device — no cookies, no localStorage, no fingerprinting. This clears ePrivacy Article 5(3), the consent trigger that applies to <em>all</em> storage, personal or not.
                    </p>
                  </div>
                  <div className="border-t border-warm-50/15 pt-6">
                    <div className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-brand mb-2">Test 2 · the data</div>
                    <p className="text-[0.98rem] leading-[1.65]">
                      No personal data is processed — no IP retention, no online identifiers, only aggregate, anonymous counts. With no personal data in play, GDPR does not apply to the measurement at all.
                    </p>
                  </div>
                  <div className="border-t border-warm-50/15 pt-6">
                    <p className="text-[0.98rem] leading-[1.65] text-warm-50/90">
                      Pass both and no consent banner is legally required for your analytics. Fail either and you are back to a banner — and the data loss that comes with it.
                    </p>
                  </div>
                </div>
              </div>
              <figcaption className="mt-3 text-[0.8rem] text-text-tertiary text-center">
                Both locks must open. Most tools open one.
              </figcaption>
            </figure>

            <p>
              Regulators have been converging on exactly this reading. France&apos;s CNIL maintains an exemption for analytics that meets a set of technical criteria — the basis for the <Link href="/blog/cnil-self-assessment-published" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">self-assessment we published</Link> showing how Sealmetrics satisfies it. The UK&apos;s DUAA 2025 introduced a live analytics exemption under PECR. And the proposed EU Digital Omnibus (COM(2025) 837) would move cookie-consent rules into GDPR and give first-party analytics an explicit legal footing — <Link href="/blog/eu-digital-omnibus-marketer-guide-2026" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">still a proposal, but a clear direction of travel</Link>. Every one of these rewards the same architecture: no device storage, no personal data.
            </p>

            <CommercialModule
              hook="Sealmetrics is designed to pass the consent-free test: no cookies, no identifiers, aggregate-only counts. Put the assessment questions to us directly."
            />

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              Where each tool lands
            </h2>
            <p>
              With the test defined, the major analytics tools sort themselves cleanly. The table reads across the two-part test — device storage and personal data — plus where the data lives and which category the tool competes in.
            </p>

            {/* ── The matrix ── */}
            <div className="overflow-x-auto my-8 not-prose">
              <table className="w-full text-[0.82rem] border-collapse min-w-[720px]">
                <thead>
                  <tr className="border-b border-warm-200">
                    <th className="text-left py-3 pr-4 text-text-tertiary font-medium w-[22%]">Tool</th>
                    <th className="text-left py-3 px-3 text-text-tertiary font-medium">Cookies</th>
                    <th className="text-left py-3 px-3 text-text-tertiary font-medium">Banner in EU</th>
                    <th className="text-left py-3 px-3 text-text-tertiary font-medium">Personal data</th>
                    <th className="text-left py-3 px-3 text-text-tertiary font-medium">Data location</th>
                    <th className="text-left py-3 pl-3 text-text-tertiary font-medium">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {matrix.map((row) => (
                    <tr key={row.tool} className="border-b border-warm-100 last:border-0 align-top">
                      <td className={`py-3 pr-4 font-medium ${row.tone === "best" ? "text-brand" : "text-text-body"}`}>{row.tool}</td>
                      <td className={`py-3 px-3 ${toneCell[row.tone]}`}>{row.cookies}</td>
                      <td className={`py-3 px-3 ${toneCell[row.tone]}`}>{row.banner}</td>
                      <td className={`py-3 px-3 ${toneCell[row.tone]}`}>{row.pii}</td>
                      <td className="py-3 px-3 text-text-secondary">{row.location}</td>
                      <td className="py-3 pl-3 text-text-secondary">{row.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[0.8rem] text-text-tertiary">
              Assessment reflects each tool&apos;s standard EU deployment as of July 2026. Cookieless configurations of Matomo and privacy settings in Piwik PRO can change the outcome for those rows; the enterprise incumbents cannot be configured out of their cookie and consent dependency.
            </p>

            <h3 className="font-serif text-[1.2rem] font-medium text-text-primary mt-10 mb-3">
              GA4 and Adobe — deep, but consent-dependent
            </h3>
            <p>
              GA4 works well as an analytics product, and for a US-centric business the compliance questions are lighter. In the EU, though, it sets cookies and processes personal data, so it needs a consent banner for full measurement — and that is precisely why <Link href="/blog/why-ga4-shows-13pct-eu-traffic" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">GA4 ends up reporting a sliver of real EU traffic</Link>. Google has added EU data hosting and Consent Mode since the 2022 Schrems II rulings against specific GA deployments, but the architecture is unchanged: cookie-based, consent-gated, incomplete once visitors decline. Adobe Analytics sits in the same position at a higher price point.
            </p>

            <h3 className="font-serif text-[1.2rem] font-medium text-text-primary mt-10 mb-3">
              Matomo and Piwik PRO — privacy-capable, with a cost
            </h3>
            <p>
              Matomo deserves credit: in its cookieless, anonymised-IP configuration it can run consent-free, and CNIL has recognised compliant Matomo setups. Self-hosting keeps the data on infrastructure you control. The cost is operational — you either run and maintain the server yourself, or move to Matomo Cloud — and the consent-free configuration trades away some measurement accuracy. Piwik PRO is the EU enterprise cousin: privacy-configurable, EU-hosted, but consent-based by default and priced at the enterprise tier (€30K+/yr). Both are real options; the open question for an eCommerce team is whether they deliver complete data and revenue attribution without an engineering project attached. We put the detail side by side on our <Link href="/vs/matomo" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Sealmetrics vs Matomo</Link> comparison.
            </p>

            <h3 className="font-serif text-[1.2rem] font-medium text-text-primary mt-10 mb-3">
              Plausible, Fathom, Umami — compliant, but a different category
            </h3>
            <p>
              These are the cleanest tools on the consent test and the easiest to praise: cookieless, little or no personal data, EU hosting available, no banner. They are also a different category of product. Priced around €9–50 a month, they are built for simple, privacy-respecting traffic reporting — pageviews, sources, top pages — not for eCommerce revenue attribution, funnel analysis, or the data depth a 10M€+ operation runs on. If you publish a blog, they are an excellent, honest choice. If you run a European eCommerce business making budget decisions on channel-level return, they were not built for the job. Compliant and complete are two different bars, and the lightweight tier clears the first by staying small.
            </p>

            <h3 className="font-serif text-[1.2rem] font-medium text-text-primary mt-10 mb-3">
              Sealmetrics — built for compliance <em>and</em> completeness
            </h3>
            <p>
              The trade-off running through this whole table is between compliance and completeness. Enterprise incumbents are complete but consent-gated, so they lose EU data at the banner. Lightweight privacy tools are compliant but shallow. Sealmetrics is designed to sit where neither has to be sacrificed: <Link href="/cookieless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">cookieless by architecture</Link>, zero PII, aggregate-only, and EU-hosted in Dublin — so it is designed to pass both halves of the consent test and need no banner, while still delivering last-click revenue attribution and eCommerce depth without consent gaps. Compliance here is designed into the architecture (self-assessed), not a configuration you have to get right: designed for GDPR, ePrivacy-clean, Schrems II-clean, DPA included. It is worth being precise about what that does not include — Sealmetrics does not claim ISO 27001 or SOC 2 certification, and its case rests on how it&apos;s built rather than on a certificate.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              What to actually check before you trust the badge
            </h2>
            <p>
              When a vendor tells you it&apos;s GDPR-compliant, the useful follow-ups are short and specific. Does it set anything on the device — a cookie, localStorage, a fingerprint? If yes, it needs consent under ePrivacy regardless of how anonymous the data is. Does it process any personal data, including raw IP addresses? If yes, it needs a GDPR lawful basis. Where is the data hosted, and is there a DPA? And — the question the compliance conversation usually forgets — how much of your traffic actually survives the setup, because a compliant tool that only sees the visitors who clicked &ldquo;accept&rdquo; is compliant and blind at the same time. For the full framework, our <Link href="/consentless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">consentless analytics</Link> page walks through each requirement, and if you&apos;re weighing a move off GA4 specifically, the <Link href="/alternatives/google-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Google Analytics alternatives</Link> guide maps the options against exactly these tests.
            </p>
            <p>
              The short version: compliance and completeness are separate properties, and most of the market makes you choose. The two-part test is how you tell which one a given tool actually gives you — and whether the &ldquo;GDPR-compliant&rdquo; on its homepage means <em>lawful without a banner</em> or just <em>lawful if you ask permission first.</em>
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              Frequently asked questions
            </h2>
            {faqs.map((f) => (
              <div key={f.question} className="mt-6">
                <h3 className="font-serif text-[1.15rem] font-medium text-text-primary mb-2">{f.question}</h3>
                <p className="text-[0.95rem]">{f.answer}</p>
              </div>
            ))}

            <p className="text-[0.85rem] text-text-tertiary mt-10 italic">
              This article is general information about how data-protection law applies to web analytics, not legal advice. For your specific deployment, confirm with your DPO or counsel.
            </p>
          </div>

          <CommercialModule
            hook="A compliance badge is a claim; an architecture is a fact. Walk through the DPA, the Dublin hosting and the aggregate-only model in a demo."
          />

          <RelatedReading currentSlug="gdpr-eprivacy-analytics-legal-assessment" />

          <section className="mt-16 pt-10 border-t border-warm-100">
            <h2 className="text-[0.75rem] font-medium uppercase tracking-[0.06em] text-text-tertiary mb-5">
              Go deeper
            </h2>
            <ul className="space-y-4">
              <li>
                <Link href="/consentless-analytics" className="text-[0.95rem] text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Consentless analytics — the full framework</Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">Every requirement for running analytics lawfully in the EU, in one place.</p>
              </li>
              <li>
                <Link href="/vs/matomo" className="text-[0.95rem] text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Sealmetrics vs Matomo</Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">Two privacy-first approaches compared on data completeness and maintenance.</p>
              </li>
              <li>
                <Link href="/security" className="text-[0.95rem] text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Security &amp; compliance posture</Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">EU hosting in Dublin, DPA, Schrems II and the TPSR package — stated plainly.</p>
              </li>
            </ul>
          </section>
        </div>
      </article>
    </>
  );
}
