import { BrandLogo, Button } from "@repo/ui/atoms";

/**
 * Google sign-in button. Not wired yet: Google sign-in is Phase 2
 * (docs/03-customer-account.md, ACC-FR-04).
 */
export function GoogleButton({ label }: { label: string }) {
  return (
    <Button type="button" variant="secondary" size="xl" className="h-13 w-full gap-2.5 text-base">
      <BrandLogo name="google" />
      {label}
    </Button>
  );
}
