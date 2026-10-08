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

const SLUG = "the-prompt-is-born-clean";
const URL = `/es/blog/${SLUG}`;
const TITLE =
  "El prompt nace limpio: por qué la analítica sin consentimiento hace sencilla la IA privada";
const DESCRIPTION =
  "Casi todo el trabajo de privacidad en IA es control de daños sobre datos que ya eran personales de origen. Si tu analítica nunca recogió una IP, una cookie ni un identificador de visitante, no hay nada personal que enmascarar antes de que el modelo lo vea.";

export const metadata: Metadata = {
  title: "El prompt nace limpio: IA privada sin consentimiento",
  description: "Casi toda la privacidad en IA es control de daños sobre datos ya personales. Si nunca recogiste IP ni cookie, no hay nada que enmascarar ante el modelo.",
  openGraph: {
    title: "El prompt nace limpio",
    description:
      "Enmascarar datos, firmar contratos y fijar plazos de retención es limpiar después. La analítica sin consentimiento elimina el problema antes: no hay identificador de visitante que enviar al modelo.",
    type: "article",
    url: "https://sealmetrics.com/es/blog/the-prompt-is-born-clean/",
    siteName: "Sealmetrics",
    locale: "es_ES",
    images: ["https://sealmetrics.com/og/blog/the-prompt-is-born-clean.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "El prompt nace limpio",
    description: "Enmascarar datos, firmar contratos y fijar plazos de retención es limpiar después. La analítica sin consentimiento elimina el problema antes: no hay identificador de visitante que enviar al modelo.",
    images: ["https://sealmetrics.com/og/blog/the-prompt-is-born-clean.png"],
  },
  alternates: {
    languages: getAlternates(`/blog/${SLUG}`),
    canonical: `https://sealmetrics.com${URL}`,
  },
};

const FAQ = [
  {
    question: "¿Puede una analítica con IA cumplir el RGPD sin consentimiento?",
    answer:
      "Sí, siempre que la analítica de base no recoja datos personales. El consentimiento de la normativa ePrivacy se activa al almacenar o acceder a información en un dispositivo, y las obligaciones del RGPD se activan al tratar datos personales. Una analítica que no instala cookies, no guarda IPs, no conserva identificadores persistentes de visitante y se limita a las estadísticas de audiencia de la propia web puede apoyarse en la exención de medición de audiencia y no tratar datos personales, así que la capa de IA que lee esas métricas agregadas tampoco trata datos personales.",
  },
  {
    question: "¿Qué datos envía realmente al modelo un asistente de analítica con IA?",
    answer:
      "En uno bien construido, tres cosas: tu pregunta escrita, los valores agregados que devuelven las propias herramientas de reporting de la plataforma y las etiquetas por las que se desglosan esas métricas: canales, campañas, páginas, dispositivos, países. Ninguna fila a nivel de visitante. El asistente responde llamando a herramientas de reporting contra tus datos, no recordando nada de su entrenamiento.",
  },
  {
    question: "¿Basta con enmascarar los datos personales antes de enviarlos a una IA para cumplir el RGPD?",
    answer:
      "Ayuda, pero es mitigación, no eliminación. El enmascarado es una operación de tratamiento aplicada a datos personales que ya tienes, así que la recogida, la base jurídica, la retención y la exposición ante una brecha siguen ahí, y el enmascarado puede fallar. No recoger el identificador de entrada elimina la obligación en lugar de gestionarla.",
  },
  {
    question: "¿Puede un asistente de IA ver visitantes individuales en mi analítica?",
    answer:
      "En Sealmetrics no puede, porque los visitantes individuales no están identificados en ninguna parte del sistema. No hay cookies, ni direcciones IP, ni identificadores persistentes de visitante que consultar — el identificador de sesión rota cada día y no se puede enlazar entre días —, así que ningún informe y ninguna respuesta de la IA puede resolverse hasta una persona. Es una propiedad del modelo de datos, no un ajuste de permisos.",
  },
  {
    question: "¿Qué diferencia hay entre privacidad desde el diseño y privacidad por política en la IA?",
    answer:
      "La privacidad por política significa que los datos personales se recogen y luego se gobiernan con contratos, enmascarado y reglas de retención: funciona mientras todo el mundo cumple las reglas. La privacidad desde el diseño significa que el dato nunca se recogió, así que no hay regla que incumplir. En las funciones de IA la distinción es nítida: una política la puede desconfigurar el siguiente ingeniero; un identificador que no existe no se puede filtrar.",
  },
];

export default function ThePromptIsBornCleanPageEs() {
  const dates = postDates("the-prompt-is-born-clean", "es");

  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: TITLE,
          description: DESCRIPTION,
          ...dates,
          url: URL,
          category: "Privacidad",
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
          { name: "El prompt nace limpio", url: URL },
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
          { label: "El prompt nace limpio" },
        ]}
        locale="es"
      />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              Privacidad
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              El prompt nace limpio: por qué la analítica sin consentimiento hace sencilla la IA privada
            </h1>
            <PostByline
              {...dates}
              readTime="5 min de lectura"
              authorName="Rafa Jiménez"
              authorUrl="/es/authors/rafa-jimenez"
              locale="es"
            />
          </header>

          <p className="tldr mb-12 text-[1.15rem] leading-[1.7] text-text-secondary font-serif italic">
            Casi todos los controles de privacidad para IA que hay en el mercado
            son limpieza posterior: enmascara esto, firma aquello, borra a los
            noventa días. Todos existen porque el dato ya era personal antes de
            que el modelo lo viera. No recojas nada personal y esa capa entera
            deja de hacer falta.
          </p>

          <div className="key-takeaways mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">
              Conclusiones clave
            </h2>
            <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li>
                El enmascarado, los contratos de encargo del tratamiento y los
                límites de retención son control de daños: gestionan un riesgo
                creado aguas arriba, en la recogida.
              </li>
              <li>
                Sealmetrics nunca guarda IPs ni instala cookies y no conserva ningún
                identificador persistente de visitante, así que no hay ningún identificador
                personal disponible para meter en un prompt.
              </li>
              <li>
                Un prompt de Seal AI lleva tu pregunta, métricas agregadas y
                etiquetas de agrupación. Los datos a nivel de visitante no están
                porque nunca existieron, no porque se hayan quitado.
              </li>
              <li>
                La inferencia exclusivamente en la UE, la retención cero y el no
                entrenar con tus datos se apoyan encima como defensa en
                profundidad: son la segunda capa, no la primera.
              </li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              Si lees suficiente documentación de proveedores sobre IA y
              privacidad, acabas notando que está toda escrita en el mismo
              tiempo verbal: el pretérito perfecto de un error ya cometido.
            </p>
            <p>
              La información personal se <em>enmascara</em> antes de la petición.
              Hay contratos de encargo del tratamiento <em>firmados</em> con el
              proveedor del modelo. Los logs se <em>purgan</em> pasada una
              ventana de retención. Los prompts se <em>limpian</em> de
              direcciones de correo. Todos esos controles son ingeniería
              competente, y todos existen para gestionar un problema introducido
              antes: en la recogida, mucho antes de que nadie escribiera una
              pregunta en un chat.
            </p>
            <p>
              Hay otro orden de operaciones. No recojas el dato personal, y el
              prompt ya nace limpio.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              La privacidad empieza antes de la IA
            </h2>
            <p>
              Sealmetrics es analítica sin consentimiento. Eso no es una
              afirmación sobre lo opcionales que son los banners de cookies; es
              una afirmación sobre lo que registra el tracker. Nunca guarda
              direcciones IP, nunca instala cookies y nunca asigna un
              identificador persistente de visitante. El único identificador es
              uno de sesión efímero, seudonimizado en el servidor con una sal que
              rota cada día, así que no se puede enlazar entre días. Los campos
              de visitante y de usuario no existen en el modelo de datos.
            </p>
            <p>
              Lo que significa que, cuando una capa de IA se apoya en esa base de
              datos y lanza una consulta, no hay ningún identificador en el
              resultado del que preocuparse. No porque un filtro lo haya quitado.
              Porque nunca hubo ninguno que quitar.
            </p>
            <p>
              Esta es la diferencia entre privacidad desde el diseño y privacidad
              por política, y se ve con especial claridad en los modos de fallo.
              Una regla de enmascarado se puede desconfigurar. Un proceso de
              retención puede dejar de ejecutarse en silencio. Un ingeniero nuevo
              puede añadir un campo a un payload sin darse cuenta de lo que eso
              habilita. Un identificador que nunca se recogió no tiene modo de
              fallo.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Qué hay realmente en el prompt
            </h2>
            <p>
              En concreto, esto es lo que viaja al modelo cuando le haces una
              pregunta al asistente de Sealmetrics, y lo que no puede viajar
              porque no existe en ninguna parte detrás.
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full text-[0.85rem]">
                <thead>
                  <tr className="border-b border-warm-200">
                    <th className="text-left py-3 pr-6 text-green-muted font-medium">
                      Entra en el prompt
                    </th>
                    <th className="text-left py-3 pl-6 text-text-secondary font-medium">
                      No puede entrar: nunca existió
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      in: "Tu pregunta escrita («¿por qué bajó el orgánico la semana pasada?»)",
                      out: "Direcciones IP, en cualquier forma: en bruto, truncadas o hasheadas",
                    },
                    {
                      in: "Métricas agregadas: entradas, conversiones, tasa de rebote, ingresos",
                      out: "Cookies o cualquier identificador almacenado en el dispositivo",
                    },
                    {
                      in: "Etiquetas de agrupación: canal, campaña, fuente, medio, término",
                      out: "Identificadores persistentes de dispositivo o señales de identidad probabilísticas",
                    },
                    {
                      in: "Desgloses por dimensión: página, landing page, tipo de dispositivo, país",
                      out: "IDs de visitante o de usuario que vinculen sesiones a una persona",
                    },
                    {
                      in: "El rango de fechas y la ventana de comparación que elegiste",
                      out: "Perfiles de comportamiento entre sitios o entre dispositivos",
                    },
                    {
                      in: "La estructura del informe que el asistente pidió a sus propias herramientas",
                      out: "Filas en bruto a nivel de visitante que pudieran reidentificarse",
                    },
                  ].map((row) => (
                    <tr key={row.in} className="border-b border-warm-100 last:border-0">
                      <td className="py-3 pr-6 text-text-primary font-medium">{row.in}</td>
                      <td className="py-3 pl-6 text-text-secondary">{row.out}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>
              Merece la pena explicar el mecanismo que hay detrás de la columna
              izquierda. El asistente no responde de memoria ni con nada que
              absorbiera durante el entrenamiento. Responde{" "}
              <em>llamando a herramientas</em> — un inventario de 63 herramientas
              que cubre visiones generales, canales, campañas, embudos, segmentos
              y demás — contra los datos de tu cuenta, y después redacta lo que
              ha recibido. El modelo es una capa de lenguaje sobre tus propios
              informes.
            </p>
            <p>
              Ese diseño tiene una consecuencia de privacidad y otra de calidad.
              La de privacidad: el payload está acotado por lo que pueden
              devolver las herramientas de reporting, y esas herramientas no
              pueden devolver a una persona. La de calidad: las cifras de la
              respuesta salen de una consulta en vivo y no del conocimiento
              general del modelo, que es exactamente por lo que un recuerdo
              factual flojo sobre el mundo abierto importa mucho menos en
              analítica con grounding de lo que sugieren las tablas de
              benchmarks. Repasamos ese equilibrio en detalle en{" "}
              <Link
                href="/es/blog/best-llm-for-data-analytics"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                el informe de selección de modelo
              </Link>
              .
            </p>

            <CommercialModule
              locale="es"
              hook="¿Sabes exactamente qué contiene el prompt que tu analítica le envía a su IA? En una demo ves qué recibe LENS: agregados, nunca datos que identifiquen a nadie."
            />

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              La segunda capa: defensa en profundidad
            </h2>
            <p>
              Nada de lo anterior es un argumento para ser descuidado con la
              cadena de tratamiento. Un prompt limpio sigue siendo información
              comercial tuya: tus ingresos, tu mix de canales, el rendimiento de
              tus campañas. Eso no son datos personales, pero tampoco es algo que
              quieras ver alojado en el corpus de entrenamiento de otro.
            </p>
            <p>
              Por eso la segunda capa está construida como si la primera no
              existiera. La inferencia de{" "}
              <Link
                href="https://docs.sealmetrics.com/lens/seal-ai/private-ai-architecture"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                Seal AI
              </Link>{" "}
              se ejecuta en Scaleway Generative APIs, en París, Francia, y solo
              ahí. Scaleway es una empresa francesa cuya matriz es el grupo
              Iliad, sin capital estadounidense, y declara explícitamente que sus
              servicios de IA no están sujetos a leyes extraterritoriales como la
              CLOUD Act estadounidense. Aplica Zero Data Retention por defecto,
              con una excepción documentada: ante un error grave del servicio, la
              petición fallida puede conservarse hasta dos semanas para análisis
              de causa raíz. No entrena con datos de cliente.
            </p>
            <p>
              Por nuestra parte, la capa de medición persiste únicamente
              contadores de tokens — organización, modelo, tokens de entrada y de
              salida — para cuota y facturación. El contenido del prompt y de la
              respuesta nunca se persiste ahí. El transporte es TLS 1.2 o
              superior con verificación de certificado. Y como nada sale de la UE
              y el encargado del tratamiento no tiene matriz estadounidense, el
              Capítulo V del RGPD no se activa en absoluto: sin cláusulas
              contractuales tipo, sin evaluación de impacto de las transferencias
              y sin depender de que el Marco de Privacidad de Datos UE-EE. UU.
              sobreviva a su próxima vista.
            </p>
            <p>
              Tampoco hay configuración que puedas equivocar. Ninguna clave de API
              que pegar, ninguna cuenta con un proveedor de IA que abrir, ningún
              interruptor que un compañero pueda dejar al revés. Los clientes que
              quieran específicamente otro modelo pueden aportar su propia clave
              de OpenAI, Anthropic, Gemini o DeepSeek, y entonces sus prompts
              viajan a ese proveedor bajo los términos de ese proveedor: una
              decisión deliberada, cliente a cliente, y claramente separada. Seal
              AI es la opción por defecto precisamente para que la privacidad no
              dependa de la configuración.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              El orden de las operaciones
            </h2>
            <p>
              Si estás evaluando una función de analítica con IA, la pregunta más
              útil no es &quot;¿cómo protegéis los datos que enviáis al
              modelo?&quot;. Es &quot;¿qué datos personales tenéis que proteger,
              para empezar?&quot;.
            </p>
            <p>
              Un proveedor con una respuesta larga y detallada a la primera
              pregunta y ninguna respuesta a la segunda está haciendo un trabajo
              cuidadoso sobre un problema que eligió tener. El dato personal más
              barato de proteger es el que nunca recogiste, y es el único que no
              puede filtrarse, ni ser requerido judicialmente, ni acabar por
              accidente en un conjunto de entrenamiento.
            </p>
          </div>

          <CommercialModule
            locale="es"
            hook="¿Tu DPO pregunta qué ve el modelo? Respóndele con una demo: el prompt de LENS nace de dato agregado que no identifica a nadie, y la inferencia no sale de la UE."
          />

          <section className="mt-16 pt-10 border-t border-warm-100">
            <h2 className="text-[0.75rem] font-medium uppercase tracking-[0.06em] text-text-tertiary mb-5">
              Lecturas relacionadas
            </h2>
            <div className="space-y-4">
              <div>
                <Link
                  href="/es/blog/meet-seal-ai"
                  className="text-[0.95rem] text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
                >
                  Te presentamos Seal AI: el asistente de analítica que nunca envía tus datos a Estados Unidos
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">5 min de lectura</p>
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
                  href="/es/blog/cookieless-analytics-explained"
                  className="text-[0.95rem] text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
                >
                  Analítica cookieless explicada: cómo medir sin cookies
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">8 min de lectura</p>
              </div>
            </div>
          </section>
          <FaqSection items={FAQ} locale="es" />
        </div>
      </article>
    </>
  );
}
