import type { ComponentProps } from "react";

import { cn, Slot, type AsChildProps } from "../../../lib";

/**
 * ContentNav (molecule): the "Help & policies" navigation between content pages (About, FAQ,
 * Delivery & returns, Privacy, Terms, Contact).
 *   mobile and tablet: outlined pills that wrap, the current page filled evergreen
 *   desktop:           a labelled sidebar list, the current page on a sage pill
 * Compose with ContentNavItem; pass your router's link through `asChild`.
 */
export interface ContentNavProps extends ComponentProps<"nav"> {
  /** Accessible name, and the sidebar heading on desktop. */
  label?: string;
}

export function ContentNav({ label = "Help & policies", className, children, ...props }: ContentNavProps) {
  return (
    <nav data-slot="content-nav" aria-label={label} className={cn("font-sans", className)} {...props}>
      <p aria-hidden className="hidden px-3.5 pb-2.5 text-xs leading-xs font-semibold tracking-wide text-text-muted uppercase xl:block">
        {label}
      </p>
      <ul className="flex flex-wrap gap-2 xl:flex-col xl:gap-0.5">{children}</ul>
    </nav>
  );
}

export interface ContentNavItemProps extends ComponentProps<"a">, AsChildProps {
  /** The page you're on: filled, and aria-current="page". */
  active?: boolean;
}

export function ContentNavItem({ active = false, asChild = false, className, ...props }: ContentNavItemProps) {
  const Comp = asChild ? Slot : "a";
  return (
    <li>
      <Comp
        data-slot="content-nav-item"
        data-active={active || undefined}
        aria-current={active ? "page" : undefined}
        className={cn(
          "block rounded-full border px-3.5 py-2 text-sm leading-xs whitespace-nowrap transition-colors",
          "xl:rounded-sm xl:border-0 xl:py-2.5 xl:text-base xl:leading-sm",
          active
            ? "border-primary bg-primary font-semibold text-on-primary xl:bg-sage-100 xl:text-primary xl:dark:text-text"
            : "border-border text-text-secondary hover:text-text xl:hover:bg-surface-subtle",
          className,
        )}
        {...props}
      />
    </li>
  );
}
