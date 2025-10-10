"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AuthCallbackPage() {
  const searchParams = useSearchParams();

  const status = searchParams.get("status") as "success" | "error" | null;

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
