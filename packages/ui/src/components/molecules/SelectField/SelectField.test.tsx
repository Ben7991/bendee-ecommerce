import { render, screen } from "@testing-library/react";

import { SelectField } from "./SelectField";

describe("SelectField", () => {
  it("is a labelled select with its options", () => {
    const { container } = render(
      <SelectField label="Region" defaultValue="b" className="mt-4" options={[{ value: "a", label: "Ashanti" }, { value: "b", label: "Greater Accra" }]} />,
    );
    const select = screen.getByRole("combobox", { name: "Region" });
    expect(select).toHaveValue("b");
    expect(screen.getAllByRole("option")).toHaveLength(2);
    expect(container.firstChild).toHaveClass("mt-4");
  });
});
