"use client";

import * as Popover from "@radix-ui/react-popover";
import type { ComponentProps } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon, type IconName } from "../../atoms";

export interface MoreMenuItem {
  label: string;
  href: string;
  icon: IconName;
}

/**
 * OrderMoreMenu (organism): the ⋯ button on an admin order with less-used actions (customer
 * profile, invoice, order history) in a small popover. 44px from 768px, 40px on mobile.
 */
export interface OrderMoreMenuProps extends Omit<ComponentProps<"div">, "children"> {
  linkAs?: LinkComponent;
  items: MoreMenuItem[];
  label?: string;
}

export function OrderMoreMenu({ linkAs: LinkAs = "a", items, label = "More actions", className, ...props }: OrderMoreMenuProps) {
  return (
    <Popover.Root>
      <Popover.Trigger
        aria-label={label}
        className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-bg text-text transition-colors hover:bg-surface-subtle data-[state=open]:bg-surface md:size-11"
      >
        <Icon name="more" size={18} />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          data-slot="order-more-menu"
          align="end"
          sideOffset={8}
          className={cn(
            "z-50 flex w-60 flex-col rounded-18 border border-border-subtle bg-bg p-1.5 font-sans shadow-card outline-none dark:bg-surface",
            "data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in",
            className,
          )}
          {...props}
        >
          <ul aria-label={label}>
            {items.map((item) => (
              <li key={item.href}>
                <LinkAs href={item.href} className="flex items-center gap-2.5 rounded-10 px-2.5 py-2.25 text-14 leading-sm text-text transition-colors hover:bg-surface-subtle">
                  <Icon name={item.icon} size={16} className="text-text-muted" />
                  {item.label}
                </LinkAs>
              </li>
            ))}
          </ul>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
