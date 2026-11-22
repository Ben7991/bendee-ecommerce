import { fireEvent, render, screen } from "@testing-library/react";

import { CancelOrderDialog } from "./CancelOrderDialog";

const props = {
  description: "JFK-250184 · we haven't started packing yet",
  reasons: [
    { value: "mistake", label: "Ordered by mistake" },
    { value: "other", label: "Something else" },
  ],
  refund: { brand: "mtn" as const, text: "GHS 1,254.60 refunded to MTN MoMo" },
};

beforeAll(() => {
  // Radix RadioGroup measures its items.
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

describe("CancelOrderDialog", () => {
  it("opens from its trigger with the reasons and both actions", () => {
    render(<CancelOrderDialog {...props} trigger={<button type="button">Cancel order</button>} />);
    fireEvent.click(screen.getByRole("button", { name: "Cancel order" }));
    const dialog = screen.getByRole("dialog", { name: "Cancel this order?" });
    expect(dialog).toHaveAccessibleDescription("JFK-250184 · we haven't started packing yet");
    expect(screen.getByRole("radio", { name: "Ordered by mistake" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Keep my order" })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Cancel order" }).at(-1)).toHaveAttribute("type", "submit");
  });

  it("closes when the customer keeps the order", () => {
    render(<CancelOrderDialog {...props} trigger={<button type="button">Open</button>} />);
    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    fireEvent.click(screen.getByRole("button", { name: "Keep my order" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
