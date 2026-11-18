import { render, screen } from "@testing-library/react";

import { Flag } from "./Flag";

describe("Flag", () => {
  it("is decorative by default", () => {
    const { container } = render(<Flag country="GH" />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("is an image when labelled", () => {
    render(<Flag country="GH" label="Ghana" className="mt-4" />);
    expect(screen.getByRole("img", { name: "Ghana" })).toHaveClass("mt-4");
  });
});
