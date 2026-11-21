import { fireEvent, render, screen } from "@testing-library/react";

import { CustomerContactCard } from "./CustomerContactCard";

describe("CustomerContactCard", () => {
  it("reveals masked contact details and logs it once per reveal", () => {
    const onReveal = vi.fn();
    render(
      <CustomerContactCard
        phone={{ masked: "024 ••• 4521", full: "024 555 4521" }}
        email={{ masked: "ef•••@gmail.com", full: "efua@gmail.com" }}
        address={{ lines: ["Blue gate", "Osu, Accra"], compact: "Blue gate, Osu", ghanaPost: "GA-039-5521", mapsHref: "https://maps.example" }}
        onReveal={onReveal}
        addNoteHref="#notes"
        className="mt-4"
      />,
    );
    // Mobile rows and the tablet+ card both show the number.
    expect(screen.getAllByText("024 ••• 4521")).toHaveLength(2);
    fireEvent.click(screen.getByRole("button", { name: "Show contact details" }));
    expect(screen.getAllByText("024 555 4521")).toHaveLength(2);
    expect(screen.getAllByText("efua@gmail.com")).toHaveLength(2);
    expect(onReveal).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole("button", { name: "Hide contact details" }));
    expect(onReveal).toHaveBeenCalledTimes(1);

    expect(screen.getByRole("link", { name: "Add note" })).toHaveAttribute("href", "#notes");
    expect(screen.getByRole("region", { name: "Default address" })).toHaveTextContent("GA-039-5521");
    expect(screen.getAllByRole("link", { name: /Maps/ })[0]).toHaveAttribute("href", "https://maps.example");
  });
});
