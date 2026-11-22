import { render, screen } from "@testing-library/react";

import { ListingLayout } from "./ListingLayout";

describe("ListingLayout", () => {
  it("places the sidebar, toolbar, results and footer", () => {
    render(
      <ListingLayout sidebar={<p>Filters</p>} toolbar={<p>Toolbar</p>} footer={<p>Pages</p>} className="mt-4">
        <p>Results</p>
      </ListingLayout>,
    );
    expect(screen.getByRole("complementary")).toHaveTextContent("Filters");
    for (const text of ["Toolbar", "Results", "Pages"]) expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByText("Results").closest("[data-slot=listing-layout]")).toHaveClass("mt-4");
  });
});
