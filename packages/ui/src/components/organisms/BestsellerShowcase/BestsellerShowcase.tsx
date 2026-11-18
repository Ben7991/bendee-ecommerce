"use client";

import { useState, type ComponentProps, type ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Heading } from "../../atoms";
import { FilterTabs, SectionHeader, type FilterOption } from "../../molecules";
import { ProductCard, type ProductCardData } from "../ProductCard";

export interface ShowcaseItem extends ProductCardData {
  /** Matches a filter option value. */
  category: string;
  /** Shown in the 2-up mobile grid. */
  showOnMobile?: boolean;
}

/**
 * BestsellerShowcase (organism): filterable bestseller grid.
 *   mobile: title + "Shop all", 2 products; tablet: title, filters, 2 × 2; desktop: filters beside
 *   the title, 4 across (4 across from 1024px).
 */
export interface BestsellerShowcaseProps extends Omit<ComponentProps<"section">, "title"> {
  title: ReactNode;
  compactTitle: ReactNode;
  filters: FilterOption[];
  /** The "show everything" filter value. */
  allValue?: string;
  products: ShowcaseItem[];
  /** Packshots by product id. */
  images?: Record<string, ReactNode>;
  shopAllHref: string;
  linkAs?: LinkComponent;
}

export function BestsellerShowcase({
  title,
  compactTitle,
  filters,
  allValue = "all",
  products,
  images = {},
  shopAllHref,
  linkAs: Link = "a",
  className,
  ...props
}: BestsellerShowcaseProps) {
  const [filter, setFilter] = useState(allValue);
  const visible = filter === allValue ? products : products.filter((product) => product.category === filter);

  return (
    <section
      data-slot="bestseller-showcase"
      aria-labelledby="bestsellers-title"
      className={cn("flex flex-col gap-5 px-5 pt-12 md:gap-10 md:px-10 md:pt-18 xl:px-14 xl:pt-20 xl:pb-14", className)}
      {...props}
    >
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <SectionHeader
          eyebrow="Bestsellers"
          eyebrowClassName="max-md:hidden"
          title={
            <Heading id="bestsellers-title">
              <span className="md:hidden">{compactTitle}</span>
              <span className="hidden md:inline">{title}</span>
            </Heading>
          }
          aside={
            <Link
              href={shopAllHref}
              className="shrink-0 font-sans text-14 leading-4.5 font-semibold text-brand underline underline-offset-2 md:hidden"
            >
              Shop all
            </Link>
          }
        />
        <FilterTabs
          aria-label="Filter bestsellers"
          options={filters}
          value={filter}
          onValueChange={setFilter}
          className="hidden md:flex"
        />
      </div>

      <ul className="grid grid-cols-2 gap-2.5 md:gap-4 lg:grid-cols-4" aria-live="polite">
        {visible.map((product) => (
          <li key={product.id} className={cn(!product.showOnMobile && "hidden md:block")}>
            <ProductCard product={product} image={images[product.id]} linkAs={Link} className="h-full" />
          </li>
        ))}
        {visible.length === 0 && (
          <li className="col-span-full py-12 text-center font-sans text-base text-text-muted">
            No bestsellers in this category yet.
          </li>
        )}
      </ul>
    </section>
  );
}
