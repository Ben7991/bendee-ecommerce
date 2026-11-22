import { fireEvent, render, screen } from "@testing-library/react";

import { OrderRefundDialog } from "./OrderRefundDialog";

beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

const props = {
  trigger: <button type="button">Refund</button>,
  number: "JFK-251482",
  summary: "Kwame Asante · Paid GHS 412.00",
  lines: [
    { id: "enr", name: "Energy B-Complex", unitPrice: 116, bought: 2, defaultQuantity: 1 },
    { id: "ash", name: "Ashwagandha Calm", unitPrice: 145, bought: 1 },
  ],
  deliveryFee: 35,
  paid: 412,
  defaultReason: "damaged",
  reasons: [{ value: "damaged", label: "Damaged on arrival" }],
  method: { brand: "mtn" as const, name: "MTN MoMo", detail: "024 ••• 4521 · via Paystack" },
  approvalThreshold: 300,
  action: "/refund",
};

describe("OrderRefundDialog", () => {
  it("adds up the chosen lines and delivery fee", () => {
    render(<OrderRefundDialog {...props} className="mt-4" />);
    fireEvent.click(screen.getByRole("button", { name: "Refund" }));
    expect(screen.getByRole("dialog", { name: "Refund JFK-251482" })).toHaveClass("mt-4");
    const amount = screen.getByRole("textbox", { name: "Refund amount" });
    expect(amount).toHaveValue("116.00");
    fireEvent.click(screen.getByRole("button", { name: "Increase Ashwagandha Calm" }));
    expect(amount).toHaveValue("261.00");
    fireEvent.click(screen.getByRole("checkbox", { name: "Also refund the delivery fee" }));
    expect(amount).toHaveValue("296.00");
    expect(screen.getByRole("button", { name: "Refund GHS 296.00" })).toBeEnabled();
    expect(screen.getByText("Over GHS 300.00 needs an admin's approval.")).toBeInTheDocument();
  });

  it("won't refund more than was paid", () => {
    render(<OrderRefundDialog {...props} defaultOpen />);
    fireEvent.change(screen.getByRole("textbox", { name: "Refund amount" }), { target: { value: "500" } });
    expect(screen.getByRole("textbox", { name: "Refund amount" })).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("button", { name: "Refund GHS 500.00" })).toBeDisabled();
  });

  it("only restocks lines being refunded", () => {
    render(<OrderRefundDialog {...props} defaultOpen />);
    expect(screen.getByRole("switch", { name: "Restock Ashwagandha Calm" })).toBeDisabled();
    expect(screen.getByRole("switch", { name: "Restock Energy B-Complex" })).toBeEnabled();
  });
});
