import type { ComponentProps } from "react";

import { cn, Slot, Slottable, type AsChildProps } from "../../../lib";
import { Icon } from "../../atoms";
import { filterChipIconVariants, filterChipVariants, type FilterChipVariantProps } from "./FilterChip.variants";

/**
 * FilterChip (molecule): an applied filter with a × that removes it ("GHS 150 – 700 ×").
 * A button by default; pass a link with `asChild` when removing is a navigation:
 *   <FilterChip asChild aria-label="Remove filter: Vegan"><Link href="/shop">Vegan</Link></FilterChip>
 * Give it an aria-label that says what pressing it does. For selectable options use ChipGroup.
 */
export interface FilterChipProps extends ComponentProps<"button">, FilterChipVariantProps, AsChildProps {}

export function FilterChip({ className, size, asChild = false, type, children, ...props }: FilterChipProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="filter-chip"
      type={asChild ? undefined : (type ?? "button")}
      className={cn(filterChipVariants({ size }), className)}
      {...props}
    >
      <Slottable>{children}</Slottable>
      <Icon name="close" size={14} strokeWidth={2.4} className={filterChipIconVariants({ size })} />
    </Comp>
  );
}
