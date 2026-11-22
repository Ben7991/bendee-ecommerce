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

  it("shows pills with mobile-only and wide-only views", () => {
    render(
      <SavedViews
        variant="pills"
        activeHref="/p"
        views={[
          { href: "/p", label: "All", count: 48 },
          { href: "/p?stock=low", label: "Low stock", count: 6, warning: true, mobileOnly: true },
          { href: "/p?status=archived", label: "Archived", count: 3, hideOnMobile: true },
        ]}
      />,
    );
    // Pills render the wide views, chips the mobile ones.
    expect(screen.getAllByRole("link", { name: "All, 48" })).toHaveLength(2);
    expect(screen.getAllByRole("link", { name: "Low stock, 6" })).toHaveLength(1);
    expect(screen.getAllByRole("link", { name: "Archived, 3" })).toHaveLength(1);
  });

  it("shows a segmented track with an amber warning segment", () => {
    render(
      <SavedViews
        variant="segmented"
        activeHref="/c"
        views={[
          { href: "/c", label: "All", count: "1,284" },
          { href: "/c?segment=inactive", label: "Inactive", count: 211, warning: true },
        ]}
      />,
    );
    const [segment] = screen.getAllByRole("link", { name: "Inactive, 211" });
    expect(segment).toHaveClass("text-warning-text");
    expect(screen.getAllByRole("link", { name: "All, 1,284" })[0]).toHaveAttribute("aria-current", "page");
  });
});
