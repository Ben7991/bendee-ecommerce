import { render, screen } from "@testing-library/react";

import { OrderTimeline } from "./OrderTimeline";

describe("OrderTimeline", () => {
  it("marks the current stop in both layouts", () => {
    render(
      <OrderTimeline
        className="mt-4"
        steps={[
          { label: "Order paid", time: "10:42", state: "done" },
          { label: "Packing", compactLabel: "Packing your order", time: "Today", state: "current" },
          { label: "Out for delivery", time: "Sat", state: "todo", hideOnMobile: true },
        ]}
      />,
    );
    expect(screen.getByRole("region", { name: "Order progress" })).toHaveClass("mt-4");
    expect(screen.getByText("Packing").closest("li")).toHaveAttribute("aria-current", "step");
    expect(screen.getByText("Packing your order")).toBeInTheDocument();
    expect(screen.getAllByText("Out for delivery")).toHaveLength(1);
  });
});
