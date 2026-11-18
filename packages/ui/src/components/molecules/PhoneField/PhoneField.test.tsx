import { render, screen } from "@testing-library/react";

import { PhoneField } from "./PhoneField";

describe("PhoneField", () => {
  it("is a labelled tel input with the dial code", () => {
    render(<PhoneField name="phone" className="mt-4" />);
    const input = screen.getByRole("textbox", { name: "Phone number" });
    expect(input).toHaveAttribute("type", "tel");
    expect(input).toHaveAttribute("autocomplete", "tel-national");
    expect(screen.getByText("+233")).toBeInTheDocument();
  });
});
