import { render, screen } from "@testing-library/react";

import { ReturnPipeline } from "./ReturnPipeline";

describe("ReturnPipeline", () => {
  it("links each stage with its count, and leaves Closed off mobile", () => {
    render(
      <ReturnPipeline
        className="mt-4"
        activeHref="/r?stage=awaiting"
        stages={[
          { key: "requested", label: "Requested", count: 2, href: "/r?stage=requested", tone: "attention" },
          { key: "awaiting", label: "Awaiting item", compactLabel: "Awaiting", count: 2, href: "/r?stage=awaiting" },
          { key: "closed", label: "Closed · 30 days", count: 18, href: "/r?view=closed", tone: "closed" },
        ]}
      />,
    );
    expect(screen.getByRole("navigation", { name: "Return stages" })).toHaveClass("mt-4");
    // Chips (mobile) and cards (tablet+).
    expect(screen.getAllByRole("link", { name: "Requested, 2" })).toHaveLength(2);
    expect(screen.getAllByRole("link", { name: "Awaiting item, 2" })[0]).toHaveAttribute("aria-current", "page");
    expect(screen.getAllByRole("link", { name: "Closed · 30 days, 18" })).toHaveLength(1);
  });
});
