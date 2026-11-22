import { render, screen } from "@testing-library/react";

import { ActionRow } from "./ActionRow";

describe("ActionRow", () => {
  it("is a button with its tone", () => {
    render(
      <ActionRow icon="closeCircle" tone="danger" className="mt-4">
        Cancel order
      </ActionRow>,
    );
    const button = screen.getByRole("button", { name: "Cancel order" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass("text-error", "mt-4");
  });

  it("can be a link", () => {
    render(
      <ActionRow asChild icon="printer">
        <a href="/admin/orders/JFK-1/invoice">Print invoice</a>
      </ActionRow>,
    );
    expect(screen.getByRole("link", { name: "Print invoice" })).toHaveAttribute("href", "/admin/orders/JFK-1/invoice");
  });
});
