import { fireEvent, render, screen } from "@testing-library/react";

import { CustomerNotesCard } from "./CustomerNotesCard";

describe("CustomerNotesCard", () => {
  it("shows notes and events, and enables Save once a note is typed", () => {
    render(
      <CustomerNotesCard
        className="mt-4"
        fields={{ customer: "efua" }}
        events={[
          { id: "1", kind: "note", author: "Abena M.", time: "6 Nov", body: "Prefers delivery after 4pm." },
          { id: "2", kind: "refund", time: "5 Oct", body: "Refund of GHS 70", wideOnly: true },
        ]}
      />,
    );
    const region = screen.getByRole("region", { name: "Notes & activity" });
    expect(region).toHaveClass("mt-4");
    // The mobile card and the list both show the note.
    expect(screen.getAllByText("Prefers delivery after 4pm.")).toHaveLength(2);
    expect(screen.getByText(/Refund of GHS 70/).closest("li")).toHaveClass("hidden", "xl:flex");
    expect(region.querySelector('input[name="customer"]')).toHaveValue("efua");

    const save = screen.getByRole("button", { name: "Save" });
    expect(save).toBeDisabled();
    fireEvent.change(screen.getByRole("textbox", { name: "Note for the team" }), { target: { value: "Call first" } });
    expect(save).toBeEnabled();
  });
});
