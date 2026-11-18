import { render } from "@testing-library/react";

import { Illustration } from "./Illustration";

describe("Illustration", () => {
  it("is always decorative", () => {
    const { container } = render(<Illustration name="moon" />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
});
