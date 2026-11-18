import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

import { FilterTabs } from "./FilterTabs";

const options = [
  { value: "all", label: "All" },
  { value: "capsules", label: "Capsules" },
];

function Harness({ onChange }: { onChange: (value: string) => void }) {
  const [value, setValue] = useState("all");
  return (
    <FilterTabs
      aria-label="Filter bestsellers"
      options={options}
      value={value}
      onValueChange={(next) => {
        setValue(next);
        onChange(next);
      }}
    />
  );
}

describe("FilterTabs", () => {
  it("selects an option", async () => {
    const onChange = vi.fn();
    render(<Harness onChange={onChange} />);
    await userEvent.click(screen.getByRole("radio", { name: "Capsules" }));
    expect(onChange).toHaveBeenCalledWith("capsules");
    expect(screen.getByRole("radio", { name: "Capsules" })).toHaveAttribute("data-state", "on");
  });

  it("keeps the current option when it is pressed again", async () => {
    const onChange = vi.fn();
    render(<Harness onChange={onChange} />);
    await userEvent.click(screen.getByRole("radio", { name: "All" }));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole("radio", { name: "All" })).toHaveAttribute("data-state", "on");
  });
});
