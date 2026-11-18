import { render } from "@testing-library/react";

import { BrandLogo } from "./BrandLogo";

describe("BrandLogo", () => {
  it("renders the mark hidden from assistive tech", () => {
    const { container } = render(<BrandLogo name="google" size={20} className="mt-4" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveAttribute("width", "20");
    expect(svg).toHaveClass("mt-4");
  });
});
