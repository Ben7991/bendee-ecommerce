import { render, screen } from "@testing-library/react";

import { ProgressBar } from "./ProgressBar";

describe("ProgressBar", () => {
  it("exposes its value", () => {
    render(<ProgressBar label="Quiz progress" value={33} />);
    expect(screen.getByRole("progressbar", { name: "Quiz progress" })).toHaveAttribute("aria-valuenow", "33");
  });

  it("clamps out-of-range values", () => {
    render(<ProgressBar label="Quiz progress" value={140} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100");
  });
});
