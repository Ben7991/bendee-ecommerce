import { render, screen } from "@testing-library/react";

import { SupplementFacts } from "./SupplementFacts";

describe("SupplementFacts", () => {
  it("renders the facts as a table", () => {
    render(
      <SupplementFacts
        serving="1 scoop"
        rows={[
          { name: "Vitamin C", amount: "60 mg", dailyValue: "67%" },
          { name: "Probiotics", amount: "7 billion CFU", dailyValue: "†" },
        ]}
        footnote="† Not established."
        className="mt-4"
      />,
    );
    expect(screen.getByRole("heading", { name: "Supplement Facts" })).toBeInTheDocument();
    expect(screen.getByRole("rowheader", { name: "Vitamin C 60 mg" })).toBeInTheDocument();
    expect(screen.getByRole("row", { name: /Vitamin C/ })).toHaveTextContent("67%");
    expect(screen.getByRole("table").closest("[data-slot=supplement-facts]")).toHaveClass("mt-4");
  });
});
