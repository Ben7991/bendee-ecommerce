import { render, screen } from "@testing-library/react";

import { SettingsPanel } from "./SettingsPanel";

describe("SettingsPanel", () => {
  it("groups fields under a titled switch", () => {
    render(<SettingsPanel title="Express · same day" toggle={{ name: "express", defaultChecked: true }}>Fields</SettingsPanel>);
    expect(screen.getByRole("switch", { name: "Express · same day" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByText("Fields")).toBeInTheDocument();
  });
});
