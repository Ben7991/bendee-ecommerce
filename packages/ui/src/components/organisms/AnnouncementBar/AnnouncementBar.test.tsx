import { render, screen } from "@testing-library/react";

import { AnnouncementBar } from "./AnnouncementBar";

describe("AnnouncementBar", () => {
  it("lists each promise", () => {
    const { container } = render(
      <AnnouncementBar
        className="mt-4"
        items={[
          { icon: "truck", label: "Delivery in Accra within 24h" },
          { icon: "phone", label: "Pay with MoMo or card" },
        ]}
      />,
    );
    expect(screen.getByText("Delivery in Accra within 24h")).toBeInTheDocument();
    expect(screen.getByText("Pay with MoMo or card")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("mt-4");
  });
});
