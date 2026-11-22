import { render, screen } from "@testing-library/react";

import { FulfilmentProgress, type FulfilmentStep } from "./FulfilmentProgress";

const steps: FulfilmentStep[] = [
  { label: "Confirmed", detail: "07:58", state: "done" },
  { label: "Processing", detail: "Started by Abena", state: "current" },
  { label: "Packed", state: "upcoming" },
];

describe("FulfilmentProgress", () => {
  it("lists the steps and marks the current one", () => {
    render(<FulfilmentProgress steps={steps} className="mt-4" />);
    expect(screen.getByRole("region", { name: "Order progress" })).toHaveClass("mt-4");
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByText("Processing").closest("li")).toHaveAttribute("aria-current", "step");
    expect(screen.getByText("Started by Abena")).toHaveClass("text-brand");
  });

  it("summarises the step on mobile", () => {
    render(<FulfilmentProgress steps={steps} variant="compact" />);
    expect(screen.getByText(/step 2 of 3/)).toBeInTheDocument();
    expect(screen.getByText("Next: Packed")).toBeInTheDocument();
  });

  it("ends on the last step once everything is done", () => {
    render(<FulfilmentProgress variant="compact" steps={steps.map((step) => ({ ...step, state: "done" as const }))} />);
    expect(screen.getByText(/step 3 of 3/)).toHaveTextContent("Packed · step 3 of 3");
    expect(screen.queryByText(/Next:/)).not.toBeInTheDocument();
  });
});
