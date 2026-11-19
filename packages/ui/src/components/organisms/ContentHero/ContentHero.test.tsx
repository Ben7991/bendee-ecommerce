import { render, screen } from "@testing-library/react";

import { ContentHero } from "./ContentHero";

describe("ContentHero", () => {
  it("renders the page title, breadcrumbs and both descriptions", () => {
    render(
      <ContentHero
        title="Privacy policy"
        breadcrumbs={<nav aria-label="Breadcrumb">Home</nav>}
        description="What we collect, why, who sees it."
        compactDescription="What we collect."
        className="mt-4"
      />,
    );
    expect(screen.getByRole("region", { name: "Privacy policy" })).toHaveClass("mt-4");
    expect(screen.getByRole("heading", { level: 1, name: "Privacy policy" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(screen.getByText("What we collect.")).toHaveClass("md:hidden");
    expect(screen.getByText("What we collect, why, who sees it.")).toHaveClass("hidden", "md:block");
  });

  it("shows the one description everywhere without a compact one", () => {
    render(<ContentHero title="FAQ" description="Questions, answered." />);
    expect(screen.getByText("Questions, answered.")).not.toHaveClass("hidden");
  });
});
