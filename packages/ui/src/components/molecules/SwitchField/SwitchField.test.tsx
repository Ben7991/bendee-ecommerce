import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SwitchField } from "./SwitchField";

describe("SwitchField", () => {
  it("toggles from its label", async () => {
    const user = userEvent.setup();
    render(<SwitchField label="Delivering to someone else?" className="mt-4" />);
    await user.click(screen.getByText("Delivering to someone else?"));
    expect(screen.getByRole("switch", { name: "Delivering to someone else?" })).toBeChecked();
  });
});
