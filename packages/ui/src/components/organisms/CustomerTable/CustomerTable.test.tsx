import { render, screen, within } from "@testing-library/react";

import { CustomerTable, type AdminCustomer } from "./CustomerTable";

const customers: AdminCustomer[] = [
  { id: "1", name: "Efua Boateng", href: "/c/efua", phone: "024 ••• 4521", location: "Osu, Accra", tags: [{ label: "VIP", tone: "accent" }], orders: 14, spent: "GHS 3,940", lastOrder: "Today, 09:40", compactLastOrder: "Today", marketing: ["SMS"] },
  { id: "2", name: "Abena Owusu-Ansah", href: "/c/abena", phone: "026 ••• 5104", location: "Cape Coast", tags: [], orders: 1, spent: "GHS 520", lastOrder: "2 Aug", inactiveDays: 105, marketing: [] },
];

describe("CustomerTable", () => {
  it("links each customer and pages", () => {
    render(<CustomerTable customers={customers} range="1–2" total="2" nextHref="?page=2" className="mt-4" />);
    const region = screen.getByRole("region", { name: "Customers" });
    expect(region).toHaveClass("mt-4");
    // Desktop table, tablet table and mobile list each link the customer.
    expect(screen.getAllByRole("link", { name: "Efua Boateng" })[0]).toHaveAttribute("href", "/c/efua");
    expect(screen.getByText("105 days ago")).toBeInTheDocument();
    expect(screen.getByText("1 order · inactive 105 days")).toBeInTheDocument();
    expect(screen.getByText("14 orders · last today")).toBeInTheDocument();
    expect(within(screen.getByRole("navigation", { name: "Pagination" })).getByRole("link", { name: "Next" })).toHaveAttribute("href", "?page=2");
  });

  it("shows a message when empty", () => {
    render(<CustomerTable customers={[]} range="0" total="0" emptyMessage="No customers match “zz”." />);
    expect(screen.getByText("No customers match “zz”.")).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });
});
