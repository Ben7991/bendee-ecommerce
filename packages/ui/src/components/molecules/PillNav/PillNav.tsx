import type { ComponentProps } from "react";

import { cn, Slot, type AsChildProps } from "../../../lib";

/**
 * PillNav (molecule): the segmented primary navigation (Home / Shop / Collections).
 * Compose with PillNavItem; pass your router's link through `asChild`:
 *   <PillNav aria-label="Primary">
 *     <PillNavItem asChild active><Link href="/">Home</Link></PillNavItem>
 *   </PillNav>
 */
export type PillNavProps = ComponentProps<"nav">;

export function PillNav({ className, children, ...props }: PillNavProps) {
  return (
    <nav data-slot="pill-nav" className={className} {...props}>
      <ul className="flex items-center gap-1 rounded-full bg-surface p-1.5">{children}</ul>
    </nav>
  );
}

export interface PillNavItemProps extends ComponentProps<"a">, AsChildProps {
  /** The current section: white pill with a brand dot, and aria-current="page". */
  active?: boolean;
}

export function PillNavItem({ className, active = false, asChild = false, children, ...props }: PillNavItemProps) {
  const Comp = asChild ? Slot : "a";
  return (
    <li>
      <Comp
        data-slot="pill-nav-item"
        data-active={active || undefined}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex items-center gap-2 rounded-full px-4 py-2.5 font-sans text-14 leading-4.5 transition-colors",
          active
            ? "bg-bg font-semibold text-text before:size-1.5 before:shrink-0 before:rounded-full before:bg-brand"
            : "font-medium text-text-secondary hover:text-text",
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    </li>
  );
}
