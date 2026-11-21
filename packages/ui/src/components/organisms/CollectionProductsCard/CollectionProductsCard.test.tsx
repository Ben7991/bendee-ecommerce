import { fireEvent, render, screen } from "@testing-library/react";

import { CollectionProductsCard } from "./CollectionProductsCard";

beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

const products = [
  { id: "grn", name: "Greens Daily", tags: ["skin"], category: "Collagen", price: 140, onSale: false, addedDaysAgo: 10 },
  { id: "ash", name: "Ashwagandha", tags: ["calm"], category: "Sleep", price: 116, onSale: true, addedDaysAgo: 90 },
];

describe("CollectionProductsCard", () => {
  it("edits rules, counts matches and posts them as JSON", () => {
    const { container } = render(<CollectionProductsCard className="mt-4" products={products} categories={["Collagen", "Sleep"]} defaultRules={[{ field: "tag", value: ["skin"] }]} />);
    expect(screen.getByRole("region", { name: "Products" })).toHaveClass("mt-4");
    expect(screen.getByText(/1 match/)).toBeInTheDocument();

    const tag = screen.getByRole("textbox", { name: "Add a tag" });
    fireEvent.change(tag, { target: { value: "calm" } });
    fireEvent.keyDown(tag, { key: "Enter" });
    expect(screen.getByText(/2 match/)).toBeInTheDocument();
    expect(JSON.parse(container.querySelector<HTMLInputElement>('input[name="rules"]')!.value)).toEqual([{ field: "tag", value: ["skin", "calm"] }]);

    fireEvent.click(screen.getByRole("button", { name: "Remove tag skin" }));
    fireEvent.click(screen.getByRole("button", { name: "Add rule" }));
    expect(screen.getAllByRole("combobox", { name: /Rule \d field/ })).toHaveLength(2);
  });

  it("picks products by hand", () => {
    const { container } = render(<CollectionProductsCard products={products} categories={[]} defaultMode="manual" defaultPicked={["grn"]} />);
    expect(screen.getByText(/1 of 2 picked/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("checkbox", { name: "Ashwagandha" }));
    expect([...container.querySelectorAll<HTMLInputElement>('input[name="product"]')].map((input) => input.value)).toEqual(["grn", "ash"]);
    expect(container.querySelector('input[name="mode"]')).toHaveValue("manual");
  });
});
