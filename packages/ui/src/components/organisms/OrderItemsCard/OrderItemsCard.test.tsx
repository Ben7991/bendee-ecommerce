import { fireEvent, render, screen } from "@testing-library/react";

import { OrderItemsCard } from "./OrderItemsCard";

beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

const totals = {
  subtotalLabel: "Subtotal · 2 items",
  subtotal: "GHS 305.00",
  delivery: { label: "Same-day delivery", amount: "GHS 35.00" },
  total: "GHS 340.00",
};

describe("OrderItemsCard", () => {
  it("counts picked lines as they're ticked", () => {
    render(
      <OrderItemsCard
        className="mt-4"
        pickable
        totals={totals}
        items={[
          { id: "a", name: "Ashwagandha Calm", detail: "Shelf B2", quantityLabel: "1 × GHS 145.00", lineTotal: "GHS 145.00", picked: true },
          { id: "b", name: "Magnesium Sleep", detail: "Shelf A4", quantityLabel: "1 × GHS 160.00", lineTotal: "GHS 160.00" },
        ]}
      />,
    );
    expect(screen.getByRole("region", { name: "Items" })).toHaveClass("mt-4");
    expect(screen.getByRole("status")).toHaveTextContent("1 of 2 picked");
    fireEvent.click(screen.getByRole("checkbox", { name: "Picked Magnesium Sleep" }));
    expect(screen.getByRole("status")).toHaveTextContent("2 of 2 picked");
    expect(screen.getAllByText("GHS 340.00").length).toBeGreaterThan(0);
  });

  it("has no ticks when the order isn't being picked", () => {
    render(<OrderItemsCard totals={totals} items={[{ id: "a", name: "Greens", detail: "", quantityLabel: "1 × GHS 96.00", lineTotal: "GHS 96.00" }]} />);
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
  });
});
