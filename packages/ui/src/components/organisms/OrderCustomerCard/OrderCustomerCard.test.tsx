import { fireEvent, render, screen } from "@testing-library/react";

import { OrderCustomerCard } from "./OrderCustomerCard";

describe("OrderCustomerCard", () => {
  it("masks contact details until shown, and reports it", () => {
    const onReveal = vi.fn();
    render(
      <OrderCustomerCard
        className="mt-4"
        name="Ama Boateng"
        stats="4 orders"
        phone={{ masked: "024 ••• 5530", full: "024 418 5530" }}
        email={{ masked: "a•••@gmail.com", full: "ama@gmail.com" }}
        profileHref="/admin/customers/ama"
        onReveal={onReveal}
      />,
    );
    expect(screen.getByRole("region", { name: "Customer" })).toHaveClass("mt-4");
    expect(screen.queryByText("ama@gmail.com")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Show full contact details" }));
    expect(onReveal).toHaveBeenCalled();
    expect(screen.getByText("ama@gmail.com")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Call" })).toHaveAttribute("href", "tel:0244185530");
    expect(screen.getByRole("link", { name: "View profile" })).toHaveAttribute("href", "/admin/customers/ama");
  });
});
