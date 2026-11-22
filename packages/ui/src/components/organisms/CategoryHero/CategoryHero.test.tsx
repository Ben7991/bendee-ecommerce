import { render, screen } from "@testing-library/react";

import { CategoryHero } from "./CategoryHero";

describe("CategoryHero", () => {
  it("renders the title as the page heading with its slots", () => {
    render(
      <CategoryHero
        title={
          <>
            All <em>supplements</em>
          </>
        }
        description="Clinically-dosed formulas."
        compactDescription="64 products"
        count={64}
        header={<header>Site header</header>}
        pills={<nav aria-label="Shop by goal" />}
        className="mt-4"
      />,
    );
    expect(screen.getByRole("heading", { level: 1, name: "All supplements" })).toBeInTheDocument();
    expect(screen.getByText("Site header")).toBeInTheDocument();
    expect(screen.getByText("Clinically-dosed formulas.")).toBeInTheDocument();
    expect(screen.getByText("products")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Shop by goal" })).toBeInTheDocument();
    expect(screen.getByText("Site header").closest("[data-slot=category-hero]")).toHaveClass("mt-4");
  });
});
