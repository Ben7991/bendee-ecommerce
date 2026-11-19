import { fireEvent, render, screen } from "@testing-library/react";

import { PillRadioGroup } from "./PillRadioGroup";

describe("PillRadioGroup", () => {
  it("selects one option and keeps disabled ones out", () => {
    render(
      <PillRadioGroup
        aria-label="Send order updates by"
        defaultValue="sms"
        className="mt-4"
        options={[
          { value: "sms", label: "SMS" },
          { value: "whatsapp", label: "WhatsApp", tag: "Soon", disabled: true },
          { value: "email", label: "Email" },
        ]}
      />,
    );
    expect(screen.getByRole("radiogroup", { name: "Send order updates by" })).toHaveClass("mt-4");
    expect(screen.getByRole("radio", { name: "SMS" })).toBeChecked();
    expect(screen.getByRole("radio", { name: /WhatsApp/ })).toBeDisabled();
    fireEvent.click(screen.getByRole("radio", { name: "Email" }));
    expect(screen.getByRole("radio", { name: "Email" })).toBeChecked();
  });
});
