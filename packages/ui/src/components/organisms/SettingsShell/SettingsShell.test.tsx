import { act, fireEvent, render, screen } from "@testing-library/react";

import { SettingsShell } from "./SettingsShell";

describe("SettingsShell", () => {
  it("counts changes and discards them", async () => {
    vi.useFakeTimers();
    render(
      <SettingsShell pageTitle="Store profile" savedAt="10:42" backHref="/settings" aria-label="Settings form">
        <input name="store" defaultValue="Jofak" aria-label="Store name" />
      </SettingsShell>,
    );
    expect(screen.getAllByText("All changes saved · 10:42").length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: "No changes to save" })).toBeDisabled();
    fireEvent.input(screen.getByRole("textbox", { name: "Store name" }), { target: { value: "Jofak GH" } });
    await act(async () => vi.runAllTimers());
    expect(screen.getAllByText("1 unsaved change").length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: "Save 1 change" })).toBeEnabled();
    fireEvent.click(screen.getAllByRole("button", { name: "Discard" })[0]!);
    await act(async () => vi.runAllTimers());
    expect(screen.getByRole("textbox", { name: "Store name" })).toHaveValue("Jofak");
    vi.useRealTimers();
  });

  it("drops save controls when read-only", () => {
    render(<SettingsShell pageTitle="Audit log" backHref="/settings" readOnly>Log</SettingsShell>);
    expect(screen.queryByRole("button", { name: "Save changes" })).not.toBeInTheDocument();
  });
});
