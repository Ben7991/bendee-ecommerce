import { render, screen } from "@testing-library/react";

import { MovementTable } from "./MovementTable";

describe("MovementTable", () => {
  it("groups movements by day, signs changes and links references", () => {
    render(
      <MovementTable
        className="mt-4"
        summary="Showing 2 of 214"
        loadMoreHref="?page=2"
        days={[
          {
            label: "Today · Sun 15 Nov",
            movements: [
              { id: "1", time: "11:42", name: "Ashwagandha Calm · 60 caps", change: 48, type: { label: "Received", tone: "success" }, before: 2, after: 50, reference: { label: "Invoice ANS-3381" }, by: "Abena M." },
              { id: "2", time: "10:15", name: "Greens Daily", change: -3, type: { label: "Damaged", tone: "error" }, before: 130, after: 127, reference: { label: "Order JFK-251490", href: "/admin/orders/JFK-251490" }, by: "Abena M." },
            ],
          },
        ]}
      />,
    );
    expect(screen.getByRole("region", { name: "Stock movements" })).toHaveClass("mt-4");
    expect(screen.getByRole("rowheader", { name: "Today · Sun 15 Nov" })).toBeInTheDocument();
    expect(screen.getAllByText("+48")[0]).toHaveClass("text-brand");
    expect(screen.getAllByText("−3")[0]).toHaveClass("text-error");
    expect(screen.getAllByRole("link", { name: "Order JFK-251490" })[0]).toHaveAttribute("href", "/admin/orders/JFK-251490");
    expect(screen.getByRole("link", { name: "Load more" })).toHaveAttribute("href", "?page=2");
  });

  it("says when there's nothing", () => {
    render(<MovementTable days={[]} />);
    expect(screen.getByText("No stock movements in this period.")).toBeInTheDocument();
  });
});
