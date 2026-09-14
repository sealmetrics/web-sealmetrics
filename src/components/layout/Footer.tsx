import { Picture } from "@/components/ui/Picture";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localizedHref } from "@/lib/i18n/navigation";

function getFooterColumns(t: ReturnType<typeof getDictionary>["footer"], locale: Locale) {
  return [
    {
      title: t.product,
      links: [
        { label: t.platformOverview, href: localizedHref("/product", locale) },
        { label: t.howItWorks, href: localizedHref("/how-it-works", locale) },
        { label: t.integrations, href: localizedHref("/integrations", locale) },
        { label: t.platforms, href: localizedHref("/platforms", locale) },
        { label: t.pricing, href: localizedHref("/pricing", locale) },
        { label: t.security, href: localizedHref("/security", locale) },
        { label: t.forCmos, href: localizedHref("/for/cmo", locale) },
        { label: t.forCtos, href: localizedHref("/for/cto", locale) },
      ],
    },
    {
      title: t.industries,
      links: [
        { label: t.ecommerce, href: localizedHref("/for/ecommerce", locale) },
        { label: t.hotels, href: localizedHref("/for/hotels", locale) },
        { label: t.saas, href: localizedHref("/for/saas", locale) },
        { label: t.agencies, href: localizedHref("/for/agencies", locale) },
        { label: t.media, href: localizedHref("/for/media", locale) },
        { label: t.finance, href: localizedHref("/for/finance", locale) },
        { label: t.healthcare, href: localizedHref("/for/healthcare", locale) },
        { label: t.education, href: localizedHref("/for/education", locale) },
        // The /for hub itself. Every leaf under it was linked from here and
        // from the header, but the index that lists them all was reachable
        // from nowhere. Literal label: the slug is not in the dictionary.
        {
          label: locale === "es" ? "Todos los roles y sectores" : "All roles and industries",
          href: localizedHref("/for", locale),
        },
      ],
    },
    {
      title: t.compare,
      links: [
        { label: t.vsGa4, href: localizedHref("/vs-ga4", locale) },
        { label: t.vsGa360, href: localizedHref("/vs/ga360", locale) },
        { label: t.vsAdobe, href: localizedHref("/vs/adobe-analytics", locale) },
        { label: t.vsPiwik, href: localizedHref("/vs/piwik-pro", locale) },
        { label: t.dataLossCalc, href: localizedHref("/data-loss-calculator", locale) },
        // Landings de campaña. Rutas literales y no traducidas por diccionario:
        // los slugs difieren por idioma y no están en el registro de
        // traducciones, así que localizedHref devolvería la ruta inglesa.
        locale === "es"
          ? { label: "Tu ROAS real", href: "/es/roas-real/" }
          : { label: "Your real ROAS", href: "/real-roas/" },
      ],
    },
    {
      title: t.resources,
      links: [
        { label: t.open, href: localizedHref("/open", locale) },
        { label: t.growth, href: localizedHref("/growth", locale) },
        { label: t.blog, href: localizedHref("/blog", locale) },
        { label: t.caseStudies, href: localizedHref("/case-studies", locale) },
        { label: t.videos, href: localizedHref("/videos", locale) },
        { label: t.glossary, href: localizedHref("/glossary", locale) },
        { label: t.changelog, href: localizedHref("/changelog", locale) },
      ],
    },
    {
      title: t.company,
      links: [
        { label: t.about, href: localizedHref("/about", locale) },
        { label: t.careers, href: localizedHref("/careers", locale) },
        { label: t.privacy, href: localizedHref("/privacy", locale) },
        { label: t.terms, href: localizedHref("/terms", locale) },
        { label: t.dpa, href: localizedHref("/dpa", locale) },
        { label: t.trust, href: localizedHref("/trust", locale) },
      ],
    },
  ];
}

export function Footer({ locale = "en" }: { locale?: Locale }) {
  const t = getDictionary(locale).footer;
  const footerColumns = getFooterColumns(t, locale);

  // Footer strip follows the site-wide conversion ladder: demo first (the
  // assisted path for the ICP), self-serve sandbox as the explicit alternative.
  const demoHref = localizedHref("/demo", locale);
  const demoAccessHref = locale === "es" ? "/es/demo-access" : "/demo-access";

  return (
    <footer className="bg-signal-ink border-t border-signal-ink pt-12 pb-8">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="mb-12 pb-10 border-b border-warm-800 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <p className="text-[0.95rem] font-semibold text-warm-white tracking-[-0.01em]">
              {locale === "es"
                ? "¿Listo para ver el tráfico que el consentimiento te esconde?"
                : "Ready to see the traffic consent hides from you?"}
            </p>
            <p className="text-[0.78rem] text-warm-300 mt-1">
              {locale === "es"
                ? "30 minutos con el founder, sobre tu propia web · sin compromiso"
                : "30 minutes with the founder, on your own site · no commitment"}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-5 self-start md:self-auto">
            <Link
              href={demoHref}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[0.9rem] font-semibold text-signal-ink bg-acid border border-acid no-underline hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#FFFDF7] transition-all"
            >
              {locale === "es" ? "Reserva una demo" : "Book a demo"} <span aria-hidden>→</span>
            </Link>
            <Link
              href={demoAccessHref}
              className="text-[0.85rem] text-warm-300 no-underline border-b border-warm-800 pb-0.5 hover:text-warm-white transition-colors"
            >
              {locale === "es"
                ? "o explora la cuenta demo por tu cuenta"
                : "or explore the demo account on your own"}
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-12 mb-12">
          <div>
            <Link href={localizedHref("/", locale)} className="inline-block mb-3 no-underline">
              <Picture
                src="/logos/logo-sealmetrics-white.svg"
                alt="Sealmetrics"
                width={157}
                height={28}
                className="h-7 w-auto"
              />
            </Link>
            <p className="text-[0.85rem] leading-relaxed text-warm-300 max-w-[280px]">
              {t.tagline}
            </p>
          </div>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-[0.7rem] font-medium uppercase tracking-[0.06em] text-warm-300 mb-4">
                {col.title}
              </h3>
              <nav aria-label={col.title} className="flex flex-col">
                {col.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[0.85rem] text-warm-300 no-underline py-1 hover:text-warm-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-warm-800 flex flex-col md:flex-row justify-between text-[0.8rem] text-warm-300 gap-2">
          <span>&copy; {new Date().getFullYear()} {t.copyright}</span>
          <span>{t.hosted}</span>
        </div>
      </div>
    </footer>
  );
}
