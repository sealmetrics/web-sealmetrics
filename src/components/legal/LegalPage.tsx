import Link from "next/link";
import type { ReactNode } from "react";
import {
  LEGAL_DOCUMENTS,
  LEGAL_EFFECTIVE_DATE,
  formatLegalDate,
  loadLegalDocument,
  type LegalDocumentId,
  type LegalLocale,
} from "@/lib/legal/documents";
import { LegalDocument } from "./LegalDocument";

const TEXT = {
  en: {
    eyebrow: "Legal",
    updated: "Last updated",
    version: "Version",
    other: "Versión en español",
    inForce: "In force",
    newSignups: "for new sign-ups, from publication",
    existing: (date: string | null) =>
      date ? `for existing Clients, from ${date}` : "for existing Clients, 30 days after we notify them by email",
    related: { privacy: "Privacy Policy", dpa: "Data Processing Agreement", terms: "Terms of Service", security: "Security" },
  },
  es: {
    eyebrow: "Legal",
    updated: "Última actualización",
    version: "Versión",
    other: "English version",
    inForce: "Entrada en vigor",
    newSignups: "para nuevos registros, desde su publicación",
    existing: (date: string | null) =>
      date
        ? `para Clientes existentes, desde el ${date}`
        : "para Clientes existentes, 30 días después de que se lo notifiquemos por email",
    related: { privacy: "Política de Privacidad", dpa: "Acuerdo de Encargo (DPA)", terms: "Términos del Servicio", security: "Seguridad" },
  },
} as const;

/**
 * The shell every legal page shares: heading, the version and date the document
 * states, the entry into force of the DPA and the Terms, and the canonical text.
 */
export function LegalPage({
  doc,
  locale,
  title,
  alternate,
  intro,
  copyBlocks = false,
}: {
  doc: LegalDocumentId;
  locale: LegalLocale;
  title: string;
  alternate: string;
  intro?: ReactNode;
  copyBlocks?: boolean;
}) {
  const t = TEXT[locale];
  const facts = LEGAL_DOCUMENTS[doc];
  const { body } = loadLegalDocument(doc, locale);
  const bindsCustomers = doc === "dpa" || doc === "terms";
  const effective = LEGAL_EFFECTIVE_DATE ? formatLegalDate(LEGAL_EFFECTIVE_DATE, locale) : null;
  const prefix = locale === "es" ? "/es" : "";
  const related = (["privacy", "dpa", "terms", "security"] as const).filter((id) => id !== doc);

  return (
    <section className="pt-12 pb-28 bg-white">
      <div className="max-w-[800px] mx-auto px-5 sm:px-8">
        <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-6">
          {t.eyebrow}
        </span>
        <h1 className="headline-hero mb-4">{title}</h1>
        <p className="text-[0.9rem] text-text-tertiary mb-6">
          {t.version} {facts.version} · {t.updated}: {formatLegalDate(facts.updated, locale)} ·{" "}
          <a href={alternate} className="underline">
            {t.other}
          </a>
        </p>
        {bindsCustomers && (
          <p className="mb-10 border border-warm-100 bg-warm-white px-4 py-3 text-[0.9rem] text-text-secondary">
            <strong className="text-text-primary">{t.inForce}:</strong> {t.newSignups}; {t.existing(effective)}.
          </p>
        )}
        {intro}
        <LegalDocument markdown={body} locale={locale} copyBlocks={copyBlocks} />
        <div className="mt-12 pt-8 border-t border-warm-100 flex flex-wrap gap-6 text-[0.85rem]">
          {related.map((id) => (
            <Link
              key={id}
              href={`${prefix}/${id}/`}
              className="text-text-secondary no-underline hover:text-text-primary transition-colors"
            >
              {t.related[id]}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
