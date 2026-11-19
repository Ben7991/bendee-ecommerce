import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

/**
 * AccountLayout (template): the frame of every account page (Paper Account).
 *   mobile:  the site header (or `mobileHeader`, an AppBar, on deeper pages), then the page
 *   tablet:  the header, the AccountNav tabs under a rule, then the page
 *   desktop: the header, then a 260px sidebar (identity, AccountNav, sign out) beside the page
 * Use inside StorefrontShell (framed="sides", no footer).
 */
export interface AccountLayoutProps extends ComponentProps<"div"> {
  /** The site header. */
  header: ReactNode;
  /** Replaces the header on mobile (AppBar). */
  mobileHeader?: ReactNode;
  /** AccountNav, shown as tabs from 768px until the sidebar appears. */
  tabs?: ReactNode;
  /** Identity, AccountNav and sign out, from 1440px. */
  sidebar?: ReactNode;
  /** Under a rule at the bottom of the sidebar ("Sign out"), muted. */
  sidebarFooter?: ReactNode;
  /** Classes for the page column. */
  contentClassName?: string;
}

export function AccountLayout({ header, mobileHeader, tabs, sidebar, sidebarFooter, contentClassName, className, children, ...props }: AccountLayoutProps) {
  return (
    <div data-slot="account-layout" className={cn("flex flex-col", className)} {...props}>
      <div className={mobileHeader ? "hidden md:block" : undefined}>{header}</div>
      {mobileHeader && <div className="md:hidden">{mobileHeader}</div>}
      {tabs && <div className="hidden border-b border-border-subtle px-10 pt-2 pb-4 md:block xl:hidden">{tabs}</div>}
      <div className="flex flex-col px-5 pt-4 pb-10 md:px-10 md:pt-8 md:pb-14 xl:flex-row xl:items-start xl:gap-12 xl:px-14 xl:pb-18">
        {sidebar && (
          <aside className="hidden xl:sticky xl:top-6 xl:flex xl:w-65 xl:shrink-0 xl:flex-col xl:gap-6">
            {sidebar}
            {sidebarFooter && (
              <div className="border-t border-border-subtle px-4 pt-6 font-sans text-base leading-sm text-text-muted *:transition-colors *:hover:text-text">
                {sidebarFooter}
              </div>
            )}
          </aside>
        )}
        <div className={cn("flex min-w-0 flex-1 flex-col gap-5 md:gap-6", contentClassName)}>{children}</div>
      </div>
    </div>
  );
}
