import { render, screen } from "@testing-library/react";

import { StatusHero } from "./StatusHero";

describe("StatusHero", () => {
  it("renders the title, actions, children and both note layouts", () => {
    render(
      <StatusHero
        emblem={{ icon: "refreshLeaf", tone: "sage" }}
        label={<p>Error 500</p>}
        title="We're having a moment"
        description={{ short: "Short lede", full: "Full lede" }}
        actions={<button type="button">Try again</button>}
        notes={[{ icon: "truck", title: "Already placed an order?", text: "It's safe.", compactTitle: "Already ordered?", compactText: "Safe." }]}
        className="mt-4"
      >
        <p>Status card</p>
      </StatusHero>,
    );
    expect(screen.getByRole("heading", { level: 1, name: "We're having a moment" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument();
    expect(screen.getByText("Status card")).toBeInTheDocument();
    expect(screen.getByText("Already placed an order?")).toBeInTheDocument();
    expect(screen.getByText("Already ordered?")).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "We're having a moment" })).toHaveClass("mt-4");
  });
});
