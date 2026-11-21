import { render, screen } from "@testing-library/react";

import { ReturnTable, type AdminReturn } from "./ReturnTable";

const base: AdminReturn = {
  id: "RTN-0418",
  href: "/admin/returns/RTN-0418",
  age: "2h ago",
  attention: true,
  customer: { name: "Efua Boateng" },
  order: { number: "JFK-251455", href: "/admin/orders/JFK-251455" },
  item: { name: "Magnesium Sleep", quantity: 1 },
  reason: { label: "Damaged", tone: "error" },
  photos: 2,
  wants: "Refund",
  value: "GHS 80",
  status: { label: "Requested", tone: "warning" },
  next: { label: "Review", href: "/admin/returns/RTN-0418", primary: true },
};

describe("ReturnTable", () => {
  it("links reviews and posts one-click steps", () => {
    render(
      <ReturnTable
        className="mt-4"
        action="/act"
        returns={[base, { ...base, id: "RTN-0415", attention: false, next: { label: "Received", intent: "received" } }]}
      />,
    );
    expect(screen.getByRole("region", { name: "Returns" })).toHaveClass("mt-4");
    expect(screen.getAllByRole("link", { name: "Review RTN-0418" })[0]).toHaveAttribute("href", "/admin/returns/RTN-0418");
    const received = screen.getAllByRole("button", { name: "Received RTN-0415" })[0]!;
    expect(received).toHaveAttribute("value", "received");
    expect(received.closest("form")?.querySelector('input[name="return"]')).toHaveValue("RTN-0415");
    expect(screen.getByText("Needs a decision")).toBeInTheDocument();
  });

  it("says when empty", () => {
    render(<ReturnTable returns={[]} emptyMessage="No open returns." />);
    expect(screen.getByText("No open returns.")).toBeInTheDocument();
  });
});
