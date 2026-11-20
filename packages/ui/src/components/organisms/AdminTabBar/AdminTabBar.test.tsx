import { render, screen } from "@testing-library/react";

import { AdminTabBar } from "./AdminTabBar";

describe("AdminTabBar", () => {
  it("links the tabs and marks the current one", () => {
    render(
      <AdminTabBar
        className="mt-4"
        activeHref="/admin"
        tabs={[
          { href: "/admin", label: "Home", icon: "dashboard" },
          { href: "/admin/orders", label: "Orders", icon: "box", count: 14 },
          { href: "/admin/inventory", label: "Inventory", icon: "warehouse", dot: true },
        ]}
      />,
    );
    expect(screen.getByRole("navigation", { name: "Admin sections" })).toHaveClass("mt-4");
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Orders, 14" })).toHaveAttribute("href", "/admin/orders");
    expect(screen.getByRole("link", { name: "Inventory, needs attention" })).not.toHaveAttribute("aria-current");
  });
});
