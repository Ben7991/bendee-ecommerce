import type { ComponentProps } from "react";

import { cn, Slot, Slottable, type AsChildProps } from "../../../lib";
import { categoryTileVariants, type CategoryTileVariantProps } from "./CategoryTile.variants";

/**
 * CategoryTile (molecule): a tinted category shortcut, "Sleep & Stress · 14 products". A pill on
 * mobile ("Sleep & Stress", or "Sleep & Stress · 14" with `compactCount`); a tile or a row from
 * 768px. Pass the link with `asChild`.
 */
export interface CategoryTileProps extends ComponentProps<"a">, CategoryTileVariantProps, AsChildProps {
  /** Products in the category. */
  count?: number;
  /** Show " · 14" after the name on mobile. */
  compactCount?: boolean;
}

export function CategoryTile({ variant, tint, count, compactCount = false, asChild = false, className, children, ...props }: CategoryTileProps) {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp data-slot="category-tile" className={cn(categoryTileVariants({ variant, tint }), className)} {...props}>
      <Slottable>{children}</Slottable>
      {count !== undefined && (
        <>
          {compactCount && <span className="md:hidden">&nbsp;· {count}</span>}
          <span className="hidden text-sm leading-xs font-regular text-text-muted md:inline">
            <span className="sr-only">, </span>
            {count} products
          </span>
        </>
      )}
    </Comp>
  );
}
