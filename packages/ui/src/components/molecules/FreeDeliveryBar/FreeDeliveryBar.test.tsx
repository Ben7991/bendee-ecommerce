import { render, screen } from "@testing-library/react";

import { FreeDeliveryBar } from "./FreeDeliveryBar";

describe("FreeDeliveryBar", () => {
  it("shows the message and progress", () => {
    const { container } = render(<FreeDeliveryBar message="Almost there" value={64} progressLabel="GHS 320 / GHS 500" className="mt-4" />);
    expect(screen.getByText("Almost there")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "Progress to free delivery" })).toHaveAttribute("aria-valuenow", "64");
    expect(screen.getByText("GHS 320 / GHS 500")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("mt-4");
  });

  it("has an inline variant", () => {
    render(<FreeDeliveryBar variant="inline" message="Unlocked" value={100} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100");
  });
});
