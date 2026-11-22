import Image from "next/image";
import Link from "next/link";

import { AuthShell, type AuthShellProps } from "@repo/ui/templates";

import { placeholderSrc } from "../../_lib/placeholder";

function Packshot({ file, sizes }: { file: string; sizes: string }) {
  const src = placeholderSrc(file);
  return src ? <Image src={src} alt="" fill sizes={sizes} className="object-contain" /> : null;
}

/** AuthShell with Jofak's brand copy and packshots, shared by every /auth page. */
export function AuthPage(props: Omit<AuthShellProps, "headline" | "benefits" | "products" | "linkAs">) {
  return (
    <AuthShell
      linkAs={Link}
      headline={
        <>
          Your wellness,
          <br />
          one tap <em>away</em>
        </>
      }
      benefits={["Track every order to your door", "Reorder your routine in one tap", "Manage subscriptions and addresses"]}
      products={[
        <Packshot key="ashwagandha" file="ashwagandha.png" sizes="(min-width: 1440px) 170px, 120px" />,
        <Packshot key="greens" file="greens.png" sizes="(min-width: 1440px) 236px, 178px" />,
      ]}
      {...props}
    />
  );
}
