import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CartLine, type CartLineData } from "./CartLine";

const item: CartLineData = {
  id: "energy",
  name: "Energy Capsules",
  href: "/p/energy",
  details: "30 capsules · One-time purchase",
  unitPrice: 320,
  compareAtUnitPrice: 390,
  quantity: 2,
  lineTotal: 640,
  compareAtLineTotal: 780,
  tint: "lavender",
  action: { label: "Switch to subscribe & save 20%", href: "/subscribe" },
};

describe("CartLine", () => {
  it("renders the product with totals and reports quantity changes", async () => {
    const user = userEvent.setup();
    const onQuantityChange = vi.fn();
    render(<CartLine item={item} layout="compact" onQuantityChange={onQuantityChange} className="mt-4" />);
    const line = screen.getByRole("article", { name: "Energy Capsules" });
    expect(line).toHaveClass("mt-4");
    expect(within(line).getByRole("link", { name: "Energy Capsules" })).toHaveAttribute("href", "/p/energy");
    expect(within(line).getByText("GHS 640")).toBeInTheDocument();
    await user.click(within(line).getByRole("button", { name: "Increase Energy Capsules" }));
    expect(onQuantityChange).toHaveBeenCalledWith(3);
  });

  it("marks sold-out items and disables their stepper", () => {
    render(<CartLine item={{ ...item, soldOut: true }} layout="compact" />);
    expect(screen.getByText("Sold out — not included in your total")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Increase Energy Capsules" })).toBeDisabled();
  });

  it("hides cart-only actions in the dense mini-cart line", () => {
    render(<CartLine item={item} layout="compact" dense />);
    expect(screen.queryByRole("link", { name: "Switch to subscribe & save 20%" })).not.toBeInTheDocument();
  });
});
