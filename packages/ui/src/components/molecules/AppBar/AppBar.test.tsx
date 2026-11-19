import { render, screen } from "@testing-library/react";

import { AppBar } from "./AppBar";

describe("AppBar", () => {
  it("renders the title between back and action", () => {
    render(<AppBar title="Addresses" back={<a href="/account">Back</a>} action={<button type="button">Add</button>} className="mt-4" />);
    expect(screen.getByRole("banner")).toHaveClass("mt-4");
    expect(screen.getByText("Addresses")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });
});
