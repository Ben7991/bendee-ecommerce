import { render, screen } from "@testing-library/react";

import { StaffNote } from "./StaffNote";

describe("StaffNote", () => {
  it("quotes the expert and names them", () => {
    render(<StaffNote quote="Start with the greens." author="Efua A." role="Jofak nutritionist" action={<a href="#">Get the 3-pack</a>} className="mt-4" />);
    expect(screen.getByRole("figure")).toHaveClass("mt-4");
    expect(screen.getByText("“Start with the greens.”")).toBeInTheDocument();
    expect(screen.getByText("Efua A. · Jofak nutritionist")).toBeInTheDocument();
    expect(screen.getByText("EA")).toHaveAttribute("aria-hidden");
    expect(screen.getByRole("link", { name: "Get the 3-pack" })).toBeInTheDocument();
  });
});
