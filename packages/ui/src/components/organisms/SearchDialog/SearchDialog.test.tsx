import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SearchDialog } from "./SearchDialog";

const props = {
  suggestions: ["stress", "stress and sleep", "sleep"],
  recent: ["magnesium", "vitamin d3"],
  products: [
    { id: "ash", name: "Ashwagandha Tablets", href: "/products/ash", meta: "Stress & vitality", price: 380, tint: "amber" as const },
    { id: "nmnh", name: "NMNH 650mg", href: "/products/nmnh", meta: "NAD+ support", price: 650, tint: "sun" as const },
  ],
  categories: [{ label: "Sleep & Stress", href: "/collections/sleep-stress", count: 14, tint: "sage" as const }],
};

describe("SearchDialog", () => {
  it("narrows suggestions, products and categories as you type", async () => {
    const user = userEvent.setup();
    render(<SearchDialog {...props} />);
    await user.click(screen.getByRole("button", { name: "Search" }));
    const dialog = screen.getByRole("dialog", { name: "Search" });
    await user.type(within(dialog).getByRole("searchbox"), "stre");

    const suggestions = within(screen.getByRole("region", { name: "Suggestions" })).getAllByRole("link");
    expect(suggestions.map((link) => link.textContent)).toEqual(["stress", "stress and sleep"]);
    expect(suggestions[0]).toHaveAttribute("href", "/search?q=stress");

    const products = within(screen.getByRole("region", { name: "Products" }));
    expect(products.getByRole("link", { name: /Ashwagandha Tablets/ })).toBeInTheDocument();
    expect(products.queryByRole("link", { name: /NMNH/ })).not.toBeInTheDocument();

    expect(screen.getByRole("link", { name: "See all results for “stre”" })).toHaveAttribute("href", "/search?q=stre");
  });

  it("removes a recent search", async () => {
    const user = userEvent.setup();
    render(<SearchDialog {...props} />);
    await user.click(screen.getByRole("button", { name: "Search" }));
    await user.click(screen.getByRole("button", { name: "Remove “magnesium” from recent searches" }));
    const recent = within(screen.getByRole("region", { name: "Recent searches" }));
    expect(recent.queryByText("magnesium")).not.toBeInTheDocument();
    expect(recent.getByText("vitamin d3")).toBeInTheDocument();
  });

  it("opens from a search-bar trigger and closes with Cancel", async () => {
    const user = userEvent.setup();
    render(<SearchDialog {...props} trigger="bar" />);
    await user.click(screen.getByRole("button", { name: "Search supplements…" }));
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
