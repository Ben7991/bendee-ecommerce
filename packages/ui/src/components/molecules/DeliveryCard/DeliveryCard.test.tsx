import { render, screen } from "@testing-library/react";

import { DeliveryCard } from "./DeliveryCard";

describe("DeliveryCard", () => {
  it("shows location, detail and the action", () => {
    const { container } = render(
      <DeliveryCard location="Accra · East Legon" detail="Arrives tomorrow" action={<a href="/x">Change</a>} className="mt-4" />,
    );
    expect(screen.getByText("Accra · East Legon")).toBeInTheDocument();
    expect(screen.getByText("Arrives tomorrow")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Change" })).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("mt-4");
  });
});
