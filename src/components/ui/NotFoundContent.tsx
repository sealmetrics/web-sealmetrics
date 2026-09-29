"use client";

import { useEffect } from "react";
import Link from "next/link";
import { pushEvent } from "@/lib/analytics";

/**
 * The 404 body. Single source of truth for two consumers:
 *   - src/app/(en)/not-found.tsx — client-side `notFound()` inside the app
 *   - src/app/(en)/404-page/page.tsx — the route the build turns into
 *     out/404.html, which is what GitHub Pages serves for unknown URLs
 *
 * They must not drift: the second one is the only 404 a real visitor from
 * Google or an AI crawler will ever see.
 */
export function NotFoundContent() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      pushEvent({ event: "404", path: window.location.pathname });
    }
  }, []);

  return (
    <section className="pt-40 pb-28 bg-warm-white min-h-[70vh] flex items-center">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 text-center">
        <p
          className="font-mono font-medium text-warm-200 leading-none mb-8 tabular-nums"
          style={{ fontSize: "clamp(6rem, 15vw, 10rem)" }}
        >
          404
        </p>
        <h1 className="h-display mx-auto" style={{ fontSize: "clamp(36px, 5vw, 60px)", maxWidth: "20ch" }}>
          Page <em>not found.</em>
        </h1>
        <p className="mt-8 text-ink-soft max-w-[50ch] mx-auto leading-[1.55]" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
          The page you are looking for does not exist or has been moved. Here are some helpful links instead.
        </p>
        <div data-md="skip" className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-4 bg-ink text-white rounded-md text-[15px] font-semibold no-underline hover:bg-brand transition-colors"
          >
            Go to homepage →
          </Link>
          <a
            href="https://my.sealmetrics.com/register"
            className="inline-flex items-center gap-2 px-7 py-4 border border-warm-200 text-ink rounded-md text-[15px] font-semibold no-underline hover:bg-warm-50 transition-colors"
          >
            Start free
          </a>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[13.5px]">
          {[
            { href: "/product", label: "Product" },
            { href: "/pricing", label: "Pricing" },
            { href: "/how-it-works", label: "How it works" },
            { href: "/blog", label: "Blog" },
            { href: "/glossary", label: "Glossary" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="text-ink-soft no-underline border-b border-warm-200 pb-0.5 hover:text-ink transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
