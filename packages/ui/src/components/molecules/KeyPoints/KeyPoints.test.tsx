import { render, screen } from "@testing-library/react";

import { KeyPoints } from "./KeyPoints";

describe("KeyPoints", () => {
  it("is a titled region with its points", () => {
    render(<KeyPoints title="Key points" items={["Prices include VAT", "14-day returns"]} className="mt-4" />);
    const region = screen.getByRole("region", { name: "Key points" });
    expect(region).toHaveClass("mt-4");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
