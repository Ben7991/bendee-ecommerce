import { render, screen } from "@testing-library/react";

import { PaymentMethods } from "./PaymentMethods";

describe("PaymentMethods", () => {
  it("lists the accepted methods", () => {
    render(<PaymentMethods brands={["mtn", "visa"]} note="Secure" className="mt-4" />);
    const list = screen.getByRole("list", { name: "Accepted payment methods" });
    expect(list.querySelectorAll("li")).toHaveLength(2);
    expect(screen.getByText("Secure")).toBeInTheDocument();
  });
});
