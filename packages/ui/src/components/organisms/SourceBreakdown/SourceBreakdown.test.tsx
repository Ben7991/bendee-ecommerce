import { render, screen } from "@testing-library/react";

import { sampleSources } from "./fixtures";
import { SourceBreakdown } from "./SourceBreakdown";

describe("SourceBreakdown", () => {
  it("draws a bar per source and links the report", () => {
    const { container } = render(<SourceBreakdown sources={sampleSources} report={{ href: "/admin/reports" }} className="mt-4" />);
    expect(screen.getByRole("region", { name: "Orders by source" })).toHaveClass("mt-4");
    expect(screen.getByText("31%")).toBeInTheDocument();
    expect(container.querySelector(".bg-accent")).toHaveStyle({ width: "14%" });
    expect(screen.getByRole("link", { name: "Full report in Reports ›" })).toHaveAttribute("href", "/admin/reports");
  });
});
