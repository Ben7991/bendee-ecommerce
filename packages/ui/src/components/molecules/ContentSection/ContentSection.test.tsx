import { render, screen } from "@testing-library/react";

import { ContentSection } from "./ContentSection";

describe("ContentSection", () => {
  it("is a region named by its heading", () => {
    render(
      <ContentSection title="Returns and refunds" className="mt-4">
        <p>Unopened and sealed only.</p>
      </ContentSection>,
    );
    const region = screen.getByRole("region", { name: "Returns and refunds" });
    expect(region).toHaveClass("mt-4");
    expect(screen.getByRole("heading", { level: 2, name: "Returns and refunds" })).toBeInTheDocument();
    expect(screen.getByText("Unopened and sealed only.")).toBeInTheDocument();
  });

  it("uses the clause heading at size md", () => {
    render(<ContentSection size="md" title="1. Who we are" />);
    expect(screen.getByRole("heading", { name: "1. Who we are" })).toHaveClass("font-semibold");
  });
});
