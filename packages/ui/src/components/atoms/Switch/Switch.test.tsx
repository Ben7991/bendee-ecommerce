import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Switch } from "./Switch";

describe("Switch", () => {
  it("toggles", async () => {
    const user = userEvent.setup();
    render(<Switch aria-label="Gift" className="mt-4" />);
    const toggle = screen.getByRole("switch", { name: "Gift" });
    expect(toggle).toHaveClass("mt-4");
    expect(toggle).not.toBeChecked();
    await user.click(toggle);
    expect(toggle).toBeChecked();
  });
});
