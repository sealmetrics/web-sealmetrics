import type { ReactNode } from "react";
import { parseBlocks } from "@/lib/legal/markdown.mjs";
import { localiseHref, type LegalLocale } from "@/lib/legal/documents";
import { CopyBlock } from "./CopyBlock";

type Inline =
  | { t: "text"; v: string }
  | { t: "code"; v: string }
  | { t: "strong" | "em"; c: Inline[] }
  | { t: "link"; href: string; c: Inline[] };
type ListItem = { inline: Inline[]; checked?: boolean; children: Block[] };
type Block =
  | { type: "heading"; level: number; id: string; text: Inline[]; raw: string }
  | { type: "paragraph"; lines: Inline[][] }
  | { type: "list"; ordered: boolean; start: number; items: ListItem[] }
  | { type: "table"; header: Inline[][]; rows: Inline[][][] }
  | { type: "quote"; children: Block[] }
  | { type: "hr" };

/** A block of the customer template that gets a copy button: "Block A — …" to "Block F". */
const COPYABLE = /^(Block|Bloque) ([A-F])\b/;

const COPY_LABELS = {
  en: { copy: (letter: string) => `Copy block ${letter}`, copied: "Copied", failed: "Select and copy it by hand" },
  es: { copy: (letter: string) => `Copiar bloque ${letter}`, copied: "Copiado", failed: "Selecciónalo y cópialo a mano" },
};

/**
 * One of the legal documents synced from sealmetrics2, rendered with the styles the
 * legal pages already used. The text is the canonical Markdown untouched; only
 * links are pointed at this site's routes for the page's language.
 */
export function LegalDocument({
  markdown,
  locale,
  copyBlocks = false,
}: {
  markdown: string;
  locale: LegalLocale;
  copyBlocks?: boolean;
}) {
  const blocks = parseBlocks(markdown) as Block[];
  const r = new Renderer(locale);
  return (
    <div className="space-y-4 text-[0.95rem] leading-[1.75] text-text-secondary">
      {copyBlocks ? r.withCopyBlocks(blocks) : blocks.map((block, i) => r.block(block, i))}
    </div>
  );
}

class Renderer {
  constructor(private locale: LegalLocale) {}

  inline(tokens: Inline[]): ReactNode[] {
    return tokens.map((token, i) => {
      switch (token.t) {
        case "text":
          return token.v;
        case "code":
          return (
            <code key={i} className="font-mono text-[0.85em] bg-warm-white px-1 py-0.5 text-text-primary">
              {token.v}
            </code>
          );
        case "strong":
          return (
            <strong key={i} className="font-semibold text-text-primary">
              {this.inline(token.c)}
            </strong>
          );
        case "em":
          return <em key={i}>{this.inline(token.c)}</em>;
        case "link":
          return (
            <a key={i} href={localiseHref(token.href, this.locale)} className="underline">
              {this.inline(token.c)}
            </a>
          );
      }
    });
  }

  block(block: Block, key: number | string): ReactNode {
    switch (block.type) {
      case "heading":
        return this.heading(block, key);
      case "paragraph":
        return (
          <p key={key}>
            {block.lines.map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {this.inline(line)}
              </span>
            ))}
          </p>
        );
      case "list":
        return this.list(block, key);
      case "table":
        return (
          <div key={key} className="overflow-x-auto my-4">
            <table className="w-full text-[0.88rem] border border-warm-100">
              <thead>
                <tr className="bg-warm-white font-medium text-text-primary text-left">
                  {block.header.map((cell, i) => (
                    <th key={i} scope="col" className="px-3 py-2 align-top font-medium">
                      {this.inline(cell)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, i) => (
                  <tr key={i} className="border-t border-warm-100">
                    {row.map((cell, j) => (
                      <td key={j} className="px-3 py-2 align-top">
                        {this.inline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "quote":
        return (
          <blockquote key={key} className="border-l-[3px] border-warm-200 pl-4 text-[0.9rem] text-text-tertiary space-y-2">
            {block.children.map((child, i) => this.block(child, i))}
          </blockquote>
        );
      case "hr":
        return <hr key={key} className="border-0 border-t border-warm-100 my-8" />;
    }
  }

  heading(block: Extract<Block, { type: "heading" }>, key: number | string): ReactNode {
    const text = this.inline(block.text);
    if (block.level <= 2) {
      return (
        <h2 key={key} id={block.id} className="font-serif text-[1.3rem] font-medium text-text-primary mb-3 mt-10 scroll-mt-24">
          {text}
        </h2>
      );
    }
    if (block.level === 3) {
      return (
        <h3 key={key} id={block.id} className="text-[1.02rem] font-semibold text-text-primary mt-6 mb-2 scroll-mt-24">
          {text}
        </h3>
      );
    }
    return (
      <h4 key={key} id={block.id} className="text-[0.95rem] font-semibold text-text-primary mt-5 mb-1 scroll-mt-24">
        {text}
      </h4>
    );
  }

  list(block: Extract<Block, { type: "list" }>, key: number | string): ReactNode {
    const items = block.items.map((item, i) => (
      <li key={i} className="flex items-start gap-3">
        <span className="text-text-tertiary shrink-0 tabular-nums" aria-hidden="true">
          {item.checked !== undefined ? (
            <span className="inline-block w-3 h-3 mt-[0.45em] border border-text-tertiary" />
          ) : block.ordered ? (
            `${block.start + i}.`
          ) : (
            "—"
          )}
        </span>
        <div className="min-w-0 flex-1">
          {this.inline(item.inline)}
          {item.children.map((child, j) => (
            <div key={j} className="mt-1">
              {this.block(child, j)}
            </div>
          ))}
        </div>
      </li>
    ));
    return block.ordered ? (
      <ol key={key} start={block.start} className="space-y-1 pl-0 list-none">
        {items}
      </ol>
    ) : (
      <ul key={key} className="space-y-1 pl-0 list-none">
        {items}
      </ul>
    );
  }

  /** The template page: each "Block X" heading, then its policy text inside a copy box.
   * A note to the customer (a blockquote) stays outside the box — it is advice to them,
   * not text for their visitors. */
  withCopyBlocks(blocks: Block[]): ReactNode[] {
    const out: ReactNode[] = [];
    let i = 0;
    while (i < blocks.length) {
      const block = blocks[i];
      const match = block.type === "heading" && block.level === 3 ? COPYABLE.exec(block.raw) : null;
      if (!match) {
        out.push(this.block(block, i));
        i++;
        continue;
      }
      out.push(this.block(block, i));
      i++;
      const inside: Block[] = [];
      const after: Block[] = [];
      while (i < blocks.length) {
        const next = blocks[i];
        if (next.type === "hr" || (next.type === "heading" && next.level <= 3)) break;
        (next.type === "quote" ? after : inside).push(next);
        i++;
      }
      const labels = COPY_LABELS[this.locale];
      out.push(
        <CopyBlock key={`copy-${i}`} label={labels.copy(match[2])} copiedLabel={labels.copied} failedLabel={labels.failed}>
          <div className="space-y-4">{inside.map((child, j) => this.block(child, j))}</div>
        </CopyBlock>,
      );
      after.forEach((child, j) => out.push(this.block(child, `after-${i}-${j}`)));
    }
    return out;
  }
}
