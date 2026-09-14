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
  title: "Analítica conforme con RGPD sin banners de consentimiento",
  description:
    "Hacer analítica sin banners es legalmente posible bajo RGPD y ePrivacy. Aprende la base jurídica, los criterios de la CNIL y los requisitos técnicos.",
  openGraph: {
    title: "Analítica conforme con RGPD sin banners de consentimiento",
    description:
      "Bajo condiciones específicas, RGPD y ePrivacy permiten analítica sin consentimiento. Aquí está cómo.",
    type: "article",
    url: "https://sealmetrics.com/es/blog/gdpr-analytics-without-consent/",
    siteName: "Sealmetrics",
    locale: "es_ES",
    images: ["https://sealmetrics.com/og/blog/gdpr-analytics-without-consent.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Analítica conforme con RGPD sin banners de consentimiento",
    description: "Bajo condiciones específicas, RGPD y ePrivacy permiten analítica sin consentimiento. Aquí está cómo.",
    images: ["https://sealmetrics.com/og/blog/gdpr-analytics-without-consent.png"],
  },
  alternates: {
    languages: getAlternates("/blog/gdpr-analytics-without-consent"),
    canonical: "https://sealmetrics.com/es/blog/gdpr-analytics-without-consent/",
  },
};

export default function GDPRAnalyticsWithoutConsentPageEs() {
  const dates = postDates("gdpr-analytics-without-consent", "es");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/es/blog" }, { label: "Analítica RGPD sin consentimiento" }]} locale="es" />
      <JsonLd data={articleSchema({ headline: "Analítica conforme con RGPD sin banners de consentimiento: cómo funciona", description: "La analítica sin banners de consentimiento es legalmente posible bajo RGPD y ePrivacy.", ...dates, url: "/es/blog/gdpr-analytics-without-consent", category: "Regulación", author: { name: "Rafa Jiménez", url: "/es/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" } })} />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/es/blog" }, { name: "Analítica RGPD sin consentimiento", url: "/es/blog/gdpr-analytics-without-consent" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
            Regulación
          </span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
            Analítica conforme con RGPD sin banners de consentimiento: cómo funciona
          </h1>
          <PostByline
              {...dates}
              readTime="7 min de lectura"
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
            <li>La analítica sin consentimiento es legalmente posible tanto bajo RGPD (Art. 6(1)(f) interés legítimo) como bajo ePrivacy (el Art. 5(3) no aplica si no se almacena nada en el dispositivo del usuario).</li>
            <li>La CNIL ha publicado criterios específicos para analítica exenta de consentimiento: solo output estadístico anónimo, sin cross-site tracking, sin uso publicitario y, como mínimo, anonimización de IP.</li>
            <li>Hay que cumplir seis requisitos técnicos: sin cookies, sin localStorage, sin fingerprinting, sin datos personales, solo first-party y residencia de dato en UE — cualquier fallo invalida el enfoque.</li>
            <li>El Digital Omnibus de la UE crearía un marco armonizado a nivel UE autorizando explícitamente la analítica first-party sin consentimiento, reemplazando el patchwork actual de interpretaciones por DPA nacional.</li>
            <li>Sealmetrics se construyó desde cero para operar sin consentimiento — sin cookies, sin PII, infraestructura solo UE — cumpliendo simultáneamente los requisitos de CNIL, ePrivacy y RGPD.</li>
          </ul>
        </div>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <p>
            La idea de que la analítica web siempre requiere un banner de
            consentimiento está extendida&mdash; y es errónea. Bajo condiciones
            específicas, tanto el{" "}
            <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj" target="_blank" rel="noopener noreferrer">RGPD</a>{" "}
            como la{" "}
            <a href="https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX%3A32002L0058" target="_blank" rel="noopener noreferrer">directiva ePrivacy</a>{" "}
            permiten medición de audiencia sin pedir consentimiento. No es un
            atajo. Es una excepción deliberada que los reguladores europeos han
            clarificado repetidamente desde 2020.
          </p>

          <p>
            Entender cómo funciona requiere separar dos marcos legales distintos
            que a menudo se mezclan: RGPD (que regula el tratamiento de datos
            personales) y la directiva ePrivacy (que regula el acceso a los
            dispositivos de los usuarios).
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            La base jurídica para analítica sin consentimiento
          </h2>

          <p>
            El{" "}
            <Link
              href="/es/glossary/gdpr-analytics-compliance"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              cumplimiento RGPD en analítica
            </Link>{" "}
            se discute habitualmente en términos de consentimiento (Art.
            6(1)(a)). Pero el RGPD ofrece seis bases jurídicas para tratar datos,
            y el consentimiento es solo una. El Art. 6(1)(f)&mdash; interés
            legítimo&mdash; permite el tratamiento cuando el responsable tiene un
            propósito legítimo que no se sobrepone a los derechos y libertades
            del interesado.
          </p>

          <p>
            Para la analítica, el argumento de interés legítimo es directo:
            entender cómo los visitantes usan una web es una función de negocio
            necesaria. Las DPAs europeas en general aceptan este razonamiento,
            siempre que la herramienta no recoja datos personales ni cree
            perfiles individuales.
          </p>

          <p>
            Sin embargo, el RGPD por sí solo no determina si se requiere
            consentimiento. La directiva ePrivacy (a menudo llamada
            &ldquo;ley de cookies&rdquo;) añade una capa de regulación
            específica sobre acceso o almacenamiento de información en
            dispositivos.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Qué dice realmente la directiva ePrivacy
          </h2>

          <p>
            El Art. 5(3) de la directiva ePrivacy dice que almacenar o acceder
            a información en el dispositivo del usuario requiere consentimiento
            previo. Por eso existen los banners de cookies&mdash; las cookies
            son información almacenada en el dispositivo, así que colocarlas
            requiere consentimiento independientemente de si los datos
            recogidos son personales.
          </p>

          <p>
            La distinción crítica es esta: el Art. 5(3) aplica a
            <em> almacenamiento en y acceso al dispositivo del usuario</em>.
            Si una herramienta no coloca cookies, no usa localStorage, no usa
            fingerprinting y no accede a información del dispositivo, el Art.
            5(3) no se dispara. Sin almacenamiento, sin acceso, sin requisito
            de consentimiento.
          </p>

          <p>
            Esta es la base arquitectónica de la analítica sin consentimiento.
            No se trata de encontrar una exención al requisito. Se trata de
            construir la analítica de forma que el requisito nunca llegue a
            aplicar.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Criterios de exención de la CNIL para medición de audiencia
          </h2>

          <p>
            La autoridad francesa de protección de datos (<a href="https://www.cnil.fr/en/cookies-and-other-tracking-devices-cnil-publishes-new-guidelines" target="_blank" rel="noopener noreferrer">CNIL</a>) ha ido más
            lejos que cualquier otro regulador UE definiendo exactamente qué
            puede hacer una herramienta de analítica sin consentimiento. En su
            guía sobre exenciones para medición de audiencia, la CNIL publicó
            criterios específicos que una herramienta debe cumplir.
          </p>

          <p>
            Los criterios clave incluyen:
          </p>

          <ul className="space-y-2 pl-0 list-none">
            <li className="flex items-start gap-3 text-[0.95rem]">
              <span className="text-text-tertiary shrink-0">&mdash;</span>
              La herramienta debe usarse exclusivamente para producir datos estadísticos anónimos
            </li>
            <li className="flex items-start gap-3 text-[0.95rem]">
              <span className="text-text-tertiary shrink-0">&mdash;</span>
              El dato debe limitarse a lo estrictamente necesario para medir audiencia
            </li>
            <li className="flex items-start gap-3 text-[0.95rem]">
              <span className="text-text-tertiary shrink-0">&mdash;</span>
              El dato no debe combinarse con otras operaciones de tratamiento ni compartirse con terceros
            </li>
            <li className="flex items-start gap-3 text-[0.95rem]">
              <span className="text-text-tertiary shrink-0">&mdash;</span>
              Cualquier identificador de visitante debe limitarse a un único sitio o app y no usarse para tracking entre sitios
            </li>
            <li className="flex items-start gap-3 text-[0.95rem]">
              <span className="text-text-tertiary shrink-0">&mdash;</span>
              Las direcciones IP deben anonimizarse o no almacenarse más allá de lo necesario para geolocalización a nivel de ciudad
            </li>
            <li className="flex items-start gap-3 text-[0.95rem]">
              <span className="text-text-tertiary shrink-0">&mdash;</span>
              Los usuarios deben ser informados sobre el tracking y se les debe ofrecer un mecanismo para optar por no participar
            </li>
          </ul>

          <p>
            La CNIL ha publicado un proceso de autoevaluación que los proveedores
            de analítica pueden usar para verificar el cumplimiento de estos
            criterios.{" "}
            <Link
              href="/blog/cnil-self-assessment-published"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              Cubrimos los detalles cuando se publicó el proceso
            </Link>{" "}
            (en inglés). Aunque la guía CNIL es específica de Francia, se ha convertido en
            el benchmark de facto en la UE&mdash; otras DPA la referencian, y el
            Comité Europeo de Protección de Datos (EDPB) ha indicado alineación
            con sus principios.
          </p>

          <CommercialModule
            locale="es"
            hook="¿Tu analítica actual superaría los criterios de exención de la CNIL? En una demo repasamos requisito a requisito cómo los cumple Sealmetrics midiendo tu propio tráfico."
          />

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Requisitos técnicos para analítica sin consentimiento
          </h2>

          <p>
            Cumplir los criterios legales requiere decisiones técnicas
            específicas. Una plataforma analítica que opere sin consentimiento
            debe cumplir todo lo siguiente:
          </p>

          <ul className="space-y-2 pl-0 list-none">
            <li className="flex items-start gap-3 text-[0.95rem]">
              <span className="text-text-tertiary shrink-0">&mdash;</span>
              <strong className="font-semibold text-text-primary">Sin cookies</strong> &mdash; ni first-party ni third-party de ningún tipo
            </li>
            <li className="flex items-start gap-3 text-[0.95rem]">
              <span className="text-text-tertiary shrink-0">&mdash;</span>
              <strong className="font-semibold text-text-primary">Sin localStorage ni sessionStorage</strong> &mdash; sin persistencia de dato cliente
            </li>
            <li className="flex items-start gap-3 text-[0.95rem]">
              <span className="text-text-tertiary shrink-0">&mdash;</span>
              <strong className="font-semibold text-text-primary">Sin fingerprinting</strong> &mdash; sin combinar características de dispositivo (resolución, fuentes, plugins) para crear un identificador único
            </li>
            <li className="flex items-start gap-3 text-[0.95rem]">
              <span className="text-text-tertiary shrink-0">&mdash;</span>
              <strong className="font-semibold text-text-primary">Sin datos personales</strong> &mdash; sin almacenar IPs, sin perfiles a nivel de usuario
            </li>
            <li className="flex items-start gap-3 text-[0.95rem]">
              <span className="text-text-tertiary shrink-0">&mdash;</span>
              <strong className="font-semibold text-text-primary">Solo first-party</strong> &mdash; dato recogido por el dueño del sitio, sin compartir con plataformas de terceros
            </li>
            <li className="flex items-start gap-3 text-[0.95rem]">
              <span className="text-text-tertiary shrink-0">&mdash;</span>
              <strong className="font-semibold text-text-primary">Residencia UE</strong> &mdash; todo el procesamiento y almacenamiento dentro de la Unión Europea
            </li>
          </ul>

          <p>
            La combinación de estos requisitos es lo que hace técnicamente
            difícil la analítica sin consentimiento. Cualquier fallo&mdash; una
            cookie puesta por un tag manager, una técnica de fingerprinting para
            stitching de sesiones, una IP loggeada para prevención de
            fraude&mdash; invalida todo el enfoque.{" "}
            <Link
              href="/es/glossary/cookieless-analytics"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              La analítica cookieless
            </Link>{" "}
            debe ser cookieless por arquitectura, no por configuración.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            ¿Y el EU Digital Omnibus?
          </h2>

          <p>
            La directiva propuesta del Digital Omnibus UE reforzaría
            significativamente la base legal de la analítica sin consentimiento.
            El borrador del reglamento autoriza explícitamente la analítica
            first-party sin consentimiento bajo RGPD, siempre que se limite a
            medición de audiencia y no implique cross-site tracking.
          </p>

          <p>
            Si se adopta tal como está propuesto, el Omnibus crearía un marco
            armonizado a nivel UE reemplazando el patchwork actual de
            interpretaciones por DPA nacional. Las herramientas que cumplan los
            criterios técnicos de arriba tendrían autorización legal explícita
            en lugar de depender del argumento de interés legítimo y la guía de
            exención estilo CNIL.
          </p>

          <p>
            <Link
              href="/blog/eu-digital-omnibus-marketer-guide-2026"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              Nuestra guía detallada cubre lo que el Omnibus implica para
              equipos de marketing
            </Link>{" "}
            (en inglés). La idea clave: la dirección regulatoria en Europa va hacia
            permitir explícitamente la analítica respetuosa con la privacidad,
            no hacia restringirla más.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Cómo logra Sealmetrics el cumplimiento sin consentimiento
          </h2>

          <p>
            Sealmetrics se construyó desde cero para operar sin consentimiento.
            No es una feature añadida a una plataforma con cookies&mdash; es la
            base arquitectónica.
          </p>

          <p>
            El enfoque usa{" "}
            <Link
              href="/es/how-it-works"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              tracking cookieless first-party
            </Link>{" "}
            a través de un subdominio first-party (ej. analytics.tudominio.com).
            Cuando un visitante carga una página, la petición se procesa sin
            poner cookies, sin acceder a localStorage y sin fingerprinting del
            navegador. El reconocimiento de sesión usa señales efímeras que no
            persisten en el dispositivo del usuario.
          </p>

          <p>
            Toda la data se procesa y almacena en infraestructura UE. No se
            recogen datos personales. No se crean perfiles individuales. El
            output es medición de audiencia agregada&mdash; pageviews, sesiones,
            fuentes, eventos de conversión&mdash; sin perder tráfico
            porque no existe la barrera del consentimiento.
          </p>

          <p>
            Esta arquitectura cumple simultáneamente los criterios de exención
            CNIL, los requisitos del Art. 5(3) ePrivacy y la base de interés
            legítimo del RGPD. Sealmetrics ha completado el proceso de
            autoevaluación CNIL y mantiene documentación de cumplimiento para
            todos los Estados miembro UE.
          </p>

          <p>
            El resultado: analítica enterprise sin huecos de consentimiento en los
            datos, cero complejidad de{" "}
            <Link
              href="/es/glossary/consent-management-platform"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              gestión de consentimiento
            </Link>{" "}
            y compliance regulatorio total. Puedes{" "}
            <Link
              href="/es/security"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              revisar la arquitectura completa de seguridad y compliance
            </Link>{" "}
            o{" "}
            <Link
              href="/es/how-it-works"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              ver cómo funciona la tecnología
            </Link>
            .
          </p>
        </div>

        <CommercialModule
          locale="es"
          hook="¿Cuánto dato recuperarías midiendo sin banner? Entre el 40% y el 60% de tus visitantes rechaza el consentimiento — ve en una demo tus informes sin esa pérdida por consentimiento."
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
