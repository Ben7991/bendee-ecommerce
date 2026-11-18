import { render, screen } from "@testing-library/react";

import { ProductRail } from "./ProductRail";

const products = [
  { id: "a", name: "Ashwagandha Tablets", details: "120 tablets", href: "/p/a", price: 380, rating: 4.8, reviewCount: 2087, tint: "amber" as const },
  { id: "b", name: "Energy Capsules", details: "30 capsules", href: "/p/b", price: 320, rating: 4.9, reviewCount: 4560, tint: "lavender" as const },
];

describe("ProductRail", () => {
  it("renders a titled list of product cards", () => {
    render(<ProductRail eyebrow="Popular right now" title="Start with a bestseller" products={products} className="mt-4" />);
    const rail = screen.getByRole("region", { name: "Start with a bestseller" });
    expect(rail).toHaveClass("mt-4");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByRole("link", { name: /Ashwagandha Tablets/ })).toHaveAttribute("href", "/p/a");
  });

  it("starts with the previous button disabled", () => {
    render(<ProductRail title="Rail" products={products} />);
    expect(screen.getByRole("button", { name: "Previous products" })).toBeDisabled();
  });
});
