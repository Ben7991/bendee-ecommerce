import { render, screen } from "@testing-library/react";

import { OrderDetailHeader } from "./OrderDetailHeader";

describe("OrderDetailHeader", () => {
  it("shows the order, its status and the way back", () => {
    render(
      <OrderDetailHeader
        className="mt-4"
        backHref="/admin/orders"
        number="JFK-251477"
        status={{ label: "Processing", tone: "warning" }}
        payment={{ label: "Cash on delivery · to collect", compactLabel: "COD · to collect" }}
        meta="Placed today at 07:58"
        total="GHS 596.00"
        placed="Today, 07:58"
        actions={<button type="button">Mark packed</button>}
      />,
    );
    expect(screen.getAllByRole("heading", { level: 1, name: "JFK-251477" })).toHaveLength(2);
    expect(screen.getByRole("link", { name: "Back to Orders" })).toHaveAttribute("href", "/admin/orders");
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toHaveTextContent("Orders/JFK-251477");
    expect(screen.getAllByText("Processing")[0]).toHaveClass("bg-tint-sun");
    expect(screen.getByRole("button", { name: "Mark packed" })).toBeInTheDocument();
    expect(screen.getByRole("banner")).toHaveClass("mt-4");
  });
});
