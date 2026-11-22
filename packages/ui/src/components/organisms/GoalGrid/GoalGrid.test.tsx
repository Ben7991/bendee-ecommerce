import { render, screen } from "@testing-library/react";

import { GoalGrid } from "./GoalGrid";

const goal = (href: string) => ({ href, productCount: 6 });

describe("GoalGrid", () => {
  it("renders four goal links and the view-all links", () => {
    render(
      <GoalGrid
        title="Gentle support"
        compactTitle="Support"
        blurb="Formulas built around how you want to feel."
        viewAllHref="/shop"
        goals={{ sleep: goal("/g/sleep"), focus: goal("/g/focus"), gut: goal("/g/gut"), immunity: goal("/g/immunity") }}
      />,
    );
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(4);
    expect(screen.getByRole("link", { name: "Immunity" })).toHaveAttribute("href", "/g/immunity");
    expect(screen.getByRole("link", { name: "See all" })).toHaveAttribute("href", "/shop");
  });
});
