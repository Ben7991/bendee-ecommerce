import { fireEvent, render, screen } from "@testing-library/react";

import { CustomerPreferences } from "./CustomerPreferences";

describe("CustomerPreferences", () => {
  it("lets staff switch consent off but not on, and remove or add tags", () => {
    const onConsentChange = vi.fn();
    render(
      <CustomerPreferences
        consent={[
          { channel: "sms", label: "SMS offers", on: true },
          { channel: "email", label: "Email", on: false },
        ]}
        onConsentChange={onConsentChange}
        tags={[{ label: "VIP", tone: "accent" }]}
        removeTag="/remove"
        fields={{ customer: "efua" }}
        addTagHref="/tags/new"
        account={[{ label: "Disable account", href: "/disable", danger: true }]}
      />,
    );
    const email = screen.getByRole("switch", { name: "Email" });
    expect(email).toBeDisabled();
    fireEvent.click(screen.getByRole("switch", { name: "SMS offers" }));
    expect(onConsentChange).toHaveBeenCalledWith("sms", false);
    expect(screen.getByRole("switch", { name: "SMS offers" })).not.toBeChecked();

    // Tablet and desktop tag lists both render.
    expect(screen.getAllByRole("button", { name: "Remove VIP" })[0]).toHaveAttribute("value", "VIP");
    expect(screen.getByRole("link", { name: "+ Add tag" })).toHaveAttribute("href", "/tags/new");
    expect(screen.getByRole("region", { name: "Account & privacy" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Disable account" })[0]).toHaveClass("text-error");
  });
});
