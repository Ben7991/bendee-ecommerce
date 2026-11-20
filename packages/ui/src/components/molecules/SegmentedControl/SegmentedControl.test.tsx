import { fireEvent, render, screen } from "@testing-library/react";

import { SegmentedControl } from "./SegmentedControl";

const options = [
  { value: "today", label: "Today" },
  { value: "7d", label: "7 days" },
];

describe("SegmentedControl", () => {
  it("selects one option and reports changes", () => {
    const onValueChange = vi.fn();
    render(<SegmentedControl aria-label="Date range" options={options} onValueChange={onValueChange} className="mt-4" />);
    const group = screen.getByRole("radiogroup", { name: "Date range" });
    expect(group).toHaveClass("mt-4");
    expect(screen.getByRole("radio", { name: "Today" })).toHaveAttribute("aria-checked", "true");
    fireEvent.click(screen.getByRole("radio", { name: "7 days" }));
    expect(onValueChange).toHaveBeenCalledWith("7d");
    expect(screen.getByRole("radio", { name: "7 days" })).toHaveAttribute("aria-checked", "true");
  });

  it("keeps the selection when the active option is pressed again", () => {
    render(<SegmentedControl aria-label="Date range" options={options} defaultValue="7d" />);
    fireEvent.click(screen.getByRole("radio", { name: "7 days" }));
    expect(screen.getByRole("radio", { name: "7 days" })).toHaveAttribute("aria-checked", "true");
  });
});
