import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, servicePageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { AuditForm } from "@/components/audit/AuditForm";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Free measurement audit — Sealmetrics",
  description:
    "Answer 7 questions in 3 minutes. We send you a personalised analysis of the gap between what GA4 measures and what your eCommerce actually sells.",
  alternates: {
    canonical: "https://sealmetrics.com/audit/",
    languages: getAlternates("/audit"),
  },
  openGraph: {
    title: "Free measurement audit — Sealmetrics",
    description:
      "Discover how much revenue your analytics is hiding. Personalised audit in 24h, human-written, no automated sequences.",
    type: "website",
    images: [ogImage("/audit/")],
    url: "https://sealmetrics.com/audit/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Free measurement audit — Sealmetrics",
    description: "Discover how much revenue your analytics is hiding. Personalised audit in 24h, human-written, no automated sequences.",
    images: [ogImage("/audit/")],
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Free audit" }]} />
      <JsonLd
        data={breadcrumbSchema([{ name: "Free audit", url: "/audit" }])}
      />
      <JsonLd
        data={servicePageSchema({
          name: "Sealmetrics Free Measurement Audit",
          description:
            "Personalised audit of the gap between GA4 and your real backend revenue. 7 questions, 3 minutes, human-written report within 24h.",
          url: "/audit",
          audience: "CMO, Head of Marketing, eCommerce Director",
        })}
      />

      <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-12">
        <div className="max-w-[760px] mx-auto px-5 sm:px-8">
          <span className="eyebrow mb-5">Free measurement audit</span>
          <h1 className="h-display mt-5">
            See how much revenue your analytics is{" "}
            <em>hiding from you.</em>
          </h1>
          <p
            className="text-ink-soft mt-7 leading-[1.55] max-w-[60ch]"
            style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}
          >
            Answer 7 questions. We send you a personalised analysis of the gap
            between what GA4 measures and what your eCommerce actually sells.
            Human-written, delivered in 24h — no automated sequences.
          </p>
          <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-ink-soft font-semibold mt-6">
            3 minutes · no install
          </p>
        </div>
      </section>

      {/* The page was 96 words of visible copy wrapped around a form — the
          thinnest indexable page on the site. What the audit actually is, and
          what it is not, is the part a reader and an AI engine both need. */}
      <section className="bg-paper border-t border-hairline py-16 md:py-20">
        <div className="max-w-[760px] mx-auto px-5 sm:px-8">
          <h2 className="text-[32px] md:text-[40px] font-[790] tracking-[-0.045em] leading-[0.95] text-ink">
            What you get back
          </h2>
          <p className="text-ink-soft mt-6 leading-[1.6] text-[17px] max-w-[62ch]">
            GA4 in Europe counts only the visitors who consent and do not
            block it. On a{" "}
            <Link href="/case-studies/incapto" className="underline">
              real Shopify store measured over 48 days
            </Link>
            , it did not record 29% of visits; in our compounded worst-case
            model it sees about 13%, and only about 16% arrive with the traffic
            source still attached. Every
            budget decision made on that base is a decision made on a sample
            nobody chose. The audit puts a number on your own version of that
            gap before you install anything.
          </p>
          <ul className="mt-8 space-y-4 text-[16px] leading-[1.6] text-ink-soft">
            <li className="flex gap-3">
              <span className="text-acid-ink shrink-0">—</span>
              <span>
                An estimate of the traffic and revenue your current setup does
                not attribute, reconciled against the backend figures you give
                us.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-acid-ink shrink-0">—</span>
              <span>
                Which of your channels is most likely being under-credited, and
                what that costs at your current spend.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-acid-ink shrink-0">—</span>
              <span>
                A written read on whether your consent and pixel setup is
                creating legal exposure alongside the measurement gap.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-acid-ink shrink-0">—</span>
              <span>
                Written by a person within 24 hours. No drip sequence, no
                automated scoring, no call required to receive it.
              </span>
            </li>
          </ul>

          <h2 className="text-[32px] md:text-[40px] font-[790] tracking-[-0.045em] leading-[0.95] text-ink mt-16">
            What this is not
          </h2>
          <p className="text-ink-soft mt-6 leading-[1.6] text-[17px] max-w-[62ch]">
            It is not a technical scan of your tags — for that, the{" "}
            <Link href="/free-audit/" className="underline">
              free pixel and GDPR audit
            </Link>{" "}
            crawls your site and reports which pixels fire before consent, with
            a PDF back in two to three minutes. It is not a product demo either:
            if you already know the gap is real and want to see the platform,
            book a{" "}
            <Link href="/demo/" className="underline">
              demo
            </Link>{" "}
            instead. And it is not a rewrite of your measurement plan — it is a
            number, a cause, and an honest read on whether the number is big
            enough to act on.
          </p>
        </div>
      </section>

      <section className="bg-white border-t border-warm-100 py-16 md:py-20">
        <div className="max-w-[760px] mx-auto px-5 sm:px-8">
          <AuditForm locale="en" />
          <p className="text-center text-[13px] text-ink-soft mt-6">
            Your data stays in the EU. We don&apos;t share submissions with
            third parties.
          </p>
        </div>
      </section>
    </>
  );
}
