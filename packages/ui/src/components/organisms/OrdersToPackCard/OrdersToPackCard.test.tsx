import { render, screen, within } from "@testing-library/react";

import { OrdersToPackCard } from "./OrdersToPackCard";

const order = {
  number: "JFK-251477",
  href: "/admin/orders/JFK-251477",
  placed: "07:58",
  customer: "Ama Boateng",
  area: "Airport Hills, Accra",
  flag: "2 failed deliveries",
  items: 4,
  payment: { label: "Cash on delivery", tone: "warning" as const },
  delivery: "Same day",
  total: "GHS 596.00",
};

describe("OrdersToPackCard", () => {
  it("lists orders in a table with their payment state and flags", () => {
    render(<OrdersToPackCard className="mt-4" count={9} orders={[order]} viewAllHref="/admin/orders" printHref="/admin/orders/pick-list" />);
    expect(screen.getByRole("region", { name: "Orders to pack" })).toHaveClass("mt-4");
    const table = screen.getByRole("table");
    expect(within(table).getByRole("columnheader", { name: "Customer" })).toBeInTheDocument();
    expect(within(table).getByRole("link", { name: "JFK-251477" })).toHaveAttribute("href", "/admin/orders/JFK-251477");
    expect(within(table).getByText("2 failed deliveries")).toHaveClass("text-error");
    expect(within(table).getByText("Cash on delivery")).toHaveClass("bg-tint-sun");
    expect(screen.getByRole("link", { name: "View all orders" })).toHaveAttribute("href", "/admin/orders");
    expect(screen.getByRole("link", { name: "Print pick list for 9 orders" })).toHaveAttribute("href", "/admin/orders/pick-list");
  });
});
