import type { AdminNavLink, AdminStaff, AdminTab } from "@repo/ui/organisms";
import type { StaffMenuItem } from "@repo/ui/molecules";

/*
 * Admin shell sample data (Paper "Jofak - Admin" → Dashboard sidebar, top bar and tab bar).
 * Static until staff auth and the admin API exist.
 */

export const staff: AdminStaff = {
  name: "Abena Mensah",
  role: "Owner",
  email: "abena@jofak.com",
};

export const adminNav: {
  primary: AdminNavLink[];
  secondary: AdminNavLink[];
  settings: AdminNavLink;
} = {
  primary: [
    { href: "/admin", label: "Dashboard", icon: "dashboard" },
    {
      href: "/admin/orders",
      label: "Orders",
      icon: "box",
      count: 14,
      hint: "14 open",
    },
    { href: "/admin/products", label: "Products", icon: "bottle" },
    {
      href: "/admin/inventory",
      label: "Inventory",
      icon: "warehouse",
      dot: true,
      hint: "6 low",
    },
    { href: "/admin/customers", label: "Customers", icon: "users" },
    {
      href: "/admin/returns",
      label: "Returns",
      icon: "undo",
      count: 2,
      hint: "2 to review",
    },
  ],
  secondary: [
    { href: "/admin/collections", label: "Collections", icon: "tiles" },
    { href: "/admin/discounts", label: "Discounts", icon: "discount" },
    { href: "/admin/marketing", label: "Marketing", icon: "megaphone" },
    { href: "/admin/content", label: "Content", icon: "document" },
    { href: "/admin/reports", label: "Reports", icon: "barChart" },
  ],
  settings: { href: "/admin/settings", label: "Settings", icon: "settings" },
};

export const adminTabs: AdminTab[] = [
  { href: "/admin", label: "Home", icon: "dashboard" },
  { href: "/admin/orders", label: "Orders", icon: "box", count: 14 },
  { href: "/admin/products", label: "Products", icon: "bottle" },
  {
    href: "/admin/inventory",
    label: "Inventory",
    icon: "warehouse",
    dot: true,
  },
  { href: "/admin/more", label: "More", icon: "more" },
];

/** Desktop popover: Settings is already in the sidebar. */
export const staffMenuItems: StaffMenuItem[] = [
  { label: "My profile & sign-in", icon: "user", href: "/admin/profile" },
  { label: "Sign out", icon: "signOut", href: "/admin/sign-out" },
];

/** Mobile sheet: adds Settings, which has no tab. */
export const staffSheetItems: StaffMenuItem[] = [
  staffMenuItems[0]!,
  { label: "Settings", icon: "settings", href: "/admin/settings" },
  staffMenuItems[1]!,
];
