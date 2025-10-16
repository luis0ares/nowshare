"use client";

import { use, useEffect } from "react";

export default function AuthCallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: "success" | "error" }>;
}) {
  const { status } = use(searchParams);

  useEffect(() => {
    if (status === "success") {
      window.opener?.postMessage(
        { type: "OAUTH_SUCCESS" },
        window.location.origin
      );
    } else if (status === "error") {
      window.opener?.postMessage(
        { type: "OAUTH_ERROR" },
        window.location.origin
      );
    }
  }, [status]);

  return <div></div>;
}
