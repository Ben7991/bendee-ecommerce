import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ChipGroup } from "./ChipGroup";

const options = [
  { value: "vegan", label: "Vegan" },
  { value: "sugar-free", label: "Sugar free" },
];

describe("ChipGroup", () => {
  it("toggles several chips in a multiple group", async () => {
    const onValueChange = vi.fn();
    render(<ChipGroup type="multiple" aria-label="Dietary" options={options} defaultValue={["vegan"]} onValueChange={onValueChange} />);
    expect(screen.getByRole("button", { name: "Vegan" })).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(screen.getByRole("button", { name: "Sugar free" }));
    expect(onValueChange).toHaveBeenLastCalledWith(["vegan", "sugar-free"]);
  });

  it("keeps the value of a required single group", async () => {
    const onValueChange = vi.fn();
    render(<ChipGroup type="single" required aria-label="Sort by" options={options} defaultValue="vegan" onValueChange={onValueChange} />);
    await userEvent.click(screen.getByRole("radio", { name: "Vegan" }));
    expect(onValueChange).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole("radio", { name: "Sugar free" }));
    expect(onValueChange).toHaveBeenCalledWith("sugar-free");
  });

  it("clears an optional single group", async () => {
    const onValueChange = vi.fn();
    render(<ChipGroup type="single" aria-label="Price" options={options} defaultValue="vegan" onValueChange={onValueChange} />);
    await userEvent.click(screen.getByRole("radio", { name: "Vegan" }));
    expect(onValueChange).toHaveBeenCalledWith("");
  });
});
