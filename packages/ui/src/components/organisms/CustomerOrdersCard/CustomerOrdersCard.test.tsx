import { render, screen } from "@testing-library/react";

import { CustomerOrdersCard } from "./CustomerOrdersCard";

const order = (number: string) => ({ number, href: `/o/${number}`, items: "Greens Daily", status: { label: "Delivered", tone: "success" as const }, date: "1 Nov", total: "GHS 345" });

describe("CustomerOrdersCard", () => {
  it("links orders and View all, hiding extra orders on mobile", () => {
    render(<CustomerOrdersCard orders={[order("A1"), order("A2")]} mobileLimit={1} viewAll={{ label: "View all 14", href: "/o" }} className="mt-4" />);
    expect(screen.getByRole("region", { name: "Orders" })).toHaveClass("mt-4");
    expect(screen.getByRole("link", { name: "A1" })).toHaveAttribute("href", "/o/A1");
    expect(screen.getByRole("link", { name: "A2" }).closest("li")).toHaveClass("hidden", "md:flex");
    expect(screen.getByRole("link", { name: "View all 14" })).toHaveAttribute("href", "/o");
  });

  it("says when there are no orders", () => {
    render(<CustomerOrdersCard orders={[]} />);
    expect(screen.getByText("No orders yet.")).toBeInTheDocument();
  });
});
