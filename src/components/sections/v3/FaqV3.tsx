"use client";

import { useState } from "react";
import Link from "next/link";

const ITEMS = [
  {
    q: "Why pay for Sealmetrics when GA4 is free?",
    a: "GA4 is free because you are the product — your data trains Google's ad models. More importantly, GA4 relies on cookies most EU visitors reject. You make budget decisions on a fraction of real data. The cost of Sealmetrics is a rounding error compared to the cost of misallocated ad spend.",
  },
  {
    q: 'Why is "neutrality" a feature?',
    a: "Meta reports with Meta's bias. Google reports with Google's bias. GA lives inside Google's ecosystem. Sealmetrics has no ad inventory to sell and no channel to favour — so brand, agencies and finance can all sign the same number without feeling they're signing against a rival.",
  },
  {
    q: "How accurate is cookieless tracking?",
    a: "Dreamplace Hotels measured +30% more traffic than GA and 15–20% more attributed sales, reconciled against their CRM. On Incapto's Shopify store, Sealmetrics recorded 96% of real orders while GA4 missed 29% of visits. Palladium Hotel Group discovered 40% of their traffic had no attribution in their previous stack and improved Cost-per-Search on Display by +165% after switching. No sampling, no modelling — observed data, not estimates.",
  },
  {
    q: "Do I need to remove GA4?",
    a: "No. Most clients run Sealmetrics alongside GA4 for the first 30 days so you can compare side by side. After that, most teams use Sealmetrics as their source of truth and keep GA4 for specific Google product integrations.",
  },
  {
    q: "GDPR compliant without a consent banner?",
    a: "It is designed for it; this is our self-assessment, not a certification. Cookieless by architecture — no cookies, no personal data storage, no cross-site tracking. 100% EU-hosted in Dublin, Ireland. Designed for GDPR, ePrivacy and Schrems II, with no consent banner.",
  },
  {
    q: "How long does implementation take?",
    a: "5 to 30 minutes to install, depending on the platform. First data from the first hour. Onboarding depends on the plan: self-service docs on Agentic and Growth, one onboarding session on Scale, white-glove onboarding on Enterprise.",
  },
];

export function FaqV3() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" className="py-28 bg-white border-t border-warm-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-14">
          <div>
            <span className="eyebrow mb-5">FAQ</span>
            <h2 className="h-section mt-5">
              The things every <em>CMO asks.</em>
            </h2>
          </div>
          <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
            Straight answers. No fluff.
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr_1.8fr] gap-12 md:gap-20">
          <div>
            <p className="text-[16px] text-ink-soft leading-[1.55] mb-5">
              Still have questions? Our team — including the founder — is one message away.
            </p>
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 bg-ink text-white px-7 py-3.5 rounded-md text-[15px] font-semibold no-underline hover:bg-brand transition-colors"
            >
              Talk to us →
            </Link>
          </div>

          <div className="flex flex-col gap-2.5">
            {ITEMS.map((item, i) => {
              const isOpen = i === openIdx;
              return (
                <button
                  key={item.q}
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className={`w-full text-left border rounded-xl px-7 py-5 transition-all ${
                    isOpen
                      ? "bg-ink text-white border-ink"
                      : "bg-white border-warm-100 hover:border-warm-200"
                  }`}
                >
                  <div className="flex justify-between items-center gap-6">
                    {/* h3, not h4: the section title above is an h2, and AI
                        engines lift a question-shaped heading together with the
                        paragraph that follows it. The size lives in the class,
                        so nothing moves visually. */}
                    <h3 className={`text-[17px] font-semibold tracking-[-0.015em] ${isOpen ? "text-white" : "text-ink"}`}>
                      {item.q}
                    </h3>
                    <span
                      className={`w-7 h-7 rounded-md flex items-center justify-center text-[18px] font-normal shrink-0 transition-transform ${
                        isOpen ? "bg-brand text-ink rotate-45" : "bg-warm-50 text-ink-soft"
                      }`}
                    >
                      +
                    </span>
                  </div>
                  {/* Always rendered, hidden when collapsed. Conditional
                      rendering kept the answers out of the served HTML
                      entirely, so no crawler or AI engine could read the most
                      citable passages on the page. `hidden` keeps them in the
                      markup at zero visual cost. */}
                  <p
                    hidden={!isOpen}
                    className="mt-3.5 text-[14.5px] leading-[1.6] text-white/75 max-w-[62ch]"
                  >
                    {item.a}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
