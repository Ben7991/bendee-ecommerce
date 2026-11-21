import { fireEvent, render, screen } from "@testing-library/react";

import { OrderCancelDialog } from "./OrderCancelDialog";

beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("OrderCancelDialog", () => {
  it("needs a reason and posts the choices", () => {
    render(
      <OrderCancelDialog
        className="mt-4"
        trigger={<button type="button">Cancel order</button>}
        number="JFK-251477"
        summary="Ama Boateng · GHS 596.00"
        reasons={[
          { value: "customer", label: "Customer asked to cancel" },
          { value: "stock", label: "Out of stock" },
        ]}
        money={{ title: "Nothing to refund", body: "No money has been collected yet." }}
        switches={[{ name: "restock", label: "Return 4 items to stock", defaultChecked: true }]}
        action="/cancel"
        fields={{ order: "JFK-251477" }}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Cancel order" }));
    const dialog = screen.getByRole("dialog", { name: "Cancel order JFK-251477?" });
    expect(dialog).toHaveClass("mt-4");
    const submit = screen.getAllByRole("button", { name: "Cancel order" }).find((button) => button.getAttribute("type") === "submit")!;
    expect(submit).toBeDisabled();
    fireEvent.click(screen.getByRole("radio", { name: "Out of stock" }));
    expect(submit).toBeEnabled();
    expect(screen.getByRole("switch", { name: /Return 4 items to stock/ })).toBeChecked();
    expect(dialog.querySelector('input[type=hidden][name=order]')).toHaveValue("JFK-251477");
    expect(screen.getByText("Nothing to refund")).toBeInTheDocument();
  });
});
