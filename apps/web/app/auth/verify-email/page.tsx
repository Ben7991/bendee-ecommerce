import type { Metadata } from "next";
import Link from "next/link";

import { Button, Icon, Text, TextLink } from "@repo/ui/atoms";
import { Callout } from "@repo/ui/molecules";
import { AuthIntro } from "@repo/ui/organisms";

import { AuthPage } from "../_components/auth-page";

export const metadata: Metadata = { title: "Verify your email" };

/** Paper: Verify email. Shown right after email sign-up; the link is valid for 24 hours. */
export default function VerifyEmailPage() {
  return (
    <AuthPage>
      <AuthIntro
        status="Account created · you're signed in"
        icon="mailCheck"
        iconSize={30}
        title={
          <>
            Verify your <em>email</em>
          </>
        }
        description="We sent a link to your email address. Tap it to confirm it's you. The link works for 24 hours."
      />
      <Callout
        title="Once verified, you can"
        marker="check"
        items={[
          "Sign in with your email and password",
          "Get receipts and order updates by email",
          "Link past guest orders to your account",
        ]}
      />
      <Button type="button" size="xl" className="w-full">
        Open email app <Icon name="arrowUpRight" size={16} />
      </Button>
      <Button asChild variant="secondary" size="xl" className="w-full text-base">
        <Link href="/">Start shopping, verify later</Link>
      </Button>
      <Text tone="muted" align="center">
        Didn&apos;t get it?{" "}
        <TextLink asChild>
          <button type="button">Resend</button>
        </TextLink>{" "}
        ·{" "}
        <TextLink asChild>
          <Link href="/auth/sign-up">Change email</Link>
        </TextLink>
      </Text>
    </AuthPage>
  );
}
