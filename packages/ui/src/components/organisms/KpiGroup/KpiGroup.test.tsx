import { render, screen } from "@testing-library/react";

import { KpiGroup } from "./KpiGroup";

describe("KpiGroup", () => {
  it("is a named region holding the tiles", () => {
    render(
      <KpiGroup aria-label="Today at a glance" className="mt-4">
        <div>Orders</div>
      </KpiGroup>,
    );
    const region = screen.getByRole("region", { name: "Today at a glance" });
    expect(region).toHaveClass("grid-cols-2", "mt-4");
    expect(region).toHaveTextContent("Orders");
  });
});
