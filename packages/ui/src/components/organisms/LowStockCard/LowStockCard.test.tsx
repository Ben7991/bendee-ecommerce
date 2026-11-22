import { render, screen } from "@testing-library/react";

import { LowStockCard } from "./LowStockCard";

describe("LowStockCard", () => {
  it("lists running-out products, red when sold out", () => {
    render(
      <LowStockCard
        className="mt-4"
        count={2}
        action={{ label: "Receive stock", href: "/admin/inventory/receive" }}
        footer={{ label: "See all 2 in Inventory", href: "/admin/inventory" }}
        items={[
          { id: "a", name: "Ashwagandha Calm", detail: "60 capsules", href: "/admin/products/a", left: 0, forecast: "Sold out" },
          { id: "b", name: "Magnesium Sleep", detail: "Gummies", href: "/admin/products/b", left: 3, forecast: "~2 days" },
        ]}
      />,
    );
    expect(screen.getByRole("region", { name: "Low stock" })).toHaveClass("mt-4");
    expect(screen.getByText("0 left")).toHaveClass("text-error");
    expect(screen.getByText("3 left")).toHaveClass("text-warning-text");
    expect(screen.getByRole("link", { name: /Ashwagandha Calm/ })).toHaveAttribute("href", "/admin/products/a");
    expect(screen.getByRole("link", { name: "Receive stock" })).toHaveAttribute("href", "/admin/inventory/receive");
    expect(screen.getByRole("link", { name: "See all 2 in Inventory" })).toBeInTheDocument();
  });
});
