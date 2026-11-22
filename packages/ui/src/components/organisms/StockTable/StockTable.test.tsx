import { render, screen } from "@testing-library/react";

import { StockTable, type StockItem } from "./StockTable";

const item = (overrides: Partial<StockItem>): StockItem => ({
  id: "x",
  name: "Greens Daily · 30 servings",
  detail: "JF-GRN-30",
  onHand: 130,
  reserved: 6,
  available: 124,
  alertAt: 15,
  value: "GHS 6,240",
  status: "ok",
  level: 100,
  action: { label: "Adjust", href: "/adjust" },
  ...overrides,
});

describe("StockTable", () => {
  it("shows levels, flags sold-out stock and links the row action", () => {
    render(
      <StockTable
        className="mt-4"
        items={[
          item({ id: "a", name: "Ashwagandha Calm · 60 caps", available: 0, status: "out", action: { label: "Receive", href: "/receive", tone: "brand" } }),
          item({ id: "b" }),
          item({ id: "c", name: "Gift wrap", tracked: false, action: { label: "Track", href: "/track" } }),
        ]}
      />,
    );
    expect(screen.getByRole("region", { name: "Stock levels" })).toHaveClass("mt-4");
    expect(screen.getByText("0 · Sold out")).toHaveClass("text-error");
    expect(screen.getAllByRole("link", { name: "Receive Ashwagandha Calm · 60 caps" })[0]).toHaveAttribute("href", "/receive");
    expect(screen.getAllByText("Stock not tracked for this item")).toHaveLength(2);
    expect(screen.getAllByText("130 on hand · 6 reserved")).toHaveLength(2);
  });

  it("says when nothing matches", () => {
    render(<StockTable items={[]} emptyMessage="No variants match “zz”." />);
    expect(screen.getByText("No variants match “zz”.")).toBeInTheDocument();
  });
});
