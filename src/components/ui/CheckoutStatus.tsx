import Link from "next/link";

type Action = { label: string; href: string };

/**
 * Landing for the Quaderno checkout redirects (/checkout/success and
 * /checkout/cancel). A page for the person who just paid, or just didn't —
 * both routes are noindex and Disallowed for every crawler in robots.txt.
 */
export function CheckoutStatus({
  eyebrow,
  title,
  emphasis,
  body,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  emphasis: string;
  body: string[];
  primary: Action;
  secondary: Action;
}) {
  return (
    <section className="bg-paper-white border-b border-hairline min-h-[70vh]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 pt-16 pb-20 md:pt-20 md:pb-28">
        <div className="max-w-[920px]">
          <span className="eyebrow mb-6 block">{eyebrow}</span>
          <h1 className="h-display mt-4">
            {title} <em>{emphasis}</em>
          </h1>
          {body.map((p) => (
            <p key={p} className="mt-8 text-[19px] leading-[1.6] text-ink-soft max-w-[68ch]">
              {p}
            </p>
          ))}
          <div data-md="skip" className="mt-12 flex flex-wrap gap-4">
            <Link
              href={primary.href}
              className="inline-block bg-acid text-ink border border-ink shadow-hard px-7 py-4 font-semibold transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              {primary.label}
            </Link>
            <Link
              href={secondary.href}
              className="inline-block bg-paper-white text-ink border border-ink px-7 py-4 font-semibold transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              {secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
