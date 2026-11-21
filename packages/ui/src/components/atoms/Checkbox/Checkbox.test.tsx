import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("toggles from its label", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Checkbox id="c" className="mt-4" />
        <label htmlFor="c">Keep me signed in</label>
      </>,
    );
    const box = screen.getByRole("checkbox", { name: "Keep me signed in" });
    expect(box).not.toBeChecked();
    expect(box).toHaveClass("mt-4");
    await user.click(screen.getByText("Keep me signed in"));
    expect(box).toBeChecked();
  });

  it("shows a partial selection", () => {
    render(<Checkbox checked="indeterminate" aria-label="Select all orders" />);
    const box = screen.getByRole("checkbox", { name: "Select all orders" });
    expect(box).toHaveAttribute("aria-checked", "mixed");
    expect(box).toHaveAttribute("data-state", "indeterminate");
  });
});
