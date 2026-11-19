import { render, screen } from "@testing-library/react";

import { CollectionHero } from "./CollectionHero";

const base = {
  eyebrow: "Dry season collection",
  title: "The Harmattan reset",
  description: "Twelve picks for the dry season.",
  products: [{ id: "a" }, { id: "b" }, { id: "c" }],
};

describe("CollectionHero", () => {
  it("titles the page with the collection and shows chips and notes", () => {
    render(
      <CollectionHero {...base} className="mt-4" chips={<span>Up to 20% off</span>}>
        <p>Staff note</p>
      </CollectionHero>,
    );
    expect(screen.getByRole("region", { name: "The Harmattan reset" })).toHaveClass("mt-4");
    expect(screen.getByRole("heading", { level: 1, name: "The Harmattan reset" })).toBeInTheDocument();
    expect(screen.getByText("Up to 20% off")).toBeInTheDocument();
    expect(screen.getByText("Staff note")).toBeInTheDocument();
  });

  it("puts the hub heading first when featured", () => {
    render(<CollectionHero {...base} variant="featured" heading={{ title: "Offers & collections" }} action={<a href="#c">Shop the collection</a>} />);
    expect(screen.getByRole("heading", { level: 1, name: "Offers & collections" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "The Harmattan reset" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Shop the collection" })).toBeInTheDocument();
  });
});
