import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Changelog de Sealmetrics — Novedades de producto",
  description:
    "Novedades de producto y nuevas funcionalidades de Sealmetrics. Descubre lo último que hemos lanzado.",
  openGraph: {
    title: "Changelog de Sealmetrics — Novedades de producto",
    description: "Novedades de producto y nuevas funcionalidades de Sealmetrics.",
    type: "website",
    images: [ogImage("/es/changelog/")],
    url: "https://sealmetrics.com/es/changelog/",
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Changelog de Sealmetrics — Novedades de producto",
    description: "Novedades de producto y nuevas funcionalidades de Sealmetrics.",
    images: [ogImage("/es/changelog/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/changelog/",
    languages: getAlternatesEs("/changelog"),
  },
};

const entries = [
  {
    date: "Septiembre 2026",
    updates: [
      {
        title: "Override en UTM Mapping — los clics de Shopping y Performance Max, para la campaña que los pagó",
        type: "New",
        desc: "Google Shopping y Performance Max sirven enlaces de producto que ya llegan con utm_source, utm_medium y utm_campaign puestos desde el feed, y el sufijo de URL final de Google Ads solo puede añadir parámetros, nunca quitarlos. Hasta ahora los UTMs del feed ganaban siempre: los clics de pago se atribuían a la campaña equivocada y el anunciante no tenía forma de corregirlo. Cada UTM Mapping tiene ahora la opción \u201COverride the UTM if the URL already has one\u201D. Si la activas, el valor de tu parámetro personalizado se escribe aunque la URL ya traiga ese UTM, y los ingresos caen en la campaña que compró el clic. Actívala al crear el mapping o con el interruptor Override de cada fila de la lista. Viene desactivada por defecto: los mappings que no la usen se comportan exactamente igual que antes.",
      },
    ],
  },
  {
    date: "Agosto 2026",
    updates: [
      {
        title: "Bounce rate más preciso — solo las páginas vistas cuentan como engagement",
        type: "Improved",
        desc: "Una visita está enganchada cuando ve más de una página, y desde el 31 de agosto de 2026 solo las páginas vistas reales cuentan para eso. Las microconversiones (clics en CTA, scroll, vistas de pricing) y las conversiones se siguen registrando y mantienen toda su atribución — campaña, landing, dispositivo — pero ya no participan en cómo se cuenta la visita, ni reinician la sesión al dispararse en una URL que todavía lleva parámetros utm_*. Verás bajar tu bounce rate en torno a un 9% ese día: el tráfico es el mismo, las visitas enganchadas por fin se cuentan bien. El histórico no se recalcula, así que habrá un escalón en la serie. No tienes que hacer nada.",
      },
      {
        title: "Identificadores de sesión efímeros — rotan cada día",
        type: "Improved",
        desc: "El identificador de sesión que usamos para contar visitas sin cookies ahora es efímero: caduca y se regenera a diario, y el material de claves de cada rotación se destruye inmediatamente después. La actividad de un mismo dispositivo ya no puede enlazarse entre días ni entre sitios — por nadie, nosotros incluidos. Tus informes no cambian y no tienes que hacer nada.",
      },
      {
        title: "Los click IDs ya no se almacenan",
        type: "Improved",
        desc: "Los identificadores de clic de las plataformas de publicidad (gclid, fbclid, msclkid y similares) ahora se usan solo en el instante de la visita para atribuir el canal, y no se almacenan nunca — ni como campo, ni dentro de las URLs guardadas. La atribución de campañas de Google Ads, Meta y demás funciona exactamente igual. Si usas los endpoints de datos en bruto o el export a BigQuery, el campo del click ID desaparece de las respuestas (en BigQuery queda a NULL): no es un error, es privacidad.",
      },
      {
        title: "User-Agents crudos e IPs fuera del almacenamiento y de los logs",
        type: "Improved",
        desc: "El User-Agent completo del navegador ya no se retiene en el almacenamiento analítico, y los access logs de nuestros servidores ya no registran ni direcciones IP ni User-Agents de los visitantes. Los informes de navegadores, dispositivos y países se calculan al vuelo y siguen funcionando sin cambios.",
      },
    ],
  },
  {
    date: "Julio 2026",
    updates: [
      {
        title: "Seal AI Private — IA alojada en la UE con packs de tokens",
        type: "New",
        desc: "Seal AI Private ya está disponible de forma general: el proveedor de IA gestionado que hay detrás de LENS, procesado íntegramente en la UE (París), sin retención de prompts y sin API key que gestionar. Add-on de pago en Growth, incluido en Scale y Enterprise, con 5M de tokens por mes natural para toda la organización y alertas por email al 80% y al 100%. Los packs extra de 5M de tokens cuestan 358,80 € cada uno, no caducan nunca y se consumen solo después de la cuota mensual. Si la cuota se agota, cualquier usuario puede usar su propia clave de Anthropic, OpenAI, Gemini o DeepSeek.",
      },
      {
        title: "Informe de Sources — el tráfico referral agrupado por dominio, al estilo GA4",
        type: "Improved",
        desc: "La pestaña Sources ahora muestra el tráfico referral como dominios de origen (reddit.com / referrer), unificando el histórico bajo la misma convención. La pestaña Referrers conserva su detalle a nivel de URL, una fila por URL de referencia. En la API, las filas de referral aparecen ahora en /stats/sources como dominios y quedan excluidas de /stats/terms.",
      },
      {
        title: "Channel Grouping personalizado — desde el dashboard, CSV o MCP",
        type: "New",
        desc: "Define tus propios canales de marketing por encima de (o sobrescribiendo) los canales por defecto al estilo GA4, con un flujo de borradores → prueba → publicación. Formulario de reglas con un probador (“Test a visit”) que ejecuta el mismo motor que el pixel, botón Override sobre los canales por defecto, import y export en CSV/JSON, y tools MCP para crear reglas asistido por IA. Todas las tools de escritura son solo-borrador por diseño — publicar es siempre una acción humana. Las reglas nuevas surten efecto en unos 5 minutos y nunca reescriben datos históricos.",
      },
      {
        title: "Clasificación de canales — Direct y Referral más precisos",
        type: "Improved",
        desc: "Se refinaron las reglas de clasificación por defecto de Direct (sin referrer, sin parámetros de campaña) y Referral (sitios externos sin etiquetado UTM) para alinearlas con las convenciones al estilo GA4 que el tracker ya usaba internamente. Desde el 20 de julio de 2026, una parte del tráfico que antes se reportaba como Unassigned aparece como Direct o Referral. Solo tráfico nuevo — las filas históricas conservan su clasificación, y las reglas de canal personalizadas mantienen la prioridad.",
      },
    ],
  },
  {
    date: "Junio 2026",
    updates: [
      {
        title: "Actualización del algoritmo de bloqueo de bots — menos falsos positivos",
        type: "Improved",
        desc: "Desplegado el 2 de junio de 2026 a las 20:00 CET. El algoritmo de bloqueo de bots ya no filtra tráfico humano legítimo que antes se identificaba erróneamente como automatizado. Las cuentas afectadas por el comportamiento anterior ven una recuperación del tráfico humano reportado desde ese momento.",
      },
    ],
  },
  {
    date: "Mayo 2026",
    updates: [
      {
        title: "Atribución: los hits internos con UTMs ya no abren una sesión nueva",
        type: "Improved",
        desc: "Desde el 25 de mayo de 2026, cuando un hit lleva parámetros UTM y el referrer es tu propio dominio, gana el referrer: el hit se cuenta como pageview dentro de la sesión existente y las UTMs se ignoran. Los conteos de sesiones dejan de inflarse por enlaces internos etiquetados con UTM, y las fuentes de campaña reflejan solo entradas externas genuinas. Los datos históricos no cambian.",
      },
      {
        title: "API: /exports/* y /batch devolvían 403 con API keys — corregido",
        type: "Fixed",
        desc: "Una comprobación de permisos en /exports/* y /batch exigía un scope que las API keys no llevan, devolviendo 403 insufficient_scope para claves válidas. Corregido en producción, sin acción necesaria — las API keys existentes ya funcionan en estas rutas sin cambios.",
      },
    ],
  },
  {
    date: "Febrero 2026",
    updates: [
      {
        title: "Llega Sealmetrics V2",
        type: "Launch",
        desc: "La actualización más importante desde que empezamos, reconstruida desde cero: un dashboard más rápido y limpio; atribución más inteligente; compliance listo para RGPD, CNIL, UK PECR y el próximo Digital Omnibus de la UE; una API nueva y mejor documentada; y un script de tracking más ligero con mejor soporte de SPAs. V2 es el estándar para todas las cuentas — los datos, la configuración y el código de tracking siguen funcionando.",
      },
    ],
  },
  {
    date: "Noviembre 2025",
    updates: [
      {
        title: "Ampliada la base de datos de user-agents de robots",
        type: "Improved",
        desc: "Añadidos 158 nuevos user-agents relacionados con robots el 21 de noviembre, mejorando la detección de tráfico automatizado y la precisión al separar usuarios reales de bots.",
      },
      {
        title: "Aprobación legal para el filtrado de bots por IP",
        type: "New",
        desc: "Tras revisión legal, los hits entrantes se comprueban contra nuestra base de datos de IPs de bots: si coincide, se excluye de tu analítica; si no coincide, se registra como tráfico humano sin que la IP se almacene. Ninguna IP humana se retiene, rastrea ni expone jamás. Precisión sin cruzar la línea de la privacidad.",
      },
      {
        title: "Corrección en la clasificación del tráfico de Facebook",
        type: "Fixed",
        desc: "Las visitas que solo llevaban fbclid y ningún parámetro UTM se categorizaban como facebook-ads. Desde el 17 de noviembre a las 19:00 UTC se clasifican como Facebook Organic, y solo el tráfico con parámetros UTM de campaña correctos cuenta como Facebook Ads. Es esperable un ligero aumento del tráfico orgánico de Facebook desde ese momento; los datos históricos no cambian.",
      },
      {
        title: "Atribución de Facebook Ads — el fbclid deja de usarse",
        type: "Improved",
        desc: "Breaking change desde el 13 de noviembre a las 19:00 UTC: el parámetro fbclid deja de usarse para identificar tráfico de Facebook Ads, porque no es ni fiable ni consistente. La atribución de Facebook Ads requiere ahora UTMs bien configuradas (utm_source=facebook, utm_medium=paid o equivalente). Audita tus campañas activas y añade UTMs para mantener visibilidad completa.",
      },
      {
        title: "Procesamiento de datos 2,5× más rápido",
        type: "Improved",
        desc: "Aumentada la capacidad de núcleos de la infraestructura de procesamiento el 10 de noviembre a las 22:00 UTC. Los datos se procesan ahora 2,5 veces más rápido: carga más ágil del dashboard, actualizaciones de datos en vivo y generación de informes instantánea.",
      },
    ],
  },
];

const typeLabels: Record<string, string> = {
  New: "Nuevo",
  Improved: "Mejorado",
  Launch: "Lanzamiento",
  Fixed: "Corregido",
};

function typeBadgeColor(type: string): string {
  switch (type) {
    case "New":
      return "text-green-muted";
    case "Improved":
      return "text-blue-accent";
    case "Launch":
      return "text-text-primary";
    case "Fixed":
      return "text-red-alert";
    default:
      return "text-text-tertiary";
  }
}

export default function ChangelogPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Changelog" }]} locale="es" />
      <JsonLd data={breadcrumbSchema([{ name: "Changelog", url: "/es/changelog" }])} />
      {/* Hero */}
      <section className="pt-12 pb-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="max-w-[700px]">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-6">
              Changelog
            </span>
            <h1 className="headline-hero mb-8">Lo que hemos lanzado.</h1>
            <p className="text-[1.2rem] leading-[1.75] text-text-secondary">
              Novedades de producto, nuevas funcionalidades y mejoras.
              Publicamos continuamente y lo documentamos todo.
            </p>
          </div>
        </div>
      </section>

      {/* Entries */}
      <section className="pb-28 bg-white">
        <div className="max-w-[800px] mx-auto px-5 sm:px-8">
          {entries.map((entry) => (
            <div key={entry.date} className="mb-16 last:mb-0">
              <h2 className="font-serif text-[1.3rem] font-medium text-text-primary mb-8 pb-3 border-b border-warm-200">
                {entry.date}
              </h2>
              <div className="space-y-8">
                {entry.updates.map((update) => (
                  <div key={update.title}>
                    <div className="flex items-baseline gap-3 mb-2">
                      <span
                        className={`text-[0.7rem] font-medium uppercase tracking-wider ${typeBadgeColor(update.type)}`}
                      >
                        {typeLabels[update.type] ?? update.type}
                      </span>
                      <h3 className="font-serif text-[1.1rem] font-medium text-text-primary">
                        {update.title}
                      </h3>
                    </div>
                    <p className="text-[0.9rem] leading-[1.7] text-text-secondary ml-0">
                      {update.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div data-md="skip" className="mt-16 pt-10 border-t border-warm-100 text-center">
          <p className="text-[0.9rem] text-text-secondary mb-4">
            ¿Quieres ver estas funcionalidades en acción?
          </p>
          <a
            href="https://my.sealmetrics.com/register"
            className="inline-flex items-center px-7 py-3 text-[0.9rem] font-medium text-white bg-text-primary rounded-[4px] no-underline hover:bg-[#333] transition-colors"
          >
            Prueba gratis 14 días
          </a>
          <p className="mt-4 text-[0.8rem] text-text-tertiary">
            O explora el{" "}
            <Link href="/es/product" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">producto completo</Link>
            {" "}y los{" "}
            <Link href="/es/pricing" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">precios</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
