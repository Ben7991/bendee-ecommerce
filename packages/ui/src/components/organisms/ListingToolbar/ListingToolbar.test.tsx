import { render, screen } from "@testing-library/react";

import { ListingToolbar } from "./ListingToolbar";

describe("ListingToolbar", () => {
  it("summarises the results and renders its controls", () => {
    render(
      <ListingToolbar
        range="1–24"
        total={41}
        filters={<button type="button">Filters</button>}
        sort={<select aria-label="Sort products" />}
        chips={<button type="button">Vegan</button>}
        clearAction={<a href="/shop">Clear all</a>}
        className="mt-4"
      />,
    );
    expect(screen.getByText(/Showing/)).toHaveTextContent("Showing 1–24 of 41");
    expect(screen.getByText(/results/)).toHaveTextContent("41 results");
    expect(screen.getByRole("button", { name: "Filters" })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Sort products" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Vegan" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Clear all" }).closest("[data-slot=listing-toolbar]")).toHaveClass("mt-4");
  });
});
