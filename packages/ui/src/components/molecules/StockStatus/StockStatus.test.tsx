import { render, screen } from "@testing-library/react";

import { StockStatus } from "./StockStatus";

describe("StockStatus", () => {
  it("renders the label and note", () => {
    render(<StockStatus tone="warning" label="Only 3 left" note="Order soon" className="mt-4" />);
    const line = screen.getByText("Only 3 left").closest("[data-slot=stock-status]");
    expect(line).toHaveTextContent("Only 3 left · Order soon");
    expect(line).toHaveClass("mt-4");
    expect(screen.getByText("Only 3 left")).toHaveClass("text-warning-text");
  });
});
