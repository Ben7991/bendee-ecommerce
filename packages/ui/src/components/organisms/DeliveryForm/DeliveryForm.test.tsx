import { render, screen } from "@testing-library/react";

import { DeliveryForm } from "./DeliveryForm";

describe("DeliveryForm", () => {
  it("renders the address fields and delivery methods", () => {
    const { container } = render(
      <DeliveryForm
        className="mt-4"
        regions={[{ value: "ga", label: "Greater Accra" }]}
        cities={[{ value: "accra", label: "Accra" }]}
        areas={[{ value: "el", label: "East Legon" }]}
        defaults={{ landmark: "Blue gate", method: "standard" }}
        methods={[
          { value: "standard", title: "Standard delivery" },
          { value: "express", title: "Express" },
        ]}
      />,
    );
    expect(screen.getByRole("combobox", { name: "Region" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Landmark" })).toHaveValue("Blue gate");
    expect(screen.getByRole("radiogroup", { name: "Delivery method" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /Standard delivery/ })).toBeChecked();
    expect(container.firstChild).toHaveClass("mt-4");
  });
});
