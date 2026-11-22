import type { Metadata } from "next";
import type { ReactNode } from "react";

/*
 * Sign in, sign up and password screens (Paper "Jofak" → Authentication).
 * Static for now: fields don't submit and primary buttons link to the next screen so the flow
 * can be clicked through. Wire them to the API's /api/auth/* endpoints when it exists
 * (docs/03-customer-account.md §3.1).
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return children;
}
