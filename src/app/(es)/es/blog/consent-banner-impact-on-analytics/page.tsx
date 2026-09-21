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
  title: "Cómo los banners de consentimiento destruyen tus datos",
  description:
    "En nuestra experiencia con clientes, entre el 40% y el 60% del tráfico no acepta cookies, y muchos aceptan tarde. El impacto en atribución y revenue.",
  openGraph: {
    title: "Cómo los banners de consentimiento destruyen tus datos de analítica",
    description:
      "En nuestra experiencia con clientes, entre el 40% y el 60% del tráfico no acepta cookies. Esto es lo que le hace a tu analítica.",
    type: "article",
    url: "https://sealmetrics.com/es/blog/consent-banner-impact-on-analytics/",
    siteName: "Sealmetrics",
    locale: "es_ES",
    images: ["https://sealmetrics.com/og/blog/consent-banner-impact-on-analytics.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Cómo los banners de consentimiento destruyen tus datos de analítica",
    description: "En nuestra experiencia con clientes, entre el 40% y el 60% del tráfico no acepta cookies. Esto es lo que le hace a tu analítica.",
    images: ["https://sealmetrics.com/og/blog/consent-banner-impact-on-analytics.png"],
  },
  alternates: {
    languages: getAlternates("/blog/consent-banner-impact-on-analytics"),
    canonical: "https://sealmetrics.com/es/blog/consent-banner-impact-on-analytics/",
  },
};

