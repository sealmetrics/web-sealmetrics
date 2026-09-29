import Link from "next/link";

type Locale = "en" | "es";

// Primary is the assisted path (demo): the ICP is a CMO/eCommerce manager at a
// 10M€+ company who buys assisted, not self-serve. The free account stays as
// the secondary path for technical evaluators. "Free" is honest: registration
// takes no card and the first 1M events (in total, not per month) cost nothing.
const COPY = {
  en: { primary: "Book a demo", secondary: "Start free" },
  es: { primary: "Reserva una demo", secondary: "Empieza gratis" },
} as const;

export function DualCTA({
  locale = "en",
  className = "",
  variant = "default",
  size = "md",
}: {
  locale?: Locale;
  className?: string;
  variant?: "default" | "dark" | "compact";
  size?: "sm" | "md";
}) {
  const c = COPY[locale];
  const demoHref = locale === "es" ? "/es/demo" : "/demo";

  const sizeClasses =
    size === "sm" ? "px-5 py-2.5 text-[13.5px]" : "px-7 py-4 text-[15px]";

  const primary =
    variant === "dark"
      ? "bg-white text-ink hover:brightness-95"
      : "bg-ink text-white hover:bg-brand";
  const secondary =
    variant === "dark"
      ? "border border-white/25 text-white hover:bg-white/5"
      : "border border-warm-200 text-ink hover:bg-warm-50";

  return (
    <div data-md="skip" className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <Link
        href={demoHref}
        className={`inline-flex items-center justify-center gap-2 rounded-md font-semibold no-underline transition-colors ${sizeClasses} ${primary}`}
      >
        {c.primary} <span>→</span>
      </Link>
      <a
        href="https://my.sealmetrics.com/register"
        className={`inline-flex items-center justify-center gap-2 rounded-md font-semibold no-underline transition-colors ${sizeClasses} ${secondary}`}
      >
        {c.secondary}
      </a>
    </div>
  );
}
