import type { Metadata } from "next";
import Link from "next/link";

import { Button, Divider, Text, TextLink } from "@repo/ui/atoms";
import { CheckboxField, PasswordField, TextField } from "@repo/ui/molecules";
import { AuthIntro } from "@repo/ui/organisms";

import { AuthPage } from "../_components/auth-page";
import { GoogleButton } from "../_components/google-button";
import { LegalNote } from "../_components/legal-note";
import { PASSWORD_RULES } from "../_content/password";

export const metadata: Metadata = { title: "Create your account" };

/** Paper: Sign up — Email. Password min 8 chars, checked against breached lists (ACC-FR-03). */
export default function SignUpPage() {
  return (
    <AuthPage columnClassName="gap-5">
      <AuthIntro
        linkAs={Link}
        back={{ href: "/auth/sign-in", label: "Other ways to join" }}
        title={
          <>
            Create your <em>account</em>
          </>
        }
        description="Sign up with your email. We'll send a link to verify it."
      />
      <GoogleButton label="Sign up with Google" />
      <Divider label="or with email" />
      <TextField label="Full name" name="name" autoComplete="name" placeholder="Ama Mensah" />
      <TextField label="Email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
      <PasswordField
        label="Password"
        name="password"
        autoComplete="new-password"
        strength={{ score: 0, checks: PASSWORD_RULES }}
      />
      <CheckboxField name="marketing" label="Email me wellness notes and offers. Unsubscribe anytime." />
      <Button asChild size="xl" className="w-full">
        <Link href="/auth/verify-email">Create account</Link>
      </Button>
      <Text align="center">
        Already have an account?{" "}
        <TextLink asChild>
          <Link href="/auth/sign-in/email">Sign in</Link>
        </TextLink>
      </Text>
      <LegalNote lead="By creating an account you agree to our" />
    </AuthPage>
  );
}
