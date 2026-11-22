import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ProductCard, type ProductCardData } from "./ProductCard";

const product: ProductCardData = {
  id: "greens",
  name: "Daily Greens Powder",
  shortName: "Daily Greens",
  details: "Lemon lime · 25 servings",
  shortDetails: "25 servings",
  href: "/products/daily-greens",
  price: 450,
  compareAt: 520,
  rating: 4.9,
  reviewCount: 3214,
  badge: { label: "Bestseller", variant: "solid" },
  tint: "sage",
};

describe("ProductCard", () => {
  it("links to the product and shows its price", () => {
    render(<ProductCard product={product} />);
    expect(screen.getByRole("link", { name: /Daily Greens/ })).toHaveAttribute("href", "/products/daily-greens");
    expect(screen.getAllByText("GHS 520", { exact: false })[0]?.tagName).toBe("S");
  });

  it("calls onAdd from the add buttons", async () => {
    const onAdd = vi.fn();
    render(<ProductCard product={product} onAdd={onAdd} />);
    const [mobileAdd] = screen.getAllByRole("button", { name: "Add Daily Greens Powder to bag" });
    await userEvent.click(mobileAdd!);
    expect(onAdd).toHaveBeenCalledOnce();
  });

  it("swaps Add for Notify me when sold out", () => {
    render(<ProductCard product={{ ...product, soldOut: true, notifyHref: "/products/daily-greens#notify" }} />);
    expect(screen.queryByRole("button", { name: /Add Daily Greens Powder/ })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Notify me when Daily Greens Powder is back" })).toHaveAttribute(
      "href",
      "/products/daily-greens#notify",
    );
  });

  it("shows a saved product with a filled heart that removes it", async () => {
    const onToggleSaved = vi.fn();
    render(<ProductCard product={product} saved onToggleSaved={onToggleSaved} />);
    const heart = screen.getByRole("button", { name: "Remove Daily Greens Powder from favourites" });
    expect(heart).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(heart);
    expect(onToggleSaved).toHaveBeenCalledOnce();
  });

  it("can show the sold-out action as a bell on mobile", () => {
    render(<ProductCard product={{ ...product, soldOut: true }} compactNotify="icon" />);
    expect(screen.getAllByRole("link", { name: "Notify me when Daily Greens Powder is back" })).toHaveLength(2);
  });
});
