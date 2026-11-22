import { render, screen } from "@testing-library/react";

import { TrackOrderLookup } from "./TrackOrderLookup";

describe("TrackOrderLookup", () => {
  it("asks for the order number and phone", () => {
    render(<TrackOrderLookup action="/orders/track" className="mt-4" hint="Got a tracking link by SMS?" />);
    expect(screen.getByRole("region", { name: "Where's my order?" })).toHaveClass("mt-4");
    expect(screen.getByLabelText("Order number")).toHaveAttribute("name", "order");
    expect(screen.getByLabelText("Phone number")).toHaveAttribute("name", "phone");
    expect(screen.getByRole("button", { name: "Track order" })).toHaveAttribute("type", "submit");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByText("Got a tracking link by SMS?")).toBeInTheDocument();
  });

  it("shows the not-found alert and flags the order number", () => {
    render(
      <TrackOrderLookup
        defaultOrder="JFK-25018"
        error={{ title: "We couldn't find that order", description: "3 tries left." }}
        orderError="Order numbers start with JFK- followed by 6 digits."
      />,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("We couldn't find that order");
    const order = screen.getByLabelText("Order number");
    expect(order).toHaveValue("JFK-25018");
    expect(order).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Order numbers start with JFK- followed by 6 digits.")).toBeInTheDocument();
  });
});
