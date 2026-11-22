import { render, screen, within } from "@testing-library/react";

import { RevenueChart } from "./RevenueChart";

describe("RevenueChart", () => {
  it("draws a bar per day and gives screen readers the numbers", () => {
    const { container } = render(
      <RevenueChart
        className="mt-4"
        summary="GHS 8,760 total"
        max={8000}
        ticks={["8k", "4k", "0"]}
        days={[
          { label: "Sat", value: 4000, display: "GHS 4,000" },
          { label: "Today", value: 4760, display: "GHS 4,760", current: true },
        ]}
      />,
    );
    expect(screen.getByRole("region", { name: "Revenue, last 7 days" })).toHaveClass("mt-4");
    const table = screen.getByRole("table");
    expect(within(table).getByRole("rowheader", { name: "Today" })).toBeInTheDocument();
    expect(within(table).getByText("GHS 4,760")).toBeInTheDocument();
    const bars = container.querySelectorAll(".rounded-t-8");
    expect(bars).toHaveLength(2);
    expect(bars[0]).toHaveStyle({ height: "50%" });
    expect(bars[1]).toHaveClass("bg-primary");
  });
});
