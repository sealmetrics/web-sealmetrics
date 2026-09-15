import Link from "next/link";

type Locale = "en" | "es";

const REGISTER_URL = "https://my.sealmetrics.com/register";

interface Props {
  locale?: Locale;
  titleEn: React.ReactNode;
  titleEs: React.ReactNode;
  ledeEn: string;
  ledeEs: string;
  primaryHref?: string;
  secondaryHref?: string;
  primaryTextEn?: string;
  primaryTextEs?: string;
  secondaryTextEn?: string;
  secondaryTextEs?: string;
}

export function FinalCtaSharedV3({
  locale = "en",
  titleEn,
  titleEs,
  ledeEn,
  ledeEs,
  primaryHref,
  secondaryHref,
  // Demo is the primary path (assisted sale for the 10M€+ ICP); the trial is
  // the secondary path for technical evaluators and is labelled "14-day
  // trial", not "free", because registration takes a payment method up front.
  primaryTextEn = "Book a demo →",
  primaryTextEs = "Reserva una demo →",
  secondaryTextEn = "Start 14-day trial",
  secondaryTextEs = "Prueba de 14 días",
}: Props) {
  const resolvedPrimaryHref = primaryHref ?? (locale === "es" ? "/es/demo" : "/demo");
  const resolvedSecondaryHref = secondaryHref ?? REGISTER_URL;
  const isExternalPrimary = resolvedPrimaryHref.startsWith("http");
  const isExternalSecondary = resolvedSecondaryHref.startsWith("http");

  const t = locale === "es"
    ? { title: titleEs, lede: ledeEs, primary: primaryTextEs, secondary: secondaryTextEs }
    : { title: titleEn, lede: ledeEn, primary: primaryTextEn, secondary: secondaryTextEn };

  return (
    <section className="py-20 bg-white border-t border-warm-100">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-10">
        <div className="bg-ink text-white rounded-[20px] px-12 py-16 md:py-20 text-center relative overflow-hidden">
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              right: -100, top: -100, width: 300, height: 300, borderRadius: "50%",
              background: "radial-gradient(circle,rgba(45,139,109,0.3),transparent 70%)",
            }}
          />
          <h2
            className="text-white font-semibold leading-[1.1] tracking-[-0.03em] mx-auto max-w-[22ch] relative"
            style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
          >
            {t.title}
          </h2>
          <p className="text-white/70 text-[16px] leading-[1.55] mt-6 mb-8 mx-auto max-w-[52ch] relative">
            {t.lede}
          </p>
          <div
            data-md="skip"
            className="flex flex-col sm:flex-row justify-center gap-3 flex-wrap relative"
          >
            {isExternalPrimary ? (
              <a
                href={resolvedPrimaryHref}
                className="inline-flex items-center justify-center gap-2 bg-white text-ink px-8 py-4 rounded-md text-[15px] font-semibold no-underline hover:brightness-95"
              >
                {t.primary}
              </a>
            ) : (
              <Link
                href={resolvedPrimaryHref}
                className="inline-flex items-center justify-center gap-2 bg-white text-ink px-8 py-4 rounded-md text-[15px] font-semibold no-underline hover:brightness-95"
              >
                {t.primary}
              </Link>
            )}
            {isExternalSecondary ? (
              <a
                href={resolvedSecondaryHref}
                className="inline-flex items-center justify-center gap-2 border border-white/25 text-white px-8 py-4 rounded-md text-[15px] font-semibold no-underline hover:bg-white/5"
              >
                {t.secondary}
              </a>
            ) : (
              <Link
                href={resolvedSecondaryHref}
                className="inline-flex items-center justify-center gap-2 border border-white/25 text-white px-8 py-4 rounded-md text-[15px] font-semibold no-underline hover:bg-white/5"
              >
                {t.secondary}
              </Link>
            )}
          </div>
          <p className="font-mono text-[11px] text-white/50 uppercase tracking-[0.1em] font-semibold mt-6 relative">
            {locale === "es"
              ? "Hecho por un founder · alojado en UE por diseño"
              : "Built by a founder · EU-hosted by design"}
          </p>
        </div>
      </div>
    </section>
  );
}
