import { render, screen } from "@testing-library/react";

import { ReportBars } from "./ReportBars";

describe("ReportBars", () => {
  it("draws each bar and hides extras on mobile", () => {
    const { container } = render(<ReportBars bars={[{ label: "Sleep & stress", value: "GHS 31,814 · 33%", compactValue: "GHS 31,814", share: 100 }, { label: "Greens & superfoods", value: "GHS 24,102 · 25%", share: 76 }, { label: "Rest of Ghana", value: "78%", share: 78, tone: "error" as const, valueTone: "error" as const }]} mobileLimit={2} />);
    expect(screen.getByText("GHS 31,814 · 33%")).toHaveClass("hidden", "md:inline");
    expect(screen.getByText("78%")).toHaveClass("text-error");
    expect(container.querySelectorAll("li")[2]).toHaveClass("hidden", "md:flex");
    expect(container.querySelector(".bg-error")).toHaveStyle({ width: "78%" });
  });
});
