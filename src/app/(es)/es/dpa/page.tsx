import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Acuerdo de Encargo de Tratamiento (DPA) — Sealmetrics",
  description:
    "DPA de Sealmetrics (DPA-2026-v2.1): art. 28 RGPD, garantías AEPD, analítica tratada solo en la UE, subencargados y medidas de seguridad.",
  openGraph: {
    title: "Acuerdo de Encargo de Tratamiento (DPA)",
    description: "Art. 28 RGPD: garantías AEPD de medición de audiencia, analítica tratada solo en la UE, subencargados y medidas de seguridad.",
    url: "https://sealmetrics.com/es/dpa/",
    siteName: "Sealmetrics",
    type: "website",
    locale: "es_ES",
    images: [ogImage("/es/dpa/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Acuerdo de Encargo de Tratamiento (DPA)",
    description: "Art. 28 RGPD: garantías AEPD de medición de audiencia, analítica tratada solo en la UE, subencargados y medidas de seguridad.",
    images: [ogImage("/es/dpa/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/dpa/",
    languages: { en: "https://sealmetrics.com/dpa/" },
  },
};

function H({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-[1.3rem] font-medium text-text-primary mb-3 mt-10">
      {children}
    </h2>
  );
}
function Tbl({ rows }: { rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-[0.88rem] border border-warm-100">
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={i}
              className={
                i === 0
                  ? "bg-warm-white font-medium text-text-primary"
                  : "border-t border-warm-100"
              }
            >
              {r.map((c, j) => (
                <td key={j} className="px-3 py-2 align-top">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DpaEsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "DPA" }]} locale="es" />
      <JsonLd data={breadcrumbSchema([{ name: "DPA", url: "/es/dpa" }], "es")} />
    <section className="pt-12 pb-28 bg-white">
      <div className="max-w-[800px] mx-auto px-5 sm:px-8">
        <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-6">
          Legal
        </span>
        <h1 className="headline-hero mb-4">
          Acuerdo de Encargo de Tratamiento (DPA)
        </h1>
        <p className="text-[0.9rem] text-text-tertiary mb-10">
          Referencia DPA-2026-v2.0 · Última actualización: 24 de agosto de 2026 ·{" "}
          <a href="/dpa/" className="underline">English version</a> · La versión
          española es la auténtica.
        </p>

        <div className="space-y-4 text-[0.95rem] leading-[1.75] text-text-secondary">
          <p>
            Acuerdo entre <strong className="text-text-primary">el Cliente</strong>{" "}
            (el &laquo;Responsable del Tratamiento&raquo;), identificado según
            los datos de registro de su cuenta, y{" "}
            <strong className="text-text-primary">Sealmetrics S.L.</strong> (el
            &laquo;Encargado&raquo; o &laquo;Sealmetrics&raquo;), CIF
            ESB70933239, Carrer de Tirso de Molina 36, 08940 Cornellà de
            Llobregat, Barcelona. Entra en vigor con la aceptación de los
            Términos del Servicio, que lo incorporan por referencia, y prevalece
            sobre cualquier disposición contradictoria en materia de protección
            de datos. El servicio aplica protección de datos desde el diseño y
            por defecto (Art. 25 RGPD): sin cookies ni almacenamiento en el
            terminal, sin persistencia de IPs y sin identificadores aptos para
            seguimiento entre sitios. Las partes se rigen por el Art. 28 RGPD,
            la LOPDGDD y los criterios de la Guía AEPD de medición de audiencia
            (enero 2024).
          </p>

          <H>1-2. Objeto e instrucciones documentadas</H>
          <p>
            Sealmetrics trata los Datos del Servicio (Anexo 1) exclusivamente
            por cuenta y bajo las instrucciones documentadas del Cliente: este
            DPA y su Anexo 1, los Términos del Servicio y la configuración que
            el Cliente aplique (eventos de conversión, propiedades,
            integraciones, exportaciones). No los tratará para ninguna otra
            finalidad, e informará sin dilación si considera que una
            instrucción infringe la normativa.
          </p>

          <H>3. Garantías específicas de medición de audiencia (AEPD)</H>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-text-primary">No reutilización:</strong>{" "}
              sin entrenamiento de modelos, sin mejora de algoritmos con datos
              identificables, sin benchmarking entre clientes, sin cesión ni
              venta.
            </li>
            <li>
              <strong className="text-text-primary">
                Restricción de finalidad:
              </strong>{" "}
              (a) las mediciones estrictamente necesarias enumeradas por la
              AEPD; (b) la atribución de marketing (conversiones, importes,
              tipo de red publicitaria del clic, propiedades) expresamente instruida por
              el Cliente, cuya base jurídica documenta él como responsable.
            </li>
            <li>
              <strong className="text-text-primary">
                Independencia multi-editor:
              </strong>{" "}
              datos e identificadores técnicos independientes por cliente, no
              aptos para referencias cruzadas ni medición de alcance unificado
              entre sitios de distintos responsables.
            </li>
            <li>
              <strong className="text-text-primary">Localización UE</strong>{" "}
              (cláusula 7) y{" "}
              <strong className="text-text-primary">
                evaluación documentada
              </strong>{" "}
              conforme a la sección III.C.2 de la guía, actualizada al menos
              anualmente y disponible a petición.
            </li>
          </ul>

          <H>4. Obligaciones del Encargado</H>
          <p>
            <strong className="text-text-primary">Confidencialidad</strong> del
            personal con mínimo privilegio y acceso registrado.{" "}
            <strong className="text-text-primary">Seguridad</strong> (Art. 32,
            Anexo 2): cifrado en tránsito y reposo, minimización estructural,
            retención automática, aislamiento por cuenta.{" "}
            <strong className="text-text-primary">Subencargados</strong>:
            autorización general (Anexo 3), notificación con antelación
            razonable que permita la oposición, obligaciones equivalentes por
            contrato y responsabilidad plena; los proveedores conectados por el
            Cliente (BYOK, exportaciones) no son subencargados de Sealmetrics.{" "}
            <strong className="text-text-primary">Derechos</strong>: aplica el
            Art. 11 RGPD — Sealmetrics no puede identificar a los visitantes;
            asiste documentando el tratamiento y reenvía sin dilación las
            solicitudes recibidas.{" "}
            <strong className="text-text-primary">Brechas</strong>: notificación
            sin dilación indebida con el contenido del Art. 33.3, por fases si
            es preciso, y registro interno (Art. 33.5).{" "}
            <strong className="text-text-primary">DPIA</strong>: asistencia y
            documentación técnica a disposición.{" "}
            <strong className="text-text-primary">Auditorías</strong>: máximo
            una por período de 12 meses, preaviso de 30 días, en horario
            laboral, cada parte con sus costes salvo incumplimiento material.{" "}
            <strong className="text-text-primary">Fin del tratamiento</strong>:
            30 días para exportar (API/BigQuery) y, a elección del Cliente,
            supresión o devolución en plazo razonable, salvo obligación legal
            de conservación.
          </p>

          <H>5. Obligaciones del Responsable</H>
          <p>
            Garantizar la licitud y el deber de información (Arts. 13-14, con
            texto sugerido por Sealmetrics);{" "}
            <strong className="text-text-primary">
              no instrumentar datos personales en campos libres
            </strong>{" "}
            (properties, parámetros de URL, nombres de campaña — emails,
            teléfonos, documentos), pudiendo Sealmetrics aplicar filtros de
            detección y redacción como salvaguarda adicional; configurar el
            Servicio conforme a sus obligaciones; documentar la base jurídica
            de la capa de atribución cuando la active; y atender los derechos
            de los interesados.
          </p>

          <H>6. Servicios dirigidos por el Cliente</H>
          <p>
            Bajo BYOK, los prompts van al proveedor de IA elegido por el
            Cliente, por su cuenta y responsabilidad; Sealmetrics es mero
            transmisor. El proveedor por defecto (&laquo;Seal AI&raquo;) opera
            íntegramente en la UE. Los datos exportados a infraestructura del
            Cliente (API, BigQuery, webhooks, informes) son, desde su
            recepción, tratamiento propio del Cliente, incluida cualquier
            transferencia internacional.
          </p>

          <H>7. Localización y transferencias</H>
          <p>
            Los datos de visitantes se tratan y almacenan{" "}
            <strong className="text-text-primary">
              exclusivamente en la Unión Europea
            </strong>
            , incluida la inferencia de IA por defecto (Scaleway, París, zero
            data retention), sin depender del Data Privacy Framework ni de
            SCCs. Única excepción (Anexo 3): los emails del servicio a usuarios
            de la cuenta vía Resend, Inc. (EE.UU., SCCs/DPF), sin afectar a
            ningún dato de visitantes. Cualquier futuro subencargado extra-EEE
            exigiría preaviso, instrumento válido del Capítulo V y evaluación
            de impacto de la transferencia documentada.
          </p>

          <H>8. Responsabilidad</H>
          <p>
            Cada parte responde conforme al Art. 82 RGPD: Sealmetrics solo por
            incumplir obligaciones propias de encargado o actuar fuera de las
            instrucciones lícitas; el Cliente en los demás casos. Sin
            indemnizaciones convencionales; excluidos daños indirectos y lucro
            cesante en la máxima medida permitida. El{" "}
            <strong className="text-text-primary">remedio único</strong> del
            Cliente consiste en créditos o condonación de cuotas futuras, hasta
            el equivalente a las cuotas de los 12 meses anteriores; en ningún
            caso devolución de importes ya abonados ni pago dinerario. Estos
            límites no aplican donde la ley no lo permite (dolo o culpa grave,
            reclamaciones de interesados vía Art. 82, sanciones de autoridad
            por incumplimiento propio).
          </p>

          <H>9. Duración, ley y jurisdicción</H>
          <p>
            Vigente mientras Sealmetrics trate Datos del Servicio; sobreviven
            las cláusulas de confidencialidad y fin del tratamiento.
            Modificaciones con antelación razonable. Ley española; juzgados y
            tribunales de Barcelona; autoridad de referencia: AEPD.
            Notificaciones: privacy@sealmetrics.com.
          </p>

          <H>Anexo 1 — Descripción del tratamiento</H>
          <p>
            Analítica web sin consentimiento. Finalidad A: medición de
            audiencia agregada. Finalidad B (opcional, por configuración del
            Cliente): atribución de marketing. Interesados: visitantes de los
            sitios del Cliente. Datos: navegación (URLs, referente, engagement),
            técnicos (dispositivo/navegador/SO derivados del user agent, zona
            horaria),{" "}
            <strong className="text-text-primary">
              país derivado de la zona horaria del navegador — no de la IP
            </strong>{" "}
            (en cuentas con detección de agentes, país por IP transitorio como
            señal antifraude, sin persistir la IP), identificador de sesión
            efímero calculado en el navegador sin almacenamiento en el
            dispositivo, independiente por cliente y seudonimizado en servidor
            con clave secreta y salt diario destruido en la rotación, UTMs y —
            en la Finalidad B — el tipo de red publicitaria del clic (el valor
            del identificador de clic no se almacena), conversiones, importes y
            propiedades. No se almacenan: IPs, user agent en bruto, valores de
            identificadores de clic, cookies o storage, nombres o emails de
            visitantes, categorías especiales, identificadores aptos para
            enlace entre sitios o entre días.
          </p>
          <Tbl
            rows={[
              ["Datos", "Conservación (TTL automático)"],
              ["Registro técnico a nivel de evento (URLs completas; sin user agent en bruto)", "1 día"],
              ["Agregados horarios", "90 días"],
              ["Agregados diarios, conversiones y propiedades", "24 meses"],
              ["Estado de sesión (memoria operativa)", "2 horas"],
              ["Salt diario de seudonimización de sesión", "24 horas (destruido en la rotación; excluido de backups)"],
              ["Tras la terminación del contrato", "30 días de exportación + supresión"],
            ]}
          />

          <H>Anexo 2 — Medidas de seguridad</H>
          <p>
            TLS 1.2+ en tránsito (incluida la inferencia de IA); AES-256 en
            reposo; seudonimización efímera server-side del identificador de
            sesión (HMAC con clave secreta sobre un salt diario destruido en la
            rotación y excluido de backups); minimización estructural (sin persistencia de IP, sin
            storage en el terminal); aislamiento lógico por cliente; retención
            por TTL a nivel de base de datos; RBAC, MFA y mínimo privilegio con
            accesos registrados; claves solo en gestores de secretos y
            prohibición de registrar contenido en la cadena de IA;
            endurecimiento de la cadena de suministro de dependencias; backups
            cifrados (30 días); monitorización de seguridad. Organizativas:
            formación, confidencialidad, procedimientos documentados de brechas
            y derechos, contratos Art. 28 con todos los subencargados,
            auditoría interna periódica.
          </p>

          <H>Anexo 3 — Subencargados autorizados</H>
          <Tbl
            rows={[
              ["Subencargado", "Ubicación", "Servicio"],
              [
                "Noraina Limited",
                "Irlanda (UE)",
                "Alojamiento de infraestructura y bases de datos — todos los Datos del Servicio",
              ],
              [
                "Scaleway SAS (grupo Iliad)",
                "París, Francia (UE)",
                "Inferencia LLM gestionada del proveedor de IA por defecto «Seal AI» (modelo abierto, zero data retention; solo contadores de tokens)",
              ],
              [
                "Resend (Plus Five Five, Inc.)",
                "EE.UU. — SCCs + certificación EU-US DPF",
                "Emails del servicio a usuarios de la cuenta (verificaciones, alertas, informes); sin datos de visitantes",
              ],
            ]}
          />
          <p>
            Los proveedores de IA conectados por el Cliente (BYOK) no son
            subencargados de Sealmetrics. Los proveedores de facturación y
            anti-abuso tratan datos de los que Sealmetrics es responsable y se
            documentan en la{" "}
            <a href="/privacy/" className="underline">
              Política de Privacidad
            </a>
            . Suscripción a cambios: privacy@sealmetrics.com.
          </p>

          <H>Anexo 4 — Marco de transferencias (condicional)</H>
          <p>
            En el flujo estándar no hay transferencias de datos de visitantes
            fuera del EEE. Si en el futuro se incorporase un subencargado
            extra-EEE: SCCs de la Decisión 2021/914 (módulo aplicable), ley
            española, AEPD como autoridad de referencia, Anexos I/II de las
            SCCs por referencia a los Anexos 1 y 2, y evaluación de impacto de
            la transferencia previa y documentada.
          </p>

          <p className="pt-6 border-t border-warm-100 text-[0.85rem] text-text-tertiary">
            Este Acuerdo se entiende aceptado con la aceptación de los{" "}
            <a href="/terms/" className="underline">
              Términos del Servicio
            </a>
            . Para copias firmadas individualmente: privacy@sealmetrics.com.
          </p>
        </div>
      </div>
    </section>
    </>
  );
}
