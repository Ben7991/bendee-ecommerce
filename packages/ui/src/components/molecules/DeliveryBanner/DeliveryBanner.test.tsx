import { render, screen } from "@testing-library/react";

import { DeliveryBanner } from "./DeliveryBanner";

describe("DeliveryBanner", () => {
  it("shows both titles and the action", () => {
    render(
      <DeliveryBanner data-testid="banner" eyebrow="With our delivery partner" title="Arriving today, 11:00–13:00" compactTitle="By 13:00 today" action={<a href="#">Track parcel</a>} className="mt-4" />,
    );
    expect(screen.getByTestId("banner")).toHaveClass("bg-gradient-feature", "mt-4");
    expect(screen.getByText("By 13:00 today")).toHaveClass("md:hidden");
    expect(screen.getByText("Arriving today, 11:00–13:00")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Track parcel" })).toBeInTheDocument();
  });
});
