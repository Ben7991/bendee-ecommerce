import type { ComponentProps } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon } from "../../atoms";

export interface SettingsNavGroup {
  label: string;
  items: { href: string; label: string; count?: number | string; note?: string }[];
}

/**
 * SettingsNav (organism): the settings sections (Paper Jofak - Admin → Settings): grouped links
 * (Store, Selling, Growth, Team) in a column from 1440px and a scrolling row of pills on tablet.
 * `variant="menu"` is the mobile settings home: each group as a card of rows with a chevron.
 */
export interface SettingsNavProps extends Omit<ComponentProps<"nav">, "children"> {
  linkAs?: LinkComponent;
  groups: SettingsNavGroup[];
  activeHref?: string;
  variant?: "default" | "menu";
}

export function SettingsNav({ linkAs: LinkAs = "a", groups, activeHref, variant = "default", className, ...props }: SettingsNavProps) {
  if (variant === "menu") {
    return (
      <nav data-slot="settings-nav" aria-label="Settings" className={cn("flex flex-col gap-4 font-sans", className)} {...props}>
        {groups.map((group) => (
          <section key={group.label} className="flex flex-col gap-2">
            <h2 className="px-1 text-11 leading-3.5 font-semibold tracking-wide text-text-muted uppercase">{group.label}</h2>
            <ul className="flex flex-col overflow-clip rounded-18 border border-border-subtle">
              {group.items.map((item) => (
                <li key={item.href} className="border-t border-border-subtle first:border-t-0">
                  <LinkAs href={item.href} className="flex items-center gap-3 px-4 py-3.5">
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-14 leading-5 font-semibold text-text">{item.label}</span>
                      {item.note && <span className="text-xs leading-xs text-text-muted">{item.note}</span>}
                    </span>
                    {item.count !== undefined && <span className="text-sm leading-4.5 text-text-muted">{item.count}</span>}
                    <Icon name="chevronRight" size={14} strokeWidth={1.6} className="shrink-0 text-text-muted" />
                  </LinkAs>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </nav>
    );
  }

  const items = groups.flatMap((group) => group.items);
  return (
    <nav data-slot="settings-nav" aria-label="Settings" className={cn("font-sans", className)} {...props}>
      {/* Tablet: pills. */}
      <ul className="-mx-6 flex gap-2 overflow-x-auto px-6 scrollbar-none xl:hidden">
        {items.map((item) => {
          const active = item.href === activeHref;
          return (
            <li key={item.href} className="shrink-0">
              <LinkAs
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex rounded-full px-3.5 py-2 text-sm leading-4 whitespace-nowrap",
                  active ? "bg-primary font-semibold text-on-primary" : "border border-border px-3.25 py-1.75 font-medium text-text hover:bg-surface-subtle",
                )}
              >
                {item.label}
              </LinkAs>
            </li>
          );
        })}
      </ul>
      {/* Desktop: grouped column. */}
      <div className="hidden flex-col gap-4.5 xl:flex">
        {groups.map((group) => (
          <section key={group.label} className="flex flex-col gap-0.5">
            <h2 className="px-3 pb-1.5 text-11 leading-3.5 font-semibold tracking-wide text-text-muted uppercase">{group.label}</h2>
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const active = item.href === activeHref;
                return (
                  <li key={item.href}>
                    <LinkAs
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn("flex justify-between rounded-10 px-3 py-2.25 text-14 leading-5", active ? "bg-surface font-semibold text-text" : "font-medium text-text-secondary hover:bg-surface-subtle hover:text-text")}
                    >
                      {item.label}
                      {item.count !== undefined && <span className="text-sm leading-sm font-regular text-text-muted">{item.count}</span>}
                    </LinkAs>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </nav>
  );
}
