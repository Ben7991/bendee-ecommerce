import { render, screen } from "@testing-library/react";

import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders its label", () => {
    render(<Badge>Bestseller</Badge>);
    expect(screen.getByText("Bestseller")).toHaveAttribute("data-slot", "badge");
  });

  it("applies a consumer className last", () => {
    render(<Badge className="absolute">New</Badge>);
    expect(screen.getByText("New")).toHaveClass("absolute");
  });
});
