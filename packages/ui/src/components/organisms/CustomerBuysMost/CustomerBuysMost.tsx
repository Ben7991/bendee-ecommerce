import { useId, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../../lib";

export interface BoughtProduct {
  id: string;
  name: string;
  /** "9 tubs · every ~4 wks". */
  detail: string;
  /** Packshot (next/image with `fill`). */
  image?: ReactNode;
  /** The tile behind the packshot. */
  tint?: "surface" | "sage" | "amber";
}

const TINT = { surface: "bg-surface", sage: "bg-sage-100", amber: "bg-tint-amber" } as const;

/**
 * CustomerBuysMost (organism): the products a customer buys most, as tiles in one row (Paper
 * Jofak - Admin → Customer detail → Buys most), with a note on how many orders it covers.
 * Desktop only in the design: hide it below 1440px from the page if you follow it.
 */
export interface CustomerBuysMostProps extends Omit<ComponentProps<"section">, "children"> {
  products: BoughtProduct[];
  /** "Across 14 orders". */
  meta?: ReactNode;
  title?: string;
}

export function CustomerBuysMost({ products, meta, title = "Buys most", className, ...props }: CustomerBuysMostProps) {
  const titleId = useId();
  return (
    <section data-slot="customer-buys-most" aria-labelledby={titleId} className={cn("flex flex-col rounded-lg border border-border-subtle font-sans", className)} {...props}>
      <div className="flex items-center justify-between px-5 py-4">
        <h2 id={titleId} className="text-md leading-5 font-semibold text-text">
          {title}
        </h2>
        {meta && <p className="text-xs leading-xs text-text-muted">{meta}</p>}
      </div>
      <ul className="flex gap-3 px-5 pb-4.5">
        {products.map((product) => (
          <li key={product.id} className="flex min-w-0 flex-1 basis-0 items-center gap-3 rounded-14 bg-surface-subtle p-3">
            <span className={cn("relative size-11 shrink-0 overflow-clip rounded-10", TINT[product.tint ?? "surface"])}>{product.image}</span>
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-14 leading-5 font-semibold text-text">{product.name}</span>
              <span className="truncate text-xs leading-xs text-text-muted">{product.detail}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
