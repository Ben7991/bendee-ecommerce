import { fireEvent, render, screen } from "@testing-library/react";

import { AdjustStockDialog } from "./AdjustStockDialog";

beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

const props = {
  open: true,
  variant: { id: "grn-30", name: "Greens Daily · 30 servings", compactName: "Greens Daily", onHand: 130, reserved: 6, averageCost: 48 },
  reasons: {
    remove: [
      { value: "damaged", label: "Damaged" },
      { value: "lost", label: "Lost" },
    ],
    add: [{ value: "found", label: "Found in store" }],
  },
  noteRequiredFor: ["damaged"],
  orders: [
    { number: "JFK-251490", status: { label: "To pack", tone: "info" as const }, summary: "Efua Boateng · 3 × Greens Daily" },
    { number: "JFK-251487", status: { label: "Packed", tone: "warning" as const }, summary: "Kwame Mensah · 1 × Greens Daily" },
  ],
  staffName: "Abena M.",
};

describe("AdjustStockDialog", () => {
  it("removes units with a reason and previews the result", () => {
    render(<AdjustStockDialog {...props} defaultQuantity={3} />);
    expect(screen.getByRole("dialog", { name: "Adjust stock" })).toBeInTheDocument();
    expect(screen.getByText("127")).toHaveClass("text-error");
    expect(screen.getByRole("button", { name: "Remove 3 units" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Note/ })).toBeRequired();
    fireEvent.click(screen.getByRole("radio", { name: "Lost" }));
    expect(screen.getByRole("textbox", { name: /Note/ })).not.toBeRequired();
  });

  it("links an order from the search with the keyboard", () => {
    render(<AdjustStockDialog {...props} />);
    const search = screen.getByRole("combobox", { name: /Linked order/ });
    fireEvent.change(search, { target: { value: "2514" } });
    expect(screen.getAllByRole("option")).toHaveLength(2);
    fireEvent.keyDown(search, { key: "ArrowDown" });
    fireEvent.keyDown(search, { key: "Enter" });
    expect(screen.getByRole("button", { name: "Unlink JFK-251487" })).toBeInTheDocument();
  });

  it("works out the difference when setting a count", () => {
    render(<AdjustStockDialog {...props} defaultMode="count" />);
    fireEvent.change(screen.getByRole("textbox", { name: "Counted on shelf" }), { target: { value: "126" } });
    expect(screen.getByText("−4 units")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save count · −4" })).toBeInTheDocument();
    expect(screen.getByText("120")).toBeInTheDocument();
  });

  it("lets staff pick the product when opened without one", () => {
    const other = { id: "ash-120", name: "Ashwagandha Calm · 120 caps", onHand: 18, reserved: 0, averageCost: 125 };
    render(<AdjustStockDialog {...props} variants={[props.variant, other]} orders={{ "grn-30": props.orders }} />);
    fireEvent.change(screen.getByRole("combobox", { name: "Product" }), { target: { value: "ash-120" } });
    expect(screen.getByText(/Ashwagandha Calm · 120 caps · 18 on hand, 18 available/)).toBeInTheDocument();
    expect(screen.getByText("17")).toBeInTheDocument();
  });
});
