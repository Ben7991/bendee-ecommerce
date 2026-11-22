import { fireEvent, render, screen } from "@testing-library/react";

import { SettingsField } from "./SettingsField";

describe("SettingsField", () => {
  it("marks an edited value with what it was", () => {
    render(<SettingsField label="Largest order allowed" name="limit" defaultValue="600" prefix="GHS" />);
    fireEvent.change(screen.getByRole("textbox", { name: "Largest order allowed" }), { target: { value: "800" } });
    expect(screen.getByText("Edited · was 600")).toHaveClass("text-warning");
  });

  it("does not submit read-only values and supports selects and a second line", () => {
    const { container } = render(
      <>
        <SettingsField label="Secret" name="secret" defaultValue="set 2 Sep" readOnly locked />
        <SettingsField label="Expire after" name="expire" defaultValue="60" options={[{ value: "30", label: "30 min" }, { value: "60", label: "60 min" }]} />
        <SettingsField label="Shop address" name="address" defaultValue="Osu" extra={{ name: "gps", defaultValue: "GA-000-0000", label: "GhanaPost GPS" }} />
      </>,
    );
    expect(container.querySelector('input[name="secret"]')).toBeNull();
    expect(screen.getByRole("combobox", { name: "Expire after" })).toHaveValue("60");
    expect(screen.getByRole("textbox", { name: "GhanaPost GPS" })).toHaveValue("GA-000-0000");
  });
});
