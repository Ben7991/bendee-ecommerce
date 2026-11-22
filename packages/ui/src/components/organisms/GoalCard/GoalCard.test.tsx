import { render, screen } from "@testing-library/react";

import { GoalCard } from "./GoalCard";

describe("GoalCard", () => {
  it("links the whole card through its title", () => {
    render(<GoalCard title="Gut & Digestion" description="Probiotics and fibre." href="/collections/gut" tone="accent" />);
    const link = screen.getByRole("link", { name: "Gut & Digestion" });
    expect(link).toHaveAttribute("href", "/collections/gut");
    expect(screen.getByRole("heading", { level: 3, name: "Gut & Digestion" })).toBeInTheDocument();
  });

  it("puts media under the text", () => {
    render(<GoalCard title="Focus" description="Steady energy." href="/f" media={<div>tile</div>} />);
    expect(screen.getByText("Steady energy.").compareDocumentPosition(screen.getByText("tile"))).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });
});
