import { fireEvent, render, screen } from "@testing-library/react";

import { AdminSidebar } from "./AdminSidebar";

const props = {
  activeHref: "/admin",
  primary: [
    { href: "/admin", label: "Dashboard", icon: "dashboard" as const },
    { href: "/admin/orders", label: "Orders", icon: "box" as const, count: 14 },
  ],
  secondary: [{ href: "/admin/reports", label: "Reports", icon: "barChart" as const }],
  settings: { href: "/admin/settings", label: "Settings", icon: "settings" as const },
  staff: { name: "Abena Mensah", role: "Owner", email: "abena@jofak.com" },
  staffMenuItems: [{ label: "Sign out", icon: "signOut" as const, href: "/admin/sign-out" }],
};

describe("AdminSidebar", () => {
  it("lists the sections with the current one marked", () => {
    render(<AdminSidebar {...props} className="mt-4" />);
    expect(screen.getByRole("complementary", { name: "Admin" })).toHaveClass("mt-4");
    expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Orders, 14" })).toHaveAttribute("href", "/admin/orders");
    expect(screen.getByText("Grow")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Settings" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Abena Mensah, Owner: account menu" })).toBeInTheDocument();
  });

  it("collapses to the icon rail", () => {
    const onCollapsedChange = vi.fn();
    render(<AdminSidebar {...props} onCollapsedChange={onCollapsedChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Collapse sidebar" }));
    expect(onCollapsedChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole("complementary", { name: "Admin" })).toHaveAttribute("data-collapsed", "true");
    expect(screen.getByRole("button", { name: "Expand sidebar" })).toHaveAttribute("aria-expanded", "false");
  });
});
