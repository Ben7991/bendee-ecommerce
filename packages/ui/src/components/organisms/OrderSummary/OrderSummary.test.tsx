import { render, screen } from "@testing-library/react";

import { OrderSummary } from "./OrderSummary";

describe("OrderSummary", () => {
  it("shows the totals and a checkout link", () => {
    render(
      <OrderSummary
        checkoutHref="/checkout"
        className="mt-4"
        totals={{ subtotalLabel: "Subtotal · 2 items", subtotal: "GHS 770.00", delivery: "Free", total: "GHS 770.00", taxNote: "Includes VAT" }}
        discount={<p>Code box</p>}
      />,
    );
    const summary = screen.getByRole("region", { name: "Order summary" });
    expect(summary).toHaveClass("mt-4");
    expect(screen.getByText("Subtotal · 2 items")).toBeInTheDocument();
    expect(screen.getAllByText("GHS 770.00")).toHaveLength(2);
    expect(screen.getByRole("link", { name: "Checkout securely" })).toHaveAttribute("href", "/checkout");
    expect(screen.getByText("Code box")).toBeInTheDocument();
  });
});
