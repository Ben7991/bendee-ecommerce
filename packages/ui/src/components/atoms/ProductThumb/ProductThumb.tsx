import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";
import { productThumbVariants, type ProductThumbVariantProps } from "./ProductThumb.variants";

/**
 * ProductThumb (atom): a product packshot on its soft tint, for order rows, the order
 * breakdown and returns. Pass the image (next/image with `fill`) as `image`; `quantity` adds the
 * evergreen count badge, `dimmed` fades it (refunded orders), `ring` outlines it for overlapping
 * stacks. Decorative: name the product in the surrounding text.
 */
export interface ProductThumbProps extends Omit<ComponentProps<"span">, "children">, ProductThumbVariantProps {
  image?: ReactNode;
  quantity?: number;
  dimmed?: boolean;
  /** A 2px page-coloured edge, for thumbs that overlap. */
  ring?: boolean;
  /** The image fills the tile edge to edge (admin packshots). */
  bleed?: boolean;
}

export function ProductThumb({ image, quantity, dimmed = false, ring = false, bleed = false, tint, size, className, ...props }: ProductThumbProps) {
  return (
    <span
      data-slot="product-thumb"
      aria-hidden
      className={cn(productThumbVariants({ tint, size }), dimmed && "opacity-muted", ring && "border-2 border-bg", className)}
      {...props}
    >
      {image && <span className={cn("absolute overflow-hidden", bleed ? "inset-0" : "inset-1.5")}>{image}</span>}
      {quantity !== undefined && (
        <span className="absolute -top-1.5 -right-1.5 flex size-5.5 items-center justify-center rounded-full bg-primary font-sans text-11 leading-3 font-bold text-text-inverse">
          {quantity}
        </span>
      )}
    </span>
  );
}
