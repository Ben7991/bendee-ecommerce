import { fireEvent, render, screen } from "@testing-library/react";
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

  it("shows the maximum in the outline variant", () => {
    render(<QuantityStepper variant="outline" showMax value={0} min={0} max={2} label="Energy B-Complex" />);
    expect(screen.getByRole("status")).toHaveTextContent("0 / 2");
    expect(screen.getByRole("button", { name: "Decrease Energy B-Complex" })).toBeDisabled();
    expect(screen.getByRole("group", { name: "Quantity of Energy B-Complex" })).toHaveClass("w-27");
  });

  it("takes a typed number, clamped, when editable", () => {
    const onValueChange = vi.fn();
    render(<QuantityStepper variant="outline" size="lg" value={3} min={1} max={10} label="Greens" name="quantity" onValueChange={onValueChange} />);
    const input = screen.getByRole("textbox", { name: "Greens" });
    expect(input).toHaveAttribute("name", "quantity");
    fireEvent.change(input, { target: { value: "42" } });
    expect(onValueChange).toHaveBeenCalledWith(10);
    expect(screen.getByRole("group", { name: "Quantity of Greens" })).toHaveClass("w-37.5");
  });
});
