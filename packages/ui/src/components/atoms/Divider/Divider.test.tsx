import { render, screen } from "@testing-library/react";

import { Divider } from "./Divider";

describe("Divider", () => {
  it("is a separator without a label", () => {
    render(<Divider />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("shows its label", () => {
    render(<Divider label="OR" className="mt-4" />);
    expect(screen.getByText("OR")).toBeInTheDocument();
    expect(screen.queryByRole("separator")).not.toBeInTheDocument();
  });
});
