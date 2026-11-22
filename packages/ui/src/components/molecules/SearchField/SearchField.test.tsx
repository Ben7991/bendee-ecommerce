import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SearchField } from "./SearchField";

describe("SearchField", () => {
  it("is a GET search form with a submit button", () => {
    render(<SearchField defaultValue="stress" submitLabel="Search" className="mt-4" />);
    const form = screen.getByRole("search");
    expect(form).toHaveAttribute("action", "/search");
    expect(form).toHaveAttribute("method", "get");
    expect(form).toHaveClass("mt-4");
    expect(screen.getByRole("searchbox", { name: "Search the shop" })).toHaveValue("stress");
    expect(screen.getByRole("button", { name: "Search" })).toHaveAttribute("type", "submit");
  });

  it("clears the text", async () => {
    const onValueChange = vi.fn();
    render(<SearchField defaultValue="stress" onValueChange={onValueChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Clear search" }));
    expect(screen.getByRole("searchbox")).toHaveValue("");
    expect(screen.getByRole("searchbox")).toHaveFocus();
    expect(onValueChange).toHaveBeenLastCalledWith("");
    expect(screen.queryByRole("button", { name: "Clear search" })).not.toBeInTheDocument();
  });
});
