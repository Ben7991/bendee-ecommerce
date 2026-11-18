import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ProductGallery } from "./ProductGallery";

const items = [
  { id: "front", label: "Front of the tub", image: <span>Front image</span> },
  { id: "back", label: "Back of the tub", image: <span>Back image</span> },
  {
    id: "howto",
    label: "How to use",
    kind: "howto" as const,
    caption: "One scoop a day.",
  },
];

describe("ProductGallery", () => {
  beforeAll(() => {
    Element.prototype.scrollTo = () => {};
  });

  it("renders every view as a slide with thumbnails", () => {
    render(<ProductGallery label="Greens images" items={items} badges={[{ label: "Bestseller", variant: "solid" }]} className="mt-4" />);
    const gallery = screen.getByRole("region", { name: "Greens images" });
    expect(gallery).toHaveClass("mt-4");
    expect(screen.getAllByRole("group")).toHaveLength(3);
    expect(screen.getByRole("group", { name: "3 of 3: How to use" })).toHaveTextContent("One scoop a day.");
    expect(screen.getAllByText("Bestseller").length).toBeGreaterThan(0);
  });

  it("selects a view from its thumbnail", async () => {
    render(<ProductGallery label="Greens images" items={items} />);
    const thumb = screen.getByRole("button", { name: "Show Back of the tub" });
    await userEvent.click(thumb);
    expect(thumb).toHaveAttribute("aria-current", "true");
  });

  it("opens the current view in the zoom dialog", async () => {
    render(<ProductGallery label="Greens images" items={items} />);
    await userEvent.click(screen.getByRole("button", { name: "Zoom image" }));
    expect(screen.getByRole("dialog", { name: "Front of the tub" })).toHaveTextContent("Front image");
    await userEvent.click(screen.getByRole("button", { name: "Close zoom" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
