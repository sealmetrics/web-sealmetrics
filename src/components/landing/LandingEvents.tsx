"use client";

import { useEffect } from "react";
import { micro } from "@/lib/analytics";

/* The site tracker only counts clicks toward /demo, /pricing and the
   calculators as CTA intent. A paid landing converts on in-page anchors and
   external register links, so it names its own events: any element carrying
   `data-lp-event` fires that micro-conversion with the landing slug. */
export function LandingEvents({ landing }: { landing: string }) {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>("[data-lp-event]");
      const name = el?.dataset.lpEvent;
      if (!el || !name) return;
      micro(name, { landing, text: (el.textContent ?? "").trim().slice(0, 80) });
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [landing]);
  return null;
}
