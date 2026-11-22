import { render, screen } from "@testing-library/react";

import { CheckoutSteps } from "./CheckoutSteps";

describe("CheckoutSteps", () => {
  it("marks done and current steps", () => {
    render(<CheckoutSteps steps={["Contact", "Delivery", "Payment"]} current={1} className="mt-4" />);
    const list = screen.getByRole("list", { name: "Checkout progress" });
    expect(list).toHaveClass("mt-4");
    expect(screen.getByRole("img", { name: "Done" })).toBeInTheDocument();
    expect(screen.getByText("Delivery").closest("li")).toHaveAttribute("aria-current", "step");
  });
});
