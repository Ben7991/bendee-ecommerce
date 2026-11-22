import { render, screen } from "@testing-library/react";

import { OrderItemRow } from "./OrderItemRow";

describe("OrderItemRow", () => {
  it("shows name, quantity and price", () => {
    const { container } = render(<OrderItemRow name="Energy Capsules" price="GHS 640" quantity={2} className="mt-4" />);
    expect(screen.getByText("Energy Capsules")).toBeInTheDocument();
    expect(screen.getByText("GHS 640")).toBeInTheDocument();
    expect(screen.getByText("Quantity", { exact: false }).parentElement).toHaveTextContent("Quantity 2");
    expect(container.firstChild).toHaveClass("mt-4");
  });
});
