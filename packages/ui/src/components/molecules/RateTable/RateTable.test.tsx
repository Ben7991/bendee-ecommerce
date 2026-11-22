import { render, screen, within } from "@testing-library/react";

import { RateTable } from "./RateTable";

describe("RateTable", () => {
  it("renders a captioned table with area row headers", () => {
    render(
      <RateTable
        caption="Delivery fees"
        className="mt-4"
        rows={[
          { area: "Kumasi", fee: "GHS 45", arrives: "2–3 days" },
          { area: "Store pickup", fee: "Free", arrives: "Same day", free: true },
        ]}
      />,
    );
    const table = screen.getByRole("table", { name: "Delivery fees" });
    expect(table.parentElement).toHaveClass("mt-4");
    expect(screen.getAllByRole("columnheader").map((th) => th.textContent)).toEqual(["Area", "Fee", "Arrives"]);
    const pickup = screen.getByRole("rowheader", { name: "Store pickup" }).closest("tr")!;
    expect(within(pickup).getByText("Free")).toHaveClass("text-success");
  });
});
