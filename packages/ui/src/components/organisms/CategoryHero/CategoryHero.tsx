import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

/**
 * CategoryHero (organism): the top of a product listing (Paper PLP → Category Header).
 *   mobile:  one sage gradient behind the header, search, breadcrumb, title, a one-line summary
 *            and the goal pills (bleeding off the right edge).
 *   tablet+: the header sits on white; the rest is a rounded sage card with a sunburst, a
 *            longer description and the product count on the right.
 */
export interface CategoryHeroProps extends Omit<ComponentProps<"section">, "title"> {
  /** The site header (StorefrontHeader). */
  header?: ReactNode;
  /** Search bar, mobile only. */
  search?: ReactNode;
  breadcrumbs?: ReactNode;
  /** Wrap the accent word in <em>. */
  title: ReactNode;
  /** Tablet and desktop. */
  description?: ReactNode;
  /** Mobile, e.g. "64 products · tested for purity & potency". */
  compactDescription?: ReactNode;
  /** "64" on the right from 768px. */
  count?: ReactNode;
  countLabel?: string;
  /** CategoryPills. */
  pills?: ReactNode;
}

export function CategoryHero({
  header,
  search,
  breadcrumbs,
  title,
  description,
  compactDescription,
  count,
  countLabel = "products",
  className,
  pills,
  ...props
}: CategoryHeroProps) {
  return (
    <section
      data-slot="category-hero"
      aria-label={typeof title === "string" ? title : undefined}
      className={cn("flex flex-col gap-5 rounded-b-2xl bg-gradient-hero pb-6 md:gap-0 md:rounded-none md:bg-none md:pb-0", className)}
      {...props}
    >
      {header}
      {search && <div className="px-5 md:hidden">{search}</div>}

      <div className="relative flex flex-col gap-5 md:gap-6 md:overflow-hidden md:rounded-2xl md:bg-linear-to-b md:from-sage-50 md:to-sage-200 md:p-8 xl:gap-8 xl:px-14 xl:pt-10 xl:pb-12">
        <Sunburst />
        <div className="relative flex flex-col gap-2 px-5 pt-2 md:contents">
          {breadcrumbs && <div className="relative">{breadcrumbs}</div>}
          <div className="relative flex items-end justify-between gap-6">
            <div className="flex flex-col gap-2 md:gap-3 xl:gap-4">
              <h1 className="font-sans text-4xl leading-4xl font-medium tracking-display text-text md:text-5xl md:leading-5xl xl:text-6xl xl:leading-6xl [&_em]:font-serif [&_em]:font-regular [&_em]:tracking-compact [&_em]:text-brand [&_em]:italic">
                {title}
              </h1>
              {compactDescription && <p className="font-sans text-sm leading-xs text-text-muted md:hidden">{compactDescription}</p>}
              {description && (
                <p className="hidden max-w-110 font-sans text-md leading-base text-text-secondary md:block xl:max-w-130 xl:text-lg xl:leading-lg">
                  {description}
                </p>
              )}
            </div>
            {count !== undefined && (
              <p className="hidden shrink-0 flex-col items-end gap-1 font-sans md:flex">
                <span className="text-3xl leading-10 font-medium tracking-tight text-text xl:text-4xl xl:leading-13.5">{count}</span>
                <span className="text-sm leading-xs text-text-muted">{countLabel}</span>
              </p>
            )}
          </div>
        </div>
        {pills && <div className="relative pl-5 md:-mr-8 md:pl-0 xl:mr-0">{pills}</div>}
      </div>
    </section>
  );
}

/** Soft rays in the card's top-right corner (Paper "Sunburst"). */
function Sunburst() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 520 520"
      className="pointer-events-none absolute -top-35 -right-20 hidden size-130 stroke-bg/75 md:block dark:stroke-sage-200 xl:-top-30 xl:right-30"
      fill="none"
      strokeWidth={34}
      strokeLinecap="round"
    >
      <line x1="260" y1="40" x2="260" y2="120" />
      <line x1="370" y1="70" x2="330" y2="140" />
      <line x1="450" y1="150" x2="380" y2="190" />
      <line x1="150" y1="70" x2="190" y2="140" />
      <line x1="70" y1="150" x2="140" y2="190" />
    </svg>
  );
}
