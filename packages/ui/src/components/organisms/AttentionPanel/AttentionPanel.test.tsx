import { render, screen } from "@testing-library/react";

import { AttentionPanel } from "./AttentionPanel";

describe("AttentionPanel", () => {
  it("titles the queues and says when they were updated", () => {
    render(
      <AttentionPanel meta="Updated 2 min ago" className="mt-4">
        <a href="/admin/orders">9 Orders to pack</a>
      </AttentionPanel>,
    );
    const region = screen.getByRole("region", { name: "Needs your attention" });
    expect(region).toHaveClass("mt-4");
    expect(screen.getByText("Updated 2 min ago")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "9 Orders to pack" })).toBeInTheDocument();
  });
});
