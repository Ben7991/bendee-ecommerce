import { render, screen } from "@testing-library/react";

import { CartLines } from "./CartLines";

describe("CartLines", () => {
  it("lists each item", () => {
    const { container } = render(
      <CartLines
        className="mt-4"
        items={[
          { id: "a", name: "Greens", href: "/a", details: "25 servings", unitPrice: 450, quantity: 1, lineTotal: 450, tint: "sage" },
          { id: "b", name: "Energy", href: "/b", details: "30 capsules", unitPrice: 320, quantity: 2, lineTotal: 640, tint: "lavender" },
        ]}
      />,
    );
    expect(screen.getByRole("list", { name: "Items in your cart" }).children).toHaveLength(2);
    expect(container.firstChild).toHaveClass("mt-4");
  });
});
