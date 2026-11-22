import { render, screen } from "@testing-library/react";

import { ReviewForm } from "./ReviewForm";

describe("ReviewForm", () => {
  it("renders the note, SMS opt-in, notice and pay action", () => {
    const { container } = render(
      <ReviewForm
        className="mt-4"
        smsLabel="Send order updates by SMS"
        notice={{ title: "Keep your phone close", text: "MTN will send a prompt." }}
        payAction={<button type="button">Pay</button>}
      />,
    );
    expect(screen.getByRole("textbox", { name: "Delivery note (optional)" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Send order updates by SMS" })).toBeChecked();
    expect(screen.getAllByText("Keep your phone close", { exact: false }).length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: "Pay" })).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("mt-4");
  });
});
