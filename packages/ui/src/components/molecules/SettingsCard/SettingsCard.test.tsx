import { render, screen } from "@testing-library/react";

import { SettingsCard } from "./SettingsCard";

describe("SettingsCard", () => {
  it("shows the title, eyebrow, action and content", () => {
    render(<SettingsCard eyebrow="Editing zone" title="Accra Central" action={<a href="#a">18 areas ›</a>} tone="muted">Fields</SettingsCard>);
    expect(screen.getByRole("heading", { name: "Accra Central" })).toBeInTheDocument();
    expect(screen.getByText("Editing zone")).toBeInTheDocument();
    expect(screen.getByText("Fields")).toHaveClass("bg-surface-subtle");
  });
});
