import { render, screen } from "@testing-library/react";

import { InfoCard } from "./InfoCard";

describe("InfoCard", () => {
  it("renders icon, title and text", () => {
    const { container } = render(
      <InfoCard icon="truck" title="Already placed an order?" className="mt-4">
        It&apos;s on its way.
      </InfoCard>,
    );
    expect(screen.getByText("Already placed an order?")).toBeInTheDocument();
    expect(screen.getByText("It's on its way.")).toBeInTheDocument();
    expect(container.querySelector('[data-icon="truck"]')).not.toBeNull();
    expect(container.firstChild).toHaveClass("mt-4");
  });
});
