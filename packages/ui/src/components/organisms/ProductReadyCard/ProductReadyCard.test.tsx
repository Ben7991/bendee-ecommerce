import { render, screen } from "@testing-library/react";

import { ProductReadyCard } from "./ProductReadyCard";

describe("ProductReadyCard", () => {
  it("counts passed checks and says when it isn't ready", () => {
    const { rerender } = render(<ProductReadyCard className="mt-4" checks={[{ label: "At least one image", done: true }]} />);
    expect(screen.getByRole("region", { name: "Ready to sell" })).toHaveClass("bg-sage-50", "mt-4");
    expect(screen.getByText("1 of 1")).toBeInTheDocument();
    rerender(<ProductReadyCard checks={[{ label: "At least one image", done: false }, { label: "Description written", done: true }]} />);
    expect(screen.getByRole("region", { name: "Not ready to sell" })).toHaveClass("bg-tint-sun");
    expect(screen.getByText("1 of 2")).toBeInTheDocument();
  });
});
