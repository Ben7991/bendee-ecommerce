import { render, screen } from "@testing-library/react";

import { DefinitionTable } from "./DefinitionTable";

describe("DefinitionTable", () => {
  it("pairs each term with its description", () => {
    render(
      <DefinitionTable
        className="mt-4"
        items={[
          { term: "Contact details", description: "Name and phone" },
          { term: "Browsing", description: "Pages viewed" },
        ]}
      />,
    );
    expect(screen.getAllByRole("term").map((dt) => dt.textContent)).toEqual(["Contact details", "Browsing"]);
    expect(screen.getAllByRole("definition").map((dd) => dd.textContent)).toEqual(["Name and phone", "Pages viewed"]);
    expect(screen.getByText("Contact details").closest("dl")).toHaveClass("mt-4");
  });
});
