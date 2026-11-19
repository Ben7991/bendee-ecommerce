import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { summaryCardVariants, type SummaryCardVariantProps } from "./SummaryCard.variants";

/**
 * SummaryCard (molecule): a small labelled card that sums something up with a "Manage" link
 * (default address, current subscription). `footer` sits under a rule ("Next delivery Tue 25 Nov").
 * Pass a TextLink as `action` (tone="inverse" on the feature card).
 */
export interface SummaryCardProps extends Omit<ComponentProps<"div">, "title">, SummaryCardVariantProps {
  eyebrow: ReactNode;
  action?: ReactNode;
  footer?: ReactNode;
  /** Classes for the footer row (e.g. `hidden md:flex`). */
  footerClassName?: string;
}

export function SummaryCard({ eyebrow, action, footer, footerClassName, tone, className, children, ...props }: SummaryCardProps) {
  return (
    <div data-slot="summary-card" className={cn(summaryCardVariants({ tone }), className)} {...props}>
      <div className="flex items-center justify-between gap-3">
        <p data-slot="summary-card-eyebrow" className="text-xs leading-xs font-semibold tracking-wide uppercase">
          {eyebrow}
        </p>
        {action && <div className="shrink-0 text-sm leading-xs">{action}</div>}
      </div>
      {children}
      {footer && (
        <div className={cn("mt-0.5 flex items-center gap-2 border-t pt-2.5 text-sm leading-sm", tone === "feature" ? "border-evergreen-800 dark:border-border" : "border-border-subtle", footerClassName)}>
          {footer}
        </div>
      )}
    </div>
  );
}
