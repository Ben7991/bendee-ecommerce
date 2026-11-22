import { render, screen } from "@testing-library/react";

import { BulletList } from "./BulletList";

describe("BulletList", () => {
  it("lists its items", () => {
    render(<BulletList items={["Unopened only", "Courier collects it"]} className="mt-4" />);
    const list = screen.getByRole("list");
    expect(list).toHaveClass("mt-4");
    expect(screen.getAllByRole("listitem").map((item) => item.textContent)).toEqual(["Unopened only", "Courier collects it"]);
  });
});
