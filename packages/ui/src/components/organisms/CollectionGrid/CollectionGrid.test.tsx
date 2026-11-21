import { render, screen } from "@testing-library/react";

import { CollectionGrid } from "./CollectionGrid";

describe("CollectionGrid", () => {
  it("links each collection and prompts for a missing banner", () => {
    render(
      <CollectionGrid
        className="mt-4"
        collections={[
          { id: "1", name: "December gifting", href: "/c/1", status: { label: "Starts 1 Dec", tone: "info" }, description: "Gift sets", footer: "8 products", kind: "Manual", summary: "Manual · 8", banner: { kind: "empty", uploadHref: "/c/1#details" } },
        ]}
      />,
    );
    expect(screen.getByRole("region", { name: "Collections" })).toHaveClass("mt-4");
    // Card (tablet+) and row (mobile).
    expect(screen.getAllByRole("link", { name: "December gifting" })[0]).toHaveAttribute("href", "/c/1");
    expect(screen.getByRole("link", { name: "Upload image" })).toHaveAttribute("href", "/c/1#details");
  });

  it("says when empty", () => {
    render(<CollectionGrid collections={[]} emptyMessage="No live collections." />);
    expect(screen.getByText("No live collections.")).toBeInTheDocument();
  });
});
