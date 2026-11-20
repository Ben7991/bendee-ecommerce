import { useId, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";

/**
 * AttentionPanel (organism): "Needs your attention": a heading, when it was refreshed, and the
 * TaskTiles that link to each queue. Tiles wrap two per row on mobile (an odd last tile spans
 * the row), three on tablet and sit in one row from 1440px.
 */
export interface AttentionPanelProps extends Omit<ComponentProps<"section">, "title"> {
  title?: ReactNode;
  /** "Updated 2 min ago". */
  meta?: ReactNode;
}

export function AttentionPanel({ title = "Needs your attention", meta, className, children, ...props }: AttentionPanelProps) {
  const titleId = useId();
  return (
    <section data-slot="attention-panel" aria-labelledby={titleId} className={cn("flex flex-col gap-3.5 font-sans", className)} {...props}>
      <div className="flex items-baseline justify-between gap-4">
        <h2 id={titleId} className="text-lg leading-base font-semibold tracking-compact text-text">
          {title}
        </h2>
        {meta && <p className="text-sm leading-sm text-text-muted">{meta}</p>}
      </div>
      <div className="flex flex-wrap gap-3 *:grow *:basis-2/5 md:*:basis-1/4 xl:flex-nowrap xl:*:basis-0">{children}</div>
    </section>
  );
}
