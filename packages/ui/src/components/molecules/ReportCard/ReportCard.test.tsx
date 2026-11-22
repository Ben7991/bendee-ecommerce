import { render, screen } from "@testing-library/react";

import { ReportCard } from "./ReportCard";

describe("ReportCard", () => {
  it("shows the title, description, action and content", () => {
    render(<ReportCard title="Top products" description="This period" action={<a href="#all">See all</a>} tone="muted" className="mt-4">Body</ReportCard>);
    expect(screen.getByRole("heading", { name: "Top products" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "See all" })).toBeInTheDocument();
    expect(screen.getByText("Body")).toHaveClass("bg-surface-subtle", "mt-4");
  });
});
