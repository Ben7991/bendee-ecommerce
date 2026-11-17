import type { Meta, StoryObj } from "@storybook/react-vite";

/* Class names are written out in full so Tailwind can see them. */
const sizes = [
  { token: "6xl", className: "text-6xl tracking-display" },
  { token: "5xl", className: "text-5xl tracking-display" },
  { token: "4xl", className: "text-4xl tracking-tight" },
  { token: "3xl", className: "text-3xl tracking-tight" },
  { token: "2xl", className: "text-2xl tracking-snug" },
  { token: "xl", className: "text-xl" },
  { token: "lg", className: "text-lg" },
  { token: "md", className: "text-md" },
  { token: "base", className: "text-base" },
  { token: "sm", className: "text-sm" },
  { token: "xs", className: "text-xs uppercase tracking-wide" },
] as const;

function TypeScale() {
  return (
    <div className="flex flex-col gap-6">
      {sizes.map(({ token, className }) => (
        <div key={token} className="flex flex-col gap-1 border-b border-border-subtle pb-4">
          <code className="text-xs text-text-muted">text-{token}</code>
          <p className={`font-semibold text-text ${className}`}>Feel better, every day</p>
        </div>
      ))}
      <p className="text-4xl font-semibold tracking-tight text-text">
        One serif word per view, <span className="font-serif font-regular italic text-brand">gently</span>
      </p>
    </div>
  );
}

/**
 * The Jofak type scale (`text-*` sets size and its paired `leading-*`). Inter Tight for UI,
 * Instrument Serif italic for the single accent word per view.
 */
const meta = {
  title: "Foundations/Typography",
  component: TypeScale,
  parameters: { layout: "padded" },
} satisfies Meta<typeof TypeScale>;

export default meta;

export const Scale: StoryObj<typeof meta> = {};
