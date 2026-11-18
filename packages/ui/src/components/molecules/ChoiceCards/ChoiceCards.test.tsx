import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ChoiceCards } from "./ChoiceCards";

describe("ChoiceCards", () => {
  it("selects one option and shows its content", async () => {
    const user = userEvent.setup();
    render(
      <ChoiceCards
        aria-label="Payment"
        defaultValue="momo"
        className="mt-4"
        options={[
          { value: "momo", title: "Mobile Money", content: <p>Wallet fields</p> },
          { value: "card", title: "Card" },
        ]}
      />,
    );
    const group = screen.getByRole("radiogroup", { name: "Payment" });
    expect(group).toHaveClass("mt-4");
    expect(screen.getByRole("radio", { name: /Mobile Money/ })).toBeChecked();
    await user.click(screen.getByRole("radio", { name: /Card/ }));
    expect(screen.getByRole("radio", { name: /Card/ })).toBeChecked();
  });
});
