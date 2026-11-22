import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { BestsellerShowcase, type ShowcaseItem } from "./BestsellerShowcase";

const base = { details: "", href: "#", rating: 4.8, reviewCount: 10, tint: "sage" as const };
const products: ShowcaseItem[] = [
  { ...base, id: "greens", name: "Daily Greens Powder", price: 450, category: "powders", showOnMobile: true },
  { ...base, id: "energy", name: "Energy Capsules", price: 320, category: "capsules" },
];
const filters = [
  { value: "all", label: "All" },
  { value: "capsules", label: "Capsules" },
  { value: "gummies", label: "Gummies" },
];

describe("BestsellerShowcase", () => {
  it("filters products by category", async () => {
    render(<BestsellerShowcase title="Loved" compactTitle="Bestsellers" filters={filters} products={products} shopAllHref="/shop" />);
    expect(screen.getAllByRole("article")).toHaveLength(2);
    await userEvent.click(screen.getByRole("radio", { name: "Capsules" }));
    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(screen.getByRole("link", { name: /Energy Capsules/ })).toBeInTheDocument();
  });

  it("says so when a filter is empty", async () => {
    render(<BestsellerShowcase title="Loved" compactTitle="Bestsellers" filters={filters} products={products} shopAllHref="/shop" />);
    await userEvent.click(screen.getByRole("radio", { name: "Gummies" }));
    expect(screen.getByText("No bestsellers in this category yet.")).toBeInTheDocument();
  });
});
