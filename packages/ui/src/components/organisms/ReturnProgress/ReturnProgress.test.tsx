import { render, screen } from "@testing-library/react";

import { ReturnProgress } from "./ReturnProgress";

describe("ReturnProgress", () => {
  it("marks the current step and says what's next", () => {
    render(
      <ReturnProgress
        className="mt-4"
        next="refund"
        steps={[
          { label: "Requested", state: "done" },
          { label: "Approved", state: "current" },
          { label: "Refunded", state: "upcoming" },
        ]}
      />,
    );
    expect(screen.getByRole("region", { name: "Return progress" })).toHaveClass("mt-4");
    expect(screen.getByText("Approved").closest("li")).toHaveAttribute("aria-current", "step");
    expect(screen.getByText("Step 2 of 3 · next: refund")).toBeInTheDocument();
  });
});
