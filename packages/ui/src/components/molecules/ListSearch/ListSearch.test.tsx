import { render, screen } from "@testing-library/react";

import { ListSearch } from "./ListSearch";

describe("ListSearch", () => {
  it("is a GET search form keeping the view, with Filters links", () => {
    render(
      <ListSearch action="/admin/customers" label="Search customers" placeholder="Name, phone or email" defaultQuery="Efua" filtersHref="?filters=1" keep={{ segment: "vip" }} className="mt-4" />,
    );
    const form = screen.getByRole("search");
    expect(form).toHaveAttribute("method", "get");
    expect(form).toHaveClass("mt-4");
    expect(screen.getByRole("searchbox", { name: "Search customers" })).toHaveValue("Efua");
    expect(form.querySelector('input[name="segment"]')).toHaveValue("vip");
    // The icon inside the field (mobile) and the pill (tablet+).
    expect(screen.getAllByRole("link", { name: "Filters" })).toHaveLength(2);
  });

  it("leaves Filters out without a link", () => {
    render(<ListSearch />);
    expect(screen.queryByRole("link", { name: "Filters" })).not.toBeInTheDocument();
  });
});
