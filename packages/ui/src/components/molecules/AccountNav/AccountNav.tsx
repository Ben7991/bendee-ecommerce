import type { ComponentProps, ReactNode } from "react";

import { cn, Slot, Slottable, type AsChildProps } from "../../../lib";

/**
 * AccountNav (molecule): the account sections (Overview, Orders, Subscriptions…).
 *   tablet:  a row of tabs that scrolls sideways under the header
 *   desktop: the sidebar list, the current section on a sage pill, badges on the right
 * Hidden on mobile, where the Overview shows an AccountMenu instead. Compose with
 * AccountNavItem and pass your router's link through `asChild`.
 */
export type AccountNavProps = ComponentProps<"nav">;

export function AccountNav({ "aria-label": label = "Your account", className, children, ...props }: AccountNavProps) {
  return (
    <nav data-slot="account-nav" aria-label={label} className={cn("hidden font-sans md:block", className)} {...props}>
      <ul className="scrollbar-none flex gap-2 overflow-x-auto xl:flex-col xl:gap-0.5 xl:overflow-visible">{children}</ul>
    </nav>
  );
}

export interface AccountNavItemProps extends ComponentProps<"a">, AsChildProps {
  active?: boolean;
  /** "1 active", on the right of the sidebar item (desktop only). */
  badge?: ReactNode;
}

export function AccountNavItem({ active = false, badge, asChild = false, className, children, ...props }: AccountNavItemProps) {
  const Comp = asChild ? Slot : "a";
  return (
    <li className="shrink-0">
      <Comp
        data-slot="account-nav-item"
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex items-center justify-between gap-3 rounded-full px-3.5 py-2.25 text-sm leading-xs whitespace-nowrap transition-colors",
          "xl:rounded-sm xl:px-4 xl:py-3 xl:text-base xl:leading-sm",
          active ? "bg-sage-50 font-semibold text-primary dark:text-text" : "text-text-secondary hover:text-text xl:hover:bg-surface-subtle",
          className,
        )}
        {...props}
      >
        <Slottable>{children}</Slottable>
        {badge && (
          <span className="hidden rounded-full bg-primary px-2 py-px text-xs leading-xs font-semibold text-text-inverse xl:inline">{badge}</span>
        )}
      </Comp>
    </li>
  );
}
