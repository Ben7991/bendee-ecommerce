import { render, screen } from "@testing-library/react";

import { FilterPill, FilterPills } from "./FilterPills";

describe("FilterPills", () => {
  it("marks the current filter", () => {
    render(
      <FilterPills aria-label="Filter orders" className="mt-4">
        <FilterPill href="/account/orders" active>All · 4</FilterPill>
        <FilterPill asChild>
          <a href="/account/orders?status=delivered">Delivered</a>
        </FilterPill>
      </FilterPills>,
    );
    expect(screen.getByRole("navigation", { name: "Filter orders" })).toHaveClass("mt-4");
    expect(screen.getByRole("link", { name: "All · 4" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Delivered" })).not.toHaveAttribute("aria-current");
  });
});
