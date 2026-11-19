import { render, screen } from "@testing-library/react";

import { MetricTile } from "./MetricTile";

describe("MetricTile", () => {
  it("shows the value with full and compact labels", () => {
    render(<MetricTile data-testid="tile" tone="brand" value="GHS 312" label="Saved with discounts" compactLabel="Saved" className="mt-4" />);
    expect(screen.getByText("GHS 312")).toHaveClass("text-brand");
    expect(screen.getByText("Saved")).toHaveClass("md:hidden");
    expect(screen.getByText("Saved with discounts")).toBeInTheDocument();
    expect(screen.getByTestId("tile")).toHaveClass("mt-4");
  });
});
