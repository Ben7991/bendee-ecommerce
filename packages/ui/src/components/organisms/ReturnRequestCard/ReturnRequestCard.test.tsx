import { render, screen } from "@testing-library/react";

import { ReturnRequestCard } from "./ReturnRequestCard";

describe("ReturnRequestCard", () => {
  it("shows the item, reason, the customer's words and photo links", () => {
    render(
      <ReturnRequestCard
        className="mt-4"
        item={{ name: "Magnesium Sleep · Gummies", detail: "Paid GHS 80" }}
        reason={{ label: "Damaged", tone: "error" }}
        quote="The lid was cracked."
        photos={[{ image: null, href: "/p/1.jpg" }]}
        wants="Refund to MoMo"
      />,
    );
    expect(screen.getByRole("region", { name: "What the customer is returning" })).toHaveClass("mt-4");
    expect(screen.getByText("Damaged")).toBeInTheDocument();
    expect(screen.getAllByText("“The lid was cracked.”")).toHaveLength(2);
    expect(screen.getAllByRole("link", { name: "Photo 1 of 1, opens full size" })[0]).toHaveAttribute("href", "/p/1.jpg");
    expect(screen.getByText("Refund to MoMo")).toBeInTheDocument();
  });
});
