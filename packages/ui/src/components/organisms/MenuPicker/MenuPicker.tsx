import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon } from "../../atoms";

export interface MenuChoice {
  href: string;
  title: string;
  /** "6 items · 1 unpublished change". */
  note: string;
  /** Has unpublished changes: amber dot. */
  changed?: boolean;
}

/**
 * MenuPicker (organism): which storefront menu you're editing (Paper Jofak - Admin → Menus): cards
 * with a note from 1440px (plus an optional tip under them), a segmented track on tablet and
 * pills on mobile. An amber dot marks unpublished changes. Each menu is a link.
 */
export interface MenuPickerProps extends Omit<ComponentProps<"nav">, "children"> {
  linkAs?: LinkComponent;
  menus: MenuChoice[];
  activeHref: string;
  tip?: ReactNode;
}

export function MenuPicker({ linkAs: LinkAs = "a", menus, activeHref, tip, className, ...props }: MenuPickerProps) {
  return (
    <nav data-slot="menu-picker" aria-label="Menus" className={cn("font-sans xl:w-57.5 xl:shrink-0", className)} {...props}>
      {/* Mobile: pills. */}
      <ul className="flex gap-2 md:hidden">
        {menus.map((menu) => {
          const active = menu.href === activeHref;
          return (
            <li key={menu.href}>
              <LinkAs
                href={menu.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm leading-4",
                  active ? "bg-primary font-semibold text-on-primary" : "border border-border px-3.25 py-1.75 font-medium text-text",
                )}
              >
                {menu.title}
                {menu.changed && <span aria-label="Unpublished changes" className={cn("size-1.5 rounded-full", active ? "bg-accent" : "bg-warning")} />}
              </LinkAs>
            </li>
          );
        })}
      </ul>

      {/* Tablet: segmented. */}
      <ul className="hidden gap-0.5 rounded-full bg-surface-subtle p-0.75 md:flex xl:hidden">
        {menus.map((menu) => {
          const active = menu.href === activeHref;
          return (
            <li key={menu.href} className="flex flex-1">
              <LinkAs
                href={menu.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2.5 text-sm leading-4",
                  active ? "bg-bg font-semibold text-text shadow-xs dark:bg-surface" : "font-medium text-text-secondary hover:text-text",
                )}
              >
                {menu.title}
                {menu.changed && <span aria-label="Unpublished changes" className="size-1.5 rounded-full bg-warning" />}
              </LinkAs>
            </li>
          );
        })}
      </ul>

      {/* Desktop: cards. */}
      <div className="hidden flex-col gap-2.5 xl:flex">
        <ul className="flex flex-col gap-2.5">
          {menus.map((menu) => {
            const active = menu.href === activeHref;
            return (
              <li key={menu.href}>
                <LinkAs
                  href={menu.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex flex-col gap-1 rounded-md px-4 py-3.5",
                    active ? "border-field border-primary bg-sage-50" : "border border-border-subtle hover:bg-surface-subtle",
                  )}
                >
                  <span className="flex items-center justify-between gap-2 text-base leading-5 font-semibold text-text">
                    {menu.title}
                    {menu.changed && <span aria-label="Unpublished changes" className="size-2 rounded-full bg-warning" />}
                  </span>
                  <span className="text-xs leading-xs text-text-muted">{menu.note}</span>
                </LinkAs>
              </li>
            );
          })}
        </ul>
        {tip && (
          <p className="flex gap-2.5 rounded-14 bg-surface-subtle px-3.5 py-3 text-xs leading-4.25 text-text-secondary">
            <Icon name="info" size={16} strokeWidth={1.4} className="shrink-0 text-text-muted" />
            <span>{tip}</span>
          </p>
        )}
      </div>
    </nav>
  );
}
