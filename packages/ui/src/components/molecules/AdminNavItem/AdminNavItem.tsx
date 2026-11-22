"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import type { ComponentProps, ReactNode } from "react";

import { cn, Slot, Slottable, type AsChildProps } from "../../../lib";
import { Icon, type IconName } from "../../atoms";
import {
  adminNavCountVariants,
  adminNavDotVariants,
  adminNavItemVariants,
  adminNavLabelVariants,
  type AdminNavItemVariantProps,
} from "./AdminNavItem.variants";

/**
 * AdminNavItem (molecule): one admin sidebar destination with its icon, an optional count
 * ("Orders 14") or attention dot (Inventory). As an icon cell it shows a tooltip with the label.
 * To use your router's link, pass an empty link with `asChild`:
 *   <AdminNavItem asChild icon="box" label="Orders" count={14}><Link href="/admin/orders" /></AdminNavItem>
 */
export interface AdminNavItemProps extends ComponentProps<"a">, Omit<AdminNavItemVariantProps, "active">, AsChildProps {
  icon: IconName;
  label: string;
  /** The current section: lime pill and aria-current="page". */
  active?: boolean;
  count?: number;
  /** An amber dot: something needs a look (low stock). */
  dot?: boolean;
  /** Extra tooltip text after the label ("14 open"). */
  hint?: ReactNode;
}

export function AdminNavItem({
  icon,
  label,
  active = false,
  count,
  dot = false,
  hint,
  layout,
  asChild = false,
  className,
  children,
  ...props
}: AdminNavItemProps) {
  const Comp = asChild ? Slot : "a";
  const name = [label, count ? `${count}` : undefined, dot ? "needs attention" : undefined].filter(Boolean).join(", ");

  return (
    <Tooltip.Provider delayDuration={150}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Comp
            data-slot="admin-nav-item"
            aria-current={active ? "page" : undefined}
            aria-label={name}
            className={cn(adminNavItemVariants({ layout, active }), className)}
            {...props}
          >
            <Icon name={icon} size={18} />
            <Slottable>{children}</Slottable>
            <span aria-hidden className={adminNavLabelVariants({ layout, active })}>
              {label}
            </span>
            {count ? (
              <span aria-hidden className={cn(adminNavCountVariants({ layout, active }))}>
                {count}
              </span>
            ) : null}
            {dot && <span aria-hidden className={adminNavDotVariants({ layout })} />}
          </Comp>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="right"
            sideOffset={8}
            className={cn(
              "z-50 flex items-center gap-1.5 rounded-8 bg-text px-2.5 py-1.5 font-sans text-xs leading-xs font-semibold text-bg shadow-chip data-[state=closed]:animate-fade-out data-[state=delayed-open]:animate-fade-in",
              layout !== "rail" && "xl:hidden",
            )}
          >
            {label}
            {hint && <span className="font-regular opacity-muted">{hint}</span>}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
