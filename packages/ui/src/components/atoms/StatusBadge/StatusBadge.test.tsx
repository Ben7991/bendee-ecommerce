import { render, screen } from "@testing-library/react";

import { StatusBadge } from "./StatusBadge";

describe("StatusBadge", () => {
  it("shows the label in its tone", () => {
    render(<StatusBadge label="Delivered" tone="success" className="mt-4" />);
    const badge = screen.getByText("Delivered");
    expect(badge).toHaveClass("bg-sage-100", "text-brand", "mt-4");
  });

  it("draws a check instead of a dot", () => {
    render(<StatusBadge label="Verified" tone="success" marker="check" />);
    expect(screen.getByText("Verified").querySelector("svg")).not.toBeNull();
  });
});
