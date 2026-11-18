import { render, screen } from "@testing-library/react";

import { PaymentStatusCard } from "./PaymentStatusCard";

describe("PaymentStatusCard", () => {
  it("shows the status, steps and actions", () => {
    render(
      <PaymentStatusCard
        tone="pending"
        title="Approve on your phone"
        description="We sent a request."
        status={{ label: "Waiting for approval", detail: "2:41 left" }}
        steps={{ items: ["Open the prompt", "Enter your PIN"] }}
        actions={<button type="button">Resend</button>}
        footnote="Order JFK-250184"
        className="mt-4"
      />,
    );
    expect(screen.getByRole("heading", { level: 1, name: "Approve on your phone" })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Waiting for approval");
    expect(screen.getAllByText("Open the prompt")).toHaveLength(2);
    expect(screen.getByRole("button", { name: "Resend" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Approve on your phone" })).toHaveClass("mt-4");
  });
});
