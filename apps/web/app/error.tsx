"use client";

import { useEffect } from "react";

import { ServerError } from "./_components/server-error";

interface ErrorProps { 
  error: Error & { digest?: string }; 
  retry: () => void
}

/** Errors in any page under the root layout. */
export default function Error({ error, retry }: ErrorProps) {
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
