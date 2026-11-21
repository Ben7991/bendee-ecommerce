import { render, screen } from "@testing-library/react";

import { DiscountTable } from "./DiscountTable";
import { sampleDiscounts } from "./fixtures";

describe("DiscountTable", () => {
  it("links each discount to its editor", () => {
    render(<DiscountTable discounts={sampleDiscounts} />);
    const links = screen.getAllByRole("link");
    expect(links.map((link) => link.getAttribute("href"))).toContain("/admin/discounts/GREENS20");
    expect(screen.getAllByText("GREENS20").length).toBeGreaterThan(0);
    expect(screen.getByText("Automatic · no code needed")).toHaveClass("text-lavender-text");
  });

  it("shows limited uses as a bar and leads mobile with the ending-soon discount", () => {
    render(<DiscountTable discounts={sampleDiscounts} extend={(discount) => <button type="button">Extend {discount.title}</button>} />);
    expect(screen.getAllByRole("progressbar", { name: "GREENS20 uses" }).length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: "Extend VIPTHANKS" })).toBeInTheDocument();
    expect(screen.getByText("Ends 18 Nov · 3 days left")).toHaveClass("text-warning-text");
  });

  it("shows the empty message and merges className", () => {
    const { container } = render(<DiscountTable discounts={[]} emptyMessage="Nothing yet" className="mt-4" />);
    expect(screen.getByText("Nothing yet")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("mt-4");
  });
});
