import { render, screen } from "@testing-library/react";

import { TextLink } from "./TextLink";

describe("TextLink", () => {
  it("renders an underlined brand link by default", () => {
    render(<TextLink href="/x">Change</TextLink>);
    const link = screen.getByRole("link", { name: "Change" });
    expect(link).toHaveAttribute("href", "/x");
    expect(link).toHaveClass("underline", "text-brand");
  });

  it("renders the child element with asChild and merges className last", () => {
    render(
      <TextLink asChild tone="muted" className="mt-4">
        <a href="/terms">Terms</a>
      </TextLink>,
    );
    expect(screen.getByRole("link", { name: "Terms" })).toHaveClass("text-inherit", "mt-4");
  });
});
