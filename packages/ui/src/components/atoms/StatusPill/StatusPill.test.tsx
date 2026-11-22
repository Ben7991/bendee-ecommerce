import { render, screen } from "@testing-library/react";

import { StatusPill } from "./StatusPill";

describe("StatusPill", () => {
  it("shows the label (and the compact one for mobile)", () => {
    render(<StatusPill label="Scheduled maintenance · in progress" compactLabel="Maintenance in progress" className="mt-4" />);
    expect(screen.getByText("Scheduled maintenance · in progress")).toBeInTheDocument();
    expect(screen.getByText("Maintenance in progress")).toBeInTheDocument();
    expect(screen.getByText("Maintenance in progress").parentElement).toHaveClass("mt-4");
  });
});
