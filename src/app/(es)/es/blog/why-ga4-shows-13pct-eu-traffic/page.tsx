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
  title: "Por qué GA4 muestra el 13% de tu tráfico UE",
  description:
    "GA4 pierde dato por rechazo de consentimiento, ad blockers y restricciones de navegador. El resultado: ~13% del tráfico real UE. Aquí están las cuentas.",
  openGraph: {
    title: "Por qué GA4 muestra el 13% de tu tráfico UE",
    description:
      "GA4 pierde tráfico UE en tres niveles estructurales. Aquí está la cascada que te deja con el 13%.",
    type: "article",
    url: "https://sealmetrics.com/es/blog/why-ga4-shows-13pct-eu-traffic/",
    siteName: "Sealmetrics",
    locale: "es_ES",
    images: ["https://sealmetrics.com/og/blog/why-ga4-shows-13pct-eu-traffic.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Por qué GA4 muestra el 13% de tu tráfico UE",
    description: "GA4 pierde tráfico UE en tres niveles estructurales. Aquí está la cascada que te deja con el 13%.",
    images: ["https://sealmetrics.com/og/blog/why-ga4-shows-13pct-eu-traffic.png"],
  },
  alternates: {
    languages: getAlternates("/blog/why-ga4-shows-13pct-eu-traffic"),
    canonical: "https://sealmetrics.com/es/blog/why-ga4-shows-13pct-eu-traffic/",
  },
};

