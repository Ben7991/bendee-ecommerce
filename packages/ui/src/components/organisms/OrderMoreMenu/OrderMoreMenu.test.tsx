import { fireEvent, render, screen } from "@testing-library/react";

import { OrderMoreMenu } from "./OrderMoreMenu";

describe("OrderMoreMenu", () => {
  it("opens a list of links", () => {
    render(<OrderMoreMenu className="mt-4" items={[{ label: "Print invoice", href: "/invoice", icon: "receipt" }]} />);
    fireEvent.click(screen.getByRole("button", { name: "More actions" }));
    expect(screen.getByRole("link", { name: "Print invoice" })).toHaveAttribute("href", "/invoice");
    expect(screen.getByRole("dialog")).toHaveClass("mt-4");
  });
});
