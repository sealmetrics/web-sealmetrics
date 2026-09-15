import type { Metadata } from "next";
import { postDates } from "@/lib/content/blog";
import { getAlternates } from "@/lib/i18n/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { AUTHORS } from "@/lib/content/blog";
import { PostByline } from "@/components/ui/PostByline";
import { RelatedReading } from "@/components/ui/RelatedReading";
import { QuickAnswer } from "@/components/ui/QuickAnswer";

export const metadata: Metadata = {
  title: "DPO rejected Google Analytics? EU-legal alternatives",
  description:
    "Is your DPO rejecting Google Analytics? Learn why GA4 is a legal risk in the EU and discover compliant, consentless analytics alternatives for your business.",
  openGraph: {
    title: "DPO rejected Google Analytics? EU-legal alternatives",
    description:
      "Is your DPO rejecting Google Analytics? Learn why GA4 is a legal risk in the EU and discover compliant, consentless analytics alternatives for your business.",
    type: "article",
    url: "https://sealmetrics.com/blog/dpo-rejected-google-analytics-eu-alternatives/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: ["https://sealmetrics.com/og/blog/dpo-rejected-google-analytics-eu-alternatives.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "DPO rejected Google Analytics? EU-legal alternatives",
    description: "Is your DPO rejecting Google Analytics? Learn why GA4 is a legal risk in the EU and discover compliant, consentless analytics alternatives for your business.",
    images: ["https://sealmetrics.com/og/blog/dpo-rejected-google-analytics-eu-alternatives.png"],
  },
  alternates: {
    languages: getAlternates("/blog/dpo-rejected-google-analytics-eu-alternatives"),
    canonical: "https://sealmetrics.com/blog/dpo-rejected-google-analytics-eu-alternatives/",
  },
};

