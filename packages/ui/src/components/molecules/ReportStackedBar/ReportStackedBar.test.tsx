import { render, screen } from "@testing-library/react";

import { ReportStackedBar } from "./ReportStackedBar";

describe("ReportStackedBar", () => {
  it("draws the parts and a legend with shares", () => {
    render(<ReportStackedBar segments={[{ label: "Cart only", value: "955", share: 58, tone: "soft" as const }, { label: "Contact details", value: "263", share: 16, tone: "strong" as const }, { label: "Payment failed", value: "87", share: 5.2, tone: "error" as const }]} showShare />);
    expect(screen.getByText("Contact details")).toBeInTheDocument();
    expect(screen.getByText("58.0%")).toBeInTheDocument();
  });
});
