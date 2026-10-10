/**
 * Horizontal bar chart drawn in HTML, not as an image: every value is visible
 * text, so search engines and AI answer engines read the data, screen readers
 * get a plain ordered list, and it reflows on a phone (the bar drops below the
 * label). Same pattern as the sector study bars (`SectorReportSignal`), in the
 * blog's Tailwind tokens so it sits next to the post tables.
 *
 * content-agent writes these from a ```chart block in the approved markdown,
 * so the props stay plain JSON: no functions, no JSX inside items.
 *
 * Rules for the data (caller's responsibility, enforced by the quality rater):
 *   - Every number comes from a source named in `source` (own test, vendor page).
 *   - `checkedOn` is the date the numbers were verified (YYYY-MM-DD).
 *   - Use `display` when the raw value needs a format ("€499/mo", "86 KB").
 */
export type DataBarItem = {
  label: string;
  value: number;
  /** Text shown instead of `value` + `unit`, e.g. "€499/mo". */
  display?: string;
  note?: string;
};

export function DataBars({
  title,
  items,
  unit = "",
  max,
  source,
  sourceUrl,
  checkedOn,
  sourceLabel = "Source",
  checkedLabel = "checked",
}: {
  title: string;
  items: DataBarItem[];
  unit?: string;
  /** Value that fills the whole track. Defaults to the largest value. */
  max?: number;
  source?: string;
  sourceUrl?: string;
  checkedOn?: string;
  sourceLabel?: string;
  checkedLabel?: string;
}) {
  const rows = items.filter((item) => Number.isFinite(item.value));
  if (rows.length === 0) return null;
  const top = max && max > 0 ? max : Math.max(...rows.map((item) => item.value), 0);

  return (
    <figure className="my-8">
      <figcaption className="font-serif text-[1.1rem] font-medium text-text-primary mb-4">
        {title}
      </figcaption>
      <ol className="list-none m-0 p-0 grid gap-3">
        {rows.map((item) => {
          const share = top > 0 ? Math.min(100, Math.max(0, (item.value / top) * 100)) : 0;
          return (
            <li
              key={item.label}
              // Fixed value column on desktop: every row is its own grid, so an
              // auto column would start each bar at a different x.
              className="grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_10ch] gap-x-3 gap-y-1.5 items-center text-[0.9rem]"
            >
              <span className="text-text-primary">
                {item.label}
                {item.note ? <small className="text-text-tertiary"> · {item.note}</small> : null}
              </span>
              <span
                className="order-3 col-span-full sm:order-none sm:col-span-1 h-2.5 bg-warm-50 border border-warm-200"
                aria-hidden="true"
              >
                <span className="block h-full bg-text-primary" style={{ width: `${share}%` }} />
              </span>
              <span className="font-mono text-[0.8rem] text-right min-w-[5ch] text-text-secondary">
                {item.display ?? `${item.value}${unit}`}
              </span>
            </li>
          );
        })}
      </ol>
      {source || checkedOn ? (
        <p className="mt-3 text-[0.8rem] text-text-tertiary">
          {source ? (
            <>
              {sourceLabel}:{" "}
              {sourceUrl ? (
                <a href={sourceUrl} className="underline">
                  {source}
                </a>
              ) : (
                source
              )}
            </>
          ) : null}
          {source && checkedOn ? " · " : null}
          {checkedOn ? `${checkedLabel} ${checkedOn}` : null}
        </p>
      ) : null}
    </figure>
  );
}
