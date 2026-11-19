import { render, screen } from "@testing-library/react";

import { ContentNav, ContentNavItem } from "./ContentNav";

describe("ContentNav", () => {
  it("names the navigation and marks the current page", () => {
    render(
      <ContentNav className="mt-4">
        <ContentNavItem href="/pages/about">About Jofak</ContentNavItem>
        <ContentNavItem asChild active>
          <a href="/pages/faq">FAQ</a>
        </ContentNavItem>
      </ContentNav>,
    );
    const nav = screen.getByRole("navigation", { name: "Help & policies" });
    expect(nav).toHaveClass("mt-4");
    expect(screen.getByRole("link", { name: "FAQ" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "About Jofak" })).not.toHaveAttribute("aria-current");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
