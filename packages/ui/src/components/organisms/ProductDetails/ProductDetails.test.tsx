import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ProductDetails } from "./ProductDetails";

describe("ProductDetails", () => {
  it("opens the default section and toggles others", async () => {
    render(
      <ProductDetails
        className="mt-4"
        aside={<p>Facts</p>}
        sections={[
          {
            id: "description",
            title: "Description",
            defaultOpen: true,
            content: <p>Greens.</p>,
          },
          { id: "how", title: "How to use", content: <p>One scoop.</p> },
        ]}
      />,
    );
    const region = screen.getByRole("region", { name: "Product details" });
    expect(region).toHaveClass("mt-4");
    expect(screen.getByText("Description").closest("details")).toHaveAttribute("open");
    const how = screen.getByText("How to use").closest("details")!;
    expect(how).not.toHaveAttribute("open");
    await userEvent.click(screen.getByText("How to use"));
    expect(how).toHaveAttribute("open");
    expect(screen.getByText("Facts")).toBeInTheDocument();
  });
});
