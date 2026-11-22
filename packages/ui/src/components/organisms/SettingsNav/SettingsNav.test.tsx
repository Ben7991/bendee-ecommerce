import { render, screen } from "@testing-library/react";

import { SettingsNav } from "./SettingsNav";

describe("SettingsNav", () => {
  it("marks the active section in both layouts", () => {
    render(<SettingsNav groups={[{ label: "Store", items: [{ href: "/s/profile", label: "Store profile" }, { href: "/s/taxes", label: "Taxes" }] }, { label: "Team", items: [{ href: "/s/staff", label: "Staff & roles", count: 6 }] }]} activeHref="/s/taxes" />);
    expect(screen.getAllByRole("link", { name: "Taxes" }).every((link) => link.getAttribute("aria-current") === "page")).toBe(true);
    expect(screen.getByText("6")).toBeInTheDocument();
  });

  it("renders the mobile menu", () => {
    render(<SettingsNav variant="menu" groups={[{ label: "Store", items: [{ href: "/s/profile", label: "Store profile" }, { href: "/s/taxes", label: "Taxes" }] }, { label: "Team", items: [{ href: "/s/staff", label: "Staff & roles", count: 6 }] }]} />);
    expect(screen.getByRole("heading", { name: "Team" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Staff & roles/ })).toHaveAttribute("href", "/s/staff");
  });
});
