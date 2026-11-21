import { render, screen } from "@testing-library/react";

import { FilterButton } from "./FilterButton";

describe("FilterButton", () => {
  it("is a button that opens a filter", () => {
    render(<FilterButton label="Status" className="mt-4" />);
    const pill = screen.getByRole("button", { name: "Status" });
    expect(pill).toHaveAttribute("type", "button");
    expect(pill).toHaveClass("border-border", "mt-4");
  });

  it("says an applied filter can be cleared, as a link", () => {
    render(
      <FilterButton asChild variant="applied" label="Last 7 days">
        <a href="/admin/orders" />
      </FilterButton>,
    );
    const link = screen.getByRole("link", { name: "Last 7 days, clear filter" });
    expect(link).toHaveAttribute("href", "/admin/orders");
    expect(link).toHaveClass("bg-surface");
  });
});
