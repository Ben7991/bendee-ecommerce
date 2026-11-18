import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { eyebrowVariants } from "../../atoms";

/**
 * PopularCategories (organism): "Popular categories" and a row of CategoryTiles (no-results
 * page). Pills that wrap on mobile; 3 then 2 tiles on tablet; 5 in a row on desktop.
 */
export interface PopularCategoriesProps extends Omit<ComponentProps<"section">, "title"> {
  title?: string;
  /** CategoryTile elements. */
  children: ReactNode;
}

export function PopularCategories({ title = "Popular categories", className, children, ...props }: PopularCategoriesProps) {
  return (
    <section
      data-slot="popular-categories"
      aria-labelledby="popular-categories-title"
      className={cn("flex flex-col gap-3 px-5 pt-6 pb-8 md:gap-4 md:px-8 md:pt-10 md:pb-18 xl:px-14", className)}
      {...props}
    >
      <h2 id="popular-categories-title" className={eyebrowVariants({ size: "sm" })}>
        {title}
      </h2>
      <div className="flex flex-wrap gap-2 md:gap-3">{children}</div>
    </section>
  );
}
