import { fireEvent, render, screen } from "@testing-library/react";

import { SEO_ARGS } from "./data";
import { SeoTemplateEditor } from "./SeoTemplateEditor";

describe("SeoTemplateEditor", () => {
  it("fills the Google preview from the sample", () => {
    render(<SeoTemplateEditor {...SEO_ARGS} />);
    expect(screen.getByText("Greens Daily · 30 servings – Asaase Botanicals | Jofak")).toBeInTheDocument();
    expect(screen.getByText("Greens Daily · 30 servings – Asaase Botanicals")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Products" })[0]).toHaveAttribute("aria-current", "page");
  });

  it("warns when the title runs over 60 characters", () => {
    render(<SeoTemplateEditor {...SEO_ARGS} />);
    fireEvent.change(screen.getByLabelText("Page title"), { target: { value: "x".repeat(70) } });
    expect(screen.getByText("70 characters · over 60")).toBeInTheDocument();
  });
});
