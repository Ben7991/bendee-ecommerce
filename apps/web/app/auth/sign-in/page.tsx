import type { Metadata } from "next";
import Link from "next/link";

import { Button, Divider } from "@repo/ui/atoms";
import { PhoneField } from "@repo/ui/molecules";
import { AuthIntro } from "@repo/ui/organisms";

import { AuthPage } from "../_components/auth-page";
import { GoogleButton } from "../_components/google-button";
import { LegalNote } from "../_components/legal-note";

export const metadata: Metadata = { title: "Sign in or join" };

/** Paper: Sign in — Phone. The default way in: phone number + SMS code (ACC-FR-01). */
export default function SignInPage() {
  return (
    <AuthPage columnClassName="pt-6 md:px-5 md:pt-0">
      <AuthIntro
        title={
          <>
            Sign in or <em>join</em>
          </>
        }
        titleClassName="text-40 leading-11"
        description="Use your phone number — we'll text you a code. No password needed."
      />
      <PhoneField name="phone" placeholder="24 412 7781" />
      <Button asChild size="xl" className="h-14 w-full">
        <Link href="/auth/sign-in/code">Send me a code</Link>
      </Button>
      <Divider label="OR" />
      <div className="flex flex-col gap-3">
        <GoogleButton label="Continue with Google" />
        <Button asChild variant="secondary" size="xl" className="w-full text-base">
          <Link href="/auth/sign-in/email">Continue with email</Link>
        </Button>
      </div>
      <LegalNote lead="By continuing you agree to our" tail=" Standard SMS rates may apply." className="mt-auto xl:mt-0 xl:pt-4" />
    </AuthPage>
  );
}
