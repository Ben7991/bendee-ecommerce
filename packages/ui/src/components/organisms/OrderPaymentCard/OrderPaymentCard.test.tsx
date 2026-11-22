import { render, screen } from "@testing-library/react";

import { OrderPaymentCard } from "./OrderPaymentCard";

describe("OrderPaymentCard", () => {
  it("shows the payment state and amount in its tone", () => {
    render(<OrderPaymentCard className="mt-4" tone="paid" status="Paid" method="MTN MoMo" amount="GHS 412.00" />);
    const region = screen.getByRole("region", { name: "Payment" });
    expect(region).toHaveClass("bg-sage-100", "mt-4");
    expect(screen.getByText("Paid")).toHaveClass("text-brand");
    expect(screen.getByText("GHS 412.00")).toBeInTheDocument();
  });
});
