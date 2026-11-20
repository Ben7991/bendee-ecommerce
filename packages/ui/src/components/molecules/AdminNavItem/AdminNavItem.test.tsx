import { render, screen } from "@testing-library/react";

import { AdminNavItem } from "./AdminNavItem";

describe("AdminNavItem", () => {
  it("names the link with its count and marks the current page", () => {
    render(<AdminNavItem href="/admin/orders" icon="box" label="Orders" count={14} active className="mt-4" />);
    const link = screen.getByRole("link", { name: "Orders, 14" });
    expect(link).toHaveAttribute("aria-current", "page");
    expect(link).toHaveClass("bg-accent", "mt-4");
  });

  it("renders the router link passed with asChild and flags attention", () => {
    render(
      <AdminNavItem asChild icon="warehouse" label="Inventory" dot layout="rail">
        <a href="/admin/inventory" data-router />
      </AdminNavItem>,
    );
    const link = screen.getByRole("link", { name: "Inventory, needs attention" });
    expect(link).toHaveAttribute("data-router");
    expect(link).not.toHaveAttribute("aria-current");
  });
});
