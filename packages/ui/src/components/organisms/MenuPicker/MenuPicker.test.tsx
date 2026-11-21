import { render, screen } from "@testing-library/react";

import { MenuPicker } from "./MenuPicker";

describe("MenuPicker", () => {
  it("marks the active menu and unpublished changes", () => {
    render(
      <MenuPicker
        className="mt-4"
        activeHref="/h"
        menus={[
          { href: "/h", title: "Header menu", note: "6 items", changed: true },
          { href: "/f", title: "Footer menu", note: "3 columns" },
        ]}
      />,
    );
    expect(screen.getByRole("navigation", { name: "Menus" })).toHaveClass("mt-4");
    expect(screen.getAllByRole("link", { name: /Header menu/ }).every((link) => link.getAttribute("aria-current") === "page")).toBe(true);
    expect(screen.getAllByLabelText("Unpublished changes").length).toBe(3);
  });
});
