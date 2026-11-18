import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Eyebrow } from "../../atoms";

/**
 * PromoStrip (organism): the evergreen "Subscribe & save" banner between product rows (Paper
 * PLP → Promo Strip). Stacked on tablet, one row on desktop. Pass a lime arrow Button as `action`.
 */
export interface PromoStripProps extends Omit<ComponentProps<"section">, "title"> {
  eyebrow?: string;
  /** Wrap the accent words in <em>. */
  title: ReactNode;
  action?: ReactNode;
}

export function PromoStrip({ eyebrow, title, action, className, ...props }: PromoStripProps) {
  return (
    <section
      data-slot="promo-strip"
      aria-label={eyebrow}
      className={cn(
        "relative flex flex-col items-start gap-5 overflow-hidden rounded-xl bg-gradient-feature p-8",
        "xl:flex-row xl:items-center xl:justify-between xl:gap-8 xl:px-10",
        className,
      )}
      {...props}
    >
      <svg aria-hidden viewBox="0 0 620 620" fill="none" strokeWidth={3} className="pointer-events-none absolute -top-30 -right-20 size-90">
        <circle cx="310" cy="310" r="300" className="stroke-accent/10" />
        <circle cx="310" cy="310" r="200" className="stroke-accent/14" />
      </svg>
      <div className="relative flex flex-col gap-2">
        {eyebrow && (
          <Eyebrow tone="accent" size="sm">
            {eyebrow}
          </Eyebrow>
        )}
        <p className="font-sans text-2xl leading-2xl font-medium tracking-snug text-text-inverse [&_em]:font-serif [&_em]:font-regular [&_em]:text-accent [&_em]:italic">
          {title}
        </p>
      </div>
      {action && <div className="relative shrink-0">{action}</div>}
    </section>
  );
}
