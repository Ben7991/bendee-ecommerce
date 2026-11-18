"use client";

import { useEffect } from "react";

import { ServerError } from "./_components/server-error";

/** Errors in any page under the root layout. */
export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    // TODO: report to the error tracker once one is set up (docs/07-platform-infrastructure.md).
    console.error(error);
  }, [error]);

  return (
    <>
      <title>Something went wrong · Jofak</title>
      <ServerError digest={error.digest} retry={retry} />
    </>
  );
}
