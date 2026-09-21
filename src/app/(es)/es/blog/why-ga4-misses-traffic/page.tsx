import type { Metadata } from "next";
import { postDates } from "@/lib/content/blog";
import { PostByline } from "@/components/ui/PostByline";
import { getAlternates } from "@/lib/i18n/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { CommercialModule } from "@/components/ui/CommercialModule";

const TITLE = "Por qué GA4 no ve parte de tu tráfico";

export const metadata: Metadata = {
  title: TITLE,
  description:
    "El rechazo de cookies, los bloqueadores y el navegador esconden a GA4 parte de tu tráfico. Cuánto depende de la tienda: en Incapto, el 29% de las visitas.",
  openGraph: {
    title: TITLE,
    description:
      "Consentimiento, bloqueadores y navegador esconden a GA4 parte de tu tráfico. El tamaño del hueco es de cada tienda: en Incapto, el 29% de las visitas.",
    type: "article",
    url: "https://sealmetrics.com/es/blog/why-ga4-misses-traffic/",
    siteName: "Sealmetrics",
    locale: "es_ES",
    images: ["https://sealmetrics.com/og/blog/why-ga4-misses-traffic.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: TITLE,
    description: "Consentimiento, bloqueadores y navegador esconden a GA4 parte de tu tráfico. El tamaño del hueco es de cada tienda: en Incapto, el 29% de las visitas.",
    images: ["https://sealmetrics.com/og/blog/why-ga4-misses-traffic.png"],
  },
  alternates: {
    languages: getAlternates("/blog/why-ga4-misses-traffic"),
    canonical: "https://sealmetrics.com/es/blog/why-ga4-misses-traffic/",
  },
};

const link = "text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors";

export default function WhyGA4MissesTrafficPageEs() {
  const dates = postDates("why-ga4-misses-traffic", "es");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/es/blog" }, { label: TITLE }]} locale="es" />
      <JsonLd data={articleSchema({ headline: TITLE, description: "El rechazo de cookies, los bloqueadores y las restricciones del navegador esconden a GA4 parte de tu tráfico. Cuánto depende de la tienda y del canal; un caso medido enseña la forma del hueco.", ...dates, url: "/es/blog/why-ga4-misses-traffic", category: "Calidad del dato", author: { name: "Rafa Jiménez", url: "/es/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" } })} />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/es/blog" }, { name: TITLE, url: "/es/blog/why-ga4-misses-traffic" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
            Calidad del dato
          </span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
            {TITLE}
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
            <li>GA4 no ve parte de tu tráfico: el rechazo de cookies, los bloqueadores y las restricciones del navegador se llevan cada uno una parte, y el muestreo degrada lo que queda. Cuánto, depende de la tienda y del canal.</li>
            <li>En nuestra experiencia con clientes, entre el 40% y el 60% del tráfico no acepta cookies, y de quienes las aceptan, el 40% no lo hace en la primera página vista, que es donde se registra la fuente del tráfico.</li>
            <li>En Incapto (Shopify, con Consent Mode, 48 días), GA4 no registró el 29% de las visitas ni el 45% de las páginas vistas. El tráfico extra que vio Sealmetrics fue del +11% en directo al +133% en social orgánico.</li>
            <li>Google Consent Mode v2 modela el dato que falta, pero no puede recuperar lo que nunca se recogió: estima, no mide.</li>
            <li>No hay un porcentaje universal. El único número que importa es el tuyo, medido en paralelo con GA4.</li>
          </ul>
        </div>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <p>
            Abre GA4 y mira las sesiones de ayer. El número que ves no está
            mal, exactamente. Son datos reales de visitantes reales. El
            problema es lo que se queda fuera, y que el informe no te da
            ninguna forma de saber cuánto es.
          </p>

          <p>
            No es un bug. No es un error de configuración. Es la consecuencia
            estructural de cómo funciona la analítica con cookies en la Unión
            Europea en 2026. El argumento completo, por qué un dato incompleto
            lleva a decisiones equivocadas y qué cambia con{" "}
            <Link href="/es/complete-data" className={link}>datos completos</Link>,
            está en el pilar; este artículo explica el mecanismo que hay debajo.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Tres formas en que GA4 pierde de vista una visita
          </h2>

          <p>
            GA4 no pierde tus datos en un solo punto. Los pierde en tres capas
            sucesivas, y cada una actúa sobre lo que dejó la anterior. A esa
            erosión acumulada se le llama{" "}
            <Link href="/es/glossary/data-loss-in-analytics" className={link}>
              pérdida de datos en analítica
            </Link>
            . Lo que sigue es cómo funciona cada capa. Qué tamaño tiene cada una
            en tu web es otra pregunta, y la respuesta honesta es que hay que
            medirlo, no buscarlo en una tabla.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Capa 1: los visitantes que dicen que no
          </h2>

          <p>
            Con el{" "}
            <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj" target="_blank" rel="noopener noreferrer">RGPD y la directiva ePrivacy</a>, cualquier web que use cookies
            de analítica tiene que pedir consentimiento antes de disparar el
            tracking. En nuestra experiencia con clientes, entre el 40% y el 60%
            del tráfico no acepta cookies. Dónde cae cada web dentro de ese
            rango depende del sector, de la fuerza de la marca, del mix de
            tráfico y del diseño del banner.
          </p>

          <p>
            Cuando un visitante pulsa &ldquo;Rechazar&rdquo; en el banner, GA4
            no llega a cargar. Ese visitante no existe en tu analítica: ni página
            vista, ni sesión, ni evento. Es invisible.
          </p>

          <p>
            El problema de fondo es que el{" "}
            <Link href="/es/blog/consent-banner-impact-on-analytics" className={link}>
              rechazo del consentimiento no es aleatorio
            </Link>
            . Quienes rechazan no son una muestra representativa de quienes
            visitan, así que perderlos no solo encoge tus datos. Los tuerce.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            La capa oculta: cookies que llegan tarde
          </h2>

          <p>
            Aceptar no cierra el problema. En nuestra experiencia con clientes,
            de quienes aceptan las cookies, el 40% no lo hace en la primera
            página vista: navega primero y pulsa el banner después.
          </p>

          <p>
            ¿Por qué importa? Porque la página de entrada es donde se registra
            la fuente del tráfico. El referrer, los parámetros UTM, los datos de
            campaña&nbsp;&mdash; todo se captura en la primera página vista. Si
            en esa página las cookies no están activas, GA4 ve el resto de la
            visita pero nunca sabe de dónde vino. La sesión acaba en directo, en
            «sin asignar» o en ningún sitio útil.
          </p>

          <p>
            Así que ni siquiera las visitas que GA4 sí cuenta están todas
            atribuidas. Parte de lo que parece tráfico medido es tráfico sin un
            origen con el que puedas decidir nada.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Capa 2: los bloqueadores paran la etiqueta
          </h2>

          <p>
            Una parte de quienes aceptaron las cookies navega con extensiones
            que bloquean los scripts de analítica. uBlock Origin, AdBlock Plus,
            los escudos integrados de Brave y decenas de herramientas parecidas
            apuntan a gtag.js y al endpoint de recogida de Google Analytics.
          </p>

          <p>
            A diferencia del rechazo del consentimiento, el bloqueo es
            silencioso. El visitante aceptó tu banner, está navegando, incluso
            puede estar comprando, pero GA4 nunca se dispara porque el script se
            bloqueó antes de cargar.
          </p>

          <p>
            Cuántos de tus visitantes bloquean depende de quiénes son: la
            proporción es mayor en escritorio que en móvil, y mayor en audiencias
            técnicas (software, SaaS, herramientas para desarrolladores) que
            entre compradores generalistas.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Capa 3: el navegador erosiona lo que queda
          </h2>

          <p>
            La{" "}
            <Link href="/es/glossary/intelligent-tracking-prevention" className={link}>
              Intelligent Tracking Prevention
            </Link>{" "}
            de Safari (<a href="https://webkit.org/tracking-prevention/" target="_blank" rel="noopener noreferrer">ITP</a>) limita las cookies de terceros a 7 días y las cookies
            first-party del lado cliente a 24 horas en muchos escenarios. La
            Enhanced Tracking Protection (ETP) de Firefox aplica restricciones
            parecidas.
          </p>

          <p>
            El efecto es discreto pero serio: los visitantes recurrentes
            aparecen como nuevos porque su identificador caducó. Las sesiones se
            fragmentan. Las cadenas de atribución se rompen. Un cliente que entró
            cinco veces en dos semanas aparece en GA4 como cinco personas
            distintas.
          </p>

          <p>
            Esto no saca visitantes de tu recuento, pero distorsiona los datos
            de sesión, infla la métrica de usuarios nuevos y rompe la atribución
            entre sesiones de los visitantes que las dos primeras capas dejaron
            en pie.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Cómo fue el hueco en una tienda concreta
          </h2>

          <p>
            Un mecanismo no es una cifra. Para ver el tamaño y la forma del
            hueco hay que poner una segunda medición al lado de GA4. Cuando
            Incapto lo hizo en su tienda Shopify, con Consent Mode activo,
            durante 48 días entre el 14 de junio y el 31 de julio de 2026, esto
            es lo que salió.
          </p>

          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px] my-8">
            <p className="text-[0.85rem] font-medium text-text-primary mb-4 uppercase tracking-[0.06em]">
              Incapto: GA4 junto a Sealmetrics
            </p>
            <div className="space-y-3 font-mono text-[0.9rem]">
              <div className="flex justify-between gap-4">
                <span className="text-text-secondary">Visitas que GA4 no registró</span>
                <span className="text-red-alert font-medium">29%</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-text-secondary">Páginas vistas que GA4 no registró</span>
                <span className="text-red-alert font-medium">45%</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-text-secondary">Tráfico extra visto en directo</span>
                <span className="text-text-primary font-medium">+11%</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-text-secondary">Tráfico extra visto en social orgánico</span>
                <span className="text-text-primary font-medium">+133%</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-text-secondary">Pedidos reales que registró Sealmetrics</span>
                <span className="text-text-primary font-medium">95,7%</span>
              </div>
            </div>
            <p className="text-[0.8rem] text-text-tertiary mt-4">
              Una tienda, un periodo. Visitas, páginas vistas y pedidos cubren
              del 14 de junio al 31 de julio de 2026; los datos por canal, del 28
              de julio al 6 de agosto de 2026. Tu hueco será otro: mídelo sobre
              tu propio tráfico.
            </p>
          </div>

          <CommercialModule
            locale="es"
            hook="¿Cuánto de tu tráfico no está viendo GA4? En una demo pones tus informes de GA4 al lado de una medición que no depende del consentimiento y ves tu hueco, no el de otro."
          />

          <p>
            Hay dos cosas que llaman la atención. La primera, que no es el tipo
            de hueco que hace que un informe parezca roto. Lo hace sutilmente
            equivocado, siempre en la misma dirección, y por eso nadie lo nota.
            La segunda, que la pérdida no fue uniforme. Los canales que traen a
            gente que ya conoce la marca apenas se movieron; los que traen gente
            nueva desde un clic externo perdieron mucho más. El{" "}
            <Link href="/es/case-studies/incapto" className={link}>
              caso de Incapto
            </Link>{" "}
            tiene el desglose completo por canal y las salvedades de cada cifra.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Por qué esto no se resuelve dentro de GA4
          </h2>

          <p>
            La respuesta de Google a la pérdida por consentimiento es{" "}
            <a href="https://support.google.com/analytics/answer/9976101" target="_blank" rel="noopener noreferrer">Consent Mode v2</a>. Cuando un visitante rechaza, Consent Mode envía
            &ldquo;cookieless pings&rdquo; a Google, que usa machine learning
            para modelar el dato que falta y rellenar los huecos.
          </p>

          <p>
            Suena bien hasta que miras qué produce. Consent Mode no mide a
            quienes rechazaron: estima qué hicieron probablemente a partir del
            comportamiento de quienes aceptaron. Los números resultantes son
            datos modelados, no medición. Incapto tuvo Consent Mode activo
            durante los 48 días de arriba.
          </p>

          <p>
            Un dato modelado sirve para tendencias generales. No sirve para
            atribuir por campaña, analizar rutas de conversión ni decidir
            inversión. Cuando Google te dice que las &ldquo;conversiones
            estimadas&rdquo; de una campaña son 47, ese número es una proyección
            estadística, no un recuento de eventos reales.
          </p>

          <p>
            Y Consent Mode no hace nada contra los bloqueadores ni contra las
            restricciones del navegador. Si gtag.js no carga, no sale ningún
            ping, ni modelado ni de ningún otro tipo.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Cómo se ve el dato completo
          </h2>

          <p>
            La alternativa es una analítica que no depende de cookies, no carga
            scripts de cliente que puedan bloquearse y cumple los criterios de la
            CNIL y la AEPD para la medición básica exenta de consentimiento.
          </p>

          <p>
            Sealmetrics usa un enfoque{" "}
            <Link href="/es/glossary/cookieless-analytics" className={link}>
              cookieless
            </Link>
            , server-side. Un script ligero (menos de 1 KB), que puede servirse
            desde un subdominio de tu propio dominio, recoge los eventos. No se
            instalan cookies. Como nada se guarda ni se lee en el dispositivo del
            visitante, el requisito de consentimiento no tiene a qué aplicarse, y
            no se pierde ninguna visita por rechazo del banner. Lo completa que
            sea el resto de la cobertura depende de la implementación; por eso
            las cifras de Incapto se cuadran contra los pedidos reales de la
            tienda en lugar de darse por hechas.
          </p>

          <p>
            Puedes{" "}
            <Link href="/es/how-it-works" className={link}>
              ver cómo funciona la arquitectura
            </Link>{" "}
            o{" "}
            <Link href="/es/data-loss-calculator" className={link}>
              estimar tu propia pérdida de datos
            </Link>{" "}
            a partir de tu mercado y tus tasas de consentimiento antes de medirla.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            ¿Le pasa solo a GA4?
          </h2>

          <p>
            Para ser justos: no. Cualquier herramienta de analítica con cookies
            (Adobe Analytics, Piwik PRO en su configuración por defecto, Matomo
            con cookies activadas) tiene el mismo problema de tres capas. GA4 no
            es especialmente malo. Es la herramienta más usada, y por eso la que
            mejor enseña una limitación estructural de toda la categoría.
          </p>

          <p>
            La{" "}
            <Link href="/es/vs-ga4" className={link}>
              comparativa detallada entre Sealmetrics y GA4
            </Link>{" "}
            cubre precio, propiedad del dato y cumplimiento además de
            completitud. La completitud del dato es el punto de partida, pero no
            la única diferencia.
          </p>
        </div>

        <CommercialModule
          locale="es"
          hook="No hay un porcentaje universal, solo el tuyo. Compara en una demo tus informes de GA4 con la medición de Sealmetrics sobre tu propio tráfico."
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
