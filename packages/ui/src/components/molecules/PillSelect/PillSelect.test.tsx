import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { PillSelect } from "./PillSelect";

const options = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
];

describe("PillSelect", () => {
  it("shows the chosen option and reports changes", async () => {
    const onValueChange = vi.fn();
    render(<PillSelect label="Sort products" prefix="Sort:" options={options} onValueChange={onValueChange} className="mt-4" />);
    const select = screen.getByRole("combobox", { name: "Sort products" });
    expect(select.closest("[data-slot=pill-select]")).toHaveClass("mt-4");
    expect(screen.getByText("Featured", { selector: "span" })).toBeInTheDocument();

    await userEvent.selectOptions(select, "newest");
    expect(onValueChange).toHaveBeenCalledWith("newest");
    expect(screen.getByText("Newest", { selector: "span" })).toBeInTheDocument();
  });
});
