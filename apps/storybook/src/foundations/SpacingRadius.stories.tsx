import type { Meta, StoryObj } from "@storybook/react-vite";

/* Class names are written out in full so Tailwind can see them. */
const spacing = [
  ["1", "w-1"],
  ["2", "w-2"],
  ["3", "w-3"],
  ["4", "w-4"],
  ["5", "w-5"],
  ["6", "w-6"],
  ["8", "w-8"],
  ["10", "w-10"],
  ["12", "w-12"],
  ["14", "w-14"],
  ["18", "w-18"],
  ["24", "w-24"],
] as const;

const radii = [
  ["sm", "rounded-sm"],
  ["14", "rounded-14"],
  ["md", "rounded-md"],
  ["18", "rounded-18"],
  ["lg", "rounded-lg"],
  ["22", "rounded-22"],
  ["xl", "rounded-xl"],
  ["26", "rounded-26"],
  ["2xl", "rounded-2xl"],
  ["3xl", "rounded-3xl"],
  ["full", "rounded-full"],
] as const;

function SpacingAndRadius() {
  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Spacing</h2>
        {spacing.map(([token, width]) => (
          <div key={token} className="flex items-center gap-4">
            <code className="w-12 text-xs text-text-muted">{token}</code>
            <div className={`h-4 rounded-full bg-brand ${width}`} />
          </div>
        ))}
      </section>
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Radius</h2>
        <div className="flex flex-wrap gap-6">
          {radii.map(([token, rounded]) => (
            <div key={token} className="flex flex-col items-center gap-2">
              <div className={`size-18 border border-border bg-surface ${rounded}`} />
              <code className="text-xs text-text-muted">{token}</code>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/**
 * Jofak spacing and radius. Spacing is a 4px grid (`p-6` = 24px, `size-11.5` = 46px); these are the
 * named steps from Paper. Radius has core t-shirt steps plus px-named in-between steps.
 */
const meta = {
  title: "Foundations/Spacing & Radius",
  component: SpacingAndRadius,
  parameters: { layout: "padded" },
} satisfies Meta<typeof SpacingAndRadius>;

export default meta;

export const Scales: StoryObj<typeof meta> = {};
