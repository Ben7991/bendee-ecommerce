import { render, screen } from "@testing-library/react";

import { Eyebrow } from "./Eyebrow";

describe("Eyebrow", () => {
  it("renders its text", () => {
    render(<Eyebrow>Shop by goal</Eyebrow>);
    expect(screen.getByText("Shop by goal")).toHaveClass("uppercase");
  });
});
