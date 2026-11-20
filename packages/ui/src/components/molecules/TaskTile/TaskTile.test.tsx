import { render, screen } from "@testing-library/react";

import { TaskTile } from "./TaskTile";

describe("TaskTile", () => {
  it("is one link named by its figure and label", () => {
    render(<TaskTile href="/admin/orders" icon="box" value="9" label="Orders to pack" className="mt-4" />);
    const link = screen.getByRole("link", { name: /9\s*Orders to pack/ });
    expect(link).toHaveAttribute("href", "/admin/orders");
    expect(link).toHaveClass("bg-surface-subtle", "mt-4");
  });

  it("renders the router link passed with asChild", () => {
    render(
      <TaskTile asChild tone="citrus" icon="card" value="3" label="Failed payments">
        <a href="/admin/payments" data-router />
      </TaskTile>,
    );
    const link = screen.getByRole("link", { name: /3\s*Failed payments/ });
    expect(link).toHaveAttribute("data-router");
    expect(link).toHaveClass("bg-tint-citrus");
  });
});
