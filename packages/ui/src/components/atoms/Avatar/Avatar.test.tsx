import { render, screen } from "@testing-library/react";

import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("is decorative without a label", () => {
    const { container } = render(<Avatar />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("is announced with a label", () => {
    render(<Avatar label="Amara O." />);
    expect(screen.getByRole("img", { name: "Amara O." })).toBeInTheDocument();
  });
});
