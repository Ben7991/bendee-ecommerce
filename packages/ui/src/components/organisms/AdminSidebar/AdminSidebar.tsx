"use client";

import { useState, type ComponentProps } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon, Initials, Logo, type IconName } from "../../atoms";
import { AdminNavItem, StaffMenu, type StaffMenuItem } from "../../molecules";

export interface AdminNavLink {
  href: string;
  label: string;
  icon: IconName;
  count?: number;
  dot?: boolean;
  /** Extra tooltip text on the icon rail ("14 open"). */
  hint?: string;
}

export interface AdminStaff {
  name: string;
  role: string;
  email: string;
}

/**
 * AdminSidebar (organism): the admin's left navigation (Paper Jofak - Admin → Sidebar).
 * A 76px icon rail on tablet, a 248px sidebar with labels from 1440px that the collapse button
 * folds back to the rail. Hidden on mobile (AdminTopBar + AdminTabBar take over). The staff card
 * opens StaffMenu. Wrap it in a "use client" file in the app to pass your router's `linkAs`.
 */
export interface AdminSidebarProps extends Omit<ComponentProps<"aside">, "children"> {
  linkAs?: LinkComponent;
  homeHref?: string;
  /** "Run the store": Dashboard, Orders, Products… */
  primary: AdminNavLink[];
  /** The "Grow" group: Collections, Discounts… */
  secondary?: AdminNavLink[];
  secondaryLabel?: string;
  settings?: AdminNavLink;
  activeHref?: string;
  staff: AdminStaff;
  staffMenuItems: StaffMenuItem[];
  /** The staff member's own page (My profile) is open: the card is highlighted. */
  staffActive?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export function AdminSidebar({
  linkAs: LinkAs = "a",
  homeHref = "/admin",
  primary,
  secondary = [],
  secondaryLabel = "Grow",
  settings,
  activeHref,
  staff,
  staffMenuItems,
  staffActive = false,
  defaultCollapsed = false,
  onCollapsedChange,
  className,
  ...props
}: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const layout = collapsed ? "rail" : "responsive";
  const toggle = () => {
    setCollapsed(!collapsed);
    onCollapsedChange?.(!collapsed);
  };

  const item = (link: AdminNavLink) => (
    <li key={link.href}>
      <AdminNavItem
        asChild
        layout={layout}
        icon={link.icon}
        label={link.label}
        count={link.count}
        dot={link.dot}
        hint={link.hint}
        active={link.href === activeHref}
      >
        <LinkAs href={link.href} />
      </AdminNavItem>
    </li>
  );

  return (
    <aside
      data-slot="admin-sidebar"
      data-collapsed={collapsed || undefined}
      aria-label="Admin"
      className={cn(
        "sticky top-0 hidden h-dvh w-19 shrink-0 flex-col items-center gap-7 overflow-y-auto border-r border-border-subtle bg-bg px-3 py-6 font-sans md:flex",
        !collapsed && "xl:w-62 xl:items-stretch xl:px-4",
        className,
      )}
      {...props}
    >
      <div className={cn("flex flex-col items-center gap-4", !collapsed && "xl:flex-row xl:justify-between xl:px-2")}>
        <Logo asChild size="admin" wordmarkClassName={cn("sr-only", !collapsed && "xl:not-sr-only")}>
          <LinkAs href={homeHref} aria-label="Jofak admin home" />
        </Logo>
        <button
          type="button"
          onClick={toggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          className="hidden size-8 shrink-0 items-center justify-center rounded-10 bg-surface-subtle text-text-muted transition-colors hover:bg-surface hover:text-text xl:flex"
        >
          <Icon name={collapsed ? "sidebarExpand" : "sidebarCollapse"} size={18} />
        </button>
      </div>

      <nav aria-label="Admin sections" className={cn("flex flex-col gap-7", !collapsed && "xl:gap-7")}>
        <ul className="flex flex-col gap-0.5">{primary.map(item)}</ul>
        {secondary.length > 0 && (
          <div className="flex flex-col items-center gap-0.5">
            <span aria-hidden className={cn("-mt-3.5 mb-3.5 h-px w-8 bg-border-subtle", !collapsed && "xl:hidden")} />
            <p
              className={cn(
                "sr-only text-11 leading-xs font-semibold tracking-wide text-text-muted uppercase",
                !collapsed && "xl:not-sr-only xl:self-stretch xl:px-3 xl:pb-2",
              )}
            >
              {secondaryLabel}
            </p>
            <ul className={cn("flex flex-col gap-0.5", !collapsed && "xl:self-stretch")}>{secondary.map(item)}</ul>
          </div>
        )}
      </nav>

      <div className={cn("mt-auto flex flex-col items-center gap-3", !collapsed && "xl:items-stretch")}>
        {settings && <ul>{item(settings)}</ul>}
        <StaffMenu
          name={staff.name}
          detail={`${staff.email} · ${staff.role}`}
          items={staffMenuItems}
          trigger={
            <button
              type="button"
              aria-label={`${staff.name}, ${staff.role}: account menu`}
              className={cn(
                "flex items-center gap-2.5 rounded-full text-left transition-colors",
                !collapsed && "xl:rounded-md xl:bg-surface-subtle xl:p-3 xl:hover:bg-surface",
                staffActive && "ring-2 ring-brand ring-offset-3 ring-offset-bg",
                staffActive && !collapsed && "xl:bg-sage-100 xl:ring-1 xl:ring-sage-200 xl:ring-offset-0 xl:hover:bg-sage-100",
              )}
            >
              <Initials name={staff.name} size="staff" />
              <span className={cn("hidden min-w-0 flex-1 flex-col", !collapsed && "xl:flex")}>
                <span className="truncate text-14 leading-sm font-semibold text-text">{staff.name}</span>
                <span className="text-xs leading-xs text-text-muted">{staff.role}</span>
              </span>
              <Icon name="chevronsUpDown" size={16} className={cn("hidden text-text-muted", !collapsed && "xl:block")} />
            </button>
          }
        />
      </div>
    </aside>
  );
}
