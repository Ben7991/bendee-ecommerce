import type { ComponentProps } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon } from "../../atoms";

export interface SavedView {
  href: string;
  label: string;
  count?: number | string;
  /** Needs attention (Flagged): citrus count. */
  alert?: boolean;
  /** Worth a look (Low stock): amber count. */
  warning?: boolean;
  /** Only in the mobile chip row ("Low stock"). */
  mobileOnly?: boolean;
  /** Not in the mobile chip row. */
  hideOnMobile?: boolean;
}

/**
 * SavedViews (organism): the saved filters above an admin list ("All 1,284 · To pack 9 ·
 * Flagged 2", Paper Jofak - Admin → Orders). Underlined tabs from 768px (scrolling sideways when
 * they don't fit) with "Save view" from 1440px; a scrolling row of chips on mobile. Each view is
 * a link, so views are shareable URLs. `variant="pills"` (products' status filter) shows pills
 * with count bubbles from 768px instead of tabs; `variant="segmented"` (customers' segments)
 * shows a segmented track, full width on tablet and fitted from 1440px. A `warning` view
 * (Inactive, Low) is amber there and an `alert` view (Out) red.
 */
export interface SavedViewsProps extends Omit<ComponentProps<"nav">, "children"> {
  linkAs?: LinkComponent;
  views: SavedView[];
  activeHref: string;
  saveView?: { href: string; label?: string };
  variant?: "tabs" | "pills" | "segmented";
  /** Segmented: stretch the track across the row on tablet (customers) or fit its labels (inventory). */
  fill?: boolean;
  "aria-label"?: string;
}

export function SavedViews({
  linkAs: LinkAs = "a",
  views,
  activeHref,
  saveView,
  variant = "tabs",
  fill = true,
  "aria-label": ariaLabel = "Saved views",
  className,
  ...props
}: SavedViewsProps) {
  const name = (view: SavedView) => (view.count !== undefined ? `${view.label}, ${view.count}` : view.label);
  const wide = views.filter((view) => !view.mobileOnly);
  const compact = views.filter((view) => !view.hideOnMobile);
  return (
    <nav data-slot="saved-views" aria-label={ariaLabel} className={cn("font-sans", className)} {...props}>
      {/* Tablet and desktop: pills. */}
      {variant === "pills" && (
        <ul className="hidden flex-wrap items-center gap-1.5 md:flex">
          {wide.map((view) => {
            const active = view.href === activeHref;
            return (
              <li key={view.href}>
                <LinkAs
                  href={view.href}
                  aria-label={name(view)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-3.5 text-sm leading-sm",
                    active ? "bg-primary py-1.5 font-semibold text-on-primary" : "border border-border py-1.25 font-medium text-text-secondary hover:text-text",
                  )}
                >
                  {view.label}
                  {view.count !== undefined && (
                    <span
                      aria-hidden
                      className={cn(
                        "rounded-full px-1.75 py-px text-xs leading-xs font-semibold",
                        active ? "bg-white/18 text-text-inverse" : view.alert ? "bg-tint-citrus text-error" : view.warning ? "bg-tint-sun text-warning-text" : "bg-surface text-text",
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
      )}

      {/* Tablet and desktop: a segmented track. */}
      {variant === "segmented" && (
        <ul className={cn("hidden gap-0.5 rounded-full bg-surface-subtle p-0.75 md:flex xl:w-fit", !fill && "w-fit shrink-0")}>
          {wide.map((view) => {
            const active = view.href === activeHref;
            return (
              <li key={view.href} className={fill ? "flex-1 basis-0 xl:flex-none xl:basis-auto" : undefined}>
                <LinkAs
                  href={view.href}
                  aria-label={name(view)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex justify-center gap-1 rounded-full px-3.5 py-1.75 text-sm leading-4 whitespace-nowrap",
                    active ? "bg-bg font-semibold text-text shadow-xs dark:bg-surface" : "font-medium hover:text-text",
                    !active && (view.alert ? "text-error" : view.warning ? "text-warning-text" : "text-text-secondary"),
                  )}
                >
                  {view.label}
                  {view.count !== undefined && (
                    <span aria-hidden className={cn("font-medium", !view.warning && !view.alert && "text-text-muted")}>
                      {view.count}
                    </span>
                  )}
                </LinkAs>
              </li>
            );
          })}
        </ul>
      )}

      {/* Tablet and desktop: underlined tabs. */}
      {variant === "tabs" && (
      <div className="hidden items-center gap-1 border-b border-border-subtle md:flex">
        <ul className="-mb-px flex min-w-0 flex-1 items-center gap-1 overflow-x-auto scrollbar-none">
          {wide.map((view) => {
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
      )}

      {/* Mobile: chips. */}
      <ul className="-mr-4 flex gap-2 overflow-x-auto pr-4 scrollbar-none md:hidden">
        {compact.map((view) => {
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
                  !active && variant === "segmented" && view.warning && "text-warning-text",
                )}
              >
                {view.label}
                {view.count !== undefined && (
                  <span
                    aria-hidden
                    className={cn(
                      active
                        ? "font-medium text-text-inverse-muted"
                        : view.alert
                          ? "font-semibold text-error"
                          : view.warning
                            ? "font-semibold text-warning-text"
                            : "font-semibold text-text",
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
