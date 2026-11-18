import { render, screen } from "@testing-library/react";

import { SavedToolbar } from "./SavedToolbar";

describe("SavedToolbar", () => {
  it("renders the summaries, sort and action", () => {
    render(
      <SavedToolbar
        summary={
          <>
            <strong>6</strong> saved
          </>
        }
        compactSummary="5 in stock"
        sort={<select aria-label="Sort favourites" />}
        action={<button type="button">Add 5 to cart</button>}
        className="mt-4"
      />,
    );
    expect(screen.getByText("saved", { exact: false })).toHaveTextContent("6 saved");
    expect(screen.getByText("5 in stock")).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Sort favourites" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add 5 to cart" }).closest("[data-slot=saved-toolbar]")).toHaveClass("mt-4");
  });
});
