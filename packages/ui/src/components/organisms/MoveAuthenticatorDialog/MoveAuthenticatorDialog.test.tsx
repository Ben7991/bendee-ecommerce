import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MoveAuthenticatorDialog } from "./MoveAuthenticatorDialog";

describe("MoveAuthenticatorDialog", () => {
  it("shows the QR code and key on step 2, with Back", () => {
    render(<MoveAuthenticatorDialog open step={2} secret="JFK4 7QX2" qr={<span>QR</span>} backHref="?step=1" />);
    expect(screen.getByText("JFK4 7QX2")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back" })).toHaveAttribute("href", "?step=1");
    expect(screen.getByRole("button", { name: "I’ve scanned it" })).toBeEnabled();
    expect(screen.getByRole("listitem", { current: "step" })).toHaveTextContent("Scan");
  });

  it("needs all 6 digits on step 1", async () => {
    render(<MoveAuthenticatorDialog open step={1} secret="x" qr={<span />} />);
    const next = screen.getByRole("button", { name: "Continue" });
    expect(next).toBeDisabled();
    await userEvent.type(screen.getByRole("textbox", { name: "Digit 1 of 6" }), "246810");
    expect(next).toBeEnabled();
  });
});
