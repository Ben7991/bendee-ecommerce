import { render, screen } from "@testing-library/react";

import { ReportList } from "./ReportList";

describe("ReportList", () => {
  it("lists rows with ranks, values and highlights", () => {
    render(<ReportList rows={[{ id: "1", rank: "1", title: "Greens Daily · 30 servings", sub: "142 units", value: "GHS 9,940" }, { id: "2", title: "At risk", sub: "Quiet ~118 days", value: "96", dot: "warning" as const, highlight: true }]} />);
    expect(screen.getByText("GHS 9,940")).toBeInTheDocument();
    expect(screen.getByText("Quiet ~118 days")).toHaveClass("text-warning-text");
  });

  it("renders compact label and value pairs", () => {
    render(<ReportList compact rows={[{ id: "a", title: "AirtelTigo Money", value: "68%", valueTone: "error" }]} />);
    expect(screen.getByText("68%")).toHaveClass("text-error");
  });
});
