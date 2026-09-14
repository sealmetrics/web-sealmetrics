import type { Metadata } from "next";
import { postDates } from "@/lib/content/blog";
import { PostByline } from "@/components/ui/PostByline";
import { getAlternates } from "@/lib/i18n/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { FaqSection } from "@/components/ui/FaqSection";
import {
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
  speakableWebPageSchema,
} from "@/lib/schema";
import { CommercialModule } from "@/components/ui/CommercialModule";

const SLUG = "analytics-if-data-privacy-framework-falls";
const URL = `/es/blog/${SLUG}`;
const TITLE =
  "Qué pasa con tu analítica si cae el Marco de Privacidad de Datos UE-EE. UU.";
const DESCRIPTION =
  "El Marco de Privacidad de Datos superó su primer recurso, tiene un recurso de casación pendiente ante el TJUE y otra impugnación anunciada en 2026. Estas son las configuraciones de analítica e IA que habría que volver a documentar de la noche a la mañana y las que nunca dependieron de él.";

export const metadata: Metadata = {
  title: "Tu analítica si cae el Marco de Privacidad UE-EE. UU.",
  description: "El Marco de Privacidad de Datos tiene un recurso pendiente ante el TJUE. Qué configuraciones de analítica e IA habría que rehacer, y cuáles no dependen de él.",
  openGraph: {
    title: "Si cae el Marco de Privacidad de Datos UE-EE. UU.",
    description:
      "La situación jurídica actual del DPF, el precedente de Safe Harbor y Privacy Shield, y qué stacks de analítica son estructuralmente inmunes al resultado.",
    type: "article",
    url: "https://sealmetrics.com/es/blog/analytics-if-data-privacy-framework-falls/",
    siteName: "Sealmetrics",
    locale: "es_ES",
    images: ["https://sealmetrics.com/og/blog/analytics-if-data-privacy-framework-falls.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Si cae el Marco de Privacidad de Datos UE-EE. UU.",
    description: "La situación jurídica actual del DPF, el precedente de Safe Harbor y Privacy Shield, y qué stacks de analítica son estructuralmente inmunes al resultado.",
    images: ["https://sealmetrics.com/og/blog/analytics-if-data-privacy-framework-falls.png"],
  },
  alternates: {
    languages: getAlternates(`/blog/${SLUG}`),
    canonical: `https://sealmetrics.com${URL}`,
  },
};

const FAQ = [
  {
    question: "¿Sigue vigente el Marco de Privacidad de Datos UE-EE. UU. en 2026?",
    answer:
      "Sí, sigue en vigor. El primer recurso de anulación, Latombe contra Comisión (T-553/23), fue desestimado por el Tribunal General de la UE el 3 de septiembre de 2025. El recurso de casación, C-703/25 P, se interpuso el 31 de octubre de 2025 y está pendiente ante el Tribunal de Justicia de la UE. Por otro lado, noyb escribió a la Comisión el 30 de junio de 2026 y anunció una nueva impugnación. El Marco es válido hoy; su futuro es genuinamente incierto.",
  },
  {
    question: "¿Qué es Schrems III y cómo afectaría a la analítica?",
    answer:
      "Schrems III es el nombre informal de la nueva impugnación al Marco de Privacidad de Datos UE-EE. UU. anunciada por noyb en 2026, tras una sentencia del Tribunal Supremo estadounidense de junio sobre la protección frente al cese de los comisionados de la FTC. Si una impugnación llegara a prosperar, toda transferencia UE-EE. UU. apoyada en el Marco necesitaría otra base jurídica. Las herramientas de analítica e IA que transfieren datos personales a proveedores bajo jurisdicción estadounidense se verían afectadas directamente.",
  },
  {
    question: "¿Qué pasa con mi analítica si se anula el Marco de Privacidad de Datos?",
    answer:
      "Cualquier flujo de datos personales hacia un proveedor estadounidense que use el Marco como base del Capítulo V perdería esa base el día de la sentencia. Necesitarías cláusulas contractuales tipo más una evaluación de impacto de las transferencias y medidas complementarias, renegociadas con cada proveedor afectado. Las configuraciones en las que ningún dato personal sale de la UE y el encargado del tratamiento no tiene matriz estadounidense no se ven afectadas, porque el Capítulo V nunca llega a activarse.",
  },
  {
    question: "¿Se han anulado antes acuerdos de transferencia de datos entre la UE y EE. UU.?",
    answer:
      "Dos veces. Safe Harbor se invalidó en 2015 y Privacy Shield en 2020, cada uno después de que una impugnación llegara al Tribunal de Justicia de la UE. El Marco de Privacidad de Datos es el tercer acuerdo de este tipo. Ese historial no predice nada sobre el caso actual, pero explica por qué muchos delegados de protección de datos europeos tratan las arquitecturas dependientes del Marco como un riesgo permanente y no como una certeza cerrada.",
  },
  {
    question: "¿Cómo consigo que mi analítica no dependa de las normas de transferencia UE-EE. UU.?",
    answer:
      "Elimina la transferencia en lugar de documentarla. Si tu analítica no recoge ningún dato personal y el procesamiento con IA se ejecuta en un proveedor constituido en la UE sin matriz estadounidense, el Capítulo V del RGPD no se activa: no hay transferencia internacional que justificar. Eso es una propiedad de la arquitectura, así que no cambia cuando cambia la jurisprudencia.",
  },
];

export default function AnalyticsIfDataPrivacyFrameworkFallsPageEs() {
  const dates = postDates("analytics-if-data-privacy-framework-falls", "es");

  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: TITLE,
          description: DESCRIPTION,
          ...dates,
          url: URL,
          category: "Regulación",
          author: {
            name: "Rafa Jiménez",
            url: "/es/authors/rafa-jimenez",
            jobTitle: "Founder, Sealmetrics",
          },
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Blog", url: "/es/blog" },
          { name: "Si cae el Marco de Privacidad de Datos", url: URL },
        ])}
      />
      <JsonLd data={faqPageSchema(FAQ, URL)} />
      <JsonLd
        data={speakableWebPageSchema({
          url: URL,
          name: TITLE,
          selectors: [".key-takeaways", ".tldr"],
        })}
      />

      <Breadcrumbs
        items={[
          { label: "Blog", href: "/es/blog" },
          { label: "Si cae el Marco de Privacidad de Datos" },
        ]}
        locale="es"
      />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              Regulación
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              Qué pasa con tu analítica si cae el Marco de Privacidad de Datos UE-EE. UU.
            </h1>
            <PostByline
              {...dates}
              readTime="6 min de lectura"
              authorName="Rafa Jiménez"
              authorUrl="/es/authors/rafa-jimenez"
              locale="es"
            />
          </header>

          <p className="tldr mb-12 text-[1.15rem] leading-[1.7] text-text-secondary font-serif italic">
            Nadie sabe cómo acabarán las impugnaciones pendientes contra el Marco
            de Privacidad de Datos UE-EE. UU. Ese es justamente el problema: si la
            respuesta de tu stack de analítica depende de una sentencia, estás
            asumiendo un riesgo que no puedes valorar. Hay arquitecturas que no
            tienen ninguna opinión sobre el desenlace.
          </p>

          <div className="key-takeaways mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">
              Conclusiones clave
            </h2>
            <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li>
                El Marco es válido hoy. Latombe contra Comisión se desestimó el 3
                de septiembre de 2025; hay un recurso de casación (C-703/25 P)
                pendiente ante el TJUE y en 2026 se anunció una nueva
                impugnación.
              </li>
              <li>
                Sus dos predecesores, Safe Harbor y Privacy Shield, fueron
                anulados, y por eso dar por permanente el Marco actual es una
                apuesta más que un plan.
              </li>
              <li>
                Si cayera, toda transferencia que dependa de él necesitaría una
                nueva base del Capítulo V de golpe: cláusulas contractuales tipo,
                evaluación de impacto de las transferencias y medidas
                complementarias, proveedor a proveedor.
              </li>
              <li>
                Una arquitectura en la que ningún dato personal sale de la UE y
                el encargado del tratamiento no tiene matriz estadounidense nunca
                activa el Capítulo V, así que le da igual cómo termine el litigio.
              </li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              Pregúntale a un equipo de marketing europeo qué base jurídica
              sostiene su stack de analítica y casi siempre te hablará del
              consentimiento. Pregúntale qué sostiene el flujo de esos datos
              hacia un proveedor de capital estadounidense y la sala se queda en
              silencio. En la mayoría de los casos la respuesta es el Marco de
              Privacidad de Datos UE-EE. UU., una decisión de adecuación de la
              Comisión sobre la que se apoya, discretamente, muchísimo
              herramental.
            </p>
            <p>
              Conviene saber exactamente cómo de firme es ese suelo y qué pasa la
              mañana en que deje de serlo.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              En qué punto está realmente el Marco
            </h2>
            <p>
              Tres cosas son ciertas a la vez, y confundirlas es donde se
              equivoca casi todo el análisis que se publica.
            </p>
            <p>
              <strong>Está en vigor.</strong> El primer recurso de anulación,{" "}
              <em>Latombe contra Comisión</em> (T-553/23), fue{" "}
              <strong>desestimado</strong> por el Tribunal General de la UE el 3
              de septiembre de 2025. El Marco sobrevivió. Quien te diga que ya ha
              sido invalidado se equivoca.
            </p>
            <p>
              <strong>Está recurrido.</strong> El recurso de casación contra esa
              desestimación, asunto <strong>C-703/25 P</strong>, se interpuso el
              31 de octubre de 2025 y está pendiente ante el Tribunal de Justicia
              de la UE. Este tipo de recursos llevan tiempo y el resultado se
              desconoce.
            </p>
            <p>
              <strong>En 2026 se abrió un segundo frente.</strong> Tras una
              sentencia del Tribunal Supremo estadounidense de junio de 2026
              sobre la protección frente al cese de los comisionados de la FTC —
              una sentencia que toca la independencia de los órganos de
              supervisión de EE. UU. —, noyb escribió a la Comisión Europea el 30
              de junio de 2026 y anunció una nueva impugnación, bautizada
              popularmente como &quot;Schrems III&quot;.
            </p>
            <p>
              Nada de esto te dice cómo acabará ninguno de los dos frentes. El
              resultado de un litigio no es previsible y no vamos a fingir lo
              contrario. Lo que sí te dice es que el Marco es una cuestión
              jurídica abierta y no cerrada, y que un plan que necesita que
              sobreviva es un plan con una dependencia sin valorar.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Por qué importa el historial
            </h2>
            <p>
              El Marco de Privacidad de Datos es el tercer acuerdo de su especie.
              Primero llegó Safe Harbor y fue anulado. Privacy Shield lo sustituyó
              y también fue anulado. El Marco sustituyó a este último.
            </p>
            <p>
              Dos invalidaciones no hacen inevitable una tercera: el Marco se
              negoció precisamente para corregir las deficiencias que el Tribunal
              había identificado, y ya ha ganado una vez en los tribunales. Pero
              el patrón explica por qué los delegados de protección de datos con
              experiencia tratan las arquitecturas dependientes de transferencias
              como un riesgo permanente. Cada caída anterior produjo la misma
              carrera contrarreloj: contratos reabiertos, evaluaciones rehechas y
              algún proveedor abandonado en silencio.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Qué implicaría de verdad rehacer la documentación
            </h2>
            <p>
              Si el Marco se invalidara, la decisión de adecuación dejaría de ser
              base lícita para las transferencias que se apoyan en ella. Los
              datos personales que fluyen hacia los proveedores estadounidenses
              afectados necesitarían otra vía del Capítulo V, lo que en la
              práctica significa cláusulas contractuales tipo más evaluación de
              impacto de las transferencias más medidas complementarias,
              evaluadas por proveedor, por categoría de datos y por finalidad del
              tratamiento.
            </p>
            <p>
              Para un stack de marketing de tamaño medio eso no es un documento.
              Es un proyecto. Analítica, gestor de etiquetas, tests A/B, CDP,
              email, plataformas publicitarias, grabación de sesiones y ahora las
              funciones de IA acopladas a varias de ellas. Cada una con su
              papeleo, su cadena de subencargados y su gestor de cuenta al que
              perseguir.
            </p>
            <p>
              Y una evaluación de impacto de las transferencias no es un
              trámite. Te obliga a valorar si la legislación del país de destino
              permite el acceso de las autoridades públicas de un modo que
              socava las garantías: exactamente la pregunta que el Tribunal ya ha
              respondido de forma desfavorable dos veces respecto a la
              legislación de vigilancia estadounidense. Por eso las rondas
              anteriores fueron tan dolorosas.
            </p>

            <CommercialModule
              locale="es"
              hook="¿Tu medición depende de que el Marco de Privacidad de Datos sobreviva a la próxima sentencia? Ve en una demo cómo sería medir sin transferencias a EE. UU. que defender: dato anónimo, agregado y procesado en la UE."
            />

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Qué configuraciones son estructuralmente inmunes
            </h2>
            <p>
              Esta es la parte que conviene interiorizar. El Capítulo V del RGPD
              regula las transferencias de datos personales a terceros países. Se
              activa cuando se cumplen dos condiciones: hay datos personales y
              van a algún sitio fuera de la UE o a una parte sometida a
              jurisdicción extranjera.
            </p>
            <p>
              Rompe cualquiera de las dos y el capítulo no llega a aplicarse. No
              &quot;se aplica pero se cumple&quot;: no se aplica.
            </p>
            <p>
              La primera forma de romperlo es no recoger datos personales. Una
              analítica que nunca recoge IPs, cookies, huellas de dispositivo ni
              identificadores de visitante no tiene datos personales que
              transferir. La segunda es mantener el tratamiento en un encargado
              constituido en la UE que no tenga matriz estadounidense, de modo
              que ningún régimen extraterritorial lo alcance.
            </p>
            <p>
              Haz las dos cosas y el litigio se convierte en un deporte de
              espectador. Ese es el diseño detrás de{" "}
              <Link
                href="https://docs.sealmetrics.com/lens/seal-ai/private-ai-architecture"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                Seal AI
              </Link>
              : la inferencia se ejecuta en Scaleway Generative APIs, solo en
              París. Scaleway es una empresa francesa cuya matriz es el grupo
              Iliad, sin capital estadounidense, y declara explícitamente que sus
              servicios de IA no están sujetos a leyes extraterritoriales como la
              CLOUD Act estadounidense. Aparece en nuestra lista de
              subencargados como un simple encargado del tratamiento del artículo
              28: Scaleway SAS, París, Francia, finalidad inferencia LLM,
              retención cero. En esa cadena no hay cláusulas contractuales tipo
              porque no hay nada que cubrir con ellas.
            </p>
            <p>
              La trampa asociada es dar por hecho que una región europea lo
              resuelve. No lo hace: la CLOUD Act sigue a la matriz corporativa,
              no al centro de datos, que es la distinción que desmenuzamos en{" "}
              <Link
                href="/es/blog/residency-is-not-sovereignty"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                Residencia no es soberanía
              </Link>
              .
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Qué revisar en tu stack este trimestre
            </h2>
            <p>
              Es un ejercicio de dos tardes, y merece la pena hacerlo antes de
              cualquier sentencia y no después.
            </p>
            <ol className="space-y-3 pl-6 list-decimal marker:text-text-tertiary">
              <li>
                <strong>
                  Lista todos los proveedores que tocan datos de visitantes
                </strong>
                , incluidas las funciones de IA que aparecieron dentro de
                herramientas que ya tenías. Suelen llegar con un subencargado
                nuevo y sin revisión contractual.
              </li>
              <li>
                <strong>
                  Para cada uno, anota la base del Capítulo V.
                </strong>{" "}
                Adecuación por el Marco de Privacidad de Datos, cláusulas
                contractuales tipo, una excepción para situaciones específicas o
                &quot;ninguna necesaria, no hay transferencia&quot;. Si nadie en la empresa
                sabe cuál es, ese es el hallazgo.
              </li>
              <li>
                <strong>Marca todo lo que caiga en el primer grupo.</strong> Son
                los elementos que exigirían trabajo el día uno de una sentencia
                desfavorable. Ordénalos por cuánto tráfico o cuánta facturación
                dependen de ellos.
              </li>
              <li>
                <strong>Revisa la capa de IA por separado.</strong> Pregunta
                dónde se ejecuta la inferencia, en exclusiva, y de quién es esa
                entidad. Un proveedor puede alojar su aplicación en la UE y estar
                llamando a un modelo en otro sitio.
              </li>
              <li>
                <strong>
                  Pregunta a cada proveedor marcado cuál es su plan.
                </strong>{" "}
                La calidad de esa respuesta ya es información. Algunos tienen una
                vía real de procesamiento en la UE lista; otros tienen un párrafo
                tranquilizador.
              </li>
            </ol>
            <p>
              No se trata de arrancar tu stack de cuajo. Se trata de saber, por
              adelantado, exactamente cuántos elementos tiene la lista, para que
              si llega el día estés ejecutando un plan en lugar de descubriendo
              el alcance.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              En resumen
            </h2>
            <p>
              Es perfectamente posible que el Marco de Privacidad de Datos
              sobreviva a las dos impugnaciones. No tenemos opinión sobre el
              fondo ni bola de cristal. Pero hay una diferencia importante entre
              una posición de cumplimiento que necesita que un tribunal falle en
              un sentido concreto y otra a la que le da igual.
            </p>
            <p>
              La segunda no es mejor abogacía. Es una decisión de arquitectura
              tomada antes: no recojas nada personal, procesa dentro de la UE con
              un encargado al que ninguna ley extranjera pueda alcanzar y no
              habrá transferencia que defender. La jurisprudencia cambia. La
              arquitectura no.
            </p>
          </div>

          <CommercialModule
            locale="es"
            hook="¿Cuánto tendrías que re-documentar si el Marco cae mañana? En una demo ves tu propia medición sobre una arquitectura a la que la sentencia le da igual — sin perder visitas por el consentimiento, todo en la UE."
          />

          <section className="mt-16 pt-10 border-t border-warm-100">
            <h2 className="text-[0.75rem] font-medium uppercase tracking-[0.06em] text-text-tertiary mb-5">
              Lecturas relacionadas
            </h2>
            <div className="space-y-4">
              <div>
                <Link
                  href="/es/blog/residency-is-not-sovereignty"
                  className="text-[0.95rem] text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
                >
                  Residencia no es soberanía: la pregunta que debes hacerle a tu proveedor de analítica con IA
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">6 min de lectura</p>
              </div>
              <div>
                <Link
                  href="/es/blog/audit-your-analytics-ai-privacy"
                  className="text-[0.95rem] text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
                >
                  Cómo auditar si la IA de tu analítica es realmente privada (checklist de 5 preguntas)
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">7 min de lectura</p>
              </div>
              <div>
                <Link
                  href="/es/blog/eu-ai-act-for-marketers"
                  className="text-[0.95rem] text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
                >
                  El Reglamento Europeo de IA para marketers, sin jerga
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">7 min de lectura</p>
              </div>
            </div>
          </section>
          <FaqSection items={FAQ} locale="es" />
        </div>
      </article>
    </>
  );
}
