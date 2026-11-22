import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ProductBuyBox } from "./ProductBuyBox";

const base = {
  name: "Daily Greens Powder",
  title: (
    <>
      Daily Greens <em>Powder</em>
    </>
  ),
  price: 450,
  compareAt: 520,
};

describe("ProductBuyBox", () => {
  it("shows the name, rating and savings", () => {
    render(<ProductBuyBox {...base} rating={{ value: 4.9, count: 3214, href: "#reviews" }} className="mt-4" />);
    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Daily Greens Powder",
    });
    expect(heading.closest("[data-slot=product-buy-box]")).toHaveClass("mt-4");
    expect(screen.getByRole("link", { name: "3,214 reviews" })).toHaveAttribute("href", "#reviews");
    expect(screen.getByText("You save GHS 70 (13%)")).toBeInTheDocument();
  });

  it("adds the chosen quantity", async () => {
    const onAdd = vi.fn();
    render(<ProductBuyBox {...base} onAdd={onAdd} maxQuantity={3} />);
    await userEvent.click(screen.getByRole("button", { name: "Increase Daily Greens Powder" }));
    const add = screen.getByRole("button", { name: /Add to cart/ });
    expect(add).toHaveTextContent("Add to cart · GHS 900");
    await userEvent.click(add);
    expect(onAdd).toHaveBeenCalledWith(2);
  });

  it("swaps Add to cart for the sold-out action", () => {
    render(<ProductBuyBox {...base} soldOut soldOutAction={<button type="button">Notify me</button>} buyNow={<a href="/checkout">Buy now</a>} />);
    expect(screen.queryByRole("button", { name: /Add to cart/ })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Buy now" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Notify me" }).closest("#notify")).not.toBeNull();
  });
});
