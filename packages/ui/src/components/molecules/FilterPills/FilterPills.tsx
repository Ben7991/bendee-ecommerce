import type { ComponentProps } from "react";

import { cn, Slot, type AsChildProps } from "../../../lib";

/**
 * FilterPills (molecule): outlined status filters as links ("All · 4 / In progress / Delivered"),
 * the current one filled evergreen. Scrolls sideways when it doesn't fit. For in-page toggles
 * without navigation use FilterTabs.
 */
export type FilterPillsProps = ComponentProps<"nav">;

export function FilterPills({ className, children, ...props }: FilterPillsProps) {
  return (
    <nav data-slot="filter-pills" className={cn("min-w-0 font-sans", className)} {...props}>
      <ul className="scrollbar-none flex gap-2 overflow-x-auto">{children}</ul>
    </nav>
  );
}

export interface FilterPillProps extends ComponentProps<"a">, AsChildProps {
  active?: boolean;
}

export function FilterPill({ active = false, asChild = false, className, ...props }: FilterPillProps) {
  const Comp = asChild ? Slot : "a";
  return (
    <li className="shrink-0">
      <Comp
        data-slot="filter-pill"
        aria-current={active ? "page" : undefined}
        className={cn(
          "block rounded-full border px-4 py-2.25 text-sm leading-xs whitespace-nowrap transition-colors",
          active ? "border-primary bg-primary font-semibold text-text-inverse" : "border-border text-text-secondary hover:text-text",
          className,
        )}
        {...props}
      />
    </li>
  );
}
