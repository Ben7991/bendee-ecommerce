import { render, screen } from "@testing-library/react";

import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  it("is a GET search form with a labelled field", () => {
    render(<SearchBar action="/search" className="mt-4" />);
    const form = screen.getByRole("search");
    expect(form).toHaveAttribute("action", "/search");
    expect(form).toHaveAttribute("method", "get");
    expect(form).toHaveClass("mt-4");
    expect(screen.getByRole("searchbox", { name: "Search the shop" })).toHaveAttribute("name", "q");
    expect(screen.getByRole("button", { name: "Search" })).toHaveAttribute("type", "submit");
  });
});
