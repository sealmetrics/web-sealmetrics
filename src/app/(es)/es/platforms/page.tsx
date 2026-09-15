import type { Metadata } from "next";
import Link from "next/link";
import { SignalAnswer } from "@/components/v4/SignalAnswer";
import "@/components/v4/signal-answer.css";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { FinalCtaSharedV3 } from "@/components/sections/v3/FinalCtaSharedV3";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Plataformas — Sealmetrics",
  description: "Instala Sealmetrics en Shopify, Magento, WooCommerce, PrestaShop, OpenCart, WordPress, Webflow, Wix, Squarespace, Drupal y Joomla.",
  openGraph: {
    title: "Plataformas — Sealmetrics",
    description: "Instala Sealmetrics en Shopify, Magento, WooCommerce, PrestaShop, OpenCart, WordPress, Webflow, Wix, Squarespace, Drupal y Joomla.",
    type: "website",
    images: [ogImage("/es/platforms/")],
    url: "https://sealmetrics.com/es/platforms/",
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Plataformas — Sealmetrics",
    description: "Instala Sealmetrics en Shopify, Magento, WooCommerce, PrestaShop, OpenCart, WordPress, Webflow, Wix, Squarespace, Drupal y Joomla.",
    images: [ogImage("/es/platforms/")],
  },
  alternates: { canonical: "https://sealmetrics.com/es/platforms/", languages: getAlternatesEs("/platforms") },
};

const platforms = [
  { name: "Shopify", time: "5 min", desc: "App Pixel más app embed del tema, en cualquier plan de Shopify. Compras confirmadas en servidor por webhook.", href: "/es/platforms/shopify" },
  { name: "Magento", time: "15 min", desc: "Módulo para Magento 2.4+ instalado en app/code, Adobe Commerce incluido. Todo el funnel por vista de tienda y moneda.", href: "/es/platforms/magento" },
  { name: "WooCommerce", time: "10 min", desc: "Plugin de WooCommerce que se descarga desde tu dashboard. Mide el funnel desde la ficha de producto hasta la compra, sin cookies.", href: "/es/platforms/woocommerce" },
  { name: "PrestaShop", time: "15 min", desc: "Módulo para PrestaShop 1.7+ y 8.x, que se sube en el Gestor de módulos. Eventos de producto, carrito, checkout y compra, con combinaciones.", href: "/es/platforms/prestashop" },
  { name: "OpenCart", time: "15 min", desc: "Extensión para OpenCart 4.x, y 3.x con modificaciones. Eventos de producto, carrito, checkout y compra, configurada tienda a tienda.", href: "/es/platforms/opencart" },
  { name: "BigCommerce", time: "Beta privada", desc: "Integración nativa en beta privada. Mientras tanto, el tracker JavaScript con los eventos de eCommerce enviados a mano." },
  { name: "Squarespace", time: "10 min", desc: "Code injection en los ajustes del sitio. Compatible con Squarespace Commerce." },
  { name: "WordPress", time: "5 min", desc: "Plugin WordPress. Trackea pageviews, formularios, CTAs. Funciona con cualquier page builder." },
  { name: "Webflow", time: "10 min", desc: "Custom code embed en project settings. Funciona con las CMS collections y con Webflow eCommerce." },
  { name: "Wix", time: "10 min", desc: "Custom code en site settings. Compatible con Wix Stores y Wix Bookings." },
  { name: "Drupal", time: "15 min", desc: "Módulo para Drupal 9, 10 y 11. Páginas vistas, formularios y eventos de conversión." },
  { name: "Joomla", time: "15 min", desc: "Plugin para Joomla 4 y 5. Páginas vistas, formularios y eventos de conversión." },
  { name: "Custom / headless", time: "30 min", desc: "Cualquier framework (Next.js, Nuxt, Astro, Remix) vía un script + event API." },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Plataformas" }]} locale="es" />
      <JsonLd data={breadcrumbSchema([{ name: "Plataformas", url: "/es/platforms" }])} />

      <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-16">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 text-center">
          <span className="eyebrow mb-5" style={{ display: "inline-flex", justifyContent: "center" }}>Plataformas</span>
          <h1 className="h-display mx-auto mt-5" style={{ maxWidth: "22ch" }}>
            Instalación nativa en <em>las plataformas de tu tienda.</em>
          </h1>
          <p className="text-ink-soft mt-8 mx-auto max-w-[62ch] leading-[1.55]" style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}>
            Shopify, Magento, WooCommerce, PrestaShop, OpenCart, WordPress, Webflow, Wix, Squarespace, Drupal, Joomla — más cualquier framework headless vía un script.
          </p>
          <SignalAnswer label="Respuesta rápida">
            Sealmetrics se instala en las principales plataformas de eCommerce y
            CMS, y en cualquier otra con un solo script. Shopify, Magento 2,
            WooCommerce, PrestaShop y OpenCart tienen módulo propio, igual que
            WordPress, Drupal y Joomla; Webflow, Wix y Squarespace reciben el
            script desde sus ajustes de código personalizado, y BigCommerce está
            en beta privada. Los stacks headless y a medida — Next.js, Nuxt,
            Astro, Remix, SvelteKit — usan el script estándar más la API de
            eventos. La instalación lleva entre 5 y 30 minutos según la
            plataforma, y los módulos envían los eventos de pedido sin
            configurarlos a mano. El tracker pesa unos 1,1 KB comprimido, unas
            132 veces menos que GA4 según la medición de agosto de 2026. No
            escribe cookies ni identificadores en el dispositivo del visitante;
            que un despliegue pueda prescindir del banner de consentimiento
            depende de su configuración y del criterio de cada autoridad
            nacional.
          </SignalAnswer>
        </div>
      </section>

      <section className="py-28 bg-warm-50 border-t border-warm-100">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-12">
            <div>
              <span className="eyebrow mb-5">Instalaciones nativas</span>
              <h2 className="h-section mt-5">Cada plataforma. <em>De cinco a treinta minutos.</em></h2>
            </div>
            <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
              Módulos para las plataformas que tu equipo ya usa, y un script para el resto. Sin contenedor de GTM server-side y sin configurar Consent Mode.
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
        locale="es"
        titleEn={<>Install in 5 to 30 minutes, depending on your platform.</>}
        titleEs={<>Instálalo en <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>5 a 30 minutos</em>, según tu plataforma.</>}
        ledeEn="Book a walkthrough."
        ledeEs="Reserva 30 min. Te llevamos por la integración exacta para tu stack — en directo, sobre tu propia web."
      />
    </>
  );
}
