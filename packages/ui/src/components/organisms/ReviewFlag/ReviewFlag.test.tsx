import { render, screen } from "@testing-library/react";

import { ReviewFlag } from "./ReviewFlag";

describe("ReviewFlag", () => {
  it("is a region titled by the flag with its actions", () => {
    render(
      <ReviewFlag className="mt-4" title="Flagged for review" body="Two failed deliveries." actions={<button type="button">Mark as reviewed</button>} />,
    );
    const region = screen.getByRole("region", { name: "Flagged for review" });
    expect(region).toHaveClass("bg-tint-citrus", "mt-4");
    expect(screen.getByText("Two failed deliveries.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Mark as reviewed" })).toBeInTheDocument();
  });
});
