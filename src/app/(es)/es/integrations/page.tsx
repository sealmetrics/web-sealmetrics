import type { Metadata } from "next";
import { SignalAnswer } from "@/components/v4/SignalAnswer";
import "@/components/v4/signal-answer.css";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { FinalCtaSharedV3 } from "@/components/sections/v3/FinalCtaSharedV3";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Integraciones — Sealmetrics",
  description: "Módulos nativos para eCommerce, CMS, frameworks y tag managers. Conector BigQuery, MCP server para agentes IA, webhooks y API REST completa.",
  openGraph: {
    title: "Integraciones — Sealmetrics",
    description: "Módulos nativos para eCommerce, CMS, frameworks y tag managers. Conector BigQuery, MCP server para agentes IA y API REST completa.",
    type: "website",
    images: [ogImage("/es/integrations/")],
    url: "https://sealmetrics.com/es/integrations/",
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Integraciones — Sealmetrics",
    description: "25+ integraciones nativas: plataformas publicitarias, CMSs eCommerce, data warehouses, BI tools, CRMs. Más MCP server para agentes IA y API REST completa.",
    images: [ogImage("/es/integrations/")],
  },
  alternates: { canonical: "https://sealmetrics.com/es/integrations/", languages: getAlternatesEs("/integrations") },
};

const groups = [
  { title: "eCommerce", items: ["Shopify", "WooCommerce", "Magento 2", "PrestaShop", "OpenCart"] },
  { title: "CMS", items: ["WordPress", "Drupal", "Joomla"] },
  { title: "Constructores web", items: ["Webflow", "Wix", "Squarespace"] },
  { title: "Frameworks", items: ["Next.js", "React", "Nuxt 3"] },
  { title: "Gestión de tags", items: ["Google Tag Manager", "Plantilla de contenedor GTM", "Plantilla de tag GTM"] },
  { title: "Plataformas publicitarias (vía UTM)", items: ["Google Ads", "Meta Ads"] },
  { title: "Datos e IA", items: ["Conector BigQuery", "Data Studio", "MCP server", "Paquete agéntico Claude y Codex", "API REST", "Webhooks"] },
];

