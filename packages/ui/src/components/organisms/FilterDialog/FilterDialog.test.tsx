import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { FilterDialog } from "./FilterDialog";

describe("FilterDialog", () => {
  it("opens from the Filters button and closes on submit", async () => {
    const onSubmit = vi.fn();
    const onClear = vi.fn();
    render(
      <FilterDialog
        appliedCount={2}
        summary="2 applied · 41 results"
        submitLabel="Show 41 results"
        onSubmit={onSubmit}
        onClear={onClear}
        className="mt-4"
      >
        <p>Facets</p>
      </FilterDialog>,
    );
    const trigger = screen.getByRole("button", { name: "Filters, 2 applied" });
    expect(trigger).toHaveClass("mt-4");
    await userEvent.click(trigger);

    const dialog = screen.getByRole("dialog", { name: "Filters" });
    expect(dialog).toHaveTextContent("Facets");
    await userEvent.click(screen.getByRole("button", { name: "Clear all" }));
    expect(onClear).toHaveBeenCalledOnce();

    await userEvent.click(screen.getByRole("button", { name: "Show 41 results" }));
    expect(onSubmit).toHaveBeenCalledOnce();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes from the close button", async () => {
    render(
      <FilterDialog submitLabel="Show results">
        <p>Facets</p>
      </FilterDialog>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Filters" }));
    await userEvent.click(screen.getByRole("button", { name: "Close filters" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
