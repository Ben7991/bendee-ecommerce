import { render, screen } from "@testing-library/react";

import { sampleTracking } from "./fixtures";
import { TrackingHealth } from "./TrackingHealth";

describe("TrackingHealth", () => {
  it("shows each tracker's health and the mobile alert", () => {
    render(<TrackingHealth {...sampleTracking} className="mt-4" />);
    expect(screen.getByRole("region", { name: "Ad tracking" })).toHaveClass("mt-4");
    expect(screen.getByText("Healthy")).toHaveClass("text-brand");
    expect(screen.getByText("3 purchases missed yesterday")).toHaveClass("text-warning-text");
    expect(screen.getByRole("link", { name: "Check" })).toHaveAttribute("href", "?debug=events");
  });

  it("lists debug events", () => {
    render(<TrackingHealth {...sampleTracking} events={[{ id: "e1", time: "10:42", label: "Purchase", tracker: "GA4", received: false }]} />);
    expect(screen.getByText("GA4 · missed")).toHaveClass("text-warning-text");
  });
});
