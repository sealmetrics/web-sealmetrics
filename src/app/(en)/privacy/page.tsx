import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Privacy Policy — Sealmetrics",
  description:
    "Sealmetrics privacy policy. How we handle data, what we collect, and how we protect your information.",
  openGraph: {
    title: "Privacy Policy — Sealmetrics",
    description:
      "How Sealmetrics handles data, what we collect, and how we protect your information.",
    type: "website",
    images: [ogImage("/privacy/")],
    url: "https://sealmetrics.com/privacy/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Privacy Policy — Sealmetrics",
    description: "How Sealmetrics handles data, what we collect, and how we protect your information.",
    images: [ogImage("/privacy/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/privacy/",
    languages: { es: "https://sealmetrics.com/es/privacy/" },
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
      <JsonLd data={breadcrumbSchema([{ name: "Privacy Policy", url: "/privacy" }])} />
      <section className="pt-12 pb-28 bg-white">
      <div className="max-w-[800px] mx-auto px-5 sm:px-8">
        <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-6">
          Legal
        </span>
        <h1 className="headline-hero mb-12">Privacy Policy</h1>

        <div className="prose-sm space-y-8 text-[0.95rem] leading-[1.75] text-text-secondary">
          <p>
            <strong className="text-text-primary">Last updated:</strong> September
            14, 2026 ·{" "}
            <a href="/es/privacy/" className="underline">
              Versión en español
            </a>
          </p>

          <div>
            <h2 className="font-serif text-[1.3rem] font-medium text-text-primary mb-3">
              1. Who we are
            </h2>
            <p>
              Sealmetrics (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a web analytics
              platform headquartered in Spain, EU. We provide cookieless
              analytics services to businesses (&ldquo;Clients&rdquo;). This privacy
              policy covers how we handle data in two contexts: (a) visitors to
              sealmetrics.com, and (b) visitors to our Clients&rsquo; websites
              where Sealmetrics analytics is installed.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[1.3rem] font-medium text-text-primary mb-3">
              2. Data we collect on sealmetrics.com
            </h2>
            <p className="mb-3">
              When you visit sealmetrics.com, we collect:
            </p>
            <ul className="space-y-1 pl-5 list-none">
              <li className="flex items-start gap-3">
                <span className="text-text-tertiary shrink-0">&mdash;</span>
                Information you voluntarily provide via forms (name, email,
                company, website URL)
              </li>
              <li className="flex items-start gap-3">
                <span className="text-text-tertiary shrink-0">&mdash;</span>
                Anonymous analytics data via our own Sealmetrics script (page
                views, session duration, referrer — no PII)
              </li>
            </ul>
            <p className="mt-3">
              We do not use cookies, tracking pixels, or third-party analytics
              tools on sealmetrics.com.
            </p>
            <p className="mt-3">
              Signing in to the platform at{" "}
              <span className="text-text-primary font-medium">
                my.sealmetrics.com
              </span>{" "}
              does set three strictly necessary cookies &mdash;{" "}
              <span className="text-text-primary font-medium">
                sm_access_token
              </span>{" "}
              (15 minutes),{" "}
              <span className="text-text-primary font-medium">
                sm_refresh_token
              </span>{" "}
              (7 days) and{" "}
              <span className="text-text-primary font-medium">sm_csrf</span> (7
              days). They exist only to keep your session open and protect it
              against cross-site request forgery. They carry no analytics,
              advertising or profiling purpose, are transmitted over encrypted
              connections only, and are deleted when you sign out. As strictly
              necessary cookies for a service you expressly requested, they are
              exempt from the consent requirement of Art. 5(3) of the ePrivacy
              Directive and Art. 22.2 of the Spanish LSSI, which is why you see
              no consent banner. You can block them in your browser settings,
              but you will then be unable to sign in; blocking them does not
              affect browsing sealmetrics.com, which sets none.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[1.3rem] font-medium text-text-primary mb-3">
              3. Data we collect on Client websites
            </h2>
            <p className="mb-3">
              When installed on a Client&rsquo;s website, Sealmetrics collects:
            </p>
            <ul className="space-y-1 pl-5 list-none">
              <li className="flex items-start gap-3">
                <span className="text-text-tertiary shrink-0">&mdash;</span>
                Page URLs and referrer URLs
              </li>
              <li className="flex items-start gap-3">
                <span className="text-text-tertiary shrink-0">&mdash;</span>
                Browser type, operating system, screen resolution
              </li>
              <li className="flex items-start gap-3">
                <span className="text-text-tertiary shrink-0">&mdash;</span>
                Session behavior (page views, scroll depth, clicks, time on
                page)
              </li>
              <li className="flex items-start gap-3">
                <span className="text-text-tertiary shrink-0">&mdash;</span>
                Country-level geolocation derived from the visitor&rsquo;s
                browser timezone (Intl.DateTimeFormat). For accounts with
                bot/agent detection enabled, an additional IP-based country
                lookup (via MaxMind GeoLite2 offline database) is performed
                only on session entry, used exclusively for bot detection
                signals.
              </li>
            </ul>
            <p className="mt-3">
              <strong className="text-text-primary">
                On IP addresses:
              </strong>{" "}
              We do not persist IP addresses in our analytics database. The IP
              is used transitorily on the server for: (i) anti-abuse blocklist
              matching, (ii) the GeoLite2 lookup described above when applicable,
              and (iii) operational logging with limited retention. The IP is
              never available to Clients in their reports.
            </p>
            <p className="mt-3">
              <strong className="text-text-primary">
                On session identifiers:
              </strong>{" "}
              Sealmetrics uses a short-lived session identifier computed in the
              visitor&rsquo;s browser from general device characteristics. It is
              not unique to a person &mdash; many different visitors can produce
              the same value &mdash; so it cannot identify an individual. It is
              never stored on the visitor&rsquo;s device, and each client
              site&rsquo;s data is processed in isolation. Sealmetrics does not
              use it to correlate visits over time:
              each new entrance is counted as new, independent data, and no
              visitor history or profile is built across sessions. Since August
              2026 the identifier is additionally pseudonymised on our servers
              with a secret key and a random daily salt that is destroyed on
              rotation (and excluded from backups): not even Sealmetrics can
              reconnect a device&rsquo;s activity across two different days or
              across different sites.
            </p>
            <p className="mt-3">
              <strong className="text-text-primary">
                On advertising click identifiers:
              </strong>{" "}
              when a visitor lands from an ad, the click identifier present in
              the landing URL (e.g. gclid, msclkid) is processed on the fly
              solely to determine the ad network of the click for attribution
              and deduplication. Its value is{" "}
              <strong className="text-text-primary">never stored</strong> —
              only the network type is retained — so it is not accessible in
              reports, via API or in exports.
            </p>
            <p className="mt-3">
              <strong className="text-text-primary">
                We do not collect:
              </strong>{" "}
              device fingerprints, names, email addresses, or any data that
              could identify an individual visitor. No cookies, local storage,
              session storage, or IndexedDB are used.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[1.3rem] font-medium text-text-primary mb-3">
              4. Legal basis for processing
            </h2>
            <p>
              For sealmetrics.com form submissions: consent (Article 6(1)(a)
              GDPR) and legitimate interest in responding to inquiries (Article
              6(1)(f)). For analytics data on Client websites: legitimate
              interest of the Client in understanding website usage (Article
              6(1)(f)), as no personal data is processed.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[1.3rem] font-medium text-text-primary mb-3">
              5. Data storage and residency
            </h2>
            <p>
              Visitor analytics data is processed and stored exclusively in EU
              data centers, with no sub-processors outside the EU in that data
              path. In the analytics platform, the sole transfer outside the
              European Economic Area is service email to the account&rsquo;s own users (verifications,
              alerts, reports) via Resend, Inc. (USA), covered by Standard
              Contractual Clauses and its EU-US Data Privacy Framework
              certification. It involves no visitor data. The full
              sub-processor list is Annex 3 of the{" "}
              <a href="/dpa/" className="underline">DPA</a>. The AI brand
              monitoring report requested on sealmetrics.com has its own
              recipients, listed in <a href="#brand-report" className="underline">section 9</a>.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[1.3rem] font-medium text-text-primary mb-3">
              6. Data retention
            </h2>
            <p>
              The raw technical event log is retained for{" "}
              <strong className="text-text-primary">1 day</strong> and then
              deleted automatically; only aggregated analytics remain beyond
              that point. Aggregated analytics data on Client websites is
              retained for a maximum of
              <strong className="text-text-primary"> 24 months</strong> (enforced
              automatically via database TTL), in line with the AEPD audience
              measurement guidance (January 2024). Aggregated hourly reports are
              retained for 90 days. Form submissions on sealmetrics.com are
              retained for 24 months unless you request earlier deletion.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[1.3rem] font-medium text-text-primary mb-3">
              7. Your rights
            </h2>
            <p>
              Under GDPR, you have the right to access, rectify, erase, port,
              and restrict processing of your personal data. For data you have
              provided via forms, contact us at privacy@sealmetrics.com. Note
              that analytics data collected on Client websites is anonymous and
              cannot be linked to any individual.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[1.3rem] font-medium text-text-primary mb-3">
              8. Third-party sharing
            </h2>
            <p>
              We do not sell, trade, or share personal data with third parties
              for advertising or marketing purposes. We may share data with
              service providers who assist in operating our platform, under
              strict data processing agreements.
            </p>
          </div>

          <div id="brand-report">
            <h2 className="font-serif text-[1.3rem] font-medium text-text-primary mb-3">
              9. AI brand monitoring report
            </h2>
            <p className="mb-3">
              The form at{" "}
              <a href="/ai-brand-monitoring/" className="underline">
                /ai-brand-monitoring
              </a>{" "}
              asks fifteen AI models six questions about a company and emails
              the answers to whoever requested them.
            </p>
            <p className="mb-3">
              <strong className="text-text-primary">Data processed.</strong>{" "}
              Your work email, the brand you ask about, and optionally its
              sector and competitors. The form does not ask for your name. The
              report is about organisations; it is not run on individuals.
            </p>
            <p className="mb-3">
              <strong className="text-text-primary">Purposes and legal basis.</strong>{" "}
              (a) Generating the report and emailing it to you, because you
              asked for it (Article 6(1)(b) GDPR). (b) Keeping a record of the
              request, to prevent abuse of a free service and to answer any
              question about it (Article 6(1)(f)). (c) Sending you occasional
              reports and product news, only if you tick the separate, optional
              box on the form (Article 6(1)(a) GDPR and Article 21 of Spain&rsquo;s
              LSSI). Not ticking it does not affect the report, and you can
              withdraw that consent at any time through the unsubscribe link in
              any email or by writing to privacy@sealmetrics.com.
            </p>
            <p className="mb-3">
              <strong className="text-text-primary">Recipients.</strong>
            </p>
            <ul className="space-y-1 pl-5 list-none">
              <li className="flex items-start gap-3">
                <span className="text-text-tertiary shrink-0">&mdash;</span>
                Cloudflare, Inc. runs the anti-bot check (Turnstile) and the
                relay that receives the form.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-text-tertiary shrink-0">&mdash;</span>
                Enroutia, the model routing platform that generates the report,
                receives the brand, sector and competitors, and a random
                reference in place of your email. It never receives your email:
                the link between that reference and your address stays in our
                own automation system, and is deleted as soon as the report is
                delivered, or after 72 hours at most.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-text-tertiary shrink-0">&mdash;</span>
                The AI models that answer the questions receive the brand,
                sector and competitors only, never your email. Three of them
                (GPT-5.6 from OpenAI, and Claude Sonnet 5 and Claude Opus 5 from
                Anthropic) are served from the United States.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-text-tertiary shrink-0">&mdash;</span>
                Resend, Inc. (USA) delivers the report and, if you consented,
                the occasional emails, covered by Standard Contractual Clauses
                and its EU-US Data Privacy Framework certification.
              </li>
            </ul>
            <p className="mt-3">
              <strong className="text-text-primary">Retention.</strong> The
              request record is kept for up to 24 months, like any other form
              submission. The link between the report reference and your email
              is deleted on delivery, or after 72 hours at most. If you consented to occasional emails, your address
              stays on that list until you unsubscribe or withdraw consent.
            </p>
          </div>

          <div id="google-user-data">
            <h2 className="font-serif text-[1.3rem] font-medium text-text-primary mb-3">
              10. Looker Studio connector and Google user data
            </h2>
            <p className="mb-3">
              The Sealmetrics connector for Looker Studio is a Google Apps
              Script that lets Clients load their Sealmetrics analytics into
              their own Looker Studio reports. It requests a single Google
              permission,{" "}
              <span className="text-text-primary font-medium">
                script.external_request
              </span>
              , which it uses only to call the Sealmetrics API
              (my.sealmetrics.com).
            </p>
            <p className="mb-3">
              <strong className="text-text-primary">Data accessed.</strong>{" "}
              The connector does not read your Google Account data: not your
              name, email address, contacts, Drive, Sheets or any other Google
              service. It only handles what you enter in Looker Studio (your
              Sealmetrics API key, the site and the report type you select)
              and the date range and fields each chart requests.
            </p>
            <p className="mb-3">
              <strong className="text-text-primary">How it is used.</strong>{" "}
              That information is used exclusively to authenticate against the
              Sealmetrics API and return the analytics you asked for to your
              own report. It is not used for advertising, profiling or training
              AI/ML models, and it is never sold.
            </p>
            <p className="mb-3">
              <strong className="text-text-primary">Sharing.</strong> It is sent
              only to the Sealmetrics API, operated by Sealmetrics S.L. in the
              EU. It is not shared with, transferred or disclosed to any third
              party.
            </p>
            <p className="mb-3">
              <strong className="text-text-primary">Protection.</strong>
            </p>
            <ul className="space-y-1 pl-5 list-none">
              <li className="flex items-start gap-3">
                <span className="text-text-tertiary shrink-0">&mdash;</span>
                All requests travel encrypted over HTTPS (TLS).
              </li>
              <li className="flex items-start gap-3">
                <span className="text-text-tertiary shrink-0">&mdash;</span>
                API keys are stored on our side only as a SHA-256 hash, can be limited to read-only scopes and specific sites, and can be revoked at any time in Settings &gt; API Keys.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-text-tertiary shrink-0">&mdash;</span>
                The connector requests no Google permission other than script.external_request.
              </li>
            </ul>
            <p className="mt-3 mb-3">
              <strong className="text-text-primary">Retention and deletion.</strong>{" "}
              Sealmetrics stores no data from your Google Account. To keep
              reports fast, the connector caches API responses in Google&rsquo;s
              Apps Script cache for at most 15 minutes, after which they expire
              automatically. Your connector settings stay in your Looker Studio
              data source until you delete it. You can remove the
              connector&rsquo;s access at any time at{" "}
              <a href="https://myaccount.google.com/permissions" className="underline">
                myaccount.google.com/permissions
              </a>{" "}
              and revoke the API key in Sealmetrics.
            </p>
            <p>
              <strong className="text-text-primary">Limited Use.</strong>{" "}
              Sealmetrics&rsquo; use and transfer to any other app of information
              received from Google APIs will adhere to the{" "}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                className="underline"
              >
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[1.3rem] font-medium text-text-primary mb-3">
              11. Contact
            </h2>
            <p>
              For privacy-related questions or to exercise your rights, contact
              us at{" "}
              <span className="text-text-primary font-medium">
                privacy@sealmetrics.com
              </span>
              .
            </p>
            <p className="mt-3">
              Data controller: Sealmetrics S.L. (VAT ESB70933239), Carrer de
              Tirso de Molina 36, 08940 Cornell&agrave; de Llobregat,
              Barcelona, Spain. We are not required to appoint a Data
              Protection Officer; privacy matters are handled at the contact
              above. You may also lodge a complaint with the Spanish Data
              Protection Agency (www.aepd.es).
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-warm-100 flex flex-wrap gap-6 text-[0.85rem]">
            <Link href="/terms" className="text-text-secondary no-underline hover:text-text-primary transition-colors">Terms of Service</Link>
            <Link href="/security" className="text-text-secondary no-underline hover:text-text-primary transition-colors">Security Architecture</Link>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
