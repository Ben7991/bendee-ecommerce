import { render, screen } from "@testing-library/react";

import { SettingCard } from "./SettingCard";

describe("SettingCard", () => {
  it("is a region named by its title with its action", () => {
    render(<SettingCard icon="lock" title="Signed-in devices" description="This laptop" action={<button type="button">Sign out of all devices</button>} className="mt-4" />);
    expect(screen.getByRole("region", { name: "Signed-in devices" })).toHaveClass("mt-4");
    // Desktop and mobile copies of the action.
    expect(screen.getAllByRole("button", { name: "Sign out of all devices" })).toHaveLength(2);
  });

  it("washes the danger card and shows the note", () => {
    render(<SettingCard tone="danger" icon="trash" title="Delete my account" description="30 days" note="Order records are kept." />);
    expect(screen.getByRole("region", { name: "Delete my account" })).toHaveClass("bg-error/4");
    expect(screen.getByText("Order records are kept.")).toBeInTheDocument();
  });
});
