import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/ui/JsonLd";

/**
 * Static-export-friendly client-side redirect.
 * - Emits a real <meta http-equiv="refresh"> from the page body, which React
 *   hoists into <head>. It MUST NOT go through Next.js `metadata.other`:
 *   that renders every key as `name="…"`, and <meta name="refresh"> is inert —
 *   it silently did nothing in production until the 2026-08-18 audit
 * - Adds canonical to the real destination (no duplicate content)
 * - Adds noindex so search engines don't index the alias
 * - Renders a visible fallback link for users without JS/meta-refresh
 */
export function buildRedirectMetadata(
  destination: string,
  options: { label?: string; canonical?: string } = {}
): Metadata {
  // External destinations keep the canonical on sealmetrics.com (the audit
  // requires same-site canonicals), passed as `options.canonical`.
  const absolute = options.canonical
    ? `https://sealmetrics.com${options.canonical}`
    : destination.startsWith("http")
      ? destination
      : `https://sealmetrics.com${destination}`;
  const shown = options.label ?? destination;
  return {
    title: `Redirecting to ${shown} — Sealmetrics`,
    description: `This page has moved. Redirecting to ${shown}.`,
    alternates: { canonical: absolute },
    robots: { index: false, follow: true },
    openGraph: {
      title: `Redirecting to ${shown} — Sealmetrics`,
      description: `This page has moved. Redirecting to ${shown}.`,
      url: absolute,
      siteName: "Sealmetrics",
      type: "website",
      images: ["https://sealmetrics.com/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `Redirecting to ${shown} — Sealmetrics`,
      description: `This page has moved. Redirecting to ${shown}.`,
      images: ["https://sealmetrics.com/og-image.png"],
    },
  };
}

/** `label` replaces the destination in the visible text, for long external URLs. */
export function RedirectStub({ to, label }: { to: string; label?: string }) {
  const absolute = to.startsWith("http") ? to : `https://sealmetrics.com${to}`;
  const shown = label ?? to;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Page moved",
          url: absolute,
          isPartOf: {
            "@type": "WebSite",
            name: "Sealmetrics",
            url: "https://sealmetrics.com",
          },
        }}
      />
      {/* Real meta refresh: works without JS. React hoists <meta> to <head>. */}
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <section className="min-h-[50vh] flex items-center justify-center px-5 py-20 bg-warm-white">
        <div className="text-center max-w-[480px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft mb-3">
            Page moved
          </p>
          <h1 className="text-[28px] font-semibold text-ink tracking-[-0.02em] mb-4">
            Redirecting you to <code className="font-mono text-[20px]">{shown}</code>
          </h1>
          <p className="text-ink-soft mb-6">
            If your browser doesn&apos;t redirect automatically, click below.
          </p>
          <Link
            href={to}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-ink text-white rounded-md text-[15px] font-semibold no-underline hover:bg-brand transition-colors"
          >
            Continue to {shown} →
          </Link>
        </div>
      </section>
      {/* Manual JS redirect as secondary fallback */}
      <script
        dangerouslySetInnerHTML={{
          __html: `setTimeout(function(){window.location.replace(${JSON.stringify(to)})},100);`,
        }}
      />
    </>
  );
}
