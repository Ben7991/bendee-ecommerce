import { fireEvent, render, screen } from "@testing-library/react";

import { FilterBar } from "./FilterBar";

describe("FilterBar", () => {
  it("searches and sorts in one GET form, keeping the view", () => {
    const { container } = render(
      <FilterBar
        className="mt-4"
        action="/admin/orders"
        searchLabel="Search orders"
        placeholder="Order no., phone, name or email"
        defaultQuery="Ama"
        keep={{ view: "to-pack" }}
        sort={{ defaultValue: "newest", options: [{ value: "newest", label: "Newest" }, { value: "oldest", label: "Oldest" }] }}
      >
        <button type="button">Status</button>
      </FilterBar>,
    );
    const form = screen.getByRole("search");
    expect(form).toHaveAttribute("method", "get");
    expect(form).toHaveClass("mt-4");
    expect(screen.getByRole("searchbox", { name: "Search orders" })).toHaveValue("Ama");
    expect(screen.getByRole("combobox", { name: /Sort by/ })).toHaveValue("newest");
    expect(container.querySelector('input[type=hidden][name=view]')).toHaveValue("to-pack");
    expect(container.querySelectorAll(`input[name=q]`)).toHaveLength(1);
  });

  it("folds the filters behind a button on mobile", () => {
    render(
      <FilterBar appliedCount={1}>
        <button type="button">Status</button>
      </FilterBar>,
    );
    const toggle = screen.getByRole("button", { name: "Filters, 1 applied" });
    const panel = document.getElementById(toggle.getAttribute("aria-controls")!)!;
    expect(panel).toHaveClass("hidden");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(panel).toHaveClass("flex");
  });
});
