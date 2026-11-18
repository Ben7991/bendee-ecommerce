import { render, screen } from "@testing-library/react";

import { Callout } from "./Callout";

describe("Callout", () => {
  it("renders a title and list", () => {
    render(<Callout title="Can't find it?" items={["Check spam", "Try another email"]} />);
    expect(screen.getByText("Can't find it?")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("renders an icon with text and applies className", () => {
    const { container } = render(
      <Callout icon="phone" className="mt-4">
        Signed up with your phone?
      </Callout>,
    );
    expect(container.querySelector('[data-icon="phone"]')).not.toBeNull();
    expect(container.firstChild).toHaveClass("mt-4");
  });
});
