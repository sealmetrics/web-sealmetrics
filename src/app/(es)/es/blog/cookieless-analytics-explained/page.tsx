import type { Metadata } from "next";
import { postDates } from "@/lib/content/blog";
import { PostByline } from "@/components/ui/PostByline";
import { getAlternates } from "@/lib/i18n/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { CommercialModule } from "@/components/ui/CommercialModule";

export const metadata: Metadata = {
  title: "Analítica cookieless: cómo medir sin cookies",
  description:
    "Las cookies están desapareciendo. Aprende cómo funciona la analítica cookieless, por qué captura más datos y qué implica para el cumplimiento del RGPD.",
  openGraph: {
    title: "Analítica cookieless explicada",
    description:
      "Cómo funciona la analítica sin cookies, por qué captura más datos y qué implica para compliance.",
    type: "article",
    url: "https://sealmetrics.com/es/blog/cookieless-analytics-explained/",
    siteName: "Sealmetrics",
    locale: "es_ES",
    images: ["https://sealmetrics.com/og/blog/cookieless-analytics-explained.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Analítica cookieless explicada",
    description: "Cómo funciona la analítica sin cookies, por qué captura más datos y qué implica para compliance.",
    images: ["https://sealmetrics.com/og/blog/cookieless-analytics-explained.png"],
  },
  alternates: {
    languages: getAlternates("/blog/cookieless-analytics-explained"),
    canonical: "https://sealmetrics.com/es/blog/cookieless-analytics-explained/",
  },
};

export default function CookielessAnalyticsExplainedPageEs() {
  const dates = postDates("cookieless-analytics-explained", "es");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/es/blog" }, { label: "Analítica cookieless explicada" }]} locale="es" />
      <JsonLd data={articleSchema({ headline: "Analítica cookieless explicada: cómo medir sin cookies", description: "Cómo funciona la analítica cookieless y por qué importa.", ...dates, url: "/es/blog/cookieless-analytics-explained", category: "Tecnología", author: { name: "Rafa Jiménez", url: "/es/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" } })} />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/es/blog" }, { name: "Analítica cookieless", url: "/es/blog/cookieless-analytics-explained" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
            Tecnología
          </span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
            Cómo funciona la analítica web sin cookies, sin consentimiento y sin tracking por usuario
          </h1>
          <PostByline
              {...dates}
              readTime="8 min de lectura"
              authorName="Rafa Jiménez"
              authorUrl="/es/authors/rafa-jimenez"
              locale="es"
            />
        </header>

        <div className="mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
          <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">
            Conclusiones clave
          </h2>
          <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
            <li>La analítica basada en cookies falla a tres niveles estructurales: los navegadores bloquean las cookies de terceros por defecto, el consentimiento RGPD provoca ~55% de rechazos, y los ad blockers eliminan los scripts en otro 40%.</li>
            <li>La analítica cookieless reemplaza las cookies por recolección de datos first-party a través de tu propia infraestructura — sin servidor de terceros, sin scripts bloqueados, sin dependencia del consentimiento.</li>
            <li>El tracking con cookies captura ~13% del tráfico UE; el tracking cookieless no pierde visitas por el consentimiento porque no hay nada que rechazar ni que expire.</li>
            <li>La exención de consentimiento es arquitectónica, no un workaround — no se recogen datos personales y no se almacenan cookies, en línea con las guías de la CNIL y del DSK alemán.</li>
          </ul>
        </div>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <p>
            La cookie — el pequeño archivo de texto que ha alimentado la analítica web
            desde 1994 — está llegando al final de su vida útil. Safari bloquea
            las cookies de terceros por defecto. Firefox hace lo mismo. Chrome
            las ha restringido. Y los requisitos de consentimiento del{" "}
            <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj" target="_blank" rel="noopener noreferrer">RGPD</a>{" "}
            implican que un porcentaje significativo de visitantes europeos rechaza por completo el tracking basado en cookies.
          </p>

          <p>
            Para los negocios que dependen de la analítica web para tomar decisiones de marketing,
            esto crea un problema fundamental: la herramienta sobre la que confías para
            entender tu tráfico es cada vez más ciega a la mayoría del mismo.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Por qué las cookies fallan al medir
          </h2>

          <p>
            Las cookies se diseñaron para gestión de sesión — mantener a los usuarios
            logueados, recordar carritos. Su uso para tracking analítico fue una adaptación posterior, y esa adaptación dependía de condiciones que ya no existen:
          </p>

          <ul className="space-y-2 pl-0 list-none">
            {[
              "Los navegadores aceptaban todas las cookies por defecto (ya no lo hacen)",
              "Los usuarios rara vez borraban las cookies (las funciones de privacidad ahora lo hacen automáticamente)",
              "Los ad blockers eran poco comunes (40% de los usuarios UE los usan ahora)",
              "El consentimiento no era requerido (el RGPD lo cambió en 2018)",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[0.95rem]"
              >
                <span className="text-text-tertiary shrink-0">&mdash;</span>
                {item}
              </li>
            ))}
          </ul>

          <p>
            El efecto acumulado es dramático. Un sitio eCommerce europeo típico
            pierde aproximadamente el 87% de sus datos de visitantes antes de que
            ocurra cualquier procesamiento analítico. La{" "}
            <Link
              href="/es/data-loss-calculator"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              calculadora de pérdida de datos
            </Link>{" "}
            muestra la cascada de pérdidas para tu tráfico específico.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Cómo funciona la analítica cookieless
          </h2>

          <p>
            La{" "}
            <Link
              href="/es/glossary/cookieless-analytics"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              analítica cookieless
            </Link>{" "}
            reemplaza el mecanismo de cookies por{" "}
            <Link
              href="/es/glossary/first-party-data-collection"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              recolección de datos cookieless first-party
            </Link>
            . En lugar de colocar una cookie en el navegador del visitante y
            enviar los datos a un servidor analítico de terceros, la recolección
            de datos pasa por tu propia infraestructura.
          </p>

          <p>Las diferencias clave:</p>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-[0.85rem]">
              <thead>
                <tr className="border-b border-warm-200">
                  <th className="text-left py-3 pr-6 text-text-tertiary font-medium">
                    Aspecto
                  </th>
                  <th className="text-left py-3 px-6 text-text-secondary font-medium">
                    Con cookies (GA4)
                  </th>
                  <th className="text-left py-3 pl-6 text-green-muted font-medium">
                    Cookieless (Sealmetrics)
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    aspect: "Ruta del dato",
                    cookie: "Navegador → servidor de terceros",
                    cookieless: "Navegador → tu servidor (first-party)",
                  },
                  {
                    aspect: "Bloqueado por ad blockers",
                    cookie: "Sí (40% de usuarios)",
                    cookieless: "No (peticiones first-party)",
                  },
                  {
                    aspect: "Afectado por consentimiento",
                    cookie: "Sí (55% rechaza en UE)",
                    cookieless: "No (sin cookies ni PII)",
                  },
                  {
                    aspect: "Restricciones de navegador",
                    cookie: "ITP, ETP limitan vida de cookie",
                    cookieless: "No aplica",
                  },
                  {
                    aspect: "Tráfico capturado",
                    cookie: "~13% en UE",
                    cookieless: "Sin pérdida por consentimiento",
                  },
                ].map((row) => (
                  <tr
                    key={row.aspect}
                    className="border-b border-warm-100 last:border-0"
                  >
                    <td className="py-3 pr-6 text-text-body">{row.aspect}</td>
                    <td className="py-3 px-6 text-text-secondary">
                      {row.cookie}
                    </td>
                    <td className="py-3 pl-6 text-text-primary font-medium">
                      {row.cookieless}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Compliance de privacidad sin renunciar a nada
          </h2>

          <p>
            Una idea común equivocada es que la analítica cookieless es un workaround
            para evitar requisitos de consentimiento. No lo es. El motivo de que el consentimiento no
            sea requerido es arquitectónico: no se recogen datos personales y no se
            almacenan cookies en el dispositivo del visitante.
          </p>

          <p>
            Esto es consistente con los criterios de exención de la{" "}
            <a href="https://www.cnil.fr/en/cookies-and-other-tracking-devices-cnil-publishes-new-guidelines" target="_blank" rel="noopener noreferrer">CNIL</a>{" "}
            (DPA francesa) para herramientas de medición de audiencia y con la guía del DSK alemán
            sobre analítica sin consentimiento. La página de{" "}
            <Link
              href="/es/security"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              arquitectura de seguridad y privacidad
            </Link>{" "}
            cubre la alineación regulatoria en detalle.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Qué implica esto para tu analítica
          </h2>

          <p>
            La transición de analítica con cookies a analítica cookieless no es una
            mejora menor. Es un cambio fundamental en lo que puedes medir.
            Modelos de atribución que eran poco fiables sobre el 13% de los datos pasan a ser útiles
            sobre dato sin huecos de consentimiento. La optimización de campañas que se basaba en el
            segmento que aceptaba cookies puede ahora reflejar el comportamiento real de los visitantes.
          </p>

          <p>
            La mejor manera de entender la diferencia es verla. Corre una
            herramienta de analítica cookieless en paralelo a tu setup actual y compara
            los números.{" "}
            <Link
              href="/es/how-it-works"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              Aprende cómo funciona Sealmetrics
            </Link>{" "}
            o{" "}
            <Link
              href="/es/vs-ga4"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              ve la comparativa completa con GA4
            </Link>
            .
          </p>
        </div>

        <CommercialModule
          locale="es"
          hook="¿Quieres ver la analítica cookieless sobre tu propio sitio en lugar de en un diagrama? En una demo la ves midiendo tus visitas sin depender del consentimiento, sin cookies ni banner."
        />

        {/* Related */}
        <div className="mt-16 pt-10 border-t border-warm-100">
          <h3 className="font-serif text-[1.1rem] font-medium text-text-primary mb-4">
            Artículos relacionados
          </h3>
          <div className="space-y-3">
            <Link
              href="/es/blog/consent-banner-impact-on-analytics"
              className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
            >
              Cómo los banners de consentimiento destruyen tus datos de analítica
            </Link>
            <Link
              href="/es/blog/ga4-data-sampling-problem"
              className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
            >
              Muestreo de datos en GA4: por qué tus números de tráfico están mal
            </Link>
          </div>
        </div>
      </div>
    </article>
    </>
  );
}
