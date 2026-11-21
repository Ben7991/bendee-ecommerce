import { fireEvent, render, screen } from "@testing-library/react";

import { ReturnReview } from "./ReturnReview";

beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

const props = {
  backHref: "/admin/returns",
  number: "RTN-0418",
  status: { label: "Requested", tone: "warning" as const },
  meta: "Efua Boateng",
  decision: {
    defaultMethod: "none",
    methods: [
      { value: "dropoff", label: "Drop-off", description: "Customer brings it" },
      { value: "none", label: "No return needed", description: "Write off", note: "1 unit is logged as Damaged." },
    ],
  },
  refund: { lines: [{ label: "Magnesium Sleep × 1", amount: 80 }], deliveryFee: 25, method: "MoMo" },
  primary: { label: "Approve & refund {amount}", intent: "approve" },
  secondary: { label: "Reject", intent: "reject" },
};

describe("ReturnReview", () => {
  it("tracks the method and adds the delivery fee to the refund", () => {
    const { container } = render(<ReturnReview {...props} className="mt-4" />);
    expect(screen.getByRole("heading", { level: 1, name: "RTN-0418" })).toBeInTheDocument();
    expect(container.querySelector("form")).toHaveClass("mt-4");
    expect(screen.getAllByText("1 unit is logged as Damaged.").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: "Approve & refund GHS 80" }).length).toBeGreaterThan(0);

    fireEvent.click(screen.getAllByRole("switch", { name: "Refund the delivery fee" })[0]!);
    expect(screen.getAllByRole("button", { name: "Approve & refund GHS 105" }).length).toBeGreaterThan(0);
    expect(container.querySelector('input[name="deliveryFee"]')).toHaveValue("on");

    fireEvent.click(screen.getAllByRole("radio", { name: /Drop-off/ })[0]!);
    expect(container.querySelector('input[name="method"]')).toHaveValue("dropoff");
    expect(screen.queryByText("1 unit is logged as Damaged.")).not.toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Reject" })[0]).toHaveAttribute("value", "reject");
  });
});
