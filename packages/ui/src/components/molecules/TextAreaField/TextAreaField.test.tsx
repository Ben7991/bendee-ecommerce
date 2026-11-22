import { render, screen } from "@testing-library/react";

import { TextAreaField } from "./TextAreaField";

describe("TextAreaField", () => {
  it("is a labelled textarea", () => {
    const { container } = render(<TextAreaField label="Delivery note" name="note" className="mt-4" />);
    expect(screen.getByRole("textbox", { name: "Delivery note" })).toHaveAttribute("name", "note");
    expect(container.firstChild).toHaveClass("mt-4");
  });
});
