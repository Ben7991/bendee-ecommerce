import { render, screen } from "@testing-library/react";

import { FunnelSteps } from "./FunnelSteps";

describe("FunnelSteps", () => {
  it("shows each step with the biggest leak flagged", () => {
    render(<FunnelSteps {...{ title: "Purchase funnel", description: "14,710 sessions → 412 orders", steps: [{ name: "Session started", sessions: "14,710", rate: "100%", reached: 100, dropped: 0 }, { name: "Added to cart", sessions: "2,060", rate: "14.0%", reached: 14, dropped: 42, biggest: true, drop: { text: "−75.0%", compact: "6,180 dropped · 75.0% — biggest leak" } }, { name: "Order placed", sessions: "412", rate: "2.8%", reached: 2.8, dropped: 1.4, drop: { text: "−206 · 33.3%", compact: "206 dropped · 33.3%" } }] }} />);
    expect(screen.getByText("−75.0% biggest")).toHaveClass("text-error");
    expect(screen.getByText("6,180 dropped · 75.0% — biggest leak")).toHaveClass("text-error");
    expect(screen.getByRole("rowheader", { name: /Order placed/ })).toBeInTheDocument();
  });
});
