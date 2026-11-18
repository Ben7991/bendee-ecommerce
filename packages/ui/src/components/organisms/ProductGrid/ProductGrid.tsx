import { Fragment, type ComponentProps, type ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { ProductCard, type ProductCardData, type ProductCardProps } from "../ProductCard";

/**
 * ProductGrid (organism): the PLP results: 2 columns on mobile and tablet, 3 on desktop.
 * An optional `promo` (PromoStrip) spans the grid after the first row (tablet and desktop).
 */
export interface ProductGridProps extends ComponentProps<"ul"> {
  products: ProductCardData[];
  /** Packshots keyed by product id. */
  images?: Record<string, ReactNode>;
  promo?: ReactNode;
  /** Every card is a saved favourite (the favourites page). */
  saved?: boolean;
  compactNotify?: ProductCardProps["compactNotify"];
  linkAs?: LinkComponent;
}

export function ProductGrid({ products, images = {}, promo, saved, compactNotify, linkAs, className, ...props }: ProductGridProps) {
  return (
    <ul
      data-slot="product-grid"
      className={cn("grid grid-cols-2 gap-x-2.5 gap-y-6 md:gap-x-3 md:gap-y-8 xl:grid-cols-3 xl:gap-x-4 xl:gap-y-10", className)}
      {...props}
    >
      {products.map((product, index) => (
        <Fragment key={product.id}>
          <li className="min-w-0">
            <ProductCard product={product} image={images[product.id]} saved={saved} compactNotify={compactNotify} linkAs={linkAs} />
          </li>
          {/* The first row is 2 wide on tablet and 3 on desktop. */}
          {promo && index === 1 && <li className="col-span-full hidden md:block xl:hidden">{promo}</li>}
          {promo && index === 2 && <li className="col-span-full hidden xl:block">{promo}</li>}
        </Fragment>
      ))}
    </ul>
  );
}
