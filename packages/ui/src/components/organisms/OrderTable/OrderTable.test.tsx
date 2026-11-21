import { fireEvent, render, screen, within } from "@testing-library/react";

import { OrderTable, type AdminOrder } from "./OrderTable";

const order = (id: string, amount: number, items: number): AdminOrder => ({
  id,
  number: `JFK-${id}`,
  href: `/admin/orders/JFK-${id}`,
  placed: "Today, 08:42",
  customer: "Kwame Asante",
  phone: "024 ••• 4521",
  items,
  amount,
  total: `GHS ${amount.toFixed(2)}`,
  payment: { method: "MTN MoMo", status: "Paid", tone: "paid" },
  status: { label: "To pack", tone: "info" },
  delivery: { method: "Same day", area: "East Legon, Accra" },
});

// Radix Checkbox measures itself inside a form; jsdom has no ResizeObserver.
beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("OrderTable", () => {
  it("lists orders with their payment, status and delivery", () => {
    render(<OrderTable className="mt-4" orders={[order("251482", 412, 3)]} />);
    expect(screen.getByRole("region", { name: "Orders" })).toHaveClass("mt-4");
    const table = screen.getByRole("table");
    expect(within(table).getByRole("link", { name: "JFK-251482" })).toHaveAttribute("href", "/admin/orders/JFK-251482");
    expect(within(table).getByText("To pack")).toHaveClass("bg-tint-info");
    expect(within(table).getByText("East Legon, Accra")).toBeInTheDocument();
  });

  it("shows the bulk bar for selected rows and submits their ids", () => {
    const { container } = render(
      <OrderTable
        orders={[order("1", 412, 3), order("2", 238, 2)]}
        bulkAction="/admin/orders/bulk"
        bulkActions={[{ value: "process", label: "Start processing", primary: true }]}
      />,
    );
    expect(screen.queryByRole("form", { name: "Bulk actions" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("checkbox", { name: "Select order JFK-1" }));
    expect(screen.getByRole("status")).toHaveTextContent("1 selected");
    expect(screen.getByRole("checkbox", { name: "Select all orders on this page" })).toHaveAttribute("aria-checked", "mixed");
    fireEvent.click(screen.getByRole("checkbox", { name: "Select all orders on this page" }));
    expect(screen.getByText("GHS 650.00 · 5 items")).toBeInTheDocument();
    expect(container.querySelectorAll('input[name="order"]')).toHaveLength(2);
    expect(screen.getByRole("button", { name: "Start processing" })).toHaveAttribute("type", "submit");
    fireEvent.click(screen.getAllByRole("button", { name: "Clear selection" })[0]!);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("pages with links and loads more on mobile", () => {
    render(
      <OrderTable
        orders={[order("1", 10, 1)]}
        loadMoreHref="/admin/orders?page=2"
        pagination={{ page: 1, pageCount: 129, range: "1–10", total: "1,284", hrefFor: (page) => `/admin/orders?page=${page}` }}
      />,
    );
    const nav = screen.getByRole("navigation", { name: "Pagination" });
    expect(within(nav).getByText("1", { selector: "[aria-current=page]" })).toBeInTheDocument();
    expect(within(nav).getByRole("link", { name: "Page 129" })).toHaveAttribute("href", "/admin/orders?page=129");
    expect(within(nav).getByRole("link", { name: "Next page" })).toHaveAttribute("href", "/admin/orders?page=2");
    expect(screen.getByRole("link", { name: "Load more orders" })).toHaveAttribute("href", "/admin/orders?page=2");
  });

  it("says when nothing matches", () => {
    render(<OrderTable orders={[]} emptyMessage="No orders match “Kofi”." />);
    expect(screen.getAllByText("No orders match “Kofi”.")).toHaveLength(2);
  });
});
