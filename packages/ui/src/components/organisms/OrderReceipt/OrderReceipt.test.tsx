import { render, screen } from "@testing-library/react";

import { OrderReceipt } from "./OrderReceipt";

describe("OrderReceipt", () => {
  it("shows delivery, payment, items and the total", () => {
    const { container } = render(
      <OrderReceipt
        className="mt-4"
        delivery={{ name: "Ama Mensah", phone: "+233", address: "14 Lagos Avenue", method: "Standard · Free", short: "14 Lagos Ave" }}
        payment={{ brand: "mtn", label: "MoMo ···· 7781", amount: "GHS 450 paid", when: "today", short: "MTN MoMo ···· 7781" }}
        items={[{ id: "a", name: "Daily Greens Powder", price: "GHS 450", quantity: 1 }]}
        itemsTitle="In this order · 1 item"
        itemsShort="1 item"
        totalsLine="Subtotal GHS 450"
        total="GHS 450.00"
        receiptHref="/receipt"
      />,
    );
    expect(screen.getByRole("region", { name: "Delivering to" })).toHaveTextContent("Ama Mensah");
    expect(screen.getByRole("region", { name: "Payment" })).toHaveTextContent("MoMo ···· 7781");
    expect(screen.getByRole("link", { name: "Download receipt" })).toHaveAttribute("href", "/receipt");
    expect(screen.getAllByText("GHS 450.00")).toHaveLength(2);
    expect(container.firstChild).toHaveClass("mt-4");
  });
});
