import { render, screen } from "@testing-library/react";

import { AccountIdentity } from "./AccountIdentity";

describe("AccountIdentity", () => {
  it("shows initials, name and detail", () => {
    render(<AccountIdentity data-testid="who" name="Ama Mensah" detail="+233 24 412 7781" className="mt-4" />);
    expect(screen.getByText("AM")).toHaveAttribute("aria-hidden");
    expect(screen.getByText("Ama Mensah")).toBeInTheDocument();
    expect(screen.getByTestId("who")).toHaveClass("mt-4");
  });
});
