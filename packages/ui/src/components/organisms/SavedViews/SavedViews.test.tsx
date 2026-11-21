import { render, screen, within } from "@testing-library/react";

import { SavedViews } from "./SavedViews";

describe("SavedViews", () => {
  it("links each view with its count and marks the current one", () => {
    render(
      <SavedViews
        className="mt-4"
        activeHref="/admin/orders"
        saveView={{ href: "/admin/orders/views/new" }}
        views={[
          { href: "/admin/orders", label: "All", count: "1,284" },
          { href: "/admin/orders?view=flagged", label: "Flagged", count: 2, alert: true },
        ]}
      />,
    );
    const nav = screen.getByRole("navigation", { name: "Saved views" });
    expect(nav).toHaveClass("mt-4");
    // Tabs (tablet+) and chips (mobile) both render; CSS shows one.
    const [tab] = within(nav).getAllByRole("link", { name: "All, 1,284" });
    expect(tab).toHaveAttribute("aria-current", "page");
    expect(within(nav).getAllByRole("link", { name: "Flagged, 2" })[0]).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("link", { name: "Save view" })).toHaveAttribute("href", "/admin/orders/views/new");
  });
});
