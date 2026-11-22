import type { RoleArea, StaffRole } from "./RolePermissions";

export const ROLES: StaffRole[] = [
  { id: "owner", label: "Owner", summary: "Everything, including staff and ownership" },
  { id: "catalog", label: "Catalog manager", short: "Catalog", summary: "Products, prices, categories, content" },
  { id: "support", label: "Support", summary: "Customers, returns, refunds up to a limit" },
];

export const AREAS: RoleArea[] = [
  { label: "Products & pricing", access: ["edit", "edit", "view"] },
  { label: "Cancel & refund orders", access: ["edit", "none", "≤ GHS 200"] },
  { label: "Reports", access: ["All", "Catalog", "none"] },
];
