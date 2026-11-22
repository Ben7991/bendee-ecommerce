import { render, screen } from "@testing-library/react";

import { ReportHistogram } from "./ReportHistogram";

describe("ReportHistogram", () => {
  it("draws bins with counts and a highlighted one", () => {
    render(<ReportHistogram {...{ title: "Order values around the free-delivery line", description: "Orders by value", bins: [{ label: "<100", value: 52 }, { label: "250–299", value: 38 }, { label: "300–349", value: 71, highlight: true }, { label: "500+", value: 23 }], markerBefore: 2 }}>Finding</ReportHistogram>);
    expect(screen.getByText("<100: 52, 250–299: 38, 300–349: 71, 500+: 23")).toBeInTheDocument();
    expect(screen.getByText("300–349")).toHaveClass("font-semibold");
    expect(screen.getByText("Finding")).toBeInTheDocument();
  });
});
