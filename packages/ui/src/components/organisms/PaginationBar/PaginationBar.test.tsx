import { render, screen, within } from "@testing-library/react";

import { PaginationBar } from "./PaginationBar";

const hrefFor = (page: number) => `/shop?page=${page}`;

describe("PaginationBar", () => {
  it("links to the other pages and disables Previous on page 1", () => {
    render(<PaginationBar page={1} pageCount={2} hrefFor={hrefFor} className="mt-4" />);
    const nav = screen.getByRole("navigation", { name: "Pagination" });
    expect(nav).toHaveClass("mt-4");
    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
    expect(within(nav).getByText("Page 1, current page").closest("[aria-current=page]")).not.toBeNull();
    expect(screen.getByRole("link", { name: "Page 2" })).toHaveAttribute("href", "/shop?page=2");
    expect(screen.getByRole("link", { name: "Next page" })).toHaveAttribute("href", "/shop?page=2");
    expect(screen.queryByRole("link", { name: "Previous page" })).not.toBeInTheDocument();
  });

  it("collapses long ranges", () => {
    render(<PaginationBar page={6} pageCount={12} hrefFor={hrefFor} />);
    const links = screen.getAllByRole("link", { name: /^Page \d+$/ }).map((link) => link.textContent);
    expect(links).toEqual(["1", "5", "7", "12"]);
    expect(screen.getAllByText("…")).toHaveLength(2);
  });
});
