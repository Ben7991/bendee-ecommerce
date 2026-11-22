import { render, screen } from "@testing-library/react";

import { SettingsToggle } from "./SettingsToggle";

describe("SettingsToggle", () => {
  it("shows the setting, its figure and a named switch", () => {
    render(<SettingsToggle title="MTN MoMo" description="Approve on phone" stat="91% success" name="momo" defaultChecked leading="MTN" leadingTone="sun" />);
    expect(screen.getByRole("switch", { name: "MTN MoMo" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByText("91% success")).toBeInTheDocument();
  });

  it("greys a disabled row with a badge", () => {
    render(<SettingsToggle title="Bank transfer" badge="Coming soon" disabled />);
    expect(screen.getByRole("switch", { name: "Bank transfer" })).toBeDisabled();
    expect(screen.getByText("Coming soon")).toHaveClass("border-dashed");
  });
});
