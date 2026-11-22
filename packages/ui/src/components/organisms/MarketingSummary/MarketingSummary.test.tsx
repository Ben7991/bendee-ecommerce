import { render, screen } from "@testing-library/react";

import { sampleSummary } from "./fixtures";
import { MarketingSummary } from "./MarketingSummary";

describe("MarketingSummary", () => {
  it("shows the figures with a target bar and compact tablet notes", () => {
    const { container } = render(<MarketingSummary {...sampleSummary} className="mt-4" />);
    expect(container.firstChild).toHaveClass("mt-4");
    expect(screen.getAllByText("GHS 10,960").length).toBe(2);
    expect(screen.getByRole("progressbar", { name: "Cart recovery rate, target 53%" })).toHaveAttribute("aria-valuenow", "62");
    expect(screen.getByText("Above 8% target")).toHaveClass("text-brand", "xl:hidden");
    expect(screen.getByText("of visitors accept marketing cookies")).toBeInTheDocument();
  });
});
