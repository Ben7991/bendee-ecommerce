import { render } from "@testing-library/react";

import { BrandMark } from "./BrandMark";

describe("BrandMark", () => {
  it("shows a monogram on its tint", () => {
    const { container } = render(<BrandMark tone="info" monogram="CL" className="mt-4" />);
    const mark = container.firstElementChild!;
    expect(mark).toHaveAttribute("aria-hidden", "true");
    expect(mark).toHaveClass("bg-tint-info", "size-10", "mt-4");
    expect(mark).toHaveTextContent("CL");
  });

  it("prefers an uploaded logo and has an empty state", () => {
    const { container, rerender } = render(<BrandMark tone="amber" monogram="A" image={<img alt="" src="/logo.png" />} />);
    expect(container.querySelector("img")).toBeInTheDocument();
    expect(container.firstElementChild).toHaveClass("bg-bg");
    rerender(<BrandMark tone="empty" size="lg" />);
    expect(container.firstElementChild).toHaveClass("border-dashed", "size-21");
  });
});
