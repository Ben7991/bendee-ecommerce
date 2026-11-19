import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

/**
 * ContentHero (organism): the top of a content page (Paper Content pages → Hub Header).
 *   mobile:  one sage gradient behind the header, search, breadcrumb, title and a short line
 *   tablet:  the header on white; breadcrumb, title and description stacked, ruled below
 *   desktop: title left, description bottom-right, ruled below
 */
export interface ContentHeroProps extends Omit<ComponentProps<"section">, "title"> {
  /** The site header (StorefrontHeader). */
  header?: ReactNode;
  /** Search bar, mobile only. */
  search?: ReactNode;
  breadcrumbs?: ReactNode;
  title: ReactNode;
  /** Tablet and desktop (and mobile when there's no `compactDescription`). */
  description?: ReactNode;
  /** A shorter line for mobile. */
  compactDescription?: ReactNode;
}

const descriptionClass = "max-w-105 font-sans text-base leading-5.5 text-text-secondary md:max-w-130 md:text-md md:leading-base xl:max-w-105 xl:pb-1.5";

export function ContentHero({
  header,
  search,
  breadcrumbs,
  title,
  description,
  compactDescription,
  className,
  ...props
}: ContentHeroProps) {
  return (
    <section
      data-slot="content-hero"
      aria-label={typeof title === "string" ? title : undefined}
      className={cn("flex flex-col gap-5 rounded-b-2xl bg-gradient-hero pb-6 md:gap-0 md:rounded-none md:bg-none md:pb-0", className)}
      {...props}
    >
      {header}
      {search && <div className="px-5 md:hidden">{search}</div>}

      <div className="flex flex-col gap-3 px-5 pt-2 pb-5 md:gap-4 md:border-b md:border-border-subtle md:px-7 md:pt-5 md:pb-7 xl:gap-5 xl:px-14 xl:pt-6 xl:pb-10">
        {breadcrumbs}
        <div className="flex flex-col gap-2 md:gap-3 xl:flex-row xl:items-end xl:justify-between xl:gap-10">
          <h1 className="font-sans text-3xl leading-3xl font-medium tracking-display text-text md:text-4xl md:leading-4xl xl:text-5xl xl:leading-5xl">
            {title}
          </h1>
          {compactDescription && <p className={cn(descriptionClass, "md:hidden")}>{compactDescription}</p>}
          {description && <p className={cn(descriptionClass, compactDescription && "hidden md:block")}>{description}</p>}
        </div>
      </div>
    </section>
  );
}
