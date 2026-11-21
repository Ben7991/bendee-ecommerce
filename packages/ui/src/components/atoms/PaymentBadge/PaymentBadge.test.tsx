import { render, screen } from "@testing-library/react";

import { PaymentBadge } from "./PaymentBadge";

describe("PaymentBadge", () => {
  it("shows the brand name", () => {
    render(<PaymentBadge brand="mtn" className="mt-4" />);
    expect(screen.getByText("MTN MoMo")).toHaveClass("mt-4");
  });

  it("puts card brands on white", () => {
    render(<PaymentBadge brand="visa" />);
    expect(screen.getByText("VISA")).toHaveClass("bg-white");
  });

  it("has a square tile with the short name", () => {
    render(<PaymentBadge brand="mtn" size="tile" />);
    expect(screen.getByText("MTN")).toHaveClass("size-7", "rounded-8");
  });
});