export default function ConsentBannerImpactPageEs() {
  const dates = postDates("consent-banner-impact-on-analytics", "es");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/es/blog" }, { label: "Impacto de los banners de consentimiento" }]} locale="es" />
      <JsonLd data={articleSchema({ headline: "Cómo los banners de consentimiento destruyen tus datos de analítica", description: "Los banners de consentimiento esconden parte de tu tráfico a la analítica — y las cookies aceptadas a menudo llegan tarde para atribuir.", ...dates, url: "/es/blog/consent-banner-impact-on-analytics", category: "Calidad del dato", author: { name: "Rafa Jiménez", url: "/es/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" } })} />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/es/blog" }, { name: "Impacto de los banners de consentimiento", url: "/es/blog/consent-banner-impact-on-analytics" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
            Calidad del dato
          </span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
            Cómo los banners de consentimiento destruyen tus datos de analítica
          </h1>
          <PostByline
              {...dates}
              readTime="6 min de lectura"
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
            <li>En nuestra experiencia con clientes, entre el 40% y el 60% del tráfico no acepta cookies, y la proporción cambia según el país, el sector y el diseño del banner. Esos visitantes son completamente invisibles para la analítica con cookies.</li>
            <li>De quienes aceptan las cookies, el 40% no lo hace en la primera página vista — el landing donde se captura la fuente del tráfico —, así que parte del tráfico que sí mides llega sin origen.</li>
            <li>El rechazo de cookies no es aleatorio: los usuarios sensibles a la privacidad suelen ser más tech-savvy y con mayor poder adquisitivo, introduciendo un sesgo demográfico sistemático en tu data.</li>
            <li>La solución es arquitectónica, no táctica — optimizar el diseño del banner no resuelve el problema porque los reguladores cada vez vigilan más los dark patterns que empujan a aceptar.</li>
          </ul>
        </div>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <p>
            Desde que el{" "}
            <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj" target="_blank" rel="noopener noreferrer">RGPD</a>{" "}
            empezó a aplicarse en 2018, toda web europea que use cookies debe pedir consentimiento antes de hacer tracking. El{" "}
            <Link href="/es/glossary/consent-management-platform" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">banner de consentimiento</Link>{" "}
            se concibió para proteger la privacidad del usuario. El efecto colateral fue volver la analítica web profundamente poco fiable.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Los números: cuánto cuestan los banners de consentimiento
          </h2>

          <p>
            La tasa de rechazo varía por país, sector y diseño del banner. En
            nuestra experiencia con clientes, entre el 40% y el 60% del tráfico
            no acepta cookies, y los mercados más sensibles a la privacidad,
            como Alemania y los Países Bajos, están en la parte alta.
          </p>

          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px] my-6">
            <div className="space-y-4">
              {[
                { country: "Alemania", rate: "60-70%" },
                { country: "Países Bajos", rate: "55-65%" },
                { country: "Francia", rate: "50-60%" },
                { country: "España", rate: "40-50%" },
                { country: "Reino Unido", rate: "35-45%" },
              ].map((item) => (
                <div
                  key={item.country}
                  className="flex justify-between text-[0.9rem]"
                >
                  <span className="text-text-secondary">{item.country}</span>
                  <span className="font-mono text-text-primary font-medium">
                    {item.rate} de rechazo
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[0.8rem] text-text-tertiary mt-4">
              Rangos aproximados basados en informes del sector y datos de clientes de Sealmetrics, 2025.
            </p>
          </div>

          <p>
            Esto significa que si tu audiencia principal está en Alemania, tu analítica
            puede estar perdiendo la mitad de los visitantes antes de considerar cualquier otro factor de pérdida. Ad blockers, restricciones de navegador y{" "}
            <Link
              href="/es/blog/ga4-data-sampling-problem"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              muestreo de datos
            </Link>{" "}
            se acumulan encima.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            El sesgo oculto: ¿quién rechaza las cookies?
          </h2>

          <p>
            El rechazo no es aleatorio. Los usuarios sensibles a la privacidad suelen ser más tech-savvy, con mayor poder adquisitivo y más propensos a usar dispositivos premium. Al perder estos visitantes de tu analítica, no solo pierdes volumen — pierdes un segmento demográficamente relevante.
          </p>

          <p>
            Esto introduce un sesgo sistemático en tu data. Tu analítica
            sobrerrepresenta a usuarios que aceptan tracking (menos sensibles a la privacidad, a menudo más jóvenes o menos tech-savvy) y subrepresenta exactamente a la audiencia que muchos negocios eCommerce quieren entender.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            El impacto en atribución y revenue
          </h2>

          <p>
            Cuando una parte grande de los visitantes es invisible para tu analítica, tu{" "}
            <Link
              href="/es/glossary/multi-touch-attribution"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              modelo de atribución
            </Link>{" "}
            está trabajando con datos de journey incompletos. Un cliente puede descubrirte por orgánico, visitarte tres veces vía email y finalmente convertir directamente — pero si rechazó cookies en la primera visita, todo el journey está fragmentado o invisible.
          </p>

          <p>
            El impacto en revenue es real: las conversiones de visitantes que rechazan cookies aparecen en tu CRM pero no en tu analítica. De ahí el gap persistente entre &ldquo;analytics dice 200 conversiones&rdquo; y &ldquo;el CRM muestra 340&rdquo;.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            El problema de la segunda página: cuando las cookies llegan tarde
          </h2>

          <p>
            Incluso quien acepta las cookies presenta un problema de atribución
            que la mayoría de equipos pasa por alto. En nuestra experiencia con
            clientes, de quienes aceptan las cookies, el 40% no lo hace en la
            primera página vista&nbsp;&mdash; navega primero y acepta después.
          </p>

          <p>
            La landing page es donde se registra la fuente de tráfico: el
            referrer, los parámetros UTM, los identificadores de campaña. Si las
            cookies no están activas en esa primera página vista, el origen del tráfico
            nunca se captura. El visitante se vuelve &ldquo;directo&rdquo; en tus
            reports independientemente de cómo llegó realmente.
          </p>

          <p>
            El resultado: parte del tráfico que sí mides llega sin datos de
            fuente, inflando tu canal &ldquo;Directo&rdquo; y haciendo que cada
            otro canal parezca más débil de lo que es. En{" "}
            <Link href="/es/case-studies/incapto" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Incapto</Link>, el 14%
            de las visitas que registró GA4 no tenía un origen accionable,
            frente al 0,3% en Sealmetrics.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            La solución es arquitectónica, no táctica
          </h2>

          <p>
            No puedes resolver este problema optimizando tu banner.
            Incluso el banner más user-friendly tendrá una tasa de rechazo significativa en UE — y los reguladores cada vez vigilan más los &ldquo;dark patterns&rdquo; que empujan a los usuarios hacia la aceptación.
          </p>

          <p>
            La solución es usar una analítica que no dependa de cookies de entrada.
            La{" "}
            <Link
              href="/es/blog/cookieless-analytics-explained"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              analítica cookieless
            </Link>{" "}
            mide el tráfico sin depender del estado del banner — no
            porque salte el consentimiento, sino porque no recoge datos que lo requieran.
          </p>

          <p>
            Puedes{" "}
            <Link
              href="/es/data-loss-calculator"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              calcular cuánto dato te está costando tu banner
            </Link>{" "}
            o{" "}
            <Link
              href="/es/how-it-works"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              ver cómo funciona Sealmetrics
            </Link>
            .
          </p>
        </div>

        <CommercialModule
          locale="es"
          hook="¿Cuánto tráfico te está borrando el banner — el 40%, el 60%? Ve en una demo cómo quedarían tus informes sin perder visitas por el rechazo del consentimiento."
        />

        <div className="mt-16 pt-10 border-t border-warm-100">
          <h3 className="font-serif text-[1.1rem] font-medium text-text-primary mb-4">
            Artículos relacionados
          </h3>
          <div className="space-y-3">
            <Link
              href="/es/blog/cookieless-analytics-explained"
              className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
            >
              Analítica cookieless explicada: cómo medir sin cookies
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
