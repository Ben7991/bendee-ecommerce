import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { FilterChip } from "./FilterChip";

describe("FilterChip", () => {
  it("is a button that removes the filter", async () => {
    const onClick = vi.fn();
    render(
      <FilterChip aria-label="Remove filter: Vegan" onClick={onClick} className="mt-4">
        Vegan
      </FilterChip>,
    );
    const chip = screen.getByRole("button", { name: "Remove filter: Vegan" });
    expect(chip).toHaveAttribute("type", "button");
    expect(chip).toHaveClass("mt-4");
    await userEvent.click(chip);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders the child link with the × inside it when asChild is set", () => {
    render(
      <FilterChip asChild aria-label="Remove filter: Vegan">
        <a href="/shop">Vegan</a>
      </FilterChip>,
    );
    const link = screen.getByRole("link", { name: "Remove filter: Vegan" });
    expect(link).toHaveAttribute("data-slot", "filter-chip");
    expect(link.querySelector("svg")).not.toBeNull();
  });
});