// Items with their own page link to it; the rest stay plain.
const itemLinks: Record<string, string> = {
  "Shopify": "/es/platforms/shopify",
  "WooCommerce": "/es/platforms/woocommerce",
  "Magento 2": "/es/platforms/magento",
  "PrestaShop": "/es/platforms/prestashop",
  "OpenCart": "/es/platforms/opencart",
  "Conector BigQuery": "/es/integrations/bigquery",
  "Data Studio": "/es/data-studio",
  "Google Ads": "/es/integrations/google-ads",
  "Meta Ads": "/es/integrations/meta-ads",
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Integraciones" }]} locale="es" />
      <JsonLd data={breadcrumbSchema([{ name: "Integraciones", url: "/es/integrations" }])} />

      <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-16">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 text-center">
          <span className="eyebrow mb-5" style={{ display: "inline-flex", justifyContent: "center" }}>Integraciones nativas</span>
          <h1 className="h-display mx-auto mt-5" style={{ maxWidth: "22ch" }}>
            Encaja en el <em>stack que ya usas.</em>
          </h1>
          <p className="text-ink-soft mt-8 mx-auto max-w-[62ch] leading-[1.55]" style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}>
            Módulos nativos para eCommerce, CMS, constructores web, frameworks y tag managers. Más conector BigQuery, webhooks, API REST completa y un MCP server para agentes IA.
          </p>
          <SignalAnswer label="Respuesta rápida">
            Sealmetrics se integra en dos direcciones: hacia el sitio que produce
            los eventos y hacia las herramientas que los consumen. Del lado de la
            recogida hay módulos nativos para Shopify, WooCommerce, Magento 2,
            PrestaShop y OpenCart, para WordPress, Drupal y Joomla, para Webflow,
            Wix y Squarespace, y para Next.js, React y Nuxt — más plantillas de
            contenedor y de etiqueta de Google Tag Manager para equipos que
            despliegan todo por GTM. Cualquier framework fuera de esa lista
            funciona con un solo script. Del lado del consumo, ese mismo dato
            agregado sale por API REST, webhooks,{" "}
            <Link href="/es/integrations/bigquery" className="text-ink no-underline border-b border-warm-200 hover:border-ink">conector de BigQuery</Link>,{" "}
            <Link href="/es/data-studio" className="text-ink no-underline border-b border-warm-200 hover:border-ink">Data Studio</Link> y un servidor MCP que permite a Claude, ChatGPT, Cursor o
            Codex consultarlo en lenguaje natural. Nada de esto pide una cookie
            ni un identificador de visitante, así que añadir Sealmetrics no añade
            ninguna obligación de consentimiento a un stack que ya la tiene.
          </SignalAnswer>
        </div>
      </section>

      <section className="py-28 bg-warm-50 border-t border-warm-100">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((g) => (
              <article key={g.title} className="bg-white border border-warm-100 rounded-xl p-7">
                <h2 className="text-[17px] font-semibold text-ink tracking-[-0.015em] mb-4">{g.title}</h2>
                <ul className="flex flex-col gap-2">
                  {g.items.map((i) => (
                    <li key={i} className="flex items-center gap-2.5 text-[14px] text-ink-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                      {itemLinks[i] ? (
                        <Link href={itemLinks[i]} className="text-ink-2 no-underline border-b border-warm-200 hover:border-ink">{i}</Link>
                      ) : i}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 bg-white border-t border-warm-100">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-10">
          <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-center">
            <div>
              <span className="inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-brand bg-brand-soft px-3 py-1 rounded-md mb-5">
                Developer-first
              </span>
              <h3 className="font-semibold text-ink tracking-[-0.03em] leading-[1.05]" style={{ fontSize: "clamp(30px, 3.6vw, 44px)" }}>
                API completa, <em>MCP nativo,</em> sin muestreo.
              </h3>
              <p className="text-[17px] leading-[1.6] text-ink-soft mt-5">
                Cobertura REST de cada métrica, cada propiedad, a resolución completa. Webhooks para señales de operación desde el plan Scale. MCP server para que Claude, ChatGPT o tu propio copilot consulten directamente.
              </p>
              <div className="mt-6 flex gap-3 flex-wrap">
                <Link href="/es/product" className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-white rounded-md text-[14px] font-semibold no-underline hover:bg-brand transition-colors">
                  Ver producto →
                </Link>
                <Link href="/es/demo" className="inline-flex items-center gap-2 px-6 py-3 border border-warm-200 text-ink rounded-md text-[14px] font-semibold no-underline hover:bg-warm-50 transition-colors">
                  Pide demo
                </Link>
              </div>
            </div>
            <div className="bg-ink text-white rounded-[20px] p-8 md:p-10 font-mono text-[12.5px] leading-[1.8]">
              <div className="flex gap-1.5 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#FF6058]" />
                <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                <span className="w-2 h-2 rounded-full bg-[#28CA42]" />
              </div>
              <div>
                <div><span style={{ color: "#E8B84B" }}>GET</span> /api/v1/stats/overview</div>
                <div><span style={{ color: "#E8B84B" }}>GET</span> /api/v1/stats/conversions</div>
                <div><span style={{ color: "#E8B84B" }}>GET</span> /api/v1/stats/sources</div>
                <div><span style={{ color: "#E8B84B" }}>POST</span> /api/v1/webhooks</div>
                <div><span style={{ color: "#E8B84B" }}>MCP</span> mcp.sealmetrics.com/mcp</div>
                <div className="mt-3 text-white/45">// sin muestreo · sin umbrales · resolución completa</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCtaSharedV3
        locale="es"
        titleEn={<>Install in 5 to 30 minutes, depending on your platform.</>}
        titleEs={<>Instálalo en <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>5 a 30 minutos</em>, según tu plataforma.</>}
        ledeEn="30 min walkthrough."
        ledeEs="Reserva walkthrough técnico. Script, API, schema BigQuery, MCP server. Sin marketing — te enseñamos la integración."
      />
    </>
  );
}
