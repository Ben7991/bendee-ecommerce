import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ChoiceGroup } from "./ChoiceGroup";

const choices = [
  { value: "rested", label: "Rested and ready to go" },
  { value: "groggy", label: "Groggy until my second coffee" },
];

describe("ChoiceGroup", () => {
  it("selects one answer at a time", async () => {
    const onValueChange = vi.fn();
    render(<ChoiceGroup aria-label="Wake-up feeling" choices={choices} defaultValue="groggy" onValueChange={onValueChange} />);
    expect(screen.getByRole("radiogroup", { name: "Wake-up feeling" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Groggy until my second coffee" })).toBeChecked();

    await userEvent.click(screen.getByRole("radio", { name: "Rested and ready to go" }));
    expect(onValueChange).toHaveBeenCalledWith("rested");
    expect(screen.getByRole("radio", { name: "Rested and ready to go" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Groggy until my second coffee" })).not.toBeChecked();
  });
});
