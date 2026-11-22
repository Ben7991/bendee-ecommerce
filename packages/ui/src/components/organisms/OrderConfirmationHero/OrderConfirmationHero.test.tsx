import { render, screen } from "@testing-library/react";

import { OrderConfirmationHero } from "./OrderConfirmationHero";

describe("OrderConfirmationHero", () => {
  it("renders the order number and thank-you title", () => {
    const { container } = render(
      <OrderConfirmationHero eyebrow="Order JFK-250184 · Paid" title="Thank you, Ama" description="Arrives tomorrow." className="mt-4" />,
    );
    expect(screen.getByRole("heading", { level: 1, name: "Thank you, Ama" })).toBeInTheDocument();
    expect(screen.getByText("Order JFK-250184 · Paid")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("mt-4");
  });
});
