import { render, screen } from "@testing-library/react";

import { CollectionMatchesCard } from "./CollectionMatchesCard";

describe("CollectionMatchesCard", () => {
  it("shows the count, tiles and See all", () => {
    render(<CollectionMatchesCard className="mt-4" count={12} products={[{ id: "1", name: "Daily Probiotic", detail: "Out of stock · hidden", tone: "hidden" }]} seeAllHref="/all" />);
    expect(screen.getByRole("region", { name: "12 products match" })).toHaveClass("mt-4");
    expect(screen.getByText("Out of stock · hidden")).toHaveClass("text-error");
    expect(screen.getByRole("link", { name: "See all 12 matches" })).toHaveAttribute("href", "/all");
  });

  it("explains an empty collection", () => {
    render(<CollectionMatchesCard count={0} products={[]} />);
    expect(screen.getByText(/Nothing matches yet/)).toBeInTheDocument();
  });
});
