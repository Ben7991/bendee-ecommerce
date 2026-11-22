"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { BackupCodesDialog, ChangePasswordDialog, MoveAuthenticatorDialog } from "@repo/ui/organisms";

/*
 * Client boundary for the My profile sign-in dialogs: which one is open comes from the URL
 * (?dialog=password|authenticator|codes), and closing one goes back to /admin/profile.
 */

type Action = (formData: FormData) => Promise<void>;

export interface ProfileDialogsProps {
  dialog?: string;
  step: 1 | 2 | 3;
  error?: string;
  lastChanged: string;
  otherDevices?: string;
  forbidden: string[];
  secret?: string;
  codes: string[];
  codesNote: string;
  owner: string;
  changePassword: Action;
  moveAuthenticator: Action;
}

/** Placeholder QR pattern. TODO: render the otpauth:// URL for `secret` as a real QR code. */
const QR = (
  <svg width="136" height="136" viewBox="0 0 29 29" shapeRendering="crispEdges" role="img" aria-label="QR code for your authenticator app">
    <path
      fill="#14201A"
      d="M0 0h7v7H0zM1 1v5h5V1zM2 2h3v3H2zM22 0h7v7h-7zM23 1v5h5V1zM24 2h3v3h-3zM0 22h7v7H0zM1 23v5h5v-5zM2 24h3v3H2zM9 0h2v2H9zM13 1h3v1h-3zM17 0h2v3h-2zM9 4h1v3H9zM12 3h2v2h-2zM15 4h3v1h-3zM19 5h1v2h-1zM8 8h3v1H8zM12 7h1v3h-1zM14 8h4v1h-4zM20 8h2v2h-2zM24 9h3v1h-3zM0 9h2v1H0zM3 10h3v1H3zM9 10h2v3H9zM13 11h3v2h-3zM17 10h2v1h-2zM22 11h3v1h-3zM26 12h3v2h-3zM1 12h1v3H1zM4 13h3v1H4zM11 14h4v1h-4zM16 13h2v3h-2zM19 14h4v1h-4zM8 15h2v2H8zM12 16h3v1h-3zM21 16h2v3h-2zM24 15h2v2h-2zM0 17h4v1H0zM5 16h2v3H5zM10 18h3v1h-3zM14 18h1v3h-1zM17 18h3v1h-3zM26 18h2v2h-2zM8 20h2v2H8zM11 21h2v1h-2zM16 20h4v1h-4zM23 21h3v1h-3zM9 23h3v1H9zM13 23h1v3h-1zM15 22h4v1h-4zM21 23h2v2h-2zM25 24h3v1h-3zM8 25h4v1H8zM16 25h3v2h-3zM20 26h2v3h-2zM24 27h3v2h-3zM9 27h3v2H9zM14 27h1v2h-1z"
    />
  </svg>
);

export function ProfileDialogs({ dialog, step, error, lastChanged, otherDevices, forbidden, secret, codes, codesNote, owner, changePassword, moveAuthenticator }: ProfileDialogsProps) {
  const router = useRouter();
  const close = (open: boolean) => {
    if (!open) router.replace("/admin/profile", { scroll: false });
  };
  return (
    <>
      <ChangePasswordDialog open={dialog === "password"} onOpenChange={close} action={changePassword} lastChanged={lastChanged} otherDevices={otherDevices} forbidden={forbidden} error={dialog === "password" ? error : undefined} />
      <MoveAuthenticatorDialog
        linkAs={Link}
        open={dialog === "authenticator"}
        onOpenChange={close}
        action={moveAuthenticator}
        step={step}
        secret={secret ?? "—"}
        qr={QR}
        backHref={step > 1 ? `/admin/profile?dialog=authenticator&step=${step - 1}` : undefined}
        error={dialog === "authenticator" ? error : undefined}
      />
      <BackupCodesDialog open={dialog === "codes"} onOpenChange={close} codes={codes} note={codesNote} owner={owner} />
    </>
  );
}
