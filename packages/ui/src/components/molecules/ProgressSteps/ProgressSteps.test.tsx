import { render, screen } from "@testing-library/react";

import { ProgressSteps } from "./ProgressSteps";

describe("ProgressSteps", () => {
  it("lists the steps and marks the current one", () => {
    render(
      <ProgressSteps
        className="mt-4"
        steps={[
          { title: "Placed", time: "10:42", state: "done" },
          { title: "Out for delivery", time: "09:20", state: "current" },
          { title: "Delivered", state: "upcoming" },
        ]}
      />,
    );
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(items[1]).toHaveAttribute("aria-current", "step");
    expect(screen.getByText("09:20")).toHaveClass("text-brand");
    expect(screen.getByText("Delivered")).toHaveClass("text-text-muted");
    expect(screen.getByRole("list")).toHaveClass("mt-4");
  });
});
