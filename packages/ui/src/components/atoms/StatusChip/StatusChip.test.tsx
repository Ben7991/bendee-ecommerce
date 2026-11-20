import { render, screen } from "@testing-library/react";

import { StatusChip } from "./StatusChip";

describe("StatusChip", () => {
  it("renders the state with its tone and size", () => {
    render(
      <StatusChip tone="warning" size="sm" className="mt-4">
        Cash on delivery
      </StatusChip>,
    );
    const chip = screen.getByText("Cash on delivery");
    expect(chip).toHaveClass("bg-tint-sun", "text-warning-text", "text-11", "mt-4");
  });

  it("defaults to a success chip for tables", () => {
    render(<StatusChip>Paid · Card</StatusChip>);
    expect(screen.getByText("Paid · Card")).toHaveClass("bg-sage-100", "text-xs");
  });
});
