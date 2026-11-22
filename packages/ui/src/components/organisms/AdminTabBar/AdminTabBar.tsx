import type { ComponentProps } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon, type IconName } from "../../atoms";

export interface AdminTab {
  href: string;
  label: string;
  icon: IconName;
  count?: number;
  dot?: boolean;
}

/**
 * AdminTabBar (organism): the admin's bottom navigation on mobile (Paper Jofak - Admin → Tab bar):
 * Home, Orders, Products, Inventory, More. Hidden from 768px, where AdminSidebar takes over.
 */
export interface AdminTabBarProps extends Omit<ComponentProps<"nav">, "children"> {
  linkAs?: LinkComponent;
  tabs: AdminTab[];
  activeHref?: string;
}

export function AdminTabBar({ linkAs: LinkAs = "a", tabs, activeHref, className, ...props }: AdminTabBarProps) {
  return (
    <nav
      data-slot="admin-tab-bar"
      aria-label="Admin sections"
      className={cn("fixed inset-x-0 bottom-0 z-30 border-t border-border-subtle bg-bg px-2 pt-2.5 pb-4 font-sans md:hidden", className)}
      {...props}
    >
      <ul className="flex items-start justify-around">
        {tabs.map((tab) => {
          const active = tab.href === activeHref;
          const name = [tab.label, tab.count ? `${tab.count}` : undefined, tab.dot ? "needs attention" : undefined]
            .filter(Boolean)
            .join(", ");
          return (
            <li key={tab.href}>
              <LinkAs href={tab.href} aria-label={name} aria-current={active ? "page" : undefined} className="flex w-16 flex-col items-center gap-1">
                <span
                  className={cn(
                    "relative flex h-7.5 w-13 items-center justify-center rounded-full",
                    active ? "bg-accent text-on-accent" : "text-text-secondary",
                  )}
                >
                  <Icon name={tab.icon} size={18} />
                  {tab.count ? (
                    <span className="absolute top-0 right-1 rounded-full bg-primary px-1.25 py-px text-10 leading-3.5 font-bold text-text-inverse">
                      {tab.count}
                    </span>
                  ) : null}
                  {tab.dot && <span className="absolute top-0.75 right-3 size-2 rounded-full border-2 border-bg bg-warning" />}
                </span>
                <span className={cn("text-11 leading-3.5", active ? "font-semibold text-text" : "font-medium text-text-secondary")}>
                  {tab.label}
                </span>
              </LinkAs>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
