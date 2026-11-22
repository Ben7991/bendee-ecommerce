import { render, screen } from "@testing-library/react";

import { Logo } from "./Logo";

describe("Logo", () => {
  it("renders the wordmark", () => {
    render(<Logo />);
    expect(screen.getByText("Jofak")).toBeInTheDocument();
  });

  it("renders as a link with asChild, keeping mark and wordmark inside", () => {
    render(
      <Logo asChild>
        <a href="/" aria-label="Jofak home" />
      </Logo>,
    );
    const link = screen.getByRole("link", { name: "Jofak home" });
    expect(link).toHaveAttribute("data-slot", "logo");
    expect(link.querySelector("svg")).not.toBeNull();
    expect(link).toHaveTextContent("Jofak");
  });
});
