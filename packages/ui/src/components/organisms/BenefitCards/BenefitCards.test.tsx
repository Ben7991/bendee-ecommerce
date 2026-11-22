import { render, screen } from "@testing-library/react";

import { BenefitCards } from "./BenefitCards";

describe("BenefitCards", () => {
  it("lists each benefit", () => {
    render(
      <BenefitCards
        className="mt-4"
        benefits={[
          { icon: "sprout", title: "38 whole foods", text: "No fillers." },
          {
            icon: "shieldTick",
            title: "Lab tested",
            text: <a href="/lab">View certificate</a>,
            featured: true,
          },
        ]}
      />,
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByRole("heading", { name: "Lab tested" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View certificate" })).toBeInTheDocument();
    expect(screen.getByRole("list")).toHaveClass("mt-4");
  });
});
