import "@/app/globals.css";
import "@/app/fonts.css";
import { Header } from "@/components/layout/Header";
import { AnnouncementBar, AnnouncementBarOffset } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { SealmetricsTracker } from "@/components/analytics/SealmetricsTracker";
import type { Locale } from "@/lib/i18n/types";
import { organizationSchema } from "@/lib/schema";
import { FontPreloads } from "@/components/layout/FontPreloads";

export function SharedLayout({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <html lang={locale}>
      <head>
        <FontPreloads />
        {/* Discovery for AI agents. An agent that lands on a page from a
            search result never reads robots.txt, so the entry points are
            advertised here — the same pattern docs.sealmetrics.com uses.
            `rel="llms-txt"` is the older non-standard spelling, kept because
            some clients look for it; the `rel="alternate"` pair is the one
            crawlers actually understand.

            Both files are Disallowed for Googlebot/Bingbot/DuckDuckBot/
            YandexBot in public/robots.txt precisely because these links make
            them discoverable — a .txt carries no canonical and no meta
            robots, and on a static export we cannot add X-Robots-Tag later.
            Do not add a link here to a plain-text mirror that robots.txt
            does not already cover. */}
        <link rel="llms-txt" href="https://sealmetrics.com/llms.txt" />
        <link
          rel="alternate"
          type="text/plain"
          href="https://sealmetrics.com/llms.txt"
          title="LLM-friendly site index"
        />
        <link
          rel="alternate"
          type="text/plain"
          href="https://sealmetrics.com/llms-full.txt"
          title="Full product reference for LLMs"
        />
        {/* The entity graph, on every page rather than on the two that used to
            carry it. Schemas across the site reference the organisation by
            `@id` instead of restating it inline, and a bare `{"@id": …}` only
            resolves if the node it names is present in the same document — so
            this has to ship everywhere, not just on the homepage.

            It lives in <head>, outside <main id="main-content">, which is also
            what keeps it out of the Markdown twins. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
      </head>
      <body className="font-sans antialiased">
        <a href="#main-content" className="skip-to-content">
          {locale === "es" ? "Ir al contenido" : "Skip to content"}
        </a>
        <SealmetricsTracker />
        <AnnouncementBarOffset />
        <AnnouncementBar locale={locale} />
        <Header locale={locale} />
        <main id="main-content" data-design-system="signal-v4">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
