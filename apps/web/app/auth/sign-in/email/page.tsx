import type { Metadata } from "next";
import Link from "next/link";

import { Button, Divider, Text, TextLink } from "@repo/ui/atoms";
import { CheckboxField, PasswordField, TextField } from "@repo/ui/molecules";
import { AuthIntro } from "@repo/ui/organisms";

import { AuthPage } from "../../_components/auth-page";
import { GoogleButton } from "../../_components/google-button";

export const metadata: Metadata = { title: "Sign in with email" };

/** Paper: Sign in — Email. Optional email + password (ACC-FR-03). */
export default function SignInEmailPage() {
  return (
    <AuthPage columnClassName="gap-5">
      <AuthIntro
        linkAs={Link}
        back={{ href: "/auth/sign-in", label: "Other ways to sign in" }}
        title={
          <>
            Welcome <em>back</em>
          </>
        }
        description="Sign in with your email and password."
      />
      <GoogleButton label="Continue with Google" />
      <Divider label="or with email" />
      <TextField label="Email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
      <PasswordField
        label="Password"
        name="password"
        labelAction={
          <TextLink asChild className="font-sans text-sm leading-xs">
            <Link href="/auth/forgot-password">Forgot password?</Link>
          </TextLink>
        }
      />
      <CheckboxField name="remember" label="Keep me signed in on this device" defaultChecked className="items-center" />
      <Button asChild size="xl" className="w-full">
        <Link href="/">Sign in</Link>
      </Button>
      <Text align="center">
        New to Jofak?{" "}
        <TextLink asChild>
          <Link href="/auth/sign-up">Create an account</Link>
        </TextLink>
      </Text>
      <Text size="xs" tone="muted" align="center">
        Prefer a code?{" "}
        <TextLink asChild tone="muted">
          <Link href="/auth/sign-in">Sign in with your phone number</Link>
        </TextLink>
      </Text>
    </AuthPage>
  );
}
