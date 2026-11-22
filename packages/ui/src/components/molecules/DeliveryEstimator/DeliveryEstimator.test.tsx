import { render, screen } from "@testing-library/react";

import { DeliveryEstimator } from "./DeliveryEstimator";

describe("DeliveryEstimator", () => {
  it("shows the location, each option and the note", () => {
    render(
      <DeliveryEstimator
        location="Accra · East Legon"
        action={<a href="/account/addresses">Change</a>}
        options={[
          { label: "Standard delivery", value: "Tomorrow · GHS 25" },
          { label: "Pickup · Osu store", value: "Today · Free" },
        ]}
        note="Add GHS 50 more for free delivery"
        className="mt-4"
      />,
    );
    expect(screen.getByText("Accra · East Legon")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Change" })).toBeInTheDocument();
    expect(screen.getByText("Standard delivery").nextSibling).toHaveTextContent("Tomorrow · GHS 25");
    expect(screen.getByText("Add GHS 50 more for free delivery").closest("[data-slot=delivery-estimator]")).toHaveClass("mt-4");
  });
});
