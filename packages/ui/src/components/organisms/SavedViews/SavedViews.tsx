import type { ComponentProps } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon } from "../../atoms";

export interface SavedView {
  href: string;
  label: string;
  count?: number | string;
  /** Needs attention (Flagged): citrus count. */
  alert?: boolean;
}

/**
 * SavedViews (organism): the saved filters above an admin list ("All 1,284 · To pack 9 ·
 * Flagged 2", Paper Jofak - Admin → Orders). Underlined tabs from 768px (scrolling sideways when
 * they don't fit) with "Save view" from 1440px; a scrolling row of chips on mobile. Each view is
 * a link, so views are shareable URLs.
 */
export interface SavedViewsProps extends Omit<ComponentProps<"nav">, "children"> {
  linkAs?: LinkComponent;
  views: SavedView[];
  activeHref: string;
  saveView?: { href: string; label?: string };
  "aria-label"?: string;
}

export function SavedViews({
  linkAs: LinkAs = "a",
  views,
  activeHref,
  saveView,
  "aria-label": ariaLabel = "Saved views",
  className,
  ...props
}: SavedViewsProps) {
  const name = (view: SavedView) => (view.count !== undefined ? `${view.label}, ${view.count}` : view.label);
  return (
    <nav data-slot="saved-views" aria-label={ariaLabel} className={cn("font-sans", className)} {...props}>
      {/* Tablet and desktop: underlined tabs. */}
      <div className="hidden items-center gap-1 border-b border-border-subtle md:flex">
        <ul className="-mb-px flex min-w-0 flex-1 items-center gap-1 overflow-x-auto scrollbar-none">
          {views.map((view) => {
            const active = view.href === activeHref;
            return (
              <li key={view.href} className="shrink-0">
                <LinkAs
                  href={view.href}
                  aria-label={name(view)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-2 border-b-2 px-3.5 pt-2.5 pb-3 text-14 leading-sm whitespace-nowrap transition-colors",
                    active ? "border-primary font-semibold text-text" : "border-transparent font-medium text-text-secondary hover:text-text",
                  )}
                >
                  {view.label}
                  {view.count !== undefined && (
                    <span
                      aria-hidden
                      className={cn(
                        "rounded-full px-1.75 py-px text-xs leading-xs font-semibold",
                        active ? "bg-primary text-text-inverse" : view.alert ? "bg-tint-citrus text-error" : "bg-surface text-text",
                      )}
                    >
                      {view.count}
                    </span>
                  )}
                </LinkAs>
              </li>
            );
          })}
        </ul>
        {saveView && (
          <LinkAs
            href={saveView.href}
            className="hidden shrink-0 items-center gap-1.5 px-1 pt-2.5 pb-3 text-sm leading-sm font-semibold text-brand hover:underline xl:flex"
          >
            <Icon name="plus" size={14} strokeWidth={1.6} />
            {saveView.label ?? "Save view"}
          </LinkAs>
        )}
      </div>

      {/* Mobile: chips. */}
      <ul className="-mr-4 flex gap-2 overflow-x-auto pr-4 scrollbar-none md:hidden">
        {views.map((view) => {
          const active = view.href === activeHref;
          return (
            <li key={view.href} className="shrink-0">
              <LinkAs
                href={view.href}
                aria-label={name(view)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-9 items-center gap-1.5 rounded-full px-3.5 text-sm leading-xs whitespace-nowrap",
                  active ? "bg-primary font-semibold text-text-inverse" : "border border-border font-medium text-text",
                )}
              >
                {view.label}
                {view.count !== undefined && (
                  <span
                    aria-hidden
                    className={cn(
                      active ? "font-medium text-text-inverse-muted" : view.alert ? "font-semibold text-error" : "font-semibold text-text",
                    )}
                  >
                    {view.count}
                  </span>
                )}
              </LinkAs>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
