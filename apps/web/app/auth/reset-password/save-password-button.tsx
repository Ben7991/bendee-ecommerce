"use client";

import Link from "next/link";
import { useState } from "react";

import { Button, Icon, TextLink } from "@repo/ui/atoms";
import { SuccessDialog } from "@repo/ui/organisms";

/**
 * "Save new password" and the success dialog. Static for now: the button only opens the
 * dialog; saving goes to POST /api/auth/password/reset once the API has it.
 */
export function SavePasswordButton() {
  const [saved, setSaved] = useState(false);

  return (
    <>
      <Button type="button" size="xl" className="w-full" onClick={() => setSaved(true)}>
        Save new password
      </Button>
      <SuccessDialog
        open={saved}
        onOpenChange={setSaved}
        title={
          <>
            Password <em>updated</em>
          </>
        }
        description="You can now sign in with your new password. We've signed you out of your other devices to keep your account safe."
        action={
          <Button asChild size="xl" className="h-13 w-full">
            <Link href="/auth/sign-in/email">
              Continue to sign in <Icon name="arrowRight" size={16} />
            </Link>
          </Button>
        }
        footer={
          <>
            Didn&apos;t make this change?{" "}
            <TextLink asChild>
              <Link href="/pages/contact">Contact support</Link>
            </TextLink>
          </>
        }
      />
    </>
  );
}