export default function WhyGA4Shows13PctPageEs() {
  const dates = postDates("why-ga4-shows-13pct-eu-traffic", "es");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/es/blog" }, { label: "Por qué GA4 muestra el 13% de tu tráfico UE" }]} locale="es" />
      <JsonLd data={articleSchema({ headline: "Por qué GA4 muestra el 13% de tu tráfico UE", description: "GA4 pierde dato en tres niveles estructurales, dejando ~13% del tráfico real UE.", ...dates, url: "/es/blog/why-ga4-shows-13pct-eu-traffic", category: "Calidad del dato", author: { name: "Rafa Jiménez", url: "/es/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" } })} />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/es/blog" }, { name: "Por qué GA4 muestra el 13% de tu tráfico UE", url: "/es/blog/why-ga4-shows-13pct-eu-traffic" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
            Calidad del dato
          </span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
            Por qué GA4 muestra el 13% de tu tráfico UE
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
            <li>GA4 captura aproximadamente el 13% del tráfico real UE tras tres capas de pérdida: rechazo de consentimiento (55%), ad blockers (40%) y restricciones de navegador.</li>
            <li>Incluso entre el 45% que acepta cookies, el 65% lo hace en la segunda página vista — después del landing donde se captura la fuente del tráfico. Solo ~16% de los visitantes tiene atribución correcta.</li>
            <li>La cascada es multiplicativa: 100 visitantes reales se quedan en ~45 tras el consentimiento, ~27 tras ad blockers y ~13 tras restricciones del navegador como ITP de Safari.</li>
            <li>Google Consent Mode v2 modela el dato faltante pero no puede recuperar lo que nunca se recogió — estima, no mide.</li>
            <li>La analítica cookieless evita las tres capas operando sin cookies, sin peticiones de terceros y sin dependencia del consentimiento.</li>
          </ul>
        </div>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <p>
            Abre GA4 ahora y mira las sesiones de ayer. El número en pantalla no
            está mal exactamente. Es data real de visitantes reales. El problema es
            lo que deja fuera: aproximadamente el 87% de las personas que realmente
            visitaron tu sitio.
          </p>

          <p>
            No es un bug. No es una mala configuración. Es el resultado estructural
            de cómo funciona la analítica con cookies en la Unión Europea en 2026. Y
            entender la matemática detrás es el primer paso para arreglarlo.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Tres capas de pérdida de datos
          </h2>

          <p>
            GA4 no pierde tu data en un único sitio. La pierde en tres capas
            sucesivas, cada una agravando la anterior. El término para esta erosión
            acumulativa es{" "}
            <Link
              href="/es/glossary/data-loss-in-analytics"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              pérdida de datos en analítica
            </Link>
            , y en UE sigue una cascada predecible.
          </p>

          <p>
            Empieza con 100 visitantes reales llegando a tu sitio. Para cuando
            GA4 los procesa, te quedan aproximadamente 13. Aquí está cómo
            funciona cada capa.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Capa 1: el rechazo de consentimiento elimina el 55%
          </h2>

          <p>
            Bajo el{" "}
            <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj" target="_blank" rel="noopener noreferrer">RGPD y la directiva ePrivacy</a>, cualquier web que use cookies
            para analítica debe obtener consentimiento explícito antes de disparar
            scripts de tracking. La tasa media de rechazo en mercados UE es
            aproximadamente del 55%. En Alemania regularmente supera el 65%. En
            los Países Bajos, el 60%.
          </p>

          <p>
            Cuando un visitante hace clic en &ldquo;Rechazar&rdquo; en tu banner,
            GA4 nunca carga. Ese visitante no existe en tu analítica. Sin
            pageview, sin sesión, sin evento. Es invisible.
          </p>

          <p>
            El problema más profundo es que el{" "}
            <Link
              href="/es/blog/consent-banner-impact-on-analytics"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              rechazo de consentimiento no es aleatorio
            </Link>
            . Los usuarios sensibles a la privacidad suelen ser más tech-savvy,
            con mayor poder adquisitivo, y más propensos a usar dispositivos
            premium. Perderlos introduce un sesgo sistemático en tu data.
          </p>

          <p>
            Tras esta primera capa: 100 visitantes se convierten en aproximadamente 45.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            La capa oculta: cookies que llegan demasiado tarde
          </h2>

          <p>
            Hay un detalle que hace el problema de atribución aún peor que las
            cifras de cabecera. Del 45% que acepta cookies, los estudios muestran
            que el 65% acepta a partir de la segunda página vista&nbsp;&mdash; no
            la primera.
          </p>

          <p>
            ¿Por qué importa? Porque la landing page es donde se registra la
            fuente del tráfico. El referrer, los parámetros UTM, los datos de
            campaña&nbsp;&mdash; todo se captura en la primera página vista. Si
            las cookies no están activas en esa página, la fuente nunca se
            atribuye.
          </p>

          <p>
            Las cuentas: 45 visitantes aceptan cookies. El 65% (29 visitantes)
            acepta en la segunda página o más tarde. Solo el 35% de 45&nbsp;&mdash;
            aproximadamente 16 visitantes de cada 100&nbsp;&mdash; tienen cookies
            activas en la landing y por tanto su fuente correctamente atribuida.
          </p>

          <p>
            Esto significa que incluso si te enfocas solo en visitantes que aceptan
            cookies, tu dato de atribución es correcto solo para ~16% del tráfico
            total. El resto son invisibles (55%) o visibles pero con origen
            desconocido (29%).
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Capa 2: los ad blockers eliminan otro 40%
          </h2>

          <p>
            De los 45 visitantes que aceptaron cookies, aproximadamente el 40% usa
            extensiones de navegador que bloquean los scripts de analítica. uBlock
            Origin, AdBlock Plus, los escudos integrados de Brave y decenas de
            herramientas similares apuntan todas a gtag.js y al endpoint de
            recolección de Google Analytics.
          </p>

          <p>
            A diferencia del rechazo de consentimiento, el ad blocking es
            silencioso. El visitante aceptó tu banner, está navegando, incluso
            puede estar convirtiendo&mdash; pero GA4 nunca dispara porque el
            script fue bloqueado antes de cargarse.
          </p>

          <p>
            La adopción de ad blockers varía por mercado pero sigue subiendo año
            tras año. En audiencias técnicas&mdash; software, SaaS, herramientas
            de developers&mdash; la tasa puede superar el 60%.
          </p>

          <p>
            Tras esta segunda capa: 45 visitantes se convierten en aproximadamente 27.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Capa 3: las restricciones de navegador erosionan el resto
          </h2>

          <p>
            La{" "}
            <Link
              href="/es/glossary/intelligent-tracking-prevention"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              Intelligent Tracking Prevention
            </Link>{" "}
            de Safari (<a href="https://webkit.org/tracking-prevention/" target="_blank" rel="noopener noreferrer">ITP</a>) limita las cookies de terceros a 7 días y las cookies
            first-party del lado cliente a 24 horas en muchos escenarios. La
            Enhanced Tracking Protection (ETP) de Firefox aplica restricciones
            similares. Estos navegadores juntos representan aproximadamente el
            35% del tráfico web UE.
          </p>

          <p>
            El efecto es sutil pero significativo: los visitantes recurrentes
            aparecen como nuevos porque su identificador expiró. Las sesiones se
            fragmentan. Las cadenas de atribución se rompen. Un cliente que visitó
            tu sitio cinco veces en dos semanas parece cinco personas distintas en
            GA4.
          </p>

          <p>
            Esto no elimina visitantes de tu cuenta del todo, pero distorsiona los
            datos de sesión, infla las métricas de nuevo usuario y destruye la
            atribución multi-sesión. Combinado con los visitantes ya perdidos por
            consentimiento y ad blockers, el dato preciso restante baja de 27 a
            aproximadamente 13 de cada 100 visitantes reales.
          </p>

          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px] my-8">
            <p className="text-[0.85rem] font-medium text-text-primary mb-4 uppercase tracking-[0.06em]">
              La cascada
            </p>
            <div className="space-y-3 font-mono text-[0.9rem]">
              <div className="flex justify-between">
                <span className="text-text-secondary">Visitantes reales</span>
                <span className="text-text-primary font-medium">100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Tras rechazo de consentimiento (&#8722;55%)</span>
                <span className="text-text-primary font-medium">45</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Con atribución correcta en página 1</span>
                <span className="text-text-primary font-medium">~16</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Tras ad blockers (&#8722;40%)</span>
                <span className="text-text-primary font-medium">27</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Tras restricciones de navegador</span>
                <span className="text-red-alert font-medium">~13 precisos</span>
              </div>
            </div>
            <p className="text-[0.8rem] text-text-tertiary mt-4">
              Cifras aproximadas basadas en medias UE. Las tasas reales varían por
              mercado, audiencia y diseño del banner.
            </p>
          </div>

          <CommercialModule
            locale="es"
            hook="¿Cuál de las tres capas se está comiendo tu tráfico? En una demo pones tus informes de GA4 al lado de una medición que no depende del consentimiento y ves el hueco exacto."
          />

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Por qué esto no se resuelve dentro de GA4
          </h2>

          <p>
            La respuesta de Google a la pérdida por consentimiento es{" "}
            <a href="https://support.google.com/analytics/answer/9976101" target="_blank" rel="noopener noreferrer">Consent Mode v2</a>. Cuando un visitante rechaza, Consent Mode envía
            &ldquo;cookieless pings&rdquo; a Google, que entonces usa machine
            learning para modelar el dato faltante y rellenar los huecos.
          </p>

          <p>
            Suena prometedor hasta que examinas qué produce realmente. Consent
            Mode no mide a los visitantes que rechazaron. Estima qué probablemente
            hicieron basándose en el comportamiento de quienes aceptaron. Los
            números resultantes son data modelada, no medición.
          </p>

          <p>
            La data modelada es aceptable para tendencias de alto nivel. No lo es
            para atribución a nivel de campaña, análisis de conversion path ni
            decisiones de revenue. Cuando Google te dice que las
            &ldquo;conversiones estimadas&rdquo; de una campaña son 47, ese
            número es una proyección estadística, no un conteo de eventos reales.
          </p>

          <p>
            Y Consent Mode no hace nada contra ad blockers ni contra restricciones
            de navegador. Si gtag.js nunca carga, no se envía ping&mdash; modelado
            ni de otro tipo.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Cómo se ve el dato completo
          </h2>

          <p>
            La alternativa es analítica que no depende de cookies, no carga
            scripts cliente que puedan ser bloqueados y está diseñada para no requerir
            consentimiento en la medición básica (lo confirma tu DPO).
          </p>

          <p>
            Sealmetrics usa un enfoque{" "}
            <Link
              href="/es/glossary/cookieless-analytics"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              cookieless
            </Link>
            , server-side. Un script first-party ligero (menos de 1 KB) recoge
            eventos a través de tu propio dominio. No se setean cookies. No se
            hacen peticiones de terceros. Como el método de recolección no entra
            en los requisitos de consentimiento de cookies, no pierde visitas por
            el consentimiento&mdash; la mayor de las capas que se comen el 87% en GA4.
          </p>

          <p>
            Puedes{" "}
            <Link
              href="/es/how-it-works"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              ver cómo funciona la arquitectura
            </Link>{" "}
            o{" "}
            <Link
              href="/es/data-loss-calculator"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              calcular tu propia pérdida de datos
            </Link>{" "}
            según tu mercado y tasas de consentimiento.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            ¿Es esto exclusivo de GA4?
          </h2>

          <p>
            Para ser justos: no. Cualquier herramienta de analítica con cookies&mdash;
            Adobe Analytics, Piwik PRO en su configuración por defecto, Matomo
            con cookies activadas&mdash; afronta el mismo problema de tres capas.
            GA4 no es excepcionalmente malo. Es la herramienta más usada que
            evidencia una limitación estructural compartida por toda la categoría.
          </p>

          <p>
            La{" "}
            <Link
              href="/es/vs-ga4"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              comparativa detallada entre Sealmetrics y GA4
            </Link>{" "}
            cubre precio, propiedad del dato y compliance además de
            completitud. La cifra del 13% es el punto de partida, pero no es
            la única diferencia.
          </p>
        </div>

        <CommercialModule
          locale="es"
          hook="¿Tu GA4 también ve solo un ~13% del tráfico UE con precisión de campaña? Compara en una demo tus números con una medición sin pérdida por consentimiento, sin banner y sin muestreo."
        />

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
            <Link
              href="/es/blog/cookieless-analytics-explained"
              className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
            >
              Analítica cookieless explicada: cómo medir sin cookies
            </Link>
          </div>
        </div>
      </div>
    </article>
    </>
  );
}
