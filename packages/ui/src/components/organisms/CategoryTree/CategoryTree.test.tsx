import { fireEvent, render, screen } from "@testing-library/react";

import { CategoryTree, type CategoryNode } from "./CategoryTree";

const nodes: CategoryNode[] = [
  { id: "beauty", name: "Beauty from within", count: 18, children: [{ id: "collagen", name: "Collagen", count: 7, children: [{ id: "marine", name: "Marine collagen", count: 3 }] }] },
  { id: "greens", name: "Greens & superfoods", count: 9 },
  { id: "energy", name: "Energy & sports", count: 15, children: [{ id: "pre", name: "Pre-workout", count: 0, hidden: true }] },
];

describe("CategoryTree", () => {
  it("shows the tree with the selected category and links", () => {
    render(<CategoryTree className="mt-4" nodes={nodes} selectedId="collagen" defaultExpanded={["beauty"]} hrefFor={(id) => `?category=${id}`} />);
    expect(screen.getByRole("region", { name: "Categories" })).toHaveClass("mt-4");
    expect(screen.getByRole("link", { name: "Collagen" })).toHaveAttribute("href", "?category=collagen");
    expect(screen.getByText("Editing")).toBeInTheDocument();
    expect(screen.queryByText("Marine collagen")).not.toBeInTheDocument();
    expect(screen.getByText("6 categories · 3 top level · order here is the order in the store menu")).toBeInTheDocument();
  });

  it("expands, collapses and finds", () => {
    render(<CategoryTree nodes={nodes} hrefFor={(id) => id} />);
    fireEvent.click(screen.getByRole("button", { name: "Expand all" }));
    expect(screen.getByText("Marine collagen")).toBeInTheDocument();
    expect(screen.getByText("Hidden")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Collapse Beauty from within" }));
    expect(screen.queryByText("Collagen")).not.toBeInTheDocument();
    fireEvent.change(screen.getByRole("searchbox", { name: "Find a category" }), { target: { value: "marine" } });
    expect(screen.getByText("Marine collagen")).toBeInTheDocument();
    expect(screen.queryByText("Greens & superfoods")).not.toBeInTheDocument();
  });
});
