import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { OptionPicker } from "./OptionPicker";

const options = [
  { value: "lemon-lime", label: "Lemon lime" },
  { value: "mixed-berry", label: "Mixed berry" },
  { value: "unflavoured", label: "Unflavoured", disabled: true },
];

describe("OptionPicker", () => {
  it("shows the chosen option in the label and changes it", async () => {
    const onValueChange = vi.fn();
    render(<OptionPicker label="Flavour" options={options} onValueChange={onValueChange} className="mt-4" />);
    const group = screen.getByRole("radiogroup", {
      name: "Flavour: Lemon lime",
    });
    expect(group.closest("[data-slot=option-picker]")).toHaveClass("mt-4");
    expect(screen.getByRole("radio", { name: "Lemon lime" })).toBeChecked();

    await userEvent.click(screen.getByRole("radio", { name: "Mixed berry" }));
    expect(onValueChange).toHaveBeenCalledWith("mixed-berry");
    expect(screen.getByRole("radiogroup", { name: "Flavour: Mixed berry" })).toBeInTheDocument();
  });

  it("disables unavailable options", () => {
    render(<OptionPicker label="Flavour" options={options} />);
    expect(screen.getByRole("radio", { name: "Unflavoured (unavailable)" })).toBeDisabled();
  });

  it("renders card details and badges", () => {
    render(
      <OptionPicker
        label="Size"
        variant="card"
        options={[
          {
            value: "50",
            label: "50 servings",
            detail: "GHS 16 / serving",
            badge: "Best value",
          },
        ]}
      />,
    );
    expect(screen.getByRole("radio", { name: /50 servings/ })).toHaveTextContent("GHS 16 / serving");
    expect(screen.getByText("Best value")).toBeInTheDocument();
  });
});
