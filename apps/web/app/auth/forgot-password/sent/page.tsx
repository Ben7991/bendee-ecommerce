import type { Metadata } from "next";
import Link from "next/link";

import { Button, Icon, TextLink } from "@repo/ui/atoms";
import { Callout } from "@repo/ui/molecules";
import { AuthIntro } from "@repo/ui/organisms";

import { AuthPage } from "../../_components/auth-page";

export const metadata: Metadata = { title: "Check your inbox" };

/** Paper: Reset link sent. */
export default function ResetLinkSentPage() {
  return (
    <AuthPage>
      <AuthIntro
        linkAs={Link}
        back={{ href: "/auth/sign-in/email", label: "Back to sign in" }}
        icon="mail"
        title={
          <>
            Check your <em>inbox</em>
          </>
        }
        description="We've sent a reset link to your email address. It expires in 30 minutes."
      />
      {/* Not wired: there's no reliable "open inbox" link across mail apps yet. */}
      <Button type="button" size="xl" className="w-full">
        Open email app <Icon name="arrowUpRight" size={16} />
      </Button>
      <Button type="button" variant="secondary" size="xl" disabled className="w-full text-base text-text-muted disabled:opacity-100">
        Resend link in 0:45
      </Button>
      <Callout
        title="Can't find it?"
        items={[
          "Check your spam or promotions folder",
          <>
            Wrong address?{" "}
            <TextLink asChild>
              <Link href="/auth/forgot-password">Try another email</Link>
            </TextLink>
          </>,
        ]}
      />
    </AuthPage>
  );
}
