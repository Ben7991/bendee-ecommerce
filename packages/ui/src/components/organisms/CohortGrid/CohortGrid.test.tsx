import { render, screen } from "@testing-library/react";

import { CohortGrid } from "./CohortGrid";

describe("CohortGrid", () => {
  it("shades cells by retention and dashes future months", () => {
    render(<CohortGrid {...{ title: "Do customers come back?", description: "Share of each month’s new customers who ordered again", months: 3, rows: [{ label: "June 2026", compactLabel: "Jun", sub: "182 customers", values: [24, 18, 15] }, { label: "October 2026", compactLabel: "Oct", sub: "268 customers", values: [31, null, null] }] }} />);
    expect(screen.getByText("31").closest("td")).toHaveClass("bg-primary");
    expect(screen.getAllByText("—")[0]).toHaveClass("border-dashed");
    expect(screen.getByText("June 2026")).toBeInTheDocument();
  });
});
