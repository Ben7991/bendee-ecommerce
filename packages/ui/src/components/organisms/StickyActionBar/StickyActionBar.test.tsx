import { render, screen } from "@testing-library/react";

import { StickyActionBar } from "./StickyActionBar";

describe("StickyActionBar", () => {
  it("renders the action and note", () => {
    const { container } = render(<StickyActionBar action={<button type="button">Pay</button>} note="Secure" className="mt-4" />);
    expect(screen.getByRole("button", { name: "Pay" })).toBeInTheDocument();
    expect(screen.getByText("Secure")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("mt-4");
  });
});
