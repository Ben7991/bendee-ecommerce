import type { Metadata } from "next";
import Link from "next/link";

import { Button, Divider, Text, TextLink } from "@repo/ui/atoms";
import { OtpField } from "@repo/ui/molecules";
import { AuthIntro } from "@repo/ui/organisms";

import { AuthPage } from "../../_components/auth-page";

export const metadata: Metadata = { title: "Enter your code" };

/** Paper: Sign in — OTP. 6 digits, valid 5 minutes, resend after 60 s (ACC-FR-01). */
export default function SignInCodePage() {
  return (
    <AuthPage mobileHeader={false} columnClassName="pt-4 md:pt-0">
      <AuthIntro
        linkAs={Link}
        back={{ href: "/auth/sign-in", label: "Back" }}
        title="Enter your code"
        descriptionSize="md"
        description={
          <>
            We texted a 6-digit code to <strong>your phone</strong>.{" "}
            <TextLink asChild>
              <Link href="/auth/sign-in">Change</Link>
            </TextLink>
          </>
        }
      />
      <OtpField name="code" autoFocus />
      <div className="flex items-center justify-between gap-3">
        <Text size="sm" tone="muted">
          Didn&apos;t get it? Resend in <strong>1:00</strong>
        </Text>
        <Text size="sm" tone="muted">
          Code expires in 5 min
        </Text>
      </div>
      <Button size="xl" disabled className="h-14 w-full disabled:opacity-40">
        Verify &amp; sign in
      </Button>
      <Divider label="OR" />
      <Text align="center">
        Prefer email?{" "}
        <TextLink asChild>
          <Link href="/auth/sign-in/email">Sign in with email and password</Link>
        </TextLink>
      </Text>
      <Text size="xs" tone="muted" align="center" className="pt-6">
        New here? We&apos;ll create your account automatically. Any past guest orders on this number will be linked.
      </Text>
    </AuthPage>
  );
}
