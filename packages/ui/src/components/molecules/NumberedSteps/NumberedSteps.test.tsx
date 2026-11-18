import { render, screen } from "@testing-library/react";

import { NumberedSteps } from "./NumberedSteps";

describe("NumberedSteps", () => {
  it("numbers its items", () => {
    const { container } = render(<NumberedSteps title="Steps" items={["One", "Two"]} className="mt-4" />);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("Steps")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("mt-4");
  });
});
