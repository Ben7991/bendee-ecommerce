import { fireEvent, render, screen, within } from "@testing-library/react";

import { ReceiveStockSheet } from "./ReceiveStockSheet";

const variants = [
  { id: "ash-60", name: "Ashwagandha · 60", sku: "JF-ASH-60", barcode: "6001", onHand: 2, unitCost: 70 },
  { id: "mag", name: "Magnesium Sleep", sku: "JF-MAG-30", barcode: "6002", onHand: 5, unitCost: 80 },
];

describe("ReceiveStockSheet", () => {
  it("adds lines by scan or search and totals them", () => {
    render(
      <ReceiveStockSheet
        open
        location="Main store, Osu"
        variants={variants}
        suppliers={[{ value: "ans", label: "Accra Nutrition Supply" }]}
        defaultLines={[{ variantId: "ash-60", quantity: 48, unitCost: 70 }]}
      />,
    );
    const dialog = screen.getByRole("dialog", { name: "Receive stock" });
    expect(within(dialog).getByRole("button", { name: "Receive 48 units" })).toBeInTheDocument();

    // A scanned barcode adds the exact match on Enter.
    const search = screen.getByRole("combobox", { name: "Scan a barcode or search a product" });
    fireEvent.change(search, { target: { value: "6002" } });
    fireEvent.keyDown(search, { key: "Enter" });
    expect(screen.getByText("Magnesium Sleep")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Receive 49 units" })).toBeInTheDocument();
    expect(screen.getByText("49 units · 2 items")).toBeInTheDocument();
    expect(screen.getByText("GHS 3,440.00 at cost")).toBeInTheDocument();

    // Typing a quantity updates the total; removing a line drops it.
    fireEvent.change(screen.getByRole("textbox", { name: "Magnesium Sleep" }), { target: { value: "36" } });
    expect(screen.getByRole("button", { name: "Receive 84 units" })).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole("button", { name: "Remove Ashwagandha · 60" })[0]!);
    expect(screen.getByRole("button", { name: "Receive 36 units" })).toBeInTheDocument();
  });

  it("lists products while browsing", () => {
    render(<ReceiveStockSheet open location="Osu" variants={variants} suppliers={[]} />);
    fireEvent.click(screen.getByRole("button", { name: "Browse" }));
    expect(within(screen.getByRole("listbox", { name: "Products" })).getAllByRole("option")).toHaveLength(2);
    expect(screen.getByRole("button", { name: "Receive 0 units" })).toBeDisabled();
  });
});
