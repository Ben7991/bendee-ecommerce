import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MiniCart } from "./MiniCart";

const items = [
  { id: "greens", name: "Daily Greens Powder", href: "/p/greens", details: "", compactDetails: "25 servings", unitPrice: 450, quantity: 1, lineTotal: 450, tint: "sage" as const },
];
const totals = {
  subtotalLabel: "Subtotal · 1 item",
  subtotal: "GHS 450.00",
  deliveryLabel: "Delivery",
  delivery: "Free",
  total: "GHS 450.00",
  taxNote: "Includes VAT",
};

describe("MiniCart", () => {
  it("opens from the bag button and lists the items", async () => {
    const user = userEvent.setup();
    render(<MiniCart items={items} totals={totals} />);
    await user.click(screen.getByRole("button", { name: "Bag, 1 items" }));
    const dialog = screen.getByRole("dialog", { name: /Your cart/ });
    expect(within(dialog).getByRole("article", { name: "Daily Greens Powder" })).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: "View cart" })).toHaveAttribute("href", "/cart");
    expect(within(dialog).getByRole("link", { name: "Checkout" })).toHaveAttribute("href", "/checkout");
  });

  it("closes when a link inside is followed", async () => {
    const user = userEvent.setup();
    render(<MiniCart items={items} totals={totals} defaultOpen />);
    await user.click(screen.getByRole("link", { name: "View cart" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("reports quantity changes with the item id", async () => {
    const user = userEvent.setup();
    const onQuantityChange = vi.fn();
    render(<MiniCart items={items} totals={totals} defaultOpen onQuantityChange={onQuantityChange} />);
    await user.click(screen.getByRole("button", { name: "Increase Daily Greens Powder" }));
    expect(onQuantityChange).toHaveBeenCalledWith("greens", 2);
  });

  it("shows the empty state and suggestions with no items", () => {
    render(
      <MiniCart
        items={[]}
        defaultOpen
        className="mt-4"
        empty={{ title: "Nothing in here yet", description: "Add something.", primaryAction: { label: "Shop bestsellers", href: "/shop" } }}
        suggestions={[{ name: "Energy Capsules", href: "/p/energy", meta: "★ 4.9" }]}
      />,
    );
    expect(screen.getByRole("dialog")).toHaveClass("mt-4");
    expect(screen.getByRole("heading", { name: "Nothing in here yet" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add Energy Capsules to bag" })).toBeInTheDocument();
  });
});
