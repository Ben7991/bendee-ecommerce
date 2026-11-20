import { render, screen } from "@testing-library/react";

import { PaymentHealthCard } from "./PaymentHealthCard";

describe("PaymentHealthCard", () => {
  it("shows the overall rate, each method and the alert", () => {
    const { container } = render(
      <PaymentHealthCard
        className="mt-4"
        rate="90%"
        methods={[
          { name: "MTN MoMo", share: 60, successRate: "94%", tone: "primary" },
          { name: "Telecel Cash", share: 40, successRate: "68%", tone: "warning", degraded: true },
        ]}
        alert="Telecel Cash is below 70%"
      />,
    );
    expect(screen.getByRole("region", { name: "Payment health" })).toHaveClass("mt-4");
    expect(screen.getByText("90%")).toBeInTheDocument();
    expect(screen.getByText("60% of payments")).toBeInTheDocument();
    expect(screen.getByText("68%")).toHaveClass("text-warning");
    expect(screen.getByRole("status")).toHaveTextContent("Telecel Cash is below 70%");
    // Track plus one slice per method; the second slice starts where the first ends.
    const circles = container.querySelectorAll("circle");
    expect(circles).toHaveLength(3);
    expect(Number(circles[2]!.getAttribute("stroke-dashoffset"))).toBeCloseTo(-(0.6 * 2 * Math.PI * 54), 0);
  });
});
