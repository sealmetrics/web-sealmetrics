"use client";

import {
  type QuizAnswers,
  getLossRate,
  getTrafficVolume,
  getAdSpendImpact,
  formatNumber,
  formatCurrency,
  shouldShowAdSpend,
} from "@/lib/content/diagnostic";
import { LATE_CONSENT_SHARE } from "@/lib/calculators/consent-model";

interface DataGapSectionProps {
  answers: QuizAnswers;
}

function DataGap({ answers }: { answers: QuizAnswers }) {
  const lossRate = getLossRate(answers);
  const traffic = getTrafficVolume(answers);
  const visible = Math.round(traffic * (1 - lossRate));
  const invisible = traffic - visible;
  const visiblePct = Math.round((1 - lossRate) * 100);
  const invisiblePct = 100 - visiblePct;
  const usesClientRange = !answers.cookieRate || answers.cookieRate === "unknown";

  return (
    <div>
      <p className="text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-3">
        Your growth opportunity
      </p>
      <h2 className="headline-sub mb-8">
        {usesClientRange
          ? "An estimated 40–60% of your traffic is currently unmeasured"
          : `~${invisiblePct}% of your traffic is currently unmeasured`}
      </h2>

      {/* Visual bar */}
      <div className="mb-6">
        <div className="h-10 rounded-[4px] overflow-hidden flex">
          <div
            className="bg-text-primary flex items-center justify-center text-white text-[0.75rem] font-mono"
            style={{ width: `${visiblePct}%` }}
          >
            {visiblePct}% visible
          </div>
          <div
            className="flex items-center justify-center text-[0.75rem] font-mono"
            style={{
              width: `${invisiblePct}%`,
              backgroundColor: "var(--color-red-alert)",
              color: "white",
            }}
          >
            {invisiblePct}% invisible
          </div>
        </div>
      </div>

      {/* Numbers */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-warm-100 rounded-[4px] p-5">
          <p className="font-mono text-[1.5rem] text-text-primary">
            {formatNumber(visible)}
          </p>
          <p className="text-[0.8rem] text-text-secondary mt-1">
            Sessions your analytics sees
          </p>
        </div>
        <div
          className="border border-warm-100 rounded-[4px] p-5"
          style={{ backgroundColor: "rgba(200,90,84,0.05)" }}
        >
          <p className="font-mono text-[1.5rem] text-red-alert">
            {formatNumber(invisible)}
          </p>
          <p className="text-[0.8rem] text-text-secondary mt-1">
            Sessions not yet measured
          </p>
        </div>
      </div>

      <p className="text-[0.85rem] text-text-body mt-6 leading-relaxed">
        Every month, approximately {formatNumber(invisible)} sessions happen on
        your site without any tracking. These are not bots or spam — they are
        real visitors, browsing real pages, making real purchase decisions. The
        channels that drove them cannot be optimized. Complete data changes
        that.
      </p>
      <p className="text-[0.85rem] text-text-body mt-4 leading-relaxed">
        {usesClientRange
          ? "Of your traffic, GA4 would credit an estimated 24–36% to its real source: the rest it sees without the landing pageview that carries the source, or doesn't see at all."
          : `Of your traffic, GA4 would credit an estimated ${Math.round((1 - lossRate) * (1 - LATE_CONSENT_SHARE) * 100)}% to its real source: the rest it sees without the landing pageview that carries the source, or doesn't see at all.`}
      </p>
      <p className="text-[0.75rem] text-text-tertiary mt-4 leading-relaxed">
        {usesClientRange
          ? "Estimate based on what we see across our clients (40–60% don't accept cookies; 40% of those who do, not on the first pageview), shown at the 50% midpoint. Measure your own store to know."
          : "Estimate based on the consent rate you entered. Measure your own store to know."}
      </p>
      <p className="text-[0.75rem] text-text-tertiary mt-2 leading-relaxed">
        <a href="/case-studies/incapto/" className="underline decoration-1 underline-offset-2">
          At Incapto (Shopify, Consent Mode), measured: GA4 missed 29% of visits — Consent Mode and your setup change the number. Measure your own store.
        </a>
      </p>
    </div>
  );
}

function AdSpendImpact({ answers }: { answers: QuizAnswers }) {
  const { misallocated, percentage } = getAdSpendImpact(answers);

  return (
    <div className="mt-12 pt-12 border-t border-warm-100">
      <p className="text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-3">
        Ad spend impact
      </p>
      <h3 className="headline-sub mb-6">
        Estimated {formatCurrency(misallocated)}/month in optimizable budget
      </h3>

      <p className="text-[0.9rem] text-text-body leading-relaxed mb-6">
        When {percentage}% of your conversion attribution is based on incomplete
        data, your ROAS calculations are unreliable. Channels that drive
        privacy-conscious buyers — often your highest-value customers — appear
        underperforming because their conversions are invisible.
      </p>

      <div className="bg-warm-50 border border-warm-100 rounded-[4px] p-5">
        <p className="text-[0.85rem] text-text-body leading-relaxed">
          <span className="font-medium text-text-primary">
            The opportunity cost:
          </span>{" "}
          Each month without complete data is a month where your best channels
          remain under-invested. Over 12 months, {formatCurrency(misallocated * 12)}{" "}
          in budget could be redirected to the channels actually driving growth.
        </p>
      </div>
    </div>
  );
}

export function DataGapSection({ answers }: DataGapSectionProps) {
  const showAdSpend = shouldShowAdSpend(answers);

  return (
    <section className="py-16 bg-warm-white border-t border-warm-100">
      <div className="max-w-[720px] mx-auto px-5 sm:px-8">
        <DataGap answers={answers} />
        {showAdSpend && <AdSpendImpact answers={answers} />}
      </div>
    </section>
  );
}
