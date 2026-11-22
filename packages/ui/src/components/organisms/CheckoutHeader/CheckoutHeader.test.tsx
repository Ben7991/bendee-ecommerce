import { render, screen } from "@testing-library/react";

import { CheckoutHeader } from "./CheckoutHeader";

const steps = ["Contact", "Delivery", "Payment", "Review & pay"];

describe("CheckoutHeader", () => {
  it("shows progress, back links and the secure note", () => {
    render(<CheckoutHeader steps={steps} current={1} nextLabel="Next: Payment" className="mt-4" />);
    expect(screen.getByRole("banner")).toHaveClass("mt-4");
    expect(screen.getByText("Step 2 of 4 · Delivery")).toBeInTheDocument();
    expect(screen.getByText("Next: Payment")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to cart" })).toHaveAttribute("href", "/cart");
    expect(screen.getByRole("list", { name: "Checkout progress" })).toBeInTheDocument();
  });

  it("drops the back link in payment mode", () => {
    render(<CheckoutHeader mode="payment" steps={steps} current={3} />);
    expect(screen.queryByRole("link", { name: "Back to cart" })).not.toBeInTheDocument();
    expect(screen.getByText("Secure payment · Jofak")).toBeInTheDocument();
  });

  it("shows the help line in done mode", () => {
    render(<CheckoutHeader mode="done" steps={steps} current={4} help="Need help?" />);
    expect(screen.getByText("Need help?")).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
