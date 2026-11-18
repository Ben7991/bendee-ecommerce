import { render, screen } from "@testing-library/react";

import { CheckoutShell } from "./CheckoutShell";

describe("CheckoutShell", () => {
  it("renders header, title, steps and sidebar", () => {
    const { container } = render(
      <CheckoutShell header={<header>Header</header>} title="Almost there" sidebar={<aside>Summary</aside>} className="mt-4">
        <p>Step</p>
      </CheckoutShell>,
    );
    expect(screen.getByRole("heading", { level: 1, name: "Almost there" })).toBeInTheDocument();
    expect(screen.getByRole("main")).toContainElement(screen.getByText("Step"));
    expect(screen.getByText("Summary")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("mt-4");
  });
});