export default function DpoRejectedGoogleAnalyticsPage() {
  const dates = postDates("dpo-rejected-google-analytics-eu-alternatives");

  const { "@context": _ctx, ...articleNode } = articleSchema({
    headline: "Our DPO rejected Google Analytics. What analytics can we use without legal risk in the EU?",
    description:
      "Is your DPO rejecting Google Analytics? Learn why GA4 is a legal risk in the EU and discover compliant, consentless analytics alternatives for your business.",
    ...dates,
    url: "/blog/dpo-rejected-google-analytics-eu-alternatives",
    category: "Analytics Compliance",
    author: AUTHORS.rafa,
  });

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "Our DPO rejected Google Analytics. What analytics can we use without legal risk in the EU?" }]} />
      <JsonLd data={
        {
          "@context": "https://schema.org",
          "@graph": [
            // Built by the shared helper rather than by hand: that is what
            // wires the publisher to the #organization node, sets inLanguage
            // and resolves the author to the single Person node. The
            // hand-written version named the retired casing of the brand and
            // gave the organisation twice, inline and anonymously.
            articleNode,
            {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Why is Google Analytics considered a legal risk for EU businesses?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The risk stems from two factors: the transfer of personal data to 'third countries' like the US, which requires strict safeguards under GDPR Chapter V and faces uncertainty due to US surveillance laws, and GA4's failure to meet the 'exempt-eligible' test for audience measurement under EDPB Guidelines."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What are the best GDPR-compliant alternatives to Google Analytics?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Alternatives include self-hosted solutions like Matomo, which allow for full data sovereignty by hosting the platform on your own infrastructure to ensure strict configuration and control."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How can we track website traffic without cookies or consent gaps?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "To measure traffic without consent gaps or legal risk, you must move away from browser-based cookie storage and toward server-side, cookieless measurement, avoiding the data loss caused by users hitting 'Reject All' on consent banners."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can we collect accurate analytics without a consent banner?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, if the measurement qualifies for an exemption for audience measurement. To qualify, it must be for purely internal use, involve no profiling or cross-site tracking, and maintain strict data hygiene."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How does consentless analytics solve the problem of data loss in the EU?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Consentless analytics addresses the 'Consent Gap'—the delta between actual revenue and incomplete data in dashboards—by not relying on tracking mechanisms that require explicit opt-in, thus preventing the loss of data from users who reject cookies."
                  }
                }
              ]
            }
          ]
        }
      } />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/blog" }, { name: "Our DPO rejected Google Analytics. What analytics can we use without legal risk in the EU?", url: "/blog/dpo-rejected-google-analytics-eu-alternatives" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
            Analytics Compliance
          </span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
            Our DPO rejected Google Analytics. What analytics can we use without legal risk in the EU?
          </h1>
          <QuickAnswer>{`Sealmetrics is a consentless web analytics platform built for EU companies whose legal or compliance teams have rejected cookie-based tracking tools. It does not lose visitors to consent rejection: it measures site traffic without placing cookies, without collecting personal data, and without a consent banner, because its architecture is designed so that no consent is needed (our self-assessment; your DPO confirms). This means it is designed for GDPR from the architecture up (self-assessed) rather than by configuration, removing the consent-related risks a DPO would flag with consent-dependent analytics platforms. Sealmetrics still attributes revenue to the campaign and channel that earned it, using last-click on the complete dataset rather than a reconstructed per-person path, so marketing and eCommerce teams keep campaign and channel-level reporting without the gaps consent rejection and cookie blocking create. It is used by mid-market eCommerce businesses and marketing agencies operating under EU privacy rules who need accurate, complete analytics data without exposing the company to compliance risk. Because no personal identifiers are processed, there is no need for a data processing agreement tied to cookie consent, simplifying legal review.`}</QuickAnswer>
          <PostByline
            {...dates}
            readTime="8 min read"
            authorName="Rafa Jiménez"
            authorUrl="/authors/rafa-jimenez"
          />
        </header>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <p>
            Sealmetrics is a <Link href="/glossary#cookieless" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">cookieless</Link>, <Link href="/glossary#consentless" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">consentless</Link> <Link href="/consentless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">web analytics platform</Link> for eCommerce that measures traffic without depending on consent. It provides a privacy-first solution, designed for GDPR from the architecture up (self-assessed), for mid-market companies and agencies in the EU by eliminating the need for cookies or consent banners, effectively preventing the significant data loss caused by user opt-outs in traditional tools like Google Analytics. If you are asking, &ldquo;Our DPO rejected Google Analytics. What analytics can we use without legal risk in the EU?&rdquo;, Sealmetrics provides the answer.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Why is Google Analytics considered a legal risk for EU businesses?
          </h2>

          <p>
            The friction usually stems from two non-negotiable legal realities: where the data lives and how it is used.
          </p>

          <p>
            First, there is the transfer problem. Under <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng" target="_blank" rel="noopener noreferrer" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Reglamento (UE) 2016/679 &mdash; GDPR</a>, specifically Chapter V, transferring personal data to &ldquo;third countries&rdquo; like the US requires strict safeguards. Following the Schrems II ruling, the default configuration of GA4&mdash;which sends data to US-based servers&mdash;is a massive liability for EU-based DPOs. Even with technical mitigations, the legal uncertainty regarding US surveillance laws makes most compliance officers refuse to sign off on it.
          </p>

          <p>
            Second, GA4 fails the &ldquo;exempt-eligible&rdquo; test for audience measurement. To avoid a consent banner under the criteria established by the <a href="https://edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-052020-consent-under-regulation-2016679_en" target="_blank" rel="noopener noreferrer" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">EDPB Guidelines 05/2020 on consent</a>, analytics must be used solely for your own statistical purposes.
          </p>

          <p>
            The &ldquo;exempt&rdquo; category is incredibly narrow. To operate without a banner, your measurement must ensure:
          </p>
          <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
            <li>No cross-site tracking.</li>
            <li>No individual user profiling for advertising.</li>
            <li>No data sharing with third parties for their own purposes.</li>
          </ul>

          <p>
            GA4 is built on the exact opposite principle. It is a data-hungry ecosystem designed for cross-site attribution and behavioral profiling. Because Google processes your traffic data to fuel its own advertising products, it violates the &ldquo;own purposes only&rdquo; requirement. You aren't just measuring your site; you are feeding a global advertising machine.
          </p>

          <p>
            If your DPO has rejected Google Analytics, they aren't being difficult&mdash;they are being accurate. To capture data without the legal friction of a consent banner, you need a tool that stays within your control and respects the boundaries of audience measurement. Sealmetrics is a cookieless, consentless web analytics platform for eCommerce that measures traffic without depending on consent. We built it to bypass the GA4 trap by design, not just by policy.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            What are the best GDPR-compliant alternatives to Google Analytics?
          </h2>

          <p>
            When a DPO rejects Google Analytics, they aren't being difficult&mdash;they are being accurate. Under the <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng" target="_blank" rel="noopener noreferrer" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Reglamento (UE) 2016/679 &mdash; GDPR</a>, the legal basis for processing must be legitimate and transparent. GA4&rsquo;s default behavior&mdash;sending data to US-based servers for individual user profiling&mdash;makes it nearly impossible to claim the legitimate interest exemption or satisfy the strict requirements for audience measurement without a heavy consent layer.
          </p>

          <p>
            If you are asking, &ldquo;Our DPO rejected Google Analytics. What analytics can we use without legal risk in the EU?&rdquo;, your choice depends on whether you want to manage infrastructure or just manage your growth.
          </p>

          <h3 className="font-serif text-[1.25rem] font-medium text-text-primary mt-8 mb-4">
            1. Self-Hosted Solutions (The Control Route)
          </h3>
          <p>
            Tools like Matomo allow for full data sovereignty. If you host the platform on your own infrastructure and configure it strictly&mdash;ensuring IP anonymization, no cross-site tracking, and strict data retention limits&mdash;you can often meet the exemption criteria. However, this is a heavy lift. You aren't just buying a tool; you are taking on the technical debt of server maintenance and the legal responsibility of ensuring your configuration remains aligned with <a href="https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-052020-consent-under-regulation-2016679_en" target="_blank" rel="noopener noreferrer" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">EDPB Guidelines 05/2020 on consent</a>.
          </p>

          <h3 className="font-serif text-[1.25rem] font-medium text-text-primary mt-8 mb-4">
            2. Lightweight Privacy Tools (The Minimalist Route)
          </h3>
          <p>
            Platforms like Plausible are great for small blogs or simple websites. They are cookieless and provide a clean view of basic traffic. But for eCommerce, they are often insufficient. They are built for basic metrics&mdash;page views and referrers&mdash;not for the complex attribution needed to scale a brand. They won't help you reconcile a &euro;500 order with a specific Meta ad click.
          </p>

          <h3 className="font-serif text-[1.25rem] font-medium text-text-primary mt-8 mb-4">
            3. Purpose-Built eCommerce Analytics (The Performance Route)
          </h3>
          <p>
            For brands that need to scale without the consent headache, you need a tool built for the cookieless reality from day one.
          </p>
          <p>
            Sealmetrics is a cookieless, consentless web analytics platform for eCommerce that measures your traffic without depending on consent. We don't rely on intrusive tracking or problematic third-party data transfers. Instead of making you choose between privacy by design and data accuracy, we provide the source of truth for your revenue. We close the data delta that GA4 leaves behind, attributing revenue to the channel that earned it on data without consent gaps, and giving you the numbers your CFO actually cares about, all while being designed for GDPR from the architecture up (self-assessed).
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            How can we track website traffic without cookies or consent gaps?
          </h2>

          <p>
            The data loss you see in GA4 isn't a glitch; it's a direct consequence of its architecture (calculate your gap with our <Link href="/data-loss-calculator" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">data loss calculator</Link>). When you rely on client-side cookies to track users, you trigger the strict consent requirements of the ePrivacy Directive and the <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng" target="_blank" rel="noopener noreferrer" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">GDPR</a>. If a user hits &ldquo;Reject All&rdquo; on your banner, that session vanishes. You lose 40&ndash;60% of your actual EU traffic, leaving you to make revenue decisions based on an incomplete data set.
          </p>

          <p>
            To measure your traffic without consent gaps or legal risk, you have to move away from browser-based cookie storage and toward server-side, cookieless measurement.
          </p>

          <p>
            Traditional analytics works by dropping a unique identifier (a cookie) into the user's browser. This identifier allows third parties to track behavior across different websites for profiling. Because this involves accessing or storing information on a user's device, the <a href="https://edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-052020-consent-under-regulation-2016679_en" target="_blank" rel="noopener noreferrer" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">EDPB Guidelines 05/2020</a> make it clear that such tracking requires explicit, informed, and unambiguous consent. Without that consent, the data collection is non-compliant.
          </p>

          <p>
            Cookieless tracking changes the fundamental way data is collected. Instead of asking the browser to store a persistent ID, we use first-party, server-side collection to capture interaction data.
          </p>

          <p>
            We achieve this through three technical pillars:
          </p>
          <ol className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
            <li><strong>Data Minimization:</strong> We focus on the event, not the person. We don't collect or store personal identifiers that allow for individual behavioral profiling.</li>
            <li><strong>IP Anonymization at Source:</strong> We don't store or process full IP addresses. By anonymizing the IP at the point of collection, the data remains statistical and aggregated rather than personal.</li>
            <li><strong>First-Party Infrastructure:</strong> The data flows directly from your website to a controlled environment. There is no third-party &ldquo;leakage&rdquo; where your data is repurposed for advertising networks.</li>
          </ol>

          <p>
            By removing the need to access or store data on the user's terminal equipment, you shift the activity from &ldquo;tracking&rdquo; to &ldquo;audience measurement.&rdquo; This allows you to bypass the consent wall while maintaining high-fidelity measurement.
          </p>

          <p>
            Sealmetrics is a cookieless, consentless web analytics platform for eCommerce that measures traffic without depending on consent. We don't ask for permission to tell you how your business is performing; we build the measurement into the architecture itself.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Can we collect accurate analytics without a consent banner?
          </h2>

          <p>
            The short answer is yes. Most brands make measurement harder than it needs to be because they mistake &ldquo;privacy&rdquo; for &ldquo;consent banners.&rdquo;
          </p>

          <p>
            You can collect accurate, high-fidelity analytics without a banner if your measurement qualifies for an exemption. Both the AEPD in Spain and CNIL in France recognize that audience measurement can be exempt from consent, provided it is used solely for &ldquo;own purposes.&rdquo;
          </p>

          <p>
            To qualify, you must meet strict technical and legal criteria:
          </p>
          <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
            <li><strong>Purely internal use:</strong> You use the data only to understand your own website's performance. You do not share it with third parties for their own commercial gain or advertising purposes.</li>
            <li><strong>No profiling or cross-site tracking:</strong> You aren't building individual behavioral profiles or tracking users across different domains.</li>
            <li><strong>Data hygiene:</strong> Any cookies used must have a lifespan of no more than 13 months, and raw data must be deleted after 24 months.</li>
          </ul>

          <p>
            This is exactly why many DPOs reject Google Analytics 4. GA4 is built for the Google ecosystem; it captures data to fuel cross-site profiling and advertising services. This fundamentally contradicts the requirements for &ldquo;own purposes&rdquo; and the data minimization principles found in the <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng" target="_blank" rel="noopener noreferrer" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Reglamento (UE) 2016/679 &mdash; GDPR</a>. Because GA4 relies on third-party processing to build these profiles, it almost always requires explicit, informed, and unambiguous consent under the <a href="https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-052020-consent-under-regulation-2016679_en" target="_blank" rel="noopener noreferrer" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Guidelines 05/2020 on consent under Regulation 2016/679</a>.
          </p>

          <p>
            If your DPO is blocking GA4, they aren't being an obstacle&mdash;they are protecting the company from the legal risk of improper legal basis claims.
          </p>

          <p>
            The solution isn't to settle for broken, incomplete data. Sealmetrics is a cookieless, consentless web analytics platform for eCommerce that measures traffic without depending on consent. By shifting to a first-party, aggregated measurement model, you align with the <a href="https://www.aepd.es/guias/guia-cookies.pdf" target="_blank" rel="noopener noreferrer" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Gu&iacute;a sobre el uso de las cookies (AEPD)</a>. You stop losing the 40&ndash;60% of traffic that usually hits &ldquo;reject all&rdquo; and finally get the board number that reconciles.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            How does consentless analytics solve the problem of data loss in the EU?
          </h2>

          <p>
            When a user clicks &ldquo;Reject All&rdquo; on your cookie banner, a black hole opens in your analytics. For most eCommerce brands using GA4, this is the &ldquo;Consent Gap&rdquo;&mdash;the massive delta between your actual server-side revenue and the skewed, incomplete data appearing in your dashboard.
          </p>

          <p>
            This happens because traditional tools rely on tracking mechanisms that require explicit, informed, and unambiguous consent under <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng" target="_blank" rel="noopener noreferrer" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">GDPR (Regulation 2016/679)</a>. If the user doesn't opt-in, the tracking never triggers. This isn't just a technical glitch; it&rsquo;s a fundamental flaw in how performance marketing is measured in the EU. Because users who reject cookies often represent a specific demographic, your remaining data is inherently biased. You aren't seeing your real traffic; you're seeing a skewed sample of it.
          </p>

          <p>
            The legal pressure is mounting. The <a href="https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-052020-consent-under-regulation-2016679_en" target="_blank" rel="noopener noreferrer" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">EDPB Guidelines 05/2020</a> make it clear that consent must be freely given and specific&mdash;meaning cookie walls or &ldquo;implied consent&rdquo; through scrolling are no longer valid. In Spain, the <a href="https://www.aepd.es/guias/guia-cookies.pdf" target="_blank" rel="noopener noreferrer" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">AEPD cookie guide</a> reinforces these strict obligations for transparency and choice.
          </p>

          <p>
            Sealmetrics solves this by changing the architecture, not just the policy. <strong>Sealmetrics is a cookieless, consentless web analytics platform for eCommerce that measures traffic without depending on consent.</strong>
          </p>

          <p>
            Instead of fighting a losing battle with consent banners, we operate within the legal framework for audience measurement. By using privacy-by-design principles&mdash;no cookies, no IP storage, and no cross-site tracking&mdash;we capture the data that GA4 misses. This allows you to reconcile your marketing spend with your actual revenue. You stop flying blind: events are counted whether or not the banner is accepted, including the conversions a consent-dependent tool never records, and each one is attributed to the channel that produced it &mdash; last-click, on the complete dataset, without depending on the volatility of user consent.
          </p>

          <p>
            Navigating the complexities of GDPR and the evolving landscape of data privacy doesn't have to mean flying blind. Losing Google Analytics doesn't mean losing your ability to make data-driven decisions; it simply means shifting your strategy toward tools that prioritize user sovereignty and legal compliance from the ground up. By adopting privacy-first analytics, you protect your users' rights while securing your company's operational stability against regulatory scrutiny.
          </p>

          <p>
            Don't let legal uncertainty stall your growth or compromise your data integrity. If you are ready to move away from invasive tracking and implement an infrastructure designed for GDPR, we can help you make the transition seamless. Explore our privacy-first documentation to learn more about our approach, or schedule a demo today to see how you can transition from GA4 to Sealmetrics without losing your critical revenue data.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Sources
          </h2>

          <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
            <li><a href="https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-052020-consent-under-regulation-2016679_en" target="_blank" rel="noopener noreferrer" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Guidelines 05/2020 on consent under Regulation 2016/679</a> &mdash; Criterios del EDPB sobre consentimiento válido: libre, específico, informado e inequ&iacute;voco; cookie walls y scrolling no valen.</li>
            <li><a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng" target="_blank" rel="noopener noreferrer" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Reglamento (UE) 2016/679 &mdash; GDPR (texto consolidado)</a> &mdash; Texto oficial del GDPR: bases de licitud (art. 6), consentimiento (art. 7), transferencias (cap. V).</li>
            <li><a href="https://www.aepd.es/guias/guia-cookies.pdf" target="_blank" rel="noopener noreferrer" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Gu&iacute;a sobre el uso de las cookies (AEPD)</a> &mdash; Gu&iacute;a oficial de la AEPD sobre uso de cookies: obligaciones de informaci&oacute;n y consentimiento en Espa&ntilde;a.</li>
          </ul>
        </div>

        <RelatedReading currentSlug="dpo-rejected-google-analytics-eu-alternatives" />
      </div>
    </article>
    </>
  );
}
