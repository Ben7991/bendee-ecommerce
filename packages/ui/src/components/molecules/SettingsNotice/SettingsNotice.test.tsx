import { render, screen } from "@testing-library/react";

import { SettingsNotice } from "./SettingsNotice";

describe("SettingsNotice", () => {
  it("shows an info or warning note", () => {
    render(<SettingsNotice tone="warning">Check with your accountant</SettingsNotice>);
    expect(screen.getByText("Check with your accountant").parentElement).toHaveClass("bg-tint-sun");
  });
});
