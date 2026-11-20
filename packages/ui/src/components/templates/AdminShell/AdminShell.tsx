import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

/**
 * AdminShell (template): the admin page frame (Paper Jofak - Admin). The sidebar on the left from
 * 768px; the top bar, the page content and, on mobile, the bottom tab bar.
 * Content padding: 16 / 24 / 40px with 24 / 28 / 32px between sections.
 */
export interface AdminShellProps extends ComponentProps<"div"> {
  sidebar: ReactNode;
  topBar: ReactNode;
  tabBar?: ReactNode;
}

export function AdminShell({ sidebar, topBar, tabBar, className, children, ...props }: AdminShellProps) {
  return (
    <div data-slot="admin-shell" className={cn("flex min-h-dvh bg-bg font-sans", className)} {...props}>
      {sidebar}
      <div className="flex min-w-0 flex-1 flex-col">
        {topBar}
        <main className="flex flex-1 flex-col gap-6 px-4 pt-5 pb-28 md:gap-7 md:px-6 md:pt-7 md:pb-10 xl:gap-8 xl:px-10 xl:pt-9 xl:pb-12">
          {children}
        </main>
      </div>
      {tabBar}
    </div>
  );
}
