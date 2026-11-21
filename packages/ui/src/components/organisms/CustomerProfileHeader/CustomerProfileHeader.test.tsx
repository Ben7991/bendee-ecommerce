import { render, screen } from "@testing-library/react";

import { CustomerProfileHeader } from "./CustomerProfileHeader";

describe("CustomerProfileHeader", () => {
  it("names the customer with back and Add note links", () => {
    render(
      <CustomerProfileHeader
        backHref="/admin/customers"
        name="Efua Boateng"
        tag={{ label: "VIP", tone: "accent" }}
        meta="Customer since 4 Mar 2025"
        compactMeta="Since 4 Mar 2025"
        addNoteHref="#notes"
        more={<button type="button">More</button>}
        className="mt-4"
      />,
    );
    expect(screen.getByRole("heading", { level: 1, name: "Efua Boateng" })).toBeInTheDocument();
    expect(screen.getByRole("banner")).toHaveClass("mt-4");
    expect(screen.getByRole("link", { name: "Customers" })).toHaveAttribute("href", "/admin/customers");
    expect(screen.getByRole("link", { name: "Add note" })).toHaveAttribute("href", "#notes");
    expect(screen.getByText("VIP")).toBeInTheDocument();
    expect(screen.getByText("EB")).toBeInTheDocument();
    // The menu renders for mobile and for tablet+.
    expect(screen.getAllByRole("button", { name: "More" })).toHaveLength(2);
  });
});
