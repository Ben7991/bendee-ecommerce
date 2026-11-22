import { render } from "@testing-library/react";

import { Sparkline, sparklinePath } from "./Sparkline";

describe("Sparkline", () => {
  it("draws the series as one decorative path", () => {
    const { container } = render(<Sparkline values={[1, 3, 2]} tone="error" className="mt-4" />);
    const svg = container.querySelector("svg")!;
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveClass("stroke-error", "mt-4");
    expect(svg.querySelector("path")).toHaveAttribute("d", sparklinePath([1, 3, 2]));
  });

  it("puts higher values higher and spans the box", () => {
    expect(sparklinePath([0, 10])).toBe("M2.0 22.0 L70.0 2.0");
    expect(sparklinePath([])).toBe("");
  });
});
