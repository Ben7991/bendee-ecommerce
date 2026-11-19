import { render, screen } from "@testing-library/react";

import { SectionCard } from "./SectionCard";

describe("SectionCard", () => {
  it("is a region named by its title", () => {
    render(
      <SectionCard title="Your details" description="Shown on receipts" action={<a href="#edit">Edit</a>} className="mt-4">
        <p>Rows</p>
      </SectionCard>,
    );
    const region = screen.getByRole("region", { name: "Your details" });
    expect(region).toHaveClass("mt-4", "p-4.5");
    expect(screen.getByText("Shown on receipts")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Edit" })).toBeInTheDocument();
  });

  it("drops the padding when flush", () => {
    render(<SectionCard title="Order updates" flush />);
    expect(screen.getByRole("region", { name: "Order updates" })).not.toHaveClass("p-4.5");
  });
});
