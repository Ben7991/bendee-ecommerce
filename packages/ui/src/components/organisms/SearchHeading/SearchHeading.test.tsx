import { render, screen } from "@testing-library/react";

import { SearchHeading } from "./SearchHeading";

describe("SearchHeading", () => {
  it("renders the field, the result heading and related links", () => {
    render(
      <SearchHeading
        search={<form role="search" />}
        title={
          <>
            8 results for <em>“stress”</em>
          </>
        }
        description="Matching product names."
        related={<nav aria-label="Related" />}
        className="mt-4"
      />,
    );
    const region = screen.getByRole("region", { name: "8 results for “stress”" });
    expect(region).toHaveClass("mt-4");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("8 results for “stress”");
    expect(screen.getByRole("search")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Related" })).toBeInTheDocument();
  });
});
