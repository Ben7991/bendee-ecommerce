import { render, screen } from "@testing-library/react";

import { AccountNav, AccountNavItem } from "./AccountNav";

describe("AccountNav", () => {
  it("marks the current section and shows badges", () => {
    render(
      <AccountNav className="mt-4">
        <AccountNavItem href="/account">Overview</AccountNavItem>
        <AccountNavItem asChild active badge="1 active">
          <a href="/account/orders">Orders</a>
        </AccountNavItem>
      </AccountNav>,
    );
    expect(screen.getByRole("navigation", { name: "Your account" })).toHaveClass("mt-4");
    expect(screen.getByRole("link", { name: /Orders/ })).toHaveAttribute("aria-current", "page");
    expect(screen.getByText("1 active")).toBeInTheDocument();
  });
});
