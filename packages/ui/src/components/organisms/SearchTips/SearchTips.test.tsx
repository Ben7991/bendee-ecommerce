import { render, screen } from "@testing-library/react";

import { SearchTips } from "./SearchTips";

describe("SearchTips", () => {
  it("renders the tip cards and the compact list", () => {
    render(
      <SearchTips
        className="mt-4"
        tips={[{ icon: "searchTip", title: "Search tips", text: "Check the spelling.", action: <a href="/quiz">Take the quiz</a> }]}
        compactTips={["Use fewer words"]}
      />,
    );
    expect(screen.getByRole("region", { name: "Search tips" })).toHaveClass("mt-4");
    expect(screen.getByRole("heading", { name: "Search tips" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Try this" })).toBeInTheDocument();
    expect(screen.getByText("Use fewer words")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Take the quiz" })).toBeInTheDocument();
  });
});
