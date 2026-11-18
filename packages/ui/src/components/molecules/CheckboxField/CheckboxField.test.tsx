import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CheckboxField } from "./CheckboxField";

describe("CheckboxField", () => {
  it("toggles from its label", async () => {
    const user = userEvent.setup();
    render(<CheckboxField label="Keep me signed in" className="mt-4" />);
    const box = screen.getByRole("checkbox", { name: "Keep me signed in" });
    await user.click(screen.getByText("Keep me signed in"));
    expect(box).toBeChecked();
  });
});
