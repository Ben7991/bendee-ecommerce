import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";

export interface SectionTab {
  href: string;
  label: string;
  /** Mobile label ("Products" for "All products"). */
  compactLabel?: string;
  count?: number | string;
}

/**
 * SectionTabs (organism): switches between sibling admin pages (All products · Categories ·
 * Brands, Paper Jofak - Admin → Catalog tabs). Underlined text tabs with a muted count from
 * 768px; a segmented control without counts on mobile. Each tab is a link. `trailing` (search,
 * filters) sits at the end of the tab row from 1440px and on its own row under the tabs on
 * tablet; it isn't shown on mobile.
 */
export interface SectionTabsProps extends Omit<ComponentProps<"nav">, "children"> {
  linkAs?: LinkComponent;
  tabs: SectionTab[];
  activeHref: string;
  "aria-label"?: string;
  trailing?: ReactNode;
}

export function SectionTabs({ linkAs: LinkAs = "a", tabs, activeHref, "aria-label": ariaLabel = "Sections", trailing, className, ...props }: SectionTabsProps) {
  const nav = (
    <nav data-slot="section-tabs" aria-label={ariaLabel} className={cn("font-sans", !trailing && className)} {...props}>
      <ul className="flex rounded-full bg-surface-subtle p-0.75 md:hidden">
        {tabs.map((tab) => {
          const active = tab.href === activeHref;
          return (
            <li key={tab.href} className="flex-1">
              <LinkAs
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex justify-center rounded-full px-2.5 py-2 text-sm leading-xs",
                  active ? "bg-bg font-semibold text-text shadow-xs dark:bg-surface" : "font-medium text-text-secondary",
                )}
              >
                {tab.compactLabel ?? tab.label}
              </LinkAs>
            </li>
          );
        })}
      </ul>
      <ul className={cn("hidden gap-7 border-b border-border-subtle md:flex", trailing && "xl:border-b-0")}>
        {tabs.map((tab) => {
          const active = tab.href === activeHref;
          return (
            <li key={tab.href}>
              <LinkAs
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "-mb-px flex gap-1 text-14 leading-sm",
                  active ? "border-b-2 border-primary pb-2.5 font-semibold text-text dark:border-brand" : "pb-3 font-medium text-text-secondary hover:text-text",
                )}
              >
                {tab.label}
                {tab.count !== undefined && <span className="font-medium text-text-muted">{tab.count}</span>}
              </LinkAs>
            </li>
          );
        })}
      </ul>
    </nav>
  );
  if (!trailing) return nav;
  return (
    <div className={cn("flex flex-col font-sans md:gap-4 md:border-b md:border-border-subtle md:pb-3.5 xl:flex-row xl:items-end xl:gap-1 xl:pb-0", className)}>
      {nav}
      <div className="hidden items-center gap-2 md:flex xl:ml-auto xl:pb-1">{trailing}</div>
    </div>
  );
}
