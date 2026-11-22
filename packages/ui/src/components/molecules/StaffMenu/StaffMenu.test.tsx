import { fireEvent, render, screen } from "@testing-library/react";

import { ThemeProvider } from "../../../lib";
import { StaffMenu } from "./StaffMenu";

const props = {
  name: "Abena Mensah",
  detail: "abena@jofak.com · Owner",
  trigger: <button type="button">Account</button>,
  items: [
    { label: "My profile & sign-in", icon: "user" as const, href: "/admin/profile" },
    { label: "Sign out", icon: "signOut" as const, href: "/admin/sign-out" },
  ],
};

beforeEach(() => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
});

describe("StaffMenu", () => {
  it("opens with the staff member, appearance and links", () => {
    render(
      <ThemeProvider>
        <StaffMenu {...props} className="mt-4" />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Account" }));
    const menu = screen.getByRole("dialog", { name: "Account" });
    expect(menu).toHaveClass("mt-4");
    expect(screen.getByText("abena@jofak.com · Owner")).toBeInTheDocument();
    expect(screen.getByRole("radiogroup", { name: "Appearance" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sign out" })).toHaveAttribute("href", "/admin/sign-out");
  });

  it("switches the theme", () => {
    render(
      <ThemeProvider>
        <StaffMenu {...props} presentation="sheet" />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Account" }));
    fireEvent.click(screen.getByRole("radio", { name: "Dark" }));
    expect(screen.getByRole("radio", { name: "Dark" })).toHaveAttribute("aria-checked", "true");
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  });
});
