import { render, screen } from "@testing-library/react";

import { CollectionCard } from "./CollectionCard";

describe("CollectionCard", () => {
  it("is one link with the collection's details", () => {
    render(
      <CollectionCard asChild badge="15% off gift sets" meta="Ends Sat 14 Feb" metaTone="deal" description="Wrapped" count="8 products" className="mt-4">
        <a href="/collections/valentines">Valentine&apos;s gift sets</a>
      </CollectionCard>,
    );
    const link = screen.getByRole("link", { name: /Valentine's gift sets/ });
    expect(link).toHaveAttribute("href", "/collections/valentines");
    expect(link).toHaveClass("mt-4");
    expect(screen.getByText("Ends Sat 14 Feb")).toHaveClass("text-error");
    expect(screen.getByText("8 products")).toBeInTheDocument();
    expect(screen.getByText("15% off gift sets")).toBeInTheDocument();
  });
});
