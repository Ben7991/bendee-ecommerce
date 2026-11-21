import { fireEvent, render, screen } from "@testing-library/react";

import { ProductStatusCard } from "./ProductStatusCard";

beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("ProductStatusCard", () => {
  it("switches status and explains it", () => {
    render(<ProductStatusCard className="mt-4" status="active" scheduleHref="/schedule" />);
    expect(screen.getByRole("region", { name: "Status" })).toHaveClass("mt-4");
    expect(screen.getByText("Visible on the store and in search.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("radio", { name: "Draft" }));
    expect(screen.getByText("Hidden from the store until you set it active.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Schedule a change" })).toHaveAttribute("href", "/schedule");
  });
});
