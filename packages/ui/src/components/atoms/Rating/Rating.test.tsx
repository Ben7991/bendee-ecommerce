import { render, screen } from "@testing-library/react";

import { Rating } from "./Rating";

describe("Rating", () => {
  it("shows the score and count, with a readable summary", () => {
    render(<Rating value={4.9} count={3214} />);
    expect(screen.getByText("4.9")).toBeInTheDocument();
    expect(screen.getByText("(3,214)")).toBeInTheDocument();
    expect(screen.getByText("Rated 4.9 out of 5 from 3,214 reviews")).toHaveClass("sr-only");
  });
});
