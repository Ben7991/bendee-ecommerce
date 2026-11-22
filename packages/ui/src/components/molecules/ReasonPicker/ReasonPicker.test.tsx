import { fireEvent, render, screen } from "@testing-library/react";

import { ReasonPicker } from "./ReasonPicker";

beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("ReasonPicker", () => {
  it("is a required radio group named by its label", () => {
    render(
      <ReasonPicker
        className="mt-4"
        name="reason"
        options={[
          { value: "customer", label: "Customer asked to cancel" },
          { value: "stock", label: "Out of stock" },
        ]}
      />,
    );
    const group = screen.getByRole("radiogroup", { name: "Reason (required)" });
    expect(group).toHaveAttribute("aria-required", "true");
    expect(group.closest("[data-slot=reason-picker]")).toHaveClass("mt-4");
    fireEvent.click(screen.getByRole("radio", { name: "Out of stock" }));
    expect(screen.getByRole("radio", { name: "Out of stock" })).toHaveAttribute("aria-checked", "true");
  });
});
