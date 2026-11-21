import { render, screen } from "@testing-library/react";

import { CustomerBuysMost } from "./CustomerBuysMost";

describe("CustomerBuysMost", () => {
  it("lists the products with their detail", () => {
    render(<CustomerBuysMost meta="Across 14 orders" products={[{ id: "1", name: "Greens Daily", detail: "9 tubs" }]} className="mt-4" />);
    expect(screen.getByRole("region", { name: "Buys most" })).toHaveClass("mt-4");
    expect(screen.getByRole("listitem")).toHaveTextContent("Greens Daily9 tubs");
    expect(screen.getByText("Across 14 orders")).toBeInTheDocument();
  });
});
