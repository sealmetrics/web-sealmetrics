import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { RelatedGlossaryTerms } from "@/components/ui/RelatedGlossaryTerms";
import { definedTermSchema, breadcrumbSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Data Residency Analytics Europe: How EU Storage Works",
  description:
    "Data residency analytics for Europe: keep visitor data stored on EU servers (e.g. Dublin), avoiding cross-border transfers and Schrems II risk.",
  openGraph: {
    title: "What Is Analytics Data Residency?",
    description: "Data residency defines where analytics data is stored. EU residency is key for GDPR compliance.",
    type: "article",
    url: "https://sealmetrics.com/glossary/analytics-data-residency/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: [ogImage("/glossary/analytics-data-residency/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "What Is Analytics Data Residency?",
    description: "Data residency defines where analytics data is stored. EU residency is key for GDPR compliance.",
    images: [ogImage("/glossary/analytics-data-residency/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/glossary/analytics-data-residency/",
    // The Spanish page points here; without the return link the hreflang
    // pair is one-sided and Google discards it.
    languages: getAlternates("/glossary/analytics-data-residency"),
  },
};

export default function AnalyticsDataResidencyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glossary", href: "/glossary" }, { label: "Analytics Data Residency" }]} />
      <JsonLd data={definedTermSchema({ name: "Analytics Data Residency", description: "The geographic location where analytics data is processed and stored, determining the applicable legal framework.", url: "/glossary/analytics-data-residency", related: [{ name: "GDPR Analytics Compliance", url: "/glossary/gdpr-analytics-compliance" }, { name: "First-Party Data Collection", url: "/glossary/first-party-data-collection" }, { name: "Consent Management Platform (CMP)", url: "/glossary/consent-management-platform" }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glossary", url: "/glossary" }, { name: "Analytics Data Residency", url: "/glossary/analytics-data-residency" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definition</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">Analytics Data Residency</h1>
        </header>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              The geographic location where analytics data is processed and stored. Data residency determines which legal framework governs the data, what transfer mechanisms are required, and whether the processing meets regional compliance standards such as GDPR.
            </p>
          </div>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Why data residency matters</h2>
          <p>
            Analytics data &mdash; even aggregated, pseudonymized web traffic data &mdash; is subject to the data protection laws of the jurisdiction where it is processed. When a European company uses standard market analytics tools, visitor data is often transmitted to servers in the United States. This creates a cross-border data transfer that must comply with specific legal mechanisms under GDPR Chapter V.
          </p>
          <p>
            The practical consequences of non-compliance are significant. Since 2022, Data Protection Authorities (DPAs) in Austria, France, Italy, Denmark, Finland, and Norway have all issued rulings against the use of standard market analytics tools, citing inadequate transfer safeguards (see, for example, the <a href="https://www.cnil.fr/en/use-google-analytics-and-data-transfers-united-states-cnil-orders-website-manager-comply-cnil" target="_blank" rel="noopener noreferrer" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">French CNIL decision</a>). The French CNIL ordered organizations to stop using such tools within one month of its <a href="https://www.cnil.fr/en/use-google-analytics-and-data-transfers-united-states-cnil-orders-website-manager-comply-cnil" target="_blank" rel="noopener noreferrer" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">February 2022 decision</a>. Fines under GDPR Article 83 can reach 4% of global annual turnover or 20 million EUR &mdash; whichever is higher.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">EU data residency under GDPR</h2>
          <p>
            <Link href="/glossary/gdpr-analytics-compliance" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">GDPR-compliant analytics</Link> requires that personal data of EU residents is either processed within the EU/EEA, or transferred to a third country under an approved mechanism (adequacy decision, Standard Contractual Clauses, or Binding Corporate Rules).
          </p>
          <p>
            EU data residency eliminates the transfer question entirely. When data never leaves the EU, there is no third-country transfer to justify, no supplementary measures to implement, and no risk of an adequacy decision being invalidated &mdash; as happened with Privacy Shield in 2020.
          </p>
          <p>
            For analytics specifically, the cleanest compliance path is processing data on EU-based infrastructure operated by an EU-headquartered company. This avoids the reach of foreign surveillance laws (such as US FISA 702 and Executive Order 12333) that were central to the Schrems II ruling.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Schrems II implications</h2>
          <p>
            The <a href="https://curia.europa.eu/juris/liste.jsf?num=C-311/18" target="_blank" rel="noopener noreferrer" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">July 2020 Schrems II ruling</a> by the Court of Justice of the European Union (CJEU) invalidated the EU-US Privacy Shield and raised the bar for Standard Contractual Clauses (SCCs). The court found that US surveillance laws do not provide EU citizens with equivalent data protection, and that SCCs alone cannot bridge this gap without &ldquo;supplementary measures.&rdquo;
          </p>
          <p>
            For analytics, this created a practical dilemma: standard market analytics tools transmit data to US servers where it is accessible under FISA 702. Subsequent attempts by these providers to address this &mdash; including server-side tagging via EU-based proxy servers &mdash; were deemed insufficient by multiple DPAs because the underlying provider retains the ability to access the data and remains subject to US law.
          </p>
          <p>
            The <a href="https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/eu-us-data-privacy-framework_en" target="_blank" rel="noopener noreferrer" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">EU-US Data Privacy Framework (DPF)</a>, adopted in July 2023, provides a new adequacy basis. However, legal experts widely expect a &ldquo;Schrems III&rdquo; challenge, and the <a href="https://edpb.europa.eu/our-work-tools/our-documents/other/edpb-statement-eu-us-data-privacy-framework_en" target="_blank" rel="noopener noreferrer" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">European Data Protection Board has flagged concerns</a> about the DPF&rsquo;s durability. Organizations prioritizing long-term compliance are choosing EU-resident analytics solutions that are structurally immune to transfer rulings.
          </p>
          <p>
            <Link href="/glossary/first-party-data-collection" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">First-party data collection</Link> with EU-only infrastructure, combined with <Link href="/glossary/cookieless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">cookieless analytics</Link> that collects no personal data, provides the strongest compliance posture &mdash; no consent required, no transfers, no dependency on shifting adequacy decisions.
          </p>
        </div>

        <CommercialModule hook="Your analytics data can live in Dublin, under EU jurisdiction, full stop. See what EU-resident measurement looks like on your own traffic." />

        <RelatedGlossaryTerms slug="analytics-data-residency" />

        <div className="mt-10 pt-6 border-t border-warm-100">
          <p className="text-[0.85rem] text-text-tertiary">
            Learn more: <Link href="/blog/gdpr-analytics-without-consent" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">GDPR Analytics Without Consent</Link> &middot; <Link href="/security" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Sealmetrics Security &amp; Compliance</Link>
          </p>
        </div>
      </div>
    </article>
    </>
  );
}
