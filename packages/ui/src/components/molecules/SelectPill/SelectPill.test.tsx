import { fireEvent, render, screen } from "@testing-library/react";

import { SelectPill } from "./SelectPill";

describe("SelectPill", () => {
  it("submits its form when the choice changes", () => {
    const onSubmit = vi.fn((event: Event) => event.preventDefault());
    render(
      <form onSubmit={(event) => onSubmit(event.nativeEvent)}>
        <SelectPill label="Movement type" name="type" autoSubmit className="mt-4" options={[{ value: "", label: "All types" }, { value: "sale", label: "Sales" }]} />
      </form>,
    );
    const select = screen.getByRole("combobox", { name: "Movement type" });
    expect(select.parentElement).toHaveClass("mt-4");
    fireEvent.change(select, { target: { value: "sale" } });
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
