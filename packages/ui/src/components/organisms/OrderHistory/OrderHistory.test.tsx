import { render, screen } from "@testing-library/react";

import { OrderHistory } from "./OrderHistory";

describe("OrderHistory", () => {
  it("lists past orders and strikes refunded totals", () => {
    render(
      <OrderHistory
        className="mt-4"
        rows={[
          { id: "1", number: "JFK-249702", meta: "28 Oct", status: { label: "Delivered", tone: "success" }, items: [{ id: "a" }], total: "GHS 930.00", compactTitle: "Greens", compactMeta: "Delivered", action: <a href="#r">Reorder</a> },
          { id: "2", number: "JFK-247530", meta: "14 Sep", status: { label: "Refunded", tone: "neutral" }, items: [{ id: "b" }], total: "GHS 380.00", refunded: true, compactTitle: "Ashwagandha", compactMeta: "Refunded" },
        ]}
      />,
    );
    expect(screen.getByRole("region", { name: "Past orders" })).toHaveClass("mt-4");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("GHS 380.00")).toHaveClass("line-through");
    expect(screen.getByRole("link", { name: "Reorder" })).toBeInTheDocument();
  });
});
