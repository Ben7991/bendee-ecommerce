import { render, screen } from "@testing-library/react";

import { ProductThumb } from "./ProductThumb";

describe("ProductThumb", () => {
  it("shows the image, tint and quantity", () => {
    render(<ProductThumb data-testid="thumb" tint="amber" quantity={2} image={<img alt="" src="/x.png" />} className="mt-4" />);
    const thumb = screen.getByTestId("thumb");
    expect(thumb).toHaveClass("bg-tint-amber", "mt-4");
    expect(thumb).toHaveAttribute("aria-hidden", "true");
    expect(thumb).toHaveTextContent("2");
    expect(thumb.querySelector("img")).not.toBeNull();
  });

  it("fades when dimmed", () => {
    render(<ProductThumb data-testid="thumb" dimmed />);
    expect(screen.getByTestId("thumb")).toHaveClass("opacity-muted");
  });
});
