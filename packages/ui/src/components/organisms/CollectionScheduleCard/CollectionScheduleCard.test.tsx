import { render, screen } from "@testing-library/react";

import { CollectionScheduleCard } from "./CollectionScheduleCard";

describe("CollectionScheduleCard", () => {
  it("has start and end date-times", () => {
    render(<CollectionScheduleCard className="mt-4" defaultValue={{ startsAt: "2026-11-01T00:00", endsAt: "2026-12-15T23:59" }} />);
    expect(screen.getByRole("region", { name: "Schedule" })).toHaveClass("mt-4");
    expect(screen.getByLabelText("Starts")).toHaveValue("2026-11-01T00:00");
    expect(screen.getByLabelText("Ends")).toHaveAttribute("name", "endsAt");
  });
});
