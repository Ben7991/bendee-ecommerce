import { render, screen } from "@testing-library/react";

import { CategoryTile } from "./CategoryTile";

describe("CategoryTile", () => {
  it("links to the category with its product count", () => {
    render(
      <CategoryTile href="/collections/sleep-stress" count={14} tint="sun" className="mt-4">
        Sleep & Stress
      </CategoryTile>,
    );
    const link = screen.getByRole("link", { name: /Sleep & Stress.*14 products/ });
    expect(link).toHaveAttribute("href", "/collections/sleep-stress");
    expect(link).toHaveClass("bg-tint-sun", "mt-4");
  });

  it("renders the child link with asChild", () => {
    render(
      <CategoryTile asChild variant="row" compactCount count={6}>
        <a href="/collections/adaptogens">Adaptogens</a>
      </CategoryTile>,
    );
    const link = screen.getByRole("link", { name: /Adaptogens/ });
    expect(link).toHaveAttribute("data-slot", "category-tile");
    expect(link).toHaveTextContent("· 6");
  });
});
