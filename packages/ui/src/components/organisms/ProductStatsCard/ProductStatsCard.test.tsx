import { render, screen } from "@testing-library/react";

import { ProductStatsCard } from "./ProductStatsCard";

describe("ProductStatsCard", () => {
  it("shows the 30-day figures and links to Reports", () => {
    render(<ProductStatsCard className="mt-4" stats={[{ value: "71", label: "units sold" }]} reportsHref="/admin/reports" />);
    expect(screen.getByRole("region", { name: "Last 30 days" })).toHaveClass("mt-4");
    expect(screen.getByText("71")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View in Reports" })).toHaveAttribute("href", "/admin/reports");
  });
});
