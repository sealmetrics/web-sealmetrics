"use client";

import { useEffect, useState } from "react";
import { DualCTA } from "./DualCTA";

const COPY = {
  en: "Ready to see the traffic consent hides?",
  es: "¿Listo para ver el tráfico que oculta el consentimiento?",
} as const;

export function StickyCtaBar({ locale = "en" }: { locale?: "en" | "es" }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const heroEl = document.querySelector<HTMLElement>("[data-hero]");
    const pricingEl = document.querySelector<HTMLElement>("#pricing");

    let heroOffscreen = false;
    let pricingOnscreen = false;

    const update = () => setVisible(heroOffscreen && !pricingOnscreen);

    const heroObserver = new IntersectionObserver(
      (entries) => {
        for (const e of entries) heroOffscreen = !e.isIntersecting;
        update();
      },
      { rootMargin: "0px 0px -40% 0px" }
    );

    const pricingObserver = new IntersectionObserver(
      (entries) => {
        for (const e of entries) pricingOnscreen = e.isIntersecting;
        update();
      },
      { rootMargin: "0px 0px -10% 0px" }
    );

    if (heroEl) heroObserver.observe(heroEl);
    if (pricingEl) pricingObserver.observe(pricingEl);

    return () => {
      heroObserver.disconnect();
      pricingObserver.disconnect();
    };
  }, []);

  return (
    <div
      // `inert` (not aria-hidden) so the off-screen bar is unreachable by
      // keyboard too — aria-hidden alone leaves its links in the tab order.
      inert={!visible}
      className="fixed bottom-0 left-0 right-0 z-40 bg-warm-white/85 backdrop-blur-md border-t border-warm-100 shadow-[0_-4px_24px_-12px_rgba(14,14,12,0.18)] py-3 px-4 transition-transform duration-300"
      style={{ transform: visible ? "translateY(0)" : "translateY(110%)" }}
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
        <p className="text-[14px] font-semibold text-ink hidden sm:block">
          {COPY[locale]}
        </p>
        <DualCTA locale={locale} size="sm" className="shrink-0 w-full sm:w-auto" />
      </div>
    </div>
  );
}
