import { render, screen } from "@testing-library/react";

import { PillNav, PillNavItem } from "./PillNav";

describe("PillNav", () => {
  it("marks the active link as the current page", () => {
    render(
      <PillNav aria-label="Primary">
        <PillNavItem href="/" active>
          Home
        </PillNavItem>
        <PillNavItem href="/shop">Shop</PillNavItem>
      </PillNav>,
    );
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Shop" })).not.toHaveAttribute("aria-current");
  });
});
