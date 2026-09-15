import type { Metadata } from "next";
import { SignalAnswer } from "@/components/v4/SignalAnswer";
import "@/components/v4/signal-answer.css";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { ogImage } from "@/lib/seo/og";

const faqs = [
  {
    question: "Which eCommerce platforms does Sealmetrics support?",
    answer: "Sealmetrics has native integrations for Shopify, Magento 2 (Adobe Commerce), WooCommerce, PrestaShop 1.7/8.x and OpenCart 3.x/4.x. Any custom or headless framework (Next.js, Nuxt, React, Astro, Remix) works via a standard JavaScript tag.",
  },
  {
    question: "How long does it take to install Sealmetrics on Shopify?",
    answer: "About five minutes on any Shopify plan: connect the Sealmetrics Pixel app and enable the theme app embed. Purchases are confirmed server-side by Shopify's orders/create webhook — no manual event configuration.",
  },
  {
    question: "Does Sealmetrics work with headless or custom-built sites?",
    answer: "Yes. The standard JavaScript tag plus event API works on any framework — Next.js, Nuxt, Astro, Remix, SvelteKit or custom SSR stacks. Typical install time is 30 minutes.",
  },
  {
    question: "Does Sealmetrics require changes to my existing cookie banner?",
    answer: "No. Sealmetrics does not use cookies, localStorage or fingerprinting, so no consent banner is required for its operation. It runs alongside any existing CMP configuration without interfering with it.",
  },
];
import { getAlternates } from "@/lib/i18n/navigation";
import { FinalCtaSharedV3 } from "@/components/sections/v3/FinalCtaSharedV3";

export const metadata: Metadata = {
  title: "Platforms — Sealmetrics",
  description: "Native install for Shopify, Magento, WooCommerce, PrestaShop, OpenCart, WordPress, Webflow, Wix, Squarespace, Drupal and Joomla.",
  openGraph: {
    title: "Platforms — Sealmetrics",
    description: "Native install for Shopify, Magento, WooCommerce, PrestaShop, OpenCart, WordPress, Webflow, Wix, Squarespace, Drupal and Joomla.",
    type: "website",
    images: [ogImage("/platforms/")],
    url: "https://sealmetrics.com/platforms/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Platforms — Sealmetrics",
    description: "Native install for Shopify, Magento, WooCommerce, PrestaShop, OpenCart, WordPress, Webflow, Wix, Squarespace, Drupal and Joomla.",
    images: [ogImage("/platforms/")],
  },
  alternates: { canonical: "https://sealmetrics.com/platforms/", languages: getAlternates("/platforms") },
};

