import { cn } from "./cn";

describe("cn", () => {
  it("keeps Jofak sizes next to colours", () => {
    expect(cn("text-14", "text-text-muted")).toBe("text-14 text-text-muted");
  });

  it("treats border-field as a width, not a colour", () => {
    expect(cn("border-field border-border")).toBe("border-field border-border");
    expect(cn("border border-field")).toBe("border-field");
  });
});
