import { render, screen } from "@testing-library/react";

import { OrderDeliveryCard } from "./OrderDeliveryCard";

describe("OrderDeliveryCard", () => {
  it("shows where it goes, the GPS code and the tracking field", () => {
    render(
      <OrderDeliveryCard
        className="mt-4"
        method="Same day"
        street="House 14, Firestone Road"
        area="Madina, Accra"
        gps={{ code: "GM-071-4472", mapsHref: "https://maps.example/GM-071-4472" }}
        landmark="Behind the Total station"
        note="Please call when you reach the gate."
        tracking={{ action: "/tracking", fields: { order: "JFK-1" } }}
      />,
    );
    expect(screen.getByRole("region", { name: "Delivery" })).toHaveClass("mt-4");
    expect(screen.getByText("GM-071-4472")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Open in Maps/ })).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("textbox", { name: "Courier tracking no. (optional)" })).toHaveAttribute("name", "tracking");
  });
});
