import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CheckoutSummary } from "./CheckoutSummary";

const props = {
  itemCount: 1,
  items: [{ id: "a", name: "Daily Greens Powder", price: "GHS 450", quantity: 1 }],
  totals: { subtotalLabel: "Subtotal · 1 item", subtotal: "GHS 450.00", deliveryLabel: "Delivery", delivery: "Free", total: "GHS 450.00", taxNote: "Includes VAT" },
};

describe("CheckoutSummary", () => {
  it("shows the order in the sidebar", () => {
    render(<CheckoutSummary {...props} className="mt-4" />);
    const summary = screen.getByRole("complementary", { name: "Your order" });
    expect(summary).toHaveClass("mt-4");
    expect(screen.getByText("Daily Greens Powder")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Edit cart" })).toHaveAttribute("href", "/cart");
  });

  it("opens the strip", async () => {
    const user = userEvent.setup();
    render(<CheckoutSummary {...props} variant="strip" />);
    const toggle = screen.getByRole("button", { name: /Show order summary/ });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);
    expect(screen.getByRole("button", { name: /Hide order summary/ })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Daily Greens Powder")).toBeVisible();
  });
});
