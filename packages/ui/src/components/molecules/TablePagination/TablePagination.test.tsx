import { render, screen } from "@testing-library/react";

import { TablePagination } from "./TablePagination";

describe("TablePagination", () => {
  it("links the pages around the current one", () => {
    render(<TablePagination className="mt-4" page={1} pageCount={129} range="1–10" total="1,284" hrefFor={(page) => `?page=${page}`} />);
    const nav = screen.getByRole("navigation", { name: "Pagination" });
    expect(nav).toHaveClass("mt-4");
    expect(screen.getByText("1", { selector: "[aria-current=page]" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Page 3" })).toHaveAttribute("href", "?page=3");
    expect(screen.getByRole("link", { name: "Page 129" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Previous page" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Next page" })).toHaveAttribute("href", "?page=2");
  });
});
