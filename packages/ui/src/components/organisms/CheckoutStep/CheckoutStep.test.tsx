import { render, screen } from "@testing-library/react";

import { CheckoutStep } from "./CheckoutStep";

describe("CheckoutStep", () => {
  it("is a labelled section with its body and footer", () => {
    render(
      <CheckoutStep number={2} title="Delivery" description="Where to?" footer={<button type="button">Continue</button>} className="mt-4">
        <p>Fields</p>
      </CheckoutStep>,
    );
    const step = screen.getByRole("region", { name: "Delivery" });
    expect(step).toHaveClass("mt-4");
    expect(screen.getByText("Fields")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue" })).toBeInTheDocument();
  });
});
