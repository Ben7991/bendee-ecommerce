import { render, screen } from "@testing-library/react";

import { ReportDonut } from "./ReportDonut";

describe("ReportDonut", () => {
  it("draws the segments and legend", () => {
    render(<ReportDonut {...{ title: "Payment health", description: "1,084 payment attempts via Paystack", center: { value: "88%", label: "succeeded" }, segments: [{ label: "Succeeded", value: 954, tone: "success" as const }, { label: "Failed", value: 87, tone: "error" as const }, { label: "Abandoned", value: 43, tone: "warning" as const }] }}>Extra</ReportDonut>);
    expect(screen.getByRole("img", { name: "Succeeded 954, Failed 87, Abandoned 43" })).toBeInTheDocument();
    expect(screen.getByText("88%")).toBeInTheDocument();
    expect(screen.getByText("Extra")).toBeInTheDocument();
  });
});
