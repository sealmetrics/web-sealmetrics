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
    answer: "Sealmetrics has native integrations for Shopify, Magento 2 (Adobe Commerce), WooCommerce, PrestaShop 1.7+/8.x and OpenCart 4.x (3.x with modifications). Any custom or headless framework (Next.js, Nuxt, React, Astro, Remix) works via a standard JavaScript tag.",
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
  description: "Install Sealmetrics on Shopify, Magento, WooCommerce, PrestaShop, OpenCart, WordPress, Webflow, Wix, Squarespace, Drupal and Joomla.",
  openGraph: {
    title: "Platforms — Sealmetrics",
    description: "Install Sealmetrics on Shopify, Magento, WooCommerce, PrestaShop, OpenCart, WordPress, Webflow, Wix, Squarespace, Drupal and Joomla.",
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
    description: "Install Sealmetrics on Shopify, Magento, WooCommerce, PrestaShop, OpenCart, WordPress, Webflow, Wix, Squarespace, Drupal and Joomla.",
    images: [ogImage("/platforms/")],
  },
  alternates: { canonical: "https://sealmetrics.com/platforms/", languages: getAlternates("/platforms") },
};

const platforms = [
  { name: "Shopify", time: "5 min", desc: "Pixel app plus theme app embed, on any Shopify plan. Purchases confirmed server-side by webhook.", href: "/platforms/shopify" },
  { name: "Magento", time: "15 min", desc: "Magento 2.4+ module installed in app/code, including Adobe Commerce. Full funnel per store view and currency.", href: "/platforms/magento" },
  { name: "WooCommerce", time: "10 min", desc: "WooCommerce plugin downloaded from your dashboard. Tracks the funnel from product view to purchase, with no cookies.", href: "/platforms/woocommerce" },
  { name: "PrestaShop", time: "15 min", desc: "Module for PrestaShop 1.7+ and 8.x, uploaded in the Module Manager. Product, cart, checkout and purchase events, with combinations.", href: "/platforms/prestashop" },
  { name: "OpenCart", time: "15 min", desc: "Extension for OpenCart 4.x, and 3.x with modifications. Product, cart, checkout and purchase events, configured per store.", href: "/platforms/opencart" },
  { name: "BigCommerce", time: "Private beta", desc: "Native integration in private beta. Until then, the JavaScript tracker with eCommerce events sent manually." },
  { name: "Squarespace", time: "10 min", desc: "Code injection in site settings. Works with Squarespace Commerce." },
  { name: "WordPress", time: "5 min", desc: "WordPress plugin. Tracks page views, forms, CTAs. Works alongside any page builder." },
  { name: "Webflow", time: "10 min", desc: "Custom code embed in project settings. Works with CMS collections and Webflow eCommerce." },
  { name: "Wix", time: "10 min", desc: "Custom code in site settings. Compatible with Wix Stores and Wix Bookings." },
  { name: "Drupal", time: "15 min", desc: "Drupal module for Drupal 9, 10 and 11. Page views, forms and conversion events." },
  { name: "Joomla", time: "15 min", desc: "Joomla plugin for Joomla 4 and 5. Page views, forms and conversion events." },
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
            A native install for <em>the platforms stores run.</em>
          </h1>
          <p className="text-ink-soft mt-8 mx-auto max-w-[62ch] leading-[1.55]" style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}>
            Shopify, Magento, WooCommerce, PrestaShop, OpenCart, WordPress, Webflow, Wix, Squarespace, Drupal, Joomla — plus any headless framework via one script tag.
          </p>
          <SignalAnswer>
            Sealmetrics installs on the main eCommerce and CMS platforms, and on
            anything else through a single script tag. Shopify, Magento 2,
            WooCommerce, PrestaShop and OpenCart have purpose-built modules, as
            do WordPress, Drupal and Joomla; Webflow, Wix and Squarespace take
            the tag through their custom-code settings, and BigCommerce is in
            private beta. Headless and custom stacks — Next.js, Nuxt, Astro,
            Remix, SvelteKit — use the standard tag plus the event API. Setup
            takes 5 to 30 minutes depending on the platform, and the modules
            send order events without manual configuration. The tracker weighs
            about 1.1 KB gzipped, roughly 132 times lighter than GA4 as measured
            in August 2026. It writes no cookie and no identifier to the
            visitor&rsquo;s device; whether a deployment needs no consent
            banner depends on its configuration and each national
            authority&rsquo;s criteria.
          </SignalAnswer>
        </div>
      </section>

      <section className="py-28 bg-warm-50 border-t border-warm-100">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-12">
            <div>
              <span className="eyebrow mb-5">Native installs</span>
              <h2 className="h-section mt-5">Every platform. <em>Five to thirty minutes.</em></h2>
            </div>
            <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
              Modules for the platforms your team already runs, and a script tag for the rest. No server-side GTM container and no Consent Mode setup.
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
        titleEn={<>Install in <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>5 to 30 minutes</em>, depending on your platform.</>}
        titleEs={<>Instálalo en <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>5 a 30 minutos</em>, según tu plataforma.</>}
        ledeEn="Book 30 minutes. We walk you through the exact integration for your stack — live, on your own site."
        ledeEs="Reserva 30 min. Te llevamos por la integración exacta para tu stack — en directo, sobre tu propia web."
      />
    </>
  );
}
