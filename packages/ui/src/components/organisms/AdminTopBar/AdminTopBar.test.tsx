import { render, screen } from "@testing-library/react";

import { AdminTopBar } from "./AdminTopBar";

describe("AdminTopBar", () => {
  it("has search, the store link and notifications", () => {
    render(
      <AdminTopBar
        unreadNotifications
        className="mt-4"
        staff={{ name: "Abena Mensah", role: "Owner", email: "abena@jofak.com" }}
        staffMenuItems={[{ label: "Sign out", icon: "signOut", href: "/admin/sign-out" }]}
      />,
    );
    expect(screen.getByRole("banner")).toHaveClass("mt-4");
    expect(screen.getByRole("searchbox", { name: "Search the admin" })).toHaveAttribute("name", "q");
    expect(screen.getByRole("link", { name: "View store" })).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: "Notifications, unread" })).toHaveAttribute("href", "/admin/notifications");
    expect(screen.getByRole("button", { name: "Abena Mensah: account menu" })).toBeInTheDocument();
  });
});
