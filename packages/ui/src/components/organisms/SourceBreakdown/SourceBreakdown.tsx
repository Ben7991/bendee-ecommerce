import type { ComponentProps } from "react";

import { cn, type LinkComponent } from "../../../lib";

export interface OrderSource {
  label: string;
  /** Share of orders, 0–100. */
  share: number;
  /** Bar colour, darkest for the biggest source; `accent` marks recovery messages. */
  tone: "primary" | "brand" | "strong" | "soft" | "accent";
}

/**
 * SourceBreakdown (organism): where orders came from (Paper Jofak - Admin → Marketing → Orders by
 * source): one labelled bar per source with its share, and a link to the full report. Hidden on
 * mobile by the page.
 */
export interface SourceBreakdownProps extends Omit<ComponentProps<"section">, "children"> {
  linkAs?: LinkComponent;
  title?: string;
  /** "Last touch · 412 orders". */
  note?: string;
  sources: OrderSource[];
  report?: { href: string; label?: string };
}

const FILL = { primary: "bg-primary", brand: "bg-brand", strong: "bg-evergreen-500", soft: "bg-evergreen-300", accent: "bg-accent" } as const;

export function SourceBreakdown({ linkAs: LinkAs = "a", title = "Orders by source", note, sources, report, className, ...props }: SourceBreakdownProps) {
  return (
    <section data-slot="source-breakdown" aria-label={title} className={cn("flex flex-col gap-3.5 rounded-lg border border-border-subtle p-5 font-sans", className)} {...props}>
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-md leading-5.5 font-semibold text-text">{title}</h2>
        {note && <p className="text-xs leading-xs text-text-muted">{note}</p>}
      </div>
      <ul className="flex flex-col gap-3.5">
        {sources.map((source) => (
          <li key={source.label} className="flex flex-col gap-1.5">
            <span className="flex justify-between gap-3 text-sm leading-4.5 text-text">
              <span className="font-medium">{source.label}</span>
              <span className="font-semibold">{source.share}%</span>
            </span>
            <span aria-hidden className="h-2 rounded-full bg-surface-subtle">
              <span className={cn("block h-full rounded-full", FILL[source.tone])} style={{ width: `${Math.min(100, source.share)}%` }} />
            </span>
          </li>
        ))}
      </ul>
      {report && (
        <LinkAs href={report.href} className="w-fit text-sm leading-4.5 font-semibold text-text hover:underline">
          {report.label ?? "Full report in Reports ›"}
        </LinkAs>
      )}
    </section>
  );
}
