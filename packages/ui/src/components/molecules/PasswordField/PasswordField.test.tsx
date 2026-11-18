import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { PasswordField } from "./PasswordField";

describe("PasswordField", () => {
  it("toggles visibility", async () => {
    const user = userEvent.setup();
    render(<PasswordField label="Password" defaultValue="secret" />);
    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");
    await user.click(screen.getByRole("button", { name: "Show password" }));
    expect(input).toHaveAttribute("type", "text");
    expect(screen.getByRole("button", { name: "Hide password" })).toHaveAttribute("aria-pressed", "true");
  });

  it("shows strength and the match hint", () => {
    render(
      <>
        <PasswordField label="New password" strength={{ score: 4, label: "Very strong" }} />
        <PasswordField label="Confirm" matched className="mt-4" />
      </>,
    );
    expect(screen.getByRole("meter")).toHaveAttribute("aria-valuetext", "Very strong");
    expect(screen.getByLabelText("Confirm")).toHaveAccessibleDescription("Passwords match");
  });
});
