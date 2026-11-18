import { render, screen } from "@testing-library/react";

import { PopularCategories } from "./PopularCategories";

describe("PopularCategories", () => {
  it("titles the category links", () => {
    render(
      <PopularCategories className="mt-4">
        <a href="/collections/immunity">Immunity</a>
      </PopularCategories>,
    );
    const region = screen.getByRole("region", { name: "Popular categories" });
    expect(region).toHaveClass("mt-4");
    expect(screen.getByRole("link", { name: "Immunity" })).toBeInTheDocument();
  });
});
