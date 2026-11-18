import type { Metadata } from "next";

import { Icon, Text } from "@repo/ui/atoms";
import { PasswordField } from "@repo/ui/molecules";
import { AuthIntro } from "@repo/ui/organisms";

import { AuthPage } from "../_components/auth-page";
import { PASSWORD_RULES } from "../_content/password";
import { SavePasswordButton } from "./save-password-button";

export const metadata: Metadata = { title: "Set a new password" };

/** Paper: Reset password, then Reset success (modal on tablet/desktop, sheet on mobile). */
export default function ResetPasswordPage() {
  return (
    <AuthPage>
      <AuthIntro
        icon="lock"
        title={
          <>
            Set a new <em>password</em>
          </>
        }
        description="Choose something you haven't used here before."
      />
      <PasswordField
        label="New password"
        name="password"
        autoComplete="new-password"
        strength={{ score: 0, checks: PASSWORD_RULES }}
      />
      <PasswordField label="Confirm new password" name="confirmPassword" autoComplete="new-password" />
      <SavePasswordButton />
      <Text size="xs" tone="muted" align="center" className="flex items-center justify-center gap-2">
        <Icon name="shield" size={14} />
        For your safety, we&apos;ll sign you out on other devices.
      </Text>
    </AuthPage>
  );
}
