import { fireEvent, render, screen } from "@testing-library/react";

import { ReturnItems } from "./ReturnItems";

const items = [
  { id: "greens", name: "Daily Greens Powder", detail: "Paid GHS 405.00", quantity: "Qty 1 of 1" },
  { id: "energy", name: "Energy Capsules", detail: "2 bought" },
];
const reasons = [{ value: "damaged", label: "Arrived damaged" }];

describe("ReturnItems", () => {
  it("opens a ticked item with its reason and photo slot", () => {
    render(<ReturnItems items={items} reasons={reasons} defaultSelected={["greens"]} className="mt-4" />);
    expect(screen.getByRole("region", { name: /What are you returning/ })).toHaveClass("mt-4");
    expect(screen.getByRole("checkbox", { name: /Daily Greens Powder/ })).toBeChecked();
    expect(screen.getByLabelText("Reason")).toHaveAttribute("name", "reason-greens");
    expect(screen.getByLabelText("Add photos of Daily Greens Powder")).toHaveAttribute("type", "file");
    expect(screen.getByText("Qty 1 of 1")).toBeInTheDocument();
  });

  it("ticks another item", () => {
    render(<ReturnItems items={items} reasons={reasons} />);
    expect(screen.queryByLabelText("Reason")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("checkbox", { name: /Energy Capsules/ }));
    expect(screen.getByLabelText("Reason")).toHaveAttribute("name", "reason-energy");
  });
});
