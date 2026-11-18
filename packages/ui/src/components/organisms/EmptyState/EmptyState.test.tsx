import { render, screen } from "@testing-library/react";

import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("renders the title, help and actions", () => {
    render(
      <EmptyState
        icon="bagLeaf"
        title="Your cart is empty"
        description="Nothing here yet."
        primaryAction={{ label: "Shop bestsellers", href: "/collections/bestsellers" }}
        secondaryAction={{ label: "Take the wellness quiz", href: "/quiz" }}
        note="Signed in before?"
        className="mt-4"
      />,
    );
    expect(screen.getByRole("heading", { level: 1, name: "Your cart is empty" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Shop bestsellers" })).toHaveAttribute("href", "/collections/bestsellers");
    expect(screen.getByRole("link", { name: "Take the wellness quiz" })).toHaveAttribute("href", "/quiz");
    expect(screen.getByRole("region", { name: "Your cart is empty" })).toHaveClass("mt-4");
  });

  it("uses an h2 in the panel size", () => {
    render(<EmptyState size="panel" icon="bagLeaf" title="Nothing in here yet" description="Add something." primaryAction={{ label: "Shop", href: "/" }} />);
    expect(screen.getByRole("heading", { level: 2, name: "Nothing in here yet" })).toBeInTheDocument();
  });
});
