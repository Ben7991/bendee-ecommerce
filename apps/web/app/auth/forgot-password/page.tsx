import type { Metadata } from "next";
import Link from "next/link";

import { Button, TextLink } from "@repo/ui/atoms";
import { Callout, TextField } from "@repo/ui/molecules";
import { AuthIntro } from "@repo/ui/organisms";

import { AuthPage } from "../_components/auth-page";

export const metadata: Metadata = { title: "Forgot your password?" };

/** Paper: Forgot password. */
export default function ForgotPasswordPage() {
  return (
    <AuthPage>
      <AuthIntro
        linkAs={Link}
        back={{ href: "/auth/sign-in/email", label: "Back to sign in" }}
        icon="key"
        title={
          <>
            Forgot your <em>password?</em>
          </>
        }
        description="Enter the email on your account and we'll send you a link to reset it. The link expires in 30 minutes."
      />
      <TextField label="Email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
      <Button asChild size="xl" className="w-full">
        <Link href="/auth/forgot-password/sent">Send reset link</Link>
      </Button>
      <Callout icon="phone">
        Signed up with your phone? You don&apos;t need a password.{" "}
        <TextLink asChild>
          <Link href="/auth/sign-in">Get a code instead</Link>
        </TextLink>
      </Callout>
    </AuthPage>
  );
}
