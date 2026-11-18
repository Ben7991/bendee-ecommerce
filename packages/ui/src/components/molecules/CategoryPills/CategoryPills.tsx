import type { ComponentProps } from "react";

import { cn, Slot, Slottable, type AsChildProps } from "../../../lib";

/**
 * CategoryPills (molecule): the goal shortcuts under a category title ("All 64 · Sleep & Stress 14 …").
 * White pills on the sage header, the current one evergreen with a lime count. Scrolls sideways
 * when it doesn't fit. Compose with CategoryPill and pass links through `asChild`:
 *   <CategoryPills aria-label="Shop by goal">
 *     <CategoryPill asChild active count={64}><Link href="/shop">All</Link></CategoryPill>
 *   </CategoryPills>
 */
export type CategoryPillsProps = ComponentProps<"nav">;

export function CategoryPills({ className, children, ...props }: CategoryPillsProps) {
  return (
    <nav data-slot="category-pills" className={cn("min-w-0", className)} {...props}>
      <ul className="scrollbar-none flex gap-2 overflow-x-auto">{children}</ul>
    </nav>
  );
}

export interface CategoryPillProps extends ComponentProps<"a">, AsChildProps {
  active?: boolean;
  /** Product count, shown from 768px. */
  count?: number;
}

export function CategoryPill({ active = false, count, asChild = false, className, children, ...props }: CategoryPillProps) {
  const Comp = asChild ? Slot : "a";
  return (
    <li className="shrink-0">
      <Comp
        data-slot="category-pill"
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex items-center gap-2 rounded-full px-3.5 py-2 font-sans text-sm leading-xs font-medium whitespace-nowrap transition-colors",
          "md:px-4 md:py-2.5 md:text-base md:leading-4.5 xl:px-4.5",
          active ? "bg-primary text-text-inverse" : "bg-bg text-text hover:bg-surface-subtle",
          className,
        )}
        {...props}
      >
        <Slottable>{children}</Slottable>
        {count !== undefined && (
          <span
            className={cn("hidden text-sm leading-xs md:inline", active ? "font-semibold text-accent" : "font-regular text-text-muted")}
          >
            <span className="sr-only"> (</span>
            {count}
            <span className="sr-only">)</span>
          </span>
        )}
      </Comp>
    </li>
  );
}
