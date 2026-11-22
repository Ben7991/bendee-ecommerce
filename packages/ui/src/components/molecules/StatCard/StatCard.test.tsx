import { render, screen } from "@testing-library/react";

import { StatCard } from "./StatCard";

describe("StatCard", () => {
  it("shows the figure and its label on the chosen tint", () => {
    render(<StatCard data-testid="stat" tone="amber" value="100%" label="bought direct" className="mt-4" />);
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText("bought direct")).toBeInTheDocument();
    const card = screen.getByTestId("stat");
    expect(card).toHaveClass("bg-tint-amber");
    expect(card).toHaveClass("mt-4");
  });
});
