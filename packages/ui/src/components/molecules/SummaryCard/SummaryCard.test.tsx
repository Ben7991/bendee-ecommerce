import { render, screen } from "@testing-library/react";

import { SummaryCard } from "./SummaryCard";

describe("SummaryCard", () => {
  it("renders the eyebrow, action, body and footer", () => {
    render(
      <SummaryCard data-testid="card" tone="feature" eyebrow="Subscription" action={<a href="#">Manage</a>} footer="Next delivery Tue 25 Nov" className="mt-4">
        <p>Ashwagandha</p>
      </SummaryCard>,
    );
    expect(screen.getByTestId("card")).toHaveClass("bg-feature", "mt-4");
    expect(screen.getByText("Subscription")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Manage" })).toBeInTheDocument();
    expect(screen.getByText("Next delivery Tue 25 Nov")).toBeInTheDocument();
  });
});
