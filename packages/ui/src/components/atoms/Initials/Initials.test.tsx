import { render, screen } from "@testing-library/react";

import { Initials, initialsOf } from "./Initials";

describe("Initials", () => {
  it("shows up to two initials, hidden from assistive tech", () => {
    render(<Initials name="Ama Akosua Mensah" size="lg" className="mt-4" />);
    const disc = screen.getByText("AA");
    expect(disc).toHaveAttribute("aria-hidden", "true");
    expect(disc).toHaveClass("size-15", "mt-4");
    expect(initialsOf("ama mensah")).toBe("AM");
  });
});
