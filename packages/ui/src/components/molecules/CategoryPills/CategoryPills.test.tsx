import { render, screen } from "@testing-library/react";

import { CategoryPill, CategoryPills } from "./CategoryPills";

describe("CategoryPills", () => {
  it("marks the current goal and appends its count to the link", () => {
    render(
      <CategoryPills aria-label="Shop by goal">
        <CategoryPill asChild active count={64}>
          <a href="/shop">All</a>
        </CategoryPill>
        <CategoryPill href="/collections/immunity" count={11} className="mt-4">
          Immunity
        </CategoryPill>
      </CategoryPills>,
    );
    expect(screen.getByRole("navigation", { name: "Shop by goal" })).toBeInTheDocument();
    const all = screen.getByRole("link", { name: /^All\s*\(64\)$/ });
    expect(all).toHaveAttribute("aria-current", "page");
    expect(all).toHaveAttribute("data-slot", "category-pill");
    expect(screen.getByRole("link", { name: /^Immunity\s*\(11\)$/ })).toHaveClass("mt-4");
  });
});
