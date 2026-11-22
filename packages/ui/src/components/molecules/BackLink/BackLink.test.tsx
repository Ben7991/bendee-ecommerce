import { render, screen } from "@testing-library/react";

import { BackLink } from "./BackLink";

describe("BackLink", () => {
  it("renders a link with a chevron", () => {
    render(<BackLink href="/auth/sign-in">Back to sign in</BackLink>);
    const link = screen.getByRole("link", { name: "Back to sign in" });
    expect(link).toHaveAttribute("href", "/auth/sign-in");
    expect(link.querySelector('[data-icon="chevronLeft"]')).not.toBeNull();
  });

  it("puts the chevron inside the app's link with asChild", () => {
    render(
      <BackLink asChild className="mt-4">
        <a href="/x">Back</a>
      </BackLink>,
    );
    const link = screen.getByRole("link", { name: "Back" });
    expect(link).toHaveClass("mt-4");
    expect(link.querySelector('[data-icon="chevronLeft"]')).not.toBeNull();
  });
});