const platforms = [
  { name: "Shopify", time: "5 min", desc: "Pixel app plus theme app embed, on any Shopify plan. Purchases confirmed server-side by webhook.", href: "/platforms/shopify" },
  { name: "Magento", time: "15 min", desc: "Magento 2.4+ module installed in app/code, including Adobe Commerce. Full funnel per store view and currency.", href: "/platforms/magento" },
  { name: "WooCommerce", time: "10 min", desc: "Official WordPress plugin. Zero config. Respects your existing consent setup (but doesn't need it).", href: "/platforms/woocommerce" },
  { name: "PrestaShop", time: "15 min", desc: "PrestaShop 1.7 & 8.x module. Conversion tracking and full funnel out of the box." },
  { name: "OpenCart", time: "15 min", desc: "Extension for OpenCart 3.x and 4.x stores. Conversion and revenue events out of the box." },
  { name: "Squarespace", time: "10 min", desc: "Code injection in site settings. Works with Squarespace Commerce." },
  { name: "WordPress", time: "5 min", desc: "WordPress plugin. Tracks page views, forms, CTAs. Works alongside any page builder." },
  { name: "Webflow", time: "10 min", desc: "Custom code embed in project settings. Works with CMS collections and eCommerce." },
  { name: "Wix", time: "10 min", desc: "Custom code in site settings. Compatible with Wix Stores and Wix Bookings." },
  { name: "Drupal", time: "15 min", desc: "Drupal module compatible with Drupal 9 & 10. Works with Commerce Kickstart." },
  { name: "Joomla", time: "15 min", desc: "Joomla extension for Joomla 4 & 5. Basic tracking and conversion events." },
  { name: "Custom / headless", time: "30 min", desc: "Any framework (Next.js, Nuxt, Astro, Remix) via one script tag + event API." },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Platforms" }]} />
      <JsonLd data={breadcrumbSchema([{ name: "Platforms", url: "/platforms" }])} />

      <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-16">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 text-center">
          <span className="eyebrow mb-5" style={{ display: "inline-flex", justifyContent: "center" }}>Platforms</span>
          <h1 className="h-display mx-auto mt-5" style={{ maxWidth: "22ch" }}>
            Native on <em>every eCommerce platform.</em>
          </h1>
          <p className="text-ink-soft mt-8 mx-auto max-w-[62ch] leading-[1.55]" style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}>
            Shopify, Magento, WooCommerce, PrestaShop, OpenCart, WordPress, Webflow, Wix, Squarespace, Drupal, Joomla — plus any headless framework via one script tag.
          </p>
          <SignalAnswer>
            Sealmetrics installs natively on every major eCommerce and CMS
            platform, and on anything else through a single script tag. Shopify,
            Magento 2, WooCommerce, PrestaShop and OpenCart have purpose-built
            modules; so do WordPress, Drupal and Joomla, and Webflow, Wix and
            Squarespace. Headless and custom stacks — Next.js, Nuxt, Astro,
            Remix, SvelteKit — use the standard tag plus the event API. Every
            setup takes under 30 minutes, and Shopify, on any plan, takes
            about five; order data then flows without manual event
            configuration. The tracker is small enough not to matter: under 5 KB
            gzipped, roughly 132 times smaller than GA4 as measured in August
            2026. What installation never involves is a consent banner, a cookie
            or an identifier written to the visitor&rsquo;s device — and served
            from your own subdomain, nothing on the page matches the
            third-party lists blockers work from.
          </SignalAnswer>
        </div>
      </section>

      <section className="py-28 bg-warm-50 border-t border-warm-100">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-12">
            <div>
              <span className="eyebrow mb-5">Native installs</span>
              <h2 className="h-section mt-5">Every platform. <em>Every setup time under 30 minutes.</em></h2>
            </div>
            <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
              Native integrations for the platforms your team already runs. No hacky workarounds, no server-side GTM gymnastics, no consent mode polyfills.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {platforms.map((p) => {
              const card = (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-[17px] font-semibold text-ink tracking-[-0.015em] group-hover:text-brand transition-colors">{p.name}</h3>
                    <span className="inline-flex px-2.5 py-1 bg-brand-soft text-brand-hover font-mono text-[10px] font-bold uppercase tracking-[0.08em] rounded">{p.time}</span>
                  </div>
                  <p className="text-[13.5px] leading-[1.55] text-ink-soft">{p.desc}</p>
                </>
              );
              return "href" in p && p.href ? (
                <Link
                  key={p.name}
                  href={p.href as string}
                  className="group bg-white border border-warm-100 rounded-xl p-6 flex flex-col no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5"
                >
                  {card}
                </Link>
              ) : (
                <article key={p.name} className="bg-white border border-warm-100 rounded-xl p-6 flex flex-col">
                  {card}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <FinalCtaSharedV3
        locale="en"
        titleEn={<>Install in <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>15 minutes</em> on your platform.</>}
        titleEs={<>Instálalo en <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>15 minutos</em> en tu plataforma.</>}
        ledeEn="Book 30 minutes. We walk you through the exact integration for your stack — live, on your own site."
        ledeEs="Reserva 30 min. Te llevamos por la integración exacta para tu stack — en directo, sobre tu propia web."
      />
    </>
  );
}
