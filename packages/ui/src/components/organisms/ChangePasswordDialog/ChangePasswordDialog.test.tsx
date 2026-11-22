import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ChangePasswordDialog } from "./ChangePasswordDialog";

beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("ChangePasswordDialog", () => {
  it("unlocks Change password once every rule, the match and the code check out", async () => {
    render(<ChangePasswordDialog open lastChanged="Last changed 12 Oct" forbidden={["Abena"]} />);
    const submit = screen.getByRole("button", { name: "Change password" });
    expect(submit).toBeDisabled();
    await userEvent.type(screen.getByLabelText("Current password"), "old-password");
    await userEvent.type(screen.getByLabelText("New password"), "Green-Mangoes-Accra-77");
    expect(screen.getByText("Very strong")).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText("Type it again"), "Green-Mangoes-Accra-77");
    expect(screen.getByText("Matches")).toBeInTheDocument();
    await userEvent.type(screen.getByRole("textbox", { name: "Digit 1 of 6" }), "123456");
    expect(submit).toBeEnabled();
  });

  it("flags a password containing your name, and shows server errors", async () => {
    render(<ChangePasswordDialog open lastChanged="x" forbidden={["Abena"]} error="That isn’t your current password." />);
    expect(screen.getByRole("alert")).toHaveTextContent("That isn’t your current password.");
    await userEvent.type(screen.getByLabelText("New password"), "abena-is-great-2026");
    expect(screen.getByText(/Doesn’t contain your name or email/)).toHaveTextContent("(not yet)");
  });
});
