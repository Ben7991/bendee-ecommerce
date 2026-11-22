import { fireEvent, render, screen } from "@testing-library/react";

import { PreferenceToggle } from "./PreferenceToggle";

describe("PreferenceToggle", () => {
  it("names the switch by its title and toggles", () => {
    render(<PreferenceToggle title="SMS offers" description="Reply STOP to opt out" />);
    const toggle = screen.getByRole("switch", { name: "SMS offers" });
    expect(toggle).toHaveAccessibleDescription("Reply STOP to opt out");
    expect(toggle).toHaveAttribute("aria-checked", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "true");
  });
});
