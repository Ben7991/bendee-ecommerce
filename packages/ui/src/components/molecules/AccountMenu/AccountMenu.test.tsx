import { render, screen } from "@testing-library/react";

import { AccountMenu, AccountMenuItem } from "./AccountMenu";

describe("AccountMenu", () => {
  it("lists sections with hints and badges", () => {
    render(
      <AccountMenu className="mt-4">
        <AccountMenuItem href="/account/orders" badge="1 active">Orders</AccountMenuItem>
        <AccountMenuItem asChild hint="3 saved">
          <a href="/account/addresses">Addresses</a>
        </AccountMenuItem>
      </AccountMenu>,
    );
    expect(screen.getByRole("navigation", { name: "Your account" })).toHaveClass("mt-4");
    expect(screen.getByRole("link", { name: /Addresses/ })).toHaveAttribute("href", "/account/addresses");
    expect(screen.getByText("3 saved")).toBeInTheDocument();
    expect(screen.getByText("1 active")).toBeInTheDocument();
  });
});
