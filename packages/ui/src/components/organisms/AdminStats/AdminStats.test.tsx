import { render, screen } from "@testing-library/react";

import { AdminStats } from "./AdminStats";

describe("AdminStats", () => {
  it("shows each figure with its currency and note", () => {
    render(
      <AdminStats
        aria-label="Customers at a glance"
        className="mt-4"
        stats={[
          { label: "Avg. lifetime value", value: "612", currency: "GHS" },
          { label: "No order in 90+ days", value: "211", tone: "warning" },
          { label: "Total customers", value: "1,284", note: "+86 this month", compactNote: "+86" },
        ]}
      />,
    );
    expect(screen.getByRole("region", { name: "Customers at a glance" })).toHaveClass("mt-4");
    expect(screen.getByText("GHS")).toBeInTheDocument();
    expect(screen.getByText("211")).toHaveClass("text-warning-text");
    expect(screen.getByText("+86 this month")).toBeInTheDocument();
  });

  it("shows profile notes from 1440px", () => {
    render(<AdminStats variant="profile" aria-label="Figures" stats={[{ label: "Orders", value: "14", note: "1 partly refunded", noteTone: "muted" }]} />);
    expect(screen.getByText("1 partly refunded").parentElement).toHaveClass("hidden", "xl:block");
  });

  it("shows cards with compact values on tablet", () => {
    render(
      <AdminStats
        variant="cards"
        aria-label="Discounts"
        stats={[
          { label: "Live now", value: "6", tone: "accent", note: "4 codes" },
          { label: "Cost of discounts", compactLabel: "Cost", value: "GHS 9,870", compactValue: "GHS 9.9k", tone: "muted" },
        ]}
      />,
    );
    expect(screen.getByRole("region", { name: "Discounts" })).toHaveClass("hidden", "md:flex");
    expect(screen.getByText("6")).toHaveClass("text-on-accent");
    expect(screen.getByText("GHS 9.9k")).toHaveClass("xl:hidden");
    expect(screen.getByText("Cost of discounts")).toHaveClass("hidden", "xl:inline");
  });
});
