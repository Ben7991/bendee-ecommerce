import { render, screen } from "@testing-library/react";

import { Icon } from "./Icon";

describe("Icon", () => {
  it("is hidden from assistive tech by default", () => {
    const { container } = render(<Icon name="search" />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("is announced when given a label", () => {
    render(<Icon name="heart" label="Favourites" />);
    expect(screen.getByRole("img", { name: "Favourites" })).toBeInTheDocument();
  });

  it("fills solid icons and strokes outline icons", () => {
    const { container } = render(
      <>
        <Icon name="star" />
        <Icon name="check" size={12} />
      </>,
    );
    const [star, check] = container.querySelectorAll("svg");
    expect(star).toHaveAttribute("fill", "currentColor");
    expect(check).toHaveAttribute("stroke", "currentColor");
    expect(check).toHaveAttribute("width", "12");
  });
});
