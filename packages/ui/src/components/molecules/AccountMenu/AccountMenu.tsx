import type { ComponentProps, ReactNode } from "react";

import { cn, Slot, Slottable, type AsChildProps } from "../../../lib";
import { Icon } from "../../atoms";

/**
 * AccountMenu (molecule): the account sections as a card of rows with chevrons, on the mobile
 * Overview (where AccountNav is hidden). Compose with AccountMenuItem; links via `asChild`.
 */
export type AccountMenuProps = ComponentProps<"nav">;

export function AccountMenu({ "aria-label": label = "Your account", className, children, ...props }: AccountMenuProps) {
  return (
    <nav data-slot="account-menu" aria-label={label} className={cn("rounded-lg border border-border-subtle px-4.5 font-sans", className)} {...props}>
      <ul className="flex flex-col">{children}</ul>
    </nav>
  );
}

export interface AccountMenuItemProps extends ComponentProps<"a">, AsChildProps {
  /** Quiet text before the chevron ("3 saved"). */
  hint?: ReactNode;
  /** Filled pill before the chevron ("1 active"). */
  badge?: ReactNode;
}

export function AccountMenuItem({ hint, badge, asChild = false, className, children, ...props }: AccountMenuItemProps) {
  const Comp = asChild ? Slot : "a";
  return (
    <li className="border-b border-border-subtle last:border-0">
      <Comp data-slot="account-menu-item" className={cn("flex items-center gap-3 py-3.5 text-md leading-base text-text", className)} {...props}>
        <Slottable child={children}>{(child) => <span className="min-w-0 flex-1">{child}</span>}</Slottable>
        {badge && <span className="rounded-full bg-primary px-2 py-px text-xs leading-xs font-semibold text-text-inverse">{badge}</span>}
        {hint && <span className="text-sm leading-xs text-text-muted">{hint}</span>}
        <Icon name="chevronRight" size={16} className="shrink-0 text-text-muted" />
      </Comp>
    </li>
  );
}
