import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon, type IconName } from "../../atoms";

export interface Benefit {
  icon: IconName;
  title: string;
  text: ReactNode;
  /** Evergreen card with lime icon (one per row, e.g. "Lab tested"). */
  featured?: boolean;
}

/**
 * BenefitCards (organism): the four "why it works" cards under the PDP buy box (Paper PDP →
 * Benefits Strip). One row on desktop, 2 × 2 on tablet, not shown on mobile.
 */
export interface BenefitCardsProps extends ComponentProps<"ul"> {
  benefits: Benefit[];
}

export function BenefitCards({ benefits, className, ...props }: BenefitCardsProps) {
  return (
    <ul data-slot="benefit-cards" className={cn("hidden flex-wrap gap-3 font-sans md:flex xl:flex-nowrap", className)} {...props}>
      {benefits.map((benefit) => (
        <li
          key={benefit.title}
          className={cn(
            "flex min-w-70 flex-1 basis-70 flex-col gap-3 rounded-xl p-6 xl:min-w-0 xl:basis-0",
            benefit.featured ? "bg-feature" : "bg-surface",
          )}
        >
          <Icon name={benefit.icon} size={28} className={benefit.featured ? "text-accent" : "text-brand"} />
          <h3 className={cn("text-xl leading-base font-semibold", benefit.featured ? "text-text-inverse" : "text-text")}>
            {benefit.title}
          </h3>
          <p
            className={cn(
              "text-sm leading-sm [&_a]:underline [&_a]:underline-offset-2",
              benefit.featured ? "text-text-inverse-muted dark:text-on-feature-muted [&_a]:text-accent" : "text-text-muted [&_a]:text-brand",
            )}
          >
            {benefit.text}
          </p>
        </li>
      ))}
    </ul>
  );
}
