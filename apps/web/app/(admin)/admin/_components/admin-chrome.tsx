"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { AdminSidebar, AdminTabBar, AdminTopBar } from "@repo/ui/organisms";
import { AdminShell } from "@repo/ui/templates";

import { adminNav, adminTabs, staff, staffMenuItems, staffSheetItems } from "../../../_content/admin";

/** The section a path belongs to: /admin/orders/JFK-251477 → /admin/orders. */
function sectionOf(pathname: string) {
  const [, admin, section] = pathname.split("/");
  return section ? `/${admin}/${section}` : `/${admin}`;
}

/**
 * Client boundary for the admin shell: next/link and the current path go to the sidebar, top
 * bar and tab bar here, because a server component can't hand a component reference to them.
 */
export function AdminChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const active = sectionOf(pathname);
  // Detail pages (an order, the product editor) bring their own mobile back bar and action bar.
  const detail = /^\/admin\/orders\/[^/]+$/.test(pathname) || /^\/admin\/products\/(?!categories$|brands$)[^/]+$/.test(pathname);
  return (
    <AdminShell
      sidebar={
        <AdminSidebar
          linkAs={Link}
          activeHref={active}
          primary={adminNav.primary}
          secondary={adminNav.secondary}
          settings={adminNav.settings}
          staff={staff}
          staffMenuItems={staffMenuItems}
        />
      }
      topBar={
        <AdminTopBar
          linkAs={Link}
          unreadNotifications
          staff={staff}
          staffMenuItems={staffSheetItems}
          className={detail ? "hidden md:flex" : undefined}
        />
      }
      tabBar={detail ? undefined : <AdminTabBar linkAs={Link} tabs={adminTabs} activeHref={active} />}
    >
      {children}
    </AdminShell>
  );
}
