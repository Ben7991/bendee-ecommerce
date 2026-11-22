import { fireEvent, render, screen } from "@testing-library/react";

import { OPTIONS } from "./data";
import { RoleOptions } from "./RoleOptions";

describe("RoleOptions", () => {
  it("checks the current role and disables owner", () => {
    render(<RoleOptions name="role" options={OPTIONS} defaultValue="fulfilment" />);
    expect(screen.getByRole("radio", { name: /Fulfilment/ })).toBeChecked();
    expect(screen.getByRole("radio", { name: /Owner/ })).toBeDisabled();
  });

  it("submits the form when the choice changes with autoSubmit", () => {
    const submit = vi.fn((event: Event) => event.preventDefault());
    render(
      <form onSubmit={(event) => submit(event.nativeEvent)}>
        <RoleOptions name="role" options={OPTIONS} defaultValue="fulfilment" autoSubmit />
      </form>,
    );
    fireEvent.click(screen.getByRole("radio", { name: /Admin/ }));
    expect(submit).toHaveBeenCalled();
  });
});
