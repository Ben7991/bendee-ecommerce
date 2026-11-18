import { render, screen } from "@testing-library/react";

import { HeroShowcase } from "./HeroShowcase";

describe("HeroShowcase", () => {
  it("shows the score, chips and product card", () => {
    render(<HeroShowcase product={{ name: "Daily Greens", price: "GHS 450" }} />);
    expect(screen.getByText("82")).toBeInTheDocument();
    expect(screen.getByText("Clinically-dosed formula")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add Daily Greens to bag" })).toBeInTheDocument();
  });
});
