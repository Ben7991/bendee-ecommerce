import type { ComponentProps } from "react";

import { cn, Slot, Slottable, type AsChildProps } from "../../../lib";
import { Icon } from "../../atoms";
import { filterButtonVariants, type FilterButtonVariantProps } from "./FilterButton.variants";

/**
 * FilterButton (molecule): one filter in an admin list's filter bar ("Status ⌄", "Last 7 days ×").
 * `applied` shows the chosen value with × to clear it; its accessible name says so. To make it a
 * link (e.g. clearing via the URL), pass an empty link with `asChild`.
 */
export interface FilterButtonProps extends ComponentProps<"button">, FilterButtonVariantProps, AsChildProps {
  label: string;
}

export function FilterButton({ label, variant, asChild = false, type, className, children, ...props }: FilterButtonProps) {
  const Comp = asChild ? Slot : "button";
  const applied = variant === "applied";
  return (
    <Comp
      data-slot="filter-button"
      type={asChild ? undefined : (type ?? "button")}
      aria-label={applied ? `${label}, clear filter` : undefined}
      className={cn(filterButtonVariants({ variant }), className)}
      {...props}
    >
      <Slottable>{children}</Slottable>
      {label}
      {applied ? (
        <Icon name="close" size={14} strokeWidth={2} className="text-text-secondary" />
      ) : (
        <Icon name="chevronDown" size={12} strokeWidth={2.2} className="text-text-muted" />
      )}
    </Comp>
  );
}
