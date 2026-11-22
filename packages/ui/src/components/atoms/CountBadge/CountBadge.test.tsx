import { render, screen } from "@testing-library/react";

import { CountBadge } from "./CountBadge";

describe("CountBadge", () => {
  it("shows the count, hidden from assistive tech", () => {
    render(<CountBadge count={3} />);
    expect(screen.getByText("3")).toHaveAttribute("aria-hidden", "true");
  });

  it("caps large counts", () => {
    render(<CountBadge count={140} />);
    expect(screen.getByText("99+")).toBeInTheDocument();
  });

  it("renders nothing for zero", () => {
    const { container } = render(<CountBadge count={0} />);
    expect(container).toBeEmptyDOMElement();
  });
});
