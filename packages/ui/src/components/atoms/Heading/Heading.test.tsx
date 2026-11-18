import { render, screen } from "@testing-library/react";

import { Heading } from "./Heading";

describe("Heading", () => {
  it("defaults to an h2", () => {
    render(<Heading>Bestsellers</Heading>);
    expect(screen.getByRole("heading", { level: 2, name: "Bestsellers" })).toBeInTheDocument();
  });

  it("renders the requested level and keeps the accent word in the name", () => {
    render(
      <Heading as="h1" size="hero">
        Feels <em>naturally</em> well.
      </Heading>,
    );
    expect(screen.getByRole("heading", { level: 1, name: "Feels naturally well." })).toBeInTheDocument();
  });
});
