import { render, screen } from "@testing-library/react";

import { ContentLayout } from "./ContentLayout";

describe("ContentLayout", () => {
  it("places the hero, nav and article", () => {
    render(
      <ContentLayout
        data-testid="layout"
        className="mt-4"
        articleClassName="xl:gap-9"
        hero={<h1>Privacy policy</h1>}
        nav={<nav aria-label="Help & policies" />}
      >
        <p>Clause one</p>
      </ContentLayout>,
    );
    expect(screen.getByTestId("layout")).toHaveClass("mt-4");
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Help & policies" })).toBeInTheDocument();
    const article = screen.getByRole("article");
    expect(article).toHaveTextContent("Clause one");
    expect(article).toHaveClass("xl:gap-9");
  });
});
