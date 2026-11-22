import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { PriceRange } from "./PriceRange";

describe("PriceRange", () => {
  it("shows both ends on sliders and boxes", () => {
    render(<PriceRange min={0} max={800} defaultValue={[150, 700]} />);
    const [minSlider, maxSlider] = screen.getAllByRole("slider");
    expect(minSlider).toHaveAccessibleName("Minimum price");
    expect(minSlider).toHaveValue("150");
    expect(maxSlider).toHaveValue("700");
    expect(screen.getByRole("textbox", { name: "Maximum price" })).toHaveValue("700");
  });

  it("never lets the low thumb pass the high one", () => {
    const onValueChange = vi.fn();
    render(<PriceRange min={0} max={800} defaultValue={[150, 700]} onValueChange={onValueChange} />);
    fireEvent.change(screen.getAllByRole("slider")[0]!, {
      target: { value: "750" },
    });
    expect(onValueChange).toHaveBeenLastCalledWith([700, 700]);
  });

  it("applies and clamps a typed value on blur", async () => {
    const onValueCommit = vi.fn();
    render(<PriceRange min={0} max={800} defaultValue={[150, 700]} onValueCommit={onValueCommit} />);
    const maxBox = screen.getByRole("textbox", { name: "Maximum price" });
    await userEvent.clear(maxBox);
    await userEvent.type(maxBox, "950");
    await userEvent.tab();
    expect(onValueCommit).toHaveBeenCalledWith([150, 800]);
    expect(maxBox).toHaveValue("800");
  });
});
