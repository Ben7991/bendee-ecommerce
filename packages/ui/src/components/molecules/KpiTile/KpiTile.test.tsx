import { render, screen } from "@testing-library/react";

import { KpiTile } from "./KpiTile";

describe("KpiTile", () => {
  it("shows the figure, currency, change and comparison", () => {
    render(
      <KpiTile
        tone="feature"
        label="Revenue today"
        currency="GHS"
        value="4,820.00"
        delta={{ label: "+12.4%", tone: "up" }}
        comparison="vs last Sunday"
        trend={[1, 2, 3]}
        className="mt-4"
      />,
    );
    expect(screen.getByText("Revenue today").closest("[data-slot=kpi-tile]")).toHaveClass("bg-primary", "mt-4");
    expect(screen.getByText("GHS")).toBeInTheDocument();
    expect(screen.getByText("4,820.00")).toHaveClass("text-text-inverse");
    expect(screen.getByText("+12.4%")).toHaveClass("bg-accent");
    expect(screen.getByText("vs last Sunday")).toBeInTheDocument();
  });

  it("marks a fall in the error tone", () => {
    render(<KpiTile label="Conversion rate" value="2.8%" delta={{ label: "−0.4 pts", tone: "down" }} trend={[3, 2, 1]} />);
    expect(screen.getByText("−0.4 pts")).toHaveClass("text-error");
    expect(document.querySelector("[data-slot=sparkline]")).toHaveClass("stroke-error");
  });
});
