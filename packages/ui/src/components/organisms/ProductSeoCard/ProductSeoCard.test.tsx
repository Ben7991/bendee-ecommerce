import { fireEvent, render, screen } from "@testing-library/react";

import { ProductSeoCard } from "./ProductSeoCard";

describe("ProductSeoCard", () => {
  it("previews the result and counts characters", () => {
    render(<ProductSeoCard className="mt-4" title="Energy B-Complex" slug="energy-b-complex" description="Short." />);
    expect(screen.getByRole("region", { name: "Search and sharing" })).toHaveClass("mt-4");
    // The count includes the " | Jofak Ghana" suffix search results show.
    expect(screen.getByText("30 / 60")).toHaveClass("text-brand");
    fireEvent.change(screen.getByRole("textbox", { name: "Page title" }), { target: { value: "x".repeat(61) } });
    expect(screen.getByText("75 / 60")).toHaveClass("text-error");
    expect(screen.getByText(`${"x".repeat(61)} | Jofak Ghana`)).toBeInTheDocument();
    expect(screen.getByText("jofak.com › products › energy-b-complex")).toBeInTheDocument();
  });
});
