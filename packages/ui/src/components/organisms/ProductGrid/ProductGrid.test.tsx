import { render, screen } from "@testing-library/react";

import type { ProductCardData } from "../ProductCard";
import { ProductGrid } from "./ProductGrid";

const product = (id: string, name: string): ProductCardData => ({
  id,
  name,
  details: "30 capsules",
  href: `/products/${id}`,
  price: 320,
  rating: 4.9,
  reviewCount: 10,
  tint: "sage",
});

describe("ProductGrid", () => {
  it("lists the products and places the promo after the first row", () => {
    render(
      <ProductGrid
        products={[product("a", "Alpha"), product("b", "Beta"), product("c", "Gamma"), product("d", "Delta")]}
        promo={<p>Promo</p>}
        className="mt-4"
      />,
    );
    const list = screen.getByRole("list");
    expect(list).toHaveClass("mt-4");
    expect(screen.getAllByRole("article")).toHaveLength(4);
    // One copy for tablet (after 2) and one for desktop (after 3), each hidden at the other size.
    expect(screen.getAllByText("Promo")).toHaveLength(2);
    expect(screen.getByRole("link", { name: /Alpha/ })).toHaveAttribute("href", "/products/a");
  });
});
