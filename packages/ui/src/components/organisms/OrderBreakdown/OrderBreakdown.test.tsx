import { render, screen } from "@testing-library/react";

import { OrderBreakdown } from "./OrderBreakdown";

describe("OrderBreakdown", () => {
  it("lists items, rows and the total", () => {
    render(
      <OrderBreakdown
        className="mt-4"
        title="Your return"
        items={[{ id: "a", name: "Daily Greens Powder", price: "GHS 450", quantity: 1 }]}
        rows={[{ label: "Delivery", value: "Free", highlight: true }]}
        total={{ label: "Total paid", value: "GHS 1,254.60" }}
        footer="We'll review it within 1 working day."
      />,
    );
    expect(screen.getByRole("complementary")).toHaveClass("mt-4");
    expect(screen.getByRole("heading", { name: "Your return" })).toBeInTheDocument();
    expect(screen.getByText("Free")).toHaveClass("text-brand");
    expect(screen.getByText("GHS 1,254.60")).toBeInTheDocument();
  });

  it("shows the compact line on mobile and hides the panel there", () => {
    render(<OrderBreakdown items={[]} compact={{ items: [], title: "4 items · GHS 1,254.60", detail: "Paid by MoMo" }} />);
    expect(screen.getByText("4 items · GHS 1,254.60")).toBeInTheDocument();
    expect(screen.getByRole("complementary")).toHaveClass("hidden", "md:flex");
  });
});
