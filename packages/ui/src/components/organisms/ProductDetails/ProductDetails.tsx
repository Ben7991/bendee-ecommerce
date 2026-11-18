import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon } from "../../atoms";

export interface DetailSection {
  id: string;
  title: string;
  content: ReactNode;
  defaultOpen?: boolean;
  /** Only in the mobile accordion (e.g. Supplement facts, which has its own panel from 768px). */
  mobileOnly?: boolean;
}

/**
 * ProductDetails (organism): the PDP accordion (Description, How to use, Specifications,
 * Delivery & returns) with an optional `aside` (SupplementFacts) beside it on desktop and under it
 * on tablet; the aside isn't shown on mobile. Sections are native <details>, so they work
 * without JavaScript.
 */
export interface ProductDetailsProps extends ComponentProps<"section"> {
  sections: DetailSection[];
  aside?: ReactNode;
}

export function ProductDetails({ sections, aside, className, ...props }: ProductDetailsProps) {
  return (
    <section
      data-slot="product-details"
      aria-label="Product details"
      className={cn("flex flex-col gap-8 font-sans xl:flex-row xl:items-start xl:gap-14", className)}
      {...props}
    >
      <div className="flex min-w-0 flex-1 flex-col">
        {sections.map((section) => (
          <details
            key={section.id}
            id={section.id}
            open={section.defaultOpen}
            className={cn(
              "group/detail border-t border-border-subtle py-5 last:border-b md:py-6",
              section.mobileOnly && "md:hidden",
              // On mobile the last section has no bottom rule (Paper), from 768px it does.
              "max-md:last:border-b-0",
            )}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm text-xl leading-base font-semibold text-text md:text-2xl md:leading-8 md:font-medium md:tracking-snug [&::-webkit-details-marker]:hidden">
              {section.title}
              <Icon name="plus" size={20} strokeWidth={2} className="size-4.5 group-open/detail:hidden md:size-5" />
              <Icon name="minus" size={20} strokeWidth={2} className="hidden size-4.5 group-open/detail:block md:size-5" />
            </summary>
            <div className="flex flex-col gap-4 pt-3 text-base leading-base text-text-secondary md:pt-4 md:text-md">{section.content}</div>
          </details>
        ))}
      </div>
      {aside && <div className="hidden md:block xl:w-130 xl:shrink-0">{aside}</div>}
    </section>
  );
}
