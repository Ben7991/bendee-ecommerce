import { render, screen } from "@testing-library/react";

import { CustomerStats } from "./CustomerStats";

describe("CustomerStats", () => {
  it("shows each figure with its currency and note", () => {
    render(
      <CustomerStats
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
    render(<CustomerStats variant="profile" aria-label="Figures" stats={[{ label: "Orders", value: "14", note: "1 partly refunded", noteTone: "muted" }]} />);
    expect(screen.getByText("1 partly refunded").parentElement).toHaveClass("hidden", "xl:block");
  });
});
