import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { PaymentForm } from "./PaymentForm";

describe("PaymentForm", () => {
  it("defaults to Mobile Money and keeps both network pickers in step", async () => {
    const user = userEvent.setup();
    const { container } = render(<PaymentForm defaultWallet="24 412 7781" className="mt-4" />);
    expect(screen.getByRole("radio", { name: /Mobile Money/ })).toBeChecked();
    expect(screen.getByRole("textbox", { name: "Wallet number" })).toHaveValue("24 412 7781");
    await user.click(screen.getByRole("radio", { name: "Telecel" }));
    expect(screen.getByRole("combobox", { name: "Network" })).toHaveValue("telecel");
    expect(container.firstChild).toHaveClass("mt-4");
  });
});
