import { render, screen } from "@testing-library/react";

import { RelatedLink, RelatedLinks } from "./RelatedLinks";

describe("RelatedLinks", () => {
  it("lists related links with counts and an external marker", () => {
    render(
      <RelatedLinks className="mt-4">
        <RelatedLink href="/collections/sleep-stress" count={14}>
          Sleep & Stress
        </RelatedLink>
        <RelatedLink asChild external>
          <a href="/journal/stress">Journal</a>
        </RelatedLink>
      </RelatedLinks>,
    );
    const nav = screen.getByRole("navigation", { name: "Related" });
    expect(nav).toHaveClass("mt-4");
    expect(screen.getByRole("link", { name: /Sleep & Stress\s*\(14\)/ })).toHaveAttribute("href", "/collections/sleep-stress");
    const journal = screen.getByRole("link", { name: "Journal" });
    expect(journal).toHaveAttribute("data-slot", "related-link");
    expect(journal.querySelector("svg")).not.toBeNull();
  });
});
