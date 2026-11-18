import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { QuantityStepper } from "./QuantityStepper";

describe("QuantityStepper", () => {
  it("labels its buttons and reports clicks", async () => {
    const user = userEvent.setup();
    const onIncrement = vi.fn();
    render(<QuantityStepper value={2} label="Energy Capsules" onIncrement={onIncrement} className="mt-4" />);
    expect(screen.getByRole("group", { name: "Quantity of Energy Capsules" })).toHaveClass("mt-4");
    expect(screen.getByRole("status")).toHaveTextContent("2");
    await user.click(screen.getByRole("button", { name: "Increase Energy Capsules" }));
    expect(onIncrement).toHaveBeenCalledOnce();
  });

  it("disables decrease at the minimum and everything when disabled", () => {
    const { rerender } = render(<QuantityStepper value={1} label="Greens" />);
    expect(screen.getByRole("button", { name: "Decrease Greens" })).toBeDisabled();
    rerender(<QuantityStepper value={3} label="Greens" disabled />);
    expect(screen.getByRole("button", { name: "Increase Greens" })).toBeDisabled();
  });
});
