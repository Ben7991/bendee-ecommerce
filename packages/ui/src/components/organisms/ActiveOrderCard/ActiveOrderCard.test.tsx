import { render, screen } from "@testing-library/react";

import { ActiveOrderCard } from "./ActiveOrderCard";

describe("ActiveOrderCard", () => {
  it("names the order and shows its status, total and actions", () => {
    render(
      <ActiveOrderCard
        className="mt-4"
        number="JFK-250184"
        meta="Placed 13 Nov 2026 · 4 items"
        compactMeta="13 Nov · 4 items"
        status={{ label: "Packing", tone: "info" }}
        items={[{ id: "a" }, { id: "b" }]}
        total="GHS 1,254.60"
        arrival="Arriving tomorrow"
        stage={1}
        actions={<a href="/account/orders/JFK-250184">View details</a>}
        compactAction={<a href="/track">Track order</a>}
      />,
    );
    const card = screen.getByRole("article", { name: "JFK-250184" });
    expect(card).toHaveClass("mt-4");
    expect(screen.getAllByText("Packing")).toHaveLength(2);
    expect(screen.getByText("GHS 1,254.60")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View details" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Track order" })).toBeInTheDocument();
  });
});
