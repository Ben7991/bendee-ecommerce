import { render } from "@testing-library/react";

import { Medallion } from "./Medallion";

describe("Medallion", () => {
  it("renders two decorative circles with the given sizes", () => {
    const { container } = render(
      <Medallion core="accent" className="size-42" coreClassName="size-29.5">
        <svg data-testid="icon" />
      </Medallion>,
    );
    const outer = container.firstChild as HTMLElement;
    expect(outer).toHaveAttribute("aria-hidden", "true");
    expect(outer).toHaveClass("size-42", "bg-sage-50");
    expect(outer.firstChild).toHaveClass("size-29.5", "bg-accent");
  });
});
