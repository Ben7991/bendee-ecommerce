import { render, screen } from "@testing-library/react";

import { ReportKpis } from "./ReportKpis";

describe("ReportKpis", () => {
  it("shows values, deltas and a full-width odd tile on mobile", () => {
    const { container } = render(<ReportKpis variant="compact" kpis={[{ label: "Gross revenue", value: "GHS 96,408", delta: { text: "14.2%", direction: "up" as const, good: true }, trend: [3, 4, 3, 6, 5, 8], tone: "dark" as const }, { label: "Conversion", value: "2.8%", delta: { text: "0.2 pts", direction: "down" as const, good: false }, trend: [6, 5, 6, 4, 4, 3] }, { label: "Refunds", value: "GHS 1,460", delta: { text: "6.1%", direction: "down" as const, good: true } }]} />);
    expect(screen.getByText("▼ 0.2 pts", { exact: false })).toHaveClass("text-error");
    expect(screen.getByText("GHS 96,408").parentElement).toHaveClass("bg-primary");
    expect(container.firstChild?.lastChild).toHaveClass("col-span-2");
  });
});
