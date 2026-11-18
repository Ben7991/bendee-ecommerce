import { render, screen } from "@testing-library/react";

import { CheckoutBar } from "./CheckoutBar";

describe("CheckoutBar", () => {
  it("shows the total and links to checkout", () => {
    const { container } = render(<CheckoutBar label="Total · 4 items" total="GHS 1,254.60" checkoutHref="/checkout" className="mt-4" />);
    expect(screen.getByText("GHS 1,254.60")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Checkout" })).toHaveAttribute("href", "/checkout");
    expect(container.firstChild).toHaveClass("mt-4");
  });
});
