import type { ComponentProps } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon, IconButton, Initials, Logo } from "../../atoms";
import { StaffMenu, type StaffMenuItem } from "../../molecules";

/**
 * AdminTopBar (organism): the bar above admin pages (Paper Jofak - Admin → Top bar).
 * From 768px: search, View store and notifications. On mobile: logo, search and notification
 * buttons and the staff avatar, which opens StaffMenu as a sheet.
 */
export interface AdminTopBarProps extends Omit<ComponentProps<"header">, "children"> {
  linkAs?: LinkComponent;
  homeHref?: string;
  /** GET target of the search form (`?q=`). */
  searchAction?: string;
  searchPlaceholder?: string;
  storeHref?: string;
  notificationsHref?: string;
  /** Shows the red dot on the bell. */
  unreadNotifications?: boolean;
  staff: { name: string; role: string; email: string };
  /** Mobile sheet items (profile, settings, sign out). */
  staffMenuItems: StaffMenuItem[];
}

export function AdminTopBar({
  linkAs: LinkAs = "a",
  homeHref = "/admin",
  searchAction = "/admin/search",
  searchPlaceholder = "Search orders, products, customers",
  storeHref = "/",
  notificationsHref = "/admin/notifications",
  unreadNotifications = false,
  staff,
  staffMenuItems,
  className,
  ...props
}: AdminTopBarProps) {
  const bellLabel = unreadNotifications ? "Notifications, unread" : "Notifications";
  const bell = (
    <IconButton asChild label={bellLabel} size="admin">
      <LinkAs href={notificationsHref} aria-label={bellLabel}>
        <Icon name="bell" size={18} strokeWidth={1.7} />
        {unreadNotifications && (
          <span aria-hidden className="absolute top-2 right-2.25 size-2 rounded-full border-2 border-bg bg-error" />
        )}
      </LinkAs>
    </IconButton>
  );

  return (
    <header
      data-slot="admin-top-bar"
      className={cn(
        "sticky top-0 z-30 flex h-15 shrink-0 items-center gap-2 border-b border-border-subtle bg-bg px-4 font-sans",
        "md:h-17 md:gap-3 md:px-6 xl:px-10",
        className,
      )}
      {...props}
    >
      <Logo asChild size="adminCompact" className="flex-1 md:hidden">
        <LinkAs href={homeHref} aria-label="Jofak admin home" />
      </Logo>

      <form
        role="search"
        action={searchAction}
        method="get"
        className="hidden h-10 min-w-0 flex-1 items-center gap-2.5 rounded-full bg-surface-subtle px-3.5 focus-within:ring-2 focus-within:ring-brand md:flex xl:w-105 xl:flex-none"
      >
        <Icon name="search" size={16} strokeWidth={1.5} className="text-text-muted" />
        <input
          type="search"
          name="q"
          aria-label="Search the admin"
          placeholder={searchPlaceholder}
          className="min-w-0 flex-1 bg-transparent text-14 leading-sm text-text outline-none placeholder:text-text-muted"
        />
        <kbd className="rounded-6 border border-border px-1.5 py-px font-sans text-xs leading-xs font-semibold text-text-muted">/</kbd>
      </form>
      <span aria-hidden className="hidden flex-1 xl:block" />

      <a
        href={storeHref}
        target="_blank"
        rel="noreferrer"
        className="hidden h-10 shrink-0 items-center gap-2 rounded-full border border-border px-4 text-14 leading-sm font-medium text-text transition-colors hover:bg-surface-subtle md:flex"
      >
        View store
        <Icon name="arrowUpRight" size={14} strokeWidth={1.5} />
      </a>

      <IconButton asChild label="Search" size="admin" className="md:hidden">
        <LinkAs href={searchAction} aria-label="Search">
          <Icon name="search" size={18} strokeWidth={1.7} />
        </LinkAs>
      </IconButton>
      {bell}

      <StaffMenu
        presentation="sheet"
        name={staff.name}
        detail={`${staff.email} · ${staff.role}`}
        items={staffMenuItems}
        className="md:hidden"
        trigger={
          <button type="button" aria-label={`${staff.name}: account menu`} className="shrink-0 rounded-full md:hidden">
            <Initials name={staff.name} size="staff" className="text-xs" />
          </button>
        }
      />
    </header>
  );
}
